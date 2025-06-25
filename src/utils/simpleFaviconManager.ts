
// Simplified iOS-compatible favicon manager
export class SimpleFaviconManager {
  private static instance: SimpleFaviconManager | null = null;
  private hasInitialized: boolean = false;

  static getInstance(): SimpleFaviconManager {
    if (!SimpleFaviconManager.instance) {
      SimpleFaviconManager.instance = new SimpleFaviconManager();
    }
    return SimpleFaviconManager.instance;
  }

  private isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  public setupFavicons(): void {
    if (this.hasInitialized) return;
    
    console.log('🏥 Setting up iOS-compatible favicons...');
    
    // Clean URL without causing fragments
    const currentUrl = window.location.href;
    if (currentUrl.includes('#') && !currentUrl.includes('#/')) {
      window.history.replaceState(null, '', currentUrl.split('#')[0]);
    }

    // Setup basic favicons
    this.createFavicon('icon', '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png', '32x32');
    this.createFavicon('apple-touch-icon', '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png', '180x180');
    
    // iOS meta tags
    this.updateMetaTags();
    
    this.hasInitialized = true;
    console.log('✅ iOS-compatible favicons set up successfully');
  }

  private createFavicon(rel: string, href: string, sizes?: string): void {
    // Remove existing favicon of same type
    const existing = document.querySelector(`link[rel="${rel}"]`);
    if (existing) existing.remove();

    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (sizes) link.setAttribute('sizes', sizes);
    document.head.appendChild(link);
  }

  private updateMetaTags(): void {
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
  }

  public initialize(): void {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupFavicons());
    } else {
      this.setupFavicons();
    }
  }
}

export const simpleFaviconManager = SimpleFaviconManager.getInstance();
export const initializeSimpleFavicons = () => simpleFaviconManager.initialize();
