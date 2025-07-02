// Phase 2: Ultra-Optimized Single Image Component
import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ultraFastImageLoader } from '@/utils/ultraFastImageLoader';
import { intelligentImageCache } from '@/utils/intelligentImageCache';
import { imagePerformanceMonitor } from '@/utils/imagePerformanceMonitor';

interface SuperFastImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

// Shared Intersection Observer for all images (single observer)
class SharedIntersectionObserver {
  private static instance: SharedIntersectionObserver;
  private observer: IntersectionObserver;
  private callbacks = new Map<Element, () => void>();

  static getInstance(): SharedIntersectionObserver {
    if (!this.instance) {
      this.instance = new SharedIntersectionObserver();
    }
    return this.instance;
  }

  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const callback = this.callbacks.get(entry.target);
            if (callback) {
              callback();
              this.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
  }

  observe(element: Element, callback: () => void): void {
    this.callbacks.set(element, callback);
    this.observer.observe(element);
  }

  unobserve(element: Element): void {
    this.callbacks.delete(element);
    this.observer.unobserve(element);
  }
}

const sharedObserver = SharedIntersectionObserver.getInstance();

const SuperFastImage: React.FC<SuperFastImageProps> = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [placeholder, setPlaceholder] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const startTime = useRef<number>(Date.now());

  // Generate immediate base64 placeholder
  useEffect(() => {
    if (!priority) {
      const placeholderUrl = ultraFastImageLoader.generatePlaceholder(width || 400, height || 300);
      setPlaceholder(placeholderUrl);
    }
  }, [width, height, priority]);

  // Ultra-fast intersection observer using shared instance
  useEffect(() => {
    if (priority) return;

    if (containerRef.current) {
      sharedObserver.observe(containerRef.current, () => {
        setIsInView(true);
      });
    }

    return () => {
      if (containerRef.current) {
        sharedObserver.unobserve(containerRef.current);
      }
    };
  }, [priority]);

  // Optimized load handler with caching and monitoring
  const handleLoad = useCallback(() => {
    const loadTime = Date.now() - startTime.current;
    
    setIsLoaded(true);
    onLoad?.();
    
    // Cache successful load
    intelligentImageCache.cacheImage(src, {
      loadTime,
      timestamp: Date.now(),
      width,
      height,
      priority: priority ? 'high' : 'medium'
    });
    
    // Monitor performance
    imagePerformanceMonitor.recordImageLoad(src, loadTime, width, height);
    
    console.log(`📸 Image loaded in ${loadTime}ms: ${src}`);
  }, [src, onLoad, width, height, priority]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
    
    imagePerformanceMonitor.recordImageError(src, Date.now() - startTime.current);
    console.warn(`❌ Image failed to load: ${src}`);
  }, [src, onError]);

  // Check cache first for instant loading
  useEffect(() => {
    const cachedData = intelligentImageCache.getImageData(src);
    if (cachedData && ultraFastImageLoader.isPreloaded(src)) {
      setIsLoaded(true);
      console.log(`⚡ Instant load from cache: ${src}`);
    }
  }, [src]);

  if (hasError) {
    return (
      <div 
        className={`bg-muted flex items-center justify-center rounded ${className}`}
        style={{ width, height }}
      >
        <span className="text-muted-foreground text-sm">Image non disponible</span>
      </div>
    );
  }

  // Get optimized URL with adaptive quality
  const optimizedSrc = ultraFastImageLoader.optimizeImageUrl(
    src, 
    width, 
    height, 
    priority ? 'high' : 'medium'
  );

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Immediate base64 placeholder for instant visual feedback */}
      {!isLoaded && placeholder && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50"
          style={{ width: width || '100%', height: height || '100%' }}
        />
      )}
      
      {/* Skeleton fallback */}
      {!isLoaded && !placeholder && (
        <Skeleton 
          className="absolute inset-0 w-full h-full rounded"
          style={{ width: width || '100%', height: height || '100%' }}
        />
      )}
      
      {/* Actual optimized image */}
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={{
            width: width ? `${width}px` : 'auto',
            height: height ? `${height}px` : 'auto'
          }}
        />
      )}
    </div>
  );
});

SuperFastImage.displayName = 'SuperFastImage';

export default SuperFastImage;