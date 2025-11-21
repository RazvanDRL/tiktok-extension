"use client";

import { useState, useEffect } from "react";
import type { User } from "~models/user";
import HookOverlayDialog from "./HookOverlayDialog";
import BodyOverlayDialog from "./BodyOverlayDialog";
import AudioSelectionDialog, { type AudioConfig } from "./AudioSelectionDialog";
import { uploadVideoToHooks } from "./uploadVideoToHooks";
import { createVideoMixFromAd } from "./createVideoMixFromAd";
import Modal from "~components/Modal";
import { toast } from "sonner";
import MiniLoading from "~components/MiniLoading";

export interface CreateAdFeature {
  id: string;
  name: string;
  bodyText: string;
  bodyId?: string;
}

export const CREATE_AD_FEATURES: CreateAdFeature[] = [
  {
    id: "9M6WBsoB6Ullfrqt0aKA",
    name: "CountDown Feature",
    bodyText:
      "Get the countdown to remember that Jesus is the reason for the season",
    bodyId: "9M6WBsoB6Ullfrqt0aKA",
  },
  {
    id: "V82FYNvw744flm5yV2NF",
    name: "Lockscreen Hourly Feature",
    bodyText: "Tap the screen to get a new verse every hour",
    bodyId: "V82FYNvw744flm5yV2NF",
  },
];


interface CreateAdFlowProps {
  videoUrl: string;
  videoLanguage: string;
  resolution: "portrait" | "landscape";
  user: User;
  feature: CreateAdFeature;
  onComplete: (data?: any) => void;
  onCancel: () => void;
  aiVideoId?: string;
  mode?: "create" | "config";
}

type FlowStep =
  | "uploading"
  | "hook-overlay"
  | "body-overlay"
  | "audio-selection"
  | "creating-mix"
  | "complete";

export default function CreateAdFlow({
  videoUrl,
  videoLanguage,
  resolution,
  user,
  feature,
  onComplete,
  onCancel,
  aiVideoId,
  mode = "create"
}: CreateAdFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>(mode === "config" ? "hook-overlay" : "uploading");
  const [hookDocId, setHookDocId] = useState<string>("");
  const [hookOverlayData, setHookOverlayData] = useState<{
    text: string;
    position: "top" | "center" | "bottom";
    hookTimeLimit?: number;
  } | null>(null);
  const [bodyOverlayData, setBodyOverlayData] = useState<{
    text: string;
    position: "top" | "center" | "bottom";
  } | null>(null);
  const [audioConfig, setAudioConfig] = useState<AudioConfig | null>(null);

  // Start uploading video to hooks when component mounts
  useEffect(() => {
    if (currentStep === "uploading" && mode === "create") {
      handleUploadVideo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUploadVideo = async () => {
    try {
      const docId = await uploadVideoToHooks(
        videoUrl,
        videoLanguage,
        resolution,
        user,
        feature,
        aiVideoId
      );
      setHookDocId(docId);
      setCurrentStep("hook-overlay");
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video to hooks");
      onCancel();
    }
  };

  const handleHookOverlaySave = (
    text: string,
    position: "top" | "center" | "bottom",
    hookTimeLimit?: number
  ) => {
    setHookOverlayData({ text, position, hookTimeLimit });
    setCurrentStep("body-overlay");
  };

  const handleBodyOverlaySave = (
    text: string,
    position: "top" | "center" | "bottom"
  ) => {
    setBodyOverlayData({ text, position });
    setCurrentStep("audio-selection");
  };

  const handleAudioSelectionSave = async (config: AudioConfig) => {
    setAudioConfig(config);

    if (mode === "config") {
      onComplete({
        hookOverlay: hookOverlayData!,
        bodyOverlay: bodyOverlayData!,
        audioConfig: config,
        feature
      });
      return;
    }

    setCurrentStep("creating-mix");

    try {
      // Create the video mix with all collected data
      await createVideoMixFromAd({
        hookDocId,
        hookOverlay: hookOverlayData!,
        bodyOverlay: bodyOverlayData!,
        audioConfig: config,
        feature,
        user,
        videoLanguage,
      });

      toast.success("Video mix created successfully!");
      setCurrentStep("complete");
      onComplete();
    } catch (error) {
      console.error("Error creating video mix:", error);
      toast.error("Failed to create video mix");
      onCancel();
    }
  };

  return (
    <>
      {currentStep === "uploading" && (
        <Modal isOpen={true} onClose={onCancel}>
          <div className='flex flex-col items-center gap-4 p-8'>
            <MiniLoading />
            <p className='text-lg font-medium'>Uploading video to hooks...</p>
          </div>
        </Modal>
      )}

      {currentStep === "creating-mix" && (
        <Modal isOpen={true} onClose={() => { }}>
          <div className='flex flex-col items-center gap-4 p-8'>
            <MiniLoading />
            <p className='text-lg font-medium'>Creating video mix...</p>
          </div>
        </Modal>
      )}

      <HookOverlayDialog
        isOpen={currentStep === "hook-overlay"}
        onClose={onCancel}
        onSave={handleHookOverlaySave}
      />

      <BodyOverlayDialog
        isOpen={currentStep === "body-overlay"}
        onClose={onCancel}
        onSave={handleBodyOverlaySave}
        predefinedText={feature.bodyText}
      />

      <AudioSelectionDialog
        isOpen={currentStep === "audio-selection"}
        onClose={onCancel}
        onSave={handleAudioSelectionSave}
        language={videoLanguage}
      />
    </>
  );
}
