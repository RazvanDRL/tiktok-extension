import React from "react"
import { Button } from "~components/ui/button"

interface AdLibrarySaveButtonProps {
    adCard: HTMLElement
}

export const AdLibrarySaveButton = ({ adCard }: AdLibrarySaveButtonProps) => {
    const extractAdInfo = (element: HTMLElement) => {
        const text = element.innerText

        const libraryIdMatch = text.match(/Library ID: (\d+)/)

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
            libraryId: libraryIdMatch ? libraryIdMatch[1] : null,
            adBody: adBody,
            mediaUrl: mediaUrl,
            mediaType: mediaType,
            mediaPoster: mediaPoster,
        }
    }

    const handleSave = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        const adInfo = extractAdInfo(adCard)
        console.log("Ad Info Extracted:", adInfo)
    }

    return (
        <div className="w-full p-2 mt-2 border-t border-gray-200">
            <Button
                onClick={handleSave}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Save
            </Button>
        </div>
    )
}
