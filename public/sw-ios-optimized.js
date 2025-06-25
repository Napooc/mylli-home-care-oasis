
// iOS and deployment-optimized Service Worker
const CACHE_NAME = 'mylli-ios-v1';
const CRITICAL_URLS = [
  '/',
  '/services',
  '/contact',
  '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png'
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('🔧 Installing iOS-optimized service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CRITICAL_URLS))
      .then(() => self.skipWaiting())
      .catch(error => console.log('Cache installation failed:', error))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('✅ Activating iOS-optimized service worker...');
  
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch event - simple cache-first strategy for iOS compatibility
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and external URLs
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200) {
              return response;
            }
            
            // Cache successful responses
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache))
              .catch(error => console.log('Caching failed:', error));
            
            return response;
          })
          .catch(() => {
            // Return offline fallback for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            return new Response('Offline', { status: 503 });
          });
      })
  );
});
