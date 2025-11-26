import { sendToBackground } from "@plasmohq/messaging"
import { Check, Loader2, Plus } from "lucide-react"
import { useState } from "react"

type PlusButtonVariant = "default" | "profile"

const variantWrapperClass: Record<PlusButtonVariant, string> = {
    default: "flex flex-col items-center justify-center mb-4",
    profile: "flex flex-col items-center justify-center ml-2"
}

const PlusButton = ({ container, variant = "default" }: { container?: HTMLElement, variant?: PlusButtonVariant }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleClick = async () => {
        try {
            setIsLoading(true)
            // Scope search to the container's parent (video item container) if available
            let authorLink: string | null | undefined

            if (container && container.parentElement) {
                authorLink = container.parentElement
                    .querySelector('a[data-e2e="video-author-avatar"]')
                    ?.getAttribute("href")
            }

            // Fallback to global search if scoped search fails
            if (!authorLink) {
                authorLink = document
                    .querySelector('a[data-e2e="video-author-avatar"]')
                    ?.getAttribute("href")
            }

            // Fallback for profile pages
            if (!authorLink && window.location.pathname.startsWith("/@")) {
                // Extract username from URL if we're on a profile page
                const pathParts = window.location.pathname.split("/")
                // pathParts[0] is empty, pathParts[1] is @username
                if (pathParts[1]?.startsWith("@")) {
                    authorLink = "/" + pathParts[1]
                }
            }

            console.log("Found author link:", authorLink)

            if (!authorLink) {
                throw new Error("Could not find author link")
            }

            const response = await sendToBackground({
                name: "addInfluencer",
                body: {
                    authorLink
                }
            })

            if (!response.ok) {
                throw new Error(response.error || "Failed to add influencer")
            }

            setIsSuccess(true)
            setTimeout(() => {
                setIsSuccess(false)
            }, 2000)
        } catch (error) {
            console.error("Error sending request:", error)
            alert(error.message || "Failed to send request")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={variantWrapperClass[variant]}>
            <button
                onClick={handleClick}
                disabled={isLoading || isSuccess}
                className={`flex items-center justify-center w-12 h-12 rounded-full border shadow-md transition-colors ${isSuccess
                    ? "bg-green-600 border-green-500 text-white"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-slate-100 border-slate-700"
                    }`}
                title="Add to List">
                {isLoading ? (
                    <Loader2 size={24} className="animate-spin" />
                ) : isSuccess ? (
                    <Check size={24} />
                ) : (
                    <Plus size={24} />
                )}
            </button>
        </div>
    )
}

export default PlusButton

