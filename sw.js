const CACHE_NAME = 'startpage-v1';
const ASSETS = [
  '/',
  '/index.html',
  // Inlined CSS/JS are part of index.html, no separate fetch needed
];

// Install: Cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Stale-while-revalidate for index.html to ensure freshness but speed
// For other assets (if any in future): Cache First
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Network-first for private redirects (API), Cache-first/Stale-while-revalidate for UI
  if (url.hostname === 'redirect.ycookiey.com') {
    return; // Let browser handle redirects directly
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
