
// Ultra-lightweight image optimization utilities with mobile integration
import { mobileImageOptimizer } from './mobileImageOptimizer';

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
}

// Fast device-aware image sizing with mobile optimization
export const getOptimalImageSize = (containerWidth: number) => {
  const config = mobileImageOptimizer.getMobileOptimizedConfig(containerWidth);
  return config.width;
};

// Mobile-optimized URL optimization
export const optimizeImageUrl = (src: string, options: ImageOptimizationOptions = {}): string => {
  const { width = 800, height, priority = false } = options;
  
  // Use mobile optimizer for better mobile performance
  return mobileImageOptimizer.optimizeImageUrl(
    src, 
    width, 
    height, 
    priority ? 'high' : 'medium'
  );
};

// Critical images only (logo) with ultra-fast preloading
export const preloadCriticalImages = (): void => {
  const criticalImages = [
    '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png',
    '/lovable-uploads/21a6c87c-23d4-42e3-a542-44f2e834616d.png',
    '/lovable-uploads/609a7402-4f73-4888-bedd-2256c3fbd997.png'
  ];
  
  // Immediate preload with highest priority
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.fetchPriority = 'high';
    link.href = mobileImageOptimizer.optimizeImageUrl(src, 800, undefined, 'high');
    document.head.appendChild(link);
    
    // Also create image object for instant browser cache
    const img = new Image();
    img.src = link.href;
  });
};

// Mobile-aware adaptive quality
export const getAdaptiveQuality = (): number => {
  const config = mobileImageOptimizer.getMobileOptimizedConfig();
  return config.quality;
};
