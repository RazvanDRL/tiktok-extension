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
const ENABLE_PLUS_BUTTON_KEY = "enablePlusButton"
const PROFILE_PANEL_SELECTORS = [
    'div[class*="DivButtonPanelWrapper"]',
    'div[class*="ButtonPanelWrapper"]',
    '[data-e2e="profile-button-panel"]',
    '[data-e2e="profile-button-panel-wrapper"]',
    '[data-e2e="profile-user-actions"]',
    '[data-e2e="profile-actions"]'
].join(",")
const FOLLOW_BUTTON_SELECTORS = [
    '[data-e2e="follow-button"]',
    '[data-e2e="follow-btn"]',
    '[data-e2e="follow"]',
    'button[data-e2e*="follow"]',
    'a[data-e2e*="follow"]',
    'button[aria-label*="Follow" i]',
    'a[aria-label*="Follow" i]'
].join(",")
const MESSAGE_BUTTON_SELECTORS = [
    '[data-e2e="message-button"]',
    '[data-e2e="message-btn"]',
    'button[data-e2e*="message"]',
    'a[data-e2e*="message"]',
    'button[aria-label*="Message" i]',
    'a[aria-label*="Message" i]'
].join(",")

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
let plusButtonEnabledState = false

const updateVisibility = () => {
    const shouldHide = !plusButtonEnabledState
    injectedContainers.forEach((container) => {
        container.style.display = shouldHide ? "none" : ""
    })
}

const getProfileButtonPanels = () => {
    if (!PROFILE_PANEL_SELECTORS) {
        return []
    }

    return Array.from(document.querySelectorAll(PROFILE_PANEL_SELECTORS)).filter((node): node is HTMLElement => {
        if (!(node instanceof HTMLElement)) {
            return false
        }

        const hasFollowButton = node.querySelector(FOLLOW_BUTTON_SELECTORS)
        const hasMessageButton = node.querySelector(MESSAGE_BUTTON_SELECTORS)

        return Boolean(hasFollowButton || hasMessageButton)
    })
}

const injectButtons = () => {
    if (!plusButtonEnabledState) {
        return
    }
    const actionBars = document.querySelectorAll('section[class*="SectionActionBarContainer"]')
    const profileButtonPanels = getProfileButtonPanels()

    actionBars.forEach((target) => {
        if (target.classList.contains(INJECTED_CLASS)) {
            return
        }

        target.classList.add(INJECTED_CLASS)

        // Create a container for our shadow host
        const container = document.createElement("div")
        if (!plusButtonEnabledState) {
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

        target.classList.add(INJECTED_CLASS)

        // Create a container for our shadow host
        const container = document.createElement("div")
        if (!plusButtonEnabledState) {
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

const initializeSettings = async () => {
    const plusButtonValue = await storage.get<boolean>(ENABLE_PLUS_BUTTON_KEY)

    plusButtonEnabledState = plusButtonValue ?? false
    updateVisibility()

    if (plusButtonEnabledState) {
        injectButtons()
    }
}

// Listen for changes from popup
storage.watch({
    [ENABLE_PLUS_BUTTON_KEY]: (change) => {
        plusButtonEnabledState = change.newValue ?? false
        updateVisibility()
        if (plusButtonEnabledState) {
            injectButtons()
        }
    }
})

// Initial injection
initializeSettings()

// Observer for dynamic content
const observer = new MutationObserver((mutations) => {
    let shouldInject = false
    for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
            shouldInject = true
            break
        }
    }

    if (shouldInject && plusButtonEnabledState) {
        injectButtons()
    }
})

observer.observe(document.body, {
    childList: true,
    subtree: true
})

