import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

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
        const { token, uid, refreshToken } = req.body
        const storage = new Storage()

        await storage.set("firebaseToken", token)
        await storage.set("firebaseUid", uid)
        await storage.set("firebaseRefreshToken", refreshToken)

        res.send({
            ok: true
        })
    } catch (err) {
        console.error("saveAuth error:", err)
        res.send({ ok: false, error: errorToMessage(err) })
    }
}

export default handler