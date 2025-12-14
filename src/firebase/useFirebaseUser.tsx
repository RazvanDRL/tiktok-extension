import {
    type User,
    browserLocalPersistence,
    onAuthStateChanged,
    setPersistence
} from "firebase/auth"
import { useEffect, useState, useCallback } from "react"
import type { User as UserType } from "~models/user";
import { doc, getDoc } from "firebase/firestore"
import { Storage } from "@plasmohq/storage"

import { sendToBackground } from "@plasmohq/messaging"

import { auth, db } from "./firebaseClient"

setPersistence(auth, browserLocalPersistence)

export default function useFirebaseUser() {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)
    const [manualUser, setManualUser] = useState<UserType | null>(null)
    const [isFetchingManualUser, setIsFetchingManualUser] = useState(false)

    const onLogout = async () => {
        setIsLoading(true)
        if (user) {
            try {
                await auth.signOut()
            } finally {
                try {
                    await sendToBackground({
                        name: "removeAuth" as never,
                        body: {}
                    })
                } catch (err) {
                    console.error("Failed to removeAuth in background:", err)
                }
            }
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

            ; (async () => {
                try {
                    // Get current user auth token
                    const token = await user.getIdToken(true)

                    // Send token to background to save
                    await sendToBackground({
                        name: "saveAuth" as never,
                        body: {
                            token: token as string,
                            uid,
                            refreshToken: user.refreshToken
                        }
                    })
                } catch (err) {
                    console.error("onLogin failed:", err)
                }
            })()
    }

    const fetchManualUser = useCallback(async (): Promise<UserType | null> => {
        setIsFetchingManualUser(true)
        try {
            const storage = new Storage()
            const uid = await storage.get("firebaseUid")

            if (!uid) {
                setIsFetchingManualUser(false)
                return null
            }

            const userDoc = await getDoc(doc(db, "users", uid))
            if (userDoc.exists()) {
                const userData = userDoc.data() as UserType
                // Ensure uid is present
                const userWithUid = { ...userData, uid: uid }
                setManualUser(userWithUid)
                setIsFetchingManualUser(false)
                return userWithUid
            }

            setIsFetchingManualUser(false)
            return null
        } catch (error) {
            console.error("Error fetching manual user:", error)
            setIsFetchingManualUser(false)
            return null
        }
    }, [])

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

    // Automatically fetch manual user when hook loads
    useEffect(() => {
        fetchManualUser()
    }, [fetchManualUser])

    return {
        isLoading,
        user,
        manualUser,
        isFetchingManualUser,
        onLogin,
        onLogout,
        getToken,
        fetchManualUser
    }
}