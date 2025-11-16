import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    try {
        const { url, prompt, count = 1, duration = 8, size = "720x1280" } = req.body ?? {}

        if (!url || !prompt || !count || !duration || !size) {
            res.send({ ok: false, error: "missing_required_fields" })
            return
        }

        const storage = new Storage()
        const token = await storage.get("firebaseToken")
        const uid = await storage.get("firebaseUid")

        if (!token || !uid) {
            res.send({ ok: false, error: "user_not_found" })
            return
        }

        const requestBody = {
            url: url as string,
            userId: uid as string,
            prompt: prompt as string,
            count: count as number,
            duration: duration as number,
            size: size as string,
            language: "english",
            uploaded_by: "Mariusica",
        }

        const response = await fetch("https://adloops.ai/api/ai-videos/generate-from-tiktok", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
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

        const downloadUrl = data.url;

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
            res.send({
                ok: false,
                error: `Download failed: ${String(downloadErr?.message || downloadErr)}`
            })
        }
    } catch (err: any) {
        res.send({ ok: false, error: String(err?.message || err) })
    }
}

export default handler


