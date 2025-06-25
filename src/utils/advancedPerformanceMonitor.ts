
// Advanced performance monitoring with iOS Safari compatibility

interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  performance: number;
}

class AdvancedPerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];
  private isIOSSafari: boolean;

  constructor() {
    this.isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent);
  }

  init() {
    try {
      console.log('🔍 Initializing advanced performance monitor...');
      
      if (!('PerformanceObserver' in window)) {
        console.warn('⚠️ PerformanceObserver not supported');
        return;
      }

      this.observeWebVitals();
      this.observeLongTasks();
      this.measureTTFB();
      
      // iOS-specific optimizations
      if (this.isIOSSafari) {
        this.optimizeForIOSSafari();
      }

      console.log('✅ Performance monitor initialized');
    } catch (error) {
      console.warn('⚠️ Performance monitor initialization failed:', error);
    }
  }

  private observeWebVitals() {
    try {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
            console.log(`🎨 FCP: ${entry.startTime.toFixed(2)}ms`);
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(fcpObserver);

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          this.metrics.lcp = lastEntry.startTime;
          console.log(`🖼️ LCP: ${lastEntry.startTime.toFixed(2)}ms`);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.cls = clsValue;
        if (clsValue > 0.1) {
          console.warn(`⚠️ High CLS detected: ${clsValue.toFixed(4)}`);
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);

    } catch (error) {
      console.warn('⚠️ Web vitals observation failed:', error);
    }
  }

  private observeLongTasks() {
    try {
      if (!this.isIOSSafari) { // iOS Safari has issues with long task observer
        const longTaskObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (entry.duration > 50) {
              console.warn(`🐌 Long task detected: ${entry.duration.toFixed(0)}ms`);
            }
          });
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });
        this.observers.push(longTaskObserver);
      }
    } catch (error) {
      console.warn('⚠️ Long task observation failed:', error);
    }
  }

  private measureTTFB() {
    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
        console.log(`⚡ TTFB: ${this.metrics.ttfb.toFixed(2)}ms`);
      }
    } catch (error) {
      console.warn('⚠️ TTFB measurement failed:', error);
    }
  }

  private optimizeForIOSSafari() {
    try {
      // Reduce observer frequency for iOS
      setTimeout(() => {
        // Check DOM complexity for iOS
        const elementCount = document.querySelectorAll('*').length;
        if (elementCount > 1000) {
          console.warn('⚠️ DOM is too complex for iOS, consider reducing elements');
        }
      }, 2000);

      // Memory monitoring for iOS
      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        console.log(`📱 iOS Memory - Used: ${(memInfo.usedJSHeapSize / 1048576).toFixed(2)}MB`);
      }
    } catch (error) {
      console.warn('⚠️ iOS optimization failed:', error);
    }
  }

  generateReport(): PerformanceMetrics {
    const defaultMetrics = {
      fcp: this.metrics.fcp || 0,
      lcp: this.metrics.lcp || 0,
      fid: this.metrics.fid || 0,
      cls: this.metrics.cls || 0,
      ttfb: this.metrics.ttfb || 0,
      performance: 100
    };

    // Calculate performance score
    let score = 100;
    if (defaultMetrics.fcp > 2000) score -= 20;
    if (defaultMetrics.lcp > 4000) score -= 20;
    if (defaultMetrics.cls > 0.1) score -= 20;
    if (defaultMetrics.ttfb > 800) score -= 10;

    defaultMetrics.performance = Math.max(score, 0);

    return defaultMetrics;
  }

  cleanup() {
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        console.warn('⚠️ Observer cleanup failed:', error);
      }
    });
    this.observers = [];
  }
}

export const advancedPerformanceMonitor = new AdvancedPerformanceMonitor();
