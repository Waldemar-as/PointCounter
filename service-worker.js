const CACHE_NAME = 'scoreboard-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',  // Only if you have this file
  '/point_counter_icon.png'  // Add this if you use the icon
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Failed to open cache: ', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
