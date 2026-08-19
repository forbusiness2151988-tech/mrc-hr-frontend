// Minimal service worker so the app qualifies as an installable PWA and
// the shell (HTML/JS/CSS) loads fast/offline. API calls always go to the
// network — this never caches employee or attendance data.
const CACHE_NAME = "mrc-hr-shell-v1";
const SHELL_FILES = ["/", "/index.html", "/manifest.json", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Never cache API requests — always fetch fresh data (attendance, payroll, etc.)
  if (url.pathname.startsWith("/api")) return;

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
