
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// GitHub Sync Test - Force rebuild timestamp
console.log('🚀 App starting with GitHub sync test at:', new Date().toISOString());

createRoot(document.getElementById("root")!).render(<App />);
