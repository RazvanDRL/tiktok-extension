import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { createRoot } from "react-dom/client"
import { Storage } from "@plasmohq/storage"
import PlusButton from "~features/plus-button"

export const config: PlasmoCSConfig = {
    matches: ["https://*.tiktok.com/*"],
    exclude_matches: ["https://ads.tiktok.com/*"]
}

const INJECTED_CLASS = "plasmo-plus-button-injected"
const storage = new Storage()
const HIDE_BUTTONS_KEY = "hideContentButtons"

const getStyle = (): HTMLStyleElement => {
    const baseFontSize = 16

    // Scope styles to the shadow host
    let updatedCssText = cssText.replaceAll(":root", ":host")
    const remRegex = /([\d.]+)rem/g
    updatedCssText = updatedCssText.replace(remRegex, (match, remValue) => {
        const pixelsValue = parseFloat(remValue) * baseFontSize

        return `${pixelsValue}px`
    })

    const styleElement = document.createElement("style")
    styleElement.textContent = updatedCssText
    return styleElement
}

// Track all injected containers so we can show/hide them
const injectedContainers: HTMLElement[] = []

const updateVisibility = (hidden: boolean) => {
    injectedContainers.forEach((container) => {
        container.style.display = hidden ? "none" : ""
    })
}

const injectButtons = async () => {
    const hideButtons = await storage.get<boolean>(HIDE_BUTTONS_KEY)

    const actionBars = document.querySelectorAll('section[class*="SectionActionBarContainer"]')
    const profileButtonPanels = document.querySelectorAll('div[class*="DivButtonPanelWrapper"]')

    actionBars.forEach((target) => {
        if (target.classList.contains(INJECTED_CLASS)) {
            return
        }

        target.classList.add(INJECTED_CLASS)

        // Create a container for our shadow host
        const container = document.createElement("div")
        if (hideButtons) {
            container.style.display = "none"
        }
        injectedContainers.push(container)

        // Insert at the beginning of the action bar (top of the buttons)
        target.insertAdjacentElement("afterbegin", container)

        const shadowRoot = container.attachShadow({ mode: "open" })
        const style = getStyle()
        shadowRoot.appendChild(style)

        const root = createRoot(shadowRoot)
        root.render(<PlusButton container={target as HTMLElement} />)
    })

    profileButtonPanels.forEach((target) => {
        if (target.classList.contains(INJECTED_CLASS)) {
            return
        }

        // Ensure this is likely the correct panel (contains Follow/Message buttons)
        if (!target.textContent?.includes("Follow") && !target.textContent?.includes("Message")) {
            return
        }

        target.classList.add(INJECTED_CLASS)

        // Create a container for our shadow host
        const container = document.createElement("div")
        if (hideButtons) {
            container.style.display = "none"
        }
        injectedContainers.push(container)

        // Append to the end of the panel (right side)
        target.appendChild(container)

        const shadowRoot = container.attachShadow({ mode: "open" })
        const style = getStyle()
        shadowRoot.appendChild(style)

        const root = createRoot(shadowRoot)
        root.render(<PlusButton container={target as HTMLElement} variant="profile" />)
    })
}

// Listen for changes from popup
storage.watch({
    [HIDE_BUTTONS_KEY]: (change) => {
        updateVisibility(change.newValue ?? false)
    }
})

// Initial injection
injectButtons()

// Observer for dynamic content
const observer = new MutationObserver((mutations) => {
    let shouldInject = false
    for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
            shouldInject = true
            break
        }
    }

    if (shouldInject) {
        injectButtons()
    }
})

observer.observe(document.body, {
    childList: true,
    subtree: true
})

