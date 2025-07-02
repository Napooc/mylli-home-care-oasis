
// Ultra-lightweight memory management
export class MemoryOptimizer {
  private static cleanupTasks: (() => void)[] = [];
  private static intervalId: NodeJS.Timeout | null = null;

  static addCleanupTask(task: () => void) {
    this.cleanupTasks.push(task);
  }

  static startMemoryOptimization() {
    // Clean up every 30 seconds
    this.intervalId = setInterval(() => {
      this.performCleanup();
    }, 30000);
  }

  static performCleanup() {
    // Run cleanup tasks
    this.cleanupTasks.forEach(task => {
      try {
        task();
      } catch (error) {
        console.warn('Cleanup task failed:', error);
      }
    });

    // Clear completed tasks
    this.cleanupTasks = this.cleanupTasks.filter(task => task !== null);

    // Force garbage collection if available
    if ('gc' in window && typeof (window as any).gc === 'function') {
      (window as any).gc();
    }
  }

  static cleanup() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.cleanupTasks = [];
  }
}
