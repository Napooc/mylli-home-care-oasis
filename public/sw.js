
// Ultra-fast service worker for aggressive caching
const CACHE_NAME = 'mylli-v1';
const CRITICAL_CACHE = 'mylli-critical-v1';
const IMAGE_CACHE = 'mylli-images-v1';
const API_CACHE = 'mylli-api-v1';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
  '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png' // Logo
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Static assets: Cache first, update in background
  static: ['css', 'js', 'woff2', 'woff', 'ttf'],
  
  // Images: Cache first with compression
  images: ['jpg', 'jpeg', 'png', 'webp', 'avif', 'svg'],
  
  // API: Network first, cache fallback
  api: ['/api/', 'emailjs.com'],
  
  // Pages: Network first, cache fallback
  pages: ['html']
};

// Install event - cache critical resources
self.addEventListener('install', event => {
  console.log('🚀 Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache critical resources
      caches.open(CRITICAL_CACHE).then(cache => {
        return cache.addAll(CRITICAL_RESOURCES);
      }),
      
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('✅ Service Worker activated');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => !cacheName.includes('v1'))
            .map(cacheName => caches.delete(cacheName))
        );
      }),
      
      // Take control immediately
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip cross-origin requests (except images and fonts)
  if (url.origin !== location.origin && !isAsset(url.pathname)) {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Critical resources: Cache first
    if (CRITICAL_RESOURCES.some(resource => pathname.includes(resource))) {
      return await cacheFirst(request, CRITICAL_CACHE);
    }
    
    // Images: Cache first with compression awareness
    if (CACHE_STRATEGIES.images.some(ext => pathname.includes(`.${ext}`))) {
      return await cacheFirstWithCompression(request, IMAGE_CACHE);
    }
    
    // Static assets: Cache first
    if (CACHE_STRATEGIES.static.some(ext => pathname.includes(`.${ext}`))) {
      return await cacheFirst(request, CACHE_NAME);
    }
    
    // API requests: Network first
    if (CACHE_STRATEGIES.api.some(pattern => url.href.includes(pattern))) {
      return await networkFirst(request, API_CACHE);
    }
    
    // Pages: Network first
    return await networkFirst(request, CACHE_NAME);
    
  } catch (error) {
    console.error('Service Worker fetch error:', error);
    return fetch(request);
  }
}

// Cache first strategy
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    // Update cache in background
    fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
    }).catch(() => {}); // Ignore background update errors
    
    return cached;
  }
  
  const response = await fetch(request);
  if (response.ok) {
    cache.put(request, response.clone());
  }
  
  return response;
}

// Cache first with compression awareness for images
async function cacheFirstWithCompression(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  // Check for cached version
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }
  
  // Fetch with modern format preference
  const response = await fetch(request);
  
  if (response.ok) {
    // Cache aggressively for images
    cache.put(request, response.clone());
  }
  
  return response;
}

// Network first strategy
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      // Cache successful responses
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Network failed, try cache
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    
    throw error;
  }
}

// Helper function to check if URL is an asset
function isAsset(pathname) {
  return CACHE_STRATEGIES.images.some(ext => pathname.includes(`.${ext}`)) ||
         CACHE_STRATEGIES.static.some(ext => pathname.includes(`.${ext}`));
}

// Background sync for offline image loading
self.addEventListener('sync', event => {
  if (event.tag === 'image-preload') {
    event.waitUntil(preloadCriticalImages());
  }
});

async function preloadCriticalImages() {
  const cache = await caches.open(IMAGE_CACHE);
  const criticalImages = [
    '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png'
  ];
  
  return Promise.allSettled(
    criticalImages.map(async (src) => {
      try {
        const response = await fetch(src);
        if (response.ok) {
          await cache.put(src, response);
        }
      } catch (error) {
        console.warn('Failed to preload image:', src);
      }
    })
  );
}
