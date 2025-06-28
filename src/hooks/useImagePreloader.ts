
import { useEffect, useState, useCallback } from 'react';

interface UseImagePreloaderOptions {
  images: string[];
  priority?: boolean;
  maxConcurrent?: number;
  criticalOnly?: boolean;
  viewportAware?: boolean;
}

interface ImageLoadResult {
  src: string;
  loaded: boolean;
  error?: boolean;
  format?: 'webp' | 'jpeg' | 'png';
}

export const useImagePreloader = ({ 
  images, 
  priority = false, 
  maxConcurrent = 6, // Increased for parallel loading
  criticalOnly = false,
  viewportAware = true
}: UseImagePreloaderOptions) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadResults, setLoadResults] = useState<Map<string, ImageLoadResult>>(new Map());

  // Smart image format detection
  const detectOptimalFormat = useCallback(async (src: string): Promise<'webp' | 'jpeg' | 'png'> => {
    // Check WebP support
    const supportsWebP = await new Promise<boolean>((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => resolve(webP.height === 2);
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });

    if (supportsWebP && src.includes('unsplash.com')) return 'webp';
    if (src.includes('.png')) return 'png';
    return 'jpeg';
  }, []);

  // Viewport-aware size optimization
  const getOptimalImageSize = useCallback(() => {
    if (!viewportAware) return { width: 800, height: 600 };
    
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1
    };

    // Calculate optimal size based on viewport
    const optimalWidth = Math.min(
      Math.ceil(viewport.width * viewport.devicePixelRatio),
      1920 // Max width cap
    );

    // Use standard responsive breakpoints
    if (optimalWidth <= 480) return { width: 480, height: 320 };
    if (optimalWidth <= 768) return { width: 768, height: 512 };
    if (optimalWidth <= 1024) return { width: 1024, height: 683 };
    if (optimalWidth <= 1440) return { width: 1440, height: 960 };
    return { width: 1920, height: 1280 };
  }, [viewportAware]);

  // Optimized preload function with parallel processing
  const preloadImage = useCallback(async (src: string): Promise<ImageLoadResult> => {
    try {
      const format = await detectOptimalFormat(src);
      const { width, height } = getOptimalImageSize();
      
      // Optimize URL based on format and size
      let optimizedSrc = src;
      if (src.includes('unsplash.com')) {
        const params = new URLSearchParams();
        params.set('auto', 'format');
        params.set('fit', 'crop');
        params.set('q', '75');
        params.set('w', width.toString());
        params.set('h', height.toString());
        if (format === 'webp') params.set('fm', 'webp');
        optimizedSrc = `${src}?${params.toString()}`;
      } else if (src.includes('lovable-uploads')) {
        const params = new URLSearchParams();
        params.set('w', width.toString());
        params.set('q', '75');
        optimizedSrc = `${src}?${params.toString()}`;
      }

      return new Promise((resolve) => {
        const img = new Image();
        
        img.onload = () => {
          const result: ImageLoadResult = { src, loaded: true, format };
          
          setLoadedImages(prev => {
            const newSet = new Set([...prev, src]);
            setProgress((newSet.size / images.length) * 100);
            return newSet;
          });
          
          setLoadResults(prev => new Map([...prev, [src, result]]));
          resolve(result);
        };
        
        img.onerror = () => {
          const result: ImageLoadResult = { src, loaded: false, error: true, format };
          setLoadResults(prev => new Map([...prev, [src, result]]));
          console.warn(`Failed to preload image: ${src}`);
          resolve(result);
        };
        
        img.src = optimizedSrc;
      });
    } catch (error) {
      const result: ImageLoadResult = { src, loaded: false, error: true };
      setLoadResults(prev => new Map([...prev, [src, result]]));
      return result;
    }
  }, [detectOptimalFormat, getOptimalImageSize, images.length]);

  // Smart parallel loading with concurrency control
  const loadImagesInParallel = useCallback(async (imageList: string[]) => {
    if (!imageList.length) {
      setIsLoading(false);
      return;
    }

    // Filter critical images if criticalOnly is enabled
    let imagesToLoad = imageList;
    if (criticalOnly) {
      // Only load first 3 images for above-the-fold content
      imagesToLoad = imageList.slice(0, 3);
    }

    try {
      // Process in parallel batches for optimal performance
      const batches: string[][] = [];
      for (let i = 0; i < imagesToLoad.length; i += maxConcurrent) {
        batches.push(imagesToLoad.slice(i, i + maxConcurrent));
      }

      for (const batch of batches) {
        await Promise.allSettled(batch.map(preloadImage));
        
        // Small delay between batches only if not priority
        if (!priority && batches.indexOf(batch) < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 25)); // Reduced delay
        }
      }
    } catch (error) {
      console.warn('Image preloading error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [maxConcurrent, preloadImage, priority, criticalOnly]);

  useEffect(() => {
    if (!images.length) {
      setIsLoading(false);
      return;
    }

    // Reset state when images change
    setLoadedImages(new Set());
    setLoadResults(new Map());
    setProgress(0);
    setIsLoading(true);

    // Use parallel loading for all scenarios
    loadImagesInParallel(images);
  }, [images, loadImagesInParallel]);

  return {
    loadedImages,
    isLoading,
    progress,
    loadResults,
    isImageLoaded: (src: string) => loadedImages.has(src),
    getImageResult: (src: string) => loadResults.get(src),
    totalImages: images.length,
    loadedCount: loadedImages.size,
    errorCount: Array.from(loadResults.values()).filter(r => r.error).length
  };
};
