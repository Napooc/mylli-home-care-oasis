
import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

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

// Ultra-fast image optimization
const optimizeImageUrl = (src: string, width?: number, height?: number, quality = 75) => {
  if (src.includes('unsplash.com')) {
    const params = new URLSearchParams();
    params.set('auto', 'format');
    params.set('fit', 'crop');
    params.set('q', quality.toString());
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    return `${src}?${params.toString()}`;
  }
  
  if (src.includes('lovable-uploads')) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('q', quality.toString());
    return `${src}?${params.toString()}`;
  }
  
  return src;
};

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

  // Ultra-fast intersection observer
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

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

  const optimizedSrc = optimizeImageUrl(src, width, height, quality);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
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
