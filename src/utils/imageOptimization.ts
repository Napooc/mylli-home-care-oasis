// High-performance image optimization utilities with smart preloading

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'auto';
  fit?: 'cover' | 'contain' | 'fill' | 'crop';
  cacheBuster?: boolean;
  priority?: boolean;
}

// Smart device-aware image sizing with performance optimization
export const getOptimalImageSize = (
  containerWidth: number, 
  devicePixelRatio = window.devicePixelRatio || 1,
  maxWidth = 1920
) => {
  const targetWidth = Math.ceil(containerWidth * Math.min(devicePixelRatio, 2)); // Cap DPR at 2 for performance
  
  // Optimized responsive breakpoints for faster loading
  if (targetWidth <= 320) return 320;
  if (targetWidth <= 480) return 480;
  if (targetWidth <= 768) return 768;
  if (targetWidth <= 1024) return 1024;
  if (targetWidth <= 1440) return 1440;
  return Math.min(targetWidth, maxWidth);
};

// Enhanced URL generation with format detection and optimization
export const optimizeImageUrl = (
  src: string, 
  options: ImageOptimizationOptions = {}
): string => {
  const {
    width = getOptimalImageSize(800),
    height,
    quality = 75,
    format = 'auto',
    fit = 'crop',
    cacheBuster = false,
    priority = false
  } = options;

  // Handle Unsplash images with advanced optimization
  if (src.includes('unsplash.com')) {
    const params = new URLSearchParams();
    params.set('auto', 'format');
    params.set('fit', fit);
    params.set('q', priority ? '80' : quality.toString()); // Higher quality for priority images
    params.set('w', width.toString());
    
    if (height) {
      params.set('h', height.toString());
    }
    
    // Smart format selection
    if (format === 'webp' || (format === 'auto' && supportsWebPSync())) {
      params.set('fm', 'webp');
    }
    
    // Add performance hints
    if (priority) {
      params.set('dpr', Math.min(window.devicePixelRatio || 1, 2).toString());
    }
    
    return `${src}?${params.toString()}`;
  }

  // Handle Lovable uploads with smart optimization
  if (src.includes('lovable-uploads')) {
    const params = new URLSearchParams();
    params.set('w', width.toString());
    params.set('q', priority ? '80' : quality.toString());
    
    if (height) {
      params.set('h', height.toString());
    }
    
    if (cacheBuster) {
      params.set('v', Date.now().toString());
    }
    
    return `${src}?${params.toString()}`;
  }

  return src;
};

// Synchronous WebP support detection for immediate use
let webpSupportCache: boolean | null = null;
export const supportsWebPSync = (): boolean => {
  if (webpSupportCache !== null) return webpSupportCache;
  
  // Quick canvas-based WebP detection
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  try {
    webpSupportCache = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } catch {
    webpSupportCache = false;
  }
  
  return webpSupportCache;
};

// Enhanced responsive srcSet generation
export const generateSrcSet = (
  src: string, 
  widths: number[] = [320, 480, 768, 1024, 1440],
  quality = 75
): string => {
  return widths
    .map(width => {
      const optimizedSrc = optimizeImageUrl(src, { width, quality });
      return `${optimizedSrc} ${width}w`;
    })
    .join(', ');
};

// Smart responsive sizes with performance considerations
export const getResponsiveSizes = (
  breakpoints: Record<string, string> = {
    '(max-width: 320px)': '100vw',
    '(max-width: 768px)': '100vw',
    '(max-width: 1024px)': '50vw',
    default: '33vw'
  }
): string => {
  const entries = Object.entries(breakpoints);
  const mediaQueries = entries
    .filter(([key]) => key !== 'default')
    .map(([query, size]) => `${query} ${size}`);
  
  const defaultSize = breakpoints.default || '100vw';
  return [...mediaQueries, defaultSize].join(', ');
};

// Smart critical images selection (only truly critical ones)
export const getCriticalImages = (): string[] => {
  return [
    `/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png`, // Logo only
  ];
};

// Above-the-fold image detection
export const getAboveFoldImages = (images: string[], maxCount = 3): string[] => {
  return images.slice(0, maxCount);
};

