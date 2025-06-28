
import React, { useState, useRef, useEffect, memo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface PerformantImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  lazy?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'skeleton' | 'none';
  fallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
}

const PerformantImage: React.FC<PerformantImageProps> = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  lazy = true,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'skeleton',
  fallback,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority || !lazy);
  const [hasError, setHasError] = useState(false);
  const [currentFormat, setCurrentFormat] = useState<'webp' | 'original'>('webp');
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Modern intersection observer with performance optimizations
  useEffect(() => {
    if (priority || !lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '100px' // Preload 100px before entering viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, lazy]);

  // Optimized URL generation with format detection
  const generateOptimizedUrl = (originalSrc: string, format: 'webp' | 'original' = 'webp') => {
    if (originalSrc.includes('unsplash.com')) {
      const params = new URLSearchParams();
      params.set('auto', 'format');
      params.set('fit', 'crop');
      params.set('q', quality.toString());
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      if (format === 'webp') params.set('fm', 'webp');
      
      return `${originalSrc}?${params.toString()}`;
    }
    
    if (originalSrc.includes('lovable-uploads')) {
      const params = new URLSearchParams();
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      params.set('q', quality.toString());
      
      return `${originalSrc}?${params.toString()}`;
    }
    
    return originalSrc;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    if (currentFormat === 'webp') {
      // Fallback to original format if WebP fails
      setCurrentFormat('original');
    } else {
      setHasError(true);
      onError?.();
    }
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

  const optimizedSrc = generateOptimizedUrl(src, currentFormat);

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
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
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

PerformantImage.displayName = 'PerformantImage';

export default PerformantImage;
