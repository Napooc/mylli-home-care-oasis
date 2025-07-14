// Ultra-optimized speed optimizer with task scheduling
import { taskScheduler } from './taskScheduler';

export class OptimizedSpeedOptimizer {
  private static observers: PerformanceObserver[] = [];
  private static isInitialized = false;

  static initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // Schedule all initialization tasks to avoid blocking
    taskScheduler.scheduleChunked([
      () => this.optimizeAnimations(),
      () => this.addResourceHints(),
      () => this.optimizeImages(),
      () => this.setupPrefetch()
    ]);
  }

  static optimizeAnimations() {
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    const tasks = Array.from(animatedElements).map(el => () => {
      (el as HTMLElement).style.willChange = 'transform';
      (el as HTMLElement).style.transform = 'translateZ(0)';
      (el as HTMLElement).style.backfaceVisibility = 'hidden';
    });
    
    taskScheduler.scheduleChunked(tasks, 5);
  }

  static addResourceHints() {
    const criticalDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    const tasks = criticalDomains.map(domain => () => {
      if (!document.querySelector(`link[href="${domain}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });

    taskScheduler.scheduleChunked(tasks);
  }

  static optimizeImages() {
    taskScheduler.schedule(() => {
      // Add loading="lazy" to all images not marked as priority
      const images = document.querySelectorAll('img:not([data-priority])');
      Array.from(images).forEach(img => {
        if (!(img as HTMLImageElement).loading) {
          (img as HTMLImageElement).loading = 'lazy';
        }
      });
    });
  }

  static setupPrefetch() {
    taskScheduler.schedule(() => {
      // Prefetch critical routes
      const criticalRoutes = ['/services', '/contact'];
      criticalRoutes.forEach(route => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        document.head.appendChild(link);
      });
    });
  }

  static cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.isInitialized = false;
  }
}