import { getApps, initializeApp, type FirebaseApp } from "firebase/app"
import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAjju5SrGHKrZBP1A05WIt6MClmehvf6xY",
    authDomain: "bc-ads-tester.firebaseapp.com",
    projectId: "bc-ads-tester",
    storageBucket: "bc-ads-tester.firebasestorage.app",
    messagingSenderId: "270877086688",
    appId: "1:270877086688:web:fe3c00c18e9a0492bb5185",
    measurementId: "G-49BZ07V8QJ"
};

let firebase_app: FirebaseApp;

// Check if firebase app is already initialized to avoid creating new app on hot-reloads
if (!getApps().length) {
    firebase_app = initializeApp(firebaseConfig)
} else {
    firebase_app = getApps()[0]
}

export const storage = getStorage(firebase_app)
export const auth = getAuth(firebase_app)
export const db = getFirestore(firebase_app)
export const googleAuth = new GoogleAuthProvider()

export default firebase_app