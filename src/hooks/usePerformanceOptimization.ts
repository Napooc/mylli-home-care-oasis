
import { useEffect, useCallback, useRef } from 'react';
import { performanceOptimizer, debounce, throttle } from '@/utils/performanceOptimizer';
import { memoryManager, createCleanupManager } from '@/utils/memoryManager';

// Hook for performance optimization
export const usePerformanceOptimization = () => {
  const cleanupManager = useRef(createCleanupManager());

  useEffect(() => {
    // Initialize performance monitoring
    performanceOptimizer.initialize();
    
    // Cleanup on unmount
    return () => {
      cleanupManager.current.cleanup();
      performanceOptimizer.cleanup();
    };
  }, []);

  const addCleanup = useCallback((cleanup: () => void) => {
    cleanupManager.current.add(cleanup);
  }, []);

  return { addCleanup };
};

// Hook for debounced callbacks
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) => {
  return useCallback(debounce(callback, delay), [callback, delay]);
};

// Hook for throttled callbacks
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  limit: number
) => {
  return useCallback(throttle(callback, limit), [callback, limit]);
};

// Hook for smart caching
export const useSmartCache = () => {
  const setCache = useCallback((key: string, data: any, ttl?: number) => {
    memoryManager.set(key, data, ttl);
  }, []);

  const getCache = useCallback((key: string) => {
    return memoryManager.get(key);
  }, []);

  const clearCache = useCallback(() => {
    memoryManager.clear();
  }, []);

  return { setCache, getCache, clearCache };
};

// Hook for intersection observer (lazy loading)
export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [callback, options]);

  const observe = useCallback((element: Element) => {
    observerRef.current?.observe(element);
  }, []);

  const unobserve = useCallback((element: Element) => {
    observerRef.current?.unobserve(element);
  }, []);

  return { observe, unobserve };
};
