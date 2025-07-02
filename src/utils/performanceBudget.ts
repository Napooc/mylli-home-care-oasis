// Performance budget and monitoring
interface PerformanceBudget {
  LCP: number; // Largest Contentful Paint
  FID: number; // First Input Delay
  CLS: number; // Cumulative Layout Shift
  FCP: number; // First Contentful Paint
  TTI: number; // Time to Interactive
}

const PERFORMANCE_BUDGET: PerformanceBudget = {
  LCP: 1500, // 1.5s
  FID: 100,  // 100ms
  CLS: 0.1,  // 0.1
  FCP: 1000, // 1s
  TTI: 3000  // 3s
};

class PerformanceBudgetMonitor {
  private static instance: PerformanceBudgetMonitor;
  private metrics: Partial<PerformanceBudget> = {};

  static getInstance(): PerformanceBudgetMonitor {
    if (!this.instance) {
      this.instance = new PerformanceBudgetMonitor();
    }
    return this.instance;
  }

  private constructor() {
    this.initializeObservers();
  }

  private initializeObservers(): void {
    if (typeof window === 'undefined') return;

    // Monitor LCP
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          if (lastEntry) {
            this.metrics.LCP = lastEntry.startTime;
            this.checkBudget('LCP', lastEntry.startTime);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Monitor FCP
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            this.metrics.FCP = entries[0].startTime;
            this.checkBudget('FCP', entries[0].startTime);
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Monitor CLS
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.metrics.CLS = clsValue;
          this.checkBudget('CLS', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Monitor FID
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            this.metrics.FID = entry.processingStart - entry.startTime;
            this.checkBudget('FID', this.metrics.FID);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

      } catch (error) {
        console.warn('Performance monitoring not fully supported');
      }
    }

    // TTI calculation (simplified)
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.metrics.TTI = performance.now();
        this.checkBudget('TTI', this.metrics.TTI);
      }, 0);
    });
  }

  private checkBudget(metric: keyof PerformanceBudget, value: number): void {
    const budget = PERFORMANCE_BUDGET[metric];
    if (value > budget) {
      console.warn(`⚠️ Performance budget exceeded for ${metric}: ${value.toFixed(2)} > ${budget}`);
      this.triggerOptimizations(metric, value);
    } else {
      console.log(`✅ ${metric} within budget: ${value.toFixed(2)} <= ${budget}`);
    }
  }

  private triggerOptimizations(metric: keyof PerformanceBudget, value: number): void {
    switch (metric) {
      case 'LCP':
        // Trigger image optimization
        this.optimizeImages();
        break;
      case 'CLS':
        // Reduce layout shifts
        this.stabilizeLayout();
        break;
      case 'FID':
        // Reduce main thread blocking
        this.optimizeInteractions();
        break;
    }
  }

  private optimizeImages(): void {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach((img: any) => {
      if (img.loading !== 'eager') {
        img.loading = 'eager';
      }
    });
  }

  private stabilizeLayout(): void {
    // Add explicit dimensions to images without them
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach((img: any) => {
      if (img.naturalWidth && img.naturalHeight) {
        img.width = img.naturalWidth;
        img.height = img.naturalHeight;
      }
    });
  }

  private optimizeInteractions(): void {
    // Debounce heavy event handlers
    console.log('🔧 Optimizing interactions for better FID');
  }

  getMetrics(): Partial<PerformanceBudget> {
    return { ...this.metrics };
  }

  getBudget(): PerformanceBudget {
    return { ...PERFORMANCE_BUDGET };
  }

  isWithinBudget(): boolean {
    const metrics = this.getMetrics();
    const budget = this.getBudget();
    
    return Object.entries(metrics).every(([key, value]) => {
      const budgetValue = budget[key as keyof PerformanceBudget];
      return value <= budgetValue;
    });
  }
}

export const performanceBudget = PerformanceBudgetMonitor.getInstance();