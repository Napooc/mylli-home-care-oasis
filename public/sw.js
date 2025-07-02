
// Simplified high-performance service worker
const CACHE_NAME = 'mylli-v1';
const STATIC_CACHE = 'mylli-static-v1';
const IMAGE_CACHE = 'mylli-images-v1';

// Critical resources to cache
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx'
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(CRITICAL_RESOURCES))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== IMAGE_CACHE && cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - simple caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle different resource types
  if (url.pathname.match(/\.(js|css|html)$/)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
  }
});

// Simple cache first strategy
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return fetch(request);
  }
}
