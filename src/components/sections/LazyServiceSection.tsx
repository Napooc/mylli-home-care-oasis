import React, { Suspense } from 'react';
import SectionHeading from '@/components/common/SectionHeading';
import { ArrowRight } from 'lucide-react';

const DeferredServices = React.lazy(() => import('./DeferredServices'));

const LazyServiceSection: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white" aria-labelledby="services-heading">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Nos Services" 
          id="services-heading"
        >
          <p className="text-mylli-gray text-lg mt-4">Des soins médicaux et d'assistance à domicile adaptés à vos besoins</p>
        </SectionHeading>
        
        {/* Immediate visible content */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto mt-16">
          {/* Service Cards will be loaded below */}
          <div className="loading-skeleton h-96 rounded-3xl"></div>
          <div className="loading-skeleton h-96 rounded-3xl"></div>
        </div>
        
        <Suspense fallback={null}>
          <DeferredServices />
        </Suspense>
      </div>
    </section>
  );
};

export default LazyServiceSection;