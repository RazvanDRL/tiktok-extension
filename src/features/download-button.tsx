import { Download } from "lucide-react"
import { sendToBackground } from "@plasmohq/messaging"
import { getCurrentUrl } from "~utils/getCurrentUrl"

export const DownloadButton = () => {
  const downloadVideo = async () => {
    const url = getCurrentUrl()

    if (!url) {
      alert("No URL detected for current page/feed.")
      return
    }

    const result = await sendToBackground({
      name: "downloadVideo" as never,
      body: {
        url: url as string
      }
    })

    if (result.ok) {
      console.log("Download started:", result.downloadId)
    } else {
      alert(result.error || "Failed to download video")
    }
  }

  return (
    <button type="button" className="ml-3 flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-slate-900"
      onClick={async () => await downloadVideo()}
    >
      <Download className="w-6 h-6" />
    </button>
  )
}
