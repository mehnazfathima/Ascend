// Minimal service worker: exists only so the app satisfies PWA installability
// checks (some browsers require an active service worker with a fetch handler
// before showing an install/"Add to Home Screen" prompt). It intentionally
// does no caching — every request is left to the browser's normal network
// handling, since this app is auth-gated and mostly dynamic, and stale cached
// data would be worse than no offline support at all.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // No-op: fall through to default network handling.
});
