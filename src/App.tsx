
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
import { optimizeDOM, reduceReflows, iosOptimizeAnimations } from "./utils/domOptimizer";
import "./styles/global.css";

// iOS-optimized QueryClient configuration
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

// iOS detection utility
const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// iOS-specific optimizations
const initIOSOptimizations = () => {
  if (!isIOS()) return;
  
  console.log('🍎 Initializing iOS optimizations...');
  
  // iOS viewport fix
  const setIOSViewport = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  // iOS scroll optimization
  const optimizeIOSScroll = () => {
    document.body.style.webkitOverflowScrolling = 'touch';
    document.body.style.overscrollBehaviorY = 'contain';
  };
  
  // iOS input handling
  const optimizeIOSInputs = () => {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      if (input instanceof HTMLElement) {
        input.style.fontSize = '16px';
        input.style.webkitAppearance = 'none';
        input.style.webkitBorderRadius = '0';
      }
    });
  };
  
  // iOS animation optimization
  const optimizeIOSAnimations = () => {
    iosOptimizeAnimations();
  };
  
  // Apply optimizations
  setIOSViewport();
  optimizeIOSScroll();
  optimizeIOSInputs();
  optimizeIOSAnimations();
  
  // Event listeners for iOS
  window.addEventListener('resize', setIOSViewport, { passive: true });
  window.addEventListener('orientationchange', () => {
    setTimeout(setIOSViewport, 100);
  }, { passive: true });
  
  // Re-optimize inputs when DOM changes
  const observer = new MutationObserver(() => {
    optimizeIOSInputs();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  console.log('✅ iOS optimizations initialized');
};

const App: React.FC = () => {
  useEffect(() => {
    console.log('🚀 Initializing performance-optimized Mylli Services with iOS compatibility...');
    
    // PHASE 1: Critical performance optimizations (immediate)
    inlineCriticalCSS();
    preloadCriticalResources();
    advancedPerformanceMonitor.init();
    
    // PHASE 2: iOS-specific optimizations (high priority)
    initIOSOptimizations();
    
    // PHASE 3: Security and cleanup (high priority)
    securitySession.initializeSession();
    cleanURLFragments();
    
    // PHASE 4: DOM optimizations (requestIdleCallback or fallback)
    const runDOMOptimizations = () => {
      try {
        optimizeDOM();
        reduceReflows();
        deferNonCriticalCSS();
      } catch (error) {
        console.warn('DOM optimizations failed:', error);
      }
    };
    
    if (window.requestIdleCallback) {
      requestIdleCallback(runDOMOptimizations, { timeout: 1000 });
    } else {
      setTimeout(runDOMOptimizations, 100);
    }
    
    // PHASE 5: Non-critical resources (low priority)
    const runNonCriticalInit = () => {
      initializeFaviconManager();
      
      // Register service worker with iOS compatibility
      if ('serviceWorker' in navigator) {
        const swFile = isIOS() ? '/sw-ios.js' : '/sw-optimized.js';
        navigator.serviceWorker.register(swFile)
          .then(() => console.log('✅ Service Worker registered'))
          .catch(() => console.log('ℹ️ Service Worker registration failed'));
      }
      
      try {
        initEmailJS();
        console.log("✅ EmailJS initialized");
      } catch (error) {
        console.error("❌ EmailJS failed:", error);
      }
    };
    
    if (window.requestIdleCallback) {
      requestIdleCallback(runNonCriticalInit, { timeout: 2000 });
    } else {
      setTimeout(runNonCriticalInit, 500);
    }
    
    // PHASE 6: Performance monitoring (delayed)
    setTimeout(() => {
      try {
        const report = advancedPerformanceMonitor.generateReport();
        if (report.performance < 80) {
          console.warn('⚠️ Performance below target, check metrics');
        }
        
        if (isIOS()) {
          console.log('📱 iOS device detected - all optimizations active');
        }
      } catch (error) {
        console.warn('Performance monitoring failed:', error);
      }
    }, 5000);

    console.log('✅ All performance optimizations initialized with iOS compatibility');
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
