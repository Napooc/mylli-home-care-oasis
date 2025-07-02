
// Advanced speed optimization utilities
export class SpeedOptimizer {
  private static observers: PerformanceObserver[] = [];

  static initialize() {
    this.optimizeAnimations();
    this.monitorPerformance();
    this.addResourceHints();
  }

  static optimizeAnimations() {
    // Add GPU acceleration classes to animated elements
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    animatedElements.forEach(el => {
      (el as HTMLElement).style.willChange = 'transform';
      (el as HTMLElement).style.transform = 'translateZ(0)';
    });
  }

  static monitorPerformance() {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.duration > 50) {
              console.warn(`Slow task detected: ${entry.duration.toFixed(2)}ms`);
            }
          });
        });

        observer.observe({ entryTypes: ['longtask'] });
        this.observers.push(observer);
      } catch (error) {
        console.warn('Performance monitoring not supported');
      }
    }
  }

  static addResourceHints() {
    // Strategic preconnect for critical resources
    const criticalDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    criticalDomains.forEach(domain => {
      if (!document.querySelector(`link[href="${domain}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });
  }

  static cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}
