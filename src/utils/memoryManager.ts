
// Ultra-lightweight memory management utilities
export class MemoryManager {
  private static instance: MemoryManager | null = null;
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();
  private readonly MAX_CACHE_SIZE = 50; // Keep cache small
  private readonly DEFAULT_TTL = 300000; // 5 minutes

  static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }

  // Smart caching with TTL
  set(key: string, data: any, ttl: number = this.DEFAULT_TTL): void {
    // Clean expired entries first
    this.cleanExpired();
    
    // Remove oldest entries if cache is too large
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  // Get from cache
  get(key: string): any | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  // Clean expired entries
  private cleanExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }

  // Force cleanup
  clear(): void {
    this.cache.clear();
  }

  // Get cache stats
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Export singleton
export const memoryManager = MemoryManager.getInstance();

// Memory-efficient event listeners
export const addPassiveListener = (
  element: Element | Window,
  event: string,
  handler: EventListener
): (() => void) => {
  element.addEventListener(event, handler, { passive: true });
  
  // Return cleanup function
  return () => element.removeEventListener(event, handler);
};

// Cleanup function for React components
export const createCleanupManager = () => {
  const cleanupFunctions: (() => void)[] = [];
  
  return {
    add: (cleanup: () => void) => cleanupFunctions.push(cleanup),
    cleanup: () => {
      cleanupFunctions.forEach(fn => fn());
      cleanupFunctions.length = 0;
    }
  };
};
