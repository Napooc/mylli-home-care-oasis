// Web Worker manager for heavy computations
class WebWorkerManager {
  private static instance: WebWorkerManager;
  private workers: Map<string, Worker> = new Map();

  static getInstance(): WebWorkerManager {
    if (!this.instance) {
      this.instance = new WebWorkerManager();
    }
    return this.instance;
  }

  createWorker(name: string, script: string): Worker | null {
    if (typeof Worker === 'undefined') {
      console.warn('Web Workers not supported');
      return null;
    }

    try {
      const blob = new Blob([script], { type: 'application/javascript' });
      const workerUrl = URL.createObjectURL(blob);
      const worker = new Worker(workerUrl);
      
      this.workers.set(name, worker);
      
      worker.onerror = (error) => {
        console.error(`Worker ${name} error:`, error);
      };

      return worker;
    } catch (error) {
      console.error(`Failed to create worker ${name}:`, error);
      return null;
    }
  }

  getWorker(name: string): Worker | undefined {
    return this.workers.get(name);
  }

  terminateWorker(name: string): void {
    const worker = this.workers.get(name);
    if (worker) {
      worker.terminate();
      this.workers.delete(name);
    }
  }

  terminateAll(): void {
    this.workers.forEach((worker, name) => {
      worker.terminate();
    });
    this.workers.clear();
  }

  // Image processing worker
  createImageProcessor(): Worker | null {
    const imageProcessorScript = `
      self.onmessage = function(e) {
        const { imageData, type, quality } = e.data;
        
        // Simulate image processing
        const processedData = {
          ...imageData,
          processed: true,
          quality: quality,
          timestamp: Date.now()
        };
        
        self.postMessage(processedData);
      };
    `;
    
    return this.createWorker('imageProcessor', imageProcessorScript);
  }

  // Data processing worker
  createDataProcessor(): Worker | null {
    const dataProcessorScript = `
      self.onmessage = function(e) {
        const { data, operation } = e.data;
        
        let result;
        switch(operation) {
          case 'filter':
            result = data.filter(item => item.active);
            break;
          case 'sort':
            result = data.sort((a, b) => a.priority - b.priority);
            break;
          default:
            result = data;
        }
        
        self.postMessage({ result, operation });
      };
    `;
    
    return this.createWorker('dataProcessor', dataProcessorScript);
  }
}

export const webWorkerManager = WebWorkerManager.getInstance();