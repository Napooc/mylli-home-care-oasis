// Performance monitoring for bundle optimization tracking

interface PerformanceMetrics {
  route: string;
  loadTime: number;
  bundleSize: number;
  cacheHitRate: number;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private startTime: number = 0;

  startRouteLoad(route: string) {
    this.startTime = performance.now();
    console.log(`🚀 Loading route: ${route}`);
  }

  endRouteLoad(route: string) {
    const loadTime = performance.now() - this.startTime;
    
    // Get bundle information
    const bundleSize = this.estimateBundleSize();
    const cacheHitRate = this.calculateCacheHitRate();
    
    const metric: PerformanceMetrics = {
      route,
      loadTime,
      bundleSize,
      cacheHitRate,
      timestamp: Date.now()
    };
    
    this.metrics.push(metric);
    this.logPerformance(metric);
    
    // Keep only last 20 entries
    if (this.metrics.length > 20) {
      this.metrics = this.metrics.slice(-20);
    }
  }

  private estimateBundleSize(): number {
    // Estimate based on performance entries
    if ('performance' in window && performance.getEntriesByType) {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      return resources
        .filter(r => r.name.includes('.js') || r.name.includes('.css'))
        .reduce((total, r) => total + (r.transferSize || 0), 0);
    }
    return 0;
  }

  private calculateCacheHitRate(): number {
    // Simple cache hit estimation based on transfer vs encoded sizes
    if ('performance' in window && performance.getEntriesByType) {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const cached = resources.filter(r => r.transferSize === 0 || r.transferSize < r.encodedBodySize);
      return resources.length > 0 ? (cached.length / resources.length) * 100 : 0;
    }
    return 0;
  }

  private logPerformance(metric: PerformanceMetrics) {
    console.log(`📊 Route Performance - ${metric.route}`);
    console.log(`⏱️ Load Time: ${metric.loadTime.toFixed(2)}ms`);
    console.log(`📦 Bundle Size: ${(metric.bundleSize / 1024).toFixed(2)}KB`);
    console.log(`🎯 Cache Hit Rate: ${metric.cacheHitRate.toFixed(1)}%`);
    
    // Performance warnings
    if (metric.loadTime > 1500) {
      console.warn(`⚠️ Slow route load: ${metric.route} (${metric.loadTime.toFixed(2)}ms)`);
    }
    
    if (metric.bundleSize > 500 * 1024) { // 500KB
      console.warn(`⚠️ Large bundle size: ${(metric.bundleSize / 1024).toFixed(2)}KB`);
    }
  }

  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  getAverageLoadTime(): number {
    if (this.metrics.length === 0) return 0;
    return this.metrics.reduce((sum, m) => sum + m.loadTime, 0) / this.metrics.length;
  }

  getBestPerformingRoute(): string | null {
    if (this.metrics.length === 0) return null;
    const fastest = this.metrics.reduce((best, current) => 
      current.loadTime < best.loadTime ? current : best
    );
    return fastest.route;
  }

  getWorstPerformingRoute(): string | null {
    if (this.metrics.length === 0) return null;
    const slowest = this.metrics.reduce((worst, current) => 
      current.loadTime > worst.loadTime ? current : worst
    );
    return slowest.route;
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Setup route change monitoring
if (typeof window !== 'undefined') {
  let currentRoute = window.location.pathname;
  
  // Monitor route changes
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function(...args) {
    performanceMonitor.startRouteLoad(args[2] as string || '/');
    originalPushState.apply(history, args);
  };
  
  history.replaceState = function(...args) {
    performanceMonitor.startRouteLoad(args[2] as string || '/');
    originalReplaceState.apply(history, args);
  };
  
  window.addEventListener('popstate', () => {
    performanceMonitor.startRouteLoad(window.location.pathname);
  });
}
