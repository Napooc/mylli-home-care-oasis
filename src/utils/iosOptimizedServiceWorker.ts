
// iOS-optimized service worker registration and management

class IOSServiceWorkerManager {
  private static instance: IOSServiceWorkerManager;
  
  static getInstance(): IOSServiceWorkerManager {
    if (!IOSServiceWorkerManager.instance) {
      IOSServiceWorkerManager.instance = new IOSServiceWorkerManager();
    }
    return IOSServiceWorkerManager.instance;
  }

  isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  async registerIOSOptimizedServiceWorker(): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      console.log('📱 Service Worker not supported');
      return;
    }

    try {
      // Use iOS-specific service worker if on iOS
      const swPath = this.isIOS() ? '/sw-ios-optimized.js' : '/sw-optimized.js';
      
      const registration = await navigator.serviceWorker.register(swPath, {
        scope: '/',
        updateViaCache: 'none'
      });

      console.log('✅ iOS-optimized Service Worker registered:', registration.scope);

      // Handle iOS-specific service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('🔄 New iOS service worker available');
              // Auto-update for iOS without user intervention
              newWorker.postMessage({ action: 'skipWaiting' });
            }
          });
        }
      });

      // Handle iOS service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_UPDATED') {
          console.log('✅ iOS Service Worker updated successfully');
        }
      });

    } catch (error) {
      console.error('❌ iOS Service Worker registration failed:', error);
    }
  }

  // Unregister service worker if needed (for iOS debugging)
  async unregisterServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('🗑️ Service Worker unregistered');
      }
    }
  }
}

export const iosServiceWorkerManager = IOSServiceWorkerManager.getInstance();
