import React, { lazy, Suspense } from 'react';

// Phase 2: Lazy load service cards below the fold
const ServiceCard = lazy(() => import('../common/ServiceCard'));

// Lightweight skeleton for service cards during loading
const ServiceCardSkeleton: React.FC = () => (
  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-lg p-8 animate-pulse">
    <div className="flex flex-col items-center text-center space-y-6">
      <div className="w-80 h-80 bg-gray-200 rounded-3xl"></div>
      <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
      <div className="w-full h-4 bg-gray-200 rounded"></div>
      <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
    </div>
  </div>
);

interface LazyServiceSectionProps {
  services: Array<{
    title: string;
    description: string;
    detailedDescription: string;
    icon: React.ReactNode;
    link: string;
  }>;
}

const LazyServiceSection: React.FC<LazyServiceSectionProps> = ({ services }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {services.map((service, index) => (
        <div key={index} className="service-card-container">
          <Suspense fallback={<ServiceCardSkeleton />}>
            <ServiceCard
              title={service.title}
              description={service.description}
              detailedDescription={service.detailedDescription}
              icon={service.icon}
              link={service.link}
              style="3d"
              color="primary"
            />
          </Suspense>
        </div>
      ))}
    </div>
  );
};

export default LazyServiceSection;