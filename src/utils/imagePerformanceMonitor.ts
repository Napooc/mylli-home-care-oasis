// Phase 4: Real-time Image Performance Monitoring & Optimization
interface ImageLoadMetrics {
  src: string;
  loadTime: number;
  timestamp: number;
  width?: number;
  height?: number;
  fileSize?: number;
  connectionType?: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  error?: string;
}

interface PerformanceStats {
  totalLoads: number;
  averageLoadTime: number;
  errorRate: number;
  fastestLoad: number;
  slowestLoad: number;
  totalBytes: number;
  savedBytes: number;
}

class ImagePerformanceMonitor {
  private static instance: ImagePerformanceMonitor;
  private metrics: ImageLoadMetrics[] = [];
  private maxMetrics = 1000;
  private compressionOptimizer: CompressionOptimizer;

  static getInstance(): ImagePerformanceMonitor {
    if (!this.instance) {
      this.instance = new ImagePerformanceMonitor();
    }
    return this.instance;
  }

  constructor() {
    this.compressionOptimizer = new CompressionOptimizer();
    this.initializeMonitoring();
    this.startPerformanceReporting();
  }

  // Initialize comprehensive monitoring
  private initializeMonitoring(): void {
    console.log('📊 Image performance monitoring initialized');
    
    // Monitor network changes
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', () => {
        console.log(`📶 Network changed: ${connection.effectiveType}`);
        this.optimizeForConnection(connection.effectiveType);
      });
    }

    // Monitor memory pressure
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
          this.handleMemoryPressure();
        }
      }, 30000);
    }

    // Clean old metrics periodically
    setInterval(() => this.cleanupOldMetrics(), 60000);
  }

  // Record successful image load
  recordImageLoad(src: string, loadTime: number, width?: number, height?: number): void {
    const metric: ImageLoadMetrics = {
      src,
      loadTime,
      timestamp: Date.now(),
      width,
      height,
      deviceType: this.getDeviceType(),
      connectionType: this.getConnectionType()
    };

    this.metrics.push(metric);
    this.limitMetricsSize();

    // Analyze and optimize if needed
    this.analyzeLoadPerformance(metric);
  }

  // Record image load error
  recordImageError(src: string, attemptTime: number, error?: string): void {
    const metric: ImageLoadMetrics = {
      src,
      loadTime: attemptTime,
      timestamp: Date.now(),
      deviceType: this.getDeviceType(),
      connectionType: this.getConnectionType(),
      error: error || 'Load failed'
    };

    this.metrics.push(metric);
    this.limitMetricsSize();

    console.warn(`❌ Image load failed: ${src} (${attemptTime}ms)`);
  }

  // Analyze load performance and suggest optimizations
  private analyzeLoadPerformance(metric: ImageLoadMetrics): void {
    // Flag slow loads for optimization
    if (metric.loadTime > 3000) {
      console.warn(`🐌 Slow image load detected: ${metric.src} (${metric.loadTime}ms)`);
      this.compressionOptimizer.scheduleOptimization(metric.src, metric.width, metric.height);
    }

    // Flag potential size issues
    if (metric.width && metric.height && metric.width * metric.height > 2000000) {
      console.warn(`📏 Large image detected: ${metric.src} (${metric.width}x${metric.height})`);
    }
  }

  // Get device type for adaptive loading
  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  // Get connection type
  private getConnectionType(): string {
    if ('connection' in navigator) {
      return (navigator as any).connection?.effectiveType || 'unknown';
    }
    return 'unknown';
  }

  // Optimize loading strategy based on connection
  private optimizeForConnection(effectiveType: string): void {
    const strategy = this.getOptimalStrategy(effectiveType);
    console.log(`🔧 Optimizing for ${effectiveType}: ${strategy}`);
  }

  // Get optimal loading strategy
  private getOptimalStrategy(connectionType: string): string {
    switch (connectionType) {
      case 'slow-2g':
      case '2g':
        return 'Ultra-low quality, minimal preloading';
      case '3g':
        return 'Medium quality, selective preloading';
      case '4g':
      case '5g':
        return 'High quality, aggressive preloading';
      default:
        return 'Adaptive quality';
    }
  }

  // Handle memory pressure
  private handleMemoryPressure(): void {
    console.warn('⚠️ Memory pressure detected, optimizing...');
    
    // Clear older metrics
    const cutoff = Date.now() - 300000; // 5 minutes
    this.metrics = this.metrics.filter(m => m.timestamp > cutoff);
    
    // Trigger image cache cleanup
    if ((window as any).intelligentImageCache) {
      (window as any).intelligentImageCache.cleanupUnusedImages();
    }
  }

  // Limit metrics array size
  private limitMetricsSize(): void {
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  // Clean old metrics
  private cleanupOldMetrics(): void {
    const cutoff = Date.now() - 600000; // 10 minutes
    const initialLength = this.metrics.length;
    this.metrics = this.metrics.filter(m => m.timestamp > cutoff);
    
    if (this.metrics.length < initialLength) {
      console.log(`🧹 Cleaned ${initialLength - this.metrics.length} old metrics`);
    }
  }

  // Start performance reporting
  private startPerformanceReporting(): void {
    setInterval(() => {
      const stats = this.getPerformanceStats();
      if (stats.totalLoads > 10) {
        console.log('📈 Image Performance Report:', stats);
      }
    }, 60000); // Every minute
  }

  // Get comprehensive performance statistics
  getPerformanceStats(): PerformanceStats {
    const validMetrics = this.metrics.filter(m => !m.error);
    const errorMetrics = this.metrics.filter(m => m.error);
    
    if (validMetrics.length === 0) {
      return {
        totalLoads: 0,
        averageLoadTime: 0,
        errorRate: 0,
        fastestLoad: 0,
        slowestLoad: 0,
        totalBytes: 0,
        savedBytes: 0
      };
    }

    const loadTimes = validMetrics.map(m => m.loadTime);
    const averageLoadTime = loadTimes.reduce((sum, time) => sum + time, 0) / loadTimes.length;
    const errorRate = (errorMetrics.length / this.metrics.length) * 100;

    return {
      totalLoads: validMetrics.length,
      averageLoadTime: Math.round(averageLoadTime),
      errorRate: Math.round(errorRate * 100) / 100,
      fastestLoad: Math.min(...loadTimes),
      slowestLoad: Math.max(...loadTimes),
      totalBytes: this.estimateTotalBytes(),
      savedBytes: this.estimateSavedBytes()
    };
  }

  // Estimate total bytes transferred
  private estimateTotalBytes(): number {
    return this.metrics
      .filter(m => m.width && m.height)
      .reduce((sum, m) => sum + (m.width! * m.height! * 0.5), 0); // Rough estimate
  }

  // Estimate bytes saved through optimization
  private estimateSavedBytes(): number {
    return this.compressionOptimizer.getTotalSavedBytes();
  }

  // Get real-time performance metrics
  getRealTimeMetrics(): {
    recentLoadTime: number;
    currentErrorRate: number;
    activeLoads: number;
    cacheHitRate: number;
  } {
    const recentMetrics = this.metrics.slice(-10);
    const recentErrors = recentMetrics.filter(m => m.error);
    const recentValidLoads = recentMetrics.filter(m => !m.error);
    
    return {
      recentLoadTime: recentValidLoads.length > 0 
        ? Math.round(recentValidLoads.reduce((sum, m) => sum + m.loadTime, 0) / recentValidLoads.length)
        : 0,
      currentErrorRate: recentMetrics.length > 0 
        ? (recentErrors.length / recentMetrics.length) * 100 
        : 0,
      activeLoads: this.getActiveLoadsCount(),
      cacheHitRate: this.calculateCacheHitRate()
    };
  }

  // Get active loads count
  private getActiveLoadsCount(): number {
    const now = Date.now();
    return this.metrics.filter(m => now - m.timestamp < 5000).length;
  }

  // Calculate cache hit rate
  private calculateCacheHitRate(): number {
    // This would integrate with the intelligent cache
    return 0; // Placeholder
  }
}

// Compression optimizer for adaptive image quality
class CompressionOptimizer {
  private optimizationQueue: Array<{ src: string; width?: number; height?: number }> = [];
  private totalSavedBytes = 0;

  // Schedule image for optimization
  scheduleOptimization(src: string, width?: number, height?: number): void {
    this.optimizationQueue.push({ src, width, height });
    console.log(`📋 Scheduled optimization: ${src}`);
  }

  // Get total bytes saved through optimization
  getTotalSavedBytes(): number {
    return this.totalSavedBytes;
  }

  // Process optimization queue (placeholder for future implementation)
  processOptimizationQueue(): void {
    // Future implementation: actual image compression and optimization
    console.log(`🔧 Processing ${this.optimizationQueue.length} optimization requests`);
    this.optimizationQueue = [];
  }
}

export const imagePerformanceMonitor = ImagePerformanceMonitor.getInstance();