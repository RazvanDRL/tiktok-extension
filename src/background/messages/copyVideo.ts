import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { doc, getDoc } from "firebase/firestore"

import { isTokenExpired, refreshAuthToken } from "../../utils/refreshAuthToken"
import { db } from "~firebase/firebaseClient"
import type { User as UserType } from "~models/user"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const fetchWithRetry = async (
    body: any,
    token: string,
    attempts = 3,
): Promise<{ response: Response }> => {
    let lastError: any = null

    for (let attempt = 0; attempt < attempts; attempt++) {
        const endpoint = "https://adloops.ai/api/ai-videos/generate-from-tiktok";

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body),
                credentials: "omit",
            })

            if (!response.ok && response.status >= 500 && attempt < attempts - 1) {
                lastError = new Error(`Server responded ${response.status}`)
                await delay(750 * (attempt + 1))
                continue
            }

            return { response }
        } catch (err: any) {
            lastError = err
            if (attempt < attempts - 1) {
                await delay(750 * (attempt + 1))
                continue
            }
            throw err
        }
    }

    throw lastError ?? new Error("Unknown network error")
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    // Keep the service worker alive while waiting for long-running API calls.
    const keepAlive = setInterval(() => {
        try {
            // Accessing runtime id is a cheap no-op that keeps the worker active.
            chrome.runtime?.id
        } catch {
            // Ignore; just best-effort to prevent idle shutdown.
        }
    }, 20_000)

    const sendError = (error: string) => {
        clearInterval(keepAlive)
        res.send({ ok: false, error })
    }

    try {
        let { url } = req.body ?? {}
        const { prompt, count = 1, duration = 8, size = "720x1280", fps, max_duration, adConfig } = req.body ?? {}

        if (!url && req.sender?.tab?.url) {
            url = req.sender.tab.url
        }

        if (!url || !prompt || !count || !duration || !size) {
            return sendError("missing_required_fields")
        }

        const storage = new Storage()
        let token = await storage.get("firebaseToken")
        const uid = await storage.get("firebaseUid")
        const refreshToken = await storage.get("firebaseRefreshToken")

        if (!token || !uid) {
            return sendError("user_not_found")
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
                    return sendError("auth_expired_refresh_failed")
                }
            } else {
                console.error("Token expired and no refresh token found")
                return sendError("auth_expired_no_refresh_token")
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
            uploaded_by: manualUser?.name ? `[E]${manualUser.name}` : "[EXTENSION]",
            language: "english"
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

        let response: Response

        try {
            const result = await fetchWithRetry(requestBody, token as string)
            console.log("Fetch response:", result.response)
            response = result.response
        } catch (fetchError: any) {
            console.error("Fetch error:", fetchError)
            return sendError(fetchError?.message || "fetch_failed")
        }

        let data: any = null
        try {
            data = await response.json()
        } catch {
            const text = await response.text()
            console.error("Invalid JSON response:", text)
            return sendError(`invalid_json_response:${text.substring(0, 100)}`)
        }

        if (!response.ok) {
            console.error("API responded with error:", response.status, data)
            return sendError(data?.error || data?.message || `api_error_${response.status}`)
        }

        res.send({
            ok: true,
            data
        })
        return
    } catch (err: any) {
        console.error("Handler error:", err)
        return sendError(err?.message || "unknown_error")
    } finally {
        clearInterval(keepAlive)
    }
}

export default handler
