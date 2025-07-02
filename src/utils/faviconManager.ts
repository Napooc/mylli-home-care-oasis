// iOS Safari Favicon Manager - Enhanced for iOS Compatibility
// Ensures proper favicon display on iOS without breaking URLs

export interface FaviconConfig {
  baseUrl: string;
  version: string;
}

export interface FaviconState {
  lastSuccessfulRefresh: number;
  consecutiveFailures: number;
  sessionRefreshCount: number;
  isStable: boolean;
}

export class FaviconManager {
  private config: FaviconConfig;
  private hasInitialized: boolean = false;
  private isRefreshing: boolean = false;
  private lastRefreshTime: number = 0;
  private refreshCount: number = 0;
  private readonly MAX_REFRESHES = 15; // Increased for better iOS compatibility
  private readonly MIN_REFRESH_INTERVAL = 1000; // Reduced for faster response
  private static instance: FaviconManager | null = null;
  private iosRetryCount: number = 0;
  private readonly MAX_IOS_RETRIES = 8; // Increased iOS retries
  private faviconLoadStatus: Map<string, boolean> = new Map();
  private faviconState: FaviconState;
  private progressiveDelays: number[] = [500, 1000, 2000, 3000, 5000]; // Progressive backoff
  private currentDelayIndex: number = 0;

  constructor(config: FaviconConfig) {
    this.config = config;
    this.faviconState = this.loadFaviconState();
  }

  static getInstance(): FaviconManager {
    if (!FaviconManager.instance) {
      FaviconManager.instance = new FaviconManager({
        baseUrl: '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png',
        version: '2024_ios_progressive_v4' // Updated version
      });
    }
    return FaviconManager.instance;
  }

