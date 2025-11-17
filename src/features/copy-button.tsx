import { useState } from "react"
import { Copy } from "lucide-react"
import { sendToBackground } from "@plasmohq/messaging"
import { getCurrentUrl } from "~utils/getCurrentUrl"
import { CopyDialog } from "~components/CopyDialog"

export const CopyButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleGenerate = async (data: {
    prompt: string
    count: number
    duration: number
    size: string
    fps: number
    max_duration: number
  }) => {
    const url = getCurrentUrl()

    if (!url) {
      alert("No URL detected for current page/feed.")
      return
    }

    const result = await sendToBackground({
      name: "copyVideo" as never,
      body: {
        url: url as string,
        prompt: data.prompt,
        count: data.count,
        duration: data.duration,
        size: data.size,
        fps: data.fps,
        max_duration: data.max_duration
      }
    })

    if (result.ok) {
      console.log("Download started:", result.downloadId)
    } else {
      alert(result.error || "Failed to generate video")
    }
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
    </>
  )
}
