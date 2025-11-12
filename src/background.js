// Background service worker for handling API requests (bypasses CORS)
// Auth tokens are managed by the popup and stored in chrome.storage.local
// Note: Service workers can't use ES modules, so we rely on popup for Firebase auth

// Track token expiration time (tokens expire after 1 hour)
let tokenExpirationTime = null;

// Request a fresh Firebase ID token from popup
async function requestFreshTokenFromPopup() {
    return new Promise((resolve, reject) => {
        // Send message to popup to refresh token
        chrome.runtime.sendMessage({ action: 'refreshToken' }, (response) => {
            // If popup is closed or not responding, chrome.runtime.lastError will be set
            if (chrome.runtime.lastError) {
                // Popup might be closed, reject to fall back to stored token
                reject(new Error('Popup not available'));
                return;
            }

            if (!response || !response.success) {
                reject(new Error(response?.error || 'Failed to refresh token'));
                return;
            }

            // Update token expiration time (tokens expire after 1 hour)
            tokenExpirationTime = Date.now() + (55 * 60 * 1000); // Set to 55 minutes to be safe
            resolve(response.token);
        });
    });
}

// Check if stored token is likely expired (older than 50 minutes)
function isTokenLikelyExpired(storedTime) {
    if (!storedTime) return true;
    const now = Date.now();
    const tokenAge = now - storedTime;
    // Consider token expired if older than 50 minutes (tokens expire after 1 hour)
    return tokenAge > (50 * 60 * 1000);
}

// Get Firebase ID token - ALWAYS refresh before each request to ensure token is valid
async function getAuthToken() {
    // Always try to refresh token from popup first (before every request)
    try {
        const freshToken = await requestFreshTokenFromPopup();
        if (freshToken && typeof freshToken === 'string' && freshToken.length >= 100) {
            // Store fresh token with timestamp
            await chrome.storage.local.set({
                firebaseAuthToken: freshToken,
                firebaseTokenTimestamp: Date.now()
            });
            console.log('[TikTok Extension] Background: Refreshed token from popup before request');
            return freshToken;
        } else {
            console.error('[TikTok Extension] Background: Invalid token received from popup:', typeof freshToken, freshToken?.length);
            throw new Error('Invalid token received from popup');
        }
    } catch (error) {
        // If popup is not available, check if we have a stored token
        if (error.message.includes('Popup not available') || chrome.runtime.lastError) {
            console.warn('[TikTok Extension] Background: Popup not available, checking stored token...');

            // Get stored token as fallback
            const stored = await new Promise((resolve, reject) => {
                chrome.storage.local.get(['firebaseAuthToken', 'firebaseTokenTimestamp'], (result) => {
                    if (chrome.runtime.lastError) {
                        reject(new Error(chrome.runtime.lastError.message));
                        return;
                    }
                    resolve(result);
                });
            });

            console.log('[TikTok Extension] Background: Stored token check:', {
                hasToken: !!stored.firebaseAuthToken,
                tokenLength: stored.firebaseAuthToken?.length,
                timestamp: stored.firebaseTokenTimestamp,
                isExpired: isTokenLikelyExpired(stored.firebaseTokenTimestamp)
            });

            if (!stored.firebaseAuthToken || typeof stored.firebaseAuthToken !== 'string') {
                throw new Error('User not authenticated. Please open the extension popup and sign in.');
            }

            // Check if stored token is likely expired
            if (isTokenLikelyExpired(stored.firebaseTokenTimestamp)) {
                throw new Error('Token expired. Please open the extension popup to refresh your session.');
            }

            // Verify token format
            if (stored.firebaseAuthToken.length < 100) {
                throw new Error('Stored token appears invalid. Please sign in again.');
            }

            console.warn('[TikTok Extension] Background: Using stored token (popup unavailable, but token still valid)');
            return stored.firebaseAuthToken;
        }

        // For other errors, rethrow
        console.error('[TikTok Extension] Background: Error getting token:', error);
        throw error;
    }
}

