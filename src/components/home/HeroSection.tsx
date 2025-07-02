import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Syringe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import OptimizedImage from '@/components/seo/OptimizedImage';

const HeroSection = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const {
      clientX,
      clientY
    } = e;
    const {
      left,
      top,
      width,
      height
    } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePosition({
      x,
      y
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCount(prevCount => {
          if (prevCount < 10) {
            return prevCount + 1;
          }
          clearInterval(interval);
          return prevCount;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const careImages = ['/lovable-uploads/bc5d5201-c6c6-41c0-8594-5bef9171aea8.png', '/lovable-uploads/94cdeb85-c1e7-48bd-9d6f-66312af0fb9c.png', '/lovable-uploads/b078eb91-537d-4b59-bb66-5983988c4fab.png'];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const triggerAvailabilityFeature = () => {
    const featuresSection = document.getElementById('features-heading');
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: 'smooth'
      });
      setTimeout(() => {
        const availabilityCard = document.querySelector('[data-feature="availability"]');
        if (availabilityCard) {
          const collapsibleTrigger = availabilityCard.querySelector('[data-state]');
          if (collapsibleTrigger) {
            const isOpen = collapsibleTrigger.getAttribute('data-state') === 'open';
            if (!isOpen) {
              (collapsibleTrigger as HTMLElement).click();
            }
          }
        }
      }, 800);
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-32 md:pt-20" onMouseMove={handleMouseMove} aria-labelledby="hero-heading">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-mylli-dark/80 via-mylli-primary/60 to-mylli-dark/70 z-10"></div>
        
        <div className="absolute inset-0 overflow-hidden">
          {careImages.map((img, index) => 
            <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${activeImage === index ? 'opacity-100' : 'opacity-0'}`}>
              <img src={img} alt="Professional care services" className="absolute w-full h-full object-cover object-center filter brightness-[0.75]" />
            </div>
          )}
        </div>
        
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-mylli-primary opacity-30 blur-3xl animate-pulse-soft"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-mylli-secondary opacity-20 blur-3xl animate-pulse-soft" style={{
            animationDelay: '1s'
          }}></div>
          <div className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-mylli-quaternary opacity-20 blur-2xl animate-pulse-soft" style={{
            animationDelay: '2s'
          }}></div>
        </div>
        
        <div className="absolute inset-0 z-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwMDc3QzAxMCIgZD0iTTAgMGg2MHY2MEgweiIvPjxwYXRoIGQ9Ik0zNiAxOGgtMTJWMmgxMnYxMnptMCAxMmgtMTJWMThoMTJ2MTJ6bTAgMTJoLTEyVjMwaDEydjEyIiBmaWxsPSIjMDA5OUU4MTAiLz48L2c+PC9zdmc+')]"></div>
      </div>
      
      <div className="container-custom relative z-20 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <header>
              <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-tight">
                <span className="block text-white flash-white-strong">
                  NOUS SOMMES LÀ POUR VOUS
                </span>
                <span className="block text-white flash-white-strong">
                  AIDER!
                </span>
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 animate-fade-in delay-[400ms]">
                <Button asChild className="group relative overflow-hidden rounded-xl px-6 py-3 bg-white/15 hover:bg-white/25 border border-white/30 hover:border-white/50 backdrop-blur-sm text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base">
                  <Link to="/services/aide-soignant" className="flex items-center justify-center gap-2">
                    <Heart size={18} className="transition-transform duration-300 group-hover:scale-110" />
                    <span>AIDE-SOIGNANT(E) À DOMICILE</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                
                <Button asChild className="group relative overflow-hidden rounded-xl px-6 py-3 bg-white/15 hover:bg-white/25 border border-white/30 hover:border-white/50 backdrop-blur-sm text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base">
                  <Link to="/services/infirmier" className="flex items-center justify-center gap-2">
                    <Syringe size={18} className="transition-transform duration-300 group-hover:scale-110" />
                    <span>INFIRMIER(ÈRE) À DOMICILE</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              
              <p className="text-lg sm:text-xl md:text-2xl opacity-90 mb-10 max-w-2xl animate-fade-in delay-[600ms] leading-relaxed text-white px-2 sm:px-0">
                Depuis <span className="text-white font-bold">2014</span>, première société au Maroc spécialisée dans les soins et l'accompagnement à domicile des personnes en perte d'autonomie.
              </p>
            </header>
            
            <div className="mt-8 mb-10 grid grid-cols-3 gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto lg:mx-0 animate-fade-in delay-[1200ms]">
              <Link to="/apropos" className="text-center p-3 sm:p-4 backdrop-blur-sm bg-white/15 rounded-xl border border-white/30 hover:border-mylli-secondary/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-mylli-secondary group-hover:text-mylli-secondary">{isVisible ? '+10' : '0'}</p>
               <p className="text-xs sm:text-sm text-white leading-tight">années d'expérience</p>
              </Link>
              <button onClick={() => scrollToSection('testimonials-heading')} className="relative overflow-hidden text-center p-3 sm:p-4 backdrop-blur-sm bg-white/15 rounded-xl border border-white/30 hover:border-mylli-quaternary/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
                <span className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-mylli-quaternary via-mylli-accent to-mylli-primary blur-lg opacity-40"></span>
                </span>
                <p className="relative z-10 text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-mylli-quaternary">{isVisible ? '+6100' : '0'}</p>
                <p className="relative z-10 text-xs sm:text-sm text-white leading-tight group-hover:text-mylli-quaternary">Interventions</p>
              </button>
              <button onClick={triggerAvailabilityFeature} className="relative overflow-hidden text-center p-3 sm:p-4 backdrop-blur-sm bg-white/15 rounded-xl border border-white/30 hover:border-mylli-quaternary/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
                <span className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-mylli-quaternary via-mylli-accent to-mylli-primary blur-lg opacity-40"></span>
                </span>
                <p className="relative z-10 text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-mylli-quaternary">{isVisible ? '24/7' : '0'}</p>
                <p className="relative z-10 text-xs sm:text-sm text-white leading-tight">disponibilité</p>
              </button>
            </div>
          </div>
          
          <aside className="relative flex justify-center items-center mt-8 lg:mt-0">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-mylli-quaternary/30 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-mylli-secondary/30 rounded-full filter blur-3xl"></div>
            
            <article className="relative max-w-sm sm:max-w-md w-full mx-4 sm:mx-0">
              <div className="relative backdrop-blur-lg bg-white/15 border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl group">
                
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110" style={{
                    backgroundImage: `url(${careImages[activeImage]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-mylli-dark/90 via-mylli-dark/30 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 drop-shadow-lg">Soins professionnels</h3>
                    <p className="text-white/95 text-sm font-medium drop-shadow-md">Accompagnement personnalisé à domicile</p>
                  </div>
                  
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex space-x-2">
                    {careImages.map((_, index) => 
                      <button key={index} onClick={() => setActiveImage(index)} className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full transition-all duration-300 border border-white/50 ${activeImage === index ? 'bg-mylli-secondary scale-110 shadow-lg' : 'bg-white/30 hover:bg-white/50'}`} aria-label={`Image ${index + 1}`} />
                    )}
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 bg-white/10 backdrop-blur-sm">
                  <div className="text-white mb-4 sm:mb-6">
                    <p className="leading-relaxed text-sm sm:text-base mb-4 sm:mb-6 text-white/90">
                      Nous sommes spécialement formés pour garantir des services de qualité aux personnes atteintes de maladies chroniques handicapantes comme la maladie de Parkinson, d'Alzheimer, hémiplégie, paraplégie, SEP, SLA, ainsi que les soins palliatifs.
                    </p>
                  </div>
                  
                  <Button asChild variant="outline" className="w-full border-white/30 text-black bg-white hover:bg-white/90 hover:text-black backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg text-sm sm:text-base py-3 sm:py-4 font-medium">
                    <Link to="/mot-du-president" className="flex items-center justify-center">
                      Mot du Fondateur
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          </aside>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 sm:h-20 text-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V100C69,91.27,141.43,76.12,213.33,66.11Z" fill="currentColor"></path>
        </svg>
      </div>
      
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center animate-fade-in delay-[1500ms]">
        <p className="text-sm text-white/80 mb-2">Découvrir</p>
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/80 mt-2 animate-[float_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;