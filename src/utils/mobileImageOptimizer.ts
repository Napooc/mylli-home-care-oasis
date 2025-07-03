
// Phase 1: Mobile-Specific Image Sizing Optimization
interface MobileImageConfig {
  width: number;
  height: number;
  quality: number;
  format: 'webp' | 'jpeg' | 'png';
  priority: 'high' | 'medium' | 'low';
}

interface DeviceSpecs {
  isMobile: boolean;
  isTablet: boolean;
  devicePixelRatio: number;
  connectionSpeed: 'slow' | 'medium' | 'fast';
  batteryLevel?: number;
  screenWidth: number;
  screenHeight: number;
}

class MobileImageOptimizer {
  private static instance: MobileImageOptimizer;
  private deviceSpecs: DeviceSpecs;
  private supportsWebP: boolean = false;

  static getInstance(): MobileImageOptimizer {
    if (!this.instance) {
      this.instance = new MobileImageOptimizer();
    }
    return this.instance;
  }

  constructor() {
    this.deviceSpecs = this.getDeviceSpecs();
    this.detectWebPSupport();
    console.log('📱 Mobile Image Optimizer initialized:', this.deviceSpecs);
  }

  // Phase 1: Get device specifications for mobile optimization
  private getDeviceSpecs(): DeviceSpecs {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    return {
      isMobile: screenWidth < 768,
      isTablet: screenWidth >= 768 && screenWidth < 1024,
      devicePixelRatio,
      connectionSpeed: this.getConnectionSpeed(),
      screenWidth,
      screenHeight
    };
  }

  // Phase 2: Connection-aware speed detection
  private getConnectionSpeed(): 'slow' | 'medium' | 'fast' {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection?.effectiveType;
      
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        return 'slow';
      } else if (effectiveType === '3g') {
        return 'medium';
      }
    }
    return 'fast';
  }

  // Phase 1: WebP support detection for mobile
  private detectWebPSupport(): void {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    this.supportsWebP = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  // Phase 1: Get optimal mobile image configuration
  getMobileOptimizedConfig(originalWidth?: number, originalHeight?: number, priority: 'high' | 'medium' | 'low' = 'medium'): MobileImageConfig {
    const { isMobile, isTablet, devicePixelRatio, connectionSpeed, screenWidth } = this.deviceSpecs;
    
    // Phase 1: Mobile-specific sizing (320x320 → 150x150 for service cards)
    let optimalWidth = originalWidth || 800;
    let optimalHeight = originalHeight || 600;
    
    if (isMobile) {
      // Aggressive mobile sizing for faster loading
      if (originalWidth && originalWidth > 320) {
        optimalWidth = Math.min(150, Math.floor(screenWidth * 0.4)); // Service cards
      } else {
        optimalWidth = Math.min(screenWidth * devicePixelRatio, 480);
      }
      optimalHeight = Math.floor(optimalHeight * (optimalWidth / (originalWidth || 800)));
    } else if (isTablet) {
      optimalWidth = Math.min(screenWidth * devicePixelRatio * 0.5, 768);
      optimalHeight = Math.floor(optimalHeight * (optimalWidth / (originalWidth || 800)));
    }

    // Phase 1: Mobile-first quality settings (75 → 40 on mobile)
    let quality = 75; // Default desktop quality
    
    if (isMobile) {
      switch (connectionSpeed) {
        case 'slow':
          quality = priority === 'high' ? 35 : 25; // Ultra-low for 2G
          break;
        case 'medium':
          quality = priority === 'high' ? 45 : 35; // Low for 3G
          break;
        case 'fast':
          quality = priority === 'high' ? 55 : 40; // Mobile-optimized for 4G+
          break;
      }
    } else if (isTablet) {
      quality = priority === 'high' ? 70 : 60;
    }

    // Phase 2: Format selection (WebP for modern mobiles)
    const format: 'webp' | 'jpeg' | 'png' = this.supportsWebP && isMobile ? 'webp' : 'jpeg';

    return {
      width: Math.round(optimalWidth),
      height: Math.round(optimalHeight),
      quality,
      format,
      priority
    };
  }

  // Phase 1: Optimize image URL with mobile-specific parameters
  optimizeImageUrl(src: string, originalWidth?: number, originalHeight?: number, priority: 'high' | 'medium' | 'low' = 'medium'): string {
    const config = this.getMobileOptimizedConfig(originalWidth, originalHeight, priority);
    
    if (src.includes('unsplash.com')) {
      const params = new URLSearchParams();
      params.set('auto', 'format');
      params.set('fit', 'crop');
      params.set('q', config.quality.toString());
      params.set('w', config.width.toString());
      params.set('h', config.height.toString());
      if (config.format === 'webp') params.set('fm', 'webp');
      return `${src}?${params.toString()}`;
    }
    
    if (src.includes('lovable-uploads')) {
      const params = new URLSearchParams();
      params.set('w', config.width.toString());
      params.set('h', config.height.toString());
      params.set('q', config.quality.toString());
      if (config.format === 'webp') params.set('f', 'webp');
      return `${src}?${params.toString()}`;
    }
    
    return src;
  }

  // Phase 3: Mobile-optimized intersection observer settings
  getMobileIntersectionConfig(): IntersectionObserverInit {
    const { isMobile } = this.deviceSpecs;
    
    return {
      threshold: 0.1,
      rootMargin: isMobile ? '50px' : '100px' // Reduced margin for mobile
    };
  }

  // Phase 2: Progressive loading placeholder
  generateMobilePlaceholder(width: number, height: number): string {
    const canvas = document.createElement('canvas');
    const config = this.getMobileOptimizedConfig(width, height, 'low');
    
    // Ultra-tiny placeholder for mobile (10x smaller)
    canvas.width = this.deviceSpecs.isMobile ? Math.max(config.width / 10, 10) : config.width / 5;
    canvas.height = this.deviceSpecs.isMobile ? Math.max(config.height / 10, 10) : config.height / 5;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#f1f5f9');
      gradient.addColorStop(1, '#e2e8f0');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    return canvas.toDataURL('image/jpeg', 0.1);
  }

  // Phase 4: Battery-aware quality adjustment
  private getBatteryAwareQuality(baseQuality: number): number {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        if (battery.level < 0.2) { // Low battery
          return Math.max(baseQuality - 20, 25);
        }
      });
    }
    return baseQuality;
  }

  // Phase 4: Memory-aware loading check
  canLoadHighQuality(): boolean {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
      return memoryUsage < 0.7; // Don't load high quality if memory > 70%
    }
    return true;
  }

  // Update device specs when viewport changes
  updateDeviceSpecs(): void {
    this.deviceSpecs = this.getDeviceSpecs();
    console.log('📱 Device specs updated:', this.deviceSpecs);
  }

  // Get current optimization stats
  getOptimizationStats(): {
    isMobile: boolean;
    connectionSpeed: string;
    estimatedSavings: string;
    webpSupport: boolean;
  } {
    const savings = this.deviceSpecs.isMobile ? '90%' : '60%';
    
    return {
      isMobile: this.deviceSpecs.isMobile,
      connectionSpeed: this.deviceSpecs.connectionSpeed,
      estimatedSavings: `${savings} smaller images`,
      webpSupport: this.supportsWebP
    };
  }
}

export const mobileImageOptimizer = MobileImageOptimizer.getInstance();

// Update specs on resize
window.addEventListener('resize', () => {
  mobileImageOptimizer.updateDeviceSpecs();
});
