import { useState } from "react"
import { X } from "lucide-react"

interface CopyDialogProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: {
        prompt: string
        count: number
        duration: number
        size: string
        fps: number
        max_duration: number
    }) => void
}

const COUNT_OPTIONS = [1, 2, 3, 4, 5]
const DURATION_OPTIONS = [4, 8, 12]
const SIZE_OPTIONS = ["720x1280", "1280x720", "1024x1792", "1792x1024"]

export const CopyDialog = ({ isOpen, onClose, onSubmit }: CopyDialogProps) => {
    const [prompt, setPrompt] = useState("")
    const [count, setCount] = useState(1)
    const [duration, setDuration] = useState(8)
    const [size, setSize] = useState("720x1280")
    const [fps, setFps] = useState(3)
    const [maxDuration, setMaxDuration] = useState(3)

    if (!isOpen) return null

    const stopKeyPropagation = (e: React.KeyboardEvent) => {
        e.stopPropagation()
        const nativeEvent = e.nativeEvent as any
        if (nativeEvent?.stopImmediatePropagation) {
            nativeEvent.stopImmediatePropagation()
        }
        // Do NOT call preventDefault so typing (including Space) still works
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!prompt.trim()) {
            alert("Please enter a prompt")
            return
        }
        onSubmit({ prompt, count, duration, size, fps, max_duration: maxDuration })
        setPrompt("")
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-sans">
            <div className="relative w-full max-w-2xl p-6 bg-slate-900 rounded-lg shadow-lg border border-slate-700">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-300"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="mb-4 text-xl font-bold text-slate-100">Generate Video</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="prompt"
                            className="block mb-2 text-sm font-medium text-slate-200"
                        >
                            Prompt
                        </label>
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={stopKeyPropagation}
                            onKeyUp={stopKeyPropagation}
                            className="w-full p-2.5 text-sm text-slate-100 bg-slate-800 border border-slate-700 rounded-lg focus:ring-blue-600 focus:border-blue-600 placeholder-slate-400"
                            placeholder="Enter your prompt..."
                            rows={12}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-200">
                            Count
                        </label>
                        <div className="flex gap-2">
                            {COUNT_OPTIONS.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setCount(option)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${count === option
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-200">
                            Duration (seconds)
                        </label>
                        <div className="flex gap-2">
                            {DURATION_OPTIONS.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setDuration(option)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${duration === option
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-200">
                            Size
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {SIZE_OPTIONS.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setSize(option)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${size === option
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-row gap-2">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-slate-200">
                                FPS: <span className="font-semibold">{fps}</span>
                            </label>
                            <input
                                type="range"
                                min={1}
                                max={7}
                                step={1}
                                value={fps}
                                onChange={(e) => setFps(Number(e.target.value))}
                                className="w-full accent-blue-600"
                            />
                            <div className="mt-1 text-xs text-slate-400">
                                1 to 7 frames per second
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-slate-200">
                                Max duration (seconds): <span className="font-semibold">{maxDuration}</span>
                            </label>
                            <input
                                type="range"
                                min={1}
                                max={10}
                                step={1}
                                value={maxDuration}
                                onChange={(e) => setMaxDuration(Number(e.target.value))}
                                className="w-full accent-blue-600"
                            />
                            <div className="mt-1 text-xs text-slate-400">
                                1 to 10 seconds maximum
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-sm font-medium text-slate-200 bg-slate-800 rounded-lg hover:bg-slate-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Generate
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

