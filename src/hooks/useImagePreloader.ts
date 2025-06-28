
import { useEffect, useState, useCallback } from 'react';

interface UseImagePreloaderOptions {
  images: string[];
  priority?: boolean;
  maxConcurrent?: number;
}

export const useImagePreloader = ({ 
  images, 
  priority = false, 
  maxConcurrent = 4 
}: UseImagePreloaderOptions) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Optimized preload function with format detection
  const preloadImage = useCallback((src: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        setLoadedImages(prev => {
          const newSet = new Set([...prev, src]);
          setProgress((newSet.size / images.length) * 100);
          return newSet;
        });
        resolve(src);
      };
      
      img.onerror = () => {
        console.warn(`Failed to preload image: ${src}`);
        reject(src);
      };
      
      // Optimize image URL with better compression
      if (src.includes('unsplash.com')) {
        img.src = `${src}?auto=format&fit=crop&q=75&w=400&fm=webp`;
      } else if (src.includes('lovable-uploads')) {
        img.src = `${src}?w=400&q=75`;
      } else {
        img.src = src;
      }
    });
  }, [images.length]);

  // Parallel loading with concurrency control
  const loadImagesInBatches = useCallback(async (imageList: string[]) => {
    const batches: string[][] = [];
    
    // Split images into batches for controlled parallel loading
    for (let i = 0; i < imageList.length; i += maxConcurrent) {
      batches.push(imageList.slice(i, i + maxConcurrent));
    }

    try {
      for (const batch of batches) {
        await Promise.allSettled(batch.map(preloadImage));
        
        // Small delay between batches to prevent overwhelming the browser
        if (!priority && batches.indexOf(batch) < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    } finally {
      setIsLoading(false);
    }
  }, [maxConcurrent, preloadImage, priority]);

  useEffect(() => {
    if (!images.length) {
      setIsLoading(false);
      return;
    }

    // Reset state when images change
    setLoadedImages(new Set());
    setProgress(0);
    setIsLoading(true);

    if (priority) {
      // For priority images, load all immediately in parallel
      Promise.allSettled(images.map(preloadImage))
        .finally(() => setIsLoading(false));
    } else {
      // For non-priority images, use controlled batching
      loadImagesInBatches(images);
    }
  }, [images, priority, loadImagesInBatches, preloadImage]);

  return {
    loadedImages,
    isLoading,
    progress,
    isImageLoaded: (src: string) => loadedImages.has(src),
    totalImages: images.length,
    loadedCount: loadedImages.size
  };
};
