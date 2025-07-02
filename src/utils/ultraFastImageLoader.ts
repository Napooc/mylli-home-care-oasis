// Phase 1: Ultra-Fast Critical Image Preloader
interface ImageLoadingConfig {
  quality: number;
  format: 'webp' | 'jpeg' | 'png';
  priority: 'high' | 'medium' | 'low';
}

class UltraFastImageLoader {
  private static instance: UltraFastImageLoader;
  private preloadedImages = new Set<string>();
  private connectionSpeed: 'slow' | 'medium' | 'fast' = 'medium';
  private supportsWebP: boolean = false;

  static getInstance(): UltraFastImageLoader {
    if (!this.instance) {
      this.instance = new UltraFastImageLoader();
    }
    return this.instance;
  }

  constructor() {
    this.detectWebPSupport();
    this.detectConnectionSpeed();
    this.preloadCriticalImages();
  }

  // Critical images for immediate preloading
  private getCriticalImages(): string[] {
    return [
      '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png', // Logo
      '/lovable-uploads/00945798-dc13-478e-94d1-d1aaa70af5a6.png', // Hero image
    ];
  }

  // Detect WebP support for 30% smaller images
  private detectWebPSupport(): void {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    this.supportsWebP = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    console.log(`🖼️ WebP Support: ${this.supportsWebP ? 'YES' : 'NO'}`);
  }

  // Detect connection speed for adaptive quality
  private detectConnectionSpeed(): void {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection?.effectiveType;
      
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        this.connectionSpeed = 'slow';
      } else if (effectiveType === '3g') {
        this.connectionSpeed = 'medium';
      } else {
        this.connectionSpeed = 'fast';
      }
    }
    console.log(`📶 Connection Speed: ${this.connectionSpeed}`);
  }

  // Get optimal configuration based on connection and support
  getOptimalConfig(priority: 'high' | 'medium' | 'low' = 'medium'): ImageLoadingConfig {
    let quality = 80;
    
    // Adjust quality based on connection speed
    switch (this.connectionSpeed) {
      case 'slow':
        quality = priority === 'high' ? 60 : 40;
        break;
      case 'medium':
        quality = priority === 'high' ? 80 : 65;
        break;
      case 'fast':
        quality = priority === 'high' ? 90 : 80;
        break;
    }

    return {
      quality,
      format: this.supportsWebP ? 'webp' : 'jpeg',
      priority
    };
  }

  // Optimize image URL with best format and quality
  optimizeImageUrl(src: string, width?: number, height?: number, priority: 'high' | 'medium' | 'low' = 'medium'): string {
    const config = this.getOptimalConfig(priority);
    
    if (src.includes('unsplash.com')) {
      const params = new URLSearchParams();
      params.set('auto', 'format');
      params.set('fit', 'crop');
      params.set('q', config.quality.toString());
      if (config.format === 'webp') params.set('fm', 'webp');
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      return `${src}?${params.toString()}`;
    }
    
    if (src.includes('lovable-uploads')) {
      const params = new URLSearchParams();
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      params.set('q', config.quality.toString());
      if (config.format === 'webp') params.set('f', 'webp');
      return `${src}?${params.toString()}`;
    }
    
    return src;
  }

  // Aggressive preloading with <link rel="preload">
  private preloadCriticalImages(): void {
    console.log('🚀 Starting aggressive image preloading...');
    
    const criticalImages = this.getCriticalImages();
    
    criticalImages.forEach((src, index) => {
      if (this.preloadedImages.has(src)) return;
      
      const optimizedSrc = this.optimizeImageUrl(src, 800, 600, 'high');
      
      // Create preload link
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = optimizedSrc;
      link.fetchPriority = 'high';
      
      // Add to head immediately
      document.head.appendChild(link);
      this.preloadedImages.add(src);
      
      console.log(`⚡ Preloaded critical image ${index + 1}/${criticalImages.length}: ${src}`);
    });

    console.log('✅ Critical image preloading complete');
  }

  // Preload image with promise for batch loading
  async preloadImage(src: string, width?: number, height?: number, priority: 'high' | 'medium' | 'low' = 'medium'): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.preloadedImages.has(src)) {
        resolve();
        return;
      }

      const optimizedSrc = this.optimizeImageUrl(src, width, height, priority);
      const img = new Image();
      
      img.onload = () => {
        this.preloadedImages.add(src);
        resolve();
      };
      
      img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
      img.src = optimizedSrc;
    });
  }

  // Batch preload multiple images in parallel
  async batchPreloadImages(images: Array<{ src: string; width?: number; height?: number; priority?: 'high' | 'medium' | 'low' }>): Promise<void> {
    console.log(`🔄 Batch preloading ${images.length} images...`);
    
    const promises = images.map(({ src, width, height, priority }) => 
      this.preloadImage(src, width, height, priority).catch(error => {
        console.warn(`Failed to preload: ${src}`, error);
      })
    );
    
    await Promise.allSettled(promises);
    console.log('✅ Batch preloading complete');
  }

  // Check if image is already preloaded
  isPreloaded(src: string): boolean {
    return this.preloadedImages.has(src);
  }

  // Generate base64 placeholder for instant loading
  generatePlaceholder(width: number = 400, height: number = 300): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create subtle gradient placeholder
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'hsl(var(--muted))');
      gradient.addColorStop(1, 'hsl(var(--muted-foreground) / 0.1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }
    
    return canvas.toDataURL('image/jpeg', 0.1);
  }
}

export const ultraFastImageLoader = UltraFastImageLoader.getInstance();