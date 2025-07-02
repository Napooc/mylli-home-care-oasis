
import React, { useEffect } from 'react';
import BrandName from '../common/BrandName';
import '../../styles/hero-critical.css';

const InstantHero: React.FC = () => {
  // Phase 1: Critical resource preloading
  useEffect(() => {
    // Preload critical hero background image only
    const heroImage = new Image();
    heroImage.src = '/lovable-uploads/00945798-dc13-478e-94d1-d1aaa70af5a6.png';
    heroImage.loading = 'eager';
    
    // Add resource hints for critical domains
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);
  }, []);

  return (
    <section className="hero-section gpu-accelerated" style={{
      backgroundImage: 'url(/lovable-uploads/00945798-dc13-478e-94d1-d1aaa70af5a6.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {/* Critical gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-mylli-dark/80 via-mylli-primary/60 to-mylli-dark/70 z-10"></div>
      
      <div className="container-custom relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <div className="brand-name mb-4">
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
              className="btn-primary shadow-lg hover:shadow-xl hover:scale-105"
            >
              📞 Urgence: +212 661 37 74 38
            </a>
            <a 
              href="#services" 
              className="btn-secondary hover:bg-white/30 hover:scale-105"
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
