
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
import { optimizeDOM, reduceReflows } from "./utils/domOptimizer";
import { iosCompatibility } from "./utils/iosCompatibility";
import { iosServiceWorkerManager } from "./utils/iosOptimizedServiceWorker";
import "./styles/global.css";
import "./styles/ios-fixes.css";

// Optimized QueryClient configuration with iOS-specific settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Reduce retries on iOS to save battery and memory
        const maxRetries = iosCompatibility.isIOS() ? 1 : 2;
        return failureCount < maxRetries;
      },
    },
  },
});

const App: React.FC = () => {
  useEffect(() => {
    console.log('🚀 Initializing performance-optimized Mylli Services...');
    
    // PHASE 1: iOS compatibility fixes (highest priority)
    if (iosCompatibility.isIOS()) {
      console.log('🍎 iOS device detected, applying iOS-specific optimizations...');
      iosCompatibility.initializeIOSFixes();
    }
    
    // PHASE 2: Critical performance optimizations (immediate)
    inlineCriticalCSS();
    preloadCriticalResources();
    advancedPerformanceMonitor.init();
    
    // PHASE 3: Security and cleanup (high priority)
    securitySession.initializeSession();
    cleanURLFragments();
    
    // PHASE 4: DOM optimizations (requestIdleCallback for iOS performance)
    const domOptimizationCallback = () => {
      optimizeDOM();
      reduceReflows();
      deferNonCriticalCSS();
    };
    
    if (iosCompatibility.isIOS()) {
      // Use setTimeout for iOS Safari compatibility
      setTimeout(domOptimizationCallback, 500);
    } else {
      requestIdleCallback(domOptimizationCallback, { timeout: 1000 });
    }
    
    // PHASE 5: Non-critical resources (low priority)
    const initNonCriticalResources = () => {
      initializeFaviconManager();
      
      // Register iOS-optimized service worker
      if ('serviceWorker' in navigator) {
        iosServiceWorkerManager.registerIOSOptimizedServiceWorker()
          .then(() => console.log('✅ iOS-optimized Service Worker registered'))
          .catch((error) => console.log('ℹ️ Service Worker registration failed:', error));
      }
      
      try {
        initEmailJS();
        console.log("✅ EmailJS initialized");
      } catch (error) {
        console.error("❌ EmailJS failed:", error);
      }
    };
    
    if (iosCompatibility.isIOS()) {
      // Delay non-critical resources more on iOS to prevent memory issues
      setTimeout(initNonCriticalResources, 3000);
    } else {
      requestIdleCallback(initNonCriticalResources, { timeout: 2000 });
    }
    
    // PHASE 6: Performance monitoring (delayed, iOS-optimized)
    const performanceMonitoringDelay = iosCompatibility.isIOS() ? 8000 : 5000;
    setTimeout(() => {
      const report = advancedPerformanceMonitor.generateReport();
      if (report.performance < 80) {
        console.warn('⚠️ Performance below target, check metrics');
      }
      
      if (iosCompatibility.isIOS()) {
        console.log('🍎 iOS performance report:', {
          device: 'iOS',
          version: iosCompatibility.getIOSVersion(),
          performance: report.performance
        });
      }
    }, performanceMonitoringDelay);

    console.log('✅ All performance optimizations initialized');
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
