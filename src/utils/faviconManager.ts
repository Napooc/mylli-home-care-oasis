// iOS Safari Favicon Manager - Enhanced for iOS Compatibility
// Ensures proper favicon display on iOS without breaking URLs

export interface FaviconConfig {
  baseUrl: string;
  version: string;
}

export class FaviconManager {
  private config: FaviconConfig;
  private hasInitialized: boolean = false;
  private isRefreshing: boolean = false;
  private lastRefreshTime: number = 0;
  private refreshCount: number = 0;
  private readonly MAX_REFRESHES = 8; // Increased for iOS
  private readonly MIN_REFRESH_INTERVAL = 2000; // Reduced for iOS
  private static instance: FaviconManager | null = null;
  private iosRetryCount: number = 0;
  private readonly MAX_IOS_RETRIES = 5;
  private faviconLoadStatus: Map<string, boolean> = new Map();

  constructor(config: FaviconConfig) {
    this.config = config;
  }

  static getInstance(): FaviconManager {
    if (!FaviconManager.instance) {
      FaviconManager.instance = new FaviconManager({
        baseUrl: '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png',
        version: '2024_ios_optimized_v2'
      });
    }
    return FaviconManager.instance;
  }

  private generateSessionId(): string {
    let sessionId = sessionStorage.getItem('mylli-favicon-session');
    if (!sessionId) {
      sessionId = `ios_optimized_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('mylli-favicon-session', sessionId);
    }
    return sessionId;
  }

  // Enhanced iOS detection
  private isIOS(): boolean {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    
    // Check for iOS devices
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) || 
                       (platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPad Pro detection
    
    console.log(`🔍 iOS Detection: ${isIOSDevice ? 'iOS detected' : 'Not iOS'} - UA: ${userAgent.substring(0, 50)}...`);
    return isIOSDevice;
  }

  // Enhanced Safari detection
  private isSafari(): boolean {
    const userAgent = navigator.userAgent;
    const isSafariBrowser = /Safari/.test(userAgent) && 
                           !/Chrome|CriOS|FxiOS|Edge|EdgiOS/.test(userAgent);
    
    console.log(`🔍 Safari Detection: ${isSafariBrowser ? 'Safari detected' : 'Not Safari'}`);
    return isSafariBrowser;
  }

  private canRefresh(): boolean {
    const now = Date.now();
    const timeSinceLastRefresh = now - this.lastRefreshTime;
    
    // More lenient for iOS
    const canRefreshNow = (
      !this.isRefreshing &&
      this.refreshCount < this.MAX_REFRESHES &&
      timeSinceLastRefresh > this.MIN_REFRESH_INTERVAL
    );

    console.log(`🔄 Can refresh check: ${canRefreshNow} (count: ${this.refreshCount}/${this.MAX_REFRESHES}, time: ${timeSinceLastRefresh}ms)`);
    return canRefreshNow;
  }

  private cleanURL(): void {
    const currentUrl = window.location.href;
    
    // Check for any unwanted hash fragments
    if (currentUrl.includes('#') || currentUrl.includes('%23')) {
      console.log('🧹 Cleaning URL fragments...');
      
      // Extract clean base URL without any fragments
      let cleanURL = currentUrl.split('#')[0];
      cleanURL = cleanURL.replace(/%23[^&]*/g, '');
      cleanURL = cleanURL.replace(/ios-favicon-refresh/g, '');
      cleanURL = cleanURL.replace(/[?&]v=[^&]*/g, '');
      cleanURL = cleanURL.replace(/[?&]session=[^&]*/g, '');
      cleanURL = cleanURL.replace(/[?&]ios=[^&]*/g, '');
      cleanURL = cleanURL.replace(/[?&]$/, '');
      
      // Use replaceState to avoid page reload
      window.history.replaceState(null, '', cleanURL);
      console.log('✅ URL cleaned to:', cleanURL);
    }
  }

  private removeExistingFavicons(): void {
    const selectors = [
      'link[rel*="icon"]',
      'link[rel*="apple-touch-icon"]',
      'link[rel="shortcut icon"]'
    ];
    
    let removedCount = 0;
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (element.getAttribute('data-mylli-favicon') || 
            element.getAttribute('data-mylli-healthcare-favicon')) {
          element.remove();
          removedCount++;
        }
      });
    });
    
    console.log(`🗑️ Removed ${removedCount} existing dynamic favicon elements`);
  }

  // Generate iOS-specific cache-busting URL
  private generateIOSFaviconUrl(): string {
    const baseUrl = this.config.baseUrl;
    const timestamp = Date.now();
    const sessionId = this.generateSessionId();
    
    // iOS-specific cache busting
    return `${baseUrl}?ios=1&t=${timestamp}&s=${sessionId}`;
  }

  private createFaviconElement(rel: string, sizes?: string): HTMLLinkElement {
    const link = document.createElement('link');
    link.rel = rel;
    
    if (sizes) {
      link.setAttribute('sizes', sizes);
    }
    
    // Use iOS-optimized URL for iOS devices, clean URL for others
    if (this.isIOS() && this.isSafari()) {
      link.href = this.generateIOSFaviconUrl();
      console.log(`🍎 Created iOS favicon element: ${rel} with cache-busting`);
    } else {
      link.href = this.config.baseUrl;
      console.log(`🌐 Created standard favicon element: ${rel}`);
    }
    
    if (rel.includes('apple-touch-icon')) {
      link.setAttribute('data-mylli-healthcare-favicon', 'true');
    } else {
      link.setAttribute('data-mylli-favicon', 'true');
      link.type = 'image/png';
    }
    
    // Add load event listener for verification
    link.addEventListener('load', () => {
      this.faviconLoadStatus.set(rel, true);
      console.log(`✅ Favicon loaded successfully: ${rel}`);
    });
    
    link.addEventListener('error', () => {
      this.faviconLoadStatus.set(rel, false);
      console.warn(`❌ Favicon failed to load: ${rel}`);
      
      // Retry with fallback URL for iOS
      if (this.isIOS() && this.iosRetryCount < this.MAX_IOS_RETRIES) {
        this.iosRetryCount++;
        console.log(`🔄 Retrying iOS favicon load (attempt ${this.iosRetryCount})`);
        setTimeout(() => {
          link.href = this.config.baseUrl; // Fallback to clean URL
        }, 1000);
      }
    });
    
    return link;
  }

  // Enhanced favicon preloading
  private preloadFavicon(): Promise<void> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        console.log('✅ Favicon preloaded successfully');
        resolve();
      };
      img.onerror = () => {
        console.warn('⚠️ Favicon preload failed, continuing anyway');
        resolve(); // Continue even if preload fails
      };
      img.src = this.config.baseUrl;
    });
  }

  public async setupIOSFavicons(): Promise<void> {
    if (!this.canRefresh()) {
      console.log('🛑 iOS favicon refresh throttled');
      return;
    }

    console.log(`🏥 Setting up healthcare iOS favicons (attempt ${this.refreshCount + 1}/${this.MAX_REFRESHES})`);
    
    this.isRefreshing = true;
    this.refreshCount++;
    this.lastRefreshTime = Date.now();
    
    try {
      // Step 1: Preload favicon
      await this.preloadFavicon();
      
      // Step 2: Clean URL first
      this.cleanURL();
      
      // Step 3: Clean existing dynamic favicons
      this.removeExistingFavicons();
      
      // Step 4: Create new favicon elements with iOS optimization
      const fragment = document.createDocumentFragment();
      
      // iOS Apple Touch Icons (priority order for iOS)
      fragment.appendChild(this.createFaviconElement('apple-touch-icon')); // Default 180x180 - HIGHEST PRIORITY
      fragment.appendChild(this.createFaviconElement('apple-touch-icon', '180x180'));
      fragment.appendChild(this.createFaviconElement('apple-touch-icon', '152x152'));
      fragment.appendChild(this.createFaviconElement('apple-touch-icon', '120x120'));
      fragment.appendChild(this.createFaviconElement('apple-touch-icon', '76x76'));
      
      // Standard favicons for fallback
      fragment.appendChild(this.createFaviconElement('icon', '32x32'));
      fragment.appendChild(this.createFaviconElement('icon', '16x16'));
      fragment.appendChild(this.createFaviconElement('shortcut icon'));
      
      // Add all to head at once for better performance
      document.head.appendChild(fragment);
      
      // Step 5: Update iOS meta tags
      this.updateIOSMetaTags();
      
      console.log('✅ Healthcare iOS favicons installed successfully');
      
    } catch (error) {
      console.error('❌ Error setting up iOS favicons:', error);
    } finally {
      this.isRefreshing = false;
      this.hasInitialized = true;
    }
  }

  private updateIOSMetaTags(): void {
    const metaUpdates = [
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'Mylli Services' },
      { name: 'theme-color', content: '#1E88E5' }
    ];
    
    metaUpdates.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    });
    
    console.log('📱 iOS meta tags updated');
  }

  public initialize(): void {
    console.log('🏥 Initializing enhanced iOS-compatible favicon system...');
    
    // Clean URL immediately
    this.cleanURL();
    
    // Initial setup with delay for better iOS compatibility
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => this.setupIOSFavicons(), 1500); // Increased delay for iOS
      });
    } else {
      setTimeout(() => this.setupIOSFavicons(), 1500);
    }
    
    // Enhanced event listeners for iOS Safari
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isIOS() && this.isSafari() && this.canRefresh()) {
        console.log('👁️ Page visibility changed, refreshing iOS favicons...');
        setTimeout(() => {
          if (this.canRefresh()) {
            this.setupIOSFavicons();
          }
        }, 1000);
      }
    });
    
    // Handle window focus for iOS
    window.addEventListener('focus', () => {
      if (this.isIOS() && this.isSafari() && this.canRefresh()) {
        console.log('🎯 Window focused, refreshing iOS favicons...');
        setTimeout(() => {
          if (this.canRefresh()) {
            this.setupIOSFavicons();
          }
        }, 2000);
      }
    });
    
    // Handle page navigation for iOS
    window.addEventListener('pageshow', (event) => {
      if (this.isIOS() && this.isSafari() && this.canRefresh()) {
        console.log(`📄 Page shown (persisted: ${event.persisted}), refreshing iOS favicons...`);
        setTimeout(() => {
          if (this.canRefresh()) {
            this.setupIOSFavicons();
          }
        }, 1000);
      }
    });
  }

  public resetRefreshLimits(): void {
    this.refreshCount = 0;
    this.lastRefreshTime = 0;
    this.isRefreshing = false;
    this.iosRetryCount = 0;
    this.faviconLoadStatus.clear();
    console.log('🔄 Healthcare favicon refresh limits reset');
  }

  public cleanURLFragments(): void {
    this.cleanURL();
  }

  // Diagnostic method for debugging
  public getDiagnostics(): any {
    return {
      isIOS: this.isIOS(),
      isSafari: this.isSafari(),
      refreshCount: this.refreshCount,
      maxRefreshes: this.MAX_REFRESHES,
      isRefreshing: this.isRefreshing,
      hasInitialized: this.hasInitialized,
      iosRetryCount: this.iosRetryCount,
      faviconLoadStatus: Object.fromEntries(this.faviconLoadStatus),
      lastRefreshTime: new Date(this.lastRefreshTime).toLocaleTimeString()
    };
  }
}

// Export singleton and utility functions
export const faviconManager = FaviconManager.getInstance();
export const setupIOSFavicons = () => faviconManager.setupIOSFavicons();
export const initializeFaviconManager = () => faviconManager.initialize();
export const resetFaviconLimits = () => faviconManager.resetRefreshLimits();
export const cleanURLFragments = () => faviconManager.cleanURLFragments();
export const getFaviconDiagnostics = () => faviconManager.getDiagnostics();
