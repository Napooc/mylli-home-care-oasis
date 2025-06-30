
// Bundle size monitoring and optimization utilities

interface BundleStats {
  route: string;
  chunkSize: number;
  loadTime: number;
  timestamp: number;
}

class BundleAnalyzer {
  private stats: BundleStats[] = [];
  private observer: PerformanceObserver | null = null;

  initialize() {
    if (typeof window === 'undefined') return;

    // Monitor navigation timing
    this.setupPerformanceObserver();
    
    // Track initial bundle metrics
    this.trackInitialLoad();
  }

  private setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            this.recordMetric({
              route: window.location.pathname,
              chunkSize: 0, // Will be filled by resource timing
              loadTime: navEntry.loadEventEnd - navEntry.fetchStart,
              timestamp: Date.now()
            });
          }
        });
      });

      this.observer.observe({ entryTypes: ['navigation', 'resource'] });
    }
  }

  private trackInitialLoad() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          console.log(`📊 Bundle Analysis - Route: ${window.location.pathname}`);
          console.log(`⏱️ Load Time: ${navigation.loadEventEnd - navigation.fetchStart}ms`);
          console.log(`🎯 First Contentful Paint: ${navigation.responseEnd - navigation.fetchStart}ms`);
        }
      }, 1000);
    }
  }

  recordMetric(stat: BundleStats) {
    this.stats.push(stat);
    
    // Keep only last 50 entries to prevent memory bloat
    if (this.stats.length > 50) {
      this.stats = this.stats.slice(-50);
    }

    // Log performance warnings
    if (stat.loadTime > 3000) {
      console.warn(`⚠️ Slow route load detected: ${stat.route} (${stat.loadTime}ms)`);
    }
  }

  getStats(): BundleStats[] {
    return [...this.stats];
  }

  getAverageLoadTime(): number {
    if (this.stats.length === 0) return 0;
    return this.stats.reduce((sum, stat) => sum + stat.loadTime, 0) / this.stats.length;
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

export const bundleAnalyzer = new BundleAnalyzer();

// Auto-initialize in browser environment
if (typeof window !== 'undefined') {
  bundleAnalyzer.initialize();
}
