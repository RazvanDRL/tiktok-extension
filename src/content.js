(function () {
    const BUTTON_ID = 'ttx-download-button';
    const BUTTON_CLASS = 'ttx-download-button';
    let observer;

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

        try {
            // Get user ID and token from auth storage
            const storageData = await new Promise((resolve, reject) => {
                chrome.storage.local.get(['firebaseAuthToken', 'firebaseUser'], (result) => {
                    if (chrome.runtime.lastError) {
                        reject(new Error(chrome.runtime.lastError.message));
                        return;
                    }
                    resolve(result);
                });
            });

            const userId = storageData.firebaseUser?.uid;
            const token = storageData.firebaseAuthToken;

            // Log user ID and token to console to verify they stay the same
            console.log('[TikTok Extension] User ID:', userId);
            console.log('[TikTok Extension] Auth Token:', token ? `${token.substring(0, 20)}...` : 'No token');

            if (!userId || !token) {
                console.error('[TikTok Extension] Missing auth credentials');
                alert('Authentication required. Please sign in through the extension popup.');
                return;
            }

            // Send message to background script to handle the API request (bypasses CORS)
            const response = await chrome.runtime.sendMessage({
                action: 'downloadVideo',
                url: url
            });

            // Check if response exists (background script might not be ready)
            if (!response) {
                console.error('[TikTok Extension] No response from background script');
                alert('Extension background script not ready. Please reload the page and try again.');
                return;
            }

            if (response.success) {
                console.log('[TikTok Extension] Download successful:', response.data);
                alert('Video download initiated successfully!');
            } else {
                console.error('[TikTok Extension] Download failed:', response.error);
                alert(`Download failed: ${response.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('[TikTok Extension] Error sending message:', error);
            // Check if it's a connection error
            if (error.message && error.message.includes('fetch')) {
                alert('Network error: Could not connect to the download server. Please check your connection and ensure the server is running.');
            } else {
                alert(`Error: ${error.message || 'Failed to send download request'}`);
            }
        }
    };

    const createButton = () => {
        const button = document.createElement('button');
        button.id = BUTTON_ID;
        button.type = 'button';
        button.className = BUTTON_CLASS;
        button.setAttribute('aria-label', 'Download video');

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
        button.appendChild(contentDiv);

        button.addEventListener('click', handleClick);
        return button;
    };

    const ensureButton = () => {
        if (!document.body) {
            return;
        }

        let button = document.getElementById(BUTTON_ID);
        if (!button) {
            button = createButton();
            // Append directly to body - works on any page
            document.body.appendChild(button);
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
})();

