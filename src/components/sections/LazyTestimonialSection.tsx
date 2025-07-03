import React, { Suspense } from 'react';
import TestimonialCard from '../common/TestimonialCard';

const DeferredTestimonialEnhancements = React.lazy(() => import('./DeferredTestimonialEnhancements'));

interface Testimonial {
  name: string;
  text: string;
  rating: number;
  service: string;
  avatar: string;
  verified: boolean;
}

interface LazyTestimonialSectionProps {
  testimonials: Testimonial[];
}

const LazyTestimonialSection: React.FC<LazyTestimonialSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-mylli-primary/5 to-mylli-secondary/5 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mylli-dark mb-6">
            Témoignages de nos Patients
          </h2>
          <p className="text-xl text-mylli-gray max-w-3xl mx-auto leading-relaxed">
            La confiance de nos patients fait notre fierté
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="fade-in-fast" style={{ animationDelay: `${index * 0.15}s` }}>
              <TestimonialCard {...testimonial} quote={testimonial.text} />
            </div>
          ))}
        </div>
      </div>
      
      <Suspense fallback={null}>
        <DeferredTestimonialEnhancements />
      </Suspense>
    </section>
  );
};

export default LazyTestimonialSection;