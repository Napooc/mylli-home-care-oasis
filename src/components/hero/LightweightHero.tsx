
import React from 'react';
import BrandName from '../common/BrandName';

const LightweightHero: React.FC = () => {
  return (
    <section className="hero-section relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Immediate brand visibility */}
          <div className="mb-6">
            <BrandName className="text-4xl md:text-6xl lg:text-7xl mb-4" />
          </div>
          
          {/* Critical headline - loads instantly */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="flash-white-strong">
              N°1 des Soins à Domicile
            </span>
            <br />
            <span className="text-white/90">
              Casablanca depuis 2014
            </span>
          </h1>
          
          {/* Essential value proposition */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Infirmiers diplômés d'État • Aides-soignants certifiés • Garde malades 24h/24
          </p>
          
          {/* Primary CTA - critical for conversion */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:+212661377438" 
              className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl"
            >
              📞 Urgence: +212 661 37 74 38
            </a>
            <a 
              href="#services" 
              className="bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all duration-300"
            >
              Découvrir nos services
            </a>
          </div>
        </div>
      </div>
      
      {/* Simple background decoration - no complex animations initially */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-900/20"></div>
    </section>
  );
};

export default LightweightHero;
