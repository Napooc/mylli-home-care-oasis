
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
import { preloadCriticalImages } from "./utils/imageOptimization";
import { initializeFaviconManager, cleanURLFragments } from "./utils/faviconManager";
import CookieConsentManager from "./components/cookies/CookieConsentManager";
import SecurityDashboard from "./components/security/SecurityDashboard";
import { securitySession } from "./utils/securitySession";
import "./styles/global.css";
import { imagePreloader } from "./services/ImagePreloader";
import { optimizeMemory, optimizeBrowserCache } from "./utils/imageOptimization";
import { resourcePreloader, optimizeCSS } from "./utils/resourcePreloader";
import { compressionManager, optimizeMemoryUsage, getNetworkAwareQuality } from "./utils/compressionUtils";

// Optimized QueryClient with aggressive caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes - increased for better caching
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false, // Reduce unnecessary refetches
      refetchOnReconnect: 'always',
    },
    mutations: {
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  useEffect(() => {
    console.log('🚀 Initializing Mylli Services with Phase 2 optimizations...');
    
    // PHASE 1: Security and URL Management
    securitySession.initializeSession();
    cleanURLFragments();
    
    const emergencyUrlCleanup = () => {
      const currentUrl = window.location.href;
      if (currentUrl.includes('#') || currentUrl.includes('%23') || currentUrl.includes('ios-favicon-refresh')) {
        console.log('🚨 CRITICAL: Performing emergency URL cleanup...');
        
        let cleanUrl = currentUrl.split('#')[0];
        cleanUrl = cleanUrl.replace(/%23[^&]*/g, '');
        cleanUrl = cleanUrl.replace(/ios-favicon-refresh/g, '');
        cleanUrl = cleanUrl.replace(/[?&]v=[^&]*/g, '');
        cleanUrl = cleanUrl.replace(/[?&]session=[^&]*/g, '');
        cleanUrl = cleanUrl.replace(/[?&]ios=[^&]*/g, '');
        cleanUrl = cleanUrl.replace(/[?&]$/, '');
        
        window.history.replaceState(null, '', cleanUrl);
        console.log('✅ EMERGENCY URL cleanup complete:', cleanUrl);
      }
    };
    
    emergencyUrlCleanup();
    initializeFaviconManager();
    
    // PHASE 2: Service Worker Registration
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('✅ Service Worker registered successfully:', registration);
          
          // Handle service worker updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('🔄 New service worker available, refreshing...');
                  window.location.reload();
                }
              });
            }
          });
        } catch (error) {
          console.warn('❌ Service Worker registration failed:', error);
        }
      });
    }
    
    // PHASE 3: Resource Preloading
    console.log('📦 Starting resource preloading...');
    resourcePreloader.preloadCriticalResources();
    
    // PHASE 4: Image System Initialization
    console.log('🖼️ Initializing optimized image system...');
    
    // Get network-aware quality settings
    const networkQuality = getNetworkAwareQuality();
    console.log(`📊 Network quality detected: ${networkQuality}`);
    
    // Preload critical images with network-aware compression
    const criticalImages = [
      '/lovable-uploads/93fb824b-3948-43af-a313-a54ebaf3ded0.png',
      '/lovable-uploads/0e49a73b-0499-4adb-84fc-7707c6381ef7.png',
      '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png'
    ];
    
    imagePreloader.preloadCriticalImages(criticalImages);
    optimizeMemory();
    optimizeBrowserCache();
    preloadCriticalImages();
    
    // PHASE 5: Memory and Performance Optimization
    optimizeMemoryUsage();
    
    // Initialize compression manager
    compressionManager.clearCache(); // Start with clean cache
    
    // PHASE 6: EmailJS Initialization
    try {
      initEmailJS();
      console.log("✅ EmailJS initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize EmailJS:", error);
    }

    // PHASE 7: Performance Monitoring
    if ('performance' in window && 'getEntriesByType' in performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          console.log('📊 Performance Metrics:', {
            'DOM Content Loaded': `${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`,
            'Load Complete': `${perfData.loadEventEnd - perfData.loadEventStart}ms`,
            'First Paint': performance.getEntriesByType('paint')[0]?.startTime || 'N/A',
            'Largest Contentful Paint': performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 'N/A'
          });
        }, 0);
      });
    }

    // PHASE 8: Cleanup and URL Monitoring
    const urlCleanupInterval = setInterval(() => {
      const currentUrl = window.location.href;
      if (currentUrl.includes('#ios-favicon-refresh') || currentUrl.includes('%23ios-favicon-refresh')) {
        console.log('🧹 Periodic URL cleanup triggered...');
        cleanURLFragments();
      }
    }, 30000);

    console.log('✅ Phase 2 optimization complete - Service Worker, Resource Preloading, and Compression active');

    return () => {
      clearInterval(urlCleanupInterval);
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
