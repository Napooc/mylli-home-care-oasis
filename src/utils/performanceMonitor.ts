
// Phase 3: Advanced Performance Monitoring System
interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  memoryUsage?: number;
  networkType?: string;
  timestamp: number;
}

interface ResourceTiming {
  name: string;
  duration: number;
  size: number;
  type: 'script' | 'stylesheet' | 'image' | 'font' | 'other';
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private observer: PerformanceObserver | null = null;
  private isMonitoring = false;

  // Initialize performance monitoring
  initialize(): void {
    if (this.isMonitoring) return;
    
    console.log('🔍 Phase 3: Initializing advanced performance monitoring...');
    
    this.isMonitoring = true;
    this.setupPerformanceObserver();
    this.trackCoreWebVitals();
    this.monitorMemoryUsage();
    this.trackNetworkConditions();
  }

  // Setup performance observer for comprehensive monitoring
  private setupPerformanceObserver(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      this.observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            this.handleNavigationTiming(entry as PerformanceNavigationTiming);
          } else if (entry.entryType === 'paint') {
            this.handlePaintTiming(entry);
          } else if (entry.entryType === 'largest-contentful-paint') {
            this.handleLCPTiming(entry);
          } else if (entry.entryType === 'first-input') {
            this.handleFIDTiming(entry);
          } else if (entry.entryType === 'layout-shift') {
            this.handleCLSTiming(entry);
          }
        });
      });

      // Observe all relevant entry types
      this.observer.observe({ 
        entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'first-input', 'layout-shift', 'resource'] 
      });
    } catch (error) {
      console.warn('Performance Observer setup failed:', error);
    }
  }

  // Track Core Web Vitals with detailed analysis
  private trackCoreWebVitals(): void {
    // FCP - First Contentful Paint
    if ('getEntriesByType' in performance) {
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        console.log(`📊 FCP: ${fcpEntry.startTime.toFixed(2)}ms`);
      }
    }

    // CLS - Cumulative Layout Shift tracking
    let clsValue = 0;
    let clsEntries: any[] = [];

    const handleCLS = (entries: any[]) => {
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      });
    };

    if ('PerformanceObserver' in window) {
      try {
        const clsObserver = new PerformanceObserver((entryList) => {
          handleCLS(entryList.getEntries());
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.warn('CLS observer failed:', error);
      }
    }
  }

  // Monitor memory usage patterns
  private monitorMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryInfo = {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit
      };
      
      console.log('💾 Memory Usage:', {
        used: `${(memoryInfo.used / 1024 / 1024).toFixed(2)}MB`,
        total: `${(memoryInfo.total / 1024 / 1024).toFixed(2)}MB`,
        utilization: `${((memoryInfo.used / memoryInfo.total) * 100).toFixed(1)}%`
      });

      // Alert if memory usage is high
      if (memoryInfo.used / memoryInfo.limit > 0.8) {
        console.warn('⚠️ High memory usage detected - consider optimization');
      }
    }
  }

  // Track network conditions and adapt accordingly
  private trackNetworkConditions(): void {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      console.log('🌐 Network Conditions:', {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      });

      // Listen for network changes
      connection.addEventListener('change', () => {
        console.log('🔄 Network conditions changed:', connection.effectiveType);
        this.adaptToNetworkConditions(connection);
      });
    }
  }

  // Adapt application behavior based on network conditions
  private adaptToNetworkConditions(connection: any): void {
    const isSlowConnection = connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
    const isFastConnection = connection.effectiveType === '4g';
    
    if (isSlowConnection) {
      // Reduce image quality, disable non-essential features
      document.body.classList.add('slow-connection');
      console.log('🐌 Slow connection detected - optimizing for performance');
    } else if (isFastConnection) {
      // Enable high-quality features
      document.body.classList.remove('slow-connection');
      console.log('🚀 Fast connection detected - enabling full features');
    }
  }

  // Handle different performance timing entries
  private handleNavigationTiming(entry: PerformanceNavigationTiming): void {
    const metrics = {
      dns: entry.domainLookupEnd - entry.domainLookupStart,
      tcp: entry.connectEnd - entry.connectStart,
      ssl: entry.secureConnectionStart > 0 ? entry.connectEnd - entry.secureConnectionStart : 0,
      ttfb: entry.responseStart - entry.requestStart,
      download: entry.responseEnd - entry.responseStart,
      domProcessing: entry.domContentLoadedEventStart - entry.responseEnd,
      onLoad: entry.loadEventEnd - entry.loadEventStart
    };

    console.log('📈 Navigation Timing Breakdown:', metrics);
  }

  private handlePaintTiming(entry: PerformanceEntry): void {
    console.log(`🎨 ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
  }

  private handleLCPTiming(entry: any): void {
    console.log(`🖼️ LCP: ${entry.startTime.toFixed(2)}ms - Element:`, entry.element);
  }

  private handleFIDTiming(entry: any): void {
    console.log(`⚡ FID: ${entry.processingStart - entry.startTime}ms`);
  }

  private handleCLSTiming(entry: any): void {
    if (!entry.hadRecentInput) {
      console.log(`📐 Layout Shift: ${entry.value} - Sources:`, entry.sources);
    }
  }

  // Generate performance report
  generateReport(): object {
    const report = {
      timestamp: Date.now(),
      metrics: this.getLatestMetrics(),
      resources: this.getResourceTimings(),
      recommendations: this.generateRecommendations()
    };

    console.log('📊 Performance Report Generated:', report);
    return report;
  }

  private getLatestMetrics(): PerformanceMetrics | null {
    return this.metrics.length > 0 ? this.metrics[this.metrics.length - 1] : null;
  }

  private getResourceTimings(): ResourceTiming[] {
    if (!('getEntriesByType' in performance)) return [];
    
    const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    return resourceEntries.map(entry => ({
      name: entry.name,
      duration: entry.duration,
      size: entry.transferSize || entry.encodedBodySize || 0,
      type: this.getResourceType(entry.name)
    }));
  }

  private getResourceType(url: string): ResourceTiming['type'] {
    if (url.match(/\.(js|mjs)$/)) return 'script';
    if (url.match(/\.css$/)) return 'stylesheet';
    if (url.match(/\.(png|jpg|jpeg|gif|webp|avif|svg)$/)) return 'image';
    if (url.match(/\.(woff|woff2|ttf|otf)$/)) return 'font';
    return 'other';
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    const latest = this.getLatestMetrics();
    
    if (latest) {
      if (latest.fcp > 2500) recommendations.push('Optimize First Contentful Paint');
      if (latest.lcp > 4000) recommendations.push('Improve Largest Contentful Paint');
      if (latest.fid > 300) recommendations.push('Reduce First Input Delay');
      if (latest.cls > 0.25) recommendations.push('Minimize Cumulative Layout Shift');
    }

    return recommendations;
  }

  // Cleanup
  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.isMonitoring = false;
  }
}

export const performanceMonitor = new PerformanceMonitor();
