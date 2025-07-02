
// Ultra-lightweight runtime performance optimizer
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer | null = null;
  private observers: Map<string, PerformanceObserver> = new Map();
  private metrics: Map<string, number> = new Map();
  private isEnabled: boolean = false;

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Initialize performance monitoring (development only)
  initialize(): void {
    if (process.env.NODE_ENV !== 'development') return;
    
    this.isEnabled = true;
    this.monitorLongTasks();
    this.monitorMemoryUsage();
    this.optimizeScrolling();
  }

  // Monitor long tasks that block the main thread
  private monitorLongTasks(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.duration > 50) { // Tasks longer than 50ms
            console.warn(`⚠️ Long Task detected: ${entry.duration.toFixed(2)}ms`);
            this.metrics.set('longTasks', (this.metrics.get('longTasks') || 0) + 1);
          }
        });
      });

      observer.observe({ entryTypes: ['longtask'] });
      this.observers.set('longtask', observer);
    } catch (error) {
      console.warn('Long task monitoring not supported');
    }
  }

  // Monitor memory usage (Chrome only)
  private monitorMemoryUsage(): void {
    if (!(performance as any).memory) return;

    const checkMemory = () => {
      const memory = (performance as any).memory;
      const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
      const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
      
      if (usedMB > 50) { // Alert if using more than 50MB
        console.warn(`⚠️ High memory usage: ${usedMB}MB / ${totalMB}MB`);
      }
      
      this.metrics.set('memoryUsage', usedMB);
    };

    // Check memory every 30 seconds
    setInterval(checkMemory, 30000);
    checkMemory(); // Initial check
  }

  // Optimize scrolling performance
  private optimizeScrolling(): void {
    let ticking = false;

    const optimizedScroll = () => {
      // Batch scroll operations
      if (!ticking) {
        requestAnimationFrame(() => {
          // Scroll optimizations can be added here
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listeners for better performance
    document.addEventListener('scroll', optimizedScroll, { passive: true });
    document.addEventListener('touchstart', optimizedScroll, { passive: true });
  }

  // Get performance metrics
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  // Cleanup
  cleanup(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
    this.metrics.clear();
  }
}

// Export singleton
export const performanceOptimizer = PerformanceOptimizer.getInstance();

// Utility functions for component-level optimizations
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};
