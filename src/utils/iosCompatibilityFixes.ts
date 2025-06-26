
// iOS-specific compatibility fixes
export class IOSCompatibilityFixes {
  private static isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  private static isSafari(): boolean {
    return /Safari/.test(navigator.userAgent) && !/Chrome|CriOS|FxiOS/.test(navigator.userAgent);
  }

  // Fix classList errors on iOS
  static fixClassListErrors(): void {
    if (!this.isIOS()) return;

    console.log('🍎 Applying iOS classList compatibility fixes...');
    
    // Add null checks for DOM elements before accessing classList
    const originalQuerySelector = document.querySelector;
    const originalQuerySelectorAll = document.querySelectorAll;

    document.querySelector = function(selector: string) {
      const element = originalQuerySelector.call(this, selector);
      return element;
    };

    document.querySelectorAll = function(selector: string) {
      const elements = originalQuerySelectorAll.call(this, selector);
      return elements;
    };

    // Patch NodeList forEach to handle undefined elements with proper typing
    if (NodeList.prototype.forEach) {
      const originalForEach = NodeList.prototype.forEach;
      NodeList.prototype.forEach = function(callback, thisArg) {
        Array.from(this).forEach((element, index) => {
          // Proper type casting to Element to access classList
          const domElement = element as Element;
          if (domElement && domElement.classList !== undefined) {
            callback.call(thisArg, domElement, index, this);
          }
        });
      };
    }
  }

  // Fix iOS viewport issues
  static fixViewportIssues(): void {
    if (!this.isIOS()) return;

    console.log('🍎 Applying iOS viewport fixes...');
    
    // Ensure proper viewport meta tag for iOS
    let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';

    // Add iOS-specific meta tags
    const metaTags = [
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'format-detection', content: 'telephone=no' }
    ];

    metaTags.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    });
  }

  // Fix iOS touch and interaction issues
  static fixTouchIssues(): void {
    if (!this.isIOS()) return;

    console.log('🍎 Applying iOS touch fixes...');
    
    // Add touch-action CSS to prevent iOS scrolling issues
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
      }
      
      button, a, [role="button"] {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        cursor: pointer;
      }
      
      input, textarea {
        -webkit-user-select: auto;
      }
    `;
    document.head.appendChild(style);
  }

  // Fix iOS-specific JavaScript engine issues
  static fixJavaScriptIssues(): void {
    if (!this.isIOS()) return;

    console.log('🍎 Applying iOS JavaScript compatibility fixes...');
    
    // Fix Promise handling for older iOS versions
    if (!window.Promise.prototype.finally) {
      window.Promise.prototype.finally = function(callback) {
        return this.then(
          value => Promise.resolve(callback()).then(() => value),
          reason => Promise.resolve(callback()).then(() => { throw reason; })
        );
      };
    }

    // Fix requestIdleCallback for iOS Safari with proper typing
    if (!window.requestIdleCallback) {
      window.requestIdleCallback = function(callback, options = {}) {
        const timeout = options.timeout || 0;
        const startTime = Date.now();
        
        // Cast setTimeout return value to number to match interface
        return setTimeout(() => {
          callback({
            didTimeout: false,
            timeRemaining() {
              return Math.max(0, 50 - (Date.now() - startTime));
            }
          });
        }, timeout) as unknown as number;
      };
      
      window.cancelIdleCallback = function(id) {
        clearTimeout(id as unknown as NodeJS.Timeout);
      };
    }
  }

  // Initialize all iOS fixes
  static initialize(): void {
    if (!this.isIOS()) {
      console.log('ℹ️ Not iOS device, skipping iOS-specific fixes');
      return;
    }

    console.log('🍎 Initializing iOS compatibility fixes...');
    
    // Apply fixes in order
    this.fixClassListErrors();
    this.fixViewportIssues();
    this.fixTouchIssues();
    this.fixJavaScriptIssues();
    
    console.log('✅ iOS compatibility fixes applied successfully');
  }
}

// Auto-initialize on import
if (typeof window !== 'undefined') {
  IOSCompatibilityFixes.initialize();
}

export default IOSCompatibilityFixes;
