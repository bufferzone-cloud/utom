// UTOM PWA Service Worker
const CACHE_NAME = 'utom-v1';
const urlsToCache = [
  'https://bufferzone-cloud.github.io/utom/index.html',
  'https://bufferzone-cloud.github.io/utom/user.html',
  'https://bufferzone-cloud.github.io/utom/admin.html',
  'https://bufferzone-cloud.github.io/utom/logo.png',
  'https://bufferzone-cloud.github.io/utom//offline.html',               // optional offline fallback
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/12.12.0/firebase-database.js',
  'https://www.gstatic.com/firebasejs/12.12.0/firebase-storage.js',
  'https://upload-widget.cloudinary.com/global/all.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.error('Cache install failed', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME && caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // Skip non-GET, external analytics, etc.
  if (event.request.method !== 'GET') return;
  
  // For same-origin or allowed CDNs, try cache then network
  if (url.origin === location.origin ||
      url.href.includes('cdnjs.cloudflare.com') ||
      url.href.includes('gstatic.com') ||
      url.href.includes('upload-widget.cloudinary.com')) {
    
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(networkResponse => {
          if (networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return networkResponse;
        }).catch(() => {
          // Offline fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/utom/offline.html');
          }
          return new Response('Offline – content not available', { status: 503 });
        });
      })
    );
  }
});
