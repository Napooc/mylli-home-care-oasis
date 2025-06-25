
// Lightweight performance monitoring for iOS compatibility
class LightweightPerformanceMonitor {
  private metrics: { name: string; value: number }[] = [];

  init() {
    // Only monitor critical metrics to avoid iOS performance issues
    this.measureCoreWebVitals();
  }

  private measureCoreWebVitals() {
    // Use requestIdleCallback to avoid blocking main thread on iOS
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.measureLCP();
        this.measureFCP();
      }, { timeout: 5000 });
    } else {
      // Fallback for iOS Safari
      setTimeout(() => {
        this.measureLCP();
        this.measureFCP();
      }, 2000);
    }
  }

  private measureLCP() {
    if (!('PerformanceObserver' in window)) return;
    
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          const lastEntry = entries[entries.length - 1];
          this.recordMetric('LCP', lastEntry.startTime);
          observer.disconnect();
        }
      });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (error) {
      console.log('LCP measurement not supported');
    }
  }

  private measureFCP() {
    if (!('PerformanceObserver' in window)) return;
    
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcp) {
          this.recordMetric('FCP', fcp.startTime);
          observer.disconnect();
        }
      });
      observer.observe({ type: 'paint', buffered: true });
    } catch (error) {
      console.log('FCP measurement not supported');
    }
  }

  private recordMetric(name: string, value: number) {
    this.metrics.push({ name, value });
    const rating = this.getRating(name, value);
    console.log(`📊 ${name}: ${Math.round(value)}ms (${rating})`);
  }

  private getRating(name: string, value: number): string {
    const thresholds = {
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 }
    };
    
    const threshold = thresholds[name as keyof typeof thresholds];
    if (!threshold) return 'measured';
    
    return value <= threshold.good ? 'good' : 
           value <= threshold.poor ? 'needs-improvement' : 'poor';
  }

  generateReport() {
    return {
      performance: this.metrics.length > 0 ? 85 : 0, // Simplified scoring
      metrics: this.metrics
    };
  }
}

export const lightweightPerformanceMonitor = new LightweightPerformanceMonitor();
