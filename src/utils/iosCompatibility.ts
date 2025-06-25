
// iOS Safari compatibility fixes and optimizations

export class IOSCompatibility {
  private static instance: IOSCompatibility;
  
  static getInstance(): IOSCompatibility {
    if (!IOSCompatibility.instance) {
      IOSCompatibility.instance = new IOSCompatibility();
    }
    return IOSCompatibility.instance;
  }

  isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  isSafari(): boolean {
    return /Safari/.test(navigator.userAgent) && !/Chrome|CriOS|FxiOS/.test(navigator.userAgent);
  }

  getIOSVersion(): number {
    const match = navigator.userAgent.match(/OS (\d+)_/);
    return match ? parseInt(match[1], 10) : 0;
  }

  // Fix iOS viewport issues
  fixIOSViewport(): void {
    if (!this.isIOS()) return;

    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      );
    }

    // Fix iOS Safari 100vh issue
    const setVHProperty = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVHProperty();
    window.addEventListener('resize', setVHProperty);
    window.addEventListener('orientationchange', () => {
      setTimeout(setVHProperty, 100);
    });
  }

  // Fix iOS touch and gesture handling
  fixIOSTouchEvents(): void {
    if (!this.isIOS()) return;

    // Prevent iOS Safari bounce effect
    document.addEventListener('touchmove', (e) => {
      if (e.scale !== 1) {
        e.preventDefault();
      }
    }, { passive: false });

    // Fix iOS click delay
    document.addEventListener('touchstart', () => {}, { passive: true });

    // Fix iOS keyboard issues
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        setTimeout(() => {
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      });
    });
  }

  // Optimize iOS performance
  optimizeIOSPerformance(): void {
    if (!this.isIOS()) return;

    // Enable hardware acceleration for iOS
    document.body.style.transform = 'translateZ(0)';
    document.body.style.webkitTransform = 'translateZ(0)';

    // Fix iOS animation performance
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-transform: translateZ(0);
        -webkit-backface-visibility: hidden;
        -webkit-perspective: 1000;
      }
    `;
    document.head.appendChild(style);

    // Optimize scrolling for iOS
    document.body.style.webkitOverflowScrolling = 'touch';
  }

  // Fix iOS memory management
  fixIOSMemoryIssues(): void {
    if (!this.isIOS()) return;

    // Clear unused timers and intervals
    let maxTimerId = setTimeout(() => {}, 0);
    for (let i = 1; i <= maxTimerId; i++) {
      clearTimeout(i);
    }

    // Optimize garbage collection for iOS
    if (window.gc) {
      setInterval(() => {
        window.gc();
      }, 30000);
    }
  }

  // Fix iOS JavaScript engine issues
  fixIOSJavaScriptIssues(): void {
    if (!this.isIOS()) return;

    // Polyfill for iOS date issues
    const originalDate = Date;
    window.Date = class extends originalDate {
      constructor(...args: any[]) {
        if (args.length === 1 && typeof args[0] === 'string') {
          // Fix iOS date parsing issues
          const dateString = args[0].replace(/-/g, '/');
          super(dateString);
        } else {
          super(...args);
        }
      }
    } as any;

    // Fix iOS Promise issues
    if (!window.Promise.prototype.finally) {
      window.Promise.prototype.finally = function(callback: () => void) {
        return this.then(
          (value) => Promise.resolve(callback()).then(() => value),
          (reason) => Promise.resolve(callback()).then(() => { throw reason; })
        );
      };
    }
  }

  // Fix iOS storage issues
  fixIOSStorageIssues(): void {
    if (!this.isIOS()) return;

    try {
      // Test if localStorage is available in iOS private mode
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
    } catch (e) {
      // Fallback for iOS private browsing
      const storage: { [key: string]: string } = {};
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: (key: string) => storage[key] || null,
          setItem: (key: string, value: string) => storage[key] = value,
          removeItem: (key: string) => delete storage[key],
          clear: () => Object.keys(storage).forEach(key => delete storage[key])
        }
      });
    }
  }

  // Initialize all iOS fixes
  initializeIOSFixes(): void {
    if (!this.isIOS()) return;

    console.log('🍎 Initializing iOS compatibility fixes...');
    
    this.fixIOSViewport();
    this.fixIOSTouchEvents();
    this.optimizeIOSPerformance();
    this.fixIOSMemoryIssues();
    this.fixIOSJavaScriptIssues();
    this.fixIOSStorageIssues();
    
    console.log('✅ iOS compatibility fixes applied');
  }
}

export const iosCompatibility = IOSCompatibility.getInstance();
