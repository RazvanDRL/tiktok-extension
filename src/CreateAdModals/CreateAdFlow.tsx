"use client";

import { useState } from "react";
import type { User } from "~models/user";
import HookOverlayDialog from "./HookOverlayDialog";
import BodyOverlayDialog from "./BodyOverlayDialog";
import AudioSelectionDialog, { type AudioConfig } from "./AudioSelectionDialog";

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
  | "hook-overlay"
  | "body-overlay"
  | "audio-selection";

export default function CreateAdFlow({
  videoLanguage,
  feature,
  user,
  onComplete,
  onCancel,
}: CreateAdFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>("hook-overlay");
  const [hookOverlayData, setHookOverlayData] = useState<{
    text: string;
    position: "top" | "center" | "bottom";
    hookTimeLimit?: number;
  } | null>(null);
  const [bodyOverlayData, setBodyOverlayData] = useState<{
    text: string;
    position: "top" | "center" | "bottom";
  } | null>(null);

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
    const payload = {
      hookOverlay: hookOverlayData!,
      bodyOverlay: bodyOverlayData!,
      audioConfig: config,
      feature,
      user,
      videoLanguage,
    };

    console.log("Sending ad config payload to generate-from-tiktok:", payload);
    onComplete(payload);
  };

  return (
    <>
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
