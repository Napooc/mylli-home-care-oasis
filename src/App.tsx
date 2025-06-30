
import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load route components with chunk names for better debugging
const Home = lazy(() => import(/* webpackChunkName: "home" */ "./pages/Home"));
const Services = lazy(() => import(/* webpackChunkName: "services" */ "./pages/Services"));
const APropos = lazy(() => import(/* webpackChunkName: "about" */ "./pages/APropos"));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */ "./pages/Contact"));
const Equipe = lazy(() => import(/* webpackChunkName: "team" */ "./pages/Equipe"));
const Articles = lazy(() => import(/* webpackChunkName: "articles" */ "./pages/Articles"));
const ArticleDetail = lazy(() => import(/* webpackChunkName: "article-detail" */ "./pages/ArticleDetail"));
const Fonctionnement = lazy(() => import(/* webpackChunkName: "how-it-works" */ "./pages/Fonctionnement"));
const MotDuPresident = lazy(() => import(/* webpackChunkName: "president-message" */ "./pages/MotDuPresident"));
const Infirmier = lazy(() => import(/* webpackChunkName: "nurse-service" */ "./pages/services/Infirmier"));
const AideSoignant = lazy(() => import(/* webpackChunkName: "caregiver-service" */ "./pages/services/AideSoignant"));
const PolitiqueConfidentialite = lazy(() => import(/* webpackChunkName: "privacy" */ "./pages/PolitiqueConfidentialite"));
const CookiePolicy = lazy(() => import(/* webpackChunkName: "cookies" */ "./pages/CookiePolicy"));
const NotFound = lazy(() => import(/* webpackChunkName: "not-found" */ "./pages/NotFound"));

// Create optimized query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000, // 10 minutes
      gcTime: 15 * 60 * 1000, // 15 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Optimized route loader component
const RouteLoader = () => (
  <div className="min-h-screen flex flex-col animate-pulse">
    <div className="h-16 bg-gray-200 w-full" />
    <div className="flex-1 p-6 space-y-4">
      <div className="h-8 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-full" />
      <div className="h-4 bg-gray-100 rounded w-5/6" />
      <div className="h-64 bg-gray-200 rounded w-full" />
    </div>
    <div className="h-32 bg-gray-200 w-full" />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background font-sans antialiased">
            <MainLayout>
              <Suspense fallback={<RouteLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/infirmier-domicile" element={<Infirmier />} />
                  <Route path="/services/aide-soignant-domicile" element={<AideSoignant />} />
                  <Route path="/a-propos" element={<APropos />} />
                  <Route path="/equipe" element={<Equipe />} />
                  <Route path="/fonctionnement" element={<Fonctionnement />} />
                  <Route path="/mot-du-president" element={<MotDuPresident />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/articles/:slug" element={<ArticleDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
                  <Route path="/politique-cookies" element={<CookiePolicy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </MainLayout>
            <Toaster />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
