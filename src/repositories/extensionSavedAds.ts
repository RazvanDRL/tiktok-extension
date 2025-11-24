import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore"
import { db, firebaseConfig } from "../firebase/firebaseClient"
import type { ExtensionSavedAds } from "../models/extension-saved-ads"

const COLLECTION_NAME = "extension-saved-ads"

const generateHash = async (message: string) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

const uploadMediaToStorageRest = async (mediaUrl: string, libraryId: string, userId: string, token: string) => {
    console.log("Uploading media to storage (REST)", mediaUrl, libraryId)
    try {
        // 1. Download media
        const mediaResponse = await fetch(mediaUrl)
        if (!mediaResponse.ok) {
            throw new Error("Failed to download media from original URL")
        }
        const blob = await mediaResponse.blob()

        // Default to jpg if extension not found
        const fileExtension = mediaUrl.split('.').pop()?.split('?')[0] || 'jpg'
        const hash = await generateHash(mediaUrl.toLowerCase().trim() + "_" + libraryId)
        const fileName = `${hash}.${fileExtension}`
        const objectName = `${COLLECTION_NAME}/${userId}/${fileName}` // path in bucket

        // 2. Upload to Firebase Storage via REST
        // https://firebase.google.com/docs/storage/web/upload-files#rest_api
        // Endpoint: POST https://firebasestorage.googleapis.com/v0/b/[BUCKET_NAME]/o?name=[OBJECT_NAME]
        const bucketName = firebaseConfig.storageBucket;
        const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o?name=${encodeURIComponent(objectName)}`;

        const uploadResponse = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': blob.type
            },
            body: blob
        });

        if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json();
            console.error("Storage REST Error:", errorData);
            throw new Error(errorData.error?.message || 'Unknown Storage error');
        }

        const data = await uploadResponse.json();

        // Construct download URL
        // Format: https://firebasestorage.googleapis.com/v0/b/[BUCKET_NAME]/o/[OBJECT_NAME]?alt=media&token=[DOWNLOAD_TOKEN]
        // But the response contains 'downloadTokens'
        const downloadToken = data.downloadTokens;
        const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(objectName)}?alt=media&token=${downloadToken}`;

        console.log("Media uploaded to storage (REST)", downloadUrl)
        return downloadUrl
    } catch (error) {
        console.error("Error uploading media (REST):", error)
        return null
    }
}

// Helper to format for Firestore REST
const toFirestoreValue = (value: any) => {
    if (value === null || value === undefined) {
        return { nullValue: null };
    }
    if (typeof value === 'string') {
        return { stringValue: value };
    }
    if (typeof value === 'number') {
        if (Number.isInteger(value)) {
            return { integerValue: String(value) };
        }
        return { doubleValue: value };
    }
    if (typeof value === 'boolean') {
        return { booleanValue: value };
    }
    return { stringValue: String(value) };
}

export const saveExtensionSavedAdRest = async (ad: ExtensionSavedAds, userId: string, token: string) => {
    let finalMediaUrl = ad.mediaUrl

    // Upload media if present
    if (ad.mediaUrl && ad.libraryId) {
        const uploadedUrl = await uploadMediaToStorageRest(ad.mediaUrl, ad.libraryId, userId, token)
        if (uploadedUrl) {
            finalMediaUrl = uploadedUrl
        }
    }

    const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/${COLLECTION_NAME}`;

    const fields: any = {
        userId: toFirestoreValue(userId),
        libraryId: toFirestoreValue(ad.libraryId),
        adBody: toFirestoreValue(ad.adBody),
        mediaUrl: toFirestoreValue(finalMediaUrl), // Use the potentially updated URL
        mediaType: toFirestoreValue(ad.mediaType),
        mediaPoster: toFirestoreValue(ad.mediaPoster),
        createdAt: { timestampValue: new Date().toISOString() }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fields })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Firestore REST Error:", errorData);
            const error = new Error(errorData.error?.message || 'Unknown Firestore error');
            (error as any).status = errorData.error?.code;
            throw error;
        }

        const data = await response.json();
        // data.name is the full path, e.g. projects/.../documents/collection/ID
        const id = data.name.split('/').pop();

        return { id, ...ad, userId, mediaUrl: finalMediaUrl };
    } catch (error) {
        console.error("Error saving extension ad (REST):", error);
        throw error;
    }
}

// get by library id
export const getExtensionSavedAdByLibraryId = async (libraryId: string): Promise<ExtensionSavedAds> => {
    try {
        const q = query(collection(db, COLLECTION_NAME), where("libraryId", "==", libraryId))
        const querySnapshot = await getDocs(q)
        if (querySnapshot.docs.length === 0) {
            throw new Error("Extension ad not found")
        }
        return querySnapshot.docs[0].data() as ExtensionSavedAds
    } catch (error) {
        console.error("Error getting extension ad by library id:", error)
        throw error
    }
}

export const getExtensionSavedAds = async (userId: string): Promise<(ExtensionSavedAds & { id: string })[]> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where("userId", "==", userId)
        )

        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as ExtensionSavedAds & { id: string }))
    } catch (error) {
        console.error("Error fetching extension ads:", error)
        throw error
    }
}
