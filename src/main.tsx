
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

// Mobile-first initialization (only essential tasks)
if (mobilePerformanceOptimizer.shouldDeferNonCritical()) {
  // Ultra-lightweight mode for slow connections/low memory
  taskScheduler.schedule(() => ultraLightImageLoader.preloadCriticalImages([
    '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png'
  ]));
} else {
  // Standard initialization for better devices
  taskScheduler.schedule(() => optimizedPerformanceMonitor.initialize());
  taskScheduler.schedule(() => OptimizedSpeedOptimizer.initialize());
  taskScheduler.schedule(() => progressiveImageLoader.initialize());
  taskScheduler.schedule(() => preloadCriticalImages());
}

createRoot(document.getElementById("root")!).render(<App />);
