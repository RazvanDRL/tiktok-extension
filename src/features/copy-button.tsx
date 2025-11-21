import { useState, useEffect } from "react"
import { Copy } from "lucide-react"
import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { doc, getDoc } from "firebase/firestore"
import { db } from "~firebase/firebaseClient"
import { CopyDialog } from "~components/CopyDialog"
import CreateAdFlow, { type CreateAdFeature, CREATE_AD_FEATURES } from "~CreateAdModals/CreateAdFlow"
import useFirebaseUser from "~firebase/useFirebaseUser"
import type { User } from "~models/user"
import { getCurrentUrl } from "~utils/getCurrentUrl"

export const CopyButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [createAdFlow, setCreateAdFlow] = useState<{
    active: boolean;
    feature: CreateAdFeature | null;
    videoUrl: string;
    videoLanguage: string;
    resolution: "portrait" | "landscape";
    aiVideoId?: string;
    initialData?: any;
  }>({ active: false, feature: null, videoUrl: "", videoLanguage: "english", resolution: "portrait" })

  const [manualUser, setManualUser] = useState<User | null>(null)
  const [isFetchingUser, setIsFetchingUser] = useState(true)

  const { user: firebaseUser } = useFirebaseUser()

  useEffect(() => {
    const fetchUser = async () => {
      // If we already have a firebase user from the hook, we might still want to fetch the full profile
      // but for now let's rely on storage fallback if hook fails
      const storage = new Storage()
      const uid = await storage.get("firebaseUid")

      if (uid) {
        try {
          const userDoc = await getDoc(doc(db, "users", uid))
          if (userDoc.exists()) {
            const userData = userDoc.data() as User
            // Ensure uid is present
            setManualUser({ ...userData, uid: uid })
          }
        } catch (error) {
          console.error("Error fetching user:", error)
        }
      }
      setIsFetchingUser(false)
    }

    fetchUser()
  }, [])

  // Convert Firebase User to App User model, or use manualUser
  const user: User | undefined = firebaseUser ? {
    uid: firebaseUser.uid,
    email: firebaseUser.email || "",
    name: firebaseUser.displayName || "",
    identifier: firebaseUser.email || "",
    country: "",
    companyId: "", // Note: This was empty before, manualUser provides actual data
    role: "",
    affiliate: false,
    createdAt: new Date().toISOString(),
    lastTimeUploadedHook: ""
  } : (manualUser || undefined)

  const handleGenerate = async (data: {
    prompt: string
    count: number
    duration: number
    size: string
    fps: number
    max_duration: number
    featureId?: string
  }) => {
    // If a feature is selected, we go through the Ad Flow FIRST to gather configuration
    if (data.featureId) {
      const selectedFeature = CREATE_AD_FEATURES.find(f => f.id === data.featureId)
      if (selectedFeature) {
        // Determine resolution based on size
        const resolution = data.size === "720x1280" || data.size === "1024x1792" ? "portrait" : "landscape"
        const url = getCurrentUrl() || ""

        setCreateAdFlow({
          active: true,
          feature: selectedFeature,
          videoUrl: url, // Use current TikTok URL for preview purposes if needed (though mode="config" skips upload)
          videoLanguage: "english",
          resolution: resolution,
          initialData: data // Store original form data
        })
        return
      }
    }

    // If no feature selected, proceed with immediate generation
    const result = await sendToBackground({
      name: "copyVideo" as never,
      body: {
        prompt: data.prompt,
        count: data.count,
        duration: data.duration,
        size: data.size,
        fps: data.fps,
        max_duration: data.max_duration,
        featureId: data.featureId
      }
    })

    if (result.ok) {
      console.log("Download started:", result.downloadId)
    } else {
      alert(result.error || "Failed to generate video")
    }
  }

  const handleCreateAdComplete = async (adConfig?: any) => {
    // If we have adConfig, it means we came from the configuration flow
    // Now we trigger the background generation with the combined data
    if (createAdFlow.initialData && adConfig) {
      const data = createAdFlow.initialData
      const result = await sendToBackground({
        name: "copyVideo" as never,
        body: {
          prompt: data.prompt,
          count: data.count,
          duration: data.duration,
          size: data.size,
          fps: data.fps,
          max_duration: data.max_duration,
          featureId: data.featureId,
          adConfig: adConfig // Pass the gathered ad config
        }
      })

      if (result.ok) {
        console.log("Download started with ad config:", result.downloadId)
      } else {
        alert(result.error || "Failed to generate video")
      }
    }

    setCreateAdFlow(prev => ({ ...prev, active: false, feature: null, initialData: undefined }))
  }

  const handleCreateAdCancel = () => {
    setCreateAdFlow(prev => ({ ...prev, active: false, feature: null, initialData: undefined }))
  }

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-slate-100 border border-slate-700"
        onClick={() => setIsDialogOpen(true)}
      >
        <Copy className="w-6 h-6" />
      </button>
      <CopyDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleGenerate}
      />
      {createAdFlow.active && createAdFlow.feature && user && (
        <CreateAdFlow
          videoUrl={createAdFlow.videoUrl}
          videoLanguage={createAdFlow.videoLanguage}
          resolution={createAdFlow.resolution}
          user={user}
          feature={createAdFlow.feature}
          onComplete={handleCreateAdComplete}
          onCancel={handleCreateAdCancel}
          aiVideoId={createAdFlow.aiVideoId}
          mode="config" // Use config mode to skip upload/mix creation
        />
      )}
    </>
  )
}
