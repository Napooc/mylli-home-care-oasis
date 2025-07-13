
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preloadCriticalImages } from './utils/imageOptimization'
import { pageImagePreloader } from './utils/pageImagePreloader'

// Ultra-fast image preloading
preloadCriticalImages();

// Preload critical page images immediately
pageImagePreloader.preloadCriticalPages();

createRoot(document.getElementById("root")!).render(<App />);
