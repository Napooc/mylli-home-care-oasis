// Ultra-lightweight mobile performance optimizer
interface MobileOptimizationConfig {
  connectionType: string;
  deviceMemory: number;
  isSlowConnection: boolean;
  batteryLevel?: number;
}

class MobilePerformanceOptimizer {
  private static instance: MobilePerformanceOptimizer;
  private config: MobileOptimizationConfig = {
    connectionType: 'unknown',
    deviceMemory: 4,
    isSlowConnection: false
  };

  static getInstance(): MobilePerformanceOptimizer {
    if (!this.instance) {
      this.instance = new MobilePerformanceOptimizer();
    }
    return this.instance;
  }

  constructor() {
    this.detectMobileCapabilities();
  }

  private detectMobileCapabilities(): void {
    // Detect connection type
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      this.config.connectionType = connection.effectiveType || 'unknown';
      this.config.isSlowConnection = ['slow-2g', '2g'].includes(connection.effectiveType);
    }

    // Detect device memory
    if ('deviceMemory' in navigator) {
      this.config.deviceMemory = (navigator as any).deviceMemory || 4;
    }

    // Detect battery level
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        this.config.batteryLevel = battery.level;
      }).catch(() => {});
    }
  }

  // Get optimized bundle size based on device capabilities
  getOptimalBundleSize(): number {
    if (this.config.isSlowConnection || this.config.deviceMemory < 2) {
      return 150; // KB - ultra-lightweight
    }
    if (this.config.deviceMemory < 4) {
      return 300; // KB - lightweight
    }
    return 500; // KB - standard
  }

  // Determine if we should use skeleton screens
  shouldUseSkeletonScreens(): boolean {
    return this.config.isSlowConnection || this.config.deviceMemory < 4;
  }

  // Get image quality based on connection
  getOptimalImageQuality(): number {
    if (this.config.isSlowConnection) return 60;
    if (this.config.connectionType === '3g') return 75;
    return 85;
  }

  // Get lazy loading threshold
  getLazyLoadingThreshold(): string {
    if (this.config.isSlowConnection) return '200px';
    return '100px';
  }

  // Check if should defer non-critical resources
  shouldDeferNonCritical(): boolean {
    return this.config.isSlowConnection || 
           this.config.deviceMemory < 3 ||
           (this.config.batteryLevel && this.config.batteryLevel < 0.2);
  }

  getConfig(): MobileOptimizationConfig {
    return { ...this.config };
  }
}

export const mobilePerformanceOptimizer = MobilePerformanceOptimizer.getInstance();