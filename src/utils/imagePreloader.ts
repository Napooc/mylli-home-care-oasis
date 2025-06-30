
// Optimized image preloading system

interface PreloadedImage {
  src: string;
  loaded: boolean;
  element?: HTMLImageElement;
  priority: 'high' | 'medium' | 'low';
}

class ImagePreloader {
  private cache = new Map<string, PreloadedImage>();
  private loadingQueue: string[] = [];
  private isProcessing = false;
  private maxConcurrent = 3;

  // Critical images that should be preloaded immediately
  private criticalImages = [
    '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png', // Main logo
  ];

  // Route-specific images
  private routeImages = {
    '/': [
      '/lovable-uploads/00945798-dc13-478e-94d1-d1aaa70af5a6.png',
      '/lovable-uploads/1154475c-65aa-44df-bcaf-ab3092ac9960.png',
    ],
    '/services': [
      '/lovable-uploads/12ada3b4-5734-4170-b5a3-090ee9c4f507.png',
      '/lovable-uploads/1a734acd-93c2-4f7b-88a3-fa8c91f19cc0.png',
    ]
  };

  async preloadCritical(): Promise<void> {
    console.log('🖼️ Preloading critical images...');
    
    const promises = this.criticalImages.map(src => 
      this.preloadImage(src, 'high')
    );

    await Promise.allSettled(promises);
    console.log('✅ Critical images preloaded');
  }

  async preloadForRoute(route: string): Promise<void> {
    const images = this.routeImages[route as keyof typeof this.routeImages] || [];
    
    if (images.length === 0) return;

    console.log(`🖼️ Preloading images for route: ${route}`);
    
    const promises = images.map(src => 
      this.preloadImage(src, 'medium')
    );

    await Promise.allSettled(promises);
  }

  private async preloadImage(src: string, priority: 'high' | 'medium' | 'low'): Promise<void> {
    // Check if already cached
    if (this.cache.has(src) && this.cache.get(src)?.loaded) {
      return Promise.resolve();
    }

    // Add to cache with loading state
    this.cache.set(src, { src, loaded: false, priority });

    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        const cached = this.cache.get(src);
        if (cached) {
          cached.loaded = true;
          cached.element = img;
        }
        resolve();
      };
      
      img.onerror = () => {
        console.warn(`❌ Failed to preload image: ${src}`);
        reject(new Error(`Failed to load ${src}`));
      };
      
      // Set loading attributes for performance
      img.loading = priority === 'high' ? 'eager' : 'lazy';
      img.src = src;
    });
  }

  isImageLoaded(src: string): boolean {
    return this.cache.get(src)?.loaded || false;
  }

  getPreloadedImage(src: string): HTMLImageElement | null {
    return this.cache.get(src)?.element || null;
  }

  // Clean up unused images from cache
  cleanup(): void {
    const now = Date.now();
    const maxAge = 30 * 60 * 1000; // 30 minutes

    for (const [src, image] of this.cache.entries()) {
      // Remove low priority images that haven't been accessed recently
      if (image.priority === 'low') {
        this.cache.delete(src);
      }
    }
  }

  // Get cache statistics
  getStats() {
    const total = this.cache.size;
    const loaded = Array.from(this.cache.values()).filter(img => img.loaded).length;
    
    return {
      total,
      loaded,
      hitRate: total > 0 ? (loaded / total) * 100 : 0
    };
  }
}

export const imagePreloader = new ImagePreloader();

// Auto-cleanup every 10 minutes
if (typeof window !== 'undefined') {
  setInterval(() => imagePreloader.cleanup(), 10 * 60 * 1000);
}
