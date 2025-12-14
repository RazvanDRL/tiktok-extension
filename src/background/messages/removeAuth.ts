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
        const storage = new Storage()

        await storage.set("firebaseToken", null)
        await storage.set("firebaseUid", null)
        await storage.set("firebaseRefreshToken", null)

        res.send({
            ok: true
        })
    } catch (err) {
        console.error("removeAuth error:", err)
        res.send({ ok: false, error: errorToMessage(err) })
    }
}

export default handler
