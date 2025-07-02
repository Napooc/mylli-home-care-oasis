
// Phase 3: Intelligent Caching System
interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccessed: number;
  priority: 'low' | 'medium' | 'high';
  size: number;
}

interface CacheConfig {
  maxSize: number; // Maximum cache size in bytes
  maxEntries: number; // Maximum number of entries
  defaultTTL: number; // Default time to live in milliseconds
  cleanupInterval: number; // Cleanup interval in milliseconds
}

class IntelligentCache {
  private cache = new Map<string, CacheEntry>();
  private config: CacheConfig;
  private currentSize = 0;
  private cleanupTimer: NodeJS.Timeout | null = null;

  constructor(config?: Partial<CacheConfig>) {
    this.config = {
      maxSize: 50 * 1024 * 1024, // 50MB
      maxEntries: 1000,
      defaultTTL: 30 * 60 * 1000, // 30 minutes
      cleanupInterval: 5 * 60 * 1000, // 5 minutes
      ...config
    };

    this.initializeCache();
  }

  private initializeCache(): void {
    console.log('🧠 Initializing intelligent cache system...');
    
    // Start periodic cleanup
    this.startCleanup();
    
    // Monitor memory pressure
    this.monitorMemoryPressure();
    
    // Load persistent cache if available
    this.loadPersistentCache();
  }

  // Set cache entry with intelligent priority and TTL calculation
  set(key: string, data: any, options?: { 
    ttl?: number; 
    priority?: 'low' | 'medium' | 'high';
    persistent?: boolean;
  }): void {
    const size = this.calculateSize(data);
    const priority = options?.priority || this.calculatePriority(key, data);
    const ttl = options?.ttl || this.calculateTTL(priority);

    // Check if we need to make room
    if (this.needsEviction(size)) {
      this.evictEntries(size);
    }

    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
      ttl,
      accessCount: 0,
      lastAccessed: Date.now(),
      priority,
      size
    };

    this.cache.set(key, entry);
    this.currentSize += size;

    // Persist important entries
    if (options?.persistent && priority === 'high') {
      this.persistEntry(key, entry);
    }

