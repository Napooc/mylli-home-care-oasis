
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SmartImage from '@/components/common/SmartImage';
import { Button } from '@/components/ui/button';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: string;
}

interface OptimizedServiceCardsProps {
  services: Service[];
  onServiceClick?: (service: Service) => void;
}

const OptimizedServiceCards: React.FC<OptimizedServiceCardsProps> = ({
  services,
  onServiceClick
}) => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection observer for viewport-aware loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const cards = containerRef.current?.querySelectorAll('.service-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [services]);

  return (
    <div 
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
    >
      {services.map((service, index) => (
        <Card
          key={service.id}
          data-index={index}
          className={`service-card group cursor-pointer hover:shadow-xl transition-all duration-300 ${
            visibleCards.has(index) ? 'animate-fade-in' : 'opacity-0'
          }`}
          onClick={() => onServiceClick?.(service)}
        >
          <CardContent className="p-0">
            <div className="relative overflow-hidden rounded-t-lg">
              {visibleCards.has(index) ? (
                <SmartImage
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  lazy={index > 2} // First 3 cards load immediately
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-t-lg" />
              )}
              
              {/* Service icon overlay */}
              {service.icon && visibleCards.has(index) && (
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{service.icon}</span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {service.description}
              </p>
              <Button 
                variant="outline" 
                size="sm"
                className="group-hover:bg-blue-600 group-hover:text-white transition-colors"
              >
                En savoir plus
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OptimizedServiceCards;
