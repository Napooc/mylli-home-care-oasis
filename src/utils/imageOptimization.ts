
// High-performance image optimization utilities

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'auto';
  fit?: 'cover' | 'contain' | 'fill' | 'crop';
  cacheBuster?: boolean;
}

// Device-aware image sizing
export const getOptimalImageSize = (containerWidth: number, devicePixelRatio = 1) => {
  const targetWidth = Math.ceil(containerWidth * devicePixelRatio);
  
  // Use standard responsive breakpoints
  if (targetWidth <= 400) return 400;
  if (targetWidth <= 600) return 600;
  if (targetWidth <= 800) return 800;
  if (targetWidth <= 1200) return 1200;
  return 1600;
};

// Optimized URL generation with modern formats
export const optimizeImageUrl = (
  src: string, 
  options: ImageOptimizationOptions = {}
): string => {
  const {
    width = 800,
    height,
    quality = 75, // Reduced for better performance
    format = 'webp', // Default to WebP for better compression
    fit = 'crop',
    cacheBuster = false
  } = options;

  // Handle Unsplash images with modern optimization
  if (src.includes('unsplash.com')) {
    const params = new URLSearchParams();
    params.set('auto', 'format');
    params.set('fit', fit);
    params.set('q', quality.toString());
    params.set('w', width.toString());
    
    if (height) {
      params.set('h', height.toString());
    }
    
    // Prefer WebP for better compression
    if (format === 'webp') {
      params.set('fm', 'webp');
    }
    
    return `${src}?${params.toString()}`;
  }

  // Handle Lovable uploads with clean optimization
  if (src.includes('lovable-uploads')) {
    const params = new URLSearchParams();
    params.set('w', width.toString());
    params.set('q', quality.toString());
    
    if (height) {
      params.set('h', height.toString());
    }
    
    if (cacheBuster) {
      // Use timestamp-based cache busting for better performance
      params.set('v', Date.now().toString());
    }
    
    return `${src}?${params.toString()}`;
  }

  return src;
};

// Generate responsive srcSet for different screen sizes
export const generateSrcSet = (
  src: string, 
  widths: number[] = [400, 600, 800, 1200]
): string => {
  return widths
    .map(width => {
      const optimizedSrc = optimizeImageUrl(src, { width, quality: 75 });
      return `${optimizedSrc} ${width}w`;
    })
    .join(', ');
};

// Smart responsive sizes based on common breakpoints
export const getResponsiveSizes = (
  breakpoints: Record<string, string> = {
    '(max-width: 640px)': '100vw',
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

// Critical images for immediate loading (reduced list for performance)
export const getCriticalImages = (): string[] => {
  return [
    `/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png`, // Main logo only
  ];
};

// High-performance preloading with modern techniques
export const preloadCriticalImages = (): void => {
  const criticalImages = getCriticalImages();
  
  // Use requestIdleCallback for non-blocking preloading
  const preloadWhenIdle = () => {
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = optimizeImageUrl(src, { width: 400, quality: 75 });
      link.setAttribute('data-mylli-critical', 'true');
      
      document.head.appendChild(link);
    });
    
    console.log('✅ Critical images preloaded efficiently');
  };

  // Use requestIdleCallback if available, otherwise fallback to setTimeout
  if ('requestIdleCallback' in window) {
    requestIdleCallback(preloadWhenIdle);
  } else {
    setTimeout(preloadWhenIdle, 100);
  }
};

// WebP support detection
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};
