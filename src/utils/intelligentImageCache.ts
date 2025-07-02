// Phase 3: Advanced Caching & Preloading System
interface CachedImage {
  blob: Blob;
  url: string;
  timestamp: number;
  accessCount: number;
  priority: 'critical' | 'high' | 'normal' | 'low';
  size: number;
}

interface PreloadConfig {
  viewportMargin: string;
  maxCacheSize: number; // in bytes
  maxEntries: number;
  cleanupInterval: number;
}

class IntelligentImageCache {
  private static instance: IntelligentImageCache;
  private cache = new Map<string, CachedImage>();
  private currentCacheSize = 0;
  private config: PreloadConfig;
  private cleanupTimer: NodeJS.Timeout | null = null;
  private dbName = 'ultrafast-image-cache';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  static getInstance(): IntelligentImageCache {
    if (!this.instance) {
      this.instance = new IntelligentImageCache();
    }
    return this.instance;
  }

  constructor() {
    this.config = {
      viewportMargin: '300px',
      maxCacheSize: 100 * 1024 * 1024, // 100MB
      maxEntries: 500,
      cleanupInterval: 5 * 60 * 1000 // 5 minutes
    };
    
    this.initializeCache();
  }

  private async initializeCache(): Promise<void> {
    // Initialize IndexedDB for persistent storage
    await this.initializeDB();
    
    // Load cached images from IndexedDB
    await this.loadFromPersistentCache();
    
    // Start cleanup timer
    this.startCleanupTimer();
    
    console.log('🧠 Intelligent Image Cache initialized');
  }

