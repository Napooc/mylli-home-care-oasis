
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preloadCriticalImages } from './utils/imageOptimization'

// Ultra-fast image preloading
preloadCriticalImages();

createRoot(document.getElementById("root")!).render(<App />);
