
// Mobile-optimized image component with all 4 phases
import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { mobileImageOptimizer } from '@/utils/mobileImageOptimizer';

interface MobileOptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

// Phase 3: Shared mobile-optimized intersection observer
class MobileIntersectionObserver {
  private static instance: MobileIntersectionObserver;
  private observer: IntersectionObserver;
  private callbacks = new Map<Element, () => void>();

  static getInstance(): MobileIntersectionObserver {
    if (!this.instance) {
      this.instance = new MobileIntersectionObserver();
    }
    return this.instance;
  }

  constructor() {
    const config = mobileImageOptimizer.getMobileIntersectionConfig();
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
      config
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

const mobileObserver = MobileIntersectionObserver.getInstance();

const MobileOptimizedImage: React.FC<MobileOptimizedImageProps> = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [placeholder, setPlaceholder] = useState<string>('');
  const [progressiveLoaded, setProgressiveLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startTime = useRef<number>(Date.now());

  // Phase 2: Generate mobile placeholder immediately
  useEffect(() => {
    if (!priority && width && height) {
      const mobilePlaceholder = mobileImageOptimizer.generateMobilePlaceholder(width, height);
      setPlaceholder(mobilePlaceholder);
    }
  }, [width, height, priority]);

  // Phase 3: Mobile-optimized intersection observer
  useEffect(() => {
    if (priority) return;

    if (containerRef.current) {
      mobileObserver.observe(containerRef.current, () => {
        setIsInView(true);
      });
    }

    return () => {
      if (containerRef.current) {
        mobileObserver.unobserve(containerRef.current);
      }
    };
  }, [priority]);

  // Phase 2: Progressive loading - load low quality first, then high quality
  useEffect(() => {
    if (!isInView) return;

    // Phase 4: Check memory before loading high quality
    const canLoadHQ = mobileImageOptimizer.canLoadHighQuality();
    
    if (!canLoadHQ) {
      console.log(`📱 Memory pressure detected, loading low quality only: ${src}`);
    }

    // Load progressive image (tiny first, then full)
    const loadProgressiveImage = async () => {
      try {
        // First, load a very low quality version
        const lowQualityUrl = mobileImageOptimizer.optimizeImageUrl(src, width, height, 'low');
        
        const lowQualityImg = new Image();
        lowQualityImg.onload = () => {
          setProgressiveLoaded(true);
          
          // Then load high quality if memory allows
          if (canLoadHQ) {
            setTimeout(() => {
              const highQualityUrl = mobileImageOptimizer.optimizeImageUrl(src, width, height, 'high');
              const highQualityImg = new Image();
              
              highQualityImg.onload = () => {
                setIsLoaded(true);
                const loadTime = Date.now() - startTime.current;
                console.log(`📱 Mobile image loaded in ${loadTime}ms: ${src}`);
                onLoad?.();
              };
              
              highQualityImg.onerror = handleError;
              highQualityImg.src = highQualityUrl;
            }, 100); // Small delay for progressive enhancement
          } else {
            setIsLoaded(true);
            onLoad?.();
          }
        };
        
        lowQualityImg.onerror = handleError;
        lowQualityImg.src = lowQualityUrl;
        
      } catch (error) {
        handleError();
      }
    };

    loadProgressiveImage();
  }, [isInView, src, width, height, onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
    
    const loadTime = Date.now() - startTime.current;
    console.warn(`❌ Mobile image failed to load: ${src} (${loadTime}ms)`);
  }, [src, onError]);

  if (hasError) {
    return (
      <div 
        className={`bg-muted flex items-center justify-center rounded ${className}`}
        style={{ width, height }}
      >
        <span className="text-muted-foreground text-xs">Image non disponible</span>
      </div>
    );
  }

  // Get mobile-optimized URL
  const optimizedSrc = mobileImageOptimizer.optimizeImageUrl(
    src, 
    width, 
    height, 
    priority ? 'high' : 'medium'
  );

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Phase 2: Immediate tiny placeholder for progressive loading */}
      {!progressiveLoaded && placeholder && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm opacity-60"
          style={{ width: width || '100%', height: height || '100%' }}
        />
      )}
      
      {/* Skeleton fallback */}
      {!progressiveLoaded && !placeholder && (
        <Skeleton 
          className="absolute inset-0 w-full h-full rounded"
          style={{ width: width || '100%', height: height || '100%' }}
        />
      )}
      
      {/* Progressive image loading */}
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : progressiveLoaded ? 'opacity-70' : 'opacity-0'
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

MobileOptimizedImage.displayName = 'MobileOptimizedImage';

export default MobileOptimizedImage;
