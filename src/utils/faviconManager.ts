// iOS Safari Favicon Manager - Simplified for Performance
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
  private readonly MAX_REFRESHES = 10;
  private readonly MIN_REFRESH_INTERVAL = 1000;
  private static instance: FaviconManager | null = null;
  private iosRetryCount: number = 0;
  private readonly MAX_IOS_RETRIES = 5;
  private faviconLoadStatus: Map<string, boolean> = new Map();
  private faviconState: FaviconState;

  constructor(config: FaviconConfig) {
    this.config = config;
    this.faviconState = this.loadFaviconState();
  }

  static getInstance(): FaviconManager {
    if (!FaviconManager.instance) {
      FaviconManager.instance = new FaviconManager({
        baseUrl: '/lovable-uploads/f8839c98-c2b6-4a1b-86d6-d6858f3f38df.png',
        version: '2024_homecare_logo_v1'
      });
    }
    return FaviconManager.instance;
  }

  private loadFaviconState(): FaviconState {
    const stored = sessionStorage.getItem('mylli-favicon-state');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn('⚠️ Failed to parse stored favicon state');
      }
    }
    
    return {
      lastSuccessfulRefresh: 0,
      consecutiveFailures: 0,
      sessionRefreshCount: 0,
      isStable: false
    };
  }

  private saveFaviconState(): void {
    try {
      sessionStorage.setItem('mylli-favicon-state', JSON.stringify(this.faviconState));
    } catch (e) {
      console.warn('⚠️ Failed to save favicon state');
    }
  }

  private isIOS(): boolean {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    
    return /iPad|iPhone|iPod/.test(userAgent) || 
           (platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  private isSafari(): boolean {
    const userAgent = navigator.userAgent;
    return /Safari/.test(userAgent) && !/Chrome|CriOS|FxiOS|Edge|EdgiOS/.test(userAgent);
  }

  private canRefresh(): boolean {
    const now = Date.now();
    const timeSinceLastRefresh = now - this.lastRefreshTime;
    
    return (
      !this.isRefreshing &&
      this.refreshCount < this.MAX_REFRESHES &&
      timeSinceLastRefresh > this.MIN_REFRESH_INTERVAL
    );
  }

  private cleanURL(): void {
    const currentUrl = window.location.href;
    
    if (currentUrl.includes('#') || currentUrl.includes('%23')) {
      let cleanURL = currentUrl.split('#')[0];
      cleanURL = cleanURL.replace(/%23[^&]*/g, '');
      window.history.replaceState(null, '', cleanURL);
    }
  }

  private removeExistingFavicons(): void {
    const selectors = [
      'link[rel*="icon"]',
      'link[rel*="apple-touch-icon"]',
      'link[rel="shortcut icon"]'
    ];
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (element.getAttribute('data-mylli-favicon')) {
          element.remove();
        }
      });
    });
  }

  private createFaviconElement(rel: string, sizes?: string): HTMLLinkElement {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = this.config.baseUrl;
    
    if (sizes) {
      link.setAttribute('sizes', sizes);
    }
    
    link.setAttribute('data-mylli-favicon', 'true');
    link.type = 'image/png';
    
    link.addEventListener('load', () => {
      this.faviconLoadStatus.set(rel, true);
      this.faviconState.consecutiveFailures = 0;
      this.faviconState.lastSuccessfulRefresh = Date.now();
      this.faviconState.isStable = true;
      this.saveFaviconState();
    });
    
    link.addEventListener('error', () => {
      this.faviconLoadStatus.set(rel, false);
      this.faviconState.consecutiveFailures++;
      this.faviconState.isStable = false;
      this.saveFaviconState();
    });
    
    return link;
  }

  public async setupIOSFavicons(): Promise<void> {
    if (!this.canRefresh()) {
      return;
    }

    this.isRefreshing = true;
    this.refreshCount++;
    this.faviconState.sessionRefreshCount++;
    this.lastRefreshTime = Date.now();
    
    try {
      this.cleanURL();
      this.removeExistingFavicons();
      
      const fragment = document.createDocumentFragment();
      
      // Create favicon elements
      fragment.appendChild(this.createFaviconElement('apple-touch-icon'));
      fragment.appendChild(this.createFaviconElement('apple-touch-icon', '180x180'));
      fragment.appendChild(this.createFaviconElement('icon', '32x32'));
      fragment.appendChild(this.createFaviconElement('icon', '16x16'));
      fragment.appendChild(this.createFaviconElement('shortcut icon'));
      
      document.head.appendChild(fragment);
      this.saveFaviconState();
      
    } catch (error) {
      console.error('❌ Error setting up iOS favicons:', error);
      this.faviconState.consecutiveFailures++;
      this.saveFaviconState();
    } finally {
      this.isRefreshing = false;
      this.hasInitialized = true;
    }
  }

  public initialize(): void {
    this.cleanURL();
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => this.setupIOSFavicons(), 1000);
      });
    } else {
      setTimeout(() => this.setupIOSFavicons(), 1000);
    }
    
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isIOS() && this.isSafari() && this.canRefresh()) {
        setTimeout(() => this.setupIOSFavicons(), 1000);
      }
    });
  }

  public resetRefreshLimits(): void {
    this.refreshCount = 0;
    this.lastRefreshTime = 0;
    this.isRefreshing = false;
    this.iosRetryCount = 0;
    this.faviconLoadStatus.clear();
    
    this.faviconState = {
      lastSuccessfulRefresh: 0,
      consecutiveFailures: 0,
      sessionRefreshCount: 0,
      isStable: false
    };
    this.saveFaviconState();
  }

  public cleanURLFragments(): void {
    this.cleanURL();
  }

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
