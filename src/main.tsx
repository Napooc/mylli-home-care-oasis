
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { taskScheduler } from './utils/taskScheduler'
import { optimizedPerformanceMonitor } from './utils/optimizedPerformanceMonitor'
import { OptimizedSpeedOptimizer } from './utils/optimizedSpeedOptimizer'
import { progressiveImageLoader } from './utils/progressiveImageLoader'
import { preloadCriticalImages } from './utils/imageOptimization'
import { mobilePerformanceOptimizer } from './utils/mobilePerformanceOptimizer'
import { ultraLightImageLoader } from './utils/ultraLightImageLoader'
import { hyperFastImageCache } from './utils/hyperFastImageCache'

// Hyper-fast mobile image initialization
const criticalImages = [
  '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png',
  '/lovable-uploads/21a6c87c-23d4-42e3-a542-44f2e834616d.png',
  '/lovable-uploads/609a7402-4f73-4888-bedd-2256c3fbd997.png'
];

// Immediate critical image preload for lightning fast loading
hyperFastImageCache.preloadCriticalImages(criticalImages);

if (mobilePerformanceOptimizer.shouldDeferNonCritical()) {
  // Ultra-lightweight mode - only essential tasks
  taskScheduler.schedule(() => console.log('Mobile optimized mode active'));
} else {
  // Standard initialization for better devices
  taskScheduler.schedule(() => optimizedPerformanceMonitor.initialize());
  taskScheduler.schedule(() => OptimizedSpeedOptimizer.initialize());
  taskScheduler.schedule(() => progressiveImageLoader.initialize());
}

createRoot(document.getElementById("root")!).render(<App />);
