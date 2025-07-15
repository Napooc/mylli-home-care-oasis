// Ultra-fast task scheduler to eliminate long tasks
export class TaskScheduler {
  private static instance: TaskScheduler | null = null;
  private taskQueue: Array<() => void> = [];
  private isProcessing = false;
  private readonly MAX_TASK_TIME = 3; // 3ms per frame for mobile optimization

  static getInstance(): TaskScheduler {
    if (!TaskScheduler.instance) {
      TaskScheduler.instance = new TaskScheduler();
    }
    return TaskScheduler.instance;
  }

  // Schedule a task to run in the next available frame
  schedule(task: () => void): void {
    this.taskQueue.push(task);
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  // Schedule multiple tasks with automatic chunking (mobile optimized)
  scheduleChunked(tasks: Array<() => void>, chunkSize = 2): void {
    const chunks = this.chunkArray(tasks, chunkSize);
    chunks.forEach((chunk, index) => {
      this.schedule(() => {
        const startTime = performance.now();
        for (const task of chunk) {
          if (performance.now() - startTime > this.MAX_TASK_TIME) {
            // Split remaining tasks to next frame
            this.scheduleChunked(chunk.slice(chunk.indexOf(task)));
            break;
          }
          task();
        }
      });
    });
  }

  private async processQueue(): Promise<void> {
    this.isProcessing = true;
    
    while (this.taskQueue.length > 0) {
      const startTime = performance.now();
      
      // Process tasks for max 3ms per frame (mobile optimized)
      while (this.taskQueue.length > 0 && (performance.now() - startTime) < this.MAX_TASK_TIME) {
        const task = this.taskQueue.shift();
        task?.();
      }
      
      // Yield to browser if more tasks remain
      if (this.taskQueue.length > 0) {
        await this.yieldToMain();
      }
    }
    
    this.isProcessing = false;
  }

  private yieldToMain(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, 0);
    });
  }

  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
}

export const taskScheduler = TaskScheduler.getInstance();