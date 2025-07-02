
// Favicon Performance Monitor - Track iOS favicon performance
export interface FaviconMetrics {
  loadAttempts: number;
  successfulLoads: number;
  failedLoads: number;
  averageLoadTime: number;
  lastLoadTime: number;
  iosSpecificIssues: number;
  cacheHits: number;
  cacheMisses: number;
}

export class FaviconPerformanceMonitor {
  private metrics: FaviconMetrics = {
    loadAttempts: 0,
    successfulLoads: 0,
    failedLoads: 0,
    averageLoadTime: 0,
    lastLoadTime: 0,
    iosSpecificIssues: 0,
    cacheHits: 0,
    cacheMisses: 0
  };
  
  private loadTimes: number[] = [];
  private readonly MAX_LOAD_TIMES = 50; // Keep last 50 load times
  
  recordLoadAttempt() {
    this.metrics.loadAttempts++;
    console.log(`📊 Favicon load attempt #${this.metrics.loadAttempts}`);
  }
  
  recordSuccessfulLoad(loadTime: number) {
    this.metrics.successfulLoads++;
    this.metrics.lastLoadTime = loadTime;
    
    // Track load times
    this.loadTimes.push(loadTime);
    if (this.loadTimes.length > this.MAX_LOAD_TIMES) {
      this.loadTimes.shift();
    }
    
    // Calculate average
    this.metrics.averageLoadTime = this.loadTimes.reduce((sum, time) => sum + time, 0) / this.loadTimes.length;
    
    console.log(`✅ Favicon load success: ${loadTime}ms (avg: ${this.metrics.averageLoadTime.toFixed(2)}ms)`);
  }
  
  recordFailedLoad() {
    this.metrics.failedLoads++;
    console.warn(`❌ Favicon load failed (total failures: ${this.metrics.failedLoads})`);
  }
  
  recordIOSIssue() {
    this.metrics.iosSpecificIssues++;
    console.warn(`🍎 iOS-specific favicon issue recorded (total: ${this.metrics.iosSpecificIssues})`);
  }
  
  recordCacheHit() {
    this.metrics.cacheHits++;
  }
  
  recordCacheMiss() {
    this.metrics.cacheMisses++;
  }
  
  getMetrics(): FaviconMetrics {
    return { ...this.metrics };
  }
  
  getSuccessRate(): number {
    if (this.metrics.loadAttempts === 0) return 0;
    return (this.metrics.successfulLoads / this.metrics.loadAttempts) * 100;
  }
  
  getCacheHitRate(): number {
    const totalCacheRequests = this.metrics.cacheHits + this.metrics.cacheMisses;
    if (totalCacheRequests === 0) return 0;
    return (this.metrics.cacheHits / totalCacheRequests) * 100;
  }
  
  generateReport(): string {
    const successRate = this.getSuccessRate();
    const cacheHitRate = this.getCacheHitRate();
    
    return `
📊 Favicon Performance Report:
- Load Attempts: ${this.metrics.loadAttempts}
- Success Rate: ${successRate.toFixed(1)}%
- Average Load Time: ${this.metrics.averageLoadTime.toFixed(2)}ms
- Cache Hit Rate: ${cacheHitRate.toFixed(1)}%
- iOS Issues: ${this.metrics.iosSpecificIssues}
    `.trim();
  }
  
  reset() {
    this.metrics = {
      loadAttempts: 0,
      successfulLoads: 0,
      failedLoads: 0,
      averageLoadTime: 0,
      lastLoadTime: 0,
      iosSpecificIssues: 0,
      cacheHits: 0,
      cacheMisses: 0
    };
    this.loadTimes = [];
    console.log('🔄 Favicon performance metrics reset');
  }
}

export const faviconPerformanceMonitor = new FaviconPerformanceMonitor();
