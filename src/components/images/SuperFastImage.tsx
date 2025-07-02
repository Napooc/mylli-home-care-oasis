// Phase 2: Ultra-Optimized Single Image Component
import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { ultraFastImageLoader } from '@/utils/ultraFastImageLoader';

interface SuperFastImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: 'critical' | 'high' | 'normal' | 'low';
  quality?: number;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: 'blur' | 'skeleton' | 'none';
}

const SuperFastImage: React.FC<SuperFastImageProps> = memo(({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = 'normal',
  quality,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onLoad,
  onError,
  placeholder = 'blur'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority === 'critical');
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [placeholderSrc] = useState(() => 
    placeholder === 'blur' ? ultraFastImageLoader.generatePlaceholder(width, height) : ''
  );

  // Load image when in view
  const loadImage = useCallback(async () => {
    if (isLoaded || hasError) return;

    try {
      const img = await ultraFastImageLoader.loadImage({
        src,
        priority,
        quality,
        format: 'auto',
        sizes
      });
      
      setImageSrc(img.src);
      setIsLoaded(true);
      onLoad?.();
    } catch (error) {
      setHasError(true);
      onError?.();
    }
  }, [src, priority, quality, sizes, onLoad, onError, isLoaded, hasError]);

  // Setup intersection observer for lazy loading
  useEffect(() => {
    if (priority === 'critical') {
      loadImage();
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const handleIntersection = () => {
      setIsInView(true);
      loadImage();
    };

    ultraFastImageLoader.observeElement(element, handleIntersection);
  }, [priority, loadImage]);

  // Load critical images immediately
  useEffect(() => {
    if (priority === 'critical') {
      loadImage();
    }
  }, [priority, loadImage]);

  if (hasError) {
    return (
      <div 
        className={`bg-muted flex items-center justify-center rounded ${className}`}
        style={{ width, height }}
      >
        <span className="text-muted-foreground text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Base64 blur placeholder for instant loading */}
      {placeholder === 'blur' && !isLoaded && (
        <img
          src={placeholderSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 transition-opacity duration-300"
          style={{ width, height }}
        />
      )}

      {/* Skeleton placeholder */}
      {placeholder === 'skeleton' && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse"
          style={{ width, height }}
        />
      )}

      {/* Main image */}
      {(isInView || priority === 'critical') && (
        <img
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority === 'critical' ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority === 'critical' ? 'high' : 'auto'}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={{
            width,
            height,
            objectFit: 'cover'
          }}
        />
      )}

      {/* Loading indicator for critical images */}
      {priority === 'critical' && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
});

SuperFastImage.displayName = 'SuperFastImage';

export default SuperFastImage;