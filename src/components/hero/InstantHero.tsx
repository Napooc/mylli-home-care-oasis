
import React from 'react';
import BrandName from '../common/BrandName';

const InstantHero: React.FC = () => {
  return (
    <section className="hero-section gpu-accelerated">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <div className="text-4xl md:text-6xl lg:text-7xl mb-4">
              <BrandName />
            </div>
          </div>
          
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="text-white">
              N°1 des Soins à Domicile
            </span>
            <br />
            <span className="text-white/90">
              Casablanca depuis 2014
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Infirmiers diplômés d'État • Aides-soignants certifiés • Garde malades 24h/24
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:+212661377438" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
    </section>
  );
};

export default InstantHero;
