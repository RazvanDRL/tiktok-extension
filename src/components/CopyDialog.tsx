import { useEffect, useState } from "react"
import { Trash, X } from "lucide-react"
import { Storage } from "@plasmohq/storage"

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
const DEFAULT_PROMPT = `you are the world's most intuitive visual communicator and expert prompt engineer. You possess a deep understanding of cinematic language, narrative structure, emotional resonance, the critical concept of filmic coverage and the specific capabilities of the sora 2 model. Your mission is to transform my conceptual ideas into meticulously crafted, narrative-style text-to-video prompts that are visually breathtaking and technically precise. create a json explaining this style in detailes, besides that ignore the text, {your_prompt} please make it: softer detail, more pixel noise, lower dynamic range, slightly compressed audio, harsher blown highlights`

export const CopyDialog = ({ isOpen, onClose, onSubmit }: CopyDialogProps) => {
    const [userPrompt, setUserPrompt] = useState("")
    const [count, setCount] = useState(1)
    const [duration, setDuration] = useState(8)
    const [size, setSize] = useState("720x1280")
    const [fps, setFps] = useState(3)
    const [maxDuration, setMaxDuration] = useState(3)
    const [history, setHistory] = useState<string[]>([])
    const [isHistoryOpen, setIsHistoryOpen] = useState(false)
    const storage = new Storage()

    const HISTORY_KEY = "promptHistory"
    const MAX_HISTORY = 20

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const saved = (await storage.get(HISTORY_KEY)) as string[] | null
                if (Array.isArray(saved)) {
                    setHistory(saved)
                } else {
                    setHistory([])
                }
            } catch {
                setHistory([])
            }
        }
        if (isOpen) {
            loadHistory()
        }
    }, [isOpen])

    if (!isOpen) return null

    const stopKeyPropagation = (e: React.KeyboardEvent) => {
        e.stopPropagation()
        const nativeEvent = e.nativeEvent as any
        if (nativeEvent?.stopImmediatePropagation) {
            nativeEvent.stopImmediatePropagation()
        }
        // Do NOT call preventDefault so typing (including Space) still works
    }

    const savePromptToHistory = async (text: string) => {
        const trimmed = text.trim()
        if (!trimmed) return
        try {
            const current = (await storage.get(HISTORY_KEY)) as string[] | null
            const next = [trimmed, ...(Array.isArray(current) ? current : [])]
                .filter((item, idx, arr) => arr.indexOf(item) === idx)
                .slice(0, MAX_HISTORY)
            await storage.set(HISTORY_KEY, next)
            setHistory(next)
        } catch {
            // ignore storage errors silently
        }
    }

    const extractUserFromHistory = (value: string) => {
        const trimmed = value.trim()
        const placeholder = "{your_prompt}"
        if (DEFAULT_PROMPT.includes(placeholder)) {
            const [before, after] = DEFAULT_PROMPT.split(placeholder)
            const startsWithBefore = trimmed.startsWith(before)
            const endsWithAfter = trimmed.endsWith(after)
            if (startsWithBefore && endsWithAfter) {
                const middle = trimmed.slice(before.length, trimmed.length - after.length)
                return middle.trimStart()
            }
        }
        // Fallback for any legacy history that might have stored the full prompt with the default prefix
        if (trimmed.startsWith(DEFAULT_PROMPT)) {
            const remainder = trimmed.slice(DEFAULT_PROMPT.length)
            return remainder.replace(/^\s*\n+/, "").trimStart()
        }
        return trimmed
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const userText = userPrompt.trim()
        const hasPlaceholder = DEFAULT_PROMPT.includes("{your_prompt}")
        const finalPrompt = hasPlaceholder
            ? DEFAULT_PROMPT.replace(/\{your_prompt\}/g, userText)
            : `${DEFAULT_PROMPT}${userText ? `\n\n${userText}` : ""}`
        await savePromptToHistory(userPrompt)
        onSubmit({ prompt: finalPrompt, count, duration, size, fps, max_duration: maxDuration })
        setUserPrompt("")
        onClose()
    }

    const clearHistory = async () => {
        try {
            await storage.set(HISTORY_KEY, [])
            setHistory([])
            setIsHistoryOpen(false)
        } catch {
            // ignore storage errors silently
        }
    }

    const removeHistoryAt = async (index: number) => {
        try {
            const next = history.filter((_, i) => i !== index)
            await storage.set(HISTORY_KEY, next)
            setHistory(next)
        } catch {
            // ignore storage errors silently
        }
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
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-200">Final prompt</label>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">read-only · inserts at {'{your_prompt}'}</span>
                        </div>
                        <div className="w-full p-3 text-xs leading-5 text-slate-300 bg-slate-800/70 border border-dashed border-slate-600 rounded-lg max-h-48 overflow-auto">
                            <pre className="whitespace-pre-wrap font-mono">
                                {DEFAULT_PROMPT.split("{your_prompt}").map((part, idx, arr) => (
                                    <span key={`dp-${idx}`}>
                                        {part}
                                        {idx < arr.length - 1 && (
                                            <span className={userPrompt ? "text-yellow-300" : "text-yellow-300 italic"}>
                                                {userPrompt || "{your_prompt}"}
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </pre>
                        </div>
                    </div>

                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <label
                                htmlFor="user-prompt"
                                className="block text-sm font-medium text-slate-200"
                            >
                                Your additions
                            </label>
                            {history.length > 0 && (
                                <div className="ml-auto relative">
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            className="px-2 py-1 text-xs bg-slate-800 border border-slate-700 rounded-md text-slate-300 hover:bg-slate-700"
                                            onClick={() => setUserPrompt(extractUserFromHistory(history[0] ?? ""))}
                                            title="Insert your most recent addition"
                                        >
                                            Restore last
                                        </button>
                                        <button
                                            type="button"
                                            className="px-2 py-1 text-xs bg-slate-800 border border-slate-700 rounded-md text-slate-300 hover:bg-slate-700"
                                            onClick={() => setIsHistoryOpen((v) => !v)}
                                            aria-expanded={isHistoryOpen}
                                            aria-haspopup="listbox"
                                        >
                                            Select previous…
                                        </button>
                                    </div>
                                    {isHistoryOpen && (
                                        <div
                                            className="absolute right-0 mt-2 w-[28rem] max-w-[80vw] bg-slate-900 border border-slate-700 rounded-md shadow-xl overflow-hidden z-10"
                                            role="listbox"
                                            tabIndex={-1}
                                        >
                                            <div className="flex items-center justify-between px-3 py-2 bg-slate-800/60 border-b border-slate-700">
                                                <span className="text-xs text-slate-300 pr-2">History</span>
                                            </div>
                                            <ul className="max-h-64 overflow-auto divide-y divide-slate-800">
                                                {history.map((h, i) => (
                                                    <li key={`${i}-${h.slice(0, 8)}`} className="group">
                                                        <div className="flex items-start gap-2 px-3 py-2 hover:bg-slate-800 cursor-pointer" onClick={() => {
                                                            setUserPrompt(extractUserFromHistory(h))
                                                            setIsHistoryOpen(false)
                                                        }}>
                                                            <button
                                                                type="button"
                                                                className="flex-1 text-left text-xs text-slate-200 leading-5"
                                                                title={h}
                                                                onClick={() => {
                                                                    setUserPrompt(extractUserFromHistory(h))
                                                                    setIsHistoryOpen(false)
                                                                }}
                                                            >
                                                                {h.length > 180 ? `${h.slice(0, 180)}…` : h}
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))}
                                                {history.length === 0 && (
                                                    <li className="px-3 py-3 text-xs text-slate-400">No history yet</li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <textarea
                            id="user-prompt"
                            value={userPrompt}
                            onChange={(e) => setUserPrompt(e.target.value)}
                            onKeyDown={stopKeyPropagation}
                            onKeyUp={stopKeyPropagation}
                            className="w-full p-2.5 text-sm text-slate-100 bg-slate-800 border border-slate-700 rounded-lg focus:ring-blue-600 focus:border-blue-600 placeholder-slate-400"
                            placeholder="Add your specific idea, scene details, subject, actions, style nuances…"
                            rows={3}
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

