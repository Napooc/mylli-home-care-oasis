import React from 'react';
import BrandName from '../common/BrandName';

const UltraFastHero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-mylli-primary via-mylli-secondary to-mylli-dark">
      {/* Ultra-fast gradient background - no images */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-mylli-primary/90 via-mylli-secondary/80 to-mylli-dark/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05)_0%,transparent_50%)]"></div>
      </div>

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
              className="bg-white text-mylli-primary text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
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

export default UltraFastHero;