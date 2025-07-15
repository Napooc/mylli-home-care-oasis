
import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { hyperFastImageCache } from '@/utils/hyperFastImageCache';
import { mobilePerformanceOptimizer } from '@/utils/mobilePerformanceOptimizer';

interface UltraFastImageProps {
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

const UltraFastImage: React.FC<UltraFastImageProps> = memo(({
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
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Check if image is already cached for instant loading
  const isCached = hyperFastImageCache.isImageCached(src);

  // Ultra-aggressive mobile intersection observer
  useEffect(() => {
    if (priority || isCached) {
      setIsInView(true);
      return;
    }

    const threshold = mobilePerformanceOptimizer.shouldDeferNonCritical() ? '50px' : '200px';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isCached]);

  // Instant placeholder for immediate visual feedback
  const placeholder = `data:image/svg+xml;base64,${btoa(
    `<svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e5e5e5"/>
      <rect x="20%" y="40%" width="60%" height="20%" fill="#d4d4d4" rx="4"/>
    </svg>`
  )}`;

  // Preload image in cache when in view
  useEffect(() => {
    if (isInView && !isCached) {
      const optimizedSrc = getOptimizedSrc();
      hyperFastImageCache.preloadImage(optimizedSrc).then(() => {
        setIsLoaded(true);
        onLoad?.();
      }).catch(() => {
        setHasError(true);
        onError?.();
      });
    } else if (isCached) {
      setIsLoaded(true);
      onLoad?.();
    }
  }, [isInView, isCached]);

  // Ultra-fast URL optimization
  const getOptimizedSrc = useCallback(() => {
    const quality = mobilePerformanceOptimizer.getOptimalImageQuality();
    const targetWidth = Math.min(width || 800, window.innerWidth);
    const targetHeight = Math.min(height || 600, window.innerHeight);

    if (src.includes('lovable-uploads')) {
      return `${src}?q=${quality}&w=${targetWidth}&h=${targetHeight}&fm=webp&fit=crop`;
    }
    
    if (src.includes('unsplash.com')) {
      return `${src}&q=${quality}&w=${targetWidth}&h=${targetHeight}&fm=webp&fit=crop&auto=format`;
    }
    
    return src;
  }, [src, width, height]);

  if (hasError) {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center rounded ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Image non disponible</span>
      </div>
    );
  }

  const optimizedSrc = getOptimizedSrc();

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden bg-muted ${className}`}
      style={{ width: width || 'auto', height: height || 'auto' }}
    >
      {/* Instant placeholder - always visible until real image loads */}
      <img
        src={placeholder}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Real image - fades in when loaded */}
      {(isInView || isCached) && (
        <img
          src={optimizedSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width: '100%', height: '100%' }}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
        />
      )}
    </div>
  );
});

UltraFastImage.displayName = 'UltraFastImage';

export default UltraFastImage;
