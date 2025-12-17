import { X } from "lucide-react"

interface AddInfluencerDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: (type: "short_term" | "fan_pages") => void
}

export const AddInfluencerDialog = ({ isOpen, onClose, onConfirm }: AddInfluencerDialogProps) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-sans p-4">
            <div className="relative w-full max-w-sm p-6 bg-slate-900 rounded-lg shadow-lg border border-slate-700">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-300"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="mb-6 text-xl font-bold text-slate-100 text-center">Add Influencer</h2>

                <p className="mb-6 text-slate-300 text-center text-sm">
                    Select the type of influencer you want to add to your list.
                </p>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => onConfirm("short_term")}
                        className="w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Short Term
                    </button>
                    <button
                        onClick={() => onConfirm("fan_pages")}
                        className="w-full px-4 py-3 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                        Fan Page
                    </button>
                </div>
            </div>
        </div>
    )
}

