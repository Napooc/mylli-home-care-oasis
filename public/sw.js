
const CACHE_NAME = 'mylli-cache-v1';
const IMAGE_CACHE_NAME = 'mylli-images-v1';
const STATIC_CACHE_NAME = 'mylli-static-v1';

// Resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/manifest.json',
  '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png', // Logo
];

// Image extensions to cache
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => cache.addAll(CRITICAL_RESOURCES))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (![CACHE_NAME, IMAGE_CACHE_NAME, STATIC_CACHE_NAME].includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  // Handle images with cache-first strategy
  if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
    return;
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Handle static assets with cache-first strategy
  if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request));
    return;
  }

  // Handle navigation requests with network-first, cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
    return;
  }
});

function isImageRequest(request) {
  return IMAGE_EXTENSIONS.some(ext => request.url.includes(`.${ext}`));
}

function isStaticAsset(request) {
  return /\.(js|css|woff|woff2|ttf|eot)$/i.test(request.url);
}

async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return a fallback image if available
    return new Response('', { status: 404 });
  }
}

async function handleApiRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

async function handleStaticAsset(request) {
  const cache = await caches.open(STATIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('', { status: 404 });
  }
}

async function handleNavigationRequest(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const cache = await caches.open(STATIC_CACHE_NAME);
    return await cache.match('/') || new Response('Offline', { status: 503 });
  }
}
