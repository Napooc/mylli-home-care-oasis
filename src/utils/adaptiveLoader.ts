
// Phase 3: Adaptive Loading Strategy
interface LoadingStrategy {
  priority: 'critical' | 'high' | 'medium' | 'low';
  defer: boolean;
  preload: boolean;
  lazy: boolean;
}

interface AdaptiveConfig {
  connectionType: string;
  memoryLevel: 'low' | 'medium' | 'high';
  deviceType: 'mobile' | 'tablet' | 'desktop';
  batteryLevel?: number;
}

class AdaptiveLoader {
  private config: AdaptiveConfig;
  private loadingQueue: Array<{ resource: string; strategy: LoadingStrategy }> = [];
  private loadedResources = new Set<string>();

  constructor() {
    this.config = this.detectDeviceCapabilities();
    this.initializeAdaptiveStrategies();
  }

  // Detect device capabilities and network conditions
  private detectDeviceCapabilities(): AdaptiveConfig {
    const connection = (navigator as any).connection;
    const memory = (navigator as any).deviceMemory;
    
    let connectionType = 'unknown';
    if (connection) {
      connectionType = connection.effectiveType || connection.type || 'unknown';
    }

    let memoryLevel: 'low' | 'medium' | 'high' = 'medium';
    if (memory) {
      if (memory <= 2) memoryLevel = 'low';
      else if (memory <= 4) memoryLevel = 'medium';
      else memoryLevel = 'high';
    }

    const deviceType = this.getDeviceType();

    console.log('🔧 Adaptive Loader Configuration:', { connectionType, memoryLevel, deviceType });

    return { connectionType, memoryLevel, deviceType };
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  // Initialize adaptive loading strategies
  private initializeAdaptiveStrategies(): void {
    console.log('🎯 Initializing adaptive loading strategies...');

    // Monitor battery status if available
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        this.config.batteryLevel = battery.level;
        console.log(`🔋 Battery level: ${(battery.level * 100).toFixed(0)}%`);
        
        battery.addEventListener('levelchange', () => {
          this.config.batteryLevel = battery.level;
          this.adaptLoadingStrategy();
        });
      });
    }

    // Monitor connection changes
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', () => {
        this.config.connectionType = connection.effectiveType;
        this.adaptLoadingStrategy();
      });
    }
  }

  // Adapt loading strategy based on current conditions
  private adaptLoadingStrategy(): void {
    const isLowPower = this.config.batteryLevel && this.config.batteryLevel < 0.2;
    const isSlowNetwork = ['slow-2g', '2g'].includes(this.config.connectionType);
    const isLowMemory = this.config.memoryLevel === 'low';

    if (isLowPower || isSlowNetwork || isLowMemory) {
      console.log('⚡ Switching to power-saving mode');
      this.enablePowerSavingMode();
    } else {
      console.log('🚀 Enabling performance mode');
      this.enablePerformanceMode();
    }
  }

  // Enable power-saving optimizations
  private enablePowerSavingMode(): void {
    document.body.classList.add('power-saving');
    
    // Reduce animation frame rate
    this.throttleAnimations();
    
    // Defer non-critical resources
    this.deferNonCriticalResources();
    
    // Reduce image quality
    this.optimizeImageLoading();
  }

  // Enable performance optimizations
  private enablePerformanceMode(): void {
    document.body.classList.remove('power-saving');
    
    // Preload resources aggressively
    this.preloadCriticalResources();
    
    // Enable high-quality features
    this.enableHighQualityFeatures();
  }

  // Intelligent resource loading based on priority
  loadResource(url: string, priority: LoadingStrategy['priority'] = 'medium'): Promise<void> {
    if (this.loadedResources.has(url)) {
      return Promise.resolve();
    }

    const strategy = this.getLoadingStrategy(priority);
    
    return new Promise((resolve, reject) => {
      if (strategy.defer) {
        // Defer loading until idle
        this.deferUntilIdle(() => this.executeLoad(url, resolve, reject));
      } else if (strategy.preload) {
        // Preload immediately
        this.executeLoad(url, resolve, reject);
      } else {
        // Load on demand
        this.executeLoad(url, resolve, reject);
      }
    });
  }

  private getLoadingStrategy(priority: LoadingStrategy['priority']): LoadingStrategy {
    const isLowEnd = this.config.memoryLevel === 'low' || 
                     ['slow-2g', '2g'].includes(this.config.connectionType);

    if (isLowEnd) {
      return {
        priority,
        defer: priority !== 'critical',
        preload: priority === 'critical',
        lazy: priority === 'low'
      };
    } else {
      return {
        priority,
        defer: false,
        preload: ['critical', 'high'].includes(priority),
        lazy: priority === 'low'
      };
    }
  }

  private executeLoad(url: string, resolve: () => void, reject: (error: Error) => void): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = this.getResourceType(url);
    
    link.onload = () => {
      this.loadedResources.add(url);
      resolve();
    };
    
    link.onerror = () => {
      reject(new Error(`Failed to load: ${url}`));
    };
    
    document.head.appendChild(link);
  }

  private getResourceType(url: string): string {
    if (url.match(/\.(js|mjs)$/)) return 'script';
    if (url.match(/\.css$/)) return 'style';
    if (url.match(/\.(png|jpg|jpeg|gif|webp|avif|svg)$/)) return 'image';
    if (url.match(/\.(woff|woff2|ttf|otf)$/)) return 'font';
    return 'fetch';
  }

  private deferUntilIdle(callback: () => void): void {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(callback, { timeout: 5000 });
    } else {
      setTimeout(callback, 0);
    }
  }

  private throttleAnimations(): void {
    const style = document.createElement('style');
    style.textContent = `
      .power-saving * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
      }
    `;
    document.head.appendChild(style);
  }

  private deferNonCriticalResources(): void {
    const nonCriticalImages = document.querySelectorAll('img[loading="eager"]');
    nonCriticalImages.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
  }

  private optimizeImageLoading(): void {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      const src = img.src;
      if (src.includes('?')) {
        img.src = src + '&q=50'; // Reduce quality
      } else {
        img.src = src + '?q=50';
      }
    });
  }

  private preloadCriticalResources(): void {
    const criticalResources = [
      '/assets/js/vendor-react.js',
      '/assets/css/critical.css'
    ];
    
    criticalResources.forEach(resource => {
      this.loadResource(resource, 'critical');
    });
  }

  private enableHighQualityFeatures(): void {
    // Enable high-quality images
    const images = document.querySelectorAll('img[data-hq-src]');
    images.forEach(img => {
      const hqSrc = img.getAttribute('data-hq-src');
      if (hqSrc) {
        img.setAttribute('src', hqSrc);
      }
    });
  }
}

export const adaptiveLoader = new AdaptiveLoader();
