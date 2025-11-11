# TikTok Extension Setup Guide

## Firebase Authentication Setup

This extension uses Firebase Authentication instead of hardcoded tokens. Follow these steps to set it up:

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

### 2. Enable Email/Password Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** provider
3. Click "Save"

### 3. Get Your Firebase Config

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Select **Project settings**
3. Scroll down to "Your apps" section
4. Click the web icon `</>` to add a web app (or select existing)
5. Copy the Firebase configuration object

### 4. Update Configuration Files

Update the Firebase config in these files:

1. **`src/background.js`** (around line 16)
2. **`src/popup.js`** (around line 6)

Replace the placeholder values:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 5. Create User Accounts

1. In Firebase Console, go to **Authentication** > **Users**
2. Click "Add user" to manually create users
3. Or users can sign up through the extension popup (if you enable sign-up)

### 6. Load the Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the extension folder
5. Click the extension icon in the toolbar to open the popup
6. Sign in with your Firebase credentials

## How It Works

- **Popup (`popup.html`)**: User interface for signing in/out
- **Background Script (`background.js`)**: Handles API requests using Firebase auth tokens
- **Content Script (`content.js`)**: Adds the download button to pages
- **Storage**: Auth tokens are stored in `chrome.storage.local` and synced between popup and background

## Notes

- Firebase tokens expire after 1 hour. The extension will automatically refresh tokens when needed.
- Users must sign in through the extension popup before using the download feature.
- The extension uses Firebase ID tokens for authentication with your backend API.



