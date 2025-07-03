import React, { Suspense } from 'react';
import ServiceCard from '../common/ServiceCard';

const DeferredServiceEnhancements = React.lazy(() => import('./DeferredServiceEnhancements'));

interface Service {
  title: string;
  description: string;
  detailedDescription: string;
  icon: React.ReactNode;
  features: string[];
  link: string;
  gradient: string;
}

interface LazyServiceSectionProps {
  services: Service[];
}

const LazyServiceSection: React.FC<LazyServiceSectionProps> = ({ services }) => {
  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mylli-dark mb-6">
            Nos Services d'Excellence
          </h2>
          <p className="text-xl text-mylli-gray max-w-3xl mx-auto leading-relaxed">
            Des soins professionnels à domicile pour préserver votre autonomie et votre bien-être
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="fade-in-fast" style={{ animationDelay: `${index * 0.2}s` }}>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
      
      <Suspense fallback={null}>
        <DeferredServiceEnhancements />
      </Suspense>
    </section>
  );
};

export default LazyServiceSection;