
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
import { performanceMonitor } from "./utils/performanceMonitor";
import { resourcePreloader } from "./utils/resourcePreloader";
import { preloadCriticalFonts, loadFontsAsync } from "./utils/fontOptimization";
import "./styles/global.css";

// Optimized QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false, // Reduce unnecessary requests
    },
  },
});

const App: React.FC = () => {
  useEffect(() => {
    console.log('🚀 Initializing optimized Mylli Services application...');
    
    // STEP 1: Critical performance optimizations (synchronous)
    performanceMonitor.init();
    resourcePreloader.preloadCriticalResources();
    preloadCriticalFonts();
    
    // STEP 2: Security and URL cleanup
    securitySession.initializeSession();
    cleanURLFragments();
    
    // STEP 3: Favicon system (non-blocking)
    requestIdleCallback(() => {
      initializeFaviconManager();
    });
    
    // STEP 4: Load non-critical resources asynchronously
    requestIdleCallback(() => {
      loadFontsAsync();
      preloadCriticalImages();
      resourcePreloader.preloadImagesInViewport();
    });

    // STEP 5: Initialize EmailJS (low priority)
    requestIdleCallback(() => {
      try {
        initEmailJS();
        console.log("✅ EmailJS initialized successfully");
      } catch (error) {
        console.error("❌ Failed to initialize EmailJS:", error);
      }
    });

    // STEP 6: Service Worker registration for caching
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(() => console.log('✅ Service Worker registered'))
          .catch(() => console.log('ℹ️ Service Worker not available'));
      });
    }

    console.log('✅ Performance optimizations complete');
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
