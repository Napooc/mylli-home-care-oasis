
// Ultra-lightweight image optimization utilities

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
}

// Fast device-aware image sizing
export const getOptimalImageSize = (containerWidth: number) => {
  if (containerWidth <= 320) return 320;
  if (containerWidth <= 480) return 480;
  if (containerWidth <= 768) return 768;
  if (containerWidth <= 1024) return 1024;
  if (containerWidth <= 1440) return 1440;
  return Math.min(containerWidth, 1920);
};

// Fast URL optimization
export const optimizeImageUrl = (src: string, options: ImageOptimizationOptions = {}): string => {
  const { width = 800, height, quality = 75 } = options;

  if (src.includes('unsplash.com')) {
    const params = new URLSearchParams();
    params.set('auto', 'format');
    params.set('fit', 'crop');
    params.set('q', quality.toString());
    params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    return `${src}?${params.toString()}`;
  }

  if (src.includes('lovable-uploads')) {
    const params = new URLSearchParams();
    params.set('w', width.toString());
    params.set('q', quality.toString());
    if (height) params.set('h', height.toString());
    return `${src}?${params.toString()}`;
  }

  return src;
};

// Critical images only (logo)
export const preloadCriticalImages = (): void => {
  const criticalImages = ['/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png'];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimizeImageUrl(src, { width: 200, quality: 80 });
    document.head.appendChild(link);
  });
};

// Network-aware quality
export const getAdaptiveQuality = (): number => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') return 50;
    if (connection?.effectiveType === '3g') return 65;
  }
  return 75;
};
