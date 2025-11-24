import React, { useState, useEffect } from "react"
import { Button } from "~components/ui/button"
import useFirebaseUser from "~firebase/useFirebaseUser"
import { sendToBackground } from "@plasmohq/messaging"
import type { ExtensionSavedAds } from "~models/extension-saved-ads"

interface AdLibrarySaveButtonProps {
    adCard: HTMLElement
}

export const AdLibrarySaveButton = ({ adCard }: AdLibrarySaveButtonProps) => {
    const { user, manualUser } = useFirebaseUser()
    const [isLoading, setIsLoading] = useState(false)

    const activeUser = user || manualUser

    const extractAdInfo = (element: HTMLElement): ExtensionSavedAds | null => {
        const text = element.innerText

        const libraryIdMatch = text.match(/Library ID: (\d+)/)
        if (!libraryIdMatch) return null

        let adBody = null
        const bodyMatch = text.match(/Sponsored\s+(.*)/s)

        if (bodyMatch) {
            adBody = bodyMatch[1].trim()
        }

        const mediaElements = element.querySelectorAll('img, video')
        let mediaUrl = ''
        let mediaType = ''
        let mediaPoster = ''

        let maxImgArea = 0

        mediaElements.forEach((el) => {
            if (el.tagName.toLowerCase() === 'video') {
                const video = el as HTMLVideoElement
                const src = video.src || video.querySelector('source')?.getAttribute('src')

                if (src && !src.startsWith('blob:')) {
                    mediaUrl = src
                    mediaType = 'video'
                } else if (video.poster) {
                    mediaPoster = video.poster
                    if (!mediaUrl) {
                        mediaType = 'video_poster'
                        mediaUrl = video.poster
                    }
                }
            } else if (el.tagName.toLowerCase() === 'img') {
                const img = el as HTMLImageElement
                const width = img.width || img.naturalWidth
                const height = img.height || img.naturalHeight
                const area = width * height

                if (area > 2500 && area > maxImgArea) {
                    maxImgArea = area
                    mediaUrl = img.src
                    mediaType = 'image'
                }
            }
        })

        return {
            libraryId: libraryIdMatch[1],
            adBody: adBody,
            mediaUrl: mediaUrl || null,
            mediaType: mediaType || null,
            mediaPoster: mediaPoster || null,
        }
    }

    const handleSave = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!activeUser) {
            alert("Please login to the extension first")
            return
        }

        setIsLoading(true)
        try {
            const adInfo = extractAdInfo(adCard)
            if (!adInfo) {
                throw new Error("Could not extract ad info")
            }

            console.log("Ad Info Extracted:", adInfo)

            // Send to background script to handle saving (and auth/storage access)
            const response = await sendToBackground({
                name: "saveAd",
                body: {
                    ad: adInfo,
                    userId: activeUser.uid
                }
            })

            if (response.status === "error") {
                throw new Error(response.error)
            }

            alert("Ad saved successfully!")
        } catch (error) {
            console.error("Error saving ad:", error)
            alert("Failed to save ad: " + (error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full p-2 mt-2 border-t border-gray-200">
            <Button
                onClick={handleSave}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {isLoading ? "Saving..." : "Save"}
            </Button>
        </div>
    )
}
