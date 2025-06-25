
// iOS-optimized Service Worker with specific fixes for iOS Safari

const CACHE_NAME = 'mylli-ios-v3';
const STATIC_CACHE = 'mylli-ios-static-v3';
const DYNAMIC_CACHE = 'mylli-ios-dynamic-v3';

// iOS-specific critical resources
const IOS_CRITICAL_URLS = [
  '/',
  '/services',
  '/contact',
  '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png',
  '/lovable-uploads/00945798-dc13-478e-94d1-d1aaa70af5a6.png'
];

// iOS-specific cache strategies
const IOS_CACHE_STRATEGIES = {
  images: { strategy: 'cache-first', maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 days for iOS
  api: { strategy: 'network-first', maxAge: 2 * 60 * 1000 }, // 2 minutes for iOS
  static: { strategy: 'stale-while-revalidate', maxAge: 12 * 60 * 60 * 1000 }, // 12 hours for iOS
  fonts: { strategy: 'cache-first', maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days for iOS
};

// Install event - optimized for iOS memory constraints
self.addEventListener('install', (event) => {
  console.log('🍎 Installing iOS-optimized service worker...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        // Cache resources one by one for iOS memory management
        return IOS_CRITICAL_URLS.reduce((promise, url) => {
          return promise.then(() => cache.add(url).catch(error => {
            console.warn(`Failed to cache ${url}:`, error);
          }));
        }, Promise.resolve());
      }),
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches for iOS memory management
self.addEventListener('activate', (event) => {
  console.log('✅ Activating iOS-optimized service worker...');
  
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => !cacheName.includes('v3'))
            .map(cacheName => {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch event - iOS-specific optimizations
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and external requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Skip iOS-specific problematic requests
  if (url.pathname.includes('hot-update') || 
      url.pathname.includes('__webpack') ||
      url.pathname.includes('sockjs')) {
    return;
  }

  event.respondWith(handleIOSRequest(request));
});

async function handleIOSRequest(request) {
  const url = new URL(request.url);
  let strategy = IOS_CACHE_STRATEGIES.static;
  
  // Determine iOS-specific strategy
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
    strategy = IOS_CACHE_STRATEGIES.images;
  } else if (url.pathname.includes('/api/')) {
    strategy = IOS_CACHE_STRATEGIES.api;
  } else if (url.pathname.match(/\.(woff|woff2|ttf|eot)$/)) {
    strategy = IOS_CACHE_STRATEGIES.fonts;
  }

  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  switch (strategy.strategy) {
    case 'cache-first':
      if (cachedResponse && !isExpiredForIOS(cachedResponse, strategy.maxAge)) {
        return cachedResponse;
      }
      try {
        const networkResponse = await fetchWithIOSTimeout(request);
        if (networkResponse && networkResponse.ok) {
          // Clone before caching for iOS Safari compatibility
          const responseClone = networkResponse.clone();
          cache.put(request, responseClone);
        }
        return networkResponse;
      } catch (error) {
        console.warn('iOS network error:', error);
        return cachedResponse || createIOSOfflineResponse();
      }

    case 'network-first':
      try {
        const networkResponse = await fetchWithIOSTimeout(request);
        if (networkResponse && networkResponse.ok) {
          const responseClone = networkResponse.clone();
          cache.put(request, responseClone);
        }
        return networkResponse;
      } catch (error) {
        console.warn('iOS network error:', error);
        return cachedResponse || createIOSOfflineResponse();
      }

    case 'stale-while-revalidate':
      if (cachedResponse) {
        // Return cached response immediately for iOS performance
        fetchWithIOSTimeout(request).then(networkResponse => {
          if (networkResponse && networkResponse.ok) {
            const responseClone = networkResponse.clone();
            cache.put(request, responseClone);
          }
        }).catch(() => {
          // Ignore background update errors on iOS
        });
        return cachedResponse;
      }
      
      try {
        const networkResponse = await fetchWithIOSTimeout(request);
        if (networkResponse && networkResponse.ok) {
          const responseClone = networkResponse.clone();
          cache.put(request, responseClone);
        }
        return networkResponse;
      } catch (error) {
        return createIOSOfflineResponse();
      }

    default:
      return fetch(request);
  }
}

// iOS-specific fetch with timeout
function fetchWithIOSTimeout(request, timeout = 10000) {
  return Promise.race([
    fetch(request),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('iOS fetch timeout')), timeout)
    )
  ]);
}

// iOS-specific cache expiration check
function isExpiredForIOS(response, maxAge) {
  const dateHeader = response.headers.get('date');
  if (!dateHeader) return true;
  
  const date = new Date(dateHeader);
  return Date.now() - date.getTime() > maxAge;
}

// iOS-specific offline response
function createIOSOfflineResponse() {
  return new Response('Offline - iOS mode', { 
    status: 503,
    statusText: 'Service Unavailable',
    headers: new Headers({
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store'
    })
  });
}

// Handle iOS-specific messages
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    console.log('🔄 iOS Service Worker updating...');
    self.skipWaiting();
  }
});

// iOS-specific error handling
self.addEventListener('error', (event) => {
  console.error('🍎 iOS Service Worker error:', event.error);
});

console.log('🍎 iOS-optimized Service Worker loaded successfully');
