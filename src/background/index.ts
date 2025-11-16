// This file exists to ensure Plasmo generates a dedicated background
// service worker so that message handlers in `background/messages/*`
// are registered and can receive `sendToBackground` requests.
// No runtime logic is required yet, but this entry point gives us a
// consistent place to add lifecycle hooks later if needed.

export { }