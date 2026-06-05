const CACHE_NAME = 'etho-ai-cache-v1';
const urlsToCache = [
  './',
  'https://raw.githubusercontent.com/aryansharma1171/webimages/main/Etho%20ai%20logo.webp'
];

// Install the service worker and cache essential assets
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate and clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Intercept network requests (Network-first strategy for dynamic AI app)
self.addEventListener('fetch', event => {
  // Ignore API requests so AI replies always come from the network
  if (event.request.url.includes('buildpicoapps.com')) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
