import React, { Suspense } from 'react';
import SectionHeading from '@/components/common/SectionHeading';

const DeferredTestimonials = React.lazy(() => import('./DeferredTestimonials'));

const LazyTestimonialSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Témoignages de nos clients" 
          id="testimonials-heading"
        >
          <p className="text-mylli-gray text-lg mt-4">Découvrez ce que nos clients pensent de nos services</p>
        </SectionHeading>
        
        {/* Loading placeholders */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mt-16">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="loading-skeleton h-64 rounded-xl"></div>
          ))}
        </div>
        
        <Suspense fallback={null}>
          <DeferredTestimonials />
        </Suspense>
      </div>
    </section>
  );
};

export default LazyTestimonialSection;