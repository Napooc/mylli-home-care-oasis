// High-performance service worker with smart caching strategies
const CACHE_NAME = 'mylli-services-v1';
const STATIC_CACHE = 'mylli-static-v1';
const IMAGE_CACHE = 'mylli-images-v1';
const API_CACHE = 'mylli-api-v1';
const FAVICON_CACHE = 'mylli-favicon-v1'; // New favicon-specific cache

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/styles/global.css',
  '/lovable-uploads/f8839c98-c2b6-4a1b-86d6-d6858f3f38df.png', // New Home Care Logo
];

// Favicon-specific resources for iOS optimization
const FAVICON_RESOURCES = [
  '/lovable-uploads/f8839c98-c2b6-4a1b-86d6-d6858f3f38df.png'
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

// Enhanced iOS detection for service worker
function isIOSRequest(request) {
  const userAgent = request.headers.get('user-agent') || '';
  return /iPad|iPhone|iPod/.test(userAgent) || 
         (/Macintosh/.test(userAgent) && 'ontouchend' in self);
}

// iOS-optimized favicon caching strategy
async function iosFaviconCache(request) {
  try {
    const cache = await caches.open(FAVICON_CACHE);
    
    // For iOS, always try network first to avoid stale favicon issues
    try {
      const networkResponse = await fetch(request, {
        cache: 'no-cache', // Force fresh fetch for iOS
        mode: 'cors'
      });
      
      if (networkResponse.ok) {
        // Clone and cache the fresh response
        cache.put(request, networkResponse.clone());
        console.log('🍎 iOS favicon cached from network');
        return networkResponse;
      }
    } catch (networkError) {
      console.warn('🌐 Network failed, trying cache for iOS favicon');
    }
    
    // Fallback to cache if network fails
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      console.log('📦 Serving cached favicon for iOS');
      return cachedResponse;
    }
    
    // Ultimate fallback - create a transparent response
    return new Response(new Blob(), {
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'image/png' }
    });
    
  } catch (error) {
    console.error('❌ iOS favicon cache error:', error);
    return fetch(request);
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

  // Special handling for favicon requests - NEW HOME CARE LOGO
  if (url.pathname.includes('f8839c98-c2b6-4a1b-86d6-d6858f3f38df.png') ||
      url.pathname.includes('favicon') ||
      url.pathname.includes('apple-touch-icon')) {
    
    if (isIOSRequest(request)) {
      console.log('🍎 Handling iOS favicon request');
      event.respondWith(iosFaviconCache(request));
      return;
    } else {
      // Standard favicon caching for non-iOS
      event.respondWith(cacheFirst(request, FAVICON_CACHE, 7 * 24 * 60 * 60 * 1000)); // 7 days
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

// Enhanced message handling for favicon refresh commands
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'REFRESH_FAVICON_CACHE') {
    console.log('🔄 Refreshing favicon cache...');
    event.waitUntil(
      caches.open(FAVICON_CACHE).then((cache) => {
        return cache.delete('/lovable-uploads/f8839c98-c2b6-4a1b-86d6-d6858f3f38df.png');
      }).then(() => {
        console.log('✅ Favicon cache refreshed');
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
