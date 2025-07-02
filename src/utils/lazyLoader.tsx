
import { lazy, ComponentType, Suspense } from 'react';

// Ultra-fast lazy loading utility
export const createLazyComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: ComponentType
) => {
  const LazyComponent = lazy(importFn);
  
  return (props: any) => {
    if (fallback) {
      const FallbackComponent = fallback;
      return (
        <Suspense fallback={<FallbackComponent />}>
          <LazyComponent {...props} />
        </Suspense>
      );
    }
    
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

// Preload component for faster subsequent loads
export const preloadComponent = (importFn: () => Promise<any>) => {
  const promise = importFn();
  return promise;
};

// Smart preloading based on user interaction
export const preloadOnHover = (importFn: () => Promise<any>) => {
  let preloaded = false;
  
  return {
    onMouseEnter: () => {
      if (!preloaded) {
        preloadComponent(importFn);
        preloaded = true;
      }
    }
  };
};
