
// Smart preloading system for above-the-fold images
class ImagePreloaderService {
  private preloadedImages = new Set<string>();
  private preloadQueue: Array<{ src: string; priority: number }> = [];
  private isProcessing = false;

  // Preload critical images immediately
  preloadCriticalImages(images: string[]): void {
    const criticalImages = images.slice(0, 3); // First 3 images are critical
    
    criticalImages.forEach((src, index) => {
      this.addToQueue(src, 100 - index); // Higher priority for earlier images
    });

    this.processQueue();
  }

  // Add image to preload queue
  addToQueue(src: string, priority: number = 50): void {
    if (this.preloadedImages.has(src)) return;

    this.preloadQueue.push({ src, priority });
    this.preloadQueue.sort((a, b) => b.priority - a.priority); // Higher priority first

    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  // Process preload queue
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.preloadQueue.length === 0) return;

    this.isProcessing = true;

    while (this.preloadQueue.length > 0) {
      const { src, priority } = this.preloadQueue.shift()!;
      
      if (this.preloadedImages.has(src)) continue;

      try {
        await this.preloadImage(src, priority >= 80);
        this.preloadedImages.add(src);
      } catch (error) {
        console.warn(`Failed to preload image: ${src}`);
      }

      // Small delay between preloads to not block the main thread
      if (this.preloadQueue.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }

    this.isProcessing = false;
  }

  // Preload single image with format optimization
  private preloadImage(src: string, isHigh: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      
      // Optimize URL for preloading
      const quality = isHigh ? 70 : 60;
      let optimizedSrc = src;

      if (src.includes('unsplash.com')) {
        optimizedSrc = `${src}?auto=format&fit=crop&q=${quality}&w=800`;
      } else if (src.includes('lovable-uploads')) {
        optimizedSrc = `${src}?w=800&q=${quality}`;
      }

      link.href = optimizedSrc;
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to preload ${src}`));
      
      document.head.appendChild(link);
    });
  }

  // Get preload status
  isPreloaded(src: string): boolean {
    return this.preloadedImages.has(src);
  }

  // Clear cache
  clearCache(): void {
    this.preloadedImages.clear();
    this.preloadQueue = [];
  }
}

export const imagePreloader = new ImagePreloaderService();
