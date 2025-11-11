// Import Firebase modules from local files
import { initializeApp } from './lib/firebase/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from './lib/firebase/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyAjju5SrGHKrZBP1A05WIt6MClmehvf6xY",
    authDomain: "bc-ads-tester.firebaseapp.com",
    projectId: "bc-ads-tester",
    storageBucket: "bc-ads-tester.firebasestorage.app",
    messagingSenderId: "270877086688",
    appId: "1:270877086688:web:fe3c00c18e9a0492bb5185",
    measurementId: "G-49BZ07V8QJ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sync auth state with background script via chrome.storage
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Get fresh token and store it
        try {
            const token = await user.getIdToken();
            await chrome.storage.local.set({
                firebaseAuthToken: token,
                firebaseUser: {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                }
            });
            console.log('Auth state synced to storage');
        } catch (error) {
            console.error('Failed to sync auth state:', error);
        }
    } else {
        // Clear storage on logout
        await chrome.storage.local.remove(['firebaseAuthToken', 'firebaseUser']);
    }
});

// Get DOM elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginForm = document.getElementById('login-form');
const userInfo = document.getElementById('user-info');
const userEmail = document.getElementById('user-email');
const errorMessage = document.getElementById('error-message');

// Check auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        showUserInfo(user);
    } else {
        // User is signed out
        showLoginForm();
    }
});

function showLoginForm() {
    loginForm.style.display = 'block';
    userInfo.style.display = 'none';
    errorMessage.style.display = 'none';
}

function showUserInfo(user) {
    loginForm.style.display = 'none';
    userInfo.style.display = 'block';
    userEmail.textContent = user.email;
}

// Login handler
loginBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        showError('Please enter both email and password');
        return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = 'Signing in...';
    errorMessage.style.display = 'none';

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Success - onAuthStateChanged will handle UI update
        errorMessage.style.display = 'none';
    } catch (error) {
        showError(error.message || 'Failed to sign in');
        loginBtn.disabled = false;
        loginBtn.textContent = 'Sign In';
    }
});

// Logout handler
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        // onAuthStateChanged will handle UI update
    } catch (error) {
        showError(error.message || 'Failed to sign out');
    }
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Allow Enter key to submit
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginBtn.click();
    }
});

