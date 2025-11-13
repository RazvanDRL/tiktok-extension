(function () {
    const BUTTON_ID = 'ttx-download-button';
    const BUTTON_CLASS = 'ttx-download-button';
    let observer;

    // Default prompt constant
    const DEFAULT_PROMPT = "you are the world's most intuitive visual communicator and expert prompt engineer. You possess a deep understanding of cinematic language, narrative structure, emotional resonance, the critical concept of filmic coverage and the specific capabilities of the sora 2 model. Your mission is to transform my conceptual ideas into meticulously crafted, narrative-style text-to-video prompts that are visually breathtaking and technically precise. create a json explaining this style in detailes, besides that ignore the text,    please make it softer detail more pixel noise lower dynamic range slightly compressed audio harsher blown highlights";

    const getActiveVideo = () => {
        // Always query fresh from the DOM
        const videos = Array.from(document.querySelectorAll('video'));
        if (videos.length === 0) return null;

        const viewportCenter = window.innerHeight / 2;

        // Find the video that's closest to the center of the viewport and visible
        let bestVideo = null;
        let minDistance = Infinity;

        videos.forEach((video) => {
            const rect = video.getBoundingClientRect();
            const isVisible = rect.width > 0 && rect.height > 0 &&
                rect.top < window.innerHeight &&
                rect.bottom > 0;

            if (!isVisible) return;

            // Calculate distance from center of viewport to center of video
            const videoCenter = rect.top + (rect.height / 2);
            const distance = Math.abs(videoCenter - viewportCenter);

            // Prefer videos that are playing
            const isPlaying = !video.paused && !video.ended && video.readyState >= 2;
            const adjustedDistance = isPlaying ? distance * 0.5 : distance;

            if (adjustedDistance < minDistance) {
                minDistance = adjustedDistance;
                bestVideo = video;
            }
        });

        return bestVideo || videos[0] || null;
    };

    const getActiveVideoContainer = () => {
        const video = getActiveVideo();
        if (!video) return null;

        // Find the video wrapper container (usually has xgwrapper ID)
        let container = video.closest('[id^="xgwrapper-"]');
        if (!container) {
            // Try to find the parent container that likely contains video metadata
            container = video.closest('div[class*="DivPlayerContainer"], div[class*="player"], div[class*="video"]');
        }
        return container || video.parentElement;
    };

    const getCurrentVideoUsername = () => {
        // Get the active video container to scope our search
        const container = getActiveVideoContainer();
        if (!container) {
            console.warn('[TikTok Extension] No video container found.');
            return null;
        }

        // Always query fresh from DOM - scope search to the active video container
        // First try: author avatar link with data-e2e attribute within the container
        let authorLink = container.querySelector('a[data-e2e="video-author-avatar"]');

        // Second try: find links with href starting with /@ within the container
        if (!authorLink) {
            const links = Array.from(container.querySelectorAll('a[href^="/@"]'));
            // Prefer links that contain text content (like the username display)
            authorLink = links.find(link => {
                const text = link.textContent.trim();
                return text && text.length > 0 && text.length < 50; // Reasonable username length
            }) || links[0];
        }

        // If still not found, search in a wider scope but prioritize elements near the video
        if (!authorLink) {
            const video = getActiveVideo();
            if (video) {
                // Search in parent containers up the tree
                let parent = video.parentElement;
                let depth = 0;
                while (parent && depth < 5) {
                    authorLink = parent.querySelector('a[data-e2e="video-author-avatar"]') ||
                        parent.querySelector('a[href^="/@"]');
                    if (authorLink) break;
                    parent = parent.parentElement;
                    depth++;
                }
            }
        }

        // Last resort: search globally but log a warning
        if (!authorLink) {
            authorLink = document.querySelector('a[data-e2e="video-author-avatar"]');
        }

        if (!authorLink) {
            console.warn('[TikTok Extension] Author link not found.');
            return null;
        }

        // Always get fresh attribute value
        const href = authorLink.getAttribute('href');
        if (href) {
            const match = href.match(/^\/@(.+)$/);
            if (match) {
                const username = match[1];
                console.log('[TikTok Extension] Username found:', username);
                return username;
            }
        }

        // Fallback: extract from text content (always get fresh)
        const textContent = authorLink.textContent.trim();
        if (textContent) {
            console.log('[TikTok Extension] Username found from text:', textContent);
            return textContent;
        }

        console.warn('[TikTok Extension] Could not extract username.');
        return null;
    };

    const getCurrentVideoId = () => {
        // Always get fresh video from DOM
        const video = getActiveVideo();
        if (!video) {
            console.warn('[TikTok Extension] No video element found.');
            return null;
        }

        // Always query fresh from DOM - find wrapper containing the current video
        // Start from the video element and traverse up to find the wrapper
        let wrapper = video.closest('[id^="xgwrapper-"]');

        if (!wrapper) {
            // Query all wrappers fresh and find one containing this specific video element
            const wrappers = Array.from(document.querySelectorAll('[id^="xgwrapper-"]'));
            wrapper = wrappers.find(w => {
                // Check if this wrapper contains the video element
                const wrapperVideo = w.querySelector('video');
                return wrapperVideo === video;
            });
        }

        if (!wrapper) {
            console.warn('[TikTok Extension] Video wrapper not found for active video.');
            return null;
        }

        // Always get fresh attribute value
        const wrapperId = wrapper.getAttribute('id');
        if (!wrapperId) {
            console.warn('[TikTok Extension] Wrapper has no ID attribute.');
            return null;
        }

        // Extract video ID from format: xgwrapper-0-{VIDEO_ID}
        const match = wrapperId.match(/^xgwrapper-\d+-(.+)$/);
        if (!match) {
            console.warn('[TikTok Extension] Could not parse video ID from wrapper ID:', wrapperId);
            return null;
        }

        const videoId = match[1];
        console.log('[TikTok Extension] Video ID found:', videoId);
        return videoId;
    };

    const getVideoUrlFromCurrentPage = () => {
        const currentUrl = window.location.href;
        const urlPattern = /tiktok\.com\/@([^\/]+)\/video\/([^\/\?]+)/i;
        const match = currentUrl.match(urlPattern);

        if (match) {
            const username = match[1];
            const videoId = match[2];
            // Build clean URL without query parameters
            const cleanUrl = `https://www.tiktok.com/@${username}/video/${videoId}`;
            console.log('[TikTok Extension] Extracted URL from page:', cleanUrl);
            return cleanUrl;
        }

        return null;
    };

    const showPromptDialog = async () => {
        return new Promise(async (resolve, reject) => {
            // Load saved prompt and history from storage
            const storage = await chrome.storage.local.get(['ttx_current_prompt', 'ttx_prompt_history']);
            const savedPrompt = storage.ttx_current_prompt || DEFAULT_PROMPT;
            const promptHistory = storage.ttx_prompt_history || [];

            // Create modal overlay
            const modal = document.createElement('div');
            modal.className = 'ttx-prompt-modal';
            modal.setAttribute('id', 'ttx-prompt-modal');

            // Create modal content
            const content = document.createElement('div');
            content.className = 'ttx-prompt-modal-content';

            // Create title
            const title = document.createElement('h3');
            title.textContent = 'Enter Prompt';

            // Create header buttons container (for reset button)
            const headerButtons = document.createElement('div');
            headerButtons.className = 'ttx-prompt-modal-header-buttons';

            // Create reset button
            const resetBtn = document.createElement('button');
            resetBtn.className = 'ttx-prompt-modal-reset';
            resetBtn.textContent = 'Reset to Default';
            resetBtn.addEventListener('click', () => {
                textarea.value = DEFAULT_PROMPT;
                // Save to storage immediately
                chrome.storage.local.set({ ttx_current_prompt: DEFAULT_PROMPT });
            });
            headerButtons.appendChild(resetBtn);

            // Create history section
            const historySection = document.createElement('div');
            historySection.className = 'ttx-prompt-modal-history';

            if (promptHistory.length > 0) {
                const historyLabel = document.createElement('label');
                historyLabel.className = 'ttx-prompt-modal-label';
                historyLabel.textContent = 'Prompt History';

                const historySelect = document.createElement('select');
                historySelect.className = 'ttx-prompt-modal-select';

                // Add placeholder option
                const placeholderOption = document.createElement('option');
                placeholderOption.value = '';
                placeholderOption.textContent = '-- Load from history --';
                placeholderOption.selected = true;
                historySelect.appendChild(placeholderOption);

                // Add history items (most recent first)
                promptHistory.slice().reverse().forEach((item, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    const date = new Date(item.timestamp);
                    const dateStr = date.toLocaleString();
                    const promptPreview = item.prompt.substring(0, 60) + (item.prompt.length > 60 ? '...' : '');
                    option.textContent = `${dateStr} - ${promptPreview}`;
                    historySelect.appendChild(option);
                });

                // Load selected history item
                historySelect.addEventListener('change', (e) => {
                    if (e.target.value !== '') {
                        const historyIndex = promptHistory.length - 1 - parseInt(e.target.value);
                        const selectedItem = promptHistory[historyIndex];
                        textarea.value = selectedItem.prompt;
                        // Save to storage immediately
                        chrome.storage.local.set({ ttx_current_prompt: selectedItem.prompt });
                    }
                });

                historySection.appendChild(historyLabel);
                historySection.appendChild(historySelect);
            }

            // Create textarea
            const textarea = document.createElement('textarea');
            textarea.setAttribute('id', 'ttx-prompt-input');
            textarea.setAttribute('placeholder', 'Enter your prompt here...');
            textarea.setAttribute('rows', '10');
            textarea.value = savedPrompt;

            // Save prompt to storage on change (to persist even if modal is closed)
            textarea.addEventListener('input', () => {
                chrome.storage.local.set({ ttx_current_prompt: textarea.value });
            });

            // Create options container
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'ttx-prompt-modal-options';

            // Number of videos dropdown
            const countLabel = document.createElement('label');
            countLabel.className = 'ttx-prompt-modal-label';
            countLabel.textContent = 'Number of videos';
            const countSelect = document.createElement('select');
            countSelect.className = 'ttx-prompt-modal-select';
            countSelect.setAttribute('id', 'ttx-count-select');
            for (let i = 1; i <= 5; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `${i} video${i > 1 ? 's' : ''}`;
                if (i === 1) option.selected = true;
                countSelect.appendChild(option);
            }
            const countGroup = document.createElement('div');
            countGroup.className = 'ttx-prompt-modal-field-group';
            countGroup.appendChild(countLabel);
            countGroup.appendChild(countSelect);

            // Duration dropdown
            const durationLabel = document.createElement('label');
            durationLabel.className = 'ttx-prompt-modal-label';
            durationLabel.textContent = 'Duration';
            const durationSelect = document.createElement('select');
            durationSelect.className = 'ttx-prompt-modal-select';
            durationSelect.setAttribute('id', 'ttx-duration-select');
            const durations = [
                { value: 4, text: '4 seconds' },
                { value: 8, text: '8 seconds' },
                { value: 12, text: '12 seconds' }
            ];
            durations.forEach(d => {
                const option = document.createElement('option');
                option.value = d.value;
                option.textContent = d.text;
                if (d.value === 8) option.selected = true;
                durationSelect.appendChild(option);
            });
            const durationGroup = document.createElement('div');
            durationGroup.className = 'ttx-prompt-modal-field-group';
            durationGroup.appendChild(durationLabel);
            durationGroup.appendChild(durationSelect);

            // Size / Aspect Ratio dropdown
            const sizeLabel = document.createElement('label');
            sizeLabel.className = 'ttx-prompt-modal-label';
            sizeLabel.textContent = 'Size / Aspect Ratio';
            const sizeSelect = document.createElement('select');
            sizeSelect.className = 'ttx-prompt-modal-select';
            sizeSelect.setAttribute('id', 'ttx-size-select');
            const sizes = [
                { value: '720x1280', text: '720x1280 (9:16)' },
                { value: '1280x720', text: '1280x720 (16:9)' },
                { value: '1024x1792', text: '1024x1792 (9:16 HD)' },
                { value: '1792x1024', text: '1792x1024 (16:9 HD)' }
            ];
            sizes.forEach(s => {
                const option = document.createElement('option');
                option.value = s.value;
                option.textContent = s.text;
                if (s.value === '720x1280') option.selected = true;
                sizeSelect.appendChild(option);
            });
            const sizeGroup = document.createElement('div');
            sizeGroup.className = 'ttx-prompt-modal-field-group';
            sizeGroup.appendChild(sizeLabel);
            sizeGroup.appendChild(sizeSelect);

            optionsContainer.appendChild(countGroup);
            optionsContainer.appendChild(durationGroup);
            optionsContainer.appendChild(sizeGroup);

            // Create buttons container
            const buttons = document.createElement('div');
            buttons.className = 'ttx-prompt-modal-buttons';

            // Create cancel button
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'ttx-prompt-modal-cancel';
            cancelBtn.textContent = 'Cancel';
            cancelBtn.addEventListener('click', () => {
                // Prompt is already saved due to input listener
                document.body.removeChild(modal);
                reject(new Error('Cancelled by user'));
            });

            // Create submit button
            const submitBtn = document.createElement('button');
            submitBtn.className = 'ttx-prompt-modal-submit';
            submitBtn.textContent = 'Submit';
            submitBtn.addEventListener('click', async () => {
                const prompt = textarea.value.trim();
                const count = parseInt(countSelect.value);
                const duration = parseInt(durationSelect.value);
                const size = sizeSelect.value;

                // Save to history
                const newHistoryItem = {
                    prompt: prompt,
                    timestamp: Date.now()
                };

                // Add to history (keep last 20 items)
                const updatedHistory = [...promptHistory, newHistoryItem].slice(-20);
                await chrome.storage.local.set({
                    ttx_prompt_history: updatedHistory,
                    ttx_current_prompt: prompt
                });

                document.body.removeChild(modal);
                resolve({
                    prompt: prompt,
                    count: count,
                    duration: duration,
                    size: size
                });
            });

            // Allow Enter key to submit (Ctrl/Cmd + Enter)
            textarea.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    submitBtn.click();
                }
                if (e.key === 'Escape') {
                    cancelBtn.click();
                }
            });

            // Assemble modal
            buttons.appendChild(cancelBtn);
            buttons.appendChild(submitBtn);
            content.appendChild(title);
            content.appendChild(headerButtons);
            if (promptHistory.length > 0) {
                content.appendChild(historySection);
            }
            content.appendChild(textarea);
            content.appendChild(optionsContainer);
            content.appendChild(buttons);
            modal.appendChild(content);

            // Add to page
            document.body.appendChild(modal);

            // Focus textarea and select all text for easy replacement
            setTimeout(() => {
                textarea.focus();
                textarea.select();
            }, 100);

            // Close on backdrop click - prompt is already saved
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    cancelBtn.click();
                }
            });
        });
    };

    async function handleClick() {
        // First, try to get URL from current page URL
        let url = getVideoUrlFromCurrentPage();

        // If not found in URL, fall back to DOM extraction
        if (!url) {
            const video = getActiveVideo();
            const username = getCurrentVideoUsername();
            const videoId = getCurrentVideoId();

            if (!video) {
                console.warn('[TikTok Extension] No video element found for download action.');
                alert('No video found on this page. Please navigate to a TikTok video page.');
                return;
            }
            if (!username) {
                console.warn('[TikTok Extension] No username found for download action.');
                alert('Could not extract username. Please ensure you are on a TikTok video page.');
                return;
            }
            if (!videoId) {
                console.warn('[TikTok Extension] No video ID found for download action.');
                alert('Could not extract video ID. Please ensure you are on a TikTok video page.');
                return;
            }

            url = `https://www.tiktok.com/@${username}/video/${videoId}`;
        }

        // Validate URL format
        if (!url || !url.includes('tiktok.com') || !url.includes('/video/')) {
            console.error('[TikTok Extension] Invalid URL:', url);
            alert('Invalid TikTok video URL. Please ensure you are on a TikTok video page.');
            return;
        }

        // Show prompt dialog before proceeding
        let dialogResult;
        try {
            dialogResult = await showPromptDialog();
        } catch (error) {
            if (error.message === 'Cancelled by user') {
                console.log('[TikTok Extension] User cancelled prompt dialog');
                return;
            }
            throw error;
        }

        const { prompt, count, duration, size } = dialogResult;

        try {
            // Send message to background script to handle the API request (bypasses CORS)
            // The background script will handle authentication internally
            console.log('[TikTok Extension] Sending download request to background script...');

            const response = await chrome.runtime.sendMessage({
                action: 'downloadVideo',
                url: url,
                prompt: prompt,
                count: count,
                duration: duration,
                size: size
            });

            // Check if response exists (background script might not be ready)
            if (!response) {
                console.error('[TikTok Extension] No response from background script');
                alert('❌ Extension background script not ready. Please reload the page and try again.');
                return;
            }

            if (response.success) {
                console.log('[TikTok Extension] Download successful:', response.data);
                alert('✅ Video download initiated successfully! Check the server for your processed video.');
            } else {
                console.error('[TikTok Extension] Download failed:', response.error);

                // Provide more specific error messages
                let errorMessage = response.error || 'Unknown error';

                if (errorMessage.includes('Network error') || errorMessage.includes('Failed to fetch')) {
                    errorMessage += '\n\n🔍 Troubleshooting:\n' +
                        '• Check your internet connection\n' +
                        '• Verify the server (adloops.ai) is accessible\n' +
                        '• Check browser console for detailed error logs\n' +
                        '• Try disabling VPN or firewall temporarily';
                } else if (errorMessage.includes('auth') || errorMessage.includes('token')) {
                    errorMessage += '\n\n🔑 Please open the extension popup and sign in again.';
                } else if (errorMessage.includes('timeout')) {
                    errorMessage += '\n\n⏱️ The server took too long to respond. Please try again.';
                }

                alert(`❌ Download failed:\n\n${errorMessage}`);
            }
        } catch (error) {
            console.error('[TikTok Extension] Error sending message:', error);
            console.error('[TikTok Extension] Error stack:', error.stack);

            // Provide detailed error information
            let errorMessage = error.message || 'Failed to send download request';

            if (error.message && (error.message.includes('fetch') || error.message.includes('Network'))) {
                errorMessage = '❌ Network error: Could not connect to the server.\n\n' +
                    '🔍 Troubleshooting:\n' +
                    '• Check your internet connection\n' +
                    '• Verify https://adloops.ai is accessible in your browser\n' +
                    '• Check if any firewall or VPN is blocking the connection\n' +
                    '• Open browser console (F12) for detailed error logs\n' +
                    '• Try from a different network if possible';
            } else if (error.message && error.message.includes('Extension context invalidated')) {
                errorMessage = '❌ Extension was updated or reloaded.\n\nPlease reload this page and try again.';
            }

            alert(errorMessage);
        }
    };

    const handleDownloadClick = async () => {
        try {
            // Get the current video URL
            let url = getVideoUrlFromCurrentPage();

            // If not found in URL, fall back to DOM extraction
            if (!url) {
                const video = getActiveVideo();
                const username = getCurrentVideoUsername();
                const videoId = getCurrentVideoId();

                if (!video) {
                    console.warn('[TikTok Extension] No video element found for download action.');
                    alert('No video found on this page. Please navigate to a TikTok video page.');
                    return;
                }
                if (!username) {
                    console.warn('[TikTok Extension] No username found for download action.');
                    alert('Could not extract username. Please ensure you are on a TikTok video page.');
                    return;
                }
                if (!videoId) {
                    console.warn('[TikTok Extension] No video ID found for download action.');
                    alert('Could not extract video ID. Please ensure you are on a TikTok video page.');
                    return;
                }

                url = `https://www.tiktok.com/@${username}/video/${videoId}`;
            }

            // Validate URL format
            if (!url || !url.includes('tiktok.com') || !url.includes('/video/')) {
                console.error('[TikTok Extension] Invalid URL:', url);
                alert('Invalid TikTok video URL. Please ensure you are on a TikTok video page.');
                return;
            }

            // Check if chrome.runtime is available
            if (typeof chrome === 'undefined' || typeof chrome.runtime === 'undefined') {
                throw new Error('Chrome extension APIs are not available. Please reload the extension and refresh this page.');
            }

            // Send message to background script to handle the API request (bypasses CORS and mixed content)
            console.log('[TikTok Extension] Sending download API request to background script...');

            const response = await new Promise((resolve, reject) => {
                try {
                    chrome.runtime.sendMessage({
                        action: 'downloadApi',
                        url: url
                    }, (response) => {
                        if (chrome.runtime.lastError) {
                            reject(new Error(chrome.runtime.lastError.message));
                        } else {
                            resolve(response);
                        }
                    });
                } catch (error) {
                    reject(error);
                }
            });

            // Check if response exists (background script might not be ready)
            if (!response) {
                console.error('[TikTok Extension] No response from background script');
                alert('❌ Extension background script not ready. Please reload the page and try again.');
                return;
            }

            if (response.success) {
                console.log('[TikTok Extension] Download API successful:', response.data);
                const downloadUrl =
                    (response.data && (response.data.url || response.data.downloadUrl || response.data.link || response.data.download_url)) ||
                    response.url ||
                    response.link ||
                    null;

                if (downloadUrl) {
                    console.log('[TikTok Extension] Starting browser download for:', downloadUrl);
                    try {
                        const dlResponse = await new Promise((resolve, reject) => {
                            try {
                                chrome.runtime.sendMessage({ action: 'startDownload', url: downloadUrl }, (resp) => {
                                    if (chrome.runtime.lastError) {
                                        reject(new Error(chrome.runtime.lastError.message));
                                    } else {
                                        resolve(resp);
                                    }
                                });
                            } catch (e) {
                                reject(e);
                            }
                        });
                        if (dlResponse && dlResponse.success) {
                            console.log('[TikTok Extension] Download started. ID:', dlResponse.downloadId);
                        } else {
                            console.warn('[TikTok Extension] Could not start download via API. Opening link instead.', dlResponse?.error);
                            window.open(downloadUrl, '_blank');
                        }
                    } catch (e) {
                        console.warn('[TikTok Extension] Download API messaging failed. Opening link instead.', e);
                        window.open(downloadUrl, '_blank');
                    }
                }
            } else {
                console.error('[TikTok Extension] Download API failed:', response.error);
                alert(`❌ Download failed: ${response.error}. Please try again.`);
            }
        } catch (error) {
            console.error('[TikTok Extension] Error sending message:', error);
            console.error('[TikTok Extension] Error stack:', error.stack);

            // Provide detailed error information
            let errorMessage = error.message || 'Failed to send download request';

            if (error.message && error.message.includes('Extension context invalidated')) {
                errorMessage = '❌ Extension was updated or reloaded.\n\nPlease reload this page and try again.';
            } else if (error.message && error.message.includes('Chrome extension APIs are not available')) {
                errorMessage = '❌ Extension APIs not available.\n\nPlease:\n1. Reload the extension in chrome://extensions\n2. Refresh this page\n3. Try again';
            } else if (error.message && (error.message.includes('sendMessage') || error.message.includes('runtime'))) {
                errorMessage = '❌ Cannot communicate with extension background script.\n\nPlease reload the extension and refresh this page.';
            }

            alert(`❌ Download failed: ${errorMessage}. Please try again.`);
        }
    };

    const createButton = () => {
        // Create container for both buttons
        const container = document.createElement('div');
        container.className = 'ttx-buttons-container';
        container.id = 'ttx-buttons-container';

        // Create copy/download button
        const copyButton = document.createElement('button');
        copyButton.id = BUTTON_ID;
        copyButton.type = 'button';
        copyButton.className = BUTTON_CLASS;
        copyButton.setAttribute('aria-label', 'Copy video');

        // Create content container div
        const contentDiv = document.createElement('div');
        contentDiv.className = 'TUXButton-content';

        // Create icon container div
        const iconContainer = document.createElement('div');
        iconContainer.className = 'TUXButton-iconContainer';

        // Create copy SVG icon
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');

        // Copy icon rect
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '14');
        rect.setAttribute('height', '14');
        rect.setAttribute('x', '8');
        rect.setAttribute('y', '8');
        rect.setAttribute('rx', '2');
        rect.setAttribute('ry', '2');

        // Copy icon path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2');

        svg.appendChild(rect);
        svg.appendChild(path);
        iconContainer.appendChild(svg);
        contentDiv.appendChild(iconContainer);
        copyButton.appendChild(contentDiv);
        copyButton.addEventListener('click', handleClick);

        // Create download button
        const downloadButton = document.createElement('button');
        downloadButton.id = 'ttx-download-api-button';
        downloadButton.type = 'button';
        downloadButton.className = 'ttx-download-button ttx-download-api-button';
        downloadButton.setAttribute('aria-label', 'Download via API');

        // Create content container div for download button
        const downloadContentDiv = document.createElement('div');
        downloadContentDiv.className = 'TUXButton-content';

        // Create icon container div for download button
        const downloadIconContainer = document.createElement('div');
        downloadIconContainer.className = 'TUXButton-iconContainer';

        // Create download SVG icon
        const downloadSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        downloadSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        downloadSvg.setAttribute('width', '24');
        downloadSvg.setAttribute('height', '24');
        downloadSvg.setAttribute('viewBox', '0 0 24 24');
        downloadSvg.setAttribute('fill', 'none');
        downloadSvg.setAttribute('stroke', 'currentColor');
        downloadSvg.setAttribute('stroke-width', '2');
        downloadSvg.setAttribute('stroke-linecap', 'round');
        downloadSvg.setAttribute('stroke-linejoin', 'round');

        // Download icon path
        const downloadPath1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        downloadPath1.setAttribute('d', 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4');

        const downloadPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        downloadPath2.setAttribute('points', '7 10 12 15 17 10');

        const downloadPath3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        downloadPath3.setAttribute('x1', '12');
        downloadPath3.setAttribute('y1', '15');
        downloadPath3.setAttribute('x2', '12');
        downloadPath3.setAttribute('y2', '3');

        downloadSvg.appendChild(downloadPath1);
        downloadSvg.appendChild(downloadPath2);
        downloadSvg.appendChild(downloadPath3);
        downloadIconContainer.appendChild(downloadSvg);
        downloadContentDiv.appendChild(downloadIconContainer);
        downloadButton.appendChild(downloadContentDiv);
        downloadButton.addEventListener('click', handleDownloadClick);

        // Add both buttons to container
        container.appendChild(copyButton);
        container.appendChild(downloadButton);

        return container;
    };

    const ensureButton = () => {
        if (!document.body) {
            return;
        }

        let container = document.getElementById('ttx-buttons-container');
        if (!container) {
            container = createButton();
            // Append directly to body - works on any page
            document.body.appendChild(container);
        }
    };

    const startObserving = () => {
        if (observer) {
            return;
        }

        observer = new MutationObserver(() => {
            ensureButton();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    };

    const init = () => {
        ensureButton();
        startObserving();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Add global diagnostic function for troubleshooting
    window.TTX_DIAGNOSTICS = async function () {
        console.log('[TikTok Extension] Running diagnostics...');
        try {
            const response = await chrome.runtime.sendMessage({ action: 'diagnostics' });
            if (response && response.success) {
                console.log('%c[TikTok Extension] Diagnostics Report:', 'color: #4CAF50; font-weight: bold');
                console.log('Timestamp:', response.diagnostics.timestamp);
                console.log('Online:', response.diagnostics.online);
                console.log('User Agent:', response.diagnostics.userAgent);
                console.log('\n%cAuth Token Status:', 'color: #2196F3; font-weight: bold');
                console.log(response.diagnostics.results.authToken);

                // Display user-friendly summary
                const tokenOk = response.diagnostics.results.authToken.exists && !response.diagnostics.results.authToken.isExpired;

                console.log('\n%c=== Summary ===', 'color: #FF9800; font-weight: bold');
                console.log(tokenOk ? '✅ Auth token is valid' : '❌ Auth token is missing or expired');
                console.log(response.diagnostics.online ? '✅ Device is online' : '❌ Device appears offline');

                if (!tokenOk) {
                    console.log('\n%c🔍 Recommended Actions:', 'color: #F44336; font-weight: bold');
                    console.log('• Open extension popup and sign in');
                    console.log('• If already signed in, try signing out and back in');
                }

                return response.diagnostics;
            } else {
                console.error('[TikTok Extension] Failed to get diagnostics');
                return null;
            }
        } catch (error) {
            console.error('[TikTok Extension] Error running diagnostics:', error);
            return null;
        }
    };

    console.log('[TikTok Extension] 💡 Tip: Run TTX_DIAGNOSTICS() in the console to troubleshoot issues');
})();

