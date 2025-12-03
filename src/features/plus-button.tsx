import { sendToBackground } from "@plasmohq/messaging"
import { Plus } from "lucide-react"
import { getCurrentUrl } from "~utils/getCurrentUrl"

const PlusButton = () => {
    const handleClick = async () => {
        try {
            const url = getCurrentUrl()

            console.log("url", url)

            if (!url) {
                throw new Error("Could not find author link")
            }

            const response = await sendToBackground({
                name: "addInfluencer",
                body: {
                    authorLink: url.split("/@").pop()?.split("/")[0]
                }
            })

            if (!response.ok) {
                throw new Error(response.error || "Failed to add influencer")
            }
        } catch (error) {
            console.error("Error sending request:", error)
            alert(error.message || "Failed to send request")
        }
    }

    return (
        <button
            onClick={handleClick}
            className="flex items-center justify-center w-12 h-12 rounded-full border shadow-md transition-colors bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-slate-100 border-slate-700"
            title="Add to List">
            <Plus size={24} />
        </button>
    )
}

export default PlusButton

