
// High-performance resource caching utilities

interface CacheEntry {
  data: any;
  timestamp: number;
  expiry: number;
}

class ResourceCache {
  private cache = new Map<string, CacheEntry>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set(key: string, data: any, ttl = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl
    });
  }

  get(key: string): any | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    return entry ? Date.now() <= entry.expiry : false;
  }

  clear(): void {
    this.cache.clear();
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

export const resourceCache = new ResourceCache();

// Auto-cleanup every 5 minutes
setInterval(() => resourceCache.cleanup(), 5 * 60 * 1000);

// Image loading with cache
export const loadImageWithCache = async (src: string): Promise<HTMLImageElement> => {
  const cacheKey = `image:${src}`;
  
  if (resourceCache.has(cacheKey)) {
    return resourceCache.get(cacheKey);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resourceCache.set(cacheKey, img, 30 * 60 * 1000); // Cache for 30 minutes
      resolve(img);
    };
    img.onerror = reject;
    img.src = src;
  });
};

// Font loading with cache
export const loadFontWithCache = async (fontFamily: string, fontWeight = '400'): Promise<void> => {
  const cacheKey = `font:${fontFamily}:${fontWeight}`;
  
  if (resourceCache.has(cacheKey)) {
    return Promise.resolve();
  }

  if ('fonts' in document) {
    try {
      await document.fonts.load(`${fontWeight} 16px ${fontFamily}`);
      resourceCache.set(cacheKey, true, 60 * 60 * 1000); // Cache for 1 hour
    } catch (error) {
      console.warn(`Failed to load font: ${fontFamily}`);
    }
  }
};

// Critical resource preloader
export const preloadCriticalResources = async (): Promise<void> => {
  const criticalImages = [
    '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png'
  ];

  const criticalFonts = [
    { family: 'Roboto', weight: '400' },
    { family: 'Roboto', weight: '700' }
  ];

  // Preload images in parallel
  const imagePromises = criticalImages.map(src => 
    loadImageWithCache(src).catch(err => 
      console.warn(`Failed to preload image: ${src}`, err)
    )
  );

  // Preload fonts in parallel
  const fontPromises = criticalFonts.map(({ family, weight }) =>
    loadFontWithCache(family, weight).catch(err =>
      console.warn(`Failed to preload font: ${family}`, err)
    )
  );

  await Promise.allSettled([...imagePromises, ...fontPromises]);
  console.log('✅ Critical resources preloaded');
};
