import React, { Suspense } from 'react';
import LazyHeroSection from '@/components/sections/LazyHeroSection';
import LazyServiceSection from '@/components/sections/LazyServiceSection';
import LazyTestimonialSection from '@/components/sections/LazyTestimonialSection';
import ContactForm from '@/components/common/ContactForm';
import ServiceLocations from '@/components/common/ServiceLocations';
import SEOHead from '@/components/seo/SEOHead';
import OptimizedImage from '@/components/seo/OptimizedImage';
import { generateHomepageStructuredData } from '@/utils/structuredData';

const HomePage = () => {
  // Service data
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
    </div>,
    features: ["Pose et surveillance de perfusions", "Pansements et injections", "Pose et surveillance de sondes nasogastrique et urinaire", "Traitement Des escarres"],
    link: "/services/infirmier",
    gradient: "from-mylli-secondary via-mylli-tertiary to-mylli-accent"
  }];

  const testimonials = [{
    name: "HAYAT ABOUNAI",
    text: "Vous méritez plus que 5 étoiles merci infiniment et lah yrham lwalidine bonne continuation",
    rating: 5,
    service: "Service d'aide à domicile",
    avatar: "H",
    verified: true
  }, {
    name: "Mohammed Mohamed",
    text: "Mylli Service est Un organisme professionnel, une équipe à l'écoute qui respecte les normes d'hygiène et surtout humaine ! Je vous remercie beaucoup et je vous recommanderai avec plaisir !",
    rating: 5,
    service: "Soins infirmiers",
    avatar: "M",
    verified: true
  }, {
    name: "Amal LOUDIYI",
    text: "Merci à l'équipe qui a été très réactive et l'infirmier j'ai rien senti et très gentil. Je recommande !!!",
    rating: 5,
    service: "Soins infirmiers",
    avatar: "A",
    verified: true
  }, {
    name: "MOUHAJIR ABDELAZIZ",
    text: "Écoute. Professionnalisme. Empathie et efficacité. Bravo et merci à tout le staff de l'équipe. Services ayant bénéficié à plusieurs membres de ma famille. 👏👏",
    rating: 5,
    service: "Services multiples",
    avatar: "M",
    verified: true
  }];

  const serviceLocations = [{
    city: "Casablanca",
    areas: [],
    highlight: false
  }, {
    city: "Mohammedia",
    areas: []
  }, {
    city: "Bouskoura",
    areas: []
  }, {
    city: "Dar Bouazza",
    areas: []
  }, {
    city: "Marrakech",
    areas: []
  }, {
    city: "Rabat",
    areas: []
  }, {
    city: "Salé",
    areas: []
  }];

  const structuredData = generateHomepageStructuredData();

  return (
    <>
      <SEOHead 
        title="Mylli Services | N°1 Soins à Domicile Casablanca depuis 2014 ❤️" 
        description="Depuis 2014, première société au Maroc de soins et d'aide à domicile pour les personnes fragilisées ❤️, avec des aides-soignants certifiés et des gardes-malades disponibles 24h/7j 🩺" 
        keywords="aide domicile casablanca, infirmier domicile casablanca, aide soignant domicile casablanca, garde malade casablanca, soins infirmiers domicile, mylli services casablanca, aide domicile personnes agees, infirmier nuit casablanca, garde malade 24h casablanca, soins palliatifs domicile, assistance medicale domicile, infirmier liberal casablanca" 
        canonicalUrl="/" 
        structuredData={structuredData} 
      />
      
      <div className="overflow-hidden">
        {/* Optimized Hero Section */}
        <LazyHeroSection />
        
        {/* Optimized Services Section */}
        <LazyServiceSection services={services} />
        
        {/* Optimized Testimonials Section */}
        <Suspense fallback={<div className="loading-skeleton h-96"></div>}>
          <LazyTestimonialSection testimonials={testimonials} />
        </Suspense>

        {/* Contact Section */}
        <section className="section-padding bg-gradient-to-br from-mylli-light/50 to-white relative overflow-hidden">
          <div className="container-custom relative z-10">
            <ContactForm />
          </div>
        </section>

        {/* Service Locations */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <ServiceLocations locations={serviceLocations} />
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;