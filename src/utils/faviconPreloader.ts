
// Favicon Preloader - Optimized for iOS Safari
export class FaviconPreloader {
  private preloadCache = new Map<string, Promise<boolean>>();
  private loadTimes = new Map<string, number>();
  
  async preloadFavicon(url: string, timeout = 5000): Promise<boolean> {
    // Check cache first
    if (this.preloadCache.has(url)) {
      return this.preloadCache.get(url)!;
    }
    
    const preloadPromise = this.performPreload(url, timeout);
    this.preloadCache.set(url, preloadPromise);
    
    return preloadPromise;
  }
  
  private performPreload(url: string, timeout: number): Promise<boolean> {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const img = new Image();
      
      const cleanup = () => {
        img.onload = null;
        img.onerror = null;
      };
      
      const handleSuccess = () => {
        const loadTime = Date.now() - startTime;
        this.loadTimes.set(url, loadTime);
        console.log(`✅ Favicon preloaded: ${url} (${loadTime}ms)`);
        cleanup();
        resolve(true);
      };
      
      const handleError = () => {
        const loadTime = Date.now() - startTime;
        console.warn(`❌ Favicon preload failed: ${url} (${loadTime}ms)`);
        cleanup();
        resolve(false);
      };
      
      img.onload = handleSuccess;
      img.onerror = handleError;
      
      // Set timeout
      setTimeout(() => {
        if (img.complete === false) {
          console.warn(`⏰ Favicon preload timeout: ${url}`);
          cleanup();
          resolve(false);
        }
      }, timeout);
      
      img.src = url;
    });
  }
  
  getPreloadStats() {
    return {
      cacheSize: this.preloadCache.size,
      loadTimes: Object.fromEntries(this.loadTimes),
      averageLoadTime: this.calculateAverageLoadTime()
    };
  }
  
  private calculateAverageLoadTime(): number {
    if (this.loadTimes.size === 0) return 0;
    const times = Array.from(this.loadTimes.values());
    return times.reduce((sum, time) => sum + time, 0) / times.length;
  }
  
  clearCache() {
    this.preloadCache.clear();
    this.loadTimes.clear();
    console.log('🧹 Favicon preload cache cleared');
  }
}

export const faviconPreloader = new FaviconPreloader();
