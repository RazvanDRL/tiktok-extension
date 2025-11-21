import { db } from "~firebase/firebaseClient";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
} from "firebase/firestore";
import type { User } from "~models/user";
import type { CreateAdFeature } from "./CreateAdFlow";
import type { IOverlayParams } from "~models/videos";
import type { AudioConfig } from "./AudioSelectionDialog";

interface CreateVideoMixParams {
  hookDocId: string;
  hookOverlay: {
    text: string;
    position: "top" | "center" | "bottom";
    hookTimeLimit?: number;
  };
  bodyOverlay: {
    text: string;
    position: "top" | "center" | "bottom";
  };
  audioConfig: AudioConfig;
  feature: CreateAdFeature;
  user: User;
  videoLanguage: string;
}

// Helper to get vertical position based on position string
function getVerticalPosition(position: "top" | "center" | "bottom"): number {
  switch (position) {
    case "top":
      return 400;
    case "center":
      return 750;
    case "bottom":
      return 1420;
    default:
      return 750;
  }
}

// Helper to get the body ID from feature config
function getBodyId(feature: CreateAdFeature): string {
  if (!feature.bodyId) {
    throw new Error(
      `No bodyId defined for feature "${feature.name}". Please add bodyId to the feature in constants/createAdFeatures.ts`
    );
  }
  return feature.bodyId;
}

// Helper to get the dynamic text overlay ID
async function getDynamicTextOverlayId(): Promise<string> {
  // Look for a dynamic text overlay in the overlays collection
  // This should be an overlay with type "customizable" that supports text params
  const overlayDoc = await getDoc(doc(db, "overlays", "DQw5yHV8x3NyNd0tUz3X"));
  if (overlayDoc.exists()) {
    return overlayDoc.id;
  }

  throw new Error("No dynamic text overlay found");
}

export async function createVideoMixFromAd({
  hookDocId,
  hookOverlay,
  bodyOverlay,
  audioConfig,
  feature,
  user,
  videoLanguage,
}: CreateVideoMixParams) {
  try {
    const bodyId = getBodyId(feature);

    const dynamicOverlayId = await getDynamicTextOverlayId();

    const hookOverlayConfig = {
      overlayId: dynamicOverlayId,
      layers: ["hook"],
      generationType: "manual",
      compositionId: "simple-text-overlay",
      inputVideo: false,
      isCanvas: true,
      affiliate: false,
      params: [
        {
          key: "text",
          title: "Text",
          value: hookOverlay.text,
          boxType: "text",
        },
        {
          key: "verticalPosition",
          title: "Vertical Position",
          value: getVerticalPosition(hookOverlay.position),
          boxType: "number",
        },
        {
          key: "fontSize",
          title: "Font Size",
          value: 64,
          boxType: "number",
        },
        {
          key: "color",
          title: "Text Color",
          value: "#FFFFFF",
          boxType: "color",
        },
        {
          key: "backgroundColor",
          title: "Background Color",
          value: "rgba(255,255,255,0)",
          boxType: "colorPicker",
          type: "colorPicker",
        },
        {
          key: "font",
          title: "Font Family",
          value: "Proxima-Nova-Bold",
          boxType: "selector",
          type: "selector",
        },
      ] as IOverlayParams[],
    };

    // Create body overlay configuration
    const bodyOverlayConfig = {
      overlayId: dynamicOverlayId,
      layers: ["body"],
      generationType: "manual",
      compositionId: "simple-text-overlay",
      inputVideo: false,
      isCanvas: true,
      affiliate: false,
      params: [
        {
          key: "text",
          title: "Text",
          value: bodyOverlay.text,
          boxType: "text",
        },
        {
          key: "verticalPosition",
          title: "Vertical Position",
          value: getVerticalPosition(bodyOverlay.position),
          boxType: "number",
        },
        {
          key: "fontSize",
          title: "Font Size",
          value: 64,
          boxType: "number",
        },
        {
          key: "color",
          title: "Text Color",
          value: "#FFFFFF",
          boxType: "color",
        },
        {
          key: "backgroundColor",
          title: "Background Color",
          value: "rgba(255,255,255,0)",
          boxType: "colorPicker",
          type: "colorPicker",
        },
        {
          key: "font",
          title: "Font Family",
          value: "Proxima-Nova-Bold",
          boxType: "selector",
          type: "selector",
        },
      ] as IOverlayParams[],
    };

    // Create the video mix document
    const components = {
      hook: [hookDocId],
      body: [bodyId],
      cta: [], // Empty CTA for now
      audio: audioConfig.selectedAudios.map((audio) => audio._firestore_id),
      voice: [], // No voice for now
    };

    const videoMix: any = {
      name: `${feature.name} - ${new Date().toISOString()}`,
      overlay: [hookOverlayConfig, bodyOverlayConfig],
      captions: [], // No captions for now
      components,
      status: "new",
      mixConcept: feature.id,
      addedOn: serverTimestamp(),
      affiliate: user?.affiliate || false,
      uploaded_by: user?.name || "Unknown",
      userId: user?.uid || "Unknown",
      companyId: user?.companyId || "Unknown",
      configId: "biblechat",
      templateFormat: "Own_Creation",
      platform: "IOS",
      hookKeepSound: audioConfig.hookKeepSound,
      bodyKeepSound: audioConfig.bodyKeepSound,
      language: videoLanguage,
      crossFadeDuration: 1,
      audioVolume: audioConfig.audioVolume,
      audioOffset: audioConfig.audioOffset,
    };

    // Add hookTimeLimit if provided
    if (hookOverlay.hookTimeLimit) {
      videoMix.hookTimeLimit = hookOverlay.hookTimeLimit;
    }

    // Add audioMusicIncreaseThreshold only if > 0
    if (audioConfig.audioMusicIncreaseThreshold > 0) {
      videoMix.audioMusicIncreaseThreshold =
        audioConfig.audioMusicIncreaseThreshold;
    }

    // Add to videoMixes collection
    await addDoc(collection(db, "videoMixes"), videoMix);
  } catch (error) {
    console.error("Error creating video mix:", error);
    throw error;
  }
}
