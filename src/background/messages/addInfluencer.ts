import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import { isTokenExpired, refreshAuthToken } from "../../utils/refreshAuthToken"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    try {
        const { authorLink } = req.body ?? {}

        if (!authorLink) {
            res.send({ ok: false, error: "missing_author_link" })
            return
        }

        const storage = new Storage()
        let token = await storage.get("firebaseToken")
        const refreshToken = await storage.get("firebaseRefreshToken")

        if (!token) {
            res.send({ ok: false, error: "user_not_authenticated" })
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

        console.log("Sending request to add-influencer API:", authorLink)

        const response = await fetch("https://c7cbaf2e80c1.ngrok-free.app/api/add-influencer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                username: authorLink.replace("/@", "")
            })
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

        res.send({
            ok: true,
            data
        })
    } catch (err: any) {
        console.error(err)
        res.send({ ok: false, error: err.message })
    }
}

export default handler

