
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Clock, Shield, Star, CheckCircle, Users, Award, Headphones } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageBanner from '@/components/common/PageBanner';
import ServiceCard from '@/components/common/ServiceCard';
import TestimonialCard from '@/components/common/TestimonialCard';
import SectionHeading from '@/components/common/SectionHeading';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import UltraFastImage from '@/components/images/UltraFastImage';
import SEOHead from '@/components/seo/SEOHead';
import { generateHomepageStructuredData } from '@/utils/structuredData';

const HomePage: React.FC = () => {
  // Generate structured data for the home page
  const structuredData = generateHomepageStructuredData();

  // Dummy data for the services
  const services = [{
    title: 'AIDE-SOIGNANT(E) À DOMICILE',
    description: 'Assistance personnalisée pour les activités de la vie quotidienne, avec un accompagnement bienveillant et professionnel.',
    image: "/lovable-uploads/93fb824b-3948-43af-a313-a54ebaf3ded0.png",
    link: "/services/aide-soignant",
    icon: Heart
  }, {
    title: 'INFIRMIER(ÈRE) À DOMICILE',
    description: 'Soins médicaux professionnels à domicile, incluant les injections, pansements et suivi médical.',
    image: "/lovable-uploads/0e49a73b-0499-4adb-84fc-7707c6381ef7.png",
    link: "/services/infirmier",
    icon: Clock
  }, {
    title: 'GARDE MALADE JOUR/NUIT',
    description: 'Surveillance et accompagnement de jour comme de nuit, pour une présence rassurante et une sécurité accrue.',
    image: "/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png",
    link: "/services/garde-malade",
    icon: Shield
  }];

  // Dummy data for the testimonials
  const testimonials = [{
    quote: "Grâce à Mylli Services, j'ai pu maintenir mon autonomie à domicile. L'équipe est compétente, humaine et toujours à l'écoute de mes besoins.",
    name: "Mme. Fatima Z.",
    title: "Cliente à Casablanca",
    image: "/placeholder.svg"
  }, {
    quote: "Les infirmiers de Mylli Services ont prodigué des soins exceptionnels à mon père après son opération. Leur professionnalisme et leur gentillesse ont été d'un grand réconfort.",
    name: "M. Karim B.",
    title: "Client à Rabat",
    image: "/placeholder.svg"
  }];

  // Dummy data for the key features
  const keyFeatures = [{
    title: "Expertise et professionnalisme",
    description: "Des équipes qualifiées et expérimentées pour répondre à tous vos besoins d'aide à domicile.",
    icon: Award
  }, {
    title: "Disponibilité 24h/7j",
    description: "Une présence continue pour assurer votre sécurité et votre bien-être à tout moment.",
    icon: Clock
  }, {
    title: "Écoute et accompagnement personnalisé",
    description: "Des services adaptés à votre situation et à vos attentes, pour un accompagnement sur mesure.",
    icon: Headphones
  }];

  return (
    <div>
      <SEOHead 
        title="Mylli Services - Aide à domicile professionnelle à Casablanca"
        description="Services d'aide à domicile personnalisés : aide-soignant, infirmier, garde-malade. Bénéficiez d'une assistance professionnelle et humaine à Casablanca et environs."
        keywords="aide à domicile, aide-soignant, infirmier, garde-malade, Casablanca, services à la personne"
        canonicalUrl="/"
        structuredData={structuredData}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <UltraFastImage
            src="/lovable-uploads/f9c9399d-8e56-449f-999f-999c90a9974d.png"
            alt="Aide à domicile"
            className="w-full h-full object-cover object-center opacity-30"
            priority={true}
            width={1920}
            height={1080}
            quality={80}
            sizes="100vw"
          />
        </div>
        <div className="section-padding relative z-10">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mylli-dark leading-tight animate-fade-in">
                  Des <span className="text-mylli-primary">services d'aide</span> à domicile adaptés à vos besoins
                </h1>
                <p className="text-lg text-mylli-gray leading-relaxed animate-fade-in">
                  Bénéficiez d'une assistance professionnelle et humaine pour vous ou vos proches, avec des services personnalisés et adaptés à chaque situation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                  <Button asChild className="btn-accent">
                    <Link to="/services">
                      Nos services
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contact">
                      Contactez-nous
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <UltraFastImage
                  src="/lovable-uploads/595e5847-9893-4999-8b4a-94e498e34939.png"
                  alt="Aide à domicile"
                  className="w-full rounded-3xl shadow-2xl animate-fade-in"
                  width={768}
                  height={576}
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading 
            title="Nos services d'aide à domicile" 
            subtitle="Découvrez nos solutions pour vous accompagner au quotidien" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => (
              <ServiceCard 
                key={index} 
                title={service.title}
                description={service.description}
                image={service.image}
                link={service.link}
                icon={<service.icon size={24} />}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/services">
                Voir tous nos services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading 
            title="Pourquoi choisir Mylli Services ?" 
            subtitle="Les avantages de notre approche personnalisée et professionnelle" 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="border-none shadow-card hover:shadow-hover transition-all duration-300 animate-fade-in h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-5 p-3 rounded-full bg-mylli-primary/10">
                      <feature.icon className="text-mylli-primary" size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-mylli-dark">{feature.title}</h3>
                    <p className="text-mylli-gray">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading 
            title="Ce que nos clients disent de nous" 
            subtitle="Découvrez les témoignages de ceux qui nous ont fait confiance" 
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index} 
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                image={testimonial.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding bg-mylli-primary text-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">Prêt àSimplifier votre quotidien ?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto animate-fade-in">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nous pouvons vous aider.
            </p>
            <Button asChild className="btn-accent animate-fade-in">
              <Link to="/contact">
                Contactez-nous
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default HomePage;
