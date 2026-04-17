// UTOM PWA Service Worker – Enhanced for reliable installation & offline access
const CACHE_VERSION = 'utom-v2';
const CACHE_NAME = `utom-cache-${CACHE_VERSION}`;
const RUNTIME_CACHE = 'utom-runtime';

// Core assets to cache on install (critical for offline startup)
const PRECACHE_URLS = [
  '/utom/index.html',
  '/utom/user.html',
  '/utom/admin.html',
  '/utom/offline.html',
  '/utom/logo.png',
  '/utom/manifest.json',
  // External CDN resources (essential for UI)
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/12.12.0/firebase-database.js',
  'https://www.gstatic.com/firebasejs/12.12.0/firebase-storage.js',
  'https://upload-widget.cloudinary.com/global/all.js'
];

// Install event – precache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Precaching app shell');
        return cache.addAll(PRECACHE_URLS);
      })
      .catch(err => console.error('Precache failed:', err))
  );
  self.skipWaiting(); // Activate immediately
});

// Activate event – clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME && cache !== RUNTIME_CACHE) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of all clients
});

// Fetch event – network-first for HTML, cache-first for assets
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests that aren't in our CDN allowlist
  const allowedCDNs = [
    'cdnjs.cloudflare.com',
    'gstatic.com',
    'upload-widget.cloudinary.com'
  ];
  const isSameOrigin = url.origin === self.location.origin;
  const isAllowedCDN = allowedCDNs.some(cdn => url.hostname.includes(cdn));

  if (!isSameOrigin && !isAllowedCDN) return;

  // For HTML navigation requests: network-first, fallback to offline page
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache the latest version
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
          return response;
        })
        .catch(() => {
          return caches.match(request)
            .then(cachedResponse => cachedResponse || caches.match('/utom/offline.html'));
        })
    );
    return;
  }

  // For other assets (JS, CSS, images, fonts): cache-first, then network fallback
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        // Return cached version and update cache in background
        fetch(request).then(networkResponse => {
          if (networkResponse.ok) {
            caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse));
          }
        }).catch(() => {}); // ignore network errors during background update
        return cachedResponse;
      }

      // Not in cache – go to network
      return fetch(request).then(networkResponse => {
        // Cache valid responses
        if (networkResponse.ok) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
        }
        return networkResponse;
      }).catch(error => {
        // If it's an image or font, maybe return a fallback
        if (request.destination === 'image') {
          return new Response('', { status: 408, statusText: 'Offline image' });
        }
        // Otherwise just fail
        throw error;
      });
    })
  );
});
