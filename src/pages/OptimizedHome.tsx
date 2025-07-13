
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, User, Home as HomeIcon, Clock, Shield, CheckCircle, Star, ArrowUpRight, Phone, Share, X, Quote, Syringe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from '@/components/common/SectionHeading';
import ContactForm from '@/components/common/ContactForm';
import ServiceLocations from '@/components/common/ServiceLocations';
import SEOHead from '@/components/seo/SEOHead';
import OptimizedImage from '@/components/seo/OptimizedImage';
import ModernScrollReveal from '@/components/animations/ModernScrollReveal';
import StaggeredReveal from '@/components/animations/StaggeredReveal';
import { generateHomepageStructuredData } from '@/utils/structuredData';
import { smartPreload } from '@/utils/pageImagePreloader';
import LazyHeroSection from '@/components/sections/LazyHeroSection';
import LazyServiceSection from '@/components/sections/LazyServiceSection';
import LazyTestimonialSection from '@/components/sections/LazyTestimonialSection';
import LazyFeatureSection from '@/components/sections/LazyFeatureSection';

const OptimizedHome = () => {
  // Only essential state for critical functionality
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Critical intersection observer for stats counter
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Stats counter animation
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

  const howItWorks = [{
    step: 1,
    title: "Rencontre à domicile",
    description: "Nous prenons le temps de vous rencontrer chez vous pour comprendre vos besoins spécifiques et évaluer la situation.",
    icon: <HomeIcon size={32} className="text-mylli-primary" />,
    color: "primary"
  }, {
    step: 2,
    title: "Proposition personnalisée",
    description: "Nous élaborons un devis sur mesure adapté à vos besoins spécifiques et votre budget.",
    icon: <User size={32} className="text-mylli-secondary" />,
    color: "secondary"
  }, {
    step: 3,
    title: "Présentation de l'intervenant",
    description: "Nous vous présentons le soignant qualifié qui vous accompagnera dans votre quotidien.",
    icon: <Heart size={32} className="text-mylli-quaternary" />,
    color: "quaternary"
  }, {
    step: 4,
    title: "Suivi de satisfaction",
    description: "Nous effectuons un suivi régulier pour garantir votre satisfaction et ajuster si nécessaire.",
    icon: <CheckCircle size={32} className="text-mylli-accent" />,
    color: "accent"
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

  // Smart preload next likely pages
  useEffect(() => {
    smartPreload('home');
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

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
        {/* Ultra-fast hero section */}
        <LazyHeroSection />

        {/* Statistics Section - Critical for trust */}
        <ModernScrollReveal direction="up" duration={1.2}>
          <section ref={heroRef} className="py-16 bg-gradient-to-r from-mylli-primary to-mylli-secondary">
            <div className="container mx-auto px-4">
              <StaggeredReveal staggerDelay={0.15} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">{count}+</div>
                  <div className="text-sm md:text-base opacity-90">Années d'expérience</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                  <div className="text-sm md:text-base opacity-90">Disponibilité</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
                  <div className="text-sm md:text-base opacity-90">Diplômés d'État</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">N°1</div>
                  <div className="text-sm md:text-base opacity-90">Au Maroc</div>
                </div>
              </StaggeredReveal>
            </div>
          </section>
        </ModernScrollReveal>

        {/* Lazy-loaded sections */}
        <LazyServiceSection />

        {/* How it works section - Essential for conversion */}
        <ModernScrollReveal direction="up" duration={1.0}>
          <section className="py-24 bg-gray-50" aria-labelledby="how-it-works-heading">
            <div className="container mx-auto px-4">
              <ModernScrollReveal direction="fade" duration={0.8}>
                <SectionHeading 
                  title="Comment ça marche ?" 
                  id="how-it-works-heading"
                >
                  <p className="text-mylli-gray text-lg mt-4">Un processus simple et transparent pour vous accompagner</p>
                </SectionHeading>
              </ModernScrollReveal>
              <StaggeredReveal 
                staggerDelay={0.2} 
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-16"
              >
                {howItWorks.map((step, index) => (
                  <div key={index} className="text-center group">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-mylli-${step.color} to-mylli-${step.color}/80 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105`}>
                      {step.step}
                    </div>
                    <div className="mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-mylli-dark mb-3">{step.title}</h3>
                    <p className="text-mylli-gray leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </StaggeredReveal>
            </div>
          </section>
        </ModernScrollReveal>

        <LazyFeatureSection />
        <LazyTestimonialSection />

        {/* Service locations - Critical for local SEO */}
        <ModernScrollReveal direction="up" duration={1.0}>
          <ServiceLocations locations={serviceLocations} />
        </ModernScrollReveal>

        {/* CTA section - Critical for conversion */}
        <ModernScrollReveal direction="scale" duration={1.2}>
          <section className="py-24 bg-gradient-to-br from-mylli-primary to-mylli-secondary text-white">
            <div className="container mx-auto px-4 text-center">
              <ModernScrollReveal direction="fade" delay={0.3}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Besoin d'aide ? Nous sommes là pour vous
                </h2>
              </ModernScrollReveal>
              <ModernScrollReveal direction="fade" delay={0.5}>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Contactez-nous dès maintenant pour un devis gratuit et personnalisé
                </p>
              </ModernScrollReveal>
              <ModernScrollReveal direction="up" delay={0.7}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a 
                    href="tel:+212661377438" 
                    className="bg-white text-mylli-primary px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    📞 Appel gratuit: +212 661 37 74 38
                  </a>
                  <Button 
                    onClick={() => scrollToSection('contact')} 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-mylli-primary"
                  >
                    Devis gratuit
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </div>
              </ModernScrollReveal>
            </div>
          </section>
        </ModernScrollReveal>

        {/* Contact form */}
        <ModernScrollReveal direction="up" duration={1.0}>
          <section id="contact" className="py-24 bg-white">
            <div className="container mx-auto px-4">
              <ModernScrollReveal direction="fade" duration={0.8}>
                <SectionHeading 
                  title="Contactez-nous"
                >
                  <p className="text-mylli-gray text-lg mt-4">Demandez votre devis gratuit et personnalisé</p>
                </SectionHeading>
              </ModernScrollReveal>
              <ModernScrollReveal direction="up" delay={0.3}>
                <div className="max-w-2xl mx-auto mt-16">
                  <ContactForm />
                </div>
              </ModernScrollReveal>
            </div>
          </section>
        </ModernScrollReveal>
      </div>
    </>
  );
};

export default OptimizedHome;
