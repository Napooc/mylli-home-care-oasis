import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import TestimonialCard from '@/components/common/TestimonialCard';

interface LazyTestimonialSectionProps {
  testimonials: any[];
}

const LazyTestimonialSection: React.FC<LazyTestimonialSectionProps> = ({ testimonials }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2); // Initially show 2 testimonials
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const loadMoreTestimonials = () => {
    setVisibleCount(prev => Math.min(prev + 2, testimonials.length));
  };

  return (
    <section 
      ref={sectionRef}
      className="section-padding bg-gradient-to-br from-mylli-light to-white relative overflow-hidden" 
      aria-labelledby="testimonials-heading"
    >
      <div className="container-custom relative z-10">
        <header className="max-w-2xl mx-auto mb-12 md:mb-16">
          <SectionHeading 
            title="Témoignages de nos patients" 
            variant="animated" 
            highlightText="Témoignages" 
            className="text-center" 
            id="testimonials-heading" 
          />
        </header>
        
        {isVisible && (
          <>
            {/* Virtual scrolling for testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {testimonials.slice(0, visibleCount).map((testimonial, index) => (
                <div 
                  key={index} 
                  className="fade-in-fast" 
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
            
            {visibleCount < testimonials.length && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMoreTestimonials}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-mylli-primary text-white font-medium hover:bg-mylli-secondary transition-all duration-300 hover:scale-105"
                >
                  Voir plus de témoignages
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            )}
          </>
        )}
        
        {!isVisible && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="loading-skeleton h-[200px] rounded-xl"></div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LazyTestimonialSection;