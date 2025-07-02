
// Ultra-fast image optimization utilities with aggressive compression

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'avif' | 'webp' | 'jpeg' | 'png' | 'auto';
  fit?: 'cover' | 'contain' | 'fill' | 'crop';
  cacheBuster?: boolean;
  priority?: boolean;
  critical?: boolean;
}

// Aggressive device-aware image sizing for ultra-fast loading
export const getOptimalImageSize = (
  containerWidth: number, 
  devicePixelRatio = window.devicePixelRatio || 1,
  maxWidth = 1440 // Reduced max width for faster loading
) => {
  // Cap DPR at 1.5 for better performance vs quality balance
  const targetWidth = Math.ceil(containerWidth * Math.min(devicePixelRatio, 1.5));
  
  // Ultra-optimized responsive breakpoints
  if (targetWidth <= 240) return 240;
  if (targetWidth <= 320) return 320;
  if (targetWidth <= 480) return 480;
  if (targetWidth <= 640) return 640;
  if (targetWidth <= 768) return 768;
  if (targetWidth <= 1024) return 1024;
  return Math.min(targetWidth, maxWidth);
};

// Modern format support detection with caching
let formatSupport: { avif: boolean; webp: boolean } | null = null;

export const detectFormatSupport = async (): Promise<{ avif: boolean; webp: boolean }> => {
  if (formatSupport) return formatSupport;
  
  const [avifSupported, webpSupported] = await Promise.all([
    // AVIF detection
    new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = img.onerror = () => resolve(img.height === 1);
      img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    }),
    // WebP detection
    new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = img.onerror = () => resolve(img.height === 2);
      img.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    })
  ]);
  
  formatSupport = { avif: avifSupported, webp: webpSupported };
  console.log('🎨 Format support detected:', formatSupport);
  
  return formatSupport;
};

// Ultra-aggressive URL optimization with modern formats
export const optimizeImageUrl = (
  src: string, 
  options: ImageOptimizationOptions = {}
): string => {
  const {
    width = getOptimalImageSize(800),
    height,
    quality = 60, // More aggressive default quality
    format = 'auto',
    fit = 'crop',
    cacheBuster = false,
    priority = false,
    critical = false
  } = options;

  // Determine optimal quality based on priority
  const optimalQuality = critical ? 70 : priority ? 65 : 60;

  // Handle Unsplash images with ultra-aggressive optimization
  if (src.includes('unsplash.com')) {
    const params = new URLSearchParams();
    params.set('auto', 'format');
    params.set('fit', fit);
    params.set('q', optimalQuality.toString());
    params.set('w', width.toString());
    
    if (height) {
      params.set('h', height.toString());
    }
    
    // Modern format selection
    if (format === 'avif') {
      params.set('fm', 'avif');
    } else if (format === 'webp') {
      params.set('fm', 'webp');
    }
    
    // Aggressive DPR capping for performance
    if (priority || critical) {
      params.set('dpr', Math.min(window.devicePixelRatio || 1, 1.5).toString());
    }
    
    return `${src}?${params.toString()}`;
  }

  // Handle Lovable uploads with aggressive optimization
  if (src.includes('lovable-uploads')) {
    const params = new URLSearchParams();
    params.set('w', width.toString());
    params.set('q', optimalQuality.toString());
    
    if (height) {
      params.set('h', height.toString());
    }
    
    if (format !== 'auto') {
      params.set('f', format);
    }
    
    if (cacheBuster) {
      params.set('v', Math.floor(Date.now() / 60000).toString()); // 1-minute cache busting
    }
    
    return `${src}?${params.toString()}`;
  }

  return src;
};

// Ultra-fast responsive srcSet generation with modern formats
export const generateUltraFastSrcSet = async (
  src: string, 
  widths: number[] = [320, 480, 640, 768, 1024],
  quality = 60
): Promise<Array<{ srcSet: string; type: string }>> => {
  const formats = await detectFormatSupport();
  const srcSets: Array<{ srcSet: string; type: string }> = [];
  
  // Generate AVIF srcSet (best compression)
  if (formats.avif && src.includes('unsplash.com')) {
    const avifSrcSet = widths
      .map(width => {
        const optimizedSrc = optimizeImageUrl(src, { width, quality, format: 'avif' });
        return `${optimizedSrc} ${width}w`;
      })
      .join(', ');
    srcSets.push({ srcSet: avifSrcSet, type: 'image/avif' });
  }
  
  // Generate WebP srcSet (good compression)
  if (formats.webp) {
    const webpSrcSet = widths
      .map(width => {
        const optimizedSrc = optimizeImageUrl(src, { width, quality, format: 'webp' });
        return `${optimizedSrc} ${width}w`;
      })
      .join(', ');
    srcSets.push({ srcSet: webpSrcSet, type: 'image/webp' });
  }
  
  // Generate fallback srcSet
  const fallbackSrcSet = widths
    .map(width => {
      const optimizedSrc = optimizeImageUrl(src, { width, quality });
      return `${optimizedSrc} ${width}w`;
    })
    .join(', ');
  srcSets.push({ srcSet: fallbackSrcSet, type: 'image/jpeg' });
  
  return srcSets;
};

// Ultra-fast responsive sizes
export const getUltraFastSizes = (): string => {
  return '(max-width: 320px) 100vw, (max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
};

// Critical images for preloading (only truly essential ones)
export const getCriticalImages = (): Array<{ src: string; priority: number }> => {
  return [
    { src: '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png', priority: 100 }, // Logo
  ];
};

// Ultra-fast critical image preloading
export const preloadCriticalImages = (): void => {
  const criticalImages = getCriticalImages();
  
  // Use requestIdleCallback for non-blocking preloading
  const preloadWhenIdle = async () => {
    const formats = await detectFormatSupport();
    
    criticalImages.forEach(({ src, priority }) => {
      // Preload multiple formats for critical images
      const imagesToPreload = [];
      
      if (formats.avif && src.includes('unsplash.com')) {
        imagesToPreload.push(optimizeImageUrl(src, { width: 400, quality: 70, format: 'avif', critical: true }));
      }
      
      if (formats.webp) {
        imagesToPreload.push(optimizeImageUrl(src, { width: 400, quality: 70, format: 'webp', critical: true }));
      }
      
      imagesToPreload.push(optimizeImageUrl(src, { width: 400, quality: 70, critical: true }));
      
      // Create preload links
      imagesToPreload.forEach(optimizedSrc => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = optimizedSrc;
        link.setAttribute('data-mylli-critical', 'true');
        document.head.appendChild(link);
      });
    });
    
    console.log('⚡ Ultra-fast critical images preloaded');
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(preloadWhenIdle, { timeout: 50 });
  } else {
    setTimeout(preloadWhenIdle, 0);
  }
};

// Memory cleanup utility
export const cleanupImageResources = (): void => {
  // Remove old preload links
  const oldLinks = document.querySelectorAll('link[data-mylli-critical]');
  oldLinks.forEach(link => link.remove());
  
  // Clear format support cache periodically
  if (Math.random() < 0.1) { // 10% chance
    formatSupport = null;
  }
  
  console.log('🧹 Image resources cleaned up');
};
