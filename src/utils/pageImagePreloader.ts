// Ultra-fast page-specific image preloading service
import { ultraFastImageLoader } from './ultraFastImageLoader';

interface PageImageMap {
  [key: string]: string[];
}

// Critical images by page for aggressive preloading
const PAGE_IMAGES: PageImageMap = {
  // Home page critical images
  home: [
    '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png',
    '/lovable-uploads/93fb824b-3948-43af-a313-a54ebaf3ded0.png',
    '/lovable-uploads/0e49a73b-0499-4adb-84fc-7707c6381ef7.png'
  ],
  // Services page images
  services: [
    '/lovable-uploads/93fb824b-3948-43af-a313-a54ebaf3ded0.png',
    '/lovable-uploads/0e49a73b-0499-4adb-84fc-7707c6381ef7.png'
  ],
  // Aide-soignant page images
  'aide-soignant': [
    '/lovable-uploads/faf36ebb-3182-48d2-bee8-b230c9b182eb.png',
    '/lovable-uploads/d2780d4e-04e6-4ff9-8a1f-a54048bb2eb8.png',
    '/lovable-uploads/1154475c-65aa-44df-bcaf-ab3092ac9960.png',
    '/lovable-uploads/0ac5ce88-2b3f-4931-9488-210bc9425794.png',
    '/lovable-uploads/5364c2b1-9466-4ff2-b1bf-f6288e735add.png',
    '/lovable-uploads/da550c48-1c62-4eb0-b6cc-df8d0db5cdd8.png'
  ],
  // Infirmier page images
  infirmier: [
    '/lovable-uploads/9570e5be-c600-4267-a8d7-4ef12d722304.png',
    '/lovable-uploads/b8378166-5f0c-4885-a490-0d24a2bdf1eb.png',
    '/lovable-uploads/71e01351-d096-455c-85cc-a8d9d3c6a6b2.png',
    '/lovable-uploads/da550c48-1c62-4eb0-b6cc-df8d0db5cdd8.png',
    '/lovable-uploads/2f756573-a96c-4061-998c-b25adfae324e.png',
    '/lovable-uploads/bc659d89-2f47-4184-b283-c7f41ba9193c.png'
  ]
};

class PageImagePreloader {
  private static instance: PageImagePreloader;
  private preloadedPages = new Set<string>();
  private isPreloading = false;

  static getInstance(): PageImagePreloader {
    if (!PageImagePreloader.instance) {
      PageImagePreloader.instance = new PageImagePreloader();
    }
    return PageImagePreloader.instance;
  }

  // Aggressively preload images for a specific page
  async preloadPageImages(pageName: string): Promise<void> {
    if (this.preloadedPages.has(pageName) || this.isPreloading) {
      return;
    }

    this.isPreloading = true;
    const images = PAGE_IMAGES[pageName] || [];
    
    if (images.length === 0) {
      this.isPreloading = false;
      return;
    }

    try {
      // Create preload promises with high priority
      const preloadPromises = images.map((src, index) => 
        ultraFastImageLoader.preloadImage(
          src, 
          800, // width
          600, // height  
          index === 0 ? 'high' : 'medium' // First image has highest priority
        )
      );

      // Also create instant link preloads for critical images
      images.slice(0, 3).forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.fetchPriority = 'high';
        link.href = ultraFastImageLoader.optimizeImageUrl(src, 800, 600, 'high');
        document.head.appendChild(link);
      });

      // Wait for all images to preload
      await Promise.all(preloadPromises);
      this.preloadedPages.add(pageName);
    } catch (error) {
      console.warn(`Failed to preload images for page ${pageName}:`, error);
    } finally {
      this.isPreloading = false;
    }
  }

  // Preload critical pages immediately
  async preloadCriticalPages(): Promise<void> {
    const criticalPages = ['home', 'services'];
    await Promise.all(
      criticalPages.map(page => this.preloadPageImages(page))
    );
  }

  // Smart preload based on user navigation patterns
  async smartPreload(currentPage: string): Promise<void> {
    // Preload likely next pages based on current page
    const navigationPatterns = {
      home: ['services', 'aide-soignant', 'infirmier'],
      services: ['aide-soignant', 'infirmier'],
      'aide-soignant': ['services', 'infirmier'],
      infirmier: ['services', 'aide-soignant']
    };

    const nextPages = navigationPatterns[currentPage as keyof typeof navigationPatterns] || [];
    
    // Preload next likely pages in background
    setTimeout(() => {
      nextPages.forEach(page => this.preloadPageImages(page));
    }, 1000);
  }

  // Check if page images are preloaded
  isPagePreloaded(pageName: string): boolean {
    return this.preloadedPages.has(pageName);
  }

  // Get all images for a page
  getPageImages(pageName: string): string[] {
    return PAGE_IMAGES[pageName] || [];
  }
}

export const pageImagePreloader = PageImagePreloader.getInstance();

// Export utility functions
export const preloadPageImages = (pageName: string) => 
  pageImagePreloader.preloadPageImages(pageName);

export const smartPreload = (currentPage: string) => 
  pageImagePreloader.smartPreload(currentPage);

export const isPagePreloaded = (pageName: string) => 
  pageImagePreloader.isPagePreloaded(pageName);