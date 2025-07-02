
import React, { Suspense } from 'react';
import HeroSection from './HeroSection';

// Lazy load non-critical sections
const ServicesSection = React.lazy(() => import('./ServicesSection'));
const AboutSection = React.lazy(() => import('./AboutSection'));
const ContactSection = React.lazy(() => import('./ContactSection'));

// Lightweight loading fallback
const SectionSkeleton = () => (
  <div className="py-20">
    <div className="container-custom">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const OptimizedHomePage: React.FC = () => {
  return (
    <div>
      {/* Critical hero section loads immediately */}
      <HeroSection />
      
      {/* Non-critical sections load progressively */}
      <Suspense fallback={<SectionSkeleton />}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection />
      </Suspense>
    </div>
  );
};

export default OptimizedHomePage;
