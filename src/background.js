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
        if (freshToken && freshToken.length >= 100) {
            // Store fresh token with timestamp
            await chrome.storage.local.set({
                firebaseAuthToken: freshToken,
                firebaseTokenTimestamp: Date.now()
            });
            console.log('[TikTok Extension] Background: Refreshed token from popup before request');
            return freshToken;
        } else {
            throw new Error('Invalid token received from popup');
        }
    } catch (error) {
        // If popup is not available, check if we have a stored token
        if (error.message.includes('Popup not available')) {
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

            if (!stored.firebaseAuthToken) {
                throw new Error('User not authenticated. Please open the extension popup and sign in.');
            }

            // Check if stored token is likely expired
            if (isTokenLikelyExpired(stored.firebaseTokenTimestamp)) {
                throw new Error('Token expired. Please open the extension popup to refresh your session.');
            }

            console.warn('[TikTok Extension] Background: Using stored token (popup unavailable, but token still valid)');
            return stored.firebaseAuthToken;
        }

        // For other errors, rethrow
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

    return false;
});

// EIUxJKygORXCXDU8AkN5dwDro943

async function downloadVideo(url, prompt = '', count = 1, duration = 8, size = '720x1280') {
    const baseUrl = "https://adloops.ai/api/ai-videos/generate-from-tiktok";

    console.log('[TikTok Extension] Background: Making request to:', baseUrl);
    console.log('[TikTok Extension] Background: Video URL:', url);
    console.log('[TikTok Extension] Background: Prompt:', prompt);
    console.log('[TikTok Extension] Background: Count:', count);
    console.log('[TikTok Extension] Background: Duration:', duration);
    console.log('[TikTok Extension] Background: Size:', size);

    // Validate URL before making request
    if (!url || typeof url !== 'string' || !url.includes('tiktok.com')) {
        throw new Error('Invalid TikTok URL provided');
    }

    // Get Firebase auth token - getAuthToken() always refreshes before returning
    // This ensures we never use an expired token
    let authToken;
    try {
        authToken = await getAuthToken(); // This will refresh the token from popup before returning
        console.log('[TikTok Extension] Background: Got refreshed auth token, length:', authToken?.length);

        // Verify token is not empty
        if (!authToken || authToken.length < 100) {
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
            uploaded_by: user.name || user.email || 'User',
            prompt: prompt || ''
        };

        console.log('[TikTok Extension] Background: Request body:', JSON.stringify(requestBody, null, 2));

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(requestBody),
        });

        console.log('[TikTok Extension] Background: Response status:', response.status);

        if (!response.ok) {
            let errorText = 'Unknown error';
            try {
                errorText = await response.text();
            } catch (e) {
                errorText = `HTTP ${response.status} ${response.statusText}`;
            }
            console.error('[TikTok Extension] Background: Error response:', errorText);
            throw new Error(`Server error (${response.status}): ${errorText}`);
        }

        const data = await response.json();
        console.log('[TikTok Extension] Background: Response data received');
        return data;
    } catch (error) {
        console.error('[TikTok Extension] Background: Fetch error:', error);

        // Provide more specific error messages
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Network error: Could not connect to server. Please check if the server is running and the ngrok tunnel is active.');
        } else if (error.message) {
            throw error;
        } else {
            throw new Error('Unknown error occurred while downloading video');
        }
    }
}

