export function getCurrentUrl(doc: Document = document, loc: Location = window.location): string | null {
    const currentHref = loc?.href ?? ""

    // 1) If we're already on a canonical video URL, just normalize it
    if (currentHref.includes("/video/")) {
        const parsed = parseVideoFromUrl(currentHref)
        if (parsed) {
            return buildCanonicalVideoUrl(parsed.username, parsed.videoId)
        }
        return stripParams(currentHref)
    }

    // 2) Try to resolve the active in-viewport video on feed/search pages
    const activeVideo = pickActiveVideo(doc)
    if (activeVideo) {
        const container = findVideoContainer(activeVideo)
        const { username, videoId } = extractVideoContext(doc, container, activeVideo)

        if (username && videoId) {
            return buildCanonicalVideoUrl(username, videoId)
        }

        if (username) {
            return buildCanonicalProfileUrl(username)
        }
    }

    // 3) Fallbacks – try lightweight metadata based detection
    const usernameFromDoc = extractUsernameFromDoc(doc)
    if (usernameFromDoc) {
        return buildCanonicalProfileUrl(usernameFromDoc)
    }

    const fromOg = extractCanonicalFromOg(doc)
    if (fromOg) return fromOg

    return null
}

function stripParams(href: string): string {
    try {
        const url = new URL(href)
        url.search = ""
        url.hash = ""
        return url.toString()
    } catch {
        return href.split("#")[0].split("?")[0]
    }
}

function buildCanonicalProfileUrl(username: string): string {
    const normalized = username.replace(/^@/, "")
    return `https://www.tiktok.com/@${normalized}`
}

function buildCanonicalVideoUrl(username: string, videoId: string): string {
    const normalized = username.replace(/^@/, "")
    return `https://www.tiktok.com/@${normalized}/video/${videoId}`
}

