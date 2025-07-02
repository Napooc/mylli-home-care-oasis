import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import ServiceCard from '@/components/common/ServiceCard';
import OptimizedImage from '@/components/seo/OptimizedImage';

interface LazyServiceSectionProps {
  services: any[];
}

const LazyServiceSection: React.FC<LazyServiceSectionProps> = ({ services }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Load 50px before entering viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden" 
      aria-labelledby="services-heading"
    >
      <div className="container-custom relative z-10">
        <header className="max-w-2xl mx-auto mb-12 md:mb-16">
          <SectionHeading 
            title="Services dédiés à votre santé et à votre bien-être" 
            variant="animated" 
            highlightText="santé et bien-être" 
            className="text-center" 
            id="services-heading" 
          />
        </header>
        
        {isVisible && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="fade-in-fast" style={{ animationDelay: `${index * 200}ms` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        )}
        
        {!isVisible && (
          // Loading skeleton
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="loading-skeleton h-[500px] rounded-3xl"></div>
            ))}
          </div>
        )}
        
        {isVisible && (
          <div className="mt-12 md:mt-16 text-center px-4 fade-in-fast" style={{ animationDelay: '600ms' }}>
            <Link 
              to="/services" 
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-mylli-primary to-mylli-quaternary text-white font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-neon group mx-0 text-sm md:text-base"
            >
              <span className="mr-2">Découvrir nos services</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LazyServiceSection;