
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
