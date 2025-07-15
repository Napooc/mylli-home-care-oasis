import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { mobilePerformanceOptimizer } from '@/utils/mobilePerformanceOptimizer';

interface LightSpeedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

// Ultra-aggressive mobile-first image loader
const LightSpeedImage: React.FC<LightSpeedImageProps> = memo(({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Instant 1px base64 placeholder for immediate visual feedback
  const placeholder = `data:image/svg+xml;base64,${btoa(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e5e5e5"/>
      <rect x="20%" y="40%" width="60%" height="20%" fill="#d4d4d4" rx="4"/>
    </svg>`
  )}`;

  // Ultra-aggressive intersection observer
  useEffect(() => {
    if (priority || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.01, // Load as soon as 1% is visible
        rootMargin: mobilePerformanceOptimizer.shouldDeferNonCritical() ? '50px' : '200px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, shouldLoad]);

  // Ultra-fast URL optimization for mobile
  const getOptimizedSrc = useCallback(() => {
    const quality = mobilePerformanceOptimizer.getOptimalImageQuality();
    const targetWidth = Math.min(width, window.innerWidth);
    const targetHeight = Math.min(height, window.innerHeight);

    if (src.includes('lovable-uploads')) {
      return `${src}?q=${quality}&w=${targetWidth}&h=${targetHeight}&fm=webp&fit=crop`;
    }
    
    if (src.includes('unsplash.com')) {
      return `${src}&q=${quality}&w=${targetWidth}&h=${targetHeight}&fm=webp&fit=crop&auto=format`;
    }
    
    return src;
  }, [src, width, height]);

  // Immediate load handler
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Pre-create and cache the image for instant switching
  useEffect(() => {
    if (!shouldLoad) return;

    const img = new Image();
    const optimizedSrc = getOptimizedSrc();
    
    img.onload = () => {
      if (imgRef.current) {
        imgRef.current.src = optimizedSrc;
        handleLoad();
      }
    };
    
    img.onerror = () => {
      console.warn('Image failed to load:', optimizedSrc);
    };
    
    img.src = optimizedSrc;
  }, [shouldLoad, getOptimizedSrc, handleLoad]);

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden bg-muted ${className}`}
      style={{ width, height }}
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
      
      {/* Real image - initially hidden, fades in when loaded */}
      <img
        ref={imgRef}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ width: '100%', height: '100%' }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </div>
  );
});

LightSpeedImage.displayName = 'LightSpeedImage';

export default LightSpeedImage;