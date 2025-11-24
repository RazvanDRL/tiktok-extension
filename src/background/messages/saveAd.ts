import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { saveExtensionSavedAdRest } from "~repositories/extensionSavedAds"
import { refreshAuthToken, isTokenExpired } from "~utils/refreshAuthToken"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    try {
        const { ad, userId } = req.body

        if (!userId) {
            throw new Error("User ID is required")
        }

        const storage = new Storage()
        let token = await storage.get("firebaseToken")
        const refreshToken = await storage.get("firebaseRefreshToken")

        if (!token && !refreshToken) {
            throw new Error("User is not authenticated (token missing)")
        }

        // Helper to refresh token and update storage
        const performRefresh = async () => {
            console.log("Refreshing token...")
            if (!refreshToken) throw new Error("No refresh token available");
            const refreshResult = await refreshAuthToken(refreshToken);
            if (!refreshResult) throw new Error("Token refresh failed");

            // Update storage
            await storage.set("firebaseToken", refreshResult.id_token);
            if (refreshResult.refresh_token) {
                await storage.set("firebaseRefreshToken", refreshResult.refresh_token);
            }
            return refreshResult.id_token;
        }

        // Check expiry first or if token is missing but we have refresh token
        if (!token || isTokenExpired(token)) {
            console.log("Token expired or missing, refreshing...");
            token = await performRefresh();
        }

        try {
            const result = await saveExtensionSavedAdRest(ad, userId, token)
            res.send({
                status: "success",
                data: result
            })
        } catch (apiError: any) {
            console.error("API Error:", apiError)
            // If 401, try refresh and retry once
            if (apiError.status === 401 || apiError.message?.includes("UNAUTHENTICATED") || apiError.message?.includes("invalid authentication")) {
                console.log("API 401, trying refresh and retry...");
                token = await performRefresh();
                const result = await saveExtensionSavedAdRest(ad, userId, token);
                res.send({
                    status: "success",
                    data: result
                })
            } else {
                throw apiError;
            }
        }

    } catch (err) {
        console.error("Error saving ad in background:", err)
        res.send({
            status: "error",
            error: err.message
        })
    }
}

export default handler
