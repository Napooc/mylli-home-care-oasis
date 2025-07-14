// Ultra-fast service worker with aggressive caching and task scheduling
const CACHE_NAME = 'mylli-ultra-v2';
const STATIC_CACHE = 'mylli-static-v2';
const IMAGE_CACHE = 'mylli-images-v2';
const API_CACHE = 'mylli-api-v2';
const FAVICON_CACHE = 'mylli-favicon-v2';

// Critical resources to cache immediately for instant loading
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png',
  '/lovable-uploads/21a6c87c-23d4-42e3-a542-44f2e834616d.png',
  '/lovable-uploads/609a7402-4f73-4888-bedd-2256c3fbd997.png'
];

// Simplified favicon resources with cache busting
const FAVICON_RESOURCES = [
  '/lovable-uploads/f8839c98-c2b6-4a1b-86d6-d6858f3f38df.png?v=ios-fix-2024'
];

// Install event - cache critical resources including favicons
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  event.waitUntil(
    Promise.all([
      // Cache static resources
      caches.open(STATIC_CACHE)
        .then((cache) => {
          console.log('📦 Caching critical resources...');
          return cache.addAll(CRITICAL_RESOURCES);
        }),
      // Cache favicon resources with special handling
      caches.open(FAVICON_CACHE)
        .then((cache) => {
          console.log('🎯 Caching favicon resources...');
          return cache.addAll(FAVICON_RESOURCES);
        })
    ])
    .then(() => {
      console.log('✅ All resources cached successfully');
      return self.skipWaiting();
    })
    .catch((error) => {
      console.error('❌ Failed to cache resources:', error);
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
                cacheName !== FAVICON_CACHE &&
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

// Simplified iOS detection
function isIOSRequest(request) {
  const userAgent = request.headers.get('user-agent') || '';
  return /iPad|iPhone|iPod/.test(userAgent) || 
         (/Macintosh/.test(userAgent) && navigator.maxTouchPoints > 1);
}

// Simple iOS-friendly favicon caching
async function simpleFaviconCache(request) {
  try {
    const cache = await caches.open(FAVICON_CACHE);
    
    // Network first for iOS to ensure fresh favicons
    const networkResponse = await fetch(request, {
      cache: 'no-store' // Always fetch fresh for iOS
    });
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    // Fallback to cache only if network fails
    return await cache.match(request) || networkResponse;
    
  } catch (error) {
    // Simple fallback
    const cache = await caches.open(FAVICON_CACHE);
    return await cache.match(request) || fetch(request);
  }
}

// Fetch event - implement caching strategies with favicon optimization
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Simplified favicon handling for iOS compatibility
  if (url.pathname.includes('f8839c98-c2b6-4a1b-86d6-d6858f3f38df.png') ||
      url.search.includes('v=ios-fix-2024') ||
      url.pathname.includes('favicon') ||
      url.pathname.includes('apple-touch-icon')) {
    
    if (isIOSRequest(request)) {
      event.respondWith(simpleFaviconCache(request));
      return;
    } else {
      // Standard caching for non-iOS
      event.respondWith(cacheFirst(request, FAVICON_CACHE, 24 * 60 * 60 * 1000)); // 24 hours
      return;
    }
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

// Simplified message handling
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_FAVICON_CACHE') {
    event.waitUntil(
      caches.delete(FAVICON_CACHE).then(() => {
        console.log('✅ Favicon cache cleared');
      })
    );
  }
});

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/lovable-uploads/f8839c98-c2b6-4a1b-86d6-d6858f3f38df.png',
      badge: '/lovable-uploads/f8839c98-c2b6-4a1b-86d6-d6858f3f38df.png',
      vibrate: [200, 100, 200],
      data: data.data
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});
