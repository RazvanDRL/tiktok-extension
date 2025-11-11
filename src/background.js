// Background service worker for handling API requests (bypasses CORS)
// Auth tokens are managed by the popup and stored in chrome.storage.local

// Get Firebase ID token from storage (set by popup)
async function getAuthToken() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['firebaseAuthToken'], (result) => {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
                return;
            }

            if (!result.firebaseAuthToken) {
                reject(new Error('User not authenticated. Please sign in through the extension popup.'));
                return;
            }

            resolve(result.firebaseAuthToken);
        });
    });
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
        downloadVideo(request.url)
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
            firebaseUser: request.user
        });
        sendResponse({ success: true });
        return false;
    }

    return false;
});

// EIUxJKygORXCXDU8AkN5dwDro943

async function downloadVideo(url) {
    const baseUrl = "https://3ff8ea93b701.ngrok-free.app/api/ai-videos/generate-from-tiktok";

    console.log('[TikTok Extension] Background: Making request to:', baseUrl);
    console.log('[TikTok Extension] Background: Video URL:', url);

    // Validate URL before making request
    if (!url || typeof url !== 'string' || !url.includes('tiktok.com')) {
        throw new Error('Invalid TikTok URL provided');
    }

    // Get Firebase auth token
    let authToken;
    try {
        authToken = await getAuthToken();
        console.log('[TikTok Extension] Background: Got auth token');
    } catch (error) {
        throw new Error('Authentication required. Please sign in through the extension popup.');
    }

    // Get current user info
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('User not authenticated. Please sign in through the extension popup.');
    }

    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
                // ngrok sometimes requires this header
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({
                url: url,
                userId: user.uid,
                count: 1,
                duration: 4,
                size: "720x1280",
                language: "english",
                uploaded_by: user.displayName || user.email || 'User'
            }),
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

