// Phase 1: Instant Critical Image Preloading System
interface ConnectionInfo {
  effectiveType: '2g' | '3g' | '4g' | 'slow-2g';
  downlink: number;
  saveData: boolean;
}

interface ImageLoadConfig {
  src: string;
  priority: 'critical' | 'high' | 'normal' | 'low';
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'auto';
  sizes?: string;
  preload?: boolean;
}

class UltraFastImageLoader {
  private static instance: UltraFastImageLoader;
  private criticalImages: Set<string> = new Set();
  private imageCache = new Map<string, HTMLImageElement>();
  private loadingQueue: ImageLoadConfig[] = [];
  private sharedObserver: IntersectionObserver | null = null;
  private observedElements = new WeakMap<Element, () => void>();
  private batchSize = 6;
  private isSupportsWebP: boolean | null = null;

  static getInstance(): UltraFastImageLoader {
    if (!this.instance) {
      this.instance = new UltraFastImageLoader();
    }
    return this.instance;
  }

  constructor() {
    this.initializeLoader();
  }

  private async initializeLoader(): Promise<void> {
    // Detect WebP support immediately
    this.isSupportsWebP = await this.detectWebPSupport();
    
    // Initialize shared intersection observer
    this.initializeSharedObserver();
    
    // Preload critical images immediately
    this.preloadCriticalImages();
    
    console.log('🚀 Ultra-Fast Image Loader initialized');
  }

  // WebP support detection with caching
  private async detectWebPSupport(): Promise<boolean> {
    if (this.isSupportsWebP !== null) return this.isSupportsWebP;
    
    return new Promise<boolean>((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        const supported = webP.height === 2;
        this.isSupportsWebP = supported;
        resolve(supported);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  // Get network-adaptive quality
  private getAdaptiveQuality(): number {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection as ConnectionInfo;
      if (connection?.saveData) return 40;
      
      switch (connection?.effectiveType) {
        case 'slow-2g':
        case '2g': return 50;
        case '3g': return 65;
        case '4g': return 80;
        default: return 75;
      }
    }
    return 75;
  }

  // Optimize image URL with format and quality
  private optimizeImageUrl(src: string, config: ImageLoadConfig): string {
    const quality = config.quality || this.getAdaptiveQuality();
    const format = config.format === 'auto' ? (this.isSupportsWebP ? 'webp' : 'jpeg') : config.format;

    if (src.includes('unsplash.com')) {
      const params = new URLSearchParams();
      params.set('auto', 'format');
      params.set('fit', 'crop');
      params.set('q', quality.toString());
      if (format === 'webp') params.set('fm', 'webp');
      return `${src}?${params.toString()}`;
    }

    if (src.includes('lovable-uploads')) {
      const params = new URLSearchParams();
      params.set('q', quality.toString());
      return `${src}?${params.toString()}`;
    }

    return src;
  }

  // Preload critical images immediately
  private preloadCriticalImages(): void {
    const criticalImages = [
      '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png', // Logo
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = this.optimizeImageUrl(src, { 
        src, 
        priority: 'critical', 
        format: 'auto',
        preload: true 
      });
      link.fetchPriority = 'high';
      document.head.appendChild(link);
      
      this.criticalImages.add(src);
    });
  }

  // Initialize shared intersection observer
  private initializeSharedObserver(): void {
    this.sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const callback = this.observedElements.get(entry.target);
            if (callback) {
              callback();
              this.sharedObserver?.unobserve(entry.target);
              this.observedElements.delete(entry.target);
            }
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: '200px' // Aggressive preloading
      }
    );
  }

  // Load image with caching and optimization
  async loadImage(config: ImageLoadConfig): Promise<HTMLImageElement> {
    const optimizedSrc = this.optimizeImageUrl(config.src, config);
    
    // Check cache first
    if (this.imageCache.has(optimizedSrc)) {
      return this.imageCache.get(optimizedSrc)!;
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.imageCache.set(optimizedSrc, img);
        resolve(img);
      };
      
      img.onerror = () => {
        console.warn(`Failed to load image: ${config.src}`);
        reject(new Error(`Image load failed: ${config.src}`));
      };

      // Set loading priority
      img.loading = config.priority === 'critical' ? 'eager' : 'lazy';
      img.decoding = 'async';
      (img as any).fetchPriority = config.priority === 'critical' ? 'high' : 'auto';
      
      if (config.sizes) {
        img.sizes = config.sizes;
      }
      
      img.src = optimizedSrc;
    });
  }

  // Observe element for lazy loading
  observeElement(element: Element, loadCallback: () => void): void {
    if (!this.sharedObserver) return;
    
    this.observedElements.set(element, loadCallback);
    this.sharedObserver.observe(element);
  }

  // Batch load multiple images
  async batchLoadImages(configs: ImageLoadConfig[]): Promise<HTMLImageElement[]> {
    const batches: ImageLoadConfig[][] = [];
    
    // Split into batches for optimal loading
    for (let i = 0; i < configs.length; i += this.batchSize) {
      batches.push(configs.slice(i, i + this.batchSize));
    }

    const results: HTMLImageElement[] = [];
    
    for (const batch of batches) {
      const batchPromises = batch.map(config => this.loadImage(config));
      const batchResults = await Promise.allSettled(batchPromises);
      
      batchResults.forEach(result => {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        }
      });
      
      // Small delay between batches for non-critical images
      if (batches.indexOf(batch) < batches.length - 1 && !batch.some(c => c.priority === 'critical')) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }

    return results;
  }

  // Generate base64 placeholder
  generatePlaceholder(width: number = 400, height: number = 300): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Simple gradient placeholder
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }
    
    return canvas.toDataURL('image/jpeg', 0.1);
  }

  // Clear cache when memory pressure is high
  clearCache(): void {
    this.imageCache.clear();
    console.log('🗑️ Image cache cleared');
  }

  // Get cache statistics
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.imageCache.size,
      keys: Array.from(this.imageCache.keys())
    };
  }
}

export const ultraFastImageLoader = UltraFastImageLoader.getInstance();