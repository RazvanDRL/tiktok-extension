import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { doc, getDoc } from "firebase/firestore"

import { isTokenExpired, refreshAuthToken } from "../../utils/refreshAuthToken"
import { db } from "~firebase/firebaseClient"
import type { User as UserType } from "~models/user"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    try {
        let { url } = req.body ?? {}
        const { prompt, count = 1, duration = 8, size = "720x1280", fps, max_duration, adConfig } = req.body ?? {}

        if (!url && req.sender?.tab?.url) {
            url = req.sender.tab.url
        }

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

        // Fetch user data from Firestore
        let manualUser: UserType | null = null
        try {
            const userDoc = await getDoc(doc(db, "users", uid as string))
            if (userDoc.exists()) {
                manualUser = { ...userDoc.data(), uid: uid as string } as UserType
            }
        } catch (error) {
            console.error("Error fetching user data:", error)
        }

        const requestBody: any = {
            url: url as string,
            userId: uid as string,
            prompt: prompt as string,
            count: count as number,
            duration: duration as number,
            size: size as string,
            uploaded_by: manualUser?.name || "[extension]",
            language: "english",
        }

        // Add optional fields only if they are provided
        if (typeof fps === "number") {
            requestBody.fps = fps
        }

        if (typeof max_duration === "number") {
            requestBody.max_duration = max_duration
        }

        // Only include payload if adConfig is provided and valid
        if (adConfig) {
            requestBody.payload = adConfig
        }

        console.log("Sending request to generate-from-tiktok API:")
        console.log("- URL:", url)
        console.log("- Prompt:", prompt)
        console.log("- Count:", count, "Duration:", duration, "Size:", size)
        console.log("- FPS:", fps, "Max Duration:", max_duration)
        if (adConfig) {
            console.log("- Ad Config:", JSON.stringify(adConfig, null, 2))
        }

        let response;
        try {
            response = await fetch("https://adloops.ai/api/ai-videos/generate-from-tiktok", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody),
                credentials: 'omit'
            })
        } catch (fetchError: any) {
            console.error("Fetch failed immediately:", fetchError);
            // Check if it's a network error or something else
            res.send({ ok: false, error: `Network request failed: ${fetchError.message || "Unknown error"}` });
            return;
        }

        let data: any = null
        try {
            data = await response.json()
        } catch {
            const text = await response.text()
            res.send({
                ok: false,
                error: `Invalid JSON response (${response.status}): ${text.substring(0, 100)}`
            })
            return
        }

        if (!response.ok) {
            console.error("API responded with error:", response.status, data);
            res.send({
                ok: false,
                error: data?.error || data?.message || `API error: ${response.status}`
            })
            return
        }

        res.send({
            ok: true,
            data
        })
        return
    } catch (err: any) {
        console.error("Handler error:", err)
        res.send({ ok: false, error: `Handler error: ${err.message}` })
    }
}

export default handler
