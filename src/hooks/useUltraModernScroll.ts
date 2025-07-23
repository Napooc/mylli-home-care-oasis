import { useEffect, useRef, useState, useCallback } from 'react';

interface UltraModernScrollOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  progressive?: boolean;
}

export const useUltraModernScroll = (options: UltraModernScrollOptions = {}) => {
  const { 
    threshold = 0.1, 
    rootMargin = '0px 0px -10% 0px', 
    triggerOnce = true, 
    delay = 0,
    progressive = true
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    if (progressive) {
      // Calculate progress based on intersection ratio
      const currentProgress = Math.min(entry.intersectionRatio / threshold, 1);
      setProgress(currentProgress);
    }

    if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
      if (delay > 0) {
        timeoutRef.current = setTimeout(() => {
          setIsVisible(true);
          setHasTriggered(true);
        }, delay);
      } else {
        setIsVisible(true);
        setHasTriggered(true);
      }
    } else if (!triggerOnce && !entry.isIntersecting) {
      setIsVisible(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [threshold, triggerOnce, hasTriggered, delay]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: Array.from({ length: 20 }, (_, i) => i / 20), // Multiple thresholds for smooth progress
      rootMargin,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleIntersection, rootMargin]);

  return { ref, isVisible, progress };
};

export const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      
      if (lastTimestamp.current > 0) {
        const timeDelta = currentTime - lastTimestamp.current;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
        const currentVelocity = scrollDelta / timeDelta;
        
        setVelocity(currentVelocity);
      }
      
      lastScrollY.current = currentScrollY;
      lastTimestamp.current = currentTime;
    };

    const throttledScroll = throttle(handleScroll, 16); // ~60fps
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return velocity;
};

export const useParallaxEffect = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * speed;
        setOffset(rate);
      }
    };

    const throttledScroll = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [speed]);

  return { ref, offset };
};

// Utility function for throttling
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}