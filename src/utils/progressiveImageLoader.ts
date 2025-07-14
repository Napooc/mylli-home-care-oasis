// Progressive image loading with ultra-low quality placeholders
import { taskScheduler } from './taskScheduler';

export class ProgressiveImageLoader {
  private static instance: ProgressiveImageLoader | null = null;
  private loadedImages = new Set<string>();
  private observer: IntersectionObserver | null = null;

  static getInstance(): ProgressiveImageLoader {
    if (!ProgressiveImageLoader.instance) {
      ProgressiveImageLoader.instance = new ProgressiveImageLoader();
    }
    return ProgressiveImageLoader.instance;
  }

  initialize(): void {
    this.setupIntersectionObserver();
    taskScheduler.schedule(() => this.setupProgressiveLoading());
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadProgressiveImage(entry.target as HTMLImageElement);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );
  }

  private setupProgressiveLoading(): void {
    const images = document.querySelectorAll('img[data-src]');
    Array.from(images).forEach(img => {
      this.observer?.observe(img);
    });
  }

  private loadProgressiveImage(img: HTMLImageElement): void {
    const src = img.dataset.src;
    if (!src || this.loadedImages.has(src)) return;

    taskScheduler.schedule(() => {
      // Create high-quality image
      const highQualityImg = new Image();
      
      highQualityImg.onload = () => {
        img.src = src;
        img.classList.add('loaded');
        this.loadedImages.add(src);
        this.observer?.unobserve(img);
      };

      highQualityImg.onerror = () => {
        img.classList.add('error');
        this.observer?.unobserve(img);
      };

      highQualityImg.src = src;
    });
  }

  // Generate ultra-low quality placeholder
  generatePlaceholder(width: number = 400, height: number = 300, color = '#e5e7eb'): string {
    const canvas = document.createElement('canvas');
    canvas.width = 10; // Ultra-small for speed
    canvas.height = Math.round(10 * (height / width));
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    return canvas.toDataURL('image/jpeg', 0.1);
  }

  cleanup(): void {
    this.observer?.disconnect();
    this.loadedImages.clear();
  }
}

export const progressiveImageLoader = ProgressiveImageLoader.getInstance();