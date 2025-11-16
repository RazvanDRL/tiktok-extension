import {
    type User,
    browserLocalPersistence,
    onAuthStateChanged,
    setPersistence
} from "firebase/auth"
import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { auth } from "./firebaseClient"

setPersistence(auth, browserLocalPersistence)

export default function useFirebaseUser() {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    const onLogout = async () => {
        setIsLoading(true)
        if (user) {
            await auth.signOut()

            await sendToBackground({
                name: "removeAuth" as never,
                body: {}
            })
        }
    }

    const getToken = async (forceRefresh = true): Promise<string | null> => {
        if (!user) return null

        try {
            const token = await user.getIdToken(forceRefresh as boolean)
            return token
        } catch (error) {
            console.error("Error getting token:", error)
            return null
        }
    }

    const onLogin = () => {
        if (!user) return

        const uid = user.uid

        // Get current user auth token
        user.getIdToken(true).then(async (token) => {
            // Send token to background to save
            await sendToBackground({
                name: "saveAuth" as never,
                body: {
                    token: token as string,
                    uid,
                    refreshToken: user.refreshToken
                }
            })
        })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsLoading(false)
            setUser(user)
        })
    }, [])

    useEffect(() => {
        if (user) {
            onLogin()
        }
    }, [user])

    return {
        isLoading,
        user,
        onLogin,
        onLogout,
        getToken
    }
}