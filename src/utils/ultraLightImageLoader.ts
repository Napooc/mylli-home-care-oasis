// Ultra-lightweight image loader for mobile performance
import { mobilePerformanceOptimizer } from './mobilePerformanceOptimizer';

interface UltraLightImageOptions {
  src: string;
  placeholder?: string;
  quality?: number;
  priority?: boolean;
}

class UltraLightImageLoader {
  private static instance: UltraLightImageLoader;
  private loadedImages = new Set<string>();
  private observer?: IntersectionObserver;

  static getInstance(): UltraLightImageLoader {
    if (!this.instance) {
      this.instance = new UltraLightImageLoader();
    }
    return this.instance;
  }

  constructor() {
    this.setupObserver();
  }

  private setupObserver(): void {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              this.loadImage(img);
              this.observer!.unobserve(img);
            }
          });
        },
        {
          rootMargin: mobilePerformanceOptimizer.getLazyLoadingThreshold(),
          threshold: 0.1
        }
      );
    }
  }

  // Create 1px placeholder for ultra-fast loading
  createPlaceholder(width: number, height: number): string {
    return `data:image/svg+xml;base64,${btoa(
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
      </svg>`
    )}`;
  }

  // Optimize image URL for mobile
  optimizeImageUrl(src: string, options: Partial<UltraLightImageOptions> = {}): string {
    const quality = options.quality || mobilePerformanceOptimizer.getOptimalImageQuality();
    
    // For mobile, reduce image dimensions and quality
    if (src.includes('lovable-uploads')) {
      return `${src}?q=${quality}&w=800&h=600&fm=webp`;
    }
    
    return src;
  }

  // Setup lazy loading for an image element
  setupLazyLoading(img: HTMLImageElement, options: UltraLightImageOptions): void {
    const optimizedSrc = this.optimizeImageUrl(options.src, options);
    
    // Set placeholder immediately
    img.src = options.placeholder || this.createPlaceholder(400, 300);
    img.dataset.src = optimizedSrc;
    img.loading = 'lazy';
    
    // Add to observer if not priority
    if (!options.priority && this.observer) {
      this.observer.observe(img);
    } else {
      // Load immediately for priority images
      setTimeout(() => this.loadImage(img), 0);
    }
  }

  private loadImage(img: HTMLImageElement): void {
    const src = img.dataset.src;
    if (!src || this.loadedImages.has(src)) return;

    const tempImg = new Image();
    tempImg.onload = () => {
      img.src = src;
      img.classList.add('loaded');
      this.loadedImages.add(src);
    };
    tempImg.onerror = () => {
      console.warn('Failed to load image:', src);
    };
    tempImg.src = src;
  }

  // Preload critical images only
  preloadCriticalImages(urls: string[]): void {
    const criticalUrls = urls.slice(0, 3); // Only preload top 3 images
    
    criticalUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = this.optimizeImageUrl(url);
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });
  }

  cleanup(): void {
    this.observer?.disconnect();
    this.loadedImages.clear();
  }
}

export const ultraLightImageLoader = UltraLightImageLoader.getInstance();