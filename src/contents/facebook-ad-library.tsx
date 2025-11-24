import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { createRoot } from "react-dom/client"
import { AdLibrarySaveButton } from "~components/AdLibrarySaveButton"

export const config: PlasmoCSConfig = {
    matches: ["https://*.facebook.com/ads/library/*"]
}

const CARD_CLASS_STRING = "x1plvlek xryxfnj x1gzqxud x178xt8z x1lun4ml xso031l xpilrb4 xb9moi8 xe76qn7 x21b0me x142aazg x1i5p2am x1whfx0g xr2y4jy x1ihp6rs x1kmqopl x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x9f619"
const CARD_SELECTOR = "." + CARD_CLASS_STRING.split(" ").join(".")

const INJECTED_CLASS = "plasmo-ad-library-save-btn-injected"

const getStyle = (): HTMLStyleElement => {
    const baseFontSize = 16
    // Replace :root with :host to scope styles within Shadow DOM
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

const injectButton = (card: Element) => {
    if (card.classList.contains(INJECTED_CLASS)) return
    card.classList.add(INJECTED_CLASS)

    // Create a container for our shadow root
    const container = document.createElement("div")
    container.style.width = "100%"
    container.className = "plasmo-save-btn-container"

    // Append to the card
    card.appendChild(container)

    const shadow = container.attachShadow({ mode: "open" })
    const style = getStyle()
    shadow.appendChild(style)

    const rootDiv = document.createElement("div")
    // Ensure the root div takes full width and has some basic reset if needed
    rootDiv.style.width = "100%"
    shadow.appendChild(rootDiv)

    const root = createRoot(rootDiv)
    // Pass the card element (cast to HTMLElement) to the component
    root.render(<AdLibrarySaveButton adCard={card as HTMLElement} />)
}

const handleMutations = (mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node instanceof Element) {
                if (node.matches(CARD_SELECTOR)) {
                    injectButton(node)
                }
                const cards = node.querySelectorAll(CARD_SELECTOR)
                cards.forEach(injectButton)
            }
        }
    }
}

// Initialize observer
const observer = new MutationObserver(handleMutations)

// Start observing and initial scan
const init = () => {
    const cards = document.querySelectorAll(CARD_SELECTOR)
    cards.forEach(injectButton)

    observer.observe(document.body, {
        childList: true,
        subtree: true
    })
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}
