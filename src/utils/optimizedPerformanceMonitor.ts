// Ultra-optimized performance monitor with task scheduling
import { taskScheduler } from './taskScheduler';

export class OptimizedPerformanceMonitor {
  private static instance: OptimizedPerformanceMonitor | null = null;
  private observers: Map<string, PerformanceObserver> = new Map();
  private metrics: Map<string, number> = new Map();
  private isEnabled: boolean = false;
  private lastLogTime = 0;
  private readonly LOG_THROTTLE = 5000; // Only log every 5 seconds

  static getInstance(): OptimizedPerformanceMonitor {
    if (!OptimizedPerformanceMonitor.instance) {
      OptimizedPerformanceMonitor.instance = new OptimizedPerformanceMonitor();
    }
    return OptimizedPerformanceMonitor.instance;
  }

  initialize(): void {
    if (process.env.NODE_ENV !== 'development') return;
    
    this.isEnabled = true;
    
    // Schedule initialization tasks to avoid blocking
    taskScheduler.schedule(() => this.monitorLongTasks());
    taskScheduler.schedule(() => this.monitorMemoryUsage());
    taskScheduler.schedule(() => this.optimizeScrolling());
  }

  private monitorLongTasks(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        // Throttle logging to avoid spam
        const now = Date.now();
        if (now - this.lastLogTime < this.LOG_THROTTLE) return;
        
        const entries = list.getEntries();
        const longTasks = entries.filter((entry: any) => entry.duration > 50);
        
        if (longTasks.length > 0) {
          this.lastLogTime = now;
          console.warn(`⚡ ${longTasks.length} long tasks detected (${longTasks[0].duration.toFixed(0)}ms+)`);
          this.metrics.set('longTasks', (this.metrics.get('longTasks') || 0) + longTasks.length);
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
      this.observers.set('longtask', observer);
    } catch (error) {
      // Silently fail in production
    }
  }

  private monitorMemoryUsage(): void {
    if (!(performance as any).memory) return;

    const checkMemory = () => {
      taskScheduler.schedule(() => {
        const memory = (performance as any).memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
        
        if (usedMB > 50) {
          console.warn(`⚡ Memory: ${usedMB}MB`);
        }
        
        this.metrics.set('memoryUsage', usedMB);
      });
    };

    // Check memory less frequently
    setInterval(checkMemory, 60000); // Every minute
    checkMemory();
  }

  private optimizeScrolling(): void {
    let ticking = false;

    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false;
        });
        ticking = true;
      }
    };

    document.addEventListener('scroll', optimizedScroll, { passive: true });
    document.addEventListener('touchstart', optimizedScroll, { passive: true });
  }

  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  cleanup(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
    this.metrics.clear();
  }
}

export const optimizedPerformanceMonitor = OptimizedPerformanceMonitor.getInstance();