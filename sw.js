const VERSION = 22;
const CACHE_NAME = `startpage-v${VERSION}`;
const ASSETS = [
  '/',
  '/index.html',
  '/yfuzzy.min.js',
  '/manifest.json',
  '/icon.svg',
  '/favicons/default.svg',
  '/fonts/fraunces-latin.woff2'
];

// No skipWaiting on install: the page activates a new worker only after the user confirms the update
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

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

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // version.json must come from the network to detect a new deployment, and private redirects must reach the sign-in check
  if (url.pathname === '/version.json' || url.hostname === 'redirect.ycookiey.com') {
    return;
  }

  if (request.method !== 'GET') {
    return;
  }

  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(request).then((response) => {
        if (response && response.ok) {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned));
        }
        return response;
      });
    })
  );
});
