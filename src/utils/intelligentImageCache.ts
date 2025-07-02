// Phase 3: Advanced Intelligent Image Caching System
interface ImageCacheEntry {
  data: any;
  loadTime: number;
  timestamp: number;
  width?: number;
  height?: number;
  priority: 'high' | 'medium' | 'low';
  accessCount: number;
  lastAccessed: number;
}

interface ViewportAwareEntry {
  src: string;
  element: Element;
  distance: number;
}

class IntelligentImageCache {
  private static instance: IntelligentImageCache;
  private memoryCache = new Map<string, ImageCacheEntry>();
  private dbName = 'ImageCacheDB';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;
  private preloadQueue: ViewportAwareEntry[] = [];
  private isPreloading = false;

  static getInstance(): IntelligentImageCache {
    if (!this.instance) {
      this.instance = new IntelligentImageCache();
    }
    return this.instance;
  }

  constructor() {
    this.initializeIndexedDB();
    this.startViewportAwarePreloading();
    this.setupProgressiveEnhancement();
  }

  // Initialize IndexedDB for persistent caching
  private async initializeIndexedDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => {
        console.warn('Failed to open IndexedDB for image cache');
        reject(request.error);
      };
      
      request.onsuccess = () => {
        this.db = request.result;
        console.log('📦 IndexedDB image cache initialized');
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('images')) {
          const store = db.createObjectStore('images', { keyPath: 'src' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('priority', 'priority', { unique: false });
        }
      };
    });
  }

  // Cache image data with intelligent priority
  cacheImage(src: string, data: {
    loadTime: number;
    timestamp: number;
    width?: number;
    height?: number;
    priority: 'high' | 'medium' | 'low';
  }): void {
    const entry: ImageCacheEntry = {
      ...data,
      data: src,
      accessCount: 1,
      lastAccessed: Date.now()
    };

    // Store in memory cache
    this.memoryCache.set(src, entry);

    // Store in IndexedDB for persistence (high priority only)
    if (data.priority === 'high' && this.db) {
      const transaction = this.db.transaction(['images'], 'readwrite');
      const store = transaction.objectStore('images');
      store.put({ src, ...entry });
    }

    console.log(`💾 Cached image: ${src} (Priority: ${data.priority})`);
  }

  // Get cached image data
  getImageData(src: string): ImageCacheEntry | null {
    const cached = this.memoryCache.get(src);
    if (cached) {
      cached.accessCount++;
      cached.lastAccessed = Date.now();
      return cached;
    }
    return null;
  }

  // Viewport-aware preloading system
  private startViewportAwarePreloading(): void {
    const checkViewport = () => {
      if (this.isPreloading) return;

      this.updatePreloadQueue();
      this.processPreloadQueue();
    };

    // Check every 100ms for smooth scrolling
    setInterval(checkViewport, 100);
    
    // Also check on scroll events
    window.addEventListener('scroll', checkViewport, { passive: true });
  }

  // Update preload queue based on viewport distance
  private updatePreloadQueue(): void {
    const images = document.querySelectorAll('img[data-preload-candidate]');
    const viewportHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    
    this.preloadQueue = Array.from(images)
      .map(img => {
        const rect = img.getBoundingClientRect();
        const distance = rect.top + scrollTop - (scrollTop + viewportHeight);
        return {
          src: img.getAttribute('src') || '',
          element: img,
          distance: Math.max(0, distance)
        };
      })
      .filter(entry => entry.distance < 1000 && entry.distance > 0) // Within 1000px
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5); // Limit to 5 images
  }

  // Process preload queue in parallel batches
  private async processPreloadQueue(): Promise<void> {
    if (this.preloadQueue.length === 0 || this.isPreloading) return;
    
    this.isPreloading = true;
    console.log(`🔄 Processing preload queue: ${this.preloadQueue.length} images`);

    const promises = this.preloadQueue.slice(0, 3).map(async ({ src }) => {
      if (this.memoryCache.has(src)) return;
      
      try {
        await this.preloadSingleImage(src);
      } catch (error) {
        console.warn(`Failed to preload: ${src}`, error);
      }
    });

    await Promise.allSettled(promises);
    this.isPreloading = false;
  }

  // Preload single image with progressive enhancement
  private async preloadSingleImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.cacheImage(src, {
          loadTime: 0,
          timestamp: Date.now(),
          priority: 'medium'
        });
        resolve();
      };
      
      img.onerror = () => reject(new Error(`Failed to preload: ${src}`));
      img.src = src;
    });
  }

  // Progressive image enhancement (low → high quality)
  private setupProgressiveEnhancement(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const images = (node as Element).querySelectorAll('img[data-progressive]');
            images.forEach((img) => this.enhanceImageProgressive(img as HTMLImageElement));
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Enhance image quality progressively
  private enhanceImageProgressive(img: HTMLImageElement): void {
    const highQualitySrc = img.dataset.highQuality;
    if (!highQualitySrc || this.memoryCache.has(highQualitySrc)) return;

    // Load high quality version in background
    const highQualityImg = new Image();
    highQualityImg.onload = () => {
      // Smooth transition to high quality
      img.style.transition = 'opacity 0.3s ease';
      img.style.opacity = '0.7';
      
      setTimeout(() => {
        img.src = highQualitySrc;
        img.style.opacity = '1';
        
        this.cacheImage(highQualitySrc, {
          loadTime: 0,
          timestamp: Date.now(),
          priority: 'high'
        });
      }, 100);
    };
    
    highQualityImg.src = highQualitySrc;
  }

  // Memory cleanup for unused images
  cleanupUnusedImages(): void {
    const now = Date.now();
    const maxAge = 30 * 60 * 1000; // 30 minutes
    let cleanedCount = 0;

    for (const [src, entry] of this.memoryCache.entries()) {
      if (now - entry.lastAccessed > maxAge && entry.priority === 'low') {
        this.memoryCache.delete(src);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned ${cleanedCount} unused cached images`);
    }
  }

  // Get cache statistics
  getCacheStats(): {
    memoryEntries: number;
    totalAccessCount: number;
    avgLoadTime: number;
    hitRate: number;
  } {
    const entries = Array.from(this.memoryCache.values());
    const totalAccessCount = entries.reduce((sum, entry) => sum + entry.accessCount, 0);
    const avgLoadTime = entries.reduce((sum, entry) => sum + entry.loadTime, 0) / entries.length || 0;
    const hitRate = entries.filter(entry => entry.accessCount > 1).length / entries.length * 100 || 0;

    return {
      memoryEntries: this.memoryCache.size,
      totalAccessCount,
      avgLoadTime: Math.round(avgLoadTime),
      hitRate: Math.round(hitRate)
    };
  }

  // Clear all caches
  clearCache(): void {
    this.memoryCache.clear();
    
    if (this.db) {
      const transaction = this.db.transaction(['images'], 'readwrite');
      const store = transaction.objectStore('images');
      store.clear();
    }
    
    console.log('🗑️ Image cache cleared');
  }
}

export const intelligentImageCache = IntelligentImageCache.getInstance();