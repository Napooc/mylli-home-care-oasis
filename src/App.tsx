
import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/Home";
import ServicesPage from "./pages/Services";
import FonctionnementPage from "./pages/Fonctionnement";
import EquipePage from "./pages/Equipe";
import AProposPage from "./pages/APropos";
import ContactPage from "./pages/Contact";
import AideSoignantPage from "./pages/services/AideSoignant";
import InfirmierPage from "./pages/services/Infirmier";
import ArticlesPage from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import CookiePolicy from "./pages/CookiePolicy";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import MotDuPresident from "./pages/MotDuPresident";
import NotFound from "./pages/NotFound";
import { initEmailJS } from "./utils/emailjs";

import CookieConsentManager from "./components/cookies/CookieConsentManager";
import SecurityDashboard from "./components/security/SecurityDashboard";
import { securitySession } from "./utils/securitySession";
import { injectCriticalCSS } from "./utils/criticalCSS";
import { preloadCriticalResources, addResourceHints } from "./utils/resourcePriority";
import { MemoryOptimizer } from "./utils/memoryOptimizer";
import { SpeedOptimizer } from "./utils/speedOptimizer";
import { ultraFastImageLoader } from "./utils/ultraFastImageLoader";
import { intelligentImageCache } from "./utils/intelligentImageCache";
import { imagePerformanceMonitor } from "./utils/imagePerformanceMonitor";
import { performanceBudget } from "./utils/performanceBudget";
import { adaptiveLoader } from "./utils/adaptiveLoader";
import { webWorkerManager } from "./utils/webWorkerManager";
import { sharedObserver } from "./utils/sharedIntersectionObserver";
import "./styles/global.css";

// Ultra-optimized QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  useEffect(() => {
    console.log('🚀 Ultra-Fast Loading Initialization...');
    
    // Phase 1: Critical Rendering Path
    injectCriticalCSS();
    preloadCriticalResources();
    addResourceHints();
    
    // Phase 2: Essential Services
    securitySession.initializeSession();
    
    // Phase 3: Bundle + Image Optimization
    MemoryOptimizer.startMemoryOptimization();
    SpeedOptimizer.initialize();
    
    // Phase 3: Advanced Optimization
    ultraFastImageLoader; // Initialize image loader
    intelligentImageCache; // Initialize intelligent cache
    imagePerformanceMonitor; // Initialize performance monitoring
    performanceBudget; // Initialize performance budgets
    adaptiveLoader; // Initialize adaptive loading
    webWorkerManager.createImageProcessor(); // Initialize Web Workers
    
    // Phase 4: Service Worker (Minimal)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        console.warn('Service Worker registration failed');
      });
    }
    
    // EmailJS Initialization
    try {
      initEmailJS();
      console.log("✅ EmailJS initialized");
    } catch (error) {
      console.error("❌ EmailJS initialization failed:", error);
    }

    console.log('✅ Ultra-fast initialization complete');

    // Cleanup on unmount
    return () => {
      MemoryOptimizer.cleanup();
      SpeedOptimizer.cleanup();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/services" element={<MainLayout><ServicesPage /></MainLayout>} />
            <Route path="/services/aide-soignant" element={<MainLayout><AideSoignantPage /></MainLayout>} />
            <Route path="/services/infirmier" element={<MainLayout><InfirmierPage /></MainLayout>} />
            <Route path="/fonctionnement" element={<MainLayout><FonctionnementPage /></MainLayout>} />
            <Route path="/outils" element={<MainLayout><EquipePage /></MainLayout>} />
            <Route path="/apropos" element={<MainLayout><AProposPage /></MainLayout>} />
            <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
            <Route path="/articles" element={<MainLayout><ArticlesPage /></MainLayout>} />
            <Route path="/articles/:slug" element={<MainLayout><ArticleDetail /></MainLayout>} />
            <Route path="/politique-cookies" element={<MainLayout><CookiePolicy /></MainLayout>} />
            <Route path="/politique-confidentialite" element={<MainLayout><PolitiqueConfidentialite /></MainLayout>} />
            <Route path="/mot-du-president" element={<MainLayout><MotDuPresident /></MainLayout>} />
            <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
          </Routes>
          <CookieConsentManager />
          <SecurityDashboard />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
