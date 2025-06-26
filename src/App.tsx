
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App: React.FC = () => {
  useEffect(() => {
    console.log('🚀 Initializing Mylli Services application with URL-safe favicon system...');
    
    // Initialize security session
    securitySession.initializeSession();
    
    // STEP 1: EMERGENCY URL cleanup - Remove ALL broken fragments IMMEDIATELY
    console.log('🆘 EMERGENCY: Cleaning broken URL fragments...');
    cleanURLFragments();
    
    // Additional aggressive URL cleanup for accumulated fragments
    const emergencyUrlCleanup = () => {
      const currentUrl = window.location.href;
      if (currentUrl.includes('#') || currentUrl.includes('%23') || currentUrl.includes('ios-favicon-refresh')) {
        console.log('🚨 CRITICAL: Performing emergency URL cleanup...');
        
        // Extract clean base URL
        let cleanUrl = currentUrl.split('#')[0];
        cleanUrl = cleanUrl.replace(/%23[^&]*/g, '');
        cleanUrl = cleanUrl.replace(/ios-favicon-refresh/g, '');
        cleanUrl = cleanUrl.replace(/[?&]v=[^&]*/g, '');
        cleanUrl = cleanUrl.replace(/[?&]session=[^&]*/g, '');
        cleanUrl = cleanUrl.replace(/[?&]ios=[^&]*/g, '');
        
        // Remove any trailing parameters
        cleanUrl = cleanUrl.replace(/[?&]$/, '');
        
        window.history.replaceState(null, '', cleanUrl);
        console.log('✅ EMERGENCY URL cleanup complete:', cleanUrl);
      }
    };
    
    emergencyUrlCleanup();
    
    // STEP 2: Initialize the URL-safe favicon system
    console.log('🍎 Launching URL-safe iOS favicon system...');
    initializeFaviconManager();
    
    // STEP 3: Preload critical images
    preloadCriticalImages();

    // STEP 4: Initialize EmailJS
    try {
      initEmailJS();
      console.log("✅ EmailJS initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize EmailJS:", error);
    }

    // STEP 5: Set up periodic URL cleanup to prevent fragment accumulation
    const urlCleanupInterval = setInterval(() => {
      const currentUrl = window.location.href;
      if (currentUrl.includes('#ios-favicon-refresh') || currentUrl.includes('%23ios-favicon-refresh')) {
        console.log('🧹 Periodic URL cleanup triggered...');
        cleanURLFragments();
      }
    }, 30000); // Check every 30 seconds

    console.log('✅ Application initialization complete with URL-safe favicon system');

    // Cleanup interval on unmount
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
