
import React, { Suspense, lazy } from 'react';
import ProgressiveHeroCarousel from './ProgressiveHeroCarousel';
import OptimizedServiceCards from './OptimizedServiceCards';
import LazySection from '@/components/common/LazySection';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load non-critical components
const TestimonialsSection = lazy(() => import('@/components/common/TestimonialCard'));
const ContactSection = lazy(() => import('@/components/common/ContactForm'));

// Hero slides data
const heroSlides = [
  {
    id: '1',
    title: 'Soins à Domicile Professionnels',
    description: 'Services médicaux de qualité dans le confort de votre foyer',
    image: '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png'
  },
  {
    id: '2',
    title: 'Équipe Médicale Certifiée',
    description: 'Infirmiers et aides-soignants diplômés disponibles 24h/24',
    image: '/lovable-uploads/00945798-dc13-478e-94d1-d1aaa70af5a6.png'
  }
];

// Services data
const services = [
  {
    id: '1',
    title: 'Soins Infirmiers',
    description: 'Injections, pansements, perfusions par des infirmiers diplômés',
    image: '/lovable-uploads/1154475c-65aa-44df-bcaf-ab3092ac9960.png',
    icon: '💉'
  },
  {
    id: '2',
    title: 'Aide à Domicile',
    description: 'Assistance quotidienne pour personnes âgées et dépendantes',
    image: '/lovable-uploads/12ada3b4-5734-4170-b5a3-090ee9c4f507.png',
    icon: '🏠'
  },
  {
    id: '3',
    title: 'Garde Malade',
    description: 'Surveillance médicale 24h/24 pour patients en convalescence',
    image: '/lovable-uploads/1a734acd-93c2-4f7b-88a3-fa8c91f19cc0.png',
    icon: '👨‍⚕️'
  }
];

const OptimizedHomepage: React.FC = () => {
  const handleServiceClick = (service: any) => {
    console.log('Service clicked:', service.title);
    // Handle service navigation
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Loads immediately */}
      <section className="relative">
        <ProgressiveHeroCarousel slides={heroSlides} />
      </section>

      {/* Services Section - Viewport aware loading */}
      <LazySection className="py-16 bg-gray-50" animationDelay={200}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des soins professionnels adaptés à vos besoins
            </p>
          </div>
          <OptimizedServiceCards 
            services={services} 
            onServiceClick={handleServiceClick}
          />
        </div>
      </LazySection>

      {/* About Section - Deferred loading */}
      <LazySection className="py-16" animationDelay={400}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Mylli Services
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Leader des soins à domicile à Casablanca depuis 2014. 
                Notre équipe de professionnels certifiés vous accompagne 
                avec expertise et bienveillance.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">10+</div>
                  <div className="text-gray-600">Années d'expérience</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">24/7</div>
                  <div className="text-gray-600">Disponibilité</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/lovable-uploads/2c927cda-f5b2-45ec-8f1a-1603c53b8d5d.png"
                alt="Équipe Mylli Services"
                className="rounded-lg shadow-xl w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </LazySection>

      {/* Testimonials Section - Lazy loaded */}
      <LazySection className="py-16 bg-gray-50" animationDelay={600}>
        <Suspense fallback={
          <div className="container mx-auto px-6">
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        }>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Témoignages
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
                  <p className="text-gray-600 mb-4">
                    "Service exceptionnel, équipe très professionnelle et attentionnée."
                  </p>
                  <div className="font-semibold text-gray-800">Client satisfait</div>
                </div>
              ))}
            </div>
          </div>
        </Suspense>
      </LazySection>

      {/* Contact Section - Lazy loaded */}
      <LazySection className="py-16" animationDelay={800}>
        <Suspense fallback={
          <div className="container mx-auto px-6">
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
        }>
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Contactez-nous
              </h2>
              <p className="text-xl text-gray-600">
                Disponibles 24h/24 pour vos urgences
              </p>
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    📞
                  </div>
                  <div>
                    <div className="font-semibold">Urgences 24h/24</div>
                    <div className="text-blue-600 text-lg">+212 661 37 74 38</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    📍
                  </div>
                  <div>
                    <div className="font-semibold">Adresse</div>
                    <div className="text-gray-600">19, rue Masmouda hay Al Hana, Casablanca</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Demande de rappel</h3>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Votre nom"
                    className="w-full p-3 border rounded-lg"
                  />
                  <input 
                    type="tel" 
                    placeholder="Votre téléphone"
                    className="w-full p-3 border rounded-lg"
                  />
                  <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Demander un rappel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </LazySection>
    </div>
  );
};

export default OptimizedHomepage;
