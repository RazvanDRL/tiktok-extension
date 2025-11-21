import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import { isTokenExpired, refreshAuthToken } from "../../utils/refreshAuthToken"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    try {
        const { url, prompt, count = 1, duration = 8, size = "720x1280", fps, max_duration } = req.body ?? {}

        if (!url || !prompt || !count || !duration || !size) {
            res.send({ ok: false, error: "missing_required_fields" })
            return
        }

        const storage = new Storage()
        let token = await storage.get("firebaseToken")
        const uid = await storage.get("firebaseUid")
        const refreshToken = await storage.get("firebaseRefreshToken")

        if (!token || !uid) {
            res.send({ ok: false, error: "user_not_found" })
            return
        }

        if (isTokenExpired(token)) {
            if (refreshToken) {
                console.log("Token expired, refreshing...")
                const newTokens = await refreshAuthToken(refreshToken)
                if (newTokens) {
                    token = newTokens.id_token
                    await storage.set("firebaseToken", newTokens.id_token)
                    await storage.set("firebaseRefreshToken", newTokens.refresh_token)
                    console.log("Token refreshed successfully")
                } else {
                    console.error("Failed to refresh token")
                    res.send({ ok: false, error: "auth_expired_refresh_failed" })
                    return
                }
            } else {
                console.error("Token expired and no refresh token found")
                res.send({ ok: false, error: "auth_expired_no_refresh_token" })
                return
            }
        }

        const requestBody = {
            url: url as string,
            userId: uid as string,
            prompt: prompt as string,
            count: count as number,
            duration: duration as number,
            size: size as string,
            fps: typeof fps === "number" ? fps : undefined,
            max_duration: typeof max_duration === "number" ? max_duration : undefined,
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
    } catch (err: any) {
        console.error(err)
        res.send({ ok: false, error: err.message })
    }
}

export default handler
