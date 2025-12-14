import type { PlasmoMessaging } from "@plasmohq/messaging"

const errorToMessage = (err: unknown): string => {
    if (err instanceof Error) return err.message
    try {
        return typeof err === "string" ? err : JSON.stringify(err)
    } catch {
        return String(err)
    }
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    try {
        const { url } = req.body ?? {}

        if (!url || typeof url !== "string") {
            res.send({ ok: false, error: "missing_url" })
            return
        }

        const response = await fetch("http://49.13.217.93:9000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer cobalt"
            },
            body: JSON.stringify({ url })
        })

        let data: any = null
        try {
            data = await response.json()
        } catch {
            const text = await response.text()
            res.send({
                ok: false,
                error: `Invalid JSON response: ${text.substring(0, 100)}`
            })
            return
        }

        if (!response.ok) {
            res.send({
                ok: false,
                error: data?.error || data?.message || `API error: ${response.status}`
            })
            return
        }

        const downloadUrl =
            typeof data?.url === "string" && data.url.trim().length > 0
                ? data.url
                : null

        if (!downloadUrl) {
            res.send({
                ok: false,
                error: "missing_download_url"
            })
            return
        }

        try {
            const downloadId = await chrome.downloads.download({
                url: downloadUrl,
                saveAs: false
            })

            res.send({
                ok: true,
                status: response.status,
                url: downloadUrl,
                downloadId: downloadId
            })
        } catch (downloadErr: any) {
            console.error(downloadErr)
            res.send({
                ok: false,
                error: `download_failed:${errorToMessage(downloadErr)}`
            })
        }
    } catch (err: any) {
        console.error(err)
        res.send({
            ok: false,
            error: `handler_failed:${errorToMessage(err)}`
        })
    }
}

export default handler


