
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
import { initializeFaviconManager, cleanURLFragments } from "./utils/faviconManager";
import CookieConsentManager from "./components/cookies/CookieConsentManager";
import SecurityDashboard from "./components/security/SecurityDashboard";
import { securitySession } from "./utils/securitySession";
import { advancedPerformanceMonitor } from "./utils/advancedPerformanceMonitor";
import { inlineCriticalCSS, deferNonCriticalCSS, preloadCriticalResources } from "./utils/criticalCssOptimizer";
import { optimizeDOM, reduceReflows, optimizeForIOS } from "./utils/domOptimizer";
import "./styles/global.css";

// Optimized QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  useEffect(() => {
    const isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent);
    
    console.log('🚀 Initializing Mylli Services...', { isIOSSafari });
    
    // PHASE 1: Critical performance optimizations (immediate)
    try {
      inlineCriticalCSS();
      preloadCriticalResources();
      advancedPerformanceMonitor.init();
      
      // iOS-specific optimizations
      if (isIOSSafari) {
        optimizeForIOS();
      }
    } catch (error) {
      console.warn('⚠️ Phase 1 initialization failed:', error);
    }
    
    // PHASE 2: Security and cleanup (high priority)
    try {
      securitySession.initializeSession();
      cleanURLFragments();
    } catch (error) {
      console.warn('⚠️ Phase 2 initialization failed:', error);
    }
    
    // PHASE 3: DOM optimizations (deferred for iOS)
    const domOptimizationDelay = isIOSSafari ? 2000 : 1000;
    
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => {
        try {
          optimizeDOM();
          reduceReflows();
          deferNonCriticalCSS();
        } catch (error) {
          console.warn('⚠️ DOM optimization failed:', error);
        }
      }, { timeout: domOptimizationDelay });
    } else {
      // Fallback for browsers without requestIdleCallback (like iOS Safari)
      setTimeout(() => {
        try {
          optimizeDOM();
          reduceReflows();
          deferNonCriticalCSS();
        } catch (error) {
          console.warn('⚠️ DOM optimization failed:', error);
        }
      }, domOptimizationDelay);
    }
    
    // PHASE 4: Non-critical resources (low priority)
    const nonCriticalDelay = isIOSSafari ? 4000 : 2000;
    
    setTimeout(() => {
      try {
        initializeFaviconManager();
        
        // Register service worker with iOS compatibility
        if ('serviceWorker' in navigator) {
          const swPath = isIOSSafari ? '/sw.js' : '/sw-optimized.js';
          navigator.serviceWorker.register(swPath)
            .then(() => console.log('✅ Service Worker registered'))
            .catch(() => console.log('ℹ️ Service Worker registration failed'));
        }
        
        initEmailJS();
        console.log("✅ EmailJS initialized");
      } catch (error) {
        console.warn("⚠️ Non-critical initialization failed:", error);
      }
    }, nonCriticalDelay);
    
    // PHASE 5: Performance monitoring (delayed)
    setTimeout(() => {
      try {
        const report = advancedPerformanceMonitor.generateReport();
        if (report.performance < 80) {
          console.warn('⚠️ Performance below target:', report);
        }
      } catch (error) {
        console.warn('⚠️ Performance monitoring failed:', error);
      }
    }, 5000);

    console.log('✅ All optimizations initialized');

    // Cleanup function
    return () => {
      advancedPerformanceMonitor.cleanup();
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
