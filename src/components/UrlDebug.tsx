import { useEffect, useState } from "react"
import { getCurrentUrl } from "~utils/getCurrentUrl"

export const UrlDebug = () => {
    const [url, setUrl] = useState<string | null>(null)

    useEffect(() => {
        // Refresh periodically and on SPA nav events
        let last: string | null = null

        const recompute = () => {
            try {
                const resolved = getCurrentUrl(document, window.location)
                if (resolved !== last) {
                    last = resolved
                    setUrl(resolved)
                    // eslint-disable-next-line no-console
                    console.log("[log] getCurrentUrl =>", resolved)
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error("[UrlDebug] Error while resolving current URL", e)
                last = null
                setUrl(null)
            }
        }

        // Initial compute
        recompute()

        // Poll to catch dynamic DOM updates
        const intervalId = window.setInterval(recompute, 500)

        // React to history changes as well
        window.addEventListener("popstate", recompute)
        window.addEventListener("hashchange", recompute)

        return () => {
            window.clearInterval(intervalId)
            window.removeEventListener("popstate", recompute)
            window.removeEventListener("hashchange", recompute)
        }
    }, [])

    return (
        <div className="ml-3 px-3 py-2 rounded bg-slate-900/80 text-slate-50 text-xs max-w-xs break-all">
            <div className="font-semibold mb-1">getCurrentUrl</div>
            <div>{url ?? "null"}</div>
        </div>
    )
}


