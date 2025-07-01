
// iOS Safari Favicon Manager - Simplified and iOS-Optimized
// Focuses on static favicon management without URL manipulation

export interface FaviconConfig {
  baseUrl: string;
  version: string;
}

export class FaviconManager {
  private config: FaviconConfig;
  private hasInitialized: boolean = false;
  private loadingPromises: Map<string, Promise<boolean>> = new Map();
  private static instance: FaviconManager | null = null;

  constructor(config: FaviconConfig) {
    this.config = config;
  }

  static getInstance(): FaviconManager {
    if (!FaviconManager.instance) {
      FaviconManager.instance = new FaviconManager({
        baseUrl: '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png',
        version: 'v2024_healthcare_stable'
      });
    }
    return FaviconManager.instance;
  }

  private isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  private isSafari(): boolean {
    return /Safari/.test(navigator.userAgent) && !/Chrome|CriOS|FxiOS/.test(navigator.userAgent);
  }

  // Phase 3: Favicon loading verification
  private async verifyFaviconLoad(url: string): Promise<boolean> {
    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!;
    }

    const promise = new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = () => {
        console.log('✅ Favicon loaded successfully:', url);
        resolve(true);
      };
      img.onerror = () => {
        console.warn('❌ Favicon failed to load:', url);
        resolve(false);
      };
      // Set timeout for loading
      setTimeout(() => {
        console.warn('⏱️ Favicon loading timeout:', url);
        resolve(false);
      }, 5000);
      img.src = url;
    });

    this.loadingPromises.set(url, promise);
    return promise;
  }

  // Phase 4: iOS-specific debugging and monitoring
  private logIOSFaviconStatus(): void {
    if (!this.isIOS()) return;

    console.log('🍎 iOS Favicon Status Check:');
    console.log('- iOS Version:', navigator.userAgent);
    console.log('- Safari:', this.isSafari());
    
    const appleIcons = document.querySelectorAll('link[rel*="apple-touch-icon"]');
    const standardIcons = document.querySelectorAll('link[rel="icon"]');
    
    console.log('- Apple Touch Icons:', appleIcons.length);
    console.log('- Standard Icons:', standardIcons.length);
    
    appleIcons.forEach((icon, index) => {
      const link = icon as HTMLLinkElement;
      console.log(`- Apple Icon ${index + 1}:`, {
        sizes: link.sizes?.value || 'default',
        href: link.href,
        loaded: !link.href.includes('#')
      });
    });
  }

  // Phase 2: Ensure proper iOS favicon sizing and meta tags
  private validateIOSFavicons(): boolean {
    const requiredSizes = ['180x180', '152x152', '120x120', '76x76'];
    const appleIcons = document.querySelectorAll('link[rel*="apple-touch-icon"]');
    
    let hasAllSizes = true;
    requiredSizes.forEach(size => {
      const hasSize = Array.from(appleIcons).some(icon => 
        (icon as HTMLLinkElement).sizes?.value === size
      );
      if (!hasSize) {
        console.warn(`❌ Missing iOS favicon size: ${size}`);
        hasAllSizes = false;
      }
    });

    return hasAllSizes;
  }

  // Phase 3: Handle offline scenarios with fallback
  private addFaviconFallback(): void {
    // Create a simple colored favicon as fallback
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Draw a simple blue circle as fallback
      ctx.fillStyle = '#1E88E5';
      ctx.beginPath();
      ctx.arc(16, 16, 12, 0, 2 * Math.PI);
      ctx.fill();
      
      // Add white cross (medical symbol)
      ctx.fillStyle = 'white';
      ctx.fillRect(14, 8, 4, 16);
      ctx.fillRect(8, 14, 16, 4);
      
      const fallbackUrl = canvas.toDataURL('image/png');
      
      // Store fallback for emergency use
      sessionStorage.setItem('mylli-favicon-fallback', fallbackUrl);
      console.log('💾 Favicon fallback created and stored');
    }
  }

  // Phase 1 & 2: Simplified iOS favicon setup
  public async initializeIOSFavicons(): Promise<void> {
    if (this.hasInitialized) return;

    console.log('🏥 Initializing simplified iOS favicon system...');
    
    // Phase 4: Log iOS status
    this.logIOSFaviconStatus();
    
    // Phase 2: Validate existing favicons
    const isValid = this.validateIOSFavicons();
    if (!isValid) {
      console.warn('⚠️ Some iOS favicon sizes are missing');
    }

    // Phase 3: Verify favicon loading
    const faviconLoaded = await this.verifyFaviconLoad(this.config.baseUrl);
    
    if (!faviconLoaded) {
      console.warn('⚠️ Main favicon failed to load, setting up fallback...');
      this.addFaviconFallback();
    }

    // Phase 3: Update iOS meta tags for better caching
    this.updateIOSMetaTags();
    
    this.hasInitialized = true;
    console.log('✅ iOS favicon system initialized successfully');
  }

  private updateIOSMetaTags(): void {
    const metaUpdates = [
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'Mylli Services' },
      { name: 'theme-color', content: '#1E88E5' },
      // Phase 3: Add caching hints
      { httpEquiv: 'Cache-Control', content: 'public, max-age=31536000' }
    ];
    
    metaUpdates.forEach(({ name, httpEquiv, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[http-equiv="${httpEquiv}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name) meta.name = name;
        if (httpEquiv) meta.httpEquiv = httpEquiv;
        document.head.appendChild(meta);
      }
      meta.content = content;
    });
  }

  // Phase 4: Public monitoring method
  public monitorFaviconHealth(): void {
    setInterval(() => {
      if (this.isIOS() && this.isSafari()) {
        this.logIOSFaviconStatus();
      }
    }, 60000); // Check every minute
  }

  // Phase 1: Simplified initialization without URL manipulation
  public initialize(): void {
    console.log('🏥 Starting simplified favicon system...');
    
    // Phase 3: Create fallback immediately
    this.addFaviconFallback();
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => this.initializeIOSFavicons(), 500);
      });
    } else {
      setTimeout(() => this.initializeIOSFavicons(), 500);
    }
    
    // Phase 4: Start monitoring
    if (this.isIOS()) {
      this.monitorFaviconHealth();
    }
  }

  // Phase 4: Health check method
  public performHealthCheck(): Promise<boolean> {
    return this.verifyFaviconLoad(this.config.baseUrl);
  }
}

// Export singleton and utility functions
export const faviconManager = FaviconManager.getInstance();
export const initializeFaviconManager = () => faviconManager.initialize();
export const checkFaviconHealth = () => faviconManager.performHealthCheck();

// Phase 1: Remove URL cleaning functions to prevent conflicts
// Removed: setupIOSFavicons, resetFaviconLimits, cleanURLFragments
