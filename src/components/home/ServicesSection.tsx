import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '@/components/common/SectionHeading';
import ServiceCard from '@/components/common/ServiceCard';
import OptimizedImage from '@/components/seo/OptimizedImage';

const ServicesSection = () => {
  const [hoverCard, setHoverCard] = useState(-1);

  const services = [{
    title: "Aide-soignant(e) à domicile",
    description: "Préservation de l'autonomie tout en accomplissant des actes de la vie quotidienne.",
    detailedDescription: "Notre service d'aide-soignant à domicile garantit un accompagnement personnalisé pour préserver votre autonomie et votre dignité. Nos professionnels qualifiés vous assistent dans les gestes du quotidien tout en respectant vos habitudes et votre rythme de vie.",
    icon: <div className="w-80 h-80 rounded-[3rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-8 border-white/40 bg-gradient-to-br from-mylli-primary/10 via-white/5 to-mylli-quaternary/10 p-8 group-hover:scale-102 group-hover:shadow-[0_45px_80px_-15px_rgba(0,0,0,0.35)] transition-all duration-1000 relative backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-50 rounded-[2.5rem]"></div>
      <div className="absolute inset-4 rounded-[2rem] bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md"></div>
      <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white shadow-[inset_0_8px_16px_rgba(0,0,0,0.1)] relative z-10 border-4 border-white/60">
        <div className="absolute inset-0 bg-gradient-to-br from-mylli-primary/3 via-transparent to-mylli-quaternary/5"></div>
        <OptimizedImage src="/lovable-uploads/a19bc553-aa29-42f9-b4dc-c1b200faa0f8.png" alt="Aide-soignant à domicile - Soins personnalisés" width={300} height={300} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1500 filter brightness-110 contrast-110 saturate-120 relative z-20 hover:filter hover:brightness-115 hover:contrast-115" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/10 pointer-events-none"></div>
      </div>
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-mylli-primary/80 to-mylli-secondary/80 rounded-full shadow-xl backdrop-blur-sm border-2 border-white/30 group-hover:scale-125 group-hover:rotate-180 transition-all duration-1000"></div>
      <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-br from-mylli-quaternary/70 to-mylli-accent/70 rounded-full shadow-lg backdrop-blur-sm border border-white/40 group-hover:scale-110 group-hover:-rotate-90 transition-all duration-1200"></div>
      <div className="absolute top-6 left-6 w-4 h-4 bg-gradient-to-br from-white/60 to-white/30 rounded-full shadow-md group-hover:scale-150 transition-all duration-800"></div>
    </div>,
    features: ["Assiste à l'hygiène corporelle", "Aide à la mobilité", "Aide à l'alimentation", "Aide à la prise de médicaments"],
    link: "/services/aide-soignant",
    gradient: "from-mylli-primary via-mylli-secondary to-mylli-quaternary"
  }, {
    title: "Infirmier(ère) à domicile",
    description: "Soins médicaux à domicile comme alternative à l'hospitalisation.",
    detailedDescription: "Nos infirmiers diplômés d'État interviennent à votre domicile pour tous types de soins médicaux. Une alternative sécurisée à l'hospitalisation qui vous permet de rester dans votre environnement familier.",
    icon: <div className="w-80 h-80 rounded-[3rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-8 border-white/40 bg-gradient-to-br from-mylli-secondary/10 via-white/5 to-mylli-accent/10 p-8 group-hover:scale-102 group-hover:shadow-[0_45px_80px_-15px_rgba(0,0,0,0.35)] transition-all duration-1000 relative backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/20 to-transparent opacity-50 rounded-[2.5rem]"></div>
      <div className="absolute inset-4 rounded-[2rem] bg-gradient-to-bl from-white/30 to-white/10 backdrop-blur-md"></div>
      <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white shadow-[inset_0_8px_16px_rgba(0,0,0,0.1)] relative z-10 border-4 border-white/60">
        <div className="absolute inset-0 bg-gradient-to-bl from-mylli-secondary/3 via-transparent to-mylli-accent/5"></div>
        <OptimizedImage src="/lovable-uploads/50a817cb-5544-420a-88d1-793d11dc6290.png" alt="Infirmier à domicile - Soins médicaux professionnels" width={300} height={300} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1500 filter brightness-110 contrast-110 saturate-120 relative z-20 hover:filter hover:brightness-115 hover:contrast-115" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/10 pointer-events-none"></div>
      </div>
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-bl from-mylli-secondary/80 to-mylli-tertiary/80 rounded-full shadow-xl backdrop-blur-sm border-2 border-white/30 group-hover:scale-125 group-hover:-rotate-180 transition-all duration-1000"></div>
      <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-gradient-to-bl from-mylli-accent/70 to-mylli-primary/70 rounded-full shadow-lg backdrop-blur-sm border border-white/40 group-hover:scale-110 group-hover:rotate-90 transition-all duration-1200"></div>
      <div className="absolute top-6 right-6 w-4 h-4 bg-gradient-to-bl from-white/60 to-white/30 rounded-full shadow-md group-hover:scale-150 transition-all duration-800"></div>
    </div>,
    features: ["Pose et surveillance de perfusions", "Pansements et injections", "Pose et surveillance de sondes nasogastrique et urinaire", "Traitement Des escarres"],
    link: "/services/infirmier",
    gradient: "from-mylli-secondary via-mylli-tertiary to-mylli-accent"
  }];

  return (
    <section className="py-12 md:py-20 relative overflow-hidden bg-gradient-to-br from-mylli-light to-white">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 border border-mylli-primary/10 rounded-full"></div>
        <div className="absolute bottom-20 right-16 w-40 h-40 border-2 border-mylli-secondary/8 rounded-lg rotate-45"></div>
        <div className="absolute top-1/2 left-1/3 w-28 h-28 border border-mylli-quaternary/12 rounded-xl -rotate-12"></div>
        <div className="absolute bottom-1/4 left-1/4 w-20 h-20 border-2 border-mylli-accent/10 rounded-full"></div>
        <div className="absolute top-1/4 right-1/3 w-36 h-36 border border-mylli-primary/8 rounded-lg rotate-12"></div>
        
        <div className="absolute top-20 right-1/4 w-6 h-6 bg-mylli-primary/10 rounded-full animate-pulse-soft"></div>
        <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-mylli-secondary/15 animate-pulse-soft" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-20 w-5 h-5 bg-mylli-quaternary/12 rounded-full animate-pulse-soft" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <header className="text-center mb-12 md:mb-16">
          <SectionHeading 
            title="Nos Services Professionnels"
            variant="animated"
            highlightText="Professionnels"
            className="mb-4"
          />
          <p className="text-lg md:text-xl text-mylli-gray max-w-3xl mx-auto leading-relaxed">
            Des solutions d'accompagnement personnalisées pour répondre à vos besoins spécifiques
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative"
              onMouseEnter={() => setHoverCard(index)}
              onMouseLeave={() => setHoverCard(-1)}
            >
              <ServiceCard
                {...service}
                className="h-full transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <Link 
            to="/services" 
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-mylli-primary to-mylli-quaternary text-white font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-neon group"
          >
            <span className="mr-2">Voir tous nos services</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;