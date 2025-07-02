// Shared Intersection Observer for better performance
class SharedIntersectionObserver {
  private static instance: SharedIntersectionObserver;
  private observer: IntersectionObserver | null = null;
  private callbacks = new Map<Element, () => void>();

  static getInstance(): SharedIntersectionObserver {
    if (!this.instance) {
      this.instance = new SharedIntersectionObserver();
    }
    return this.instance;
  }

  private constructor() {
    if (typeof window !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const callback = this.callbacks.get(entry.target);
              if (callback) {
                callback();
                this.unobserve(entry.target);
              }
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '50px'
        }
      );
    }
  }

  observe(element: Element, callback: () => void): void {
    if (this.observer) {
      this.callbacks.set(element, callback);
      this.observer.observe(element);
    }
  }

  unobserve(element: Element): void {
    if (this.observer) {
      this.observer.unobserve(element);
      this.callbacks.delete(element);
    }
  }

  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.callbacks.clear();
    }
  }
}

export const sharedObserver = SharedIntersectionObserver.getInstance();