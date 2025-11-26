import { Plus } from "lucide-react"

const PlusButton = ({ container }: { container?: HTMLElement }) => {
    const handleClick = async () => {
        try {
            // Scope search to the container's parent (video item container) if available
            let authorLink: string | null | undefined;

            if (container && container.parentElement) {
                authorLink = container.parentElement.querySelector('a[data-e2e="video-author-avatar"]')?.getAttribute("href")
            }

            // Fallback to global search if scoped search fails
            if (!authorLink) {
                authorLink = document.querySelector('a[data-e2e="video-author-avatar"]')?.getAttribute("href")
            }

            console.log("Found author link:", authorLink)
        } catch (error) {
            console.error("Error sending request:", error)
            alert("Failed to send request")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center mb-4">
            <button
                onClick={handleClick}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-slate-100 border border-slate-700 shadow-md transition-colors"
                title="Add to List"
            >
                <Plus size={24} />
            </button>
        </div>
    )
}

export default PlusButton

