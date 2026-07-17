const CACHE = "poker-twin-v10";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

function isAppShellRequest(req) {
  const url = new URL(req.url);
  if (url.origin !== location.origin) return false;
  return req.mode === "navigate" || url.pathname === "/" || url.pathname.endsWith("/index.html");
}

// Keep navigation fresh: network-first for app shell, cache-first for other same-origin assets.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  if (isAppShellRequest(e.request)) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res.ok) caches.open(CACHE).then((c) => c.put("./index.html", res.clone()));
          return res;
        })
        .catch(() => caches.match(e.request).then((hit) => hit || caches.match("./index.html")))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(
      (hit) =>
        hit ||
        fetch(e.request)
          .then((res) => {
            if (res.ok && new URL(e.request.url).origin === location.origin) {
              caches.open(CACHE).then((c) => c.put(e.request, res.clone()));
            }
            return res;
          })
          .catch(() => caches.match("./index.html"))
    )
  );
});