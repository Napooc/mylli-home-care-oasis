// Phase 4: Performance Monitoring & Optimization
class ImagePerformanceMonitor {
  private static instance: ImagePerformanceMonitor;
  private metrics = new Map<string, { loadTime: number; size: number; retries: number }>();

  static getInstance(): ImagePerformanceMonitor {
    if (!this.instance) {
      this.instance = new ImagePerformanceMonitor();
    }
    return this.instance;
  }

  trackImageLoad(src: string, startTime: number, endTime: number, size: number): void {
    const loadTime = endTime - startTime;
    this.metrics.set(src, { loadTime, size, retries: 0 });
    
    if (loadTime > 1000) {
      console.warn(`Slow image load: ${src} took ${loadTime}ms`);
    }
  }

  getAverageLoadTime(): number {
    const times = Array.from(this.metrics.values()).map(m => m.loadTime);
    return times.length ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  }

  getStats(): object {
    return {
      totalImages: this.metrics.size,
      averageLoadTime: `${this.getAverageLoadTime().toFixed(0)}ms`,
      slowImages: Array.from(this.metrics.entries())
        .filter(([, m]) => m.loadTime > 1000)
        .length
    };
  }
}

export const imagePerformanceMonitor = ImagePerformanceMonitor.getInstance();