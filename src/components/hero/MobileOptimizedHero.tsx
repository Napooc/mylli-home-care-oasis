
import React from 'react';
import BrandName from '../common/BrandName';

const MobileOptimizedHero: React.FC = () => {
  return (
    <section className="hero-section relative overflow-hidden min-h-[60vh] md:min-h-[80vh]">
      <div className="container-custom relative z-10 py-8 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Immediate brand visibility - optimized for mobile */}
          <div className="mb-4 md:mb-6">
            <div className="text-3xl md:text-6xl lg:text-7xl mb-2 md:mb-4">
              <BrandName />
            </div>
          </div>
          
          {/* Mobile-first headline */}
          <h1 className="text-xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="flash-white-strong block mb-1 md:mb-0 md:inline">
              N°1 des Soins à Domicile
            </span>
            <br className="hidden md:block" />
            <span className="text-white/90 text-lg md:text-4xl lg:text-5xl">
              Casablanca depuis 2014
            </span>
          </h1>
          
          {/* Mobile-optimized value proposition */}
          <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
            Infirmiers diplômés d'État • Aides-soignants certifiés • Garde malades 24h/24
          </p>
          
          {/* Mobile-first CTA buttons */}
          <div className="flex flex-col gap-3 md:flex-row md:gap-4 justify-center items-center px-4 md:px-0">
            <a 
              href="tel:+212661377438" 
              className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-lg hover:shadow-xl w-full md:w-auto text-center"
            >
              📞 Urgence: +212 661 37 74 38
            </a>
            <a 
              href="#services" 
              className="bg-white/20 text-white border border-white/30 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 w-full md:w-auto text-center text-base md:text-lg"
            >
              Découvrir nos services
            </a>
          </div>
        </div>
      </div>
      
      {/* Minimal background - no complex animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-900/20"></div>
    </section>
  );
};

export default MobileOptimizedHero;
