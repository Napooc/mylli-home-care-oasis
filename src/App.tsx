
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
import { preloadCriticalImages, cleanupImageResources } from "./utils/imageOptimization";
import { imagePreloader } from "./services/ImagePreloader";
import CookieConsentManager from "./components/cookies/CookieConsentManager";
import SecurityDashboard from "./components/security/SecurityDashboard";
import { securitySession } from "./utils/securitySession";
import "./styles/global.css";

// Ultra-optimized Query Client for Phase 3
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15 * 60 * 1000, // 15 minutes - aggressive caching
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: 2, // Reduce retries for faster failure
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 5000),
      refetchOnWindowFocus: false, // Reduce unnecessary requests
      refetchOnReconnect: 'always',
      networkMode: 'offlineFirst' // Prioritize cache
    },
    mutations: {
      retry: 1,
      networkMode: 'online'
    }
  },
});

const App: React.FC = () => {
  useEffect(() => {
    console.log('⚡ Initializing Ultra-Fast Mylli Services application...');
    
    // Initialize security session
    securitySession.initializeSession();
    
    // Phase 1: Ultra-fast image preloading
    const criticalImages = [
      { src: '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png', priority: 100 }
    ];
    
    imagePreloader.preloadCriticalImages(criticalImages);
    preloadCriticalImages();
    
    // Phase 2: Service Worker registration for caching
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('🚀 Service Worker registered:', registration);
        })
        .catch(error => {
          console.warn('Service Worker registration failed:', error);
        });
    }
    
    // Phase 2: Critical resource preloading
    const preloadCriticalResources = () => {
      // Preload critical fonts
      const fontPreload = document.createElement('link');
      fontPreload.rel = 'preload';
      fontPreload.as = 'font';
      fontPreload.type = 'font/woff2';
      fontPreload.crossOrigin = 'anonymous';
      fontPreload.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
      document.head.appendChild(fontPreload);
      
      // Preload critical CSS
      const criticalCSS = document.createElement('link');
      criticalCSS.rel = 'preload';
      criticalCSS.as = 'style';
      criticalCSS.href = '/src/styles/critical.css';
      document.head.appendChild(criticalCSS);
    };
    
    // Use requestIdleCallback for non-critical preloading
    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadCriticalResources, { timeout: 100 });
    } else {
      setTimeout(preloadCriticalResources, 0);
    }

    // Initialize EmailJS
    try {
      initEmailJS();
      console.log("✅ EmailJS initialized");
    } catch (error) {
      console.error("❌ EmailJS initialization failed:", error);
    }

    // Phase 3: Memory cleanup interval
    const cleanupInterval = setInterval(() => {
      cleanupImageResources();
      
      // Cleanup query cache if too large
      const cacheSize = queryClient.getQueryCache().getAll().length;
      if (cacheSize > 50) { // Arbitrary threshold
        queryClient.getQueryCache().clear();
        console.log('🧹 Query cache cleared due to size');
      }
    }, 5 * 60 * 1000); // Every 5 minutes

    // Phase 4: Performance monitoring
    const monitorPerformance = () => {
      if ('performance' in window && performance.getEntriesByType) {
        const paintEntries = performance.getEntriesByType('paint');
        const navigationEntries = performance.getEntriesByType('navigation');
        
        paintEntries.forEach(entry => {
          console.log(`🎨 ${entry.name}: ${Math.round(entry.startTime)}ms`);
        });
        
        if (navigationEntries.length > 0) {
          const nav = navigationEntries[0] as PerformanceNavigationTiming;
          console.log(`📊 Page Load: ${Math.round(nav.loadEventEnd - nav.loadEventStart)}ms`);
          console.log(`📊 DOM Content Loaded: ${Math.round(nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart)}ms`);
        }
      }
    };
    
    // Monitor performance after load
    setTimeout(monitorPerformance, 2000);

    console.log('✅ Ultra-fast application initialization complete');

    // Cleanup on unmount
    return () => {
      clearInterval(cleanupInterval);
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
