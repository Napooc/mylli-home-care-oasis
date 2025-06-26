
// iOS-optimized Service Worker for Mylli Services
const CACHE_NAME = 'mylli-services-ios-v1.0.0';
const STATIC_CACHE_NAME = 'mylli-services-static-ios-v1.0.0';

// iOS-optimized cache strategy
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
  '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png',
  '/lovable-uploads/00945798-dc13-478e-94d1-d1aaa70af5a6.png',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Inter:wght@700&display=swap'
];

// iOS-optimized install event
self.addEventListener('install', (event) => {
  console.log('🍎 iOS Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('📱 Caching iOS-optimized assets...');
        return cache.addAll(CACHE_ASSETS.map(url => new Request(url, {
          cache: 'reload'
        })));
      })
      .then(() => {
        console.log('✅ iOS assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ iOS cache failed:', error);
      })
  );
});

// iOS-optimized activate event
self.addEventListener('activate', (event) => {
  console.log('🍎 iOS Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
              console.log('🗑️ Deleting old iOS cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ iOS Service Worker activated');
        return self.clients.claim();
      })
  );
});

// iOS-optimized fetch event
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests (except fonts)
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts.g')) {
    return;
  }
  
  // iOS-optimized caching strategy
  if (request.destination === 'document') {
    // Network first for HTML (iOS-optimized)
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(request, responseClone);
            })
            .catch(() => {
              // Fail silently on iOS
            });
          return response;
        })
        .catch(() => {
          return caches.match(request)
            .then((cachedResponse) => {
              return cachedResponse || new Response('Offline', {
                status: 503,
                statusText: 'Service Unavailable'
              });
            });
        })
    );
  } else if (request.destination === 'style' || 
             request.destination === 'script' || 
             request.destination === 'font' ||
             url.pathname.includes('lovable-uploads')) {
    // Cache first for static assets (iOS-optimized)
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(STATIC_CACHE_NAME)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  })
                  .catch(() => {
                    // Fail silently on iOS
                  });
              }
              return response;
            })
            .catch(() => {
              return new Response('Resource not available offline', {
                status: 503,
                statusText: 'Service Unavailable'
              });
            });
        })
    );
  }
});

// iOS-specific message handling
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('🍎 iOS Service Worker: Skip waiting requested');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: CACHE_NAME,
      platform: 'iOS-optimized'
    });
  }
});

// iOS performance monitoring
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) {
    const startTime = Date.now();
    
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const duration = Date.now() - startTime;
          if (duration > 3000) {
            console.warn('🍎 iOS slow API request:', event.request.url, duration + 'ms');
          }
          return response;
        })
        .catch((error) => {
          console.error('🍎 iOS API request failed:', event.request.url, error);
          throw error;
        })
    );
  }
});

console.log('🍎 iOS-optimized Service Worker loaded successfully');
