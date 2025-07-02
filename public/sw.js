
// High-performance service worker with smart caching strategies
const CACHE_NAME = 'mylli-services-v1';
const STATIC_CACHE = 'mylli-static-v1';
const IMAGE_CACHE = 'mylli-images-v1';
const API_CACHE = 'mylli-api-v1';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/styles/global.css',
  '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png', // Logo
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Caching critical resources...');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        console.log('✅ Critical resources cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Failed to cache critical resources:', error);
      })
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
            if (cacheName !== STATIC_CACHE && 
                cacheName !== IMAGE_CACHE && 
                cacheName !== API_CACHE &&
                cacheName !== CACHE_NAME) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different resource types with different strategies
  if (url.pathname.match(/\.(js|css|html)$/)) {
    // Static assets - Cache First strategy
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (url.pathname.match(/\.(png|jpg|jpeg|gif|webp|avif|svg|ico)$/)) {
    // Images - Cache First with longer TTL
    event.respondWith(cacheFirst(request, IMAGE_CACHE, 30 * 24 * 60 * 60 * 1000)); // 30 days
  } else if (url.pathname.startsWith('/api/') || url.hostname.includes('emailjs')) {
    // API calls - Network First strategy
    event.respondWith(networkFirst(request, API_CACHE));
  } else if (url.origin === location.origin) {
    // Same-origin requests - Stale While Revalidate
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
  }
});

// Cache First strategy - for static assets
async function cacheFirst(request, cacheName, maxAge = 24 * 60 * 60 * 1000) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Check if cached response is still fresh
      const dateHeader = cachedResponse.headers.get('date');
      if (dateHeader) {
        const cachedTime = new Date(dateHeader).getTime();
        const now = Date.now();
        if (now - cachedTime < maxAge) {
          return cachedResponse;
        }
      } else {
        return cachedResponse; // Return cached response if no date header
      }
    }
    
    // Fetch from network and cache
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('Cache First failed:', error);
    return fetch(request);
  }
}

// Network First strategy - for API calls
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('Network failed, trying cache:', error);
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

// Stale While Revalidate strategy - for regular pages
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });
  
  return cachedResponse || fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle offline form submissions, etc.
  console.log('📤 Processing background sync tasks...');
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png',
      badge: '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png',
      vibrate: [200, 100, 200],
      data: data.data
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});
