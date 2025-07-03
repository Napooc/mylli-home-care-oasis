
import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { mobileImageOptimizer } from '@/utils/mobileImageOptimizer';

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
  const [placeholder, setPlaceholder] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Mobile-optimized intersection observer
  useEffect(() => {
    if (priority) return;

    const config = mobileImageOptimizer.getMobileIntersectionConfig();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      config
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate mobile placeholder
  useEffect(() => {
    if (!priority && width && height) {
      const mobilePlaceholder = mobileImageOptimizer.generateMobilePlaceholder(width, height);
      setPlaceholder(mobilePlaceholder);
    }
  }, [width, height, priority]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

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

  // Use mobile-optimized URL
  const optimizedSrc = mobileImageOptimizer.optimizeImageUrl(
    src, 
    width, 
    height, 
    priority ? 'high' : 'medium'
  );

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {!isLoaded && placeholder && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50"
          style={{ width: width || '100%', height: height || '100%' }}
        />
      )}
      
      {!isLoaded && !placeholder && (
        <Skeleton 
          className="absolute inset-0 w-full h-full rounded"
          style={{ width: width || '100%', height: height || '100%' }}
        />
      )}
      
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

UltraFastImage.displayName = 'UltraFastImage';

export default UltraFastImage;