// Get current user info from storage
async function getCurrentUser() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['firebaseUser'], (result) => {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
                return;
            }

            resolve(result.firebaseUser || null);
        });
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'downloadVideo') {
        console.log('[TikTok Extension] Background: Received download request for URL:', request.url);
        console.log('[TikTok Extension] Background: Prompt:', request.prompt);
        console.log('[TikTok Extension] Background: Count:', request.count);
        console.log('[TikTok Extension] Background: Duration:', request.duration);
        console.log('[TikTok Extension] Background: Size:', request.size);
        downloadVideo(request.url, request.prompt, request.count, request.duration, request.size)
            .then(data => {
                console.log('[TikTok Extension] Background: Download successful');
                sendResponse({ success: true, data });
            })
            .catch(error => {
                console.error('[TikTok Extension] Background: Download error:', error);
                sendResponse({ success: false, error: error.message || 'Unknown error occurred' });
            });
        return true; // Indicates we will send a response asynchronously
    }

    if (request.action === 'getAuthToken') {
        getAuthToken()
            .then(token => {
                sendResponse({ success: true, token });
            })
            .catch(error => {
                sendResponse({ success: false, error: error.message });
            });
        return true;
    }

    if (request.action === 'getCurrentUser') {
        getCurrentUser()
            .then(user => {
                sendResponse({
                    success: true,
                    user: user
                });
            })
            .catch(error => {
                sendResponse({ success: false, error: error.message });
            });
        return true;
    }

    if (request.action === 'authStateChanged') {
        // Store auth state from popup
        chrome.storage.local.set({
            firebaseAuthToken: request.token,
            firebaseUser: request.user,
            firebaseTokenTimestamp: Date.now() // Store timestamp for expiration checking
        });
        sendResponse({ success: true });
        return false;
    }

    if (request.action === 'diagnostics') {
        // Run diagnostic tests to help troubleshoot issues
        (async () => {
            const diagnostics = {
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                online: navigator.onLine,
                results: {}
            };

            // Check auth token
            try {
                const stored = await new Promise((resolve) => {
                    chrome.storage.local.get(['firebaseAuthToken', 'firebaseTokenTimestamp', 'firebaseUser'], resolve);
                });
                diagnostics.results.authToken = {
                    exists: !!stored.firebaseAuthToken,
                    length: stored.firebaseAuthToken?.length || 0,
                    timestamp: stored.firebaseTokenTimestamp,
                    age: stored.firebaseTokenTimestamp ? Date.now() - stored.firebaseTokenTimestamp : null,
                    isExpired: isTokenLikelyExpired(stored.firebaseTokenTimestamp),
                    userExists: !!stored.firebaseUser,
                    userId: stored.firebaseUser?.uid || null
                };
            } catch (error) {
                diagnostics.results.authToken = { error: error.message };
            }

            console.log('[TikTok Extension] Background: Diagnostics:', JSON.stringify(diagnostics, null, 2));
            sendResponse({ success: true, diagnostics });
        })();
        return true;
    }

    return false;
});

