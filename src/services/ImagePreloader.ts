
class ImagePreloaderService {
  private cache = new Map<string, HTMLImageElement>();
  private loadingQueue: Array<{ src: string; priority: number }> = [];
  private isProcessing = false;
  private maxConcurrent = 6;
  private currentLoading = 0;

  // Preload critical above-the-fold images
  preloadCriticalImages(images: Array<{ src: string; priority: number }>) {
    console.log('🚀 Preloading critical images:', images.length);
    
    // Sort by priority (higher number = higher priority)
    const sortedImages = images.sort((a, b) => b.priority - a.priority);
    
    // Add to queue
    this.loadingQueue.push(...sortedImages);
    
    // Start processing if not already running
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  private async processQueue() {
    this.isProcessing = true;
    
    while (this.loadingQueue.length > 0 && this.currentLoading < this.maxConcurrent) {
      const item = this.loadingQueue.shift();
      if (!item) continue;
      
      if (this.cache.has(item.src)) continue;
      
      this.currentLoading++;
      this.loadImage(item.src)
        .then(() => {
          console.log('✅ Preloaded:', item.src);
        })
        .catch(() => {
          console.warn('❌ Failed to preload:', item.src);
        })
        .finally(() => {
          this.currentLoading--;
          if (this.loadingQueue.length > 0) {
            this.processQueue();
          }
        });
    }
    
    if (this.loadingQueue.length === 0 && this.currentLoading === 0) {
      this.isProcessing = false;
      console.log('✅ All critical images preloaded');
    }
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.cache.set(src, img);
        resolve(img);
      };
      
      img.onerror = reject;
      img.src = src;
    });
  }

  // Check if image is cached
  isCached(src: string): boolean {
    return this.cache.has(src);
  }

  // Get cached image
  getCached(src: string): HTMLImageElement | undefined {
    return this.cache.get(src);
  }

  // Clear cache to free memory
  clearCache() {
    this.cache.clear();
    console.log('🧹 Image cache cleared');
  }

  // Get cache stats
  getCacheStats() {
    return {
      cachedImages: this.cache.size,
      queueSize: this.loadingQueue.length,
      currentlyLoading: this.currentLoading
    };
  }
}

export const imagePreloader = new ImagePreloaderService();
