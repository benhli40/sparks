// service-worker.js
const CACHE_NAME = 'sparks-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/sparks.js',
  '/js/storage.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
