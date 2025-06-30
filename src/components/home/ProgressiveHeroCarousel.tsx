
import React, { useState, useEffect, useCallback } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import SmartImage from '@/components/common/SmartImage';

interface HeroSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  priority?: boolean;
}

interface ProgressiveHeroCarouselProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const ProgressiveHeroCarousel: React.FC<ProgressiveHeroCarouselProps> = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Progressive loading: Mark first slide as priority, others as lazy
  const enhancedSlides = slides.map((slide, index) => ({
    ...slide,
    priority: index === 0
  }));

  // Defer animations until component is visible
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Auto-play functionality with performance optimization
  useEffect(() => {
    if (!autoPlay || !isVisible) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, nextSlide, isVisible]);

  return (
    <div className={`relative w-full transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Carousel className="w-full">
        <CarouselContent>
          {enhancedSlides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <Card className="border-0 rounded-none overflow-hidden">
                <div className="relative h-[70vh] md:h-[80vh]">
                  <SmartImage
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    priority={slide.priority}
                    critical={index === 0}
                    lazy={!slide.priority}
                    quality={index === 0 ? 85 : 75}
                    sizes="100vw"
                  />
                  
                  {/* Content overlay with deferred animation */}
                  <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-700 ${
                    isVisible && index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <div className="text-center text-white max-w-4xl px-6">
                      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation controls with deferred loading */}
        {isVisible && (
          <>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </>
        )}
      </Carousel>

      {/* Slide indicators */}
      {isVisible && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressiveHeroCarousel;
