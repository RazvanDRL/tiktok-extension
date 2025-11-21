import { db, storage } from "~firebase/firebaseClient";
import {
  doc,
  collection,
  setDoc,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { User } from "~models/user";
import type { CreateAdFeature } from "./CreateAdFlow";

export async function uploadVideoToHooks(
  videoUrl: string,
  language: string,
  resolution: "portrait" | "landscape",
  user: User,
  feature: CreateAdFeature,
  aiVideoId?: string
): Promise<string> {
  try {
    // Check if this AI video already has a hook saved
    if (aiVideoId) {
      const aiVideoDoc = await getDoc(doc(db, "ai-videos", aiVideoId));
      const aiVideoData = aiVideoDoc.data();

      if (aiVideoData?.hookId) {
        // Hook already exists, verify it still exists and return it
        const hookDoc = await getDoc(doc(db, "hooks", aiVideoData.hookId));
        if (hookDoc.exists()) {
          console.log("Reusing existing hook:", aiVideoData.hookId);
          return aiVideoData.hookId;
        }
      }
    }

    // Fetch the video as a blob
    const response = await fetch(videoUrl);
    const blob = await response.blob();

    // Create a new document ID
    const hooksCollection = collection(db, "hooks");
    const docId = doc(hooksCollection).id;

    // Determine aspect ratio key
    const aspectRatioKey = resolution === "portrait" ? "portrait" : "landscape";

    // Upload to Firebase Storage
    const fileName = `ai-video-${Date.now()}.mp4`;
    const storageRef = ref(
      storage,
      `hooks/${docId}/${aspectRatioKey}/${fileName}`
    );
    await uploadBytes(storageRef, blob);

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    const cleanURL = downloadURL.split("&token")[0];

    // Get video duration by creating a video element
    const duration = await getVideoDuration(videoUrl);

    // Create the hook document
    const hookData = {
      video: `ai-video-hook-${Date.now()}`,
      addedOn: serverTimestamp(),
      companyId: user?.companyId || "Unknown",
      raw_video: {
        [aspectRatioKey]: {
          fileName: `hooks/${docId}/${aspectRatioKey}/${fileName}`,
          fileURL: cleanURL,
        },
      },
      duration: duration,
      status: "new",
      uploaded_by: user?.name || "Unknown",
      userId: user?.uid || "Unknown",
      affiliate: user?.affiliate || false,
      language: language,
      tags: ["ai-generated", feature.id],
    };

    await setDoc(doc(db, "hooks", docId), hookData);

    // Save the hook ID back to the AI video document
    if (aiVideoId) {
      await updateDoc(doc(db, "ai-videos", aiVideoId), {
        hookId: docId,
      });
    }

    return docId;
  } catch (error) {
    console.error("Error uploading video to hooks:", error);
    throw error;
  }
}

function getVideoDuration(videoUrl: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      resolve(video.duration);
    };

    video.onerror = () => {
      reject(new Error("Failed to load video metadata"));
    };

    video.src = videoUrl;
  });
}
