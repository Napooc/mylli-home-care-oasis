
// Advanced performance monitoring with Core Web Vitals

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

class AdvancedPerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private resourceSizes = new Map<string, number>();

  init() {
    this.measureCoreWebVitals();
    this.measureResourceSizes();
    this.measureJSExecutionTime();
    this.measureDOMComplexity();
    this.setupPerformanceObserver();
  }

  private measureCoreWebVitals() {
    // FCP
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcp) {
        this.recordMetric('FCP', fcp.startTime);
      }
    }).observe({ type: 'paint', buffered: true });

    // LCP
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.recordMetric('LCP', lastEntry.startTime);
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    // CLS
    let clsScore = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as any;
        if (!layoutShift.hadRecentInput) {
          clsScore += layoutShift.value;
        }
      }
      this.recordMetric('CLS', clsScore);
    }).observe({ type: 'layout-shift', buffered: true });
  }

  private measureResourceSizes() {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      let totalSize = 0;
      let imageSize = 0;
      let jsSize = 0;
      let cssSize = 0;

      entries.forEach(entry => {
        const resource = entry as any;
        if (resource.transferSize) {
          totalSize += resource.transferSize;
          
          if (entry.name.includes('.js')) jsSize += resource.transferSize;
          else if (entry.name.includes('.css')) cssSize += resource.transferSize;
          else if (entry.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) imageSize += resource.transferSize;
        }
      });

      this.recordMetric('Total-Size', totalSize / 1024); // KB
      this.recordMetric('Image-Size', imageSize / 1024); // KB
      this.recordMetric('JS-Size', jsSize / 1024); // KB
      this.recordMetric('CSS-Size', cssSize / 1024); // KB

      console.log(`📊 Resource Sizes: Total ${Math.round(totalSize/1024)}KB, Images ${Math.round(imageSize/1024)}KB, JS ${Math.round(jsSize/1024)}KB, CSS ${Math.round(cssSize/1024)}KB`);
    }).observe({ type: 'resource', buffered: true });
  }

  private measureJSExecutionTime() {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.duration > 50) {
          console.warn(`🐌 Long task detected: ${Math.round(entry.duration)}ms`);
          this.recordMetric('Long-Task', entry.duration);
        }
      });
    }).observe({ type: 'longtask', buffered: true });
  }

  private measureDOMComplexity() {
    requestIdleCallback(() => {
      const domSize = document.querySelectorAll('*').length;
      const depth = this.calculateDOMDepth();
      
      this.recordMetric('DOM-Size', domSize);
      this.recordMetric('DOM-Depth', depth);
      
      console.log(`🏗️ DOM Complexity: ${domSize} elements, ${depth} levels deep`);
      
      if (domSize > 500) {
        console.warn('⚠️ DOM is too complex, consider reducing elements');
      }
    });
  }

  private calculateDOMDepth(element: HTMLElement = document.body, depth = 0): number {
    let maxDepth = depth;
    for (const child of element.children) {
      const childDepth = this.calculateDOMDepth(child as HTMLElement, depth + 1);
      maxDepth = Math.max(maxDepth, childDepth);
    }
    return maxDepth;
  }

  private setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (entry.entryType === 'measure') {
            this.recordMetric(entry.name, entry.duration);
          }
        });
      });
      observer.observe({ entryTypes: ['measure', 'navigation'] });
    }
  }

  private recordMetric(name: string, value: number) {
    let rating: 'good' | 'needs-improvement' | 'poor' = 'good';
    
    const thresholds = {
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      CLS: { good: 0.1, poor: 0.25 },
      'DOM-Size': { good: 500, poor: 1000 },
      'Total-Size': { good: 1024, poor: 3072 }, // KB
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (threshold) {
      rating = value <= threshold.good ? 'good' : 
               value <= threshold.poor ? 'needs-improvement' : 'poor';
    }

    const metric: PerformanceMetric = { name, value, rating };
    this.metrics.push(metric);
    
    const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';
    console.log(`${emoji} ${name}: ${Math.round(value)}${name.includes('Size') ? 'KB' : name === 'CLS' ? '' : 'ms'} (${rating})`);
  }

  getMetrics() {
    return this.metrics;
  }

  generateReport() {
    const report = {
      performance: this.metrics.filter(m => m.rating === 'good').length / this.metrics.length * 100,
      criticalIssues: this.metrics.filter(m => m.rating === 'poor'),
      improvements: this.metrics.filter(m => m.rating === 'needs-improvement')
    };
    
    console.log('🎯 Performance Report:', report);
    return report;
  }
}

export const advancedPerformanceMonitor = new AdvancedPerformanceMonitor();