    console.log(`📦 Cached: ${key} (${this.formatSize(size)}, TTL: ${ttl}ms, Priority: ${priority})`);
  }

  // Get cache entry with access tracking
  get(key: string): any | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if expired
    if (this.isExpired(entry)) {
      this.delete(key);
      return null;
    }

    // Update access statistics
    entry.accessCount++;
    entry.lastAccessed = Date.now();

    console.log(`📖 Cache hit: ${key} (accessed ${entry.accessCount} times)`);
    return entry.data;
  }

  // Delete cache entry
  delete(key: string): boolean {
    const entry = this.cache.get(key);
    if (entry) {
      this.currentSize -= entry.size;
      this.cache.delete(key);
      this.removePersistentEntry(key);
      return true;
    }
    return false;
  }

  // Check if entry exists and is valid
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    if (this.isExpired(entry)) {
      this.delete(key);
      return false;
    }
    
    return true;
  }

  // Clear all cache entries
  clear(): void {
    this.cache.clear();
    this.currentSize = 0;
    this.clearPersistentCache();
    console.log('🗑️ Cache cleared');
  }

  // Get cache statistics
  getStats(): object {
    const stats = {
      entries: this.cache.size,
      totalSize: this.formatSize(this.currentSize),
      utilization: `${((this.currentSize / this.config.maxSize) * 100).toFixed(1)}%`,
      hitRate: this.calculateHitRate(),
      topEntries: this.getTopEntries(5)
    };

    console.log('📊 Cache Statistics:', stats);
    return stats;
  }

  // Calculate entry priority based on key and data characteristics
  private calculatePriority(key: string, data: any): 'low' | 'medium' | 'high' {
    // Critical resources get high priority
    if (key.includes('critical') || key.includes('vendor') || key.includes('main')) {
      return 'high';
    }
    
    // Large resources get lower priority
    const size = this.calculateSize(data);
    if (size > 1024 * 1024) { // 1MB
      return 'low';
    }
    
    // API responses get medium priority
    if (key.includes('api') || key.includes('query')) {
      return 'medium';
    }
    
    return 'medium';
  }

  // Calculate TTL based on priority and data characteristics
  private calculateTTL(priority: 'low' | 'medium' | 'high'): number {
    const baseTTL = this.config.defaultTTL;
    
    switch (priority) {
      case 'high':
        return baseTTL * 2; // Cache longer for important data
      case 'low':
        return baseTTL * 0.5; // Cache shorter for less important data
      default:
        return baseTTL;
    }
  }

  // Calculate size of data (simplified)
  private calculateSize(data: any): number {
    try {
      return new Blob([JSON.stringify(data)]).size;
    } catch {
      return JSON.stringify(data).length * 2; // Approximate UTF-16 size
    }
  }

  // Check if cache needs eviction
  private needsEviction(newEntrySize: number): boolean {
    return this.cache.size >= this.config.maxEntries || 
           (this.currentSize + newEntrySize) > this.config.maxSize;
  }

  // Evict entries using LRU + priority algorithm
  private evictEntries(requiredSpace: number): void {
    console.log('🧹 Starting cache eviction...');
    
    const entries = Array.from(this.cache.entries());
    
    // Sort by priority (low first) and then by last accessed time
    entries.sort(([, a], [, b]) => {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      const aPriority = priorityOrder[a.priority];
      const bPriority = priorityOrder[b.priority];
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      
      return a.lastAccessed - b.lastAccessed;
    });

    let freedSpace = 0;
    let evictedCount = 0;

    for (const [key, entry] of entries) {
      if (freedSpace >= requiredSpace && this.cache.size < this.config.maxEntries) {
        break;
      }

      this.cache.delete(key);
      this.currentSize -= entry.size;
      freedSpace += entry.size;
      evictedCount++;
    }

    console.log(`🗑️ Evicted ${evictedCount} entries, freed ${this.formatSize(freedSpace)}`);
  }

  // Check if entry is expired
  private isExpired(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  // Start cleanup timer
  private startCleanup(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  // Cleanup expired entries
  private cleanup(): void {
    let cleanedCount = 0;
    let freedSpace = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        this.currentSize -= entry.size;
        freedSpace += entry.size;
        this.cache.delete(key);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned ${cleanedCount} expired entries, freed ${this.formatSize(freedSpace)}`);
    }
  }

  // Monitor memory pressure and adjust cache size
  private monitorMemoryPressure(): void {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        const utilization = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
        
        if (utilization > 0.8) {
          console.log('⚠️ High memory pressure detected, reducing cache size');
          this.reduceCache();
        }
      }, 30000); // Check every 30 seconds
    }
  }

  // Reduce cache size under memory pressure
  private reduceCache(): void {
    const targetSize = Math.floor(this.cache.size * 0.7); // Reduce by 30%
    const entries = Array.from(this.cache.entries());
    
    // Remove least important entries
    entries
      .sort(([, a], [, b]) => {
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
      .slice(0, this.cache.size - targetSize)
      .forEach(([key]) => this.delete(key));
  }

  // Persist important entries to localStorage
  private persistEntry(key: string, entry: CacheEntry): void {
    try {
      const persistentData = {
        data: entry.data,
        timestamp: entry.timestamp,
        ttl: entry.ttl
      };
      localStorage.setItem(`cache_${key}`, JSON.stringify(persistentData));
    } catch (error) {
      console.warn('Failed to persist cache entry:', error);
    }
  }

  // Load persistent cache from localStorage
  private loadPersistentCache(): void {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('cache_')) {
          const cacheKey = key.substring(6);
          const data = JSON.parse(localStorage.getItem(key)!);
          
          if (Date.now() - data.timestamp < data.ttl) {
            this.set(cacheKey, data.data, { ttl: data.ttl, priority: 'high' });
          } else {
            localStorage.removeItem(key);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to load persistent cache:', error);
    }
  }

  // Remove persistent entry
  private removePersistentEntry(key: string): void {
    try {
      localStorage.removeItem(`cache_${key}`);
    } catch (error) {
      console.warn('Failed to remove persistent cache entry:', error);
    }
  }

  // Clear persistent cache
  private clearPersistentCache(): void {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('cache_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.warn('Failed to clear persistent cache:', error);
    }
  }

  // Calculate hit rate (simplified)
  private calculateHitRate(): string {
    // This would need to be tracked over time for accuracy
    const totalAccesses = Array.from(this.cache.values())
      .reduce((sum, entry) => sum + entry.accessCount, 0);
    const hitRate = totalAccesses > 0 ? (totalAccesses / (totalAccesses + 10)) * 100 : 0;
    return `${hitRate.toFixed(1)}%`;
  }

  // Get top accessed entries
  private getTopEntries(count: number): Array<{ key: string; accessCount: number }> {
    return Array.from(this.cache.entries())
      .sort(([, a], [, b]) => b.accessCount - a.accessCount)
      .slice(0, count)
      .map(([key, entry]) => ({ key, accessCount: entry.accessCount }));
  }

  // Format size for display
  private formatSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)}${units[unitIndex]}`;
  }

  // Cleanup on destroy
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    this.clear();
  }
}

export const intelligentCache = new IntelligentCache();
