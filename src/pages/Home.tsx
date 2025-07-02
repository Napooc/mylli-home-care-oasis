import ContactForm from '@/components/common/ContactForm';
import ServiceLocations from '@/components/common/ServiceLocations';
import SEOHead from '@/components/seo/SEOHead';
import { generateHomepageStructuredData } from '@/utils/structuredData';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';

const HomePage = () => {
  const structuredData = generateHomepageStructuredData();
  
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
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        
        <ServiceLocations 
          locations={serviceLocations} 
          title="Zones d'intervention" 
          description="Nous intervenons dans tout le Grand Casablanca et ses environs"
        />
        
        <ContactForm />
      </div>
    </>
  );
};

export default HomePage;