  // Service Worker integration for cache management
  private async refreshServiceWorkerCache(): Promise<void> {
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        console.log('🔄 Requesting service worker favicon cache refresh...');
        navigator.serviceWorker.controller.postMessage({
          type: 'REFRESH_FAVICON_CACHE'
        });
      }
    } catch (error) {
      console.warn('⚠️ Service worker cache refresh failed:', error);
    }
  }

  // Session-based favicon state management
  private loadFaviconState(): FaviconState {
    const stored = sessionStorage.getItem('mylli-favicon-state');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log('📊 Loaded favicon state:', parsed);
        return parsed;
      } catch (e) {
        console.warn('⚠️ Failed to parse stored favicon state');
      }
    }
    
    const defaultState = {
      lastSuccessfulRefresh: 0,
      consecutiveFailures: 0,
      sessionRefreshCount: 0,
      isStable: false
    };
    console.log('📊 Using default favicon state');
    return defaultState;
  }

  private saveFaviconState(): void {
    try {
      sessionStorage.setItem('mylli-favicon-state', JSON.stringify(this.faviconState));
      console.log('💾 Saved favicon state:', this.faviconState);
    } catch (e) {
      console.warn('⚠️ Failed to save favicon state');
    }
  }

  private generateSessionId(): string {
    let sessionId = sessionStorage.getItem('mylli-favicon-session');
    if (!sessionId) {
      sessionId = `ios_progressive_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('mylli-favicon-session', sessionId);
    }
    return sessionId;
  }

  // Enhanced iOS detection with iPad Pro support
  private isIOS(): boolean {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    
    // Comprehensive iOS detection
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) || 
                       (platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
                       /Macintosh/.test(userAgent) && 'ontouchend' in document;
    
    console.log(`🔍 iOS Detection: ${isIOSDevice ? 'iOS detected' : 'Not iOS'} - UA: ${userAgent.substring(0, 50)}...`);
    return isIOSDevice;
  }

  // Enhanced Safari detection including WebKit
  private isSafari(): boolean {
    const userAgent = navigator.userAgent;
    const isSafariBrowser = (/Safari/.test(userAgent) && 
                           !/Chrome|CriOS|FxiOS|Edge|EdgiOS/.test(userAgent)) ||
                           /WebKit/.test(userAgent) && !/Chrome/.test(userAgent);
    
    console.log(`🔍 Safari Detection: ${isSafariBrowser ? 'Safari/WebKit detected' : 'Not Safari'}`);
    return isSafariBrowser;
  }

  // Progressive retry logic with backoff
  private canRefresh(): boolean {
    const now = Date.now();
    const timeSinceLastRefresh = now - this.lastRefreshTime;
    
    // More lenient refresh conditions for iOS
    const basicConditions = (
      !this.isRefreshing &&
      this.refreshCount < this.MAX_REFRESHES &&
      timeSinceLastRefresh > this.MIN_REFRESH_INTERVAL
    );

    // Progressive backoff for failed attempts
    if (this.faviconState.consecutiveFailures > 0) {
      const requiredDelay = this.progressiveDelays[Math.min(this.currentDelayIndex, this.progressiveDelays.length - 1)];
      const canRetryAfterBackoff = timeSinceLastRefresh > requiredDelay;
      
      console.log(`🔄 Progressive backoff check: ${canRetryAfterBackoff} (failures: ${this.faviconState.consecutiveFailures}, delay: ${requiredDelay}ms, elapsed: ${timeSinceLastRefresh}ms)`);
      
      return basicConditions && canRetryAfterBackoff;
    }

    console.log(`🔄 Can refresh check: ${basicConditions} (count: ${this.refreshCount}/${this.MAX_REFRESHES}, time: ${timeSinceLastRefresh}ms)`);
    return basicConditions;
  }

  private cleanURL(): void {
    const currentUrl = window.location.href;
    
    // Check for any unwanted hash fragments or query parameters
    if (currentUrl.includes('#') || currentUrl.includes('%23') || 
        currentUrl.includes('ios-favicon') || currentUrl.includes('favicon-refresh')) {
      console.log('🧹 Cleaning URL fragments...');
      
      // Extract clean base URL without any fragments
      let cleanURL = currentUrl.split('#')[0];
      cleanURL = cleanURL.replace(/%23[^&]*/g, '');
      cleanURL = cleanURL.replace(/ios-favicon[^&]*/g, '');
      cleanURL = cleanURL.replace(/favicon-refresh[^&]*/g, '');
      cleanURL = cleanURL.replace(/[?&]v=[^&]*/g, '');
      cleanURL = cleanURL.replace(/[?&]session=[^&]*/g, '');
      cleanURL = cleanURL.replace(/[?&]ios=[^&]*/g, '');
      cleanURL = cleanURL.replace(/[?&]t=[^&]*/g, '');
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

  // Generate iOS-specific cache-busting URL with session persistence
  private generateIOSFaviconUrl(): string {
    const baseUrl = this.config.baseUrl;
    const timestamp = Date.now();
    const sessionId = this.generateSessionId();
    
    // iOS-specific cache busting with session tracking
    return `${baseUrl}?ios=1&t=${timestamp}&s=${sessionId}&r=${this.faviconState.sessionRefreshCount}`;
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
    
    // Enhanced load event handling with state tracking
    link.addEventListener('load', () => {
      this.faviconLoadStatus.set(rel, true);
      this.faviconState.consecutiveFailures = 0; // Reset failures on success
      this.faviconState.lastSuccessfulRefresh = Date.now();
      this.faviconState.isStable = true;
      this.currentDelayIndex = 0; // Reset backoff
      this.saveFaviconState();
      console.log(`✅ Favicon loaded successfully: ${rel}`);
    });
    
    link.addEventListener('error', () => {
      this.faviconLoadStatus.set(rel, false);
      this.faviconState.consecutiveFailures++;
      this.faviconState.isStable = false;
      this.currentDelayIndex = Math.min(this.currentDelayIndex + 1, this.progressiveDelays.length - 1);
      this.saveFaviconState();
      console.warn(`❌ Favicon failed to load: ${rel} (failures: ${this.faviconState.consecutiveFailures})`);
      
      // Progressive retry with backoff for iOS
      if (this.isIOS() && this.iosRetryCount < this.MAX_IOS_RETRIES) {
        this.iosRetryCount++;
        const retryDelay = this.progressiveDelays[this.currentDelayIndex] || 5000;
        console.log(`🔄 Retrying iOS favicon load (attempt ${this.iosRetryCount}) after ${retryDelay}ms`);
        setTimeout(() => {
          link.href = this.config.baseUrl; // Fallback to clean URL
        }, retryDelay);
      }
    });
    
    return link;
  }

  // Enhanced favicon preloading with network awareness
  private preloadFavicon(): Promise<void> {
    return new Promise((resolve) => {
      const img = new Image();
      const startTime = Date.now();
      
      img.onload = () => {
        const loadTime = Date.now() - startTime;
        console.log(`✅ Favicon preloaded successfully in ${loadTime}ms`);
        resolve();
      };
      
      img.onerror = () => {
        const loadTime = Date.now() - startTime;
        console.warn(`⚠️ Favicon preload failed after ${loadTime}ms, continuing anyway`);
        resolve(); // Continue even if preload fails
      };
      
      // Add timeout for slow connections
      setTimeout(() => {
        console.warn('⏰ Favicon preload timeout, continuing anyway');
        resolve();
      }, 5000);
      
      img.src = this.config.baseUrl;
    });
  }

  public async setupIOSFavicons(): Promise<void> {
    if (!this.canRefresh()) {
      console.log('🛑 iOS favicon refresh throttled');
      return;
    }

    console.log(`🏥 Setting up healthcare iOS favicons (attempt ${this.refreshCount + 1}/${this.MAX_REFRESHES}, session: ${this.faviconState.sessionRefreshCount})`);
    
    this.isRefreshing = true;
    this.refreshCount++;
    this.faviconState.sessionRefreshCount++;
    this.lastRefreshTime = Date.now();
    
    try {
      // Step 1: Refresh service worker cache for iOS
      if (this.isIOS() && this.isSafari()) {
        await this.refreshServiceWorkerCache();
      }
      
      // Step 2: Preload favicon with timeout
      await this.preloadFavicon();
      
      // Step 3: Clean URL first
      this.cleanURL();
      
      // Step 4: Clean existing dynamic favicons
      this.removeExistingFavicons();
      
      // Step 5: Progressive delay for iOS Safari
      if (this.isIOS() && this.isSafari()) {
        const setupDelay = Math.min(this.faviconState.consecutiveFailures * 500, 2000);
        if (setupDelay > 0) {
          console.log(`⏳ Progressive setup delay: ${setupDelay}ms`);
          await new Promise(resolve => setTimeout(resolve, setupDelay));
        }
      }
      
      // Step 6: Create new favicon elements with iOS optimization
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
      
      // Step 7: Update iOS meta tags
      this.updateIOSMetaTags();
      
      // Step 8: Save state
      this.saveFaviconState();
      
      console.log('✅ Healthcare iOS favicons installed successfully');
      
    } catch (error) {
      console.error('❌ Error setting up iOS favicons:', error);
      this.faviconState.consecutiveFailures++;
      this.saveFaviconState();
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
    console.log('🏥 Initializing enhanced iOS-compatible favicon system with service worker integration...');
    
    // Clean URL immediately
    this.cleanURL();
    
    // Initial setup with adaptive delay based on state
    const initialDelay = this.faviconState.isStable ? 1000 : 2000;
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => this.setupIOSFavicons(), initialDelay);
      });
    } else {
      setTimeout(() => this.setupIOSFavicons(), initialDelay);
    }
    
    // Enhanced event listeners with progressive retry
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isIOS() && this.isSafari() && this.canRefresh()) {
        console.log('👁️ Page visibility changed, progressive iOS favicon refresh...');
        const delay = this.faviconState.isStable ? 1000 : 2000;
        setTimeout(() => {
          if (this.canRefresh()) {
            this.setupIOSFavicons();
          }
        }, delay);
      }
    });
    
    // Enhanced window focus handling
    window.addEventListener('focus', () => {
      if (this.isIOS() && this.isSafari() && this.canRefresh()) {
        console.log('🎯 Window focused, progressive iOS favicon refresh...');
        const delay = this.faviconState.consecutiveFailures > 0 ? 3000 : 1500;
        setTimeout(() => {
          if (this.canRefresh()) {
            this.setupIOSFavicons();
          }
        }, delay);
      }
    });
    
    // Enhanced page navigation handling
    window.addEventListener('pageshow', (event) => {
      if (this.isIOS() && this.isSafari() && this.canRefresh()) {
        console.log(`📄 Page shown (persisted: ${event.persisted}), progressive iOS favicon refresh...`);
        const delay = event.persisted ? 2000 : 1000;
        setTimeout(() => {
          if (this.canRefresh()) {
            this.setupIOSFavicons();
          }
        }, delay);
      }
    });

    // Additional stability check
    setInterval(() => {
      if (this.isIOS() && this.isSafari() && !this.faviconState.isStable && this.canRefresh()) {
        console.log('🔄 Stability check: attempting favicon refresh...');
        this.setupIOSFavicons();
      }
    }, 30000); // Check every 30 seconds for unstable states
  }

  public resetRefreshLimits(): void {
    this.refreshCount = 0;
    this.lastRefreshTime = 0;
    this.isRefreshing = false;
    this.iosRetryCount = 0;
    this.currentDelayIndex = 0;
    this.faviconLoadStatus.clear();
    
    // Reset favicon state
    this.faviconState = {
      lastSuccessfulRefresh: 0,
      consecutiveFailures: 0,
      sessionRefreshCount: 0,
      isStable: false
    };
    this.saveFaviconState();
    
    console.log('🔄 Healthcare favicon refresh limits and state reset');
  }

  public cleanURLFragments(): void {
    this.cleanURL();
  }

  // Enhanced diagnostic method
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
      lastRefreshTime: new Date(this.lastRefreshTime).toLocaleTimeString(),
      faviconState: this.faviconState,
      currentDelayIndex: this.currentDelayIndex,
      nextRetryDelay: this.progressiveDelays[this.currentDelayIndex] || 'max',
      sessionId: this.generateSessionId(),
      serviceWorkerStatus: 'serviceWorker' in navigator ? 'supported' : 'not supported',
      version: this.config.version
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
