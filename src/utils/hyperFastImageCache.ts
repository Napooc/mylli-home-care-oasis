// Hyper-fast mobile image cache with instant retrieval
class HyperFastImageCache {
  private static instance: HyperFastImageCache;
  private cache = new Map<string, HTMLImageElement>();
  private loadPromises = new Map<string, Promise<HTMLImageElement>>();

  static getInstance(): HyperFastImageCache {
    if (!this.instance) {
      this.instance = new HyperFastImageCache();
    }
    return this.instance;
  }

  // Instant image preload with promise caching
  preloadImage(src: string): Promise<HTMLImageElement> {
    // Return existing promise if already loading
    if (this.loadPromises.has(src)) {
      return this.loadPromises.get(src)!;
    }

    // Return cached image instantly
    if (this.cache.has(src)) {
      return Promise.resolve(this.cache.get(src)!);
    }

    // Create new load promise
    const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.cache.set(src, img);
        this.loadPromises.delete(src);
        resolve(img);
      };
      
      img.onerror = () => {
        this.loadPromises.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    });

    this.loadPromises.set(src, loadPromise);
    return loadPromise;
  }

  // Get cached image instantly
  getCachedImage(src: string): HTMLImageElement | null {
    return this.cache.get(src) || null;
  }

  // Check if image is cached
  isImageCached(src: string): boolean {
    return this.cache.has(src);
  }

  // Preload multiple critical images
  preloadCriticalImages(urls: string[]): Promise<HTMLImageElement[]> {
    const promises = urls.slice(0, 5).map(url => this.preloadImage(url));
    return Promise.all(promises);
  }

  // Clear cache to free memory
  clearCache(): void {
    this.cache.clear();
    this.loadPromises.clear();
  }

  // Get cache stats
  getCacheStats(): { size: number; loading: number } {
    return {
      size: this.cache.size,
      loading: this.loadPromises.size
    };
  }
}

export const hyperFastImageCache = HyperFastImageCache.getInstance();