  private async initializeDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains('images')) {
          const store = db.createObjectStore('images', { keyPath: 'src' });
          store.createIndex('timestamp', 'timestamp');
          store.createIndex('priority', 'priority');
        }
      };
    });
  }

  // Cache image with intelligent priority management
  async cacheImage(src: string, priority: 'critical' | 'high' | 'normal' | 'low' = 'normal'): Promise<string> {
    // Check memory cache first
    const cached = this.cache.get(src);
    if (cached) {
      cached.accessCount++;
      return cached.url;
    }

    try {
      // Fetch and cache the image
      const response = await fetch(src);
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const size = blob.size;

      // Check if we need to make room
      if (this.needsEviction(size)) {
        await this.evictImages(size);
      }

      const cachedImage: CachedImage = {
        blob,
        url,
        timestamp: Date.now(),
        accessCount: 1,
        priority,
        size
      };

      this.cache.set(src, cachedImage);
      this.currentCacheSize += size;

      // Persist important images
      if (priority === 'critical' || priority === 'high') {
        await this.persistImage(src, cachedImage);
      }

      console.log(`📦 Image cached: ${src} (${this.formatSize(size)}, Priority: ${priority})`);
      return url;
    } catch (error) {
      console.warn(`Failed to cache image: ${src}`, error);
      return src; // Fallback to original URL
    }
  }

  // Get cached image URL
  getCachedImage(src: string): string | null {
    const cached = this.cache.get(src);
    if (cached) {
      cached.accessCount++;
      return cached.url;
    }
    return null;
  }

  // Progressive image enhancement: load low quality first, then high quality
  async getProgressiveImage(src: string, priority: 'critical' | 'high' | 'normal' | 'low' = 'normal'): Promise<{
    lowQuality: string;
    highQuality: string;
  }> {
    // Generate low-quality version
    const lowQualitySrc = this.getLowQualityUrl(src);
    const highQualitySrc = src;

    // Load low quality immediately
    const lowQualityUrl = await this.cacheImage(lowQualitySrc, priority);
    
    // Load high quality in background
    setTimeout(() => {
      this.cacheImage(highQualitySrc, priority);
    }, 100);

    return {
      lowQuality: lowQualityUrl,
      highQuality: await this.cacheImage(highQualitySrc, priority)
    };
  }

  private getLowQualityUrl(src: string): string {
    if (src.includes('unsplash.com')) {
      const params = new URLSearchParams();
      params.set('auto', 'format');
      params.set('fit', 'crop');
      params.set('q', '20'); // Very low quality for fast loading
      params.set('blur', '20');
      return `${src}?${params.toString()}`;
    }
    
    if (src.includes('lovable-uploads')) {
      const params = new URLSearchParams();
      params.set('q', '20');
      return `${src}?${params.toString()}`;
    }
    
    return src;
  }

  // Check if eviction is needed
  private needsEviction(newImageSize: number): boolean {
    return this.cache.size >= this.config.maxEntries || 
           (this.currentCacheSize + newImageSize) > this.config.maxCacheSize;
  }

  // Evict images using LRU + Priority algorithm
  private async evictImages(requiredSpace: number): Promise<void> {
    const entries = Array.from(this.cache.entries());
    
    // Sort by priority (low first) and access count
    entries.sort(([, a], [, b]) => {
      const priorityOrder = { low: 1, normal: 2, high: 3, critical: 4 };
      const aPriority = priorityOrder[a.priority];
      const bPriority = priorityOrder[b.priority];
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      
      return a.accessCount - b.accessCount;
    });

    let freedSpace = 0;
    let evictedCount = 0;

    for (const [src, image] of entries) {
      if (freedSpace >= requiredSpace && this.cache.size < this.config.maxEntries) {
        break;
      }

      // Don't evict critical images
      if (image.priority === 'critical') continue;

      URL.revokeObjectURL(image.url);
      this.cache.delete(src);
      this.currentCacheSize -= image.size;
      freedSpace += image.size;
      evictedCount++;

      // Remove from persistent storage
      await this.removeFromPersistentCache(src);
    }

    console.log(`🗑️ Evicted ${evictedCount} images, freed ${this.formatSize(freedSpace)}`);
  }

  // Persist image to IndexedDB
  private async persistImage(src: string, image: CachedImage): Promise<void> {
    if (!this.db) return;

    try {
      const transaction = this.db.transaction(['images'], 'readwrite');
      const store = transaction.objectStore('images');
      
      const persistData = {
        src,
        blob: image.blob,
        timestamp: image.timestamp,
        priority: image.priority,
        size: image.size
      };
      
      await store.put(persistData);
    } catch (error) {
      console.warn('Failed to persist image:', error);
    }
  }

  // Load images from IndexedDB
  private async loadFromPersistentCache(): Promise<void> {
    if (!this.db) return;

    try {
      const transaction = this.db.transaction(['images'], 'readonly');
      const store = transaction.objectStore('images');
      const request = store.getAll();

      request.onsuccess = () => {
        request.result.forEach((item: any) => {
          const url = URL.createObjectURL(item.blob);
          const cachedImage: CachedImage = {
            blob: item.blob,
            url,
            timestamp: item.timestamp,
            accessCount: 0,
            priority: item.priority,
            size: item.size
          };

          this.cache.set(item.src, cachedImage);
          this.currentCacheSize += item.size;
        });

        console.log(`📱 Loaded ${request.result.length} images from persistent cache`);
      };
    } catch (error) {
      console.warn('Failed to load from persistent cache:', error);
    }
  }

  // Remove from persistent cache
  private async removeFromPersistentCache(src: string): Promise<void> {
    if (!this.db) return;

    try {
      const transaction = this.db.transaction(['images'], 'readwrite');
      const store = transaction.objectStore('images');
      await store.delete(src);
    } catch (error) {
      console.warn('Failed to remove from persistent cache:', error);
    }
  }

  // Start cleanup timer
  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  // Cleanup expired and unused images
  private cleanup(): void {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    let cleanedCount = 0;
    let freedSpace = 0;

    for (const [src, image] of this.cache.entries()) {
      // Keep critical images longer
      const imageMaxAge = image.priority === 'critical' ? maxAge * 7 : maxAge;
      
      if (now - image.timestamp > imageMaxAge && image.accessCount < 2) {
        URL.revokeObjectURL(image.url);
        this.cache.delete(src);
        this.currentCacheSize -= image.size;
        freedSpace += image.size;
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned ${cleanedCount} expired images, freed ${this.formatSize(freedSpace)}`);
    }
  }

  // Format size for display
  private formatSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)}${units[unitIndex]}`;
  }

  // Get cache statistics
  getCacheStats(): object {
    return {
      entries: this.cache.size,
      totalSize: this.formatSize(this.currentCacheSize),
      utilization: `${((this.currentCacheSize / this.config.maxCacheSize) * 100).toFixed(1)}%`,
      priorities: this.getPriorityDistribution()
    };
  }

  private getPriorityDistribution(): Record<string, number> {
    const distribution = { critical: 0, high: 0, normal: 0, low: 0 };
    
    for (const image of this.cache.values()) {
      distribution[image.priority]++;
    }
    
    return distribution;
  }

  // Clear cache
  clearCache(): void {
    for (const image of this.cache.values()) {
      URL.revokeObjectURL(image.url);
    }
    this.cache.clear();
    this.currentCacheSize = 0;
    
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    
    console.log('🗑️ Image cache cleared');
  }
}

export const intelligentImageCache = IntelligentImageCache.getInstance();
