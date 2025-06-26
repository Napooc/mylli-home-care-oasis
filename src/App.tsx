
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
import "./styles/global.css";

// Optimized QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1, // Reduce retries for faster failure
    },
  },
});

const App: React.FC = () => {
  useEffect(() => {
    console.log('🚀 Initializing performance-optimized Mylli Services...');
    
    // PHASE 1: Critical performance optimizations (immediate)
    inlineCriticalCSS();
    preloadCriticalResources();
    advancedPerformanceMonitor.init();
    
    // PHASE 2: Security and cleanup (high priority)
    securitySession.initializeSession();
    cleanURLFragments();
    
    // PHASE 3: DOM optimizations (requestIdleCallback)
    requestIdleCallback(() => {
      optimizeDOM();
      reduceReflows();
      deferNonCriticalCSS();
    }, { timeout: 1000 });
    
    // PHASE 4: Non-critical resources (low priority)
    requestIdleCallback(() => {
      initializeFaviconManager();
      
      // Register optimized service worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw-optimized.js')
          .then(() => console.log('✅ Optimized Service Worker registered'))
          .catch(() => console.log('ℹ️ Service Worker registration failed'));
      }
      
      try {
        initEmailJS();
        console.log("✅ EmailJS initialized");
      } catch (error) {
        console.error("❌ EmailJS failed:", error);
      }
    }, { timeout: 2000 });
    
    // PHASE 5: Performance monitoring (delayed)
    setTimeout(() => {
      const report = advancedPerformanceMonitor.generateReport();
      if (report.performance < 80) {
        console.warn('⚠️ Performance below target, check metrics');
      }
    }, 5000);

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
