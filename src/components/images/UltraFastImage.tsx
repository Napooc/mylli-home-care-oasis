
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
  placeholder?: 'blur' | 'skeleton' | 'none';
  fallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
}

// Image cache for memory optimization
const imageCache = new Map<string, HTMLImageElement>();
const loadingPromises = new Map<string, Promise<void>>();

// Modern format support detection
let avifSupport: boolean | null = null;
let webpSupport: boolean | null = null;

const detectFormatSupport = async () => {
  if (avifSupport === null || webpSupport === null) {
    const [avifTest, webpTest] = await Promise.all([
      new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => resolve(img.height === 1);
        img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
      }),
      new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => resolve(img.height === 2);
        img.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
      })
    ]);
    
    avifSupport = avifTest;
    webpSupport = webpTest;
  }
  
  return { avifSupport, webpSupport };
};

// Aggressive image optimization with format selection
const optimizeImageUrl = (src: string, width: number, quality: number, critical: boolean) => {
  if (src.includes('unsplash.com')) {
    const params = new URLSearchParams();
    params.set('auto', 'format');
    params.set('fit', 'crop');
    params.set('q', critical ? '70' : '60'); // Aggressive compression
    params.set('w', width.toString());
    params.set('dpr', Math.min(window.devicePixelRatio || 1, 2).toString());
    
    return `${src}?${params.toString()}`;
  }
  
  if (src.includes('lovable-uploads')) {
    const params = new URLSearchParams();
    params.set('w', width.toString());
    params.set('q', critical ? '70' : '60');
    params.set('f', 'auto'); // Auto format selection
    
    return `${src}?${params.toString()}`;
  }
  
  return src;
};

// Generate srcSet with multiple formats
const generateModernSrcSet = async (src: string, width: number, quality: number, critical: boolean) => {
  const { avifSupport, webpSupport } = await detectFormatSupport();
  const srcSets: { format: string; srcSet: string; type: string }[] = [];
  
  // AVIF (best compression)
  if (avifSupport && src.includes('unsplash.com')) {
    const avifSrc = `${src}?auto=format&fit=crop&q=${critical ? '70' : '60'}&w=${width}&fm=avif`;
    srcSets.push({ format: 'avif', srcSet: avifSrc, type: 'image/avif' });
  }
  
  // WebP (good compression)
  if (webpSupport) {
    const webpSrc = optimizeImageUrl(src, width, quality, critical).replace('f=auto', 'f=webp');
    srcSets.push({ format: 'webp', srcSet: webpSrc, type: 'image/webp' });
  }
  
  // JPEG/PNG fallback
  const fallbackSrc = optimizeImageUrl(src, width, quality, critical);
  srcSets.push({ format: 'fallback', srcSet: fallbackSrc, type: 'image/jpeg' });
  
  return srcSets;
};

// Smart preloading with memory cache
const preloadImage = (src: string): Promise<void> => {
  if (imageCache.has(src)) {
    return Promise.resolve();
  }
  
  if (loadingPromises.has(src)) {
    return loadingPromises.get(src)!;
  }
  
  const promise = new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      imageCache.set(src, img);
      resolve();
    };
    img.onerror = reject;
    img.src = src;
  });
  
  loadingPromises.set(src, promise);
  return promise;
};

const UltraFastImage: React.FC<UltraFastImageProps> = memo(({
  src,
  alt,
  width = 800,
  height,
  className = '',
  priority = false,
  critical = false,
  quality = 75,
  sizes = '(max-width: 768px) 100vw, 50vw',
  placeholder = 'skeleton',
  fallback,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority || critical);
  const [hasError, setHasError] = useState(false);
  const [modernSrcSets, setModernSrcSets] = useState<{ format: string; srcSet: string; type: string }[]>([]);
  const [lowQualityLoaded, setLowQualityLoaded] = useState(false);
  
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Progressive loading: load low quality first
  const lowQualitySrc = optimizeImageUrl(src, Math.floor(width * 0.1), 20, false);
  
  // Smart intersection observer with large root margin for preloading
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
        rootMargin: '300px' // Large margin for aggressive preloading
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, critical]);

  // Generate modern format srcSets
  useEffect(() => {
    if (isInView) {
      generateModernSrcSet(src, width, quality, critical || priority)
        .then(setModernSrcSets)
        .catch(console.warn);
    }
  }, [isInView, src, width, quality, critical, priority]);

  // Preload critical images
  useEffect(() => {
    if ((priority || critical) && modernSrcSets.length > 0) {
      const primarySrc = modernSrcSets[0]?.srcSet || src;
      preloadImage(primarySrc).catch(console.warn);
    }
  }, [priority, critical, modernSrcSets, src]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  const handleLowQualityLoad = useCallback(() => {
    setLowQualityLoaded(true);
  }, []);

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

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Progressive loading: Low quality placeholder */}
      {!lowQualityLoaded && placeholder === 'skeleton' && (
        <Skeleton 
          className="absolute inset-0 animate-pulse rounded"
          style={{ width: width || '100%', height: height || '100%' }}
        />
      )}
      
      {/* Low quality image loads first */}
      {isInView && !isLoaded && (
        <img
          src={lowQualitySrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm opacity-60"
          onLoad={handleLowQualityLoad}
          style={{ width, height }}
        />
      )}
      
      {/* High quality image with modern formats */}
      {isInView && modernSrcSets.length > 0 && (
        <picture>
          {modernSrcSets.map((srcSet, index) => (
            srcSet.type !== 'image/jpeg' ? (
              <source 
                key={index}
                srcSet={srcSet.srcSet} 
                type={srcSet.type}
                sizes={sizes}
              />
            ) : null
          ))}
          <img
            ref={imgRef}
            src={modernSrcSets[modernSrcSets.length - 1]?.srcSet || src}
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
        </picture>
      )}
    </div>
  );
});

UltraFastImage.displayName = 'UltraFastImage';

export default UltraFastImage;