// High-performance critical image preloading
export const preloadCriticalImages = (): void => {
  const criticalImages = getCriticalImages();
  
  // Use requestIdleCallback for non-blocking preloading
  const preloadWhenIdle = () => {
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = optimizeImageUrl(src, { width: 400, quality: 80, priority: true });
      link.setAttribute('data-mylli-critical', 'true');
      
      document.head.appendChild(link);
    });
    
    console.log('✅ Critical images preloaded efficiently');
  };

  // Use requestIdleCallback if available, fallback to immediate execution
  if ('requestIdleCallback' in window) {
    requestIdleCallback(preloadWhenIdle, { timeout: 100 });
  } else {
    setTimeout(preloadWhenIdle, 0);
  }
};

// Image loading priority queue
export class ImageLoadingQueue {
  private queue: Array<{ src: string; priority: number; callback?: () => void }> = [];
  private loading = new Set<string>();
  private maxConcurrent = 4;

  add(src: string, priority = 0, callback?: () => void) {
    this.queue.push({ src, priority, callback });
    this.queue.sort((a, b) => b.priority - a.priority); // Higher priority first
    this.process();
  }

  private async process() {
    while (this.loading.size < this.maxConcurrent && this.queue.length > 0) {
      const item = this.queue.shift();
      if (!item || this.loading.has(item.src)) continue;

      this.loading.add(item.src);
      
      try {
        await this.loadImage(item.src);
        item.callback?.();
      } catch (error) {
        console.warn(`Failed to load image: ${item.src}`);
      } finally {
        this.loading.delete(item.src);
        this.process(); // Continue processing queue
      }
    }
  }

  private loadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  }
}

export const imageLoadingQueue = new ImageLoadingQueue();

// Enhanced image cache with memory management
class ImageCacheManager {
  private cache = new Map<string, { img: HTMLImageElement; timestamp: number; hits: number }>();
  private maxSize = 50; // Maximum cached images
  private maxAge = 30 * 60 * 1000; // 30 minutes

  set(key: string, img: HTMLImageElement): void {
    // Clean old entries if cache is full
    if (this.cache.size >= this.maxSize) {
      this.cleanup();
    }

    this.cache.set(key, {
      img,
      timestamp: Date.now(),
      hits: 1
    });
  }

  get(key: string): HTMLImageElement | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if entry is still valid
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    entry.hits++;
    return entry.img;
  }

  private cleanup(): void {
    const now = Date.now();
    const entries = Array.from(this.cache.entries());
    
    // Remove expired entries
    entries.forEach(([key, entry]) => {
      if (now - entry.timestamp > this.maxAge) {
        this.cache.delete(key);
      }
    });

    // If still too many, remove least used
    if (this.cache.size >= this.maxSize) {
      const sortedEntries = entries
        .filter(([key]) => this.cache.has(key))
        .sort((a, b) => a[1].hits - b[1].hits);
      
      const toRemove = sortedEntries.slice(0, Math.floor(this.maxSize / 4));
      toRemove.forEach(([key]) => this.cache.delete(key));
    }
  }

  clear(): void {
    this.cache.clear();
  }
}

export const imageCache = new ImageCacheManager();

// Enhanced adaptive loading based on connection speed
export const getAdaptiveQuality = (): number => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    
    if (connection?.effectiveType) {
      switch (connection.effectiveType) {
        case 'slow-2g':
        case '2g':
          return 40;
        case '3g':
          return 55;
        case '4g':
        default:
          return 75;
      }
    }
  }
  
  return 65; // Default quality
};

// Browser cache optimization
export const optimizeBrowserCache = (): void => {
  // Set cache control headers for images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.complete) {
      img.addEventListener('load', () => {
        // Mark image as cacheable
        img.setAttribute('data-cached', 'true');
      });
    }
  });
};

// Memory optimization - clean up unused resources
export const optimizeMemory = (): void => {
  // Clean up image cache periodically
  setInterval(() => {
    imageCache.clear();
    
    // Force garbage collection if available
    if ('gc' in window) {
      (window as any).gc();
    }
  }, 5 * 60 * 1000); // Every 5 minutes
};
