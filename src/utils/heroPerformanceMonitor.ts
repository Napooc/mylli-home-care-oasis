// Phase 4: Real-time Performance Monitoring for Hero Section

interface HeroPerformanceMetrics {
  loadTime: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
  connectionType: string;
  deviceCapabilities: DeviceCapabilities;
}

interface DeviceCapabilities {
  memory: number;
  cores: number;
  pixelRatio: number;
  viewportSize: { width: number; height: number };
  batteryLevel?: number;
  isLowEndDevice: boolean;
}

interface PerformanceBudget {
  heroLoadTime: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
}

class HeroPerformanceMonitor {
  private static instance: HeroPerformanceMonitor;
  private metrics: HeroPerformanceMetrics;
  private budget: PerformanceBudget;
  private observers: PerformanceObserver[] = [];
  private startTime: number = performance.now();

  static getInstance(): HeroPerformanceMonitor {
    if (!HeroPerformanceMonitor.instance) {
      HeroPerformanceMonitor.instance = new HeroPerformanceMonitor();
    }
    return HeroPerformanceMonitor.instance;
  }

  constructor() {
    this.initializeDeviceCapabilities();
    this.setPerformanceBudget();
    this.startRealTimeMonitoring();
    this.initializeAdaptiveQuality();
  }

  private initializeDeviceCapabilities(): void {
    const nav = navigator as any;
    const deviceCapabilities: DeviceCapabilities = {
      memory: nav.deviceMemory || 4,
      cores: nav.hardwareConcurrency || 4,
      pixelRatio: window.devicePixelRatio,
      viewportSize: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      isLowEndDevice: false
    };

    // Determine if device is low-end
    deviceCapabilities.isLowEndDevice = 
      deviceCapabilities.memory <= 2 || 
      deviceCapabilities.cores <= 2 ||
      deviceCapabilities.viewportSize.width <= 768;

    // Get battery status if available
    if ('getBattery' in navigator) {
      nav.getBattery().then((battery: any) => {
        deviceCapabilities.batteryLevel = battery.level;
      });
    }

    this.metrics = {
      loadTime: 0,
      firstPaint: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      cumulativeLayoutShift: 0,
      timeToInteractive: 0,
      connectionType: nav.connection?.effectiveType || 'unknown',
      deviceCapabilities
    };

    console.log('📱 Device Capabilities:', deviceCapabilities);
  }

  private setPerformanceBudget(): void {
    const { isLowEndDevice } = this.metrics.deviceCapabilities;
    const connectionType = this.metrics.connectionType;

    // Adaptive budgets based on device and connection
    if (isLowEndDevice || ['slow-2g', '2g'].includes(connectionType)) {
      this.budget = {
        heroLoadTime: 3000,
        firstPaint: 1000,
        firstContentfulPaint: 1500,
        largestContentfulPaint: 2500,
        cumulativeLayoutShift: 0.2
      };
    } else if (connectionType === '3g') {
      this.budget = {
        heroLoadTime: 2000,
        firstPaint: 800,
        firstContentfulPaint: 1200,
        largestContentfulPaint: 1800,
        cumulativeLayoutShift: 0.1
      };
    } else {
      this.budget = {
        heroLoadTime: 1000,
        firstPaint: 500,
        firstContentfulPaint: 800,
        largestContentfulPaint: 1200,
        cumulativeLayoutShift: 0.05
      };
    }

    console.log('🎯 Performance Budget:', this.budget);
  }

  private startRealTimeMonitoring(): void {
    // Monitor Paint metrics
    this.observePaintMetrics();
    
    // Monitor Layout Shift
    this.observeLayoutShift();
    
    // Monitor Largest Contentful Paint
    this.observeLargestContentfulPaint();
    
    // Monitor Long Tasks
    this.observeLongTasks();
    
    // Monitor Hero-specific metrics
    this.monitorHeroSection();
  }

