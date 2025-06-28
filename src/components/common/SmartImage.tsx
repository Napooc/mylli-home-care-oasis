
import React, { useState, useRef, useEffect, memo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { optimizeImageUrl, getOptimalImageSize } from '@/utils/imageOptimization';

interface SmartImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  lazy?: boolean;
  priority?: boolean;
  critical?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'skeleton' | 'none';
  fallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
}

const SmartImage: React.FC<SmartImageProps> = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  lazy = true,
  priority = false,
  critical = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  placeholder = 'skeleton',
  fallback,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority || critical || !lazy);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smart intersection observer with priority handling
  useEffect(() => {
    if (priority || critical || !lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: critical ? '200px' : '100px' // Larger margin for critical images
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, critical, lazy]);

  // Smart URL optimization based on context
  const getSmartImageUrl = (originalSrc: string) => {
    const containerWidth = width || (containerRef.current?.offsetWidth) || 800;
    const optimalWidth = getOptimalImageSize(containerWidth);
    
    return optimizeImageUrl(originalSrc, {
      width: optimalWidth,
      height,
      quality: critical ? 80 : quality,
      priority: priority || critical
    });
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    if (fallback) return <>{fallback}</>;
    
    return (
      <div 
        className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm font-medium">Image non disponible</span>
      </div>
    );
  }

  const optimizedSrc = getSmartImageUrl(src);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {!isLoaded && placeholder === 'skeleton' && (
        <Skeleton 
          className="absolute inset-0 animate-pulse rounded"
          style={{ width: width || '100%', height: height || '100%' }}
        />
      )}
      
      {!isLoaded && placeholder === 'blur' && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ 
            width: width || '100%', 
            height: height || '100%',
            filter: 'blur(10px)'
          }}
        />
      )}
      
      {isInView && (
        <img
          ref={imgRef}
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority || critical ? 'eager' : 'lazy'}
          decoding={critical ? 'sync' : 'async'}
          fetchPriority={priority || critical ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-all duration-300 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
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

SmartImage.displayName = 'SmartImage';

export default SmartImage;
