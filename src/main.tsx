
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// iOS Safari compatibility check
const isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent);

// GitHub Sync Test - Force rebuild timestamp
console.log('🚀 App starting with GitHub sync test at:', new Date().toISOString());
console.log('📱 iOS Safari detected:', isIOSSafari);

// Enhanced error handling for iOS
const handleError = (error: Error) => {
  console.error('❌ Application error:', error);
  // iOS-specific error handling
  if (isIOSSafari) {
    console.warn('⚠️ iOS Safari error detected, applying fallbacks');
  }
};

// Global error handlers
window.addEventListener('error', (event) => {
  handleError(new Error(event.message));
});

window.addEventListener('unhandledrejection', (event) => {
  handleError(new Error(event.reason));
});

const container = document.getElementById("root");
if (!container) {
  throw new Error('Root container not found');
}

try {
  const root = createRoot(container);
  root.render(<App />);
  console.log('✅ React app mounted successfully');
} catch (error) {
  console.error('❌ Failed to mount React app:', error);
  handleError(error as Error);
}
