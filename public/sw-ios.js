
// iOS-specific service worker for handling iOS Safari quirks

const CACHE_NAME = 'mylli-ios-v1';
const STATIC_CACHE_NAME = 'mylli-ios-static-v1';

// Critical resources for iOS
const IOS_CRITICAL_RESOURCES = [
  '/',
  '/services',
  '/contact',
  '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png'
];

// Install event - cache critical resources for iOS
self.addEventListener('install', (event) => {
  console.log('🍎 Installing iOS service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('🍎 Caching iOS critical resources...');
        return cache.addAll(IOS_CRITICAL_RESOURCES);
      })
      .then(() => {
        console.log('✅ iOS service worker installed');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ iOS service worker install failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🍎 Activating iOS service worker...');
  
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => !cacheName.includes('ios-v1'))
            .map(cacheName => {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      self.clients.claim()
    ]).then(() => {
      console.log('✅ iOS service worker activated');
    })
  );
});

// Fetch event - handle iOS-specific caching
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip non-GET requests and non-same-origin requests
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }

  // iOS-specific fetch handling
  event.respondWith(
    handleIOSFetch(request)
  );
});

async function handleIOSFetch(request) {
  try {
    // Try cache first for iOS (more reliable on iOS Safari)
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log('📦 iOS: Serving from cache:', request.url);
      
      // Update cache in background for iOS
      fetch(request)
        .then(response => {
          if (response.ok) {
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(request, response.clone());
            });
          }
        })
        .catch(() => {
          // Ignore background update errors on iOS
        });
      
      return cachedResponse;
    }

    // If not in cache, try network with iOS-specific timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout for iOS
    
    const networkResponse = await fetch(request, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    // Cache successful responses for iOS
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;

  } catch (error) {
    console.warn('🍎 iOS fetch failed:', request.url, error.message);
    
    // Return offline fallback for iOS
    if (request.url.includes('.html') || request.headers.get('accept')?.includes('text/html')) {
      return new Response(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
            <title>Mylli Services - Offline</title>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
                padding: 20px; 
                text-align: center; 
                background: #f8f9fa;
              }
              .container { 
                max-width: 400px; 
                margin: 50px auto; 
                padding: 20px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
            </style>
          </head> 
          <body>
            <div class="container">
              <h1>Mylli Services</h1>
              <p>L'application est temporairement hors ligne.</p>
              <p>Veuillez vérifier votre connexion et réessayer.</p>
              <button onclick="location.reload()">Réessayer</button>
            </div>
          </body>
        </html>
      `, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    return new Response('Service temporairement indisponible', { 
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

// Handle iOS-specific errors
self.addEventListener('error', (event) => {
  console.error('🍎 iOS Service Worker Error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('🍎 iOS Service Worker Unhandled Rejection:', event.reason);
});