  private observePaintMetrics(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const paintObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          switch (entry.name) {
            case 'first-paint':
              this.metrics.firstPaint = entry.startTime;
              this.checkBudget('firstPaint', entry.startTime);
              break;
            case 'first-contentful-paint':
              this.metrics.firstContentfulPaint = entry.startTime;
              this.checkBudget('firstContentfulPaint', entry.startTime);
              break;
          }
        });
      });

      paintObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(paintObserver);
    } catch (error) {
      console.warn('Paint observation not supported');
    }
  }

  private observeLayoutShift(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        this.metrics.cumulativeLayoutShift += clsValue;
        this.checkBudget('cumulativeLayoutShift', this.metrics.cumulativeLayoutShift);
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (error) {
      console.warn('Layout shift observation not supported');
    }
  }

  private observeLargestContentfulPaint(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.largestContentfulPaint = lastEntry.startTime;
        this.checkBudget('largestContentfulPaint', lastEntry.startTime);
      });

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    } catch (error) {
      console.warn('LCP observation not supported');
    }
  }

  private observeLongTasks(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (entry.duration > 50) {
            console.warn(`⚠️ Long task in hero section: ${entry.duration.toFixed(2)}ms`);
            this.optimizeForLongTask();
          }
        });
      });

      longTaskObserver.observe({ entryTypes: ['longtask'] });
      this.observers.push(longTaskObserver);
    } catch (error) {
      console.warn('Long task observation not supported');
    }
  }

  private monitorHeroSection(): void {
    // Monitor when hero section becomes visible
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const heroLoadTime = performance.now() - this.startTime;
          this.metrics.loadTime = heroLoadTime;
          this.checkBudget('heroLoadTime', heroLoadTime);
          
          console.log(`🎯 Hero section loaded in ${heroLoadTime.toFixed(2)}ms`);
          heroObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });

    heroObserver.observe(heroSection);
  }

  private checkBudget(metric: keyof PerformanceBudget, value: number): void {
    const budgetValue = this.budget[metric];
    if (value > budgetValue) {
      console.warn(`💸 Performance budget exceeded for ${metric}: ${value.toFixed(2)}ms > ${budgetValue}ms`);
      this.triggerOptimization(metric);
    } else {
      console.log(`✅ Performance budget met for ${metric}: ${value.toFixed(2)}ms ≤ ${budgetValue}ms`);
    }
  }

  private triggerOptimization(metric: keyof PerformanceBudget): void {
    switch (metric) {
      case 'heroLoadTime':
        this.optimizeHeroLoading();
        break;
      case 'firstContentfulPaint':
        this.optimizeInitialRender();
        break;
      case 'cumulativeLayoutShift':
        this.stabilizeLayout();
        break;
      case 'largestContentfulPaint':
        this.optimizeLargestContent();
        break;
    }
  }

  private initializeAdaptiveQuality(): void {
    const { isLowEndDevice } = this.metrics.deviceCapabilities;
    const connectionType = this.metrics.connectionType;

    // Adaptive image quality
    let imageQuality = 85;
    if (isLowEndDevice || ['slow-2g', '2g'].includes(connectionType)) {
      imageQuality = 50;
    } else if (connectionType === '3g') {
      imageQuality = 70;
    }

    // Apply adaptive quality to hero images
    this.applyAdaptiveImageQuality(imageQuality);

    // Adaptive animation level
    this.setAdaptiveAnimationLevel();
  }

  private applyAdaptiveImageQuality(quality: number): void {
    const heroImages = document.querySelectorAll('.hero-section img');
    heroImages.forEach((img: any) => {
      const src = img.src;
      if (src && !src.includes('q=')) {
        const separator = src.includes('?') ? '&' : '?';
        img.src = `${src}${separator}q=${quality}`;
      }
    });

    console.log(`🖼️ Applied adaptive image quality: ${quality}%`);
  }

  private setAdaptiveAnimationLevel(): void {
    const { isLowEndDevice, batteryLevel } = this.metrics.deviceCapabilities;
    const isLowBattery = batteryLevel && batteryLevel < 0.3;

    let animationLevel = 'full';
    if (isLowEndDevice || isLowBattery) {
      animationLevel = 'reduced';
    }

    document.documentElement.setAttribute('data-animation-level', animationLevel);
    console.log(`🎬 Animation level set to: ${animationLevel}`);
  }

  private optimizeHeroLoading(): void {
    // Disable non-essential animations
    const style = document.createElement('style');
    style.textContent = `
      .hero-section * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
      }
    `;
    document.head.appendChild(style);
  }

  private optimizeInitialRender(): void {
    // Hide non-critical elements initially
    const nonCritical = document.querySelectorAll('.hero-section .non-critical');
    nonCritical.forEach((el: any) => {
      el.style.display = 'none';
    });
  }

  private stabilizeLayout(): void {
    // Add explicit dimensions to prevent layout shifts
    const images = document.querySelectorAll('.hero-section img');
    images.forEach((img: any) => {
      if (!img.style.width) {
        img.style.width = '100%';
        img.style.height = 'auto';
      }
    });
  }

  private optimizeLargestContent(): void {
    // Preload the largest content element
    const largestElements = document.querySelectorAll('.hero-section img, .hero-section video');
    largestElements.forEach((el: any) => {
      if (el.tagName === 'IMG') {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = el.src;
        document.head.appendChild(link);
      }
    });
  }

  private optimizeForLongTask(): void {
    // Break up long tasks by deferring non-critical work
    setTimeout(() => {
      // Defer non-critical hero enhancements
      const enhancements = document.querySelectorAll('.hero-section .enhancement');
      enhancements.forEach((el: any) => {
        el.style.opacity = '0';
        setTimeout(() => {
          el.style.opacity = '1';
        }, 100);
      });
    }, 0);
  }

  // Public API for getting performance metrics
  getMetrics(): HeroPerformanceMetrics {
    return { ...this.metrics };
  }

  getBudget(): PerformanceBudget {
    return { ...this.budget };
  }

  getPerformanceScore(): number {
    const score = Object.keys(this.budget).reduce((acc, key) => {
      const budgetValue = this.budget[key as keyof PerformanceBudget];
      const actualValue = this.metrics[key as keyof HeroPerformanceMetrics] as number;
      const ratio = Math.min(budgetValue / Math.max(actualValue, 1), 1);
      return acc + ratio;
    }, 0);

    return Math.round((score / Object.keys(this.budget).length) * 100);
  }

  // Cleanup
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

export const heroPerformanceMonitor = HeroPerformanceMonitor.getInstance();