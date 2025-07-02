
import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface UltraFastImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  critical?: boolean;
  quality?: number;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

// Modern format support with fallbacks
const generateImageSources = (src: string, quality: number, width?: number, height?: number) => {
  const baseParams = new URLSearchParams();
  if (width) baseParams.set('w', width.toString());
  if (height) baseParams.set('h', height.toString());
  baseParams.set('q', quality.toString());
  baseParams.set('auto', 'format');
  baseParams.set('fit', 'crop');

  if (src.includes('unsplash.com')) {
    return {
      avif: `${src}?${baseParams.toString()}&fm=avif`,
      webp: `${src}?${baseParams.toString()}&fm=webp`,
      jpeg: `${src}?${baseParams.toString()}&fm=jpg`
    };
  }

  if (src.includes('lovable-uploads')) {
    return {
      avif: `${src}?${baseParams.toString()}&format=avif`,
      webp: `${src}?${baseParams.toString()}&format=webp`,
      jpeg: `${src}?${baseParams.toString()}`
    };
  }

  return { jpeg: src };
};

// Image cache for memory optimization
const imageCache = new Map<string, HTMLImageElement>();

const UltraFastImage: React.FC<UltraFastImageProps> = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  critical = false,
  quality,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority || critical);
  const [hasError, setHasError] = useState(false);
  const [showLowQuality, setShowLowQuality] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine quality based on priority
  const imageQuality = quality || (critical ? 70 : 60);
  const lowQualityParams = critical ? 20 : 15;

  // Generate image sources
  const imageSources = generateImageSources(src, imageQuality, width, height);
  const lowQualitySrc = generateImageSources(src, lowQualityParams, Math.floor((width || 400) / 4), Math.floor((height || 300) / 4)).jpeg;

  // Intersection Observer with 300px rootMargin for smart preloading
  useEffect(() => {
    if (priority || critical) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '300px' // Smart preloading margin
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, critical]);

  // Progressive loading handler
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setShowLowQuality(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Low quality placeholder load handler
  const handleLowQualityLoad = useCallback(() => {
    if (!isLoaded) {
      setShowLowQuality(true);
    }
  }, [isLoaded]);

  // Preload high quality image when in view
  useEffect(() => {
    if (!isInView || hasError) return;

    const cacheKey = `${src}-${imageQuality}-${width}-${height}`;
    
    // Check memory cache first
    if (imageCache.has(cacheKey)) {
      setIsLoaded(true);
      setShowLowQuality(false);
      return;
    }

    // Preload high quality image
    const img = new Image();
    img.onload = () => {
      imageCache.set(cacheKey, img);
      handleLoad();
    };
    img.onerror = handleError;
    
    // Try AVIF first, then WebP, then JPEG
    if (imageSources.avif) {
      const avifImg = new Image();
      avifImg.onload = () => {
        imageCache.set(cacheKey, avifImg);
        handleLoad();
      };
      avifImg.onerror = () => {
        if (imageSources.webp) {
          const webpImg = new Image();
          webpImg.onload = () => {
            imageCache.set(cacheKey, webpImg);
            handleLoad();
          };
          webpImg.onerror = () => {
            img.src = imageSources.jpeg;
          };
          webpImg.src = imageSources.webp;
        } else {
          img.src = imageSources.jpeg;
        }
      };
      avifImg.src = imageSources.avif;
    } else if (imageSources.webp) {
      const webpImg = new Image();
      webpImg.onload = () => {
        imageCache.set(cacheKey, webpImg);
        handleLoad();
      };
      webpImg.onerror = () => {
        img.src = imageSources.jpeg;
      };
      webpImg.src = imageSources.webp;
    } else {
      img.src = imageSources.jpeg;
    }
  }, [isInView, hasError, src, imageQuality, width, height, handleLoad, handleError, imageSources]);

  if (hasError) {
    return (
      <div 
        className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm font-medium">Image non disponible</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Low quality placeholder for progressive loading */}
      {isInView && showLowQuality && !isLoaded && (
        <img
          src={lowQualitySrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover filter blur-sm opacity-60 transition-opacity duration-300"
          onLoad={handleLowQualityLoad}
          style={{ width, height }}
        />
      )}

      {/* Loading skeleton */}
      {!isInView && (
        <Skeleton 
          className="absolute inset-0 w-full h-full rounded"
          style={{ width: width || '100%', height: height || '100%' }}
        />
      )}

      {/* High quality image */}
      {isInView && (
        <picture>
          {imageSources.avif && (
            <source srcSet={imageSources.avif} type="image/avif" />
          )}
          {imageSources.webp && (
            <source srcSet={imageSources.webp} type="image/webp" />
          )}
          <img
            ref={imgRef}
            src={imageSources.jpeg}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            loading={priority || critical ? 'eager' : 'lazy'}
            decoding={critical ? 'sync' : 'async'}
            fetchPriority={priority || critical ? 'high' : 'auto'}
            onLoad={handleLoad}
            onError={handleError}
            className={`transition-all duration-500 ease-out ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } ${className}`}
            style={{
              width: width ? `${width}px` : 'auto',
              height: height ? `${height}px` : 'auto'
            }}
          />
        </picture>
      )}
    </div>
  );
});

UltraFastImage.displayName = 'UltraFastImage';

export default UltraFastImage;
