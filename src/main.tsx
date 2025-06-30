
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerSW } from './utils/serviceWorkerRegistration'
import { fontOptimizer } from './utils/fontOptimization'
import { preloadCriticalResources } from './utils/resourceCache'
import { imagePreloader } from './utils/imagePreloader'
import { performanceMonitor } from './utils/performanceMonitor'

// Performance optimizations with bundle optimization
const initializePerformanceOptimizations = async () => {
  console.log('🚀 Initializing optimized performance system...');
  
  // Register service worker for caching
  registerSW();
  
  // Initialize font optimization (critical for LCP)
  await fontOptimizer.initialize();
  
  // Preload critical images immediately
  await imagePreloader.preloadCritical();
  
  // Preload other critical resources with idle callback
  requestIdleCallback ? 
    requestIdleCallback(() => preloadCriticalResources()) :
    setTimeout(preloadCriticalResources, 100);
  
  // Start performance monitoring
  performanceMonitor.startRouteLoad(window.location.pathname);
  
  console.log('✅ Performance optimization system initialized');
};

// Initialize app with performance optimizations
initializePerformanceOptimizations().catch(console.error);

createRoot(document.getElementById("root")!).render(<App />);