function parseVideoFromUrl(href: string): { username: string, videoId: string } | null {
    try {
        const url = new URL(href)
        // pathname is like: /@user/video/1234567890123456789
        const m = url.pathname.match(/\/@([^/]+)\/video\/([^/?#]+)/)
        if (m) {
            return { username: m[1], videoId: m[2] }
        }
    } catch {
        const m = href.match(/\/@([^/]+)\/video\/([^/?#]+)/)
        if (m) {
            return { username: m[1], videoId: m[2] }
        }
    }
    return null
}

function extractUsernameFromDoc(doc: Document): string | null {
    // Strong signals commonly found on video cards and profile headers
    const candidates: Array<() => string | null> = [
        // E2E unique id text (video surface)
        () => textContent(doc.querySelector('[data-e2e="video-author-uniqueid"]')),
        // Profile header unique id
        () => textContent(doc.querySelector('[data-e2e="user-title"]')),
        // Any @username-like text near headers
        () => {
            const header = doc.querySelector('h3[data-e2e="browse-user-name"], h1[data-e2e="profile-username"]')
            const t = textContent(header)
            if (t && /^@?[\w\.\-_]{1,50}$/.test(t)) return t
            return null
        },
        // Links that start with /@username
        () => {
            const link = doc.querySelector('a[href^="/@"]') as HTMLAnchorElement | null
            const href = link?.getAttribute("href") ?? ""
            const m = href.match(/\/@([^/?#]+)/)
            return m?.[1] ?? null
        },
        // OpenGraph URL as last resort
        () => {
            const og = doc.querySelector('meta[property="og:url"]')?.getAttribute("content") ?? ""
            const m = og.match(/\/@([^/?#]+)/)
            return m?.[1] ?? null
        }
    ]

    for (const get of candidates) {
        const v = get()
        if (v) return v
    }
    return null
}

function extractCanonicalFromOg(doc: Document): string | null {
    const og = doc.querySelector('meta[property="og:url"]')?.getAttribute("content") ?? ""
    if (!og) return null
    // Normalize to canonical forms we care about
    const video = parseVideoFromUrl(og)
    if (video) return buildCanonicalVideoUrl(video.username, video.videoId)
    const m = og.match(/\/@([^/?#]+)/)
    if (m) return buildCanonicalProfileUrl(m[1])
    return stripParams(og)
}

function textContent(el: Element | null | undefined): string | null {
    const t = el?.textContent?.trim()
    return t && t.length > 0 ? t : null
}

// ---------- Active video discovery ----------

function findCandidateVideos(doc: Document): HTMLVideoElement[] {
    return Array.from(doc.querySelectorAll("video")) as HTMLVideoElement[]
}

function isElementVisibleInViewport(el: Element): boolean {
    const rect = el.getBoundingClientRect()
    if (rect.width <= 0 || rect.height <= 0) return false
    return rect.bottom > 0 && rect.top < window.innerHeight
}

function pickActiveVideo(doc: Document): HTMLVideoElement | null {
    const videos = findCandidateVideos(doc)
    if (videos.length === 0) return null

    const viewportCenter = window.innerHeight / 2
    let best: HTMLVideoElement | null = null
    let bestScore = Number.POSITIVE_INFINITY

    for (const v of videos) {
        if (!isElementVisibleInViewport(v)) continue
        const rect = v.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const distance = Math.abs(center - viewportCenter)
        const playing = !v.paused && !v.ended && v.readyState >= 2
        const score = playing ? distance * 0.5 : distance
        if (score < bestScore) {
            best = v
            bestScore = score
        }
    }
    return best ?? videos[0] ?? null
}

function findVideoContainer(video: HTMLVideoElement): Element | null {
    // Common wrapper id pattern seen on TikTok feed cards
    let container: Element | null = video.closest('[id^="xgwrapper-"]')
    if (container) return container

    // Likely player containers
    container =
        video.closest('div[class*="DivPlayerContainer"]') ||
        video.closest('div[class*="player"]') ||
        video.closest('div[class*="video"]') ||
        video.closest('section') ||
        video.parentElement

    // Walk up a few levels to catch nearby metadata when structure varies
    let depth = 0
    let current = container
    while (current && depth < 5 && !hasLikelyAuthorOrLink(current)) {
        current = current.parentElement
        depth++
    }
    return current ?? container ?? video.parentElement
}

function hasLikelyAuthorOrLink(el: Element): boolean {
    if (!el) return false
    return Boolean(
        el.querySelector('[data-e2e*="author"]') ||
        el.querySelector('a[href^="/@"]') ||
        el.querySelector('[data-e2e="video-author-uniqueid"]')
    )
}

function extractVideoContext(
    doc: Document,
    container: Element | null,
    video: HTMLVideoElement
): { username: string | null; videoId: string | null } {
    const username = extractUsernameNear(doc, container)
    const videoId = extractVideoIdNear(container, video)
    return { username, videoId }
}

function extractUsernameNear(doc: Document, container: Element | null): string | null {
    type QueryableRoot = Document | Element
    const scopes: QueryableRoot[] = []
    if (container) scopes.push(container)
    scopes.push(doc)

    for (const scope of scopes) {
        // Prefer explicit author elements
        const uniqueId =
            textContent(scope.querySelector('[data-e2e="video-author-uniqueid"]')) ||
            textContent(scope.querySelector('[data-e2e="user-title"]'))
        if (uniqueId) return uniqueId

        // Links beginning with /@username
        const link = scope.querySelector('a[href^="/@"]') as HTMLAnchorElement | null
        const href = link?.getAttribute("href") ?? ""
        if (href) {
            const m = href.match(/\/@([^/?#]+)/)
            if (m?.[1]) return m[1]
        }

        // Text nodes that look like @username
        const header = scope.querySelector('h3[data-e2e="browse-user-name"], h1[data-e2e="profile-username"]')
        const headerText = textContent(header)
        if (headerText && /^@?[\w\.\-_]{1,50}$/.test(headerText)) return headerText.replace(/^@/, "")
    }
    return null
}

function extractVideoIdNear(container: Element | null, video: HTMLVideoElement): string | null {
    // Wrapper id format like xgwrapper-0-<VIDEO_ID>
    const withId =
        container?.closest('[id^="xgwrapper-"]') ??
        video.closest('[id^="xgwrapper-"]') ??
        container ??
        video.parentElement

    const idAttr = withId?.getAttribute?.("id") ?? ""
    if (idAttr) {
        const m = idAttr.match(/^xgwrapper-\d+-(.+)$/)
        if (m?.[1]) return m[1]
    }

    // Anchor within the card that links to the video page
    const anchor =
        container?.querySelector('a[href*="/video/"]') ||
        withId?.querySelector?.('a[href*="/video/"]') ||
        video.closest('a[href*="/video/"]')
    const href = (anchor as HTMLAnchorElement | null)?.getAttribute?.("href") ?? ""
    if (href) {
        const parsed = parseVideoFromUrl(href)
        if (parsed?.videoId) return parsed.videoId
    }
    return null
}