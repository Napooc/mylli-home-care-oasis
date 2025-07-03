import React, { Suspense } from 'react';
import SectionHeading from '@/components/common/SectionHeading';

const DeferredFeatures = React.lazy(() => import('./DeferredFeatures'));

const LazyFeatureSection: React.FC = () => {
  return (
    <section className="py-24 bg-white" aria-labelledby="features-heading">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Pourquoi choisir Mylli Services ?"
          id="features-heading"
        >
          <p className="text-mylli-gray text-lg mt-4">Découvrez les avantages qui font de nous le leader des soins à domicile</p>
        </SectionHeading>
        
        {/* Loading placeholders */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="loading-skeleton h-80 rounded-xl"></div>
          ))}
        </div>
        
        <Suspense fallback={null}>
          <DeferredFeatures />
        </Suspense>
      </div>
    </section>
  );
};

export default LazyFeatureSection;