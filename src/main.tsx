
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerSW } from './utils/serviceWorkerRegistration'
import { fontOptimizer } from './utils/fontOptimization'
import { preloadCriticalResources } from './utils/resourceCache'

// Performance optimizations
const initializePerformanceOptimizations = async () => {
  // Register service worker for caching
  registerSW();
  
  // Initialize font optimization
  await fontOptimizer.initialize();
  
  // Preload critical resources
  requestIdleCallback ? 
    requestIdleCallback(() => preloadCriticalResources()) :
    setTimeout(preloadCriticalResources, 100);
};

// Initialize app with performance optimizations
initializePerformanceOptimizations();

createRoot(document.getElementById("root")!).render(<App />);
