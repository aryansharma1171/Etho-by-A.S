const CACHE_NAME = "etho-v2";
const ASSETS = [
    "./",
    "./index.html",
    "./manifest.json",
    "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.3/dist/tailwind.min.css",
    "https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
