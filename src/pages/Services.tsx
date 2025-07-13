
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PageBanner from '@/components/common/PageBanner';
import UltraFastImage from '@/components/images/UltraFastImage';
import SEOHead from '@/components/seo/SEOHead';
import ModernScrollReveal from '@/components/animations/ModernScrollReveal';
import StaggeredReveal from '@/components/animations/StaggeredReveal';
import { generateServicePageStructuredData } from '@/utils/structuredData';

const ServicesPage = () => {
  // Generate structured data for services
  const structuredData = generateServicePageStructuredData();

  // Main services with optimized image loading
  const mainServices = [{
    title: 'AIDE-SOIGNANT(E) À DOMICILE',
    description: 'Assistance personnalisée pour les activités de la vie quotidienne, avec un accompagnement bienveillant et professionnel.',
    image: "/lovable-uploads/93fb824b-3948-43af-a313-a54ebaf3ded0.png",
    link: "/services/aide-soignant",
    gradient: "from-mylli-primary via-mylli-quaternary to-mylli-accent",
    features: ["Aide personnalisés", "Accompagnement 24h/24", "Sécurisation du malade"]
  }, {
    title: 'INFIRMIER(ÈRE) À DOMICILE',
    description: 'Soins médicaux professionnels à domicile, incluant les injections, pansements et suivi médical.',
    image: "/lovable-uploads/0e49a73b-0499-4adb-84fc-7707c6381ef7.png",
    link: "/services/infirmier",
    gradient: "from-mylli-secondary via-mylli-tertiary to-mylli-quaternary",
    features: ["Soins personnalisés", "Exécution d'une ordonnance médicale", "Suivi médical"]
  }];

  return (
    <div>
      <SEOHead 
        title="Nos Services - Aide à domicile professionnelle | Mylli Services"
        description="Découvrez nos services d'aide à domicile : aide-soignant, infirmier, garde-malade jour/nuit. Soins professionnels à Casablanca et environs."
        keywords="services aide domicile, aide-soignant, infirmier, garde-malade, soins à domicile, Casablanca"
        canonicalUrl="/services"
        structuredData={structuredData}
      />
      
      <ModernScrollReveal direction="fade" duration={0.8}>
        <PageBanner 
          title="Nos Services" 
          subtitle="Des gardes-malades professionnels et attentifs pour répondre à tous vos besoins d'accompagnement à domicile." 
          variant="fast" 
        />
      </ModernScrollReveal>
      
      {/* Main Services with optimized images */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Simplified background elements for better performance */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-br from-mylli-primary/10 to-mylli-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-br from-mylli-accent/10 to-mylli-quaternary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <StaggeredReveal 
            staggerDelay={0.3}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-7xl mx-auto"
          >
            {mainServices.map((service, index) => (
              <div key={index} className="group relative h-full">
                {/* Simplified background glow */}
                <div className={`absolute -inset-8 bg-gradient-to-br ${service.gradient} rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-700`}></div>
                
                <div className="relative h-full flex flex-col">
                  <div className={`absolute -inset-1 bg-gradient-to-br ${service.gradient} rounded-[2.5rem] opacity-60 blur-sm transition-all duration-500 group-hover:opacity-100`}></div>
                  
                  <div className="relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden transform group-hover:-translate-y-4 group-hover:rotate-1 transition-all duration-700 h-full flex flex-col">
                    
                    {/* Optimized image section with UltraFastImage */}
                    <div className="relative h-96 overflow-hidden flex-shrink-0">
                      <UltraFastImage
                        src={service.image}
                        alt={service.title}
                        width={800}
                        height={400}
                        priority={index === 0}
                        quality={index === 0 ? 70 : 60}
                        className="w-full h-full object-cover object-center transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      
                      <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-60 group-hover:opacity-40 transition-all duration-500`}></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="relative">
                          <div className="absolute -inset-4 bg-black/20 backdrop-blur-sm rounded-2xl"></div>
                          <h3 className="relative text-2xl md:text-3xl font-bold text-white leading-tight transform group-hover:translate-x-2 transition-all duration-500">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content section */}
                    <div className="p-8 relative flex-grow flex flex-col">
                      <div className="relative flex-grow flex flex-col">
                        <p className="text-mylli-gray text-lg md:text-xl mb-8 leading-relaxed flex-grow">
                          {service.description}
                        </p>
                        
                        <div className="space-y-4 mb-10 min-h-[120px]">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-4 group/feature">
                              <div className="relative">
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${service.gradient} group-hover/feature:scale-150 transition-all duration-300`}></div>
                              </div>
                              <span className="text-mylli-dark font-medium text-lg group-hover/feature:translate-x-2 transition-all duration-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-auto">
                          <Link to={service.link}>
                            <div className="relative group/button">
                              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl blur-sm opacity-70 group-hover/button:opacity-100 transition-all duration-300`}></div>
                              <button className={`relative w-full bg-gradient-to-r ${service.gradient} text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-2xl transform group-hover/button:scale-[1.02] group-hover/button:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-4 overflow-hidden`}>
                                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/button:translate-x-full transition-transform duration-700"></div>
                                
                                <span className="relative z-10">Découvrir ce service</span>
                                <ArrowRight size={24} className="relative z-10 transform group-hover/button:translate-x-2 group-hover/button:scale-110 transition-all duration-300" />
                              </button>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </StaggeredReveal>
        </div>
      </section>
      
      {/* Call to Action */}
      <ModernScrollReveal direction="up" duration={1.0}>
        <section className="section-padding bg-gradient-to-r from-mylli-primary to-mylli-dark text-white">
          <div className="container-custom text-center">
            <ModernScrollReveal direction="fade" delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">Besoin de nos services ?</h2>
            </ModernScrollReveal>
            <ModernScrollReveal direction="fade" delay={0.4}>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto animate-fade-in">
                Contactez-nous dès aujourd'hui pour une consultation gratuite et découvrez comment nous pouvons vous aider.
              </p>
            </ModernScrollReveal>
            <ModernScrollReveal direction="up" delay={0.6}>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in">
                <Button asChild className="btn-accent">
                  <Link to="/contact">
                    Contactez-nous
                  </Link>
                </Button>
                <Button variant="outline" asChild className="bg-transparent border-white hover:bg-white/10">
                  <Link to="/fonctionnement">
                    Notre fonctionnement
                  </Link>
                </Button>
              </div>
            </ModernScrollReveal>
          </div>
        </section>
      </ModernScrollReveal>
    </div>
  );
};

export default ServicesPage;
