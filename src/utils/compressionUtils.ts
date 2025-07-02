
// Compression and optimization utilities
export interface CompressionOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  width?: number;
  height?: number;
  progressive?: boolean;
}

class CompressionManager {
  private compressionCache = new Map<string, string>();

  // Detect browser compression support
  getOptimalFormat(): 'avif' | 'webp' | 'jpeg' {
    // Check AVIF support
    if (this.supportsFormat('avif')) return 'avif';
    // Check WebP support
    if (this.supportsFormat('webp')) return 'webp';
    // Fallback to JPEG
    return 'jpeg';
  }

  // Check format support
  private supportsFormat(format: 'avif' | 'webp'): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    try {
      const mimeType = format === 'avif' ? 'image/avif' : 'image/webp';
      return canvas.toDataURL(mimeType).indexOf(`data:${mimeType}`) === 0;
    } catch {
      return false;
    }
  }

  // Generate optimized image URL
  getOptimizedImageUrl(src: string, options: CompressionOptions = {}): string {
    const cacheKey = `${src}-${JSON.stringify(options)}`;
    
    if (this.compressionCache.has(cacheKey)) {
      return this.compressionCache.get(cacheKey)!;
    }

    let optimizedUrl = src;

    // Handle Unsplash images
    if (src.includes('unsplash.com')) {
      const params = new URLSearchParams();
      params.set('auto', 'format,compress');
      params.set('fit', 'crop');
      params.set('q', (options.quality || 75).toString());
      
      if (options.width) params.set('w', options.width.toString());
      if (options.height) params.set('h', options.height.toString());
      
      const optimalFormat = options.format || this.getOptimalFormat();
      if (optimalFormat !== 'jpeg') {
        params.set('fm', optimalFormat);
      }

      optimizedUrl = `${src}?${params.toString()}`;
    }
    
    // Handle Lovable uploads
    else if (src.includes('lovable-uploads')) {
      const params = new URLSearchParams();
      params.set('q', (options.quality || 75).toString());
      
      if (options.width) params.set('w', options.width.toString());
      if (options.height) params.set('h', options.height.toString());
      
      const optimalFormat = options.format || this.getOptimalFormat();
      if (optimalFormat !== 'jpeg') {
        params.set('format', optimalFormat);
      }

      optimizedUrl = `${src}?${params.toString()}`;
    }

    this.compressionCache.set(cacheKey, optimizedUrl);
    return optimizedUrl;
  }

  // Generate responsive srcSet
  generateSrcSet(src: string, widths: number[] = [320, 480, 768, 1024, 1440, 1920]): string {
    return widths
      .map(width => {
        const optimizedSrc = this.getOptimizedImageUrl(src, { 
          width, 
          quality: width <= 768 ? 70 : 75 
        });
        return `${optimizedSrc} ${width}w`;
      })
      .join(', ');
  }

  // Clear compression cache
  clearCache(): void {
    this.compressionCache.clear();
  }
}

export const compressionManager = new CompressionManager();

// Network-aware compression
export const getNetworkAwareQuality = (): number => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    
    if (connection?.effectiveType) {
      switch (connection.effectiveType) {
        case 'slow-2g':
        case '2g':
          return 40; // Very low quality for slow connections
        case '3g':
          return 55; // Medium quality for 3G
        case '4g':
        default:
          return 75; // High quality for fast connections
      }
    }
  }
  
  return 65; // Default quality
};

// Memory usage optimization
export const optimizeMemoryUsage = (): void => {
  // Clear image caches periodically
  setInterval(() => {
    compressionManager.clearCache();
    
    // Force garbage collection if available (Chrome DevTools)
    if ('gc' in window && typeof (window as any).gc === 'function') {
      (window as any).gc();
    }
  }, 10 * 60 * 1000); // Every 10 minutes
};
