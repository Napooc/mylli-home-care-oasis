interface MobilePerformanceMetrics {
  loadTime: number;
  memoryUsage: number;
  connectionType: string;
  batteryLevel?: number;
  timestamp: number;
}

class MobilePerformanceTracker {
  private static instance: MobilePerformanceTracker;
  private startTime: number = Date.now();
  private metrics: MobilePerformanceMetrics[] = [];

  static getInstance(): MobilePerformanceTracker {
    if (!this.instance) {
      this.instance = new MobilePerformanceTracker();
    }
    return this.instance;
  }

  constructor() {
    this.initializeTracking();
  }

  private initializeTracking(): void {
    // Track page load performance
    window.addEventListener('load', () => {
      this.recordMetric();
    });

    // Track performance every 30 seconds
    setInterval(() => {
      this.recordMetric();
    }, 30000);
  }

  private async recordMetric(): Promise<void> {
    const loadTime = Date.now() - this.startTime;
    let memoryUsage = 0;
    let connectionType = 'unknown';
    let batteryLevel: number | undefined;

    // Get memory usage if available
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
    }

    // Get connection type
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connectionType = connection.effectiveType || 'unknown';
    }

    // Get battery level if available
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        batteryLevel = battery.level;
      } catch (error) {
        // Battery API not available
      }
    }

    const metric: MobilePerformanceMetrics = {
      loadTime,
      memoryUsage,
      connectionType,
      batteryLevel,
      timestamp: Date.now()
    };

    this.metrics.push(metric);
    this.logPerformance(metric);

    // Keep only last 10 metrics
    if (this.metrics.length > 10) {
      this.metrics = this.metrics.slice(-10);
    }
  }

  private logPerformance(metric: MobilePerformanceMetrics): void {
    console.log('📱 Mobile Performance:', {
      loadTime: `${metric.loadTime}ms`,
      memory: `${metric.memoryUsage.toFixed(1)}MB`,
      connection: metric.connectionType,
      battery: metric.batteryLevel ? `${(metric.batteryLevel * 100).toFixed(0)}%` : 'N/A'
    });

    // Alert on performance issues
    if (metric.loadTime > 3000) {
      console.warn('⚠️ Slow mobile loading detected:', `${metric.loadTime}ms`);
    }

    if (metric.memoryUsage > 50) {
      console.warn('⚠️ High mobile memory usage:', `${metric.memoryUsage.toFixed(1)}MB`);
    }
  }

  getLatestMetrics(): MobilePerformanceMetrics[] {
    return [...this.metrics];
  }

  getAverageLoadTime(): number {
    if (this.metrics.length === 0) return 0;
    const total = this.metrics.reduce((sum, metric) => sum + metric.loadTime, 0);
    return total / this.metrics.length;
  }
}

export const mobilePerformanceTracker = MobilePerformanceTracker.getInstance();
