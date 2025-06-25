
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
import { initializeSimpleFavicons } from "./utils/simpleFaviconManager";
import CookieConsentManager from "./components/cookies/CookieConsentManager";
import SecurityDashboard from "./components/security/SecurityDashboard";
import { securitySession } from "./utils/securitySession";
import { lightweightPerformanceMonitor } from "./utils/lightweightPerformanceMonitor";
import { inlineCriticalCSS, deferNonCriticalCSS, preloadCriticalResources } from "./utils/criticalCssOptimizer";
import { iosSafeOptimizeDOM, iosSafeReduceReflows } from "./utils/iosSafeDomOptimizer";
import { iosCompatibilityInit, iosPerformanceOptimization } from "./utils/iosCompatibility";
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
    console.log('🚀 Initializing iOS-optimized Mylli Services...');
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    console.log(`📱 Platform detected: ${isIOS ? 'iOS' : 'Other'}`);
    
    // PHASE 1: Critical iOS compatibility fixes (immediate)
    if (isIOS) {
      iosCompatibilityInit();
      iosPerformanceOptimization();
    }
    
    // PHASE 2: Critical performance optimizations
    inlineCriticalCSS();
    preloadCriticalResources();
    
    // PHASE 3: Platform-specific optimizations
    initializeSimpleFavicons();
    lightweightPerformanceMonitor.init();
    
    // PHASE 4: Security and cleanup (high priority)
    securitySession.initializeSession();
    
    // PHASE 5: DOM optimizations (requestIdleCallback)
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        iosSafeOptimizeDOM();
        iosSafeReduceReflows();
        deferNonCriticalCSS();
      }, { timeout: 2000 });
    } else {
      // Fallback for older browsers
      setTimeout(() => {
        iosSafeOptimizeDOM();
        iosSafeReduceReflows();
        deferNonCriticalCSS();
      }, 1000);
    }
    
    // PHASE 6: Non-critical resources (low priority)
    const initNonCritical = () => {
      // Register iOS-optimized service worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw-ios-optimized.js')
          .then(() => console.log('✅ iOS-optimized Service Worker registered'))
          .catch(() => console.log('ℹ️ Service Worker registration failed'));
      }
      
      try {
        initEmailJS();
        console.log("✅ EmailJS initialized");
      } catch (error) {
        console.error("❌ EmailJS failed:", error);
      }
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(initNonCritical, { timeout: 3000 });
    } else {
      setTimeout(initNonCritical, 2000);
    }
    
    // PHASE 7: Performance monitoring (delayed)
    setTimeout(() => {
      const report = lightweightPerformanceMonitor.generateReport();
      console.log('📊 Performance report:', report);
    }, 5000);

    console.log('✅ iOS-optimized initialization complete');
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