async function downloadVideo(url, prompt = '', count = 1, duration = 8, size = '720x1280') {
    const baseUrl = "https://adloops.ai/api/ai-videos/generate-from-tiktok";

    console.log('[TikTok Extension] Background: Making request to:', baseUrl);
    console.log('[TikTok Extension] Background: Video URL:', url);
    console.log('[TikTok Extension] Background: Prompt:', prompt);
    console.log('[TikTok Extension] Background: Count:', count);
    console.log('[TikTok Extension] Background: Duration:', duration);
    console.log('[TikTok Extension] Background: Size:', size);

    // Validate URL before making request
    if (!url || typeof url !== 'string' || !url.includes('tiktok.com') || !url.includes('video/')) {
        throw new Error('Invalid TikTok URL provided');
    }

    // Get Firebase auth token - getAuthToken() always refreshes before returning
    // This ensures we never use an expired token
    let authToken;
    try {
        authToken = await getAuthToken(); // This will refresh the token from popup before returning
        console.log('[TikTok Extension] Background: Got refreshed auth token, length:', authToken?.length);
        console.log('[TikTok Extension] Background: Token preview:', authToken ? `${authToken.substring(0, 20)}...` : 'null/undefined');

        // Verify token is not empty
        if (!authToken || authToken.length < 100) {
            console.error('[TikTok Extension] Background: Token validation failed - token:', authToken);
            throw new Error('Invalid auth token received');
        }
    } catch (error) {
        console.error('[TikTok Extension] Background: Failed to get auth token:', error);
        throw new Error('Authentication required. Please sign in through the extension popup. If you are already signed in, try signing out and back in.');
    }

    // Get current user info
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('User not authenticated. Please sign in through the extension popup.');
    }

    try {
        const requestBody = {
            url: url,
            userId: user.uid,
            count: count || 1,
            duration: duration || 4,
            size: size || "720x1280",
            language: "english",
            // uploaded_by: user.name || user.email || 'User',
            uploaded_by: 'Mariusica',
            prompt: prompt || ''
        };

        console.log('[TikTok Extension] Background: Request body:', JSON.stringify(requestBody, null, 2));

        // Verify token is still valid before making request
        if (!authToken || typeof authToken !== 'string' || authToken.trim().length === 0) {
            throw new Error('Auth token is missing or invalid. Please sign in again.');
        }

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
        };

        console.log('[TikTok Extension] Background: Request headers:', {
            'Accept': headers['Accept'],
            'Content-Type': headers['Content-Type'],
            'Authorization': `Bearer ${authToken.substring(0, 20)}...`
        });

        let response;

        // Add timeout to fetch request (240 seconds)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 240000);

        try {
            console.log('[TikTok Extension] Background: Initiating fetch request...');
            console.log('[TikTok Extension] Background: Extension ID:', chrome.runtime.id);
            console.log('[TikTok Extension] Background: User-Agent:', navigator.userAgent);

            // For Chrome extensions, we can make requests without CORS restrictions
            // However, fetch API still sends OPTIONS preflight for custom headers
            // The browser will automatically send an OPTIONS request first (preflight)
            // If OPTIONS fails or doesn't return proper CORS headers, the POST will fail
            // This is why it might work on one computer (cached OPTIONS response) but not another
            response = await fetch(baseUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody),
                signal: controller.signal,
                // Remove explicit CORS mode - let Chrome extension handle it natively
                // This should reduce preflight issues
                credentials: 'omit',
                // Don't set mode explicitly - Chrome extensions bypass CORS by default
            });
            clearTimeout(timeoutId);
            console.log('[TikTok Extension] Background: Fetch completed successfully');
        } catch (fetchError) {
            clearTimeout(timeoutId);
            console.error('[TikTok Extension] Background: Fetch failed:', fetchError);
            console.error('[TikTok Extension] Background: Fetch error details:', {
                name: fetchError.name,
                message: fetchError.message,
                stack: fetchError.stack
            });

            if (fetchError.name === 'AbortError') {
                throw new Error('Request timed out after 240 seconds. The server may be slow or unreachable.');
            }

            // Check if it's a CORS error
            if (fetchError.message && (fetchError.message.includes('CORS') || fetchError.message.includes('Failed to fetch'))) {
                const extensionId = chrome.runtime.id;
                throw new Error(
                    `CORS Error: The server at ${baseUrl} is not properly handling OPTIONS preflight requests.\n\n` +
                    `⚠️ This is a SERVER-SIDE issue that needs to be fixed by the adloops.ai administrator.\n\n` +
                    `The browser sends an OPTIONS request first (preflight) before the actual POST request.\n` +
                    `The server MUST respond to OPTIONS requests with these CORS headers:\n` +
                    `• Access-Control-Allow-Origin: chrome-extension://${extensionId}\n` +
                    `• Access-Control-Allow-Methods: POST, OPTIONS\n` +
                    `• Access-Control-Allow-Headers: Content-Type, Authorization, Accept\n` +
                    `• Access-Control-Max-Age: 86400 (optional, for caching)\n\n` +
                    `If OPTIONS requests keep failing, the POST request will never be sent.\n\n` +
                    `Extension ID: ${extensionId}\n` +
                    `Share this information with the server administrator.\n\n` +
                    `💡 Note: This might work on some computers if the browser cached a successful OPTIONS response, ` +
                    `but will fail on others where the cache is cleared or the browser is stricter.`
                );
            }

            // Network error or other issue
            throw new Error(`Network error: ${fetchError.message}. Please check your internet connection and ensure the server (${baseUrl}) is accessible.`);
        }

        console.log('[TikTok Extension] Background: Response status:', response.status);
        console.log('[TikTok Extension] Background: Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            let errorText = 'Unknown error';
            let errorDetails = null;
            try {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    errorDetails = await response.json();
                    errorText = errorDetails.message || errorDetails.error || JSON.stringify(errorDetails);
                } else {
                    errorText = await response.text();
                }
                console.error('[TikTok Extension] Background: Error response body:', errorText);
            } catch (e) {
                errorText = `HTTP ${response.status} ${response.statusText}`;
                console.error('[TikTok Extension] Background: Could not parse error response:', e);
            }
            throw new Error(`Server error (${response.status}): ${errorText}`);
        }

        const data = await response.json();
        console.log('[TikTok Extension] Background: Response data received');
        return data;
    } catch (error) {
        console.error('[TikTok Extension] Background: Error:', error);
        // If error already has a message, use it; otherwise provide a generic one
        if (error.message) {
            throw error;
        } else {
            throw new Error('Unknown error occurred while downloading video');
        }
    }
}

