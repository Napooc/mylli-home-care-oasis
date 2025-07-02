
// Advanced resource preloading system for critical assets
interface PreloadOptions {
  priority?: 'high' | 'low' | 'auto';
  crossorigin?: 'anonymous' | 'use-credentials';
  media?: string;
  onload?: () => void;
  onerror?: () => void;
}

class ResourcePreloader {
  private preloadedResources = new Set<string>();
  private preloadQueue: Array<{ href: string; as: string; options?: PreloadOptions }> = [];
  private isProcessing = false;

  // Preload critical CSS
  preloadCSS(href: string, options: PreloadOptions = {}): void {
    this.addToQueue(href, 'style', options);
  }

  // Preload JavaScript modules
  preloadScript(href: string, options: PreloadOptions = {}): void {
    this.addToQueue(href, 'script', options);
  }

  // Preload fonts
  preloadFont(href: string, options: PreloadOptions = {}): void {
    this.addToQueue(href, 'font', {
      ...options,
      crossorigin: 'anonymous' // Fonts require CORS
    });
  }

  // Preload images
  preloadImage(href: string, options: PreloadOptions = {}): void {
    this.addToQueue(href, 'image', options);
  }

  // Add resource to preload queue
  private addToQueue(href: string, as: string, options: PreloadOptions = {}): void {
    if (this.preloadedResources.has(href)) return;

    this.preloadQueue.push({ href, as, options });
    
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  // Process preload queue with priority handling
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.preloadQueue.length === 0) return;

    this.isProcessing = true;

    // Sort queue by priority
    this.preloadQueue.sort((a, b) => {
      const priorityOrder = { high: 3, auto: 2, low: 1 };
      const aPriority = priorityOrder[a.options?.priority || 'auto'];
      const bPriority = priorityOrder[b.options?.priority || 'auto'];
      return bPriority - aPriority;
    });

    while (this.preloadQueue.length > 0) {
      const { href, as, options } = this.preloadQueue.shift()!;
      
      if (this.preloadedResources.has(href)) continue;

      try {
        await this.createPreloadLink(href, as, options);
        this.preloadedResources.add(href);
      } catch (error) {
        console.warn(`Failed to preload ${as}: ${href}`, error);
      }

      // Small delay to prevent blocking
      if (this.preloadQueue.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 5));
      }
    }

    this.isProcessing = false;
  }

  // Create preload link element
  private createPreloadLink(href: string, as: string, options: PreloadOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;

      if (options.priority) {
        link.setAttribute('fetchpriority', options.priority);
      }

      if (options.crossorigin) {
        link.crossOrigin = options.crossorigin;
      }

      if (options.media) {
        link.media = options.media;
      }

      link.onload = () => {
        options.onload?.();
        resolve();
      };

      link.onerror = () => {
        options.onerror?.();
        reject(new Error(`Failed to preload: ${href}`));
      };

      document.head.appendChild(link);
    });
  }

  // Preload critical resources for the application
  preloadCriticalResources(): void {
    console.log('🚀 Preloading critical resources...');

    // Critical CSS (if using external stylesheets)
    // this.preloadCSS('/assets/critical.css', { priority: 'high' });

    // Critical fonts
    this.preloadFont('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', {
      priority: 'high'
    });

    // Critical images
    this.preloadImage('/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png', {
      priority: 'high'
    });

    // Route-based JavaScript chunks (will be created by Vite)
    this.preloadScript('/assets/js/vendor-react.js', { priority: 'high' });
    this.preloadScript('/assets/js/vendor-router.js', { priority: 'high' });
  }

  // Preload resources for specific routes
  preloadRouteResources(route: string): void {
    const routeMap: Record<string, () => void> = {
      '/services': () => {
        this.preloadImage('/lovable-uploads/93fb824b-3948-43af-a313-a54ebaf3ded0.png');
        this.preloadImage('/lovable-uploads/0e49a73b-0499-4adb-84fc-7707c6381ef7.png');
      },
      '/contact': () => {
        this.preloadScript('/assets/js/email.js', { priority: 'low' });
      },
      '/articles': () => {
        this.preloadScript('/assets/js/charts.js', { priority: 'low' });
      }
    };

    routeMap[route]?.();
  }

  // Clear preload cache
  clearCache(): void {
    this.preloadedResources.clear();
    this.preloadQueue = [];
  }

  // Get preload status
  isPreloaded(href: string): boolean {
    return this.preloadedResources.has(href);
  }
}

export const resourcePreloader = new ResourcePreloader();

// CSS optimization utilities
export const optimizeCSS = {
  // Inline critical CSS
  inlineCriticalCSS: (css: string) => {
    const style = document.createElement('style');
    style.textContent = css;
    style.setAttribute('data-critical', 'true');
    document.head.appendChild(style);
  },

  // Load non-critical CSS asynchronously
  loadNonCriticalCSS: (href: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  },

  // Remove unused CSS (placeholder for future implementation)
  removeUnusedCSS: () => {
    console.log('🧹 CSS optimization placeholder - implement PurgeCSS integration');
  }
};
