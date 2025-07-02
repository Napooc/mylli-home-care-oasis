
// Ultra-lightweight memory management for optimal performance
class MemoryManager {
  private cache = new Map<string, { data: any; ttl?: number; timestamp: number }>();
  private maxSize = 100; // Limit cache size
  
  set(key: string, data: any, ttl?: number): void {
    // Clean old entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    
    this.cache.set(key, {
      data,
      ttl,
      timestamp: Date.now()
    });
  }
  
  get(key: string): any {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    // Check TTL
    if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }
  
  clear(): void {
    this.cache.clear();
  }
  
  size(): number {
    return this.cache.size;
  }
}

// Cleanup manager for component unmounting
export const createCleanupManager = () => {
  const cleanupFunctions: (() => void)[] = [];
  
  return {
    add: (cleanup: () => void) => {
      cleanupFunctions.push(cleanup);
    },
    cleanup: () => {
      cleanupFunctions.forEach(fn => fn());
      cleanupFunctions.length = 0;
    }
  };
};

export const memoryManager = new MemoryManager();
