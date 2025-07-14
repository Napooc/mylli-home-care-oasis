
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { taskScheduler } from './utils/taskScheduler'
import { optimizedPerformanceMonitor } from './utils/optimizedPerformanceMonitor'
import { OptimizedSpeedOptimizer } from './utils/optimizedSpeedOptimizer'
import { progressiveImageLoader } from './utils/progressiveImageLoader'
import { preloadCriticalImages } from './utils/imageOptimization'

// Initialize optimized performance monitoring
taskScheduler.schedule(() => optimizedPerformanceMonitor.initialize());
taskScheduler.schedule(() => OptimizedSpeedOptimizer.initialize());
taskScheduler.schedule(() => progressiveImageLoader.initialize());

// Ultra-fast image preloading (scheduled to avoid blocking)
taskScheduler.schedule(() => preloadCriticalImages());

createRoot(document.getElementById("root")!).render(<App />);
