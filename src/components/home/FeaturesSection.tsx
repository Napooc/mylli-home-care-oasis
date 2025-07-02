import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import OptimizedImage from '@/components/seo/OptimizedImage';

const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const features = [{
    icon: <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl">
      <OptimizedImage src="/lovable-uploads/fcb791a8-469a-4d8f-a3a4-a0298acb30a8.png" alt="Expérience professionnelle" width={80} height={80} className="w-full h-full object-cover" />
    </div>,
    title: "Une expérience de plus de 10 ans",
    description: "Personnel qualifié et vérifié pour une prise en charge en toute sécurité et sérénité.",
    color: "primary" as const,
    detailedDescription: "Plus de 10 ans d'expérience au service de la dignité humaine\n\nDepuis 2014, Mylli Services est le pionnier de l'accompagnement à domicile au Maroc. Forts de plus de dix années d'engagement auprès des personnes en perte d'autonomie, nous avons développé un savoir-faire solide, basé sur l'écoute, la rigueur, et une parfaite connaissance des besoins du terrain.\n\nCette expérience nous permet aujourd'hui d'offrir un accompagnement personnalisé, réactif et humain, en toutes circonstances. Nos compétences couvrent l'ensemble des soins à domicile : assistance quotidienne, surveillance médicale, soins infirmiers, soutien moral et relationnel. Nous formons et sélectionnons avec exigence nos intervenants pour garantir un service de haute qualité, toujours empreint de respect et de bienveillance."
  }, {
    icon: <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl">
      <OptimizedImage src="/lovable-uploads/f44d65a2-d31c-4815-a088-b4b4465908e2.png" alt="Équipe compétente" width={80} height={80} className="w-full h-full object-cover" />
    </div>,
    title: "Une équipe compétente pour un service de qualité",
    description: "Accompagnement personnalisé et suivi régulier pour garantir votre entière satisfaction.",
    color: "secondary" as const,
    detailedDescription: "Des équipes engagées, compétentes et à l'écoute\n\nChez Mylli Services, la qualité de nos prestations repose avant tout sur la valeur humaine et professionnelle de nos équipes. Chaque intervenant — aide-soignant, infirmier ou coordinateur — est sélectionné avec soin pour ses compétences, mais aussi pour son sens de l'écoute, de l'empathie et de la responsabilité.\n\nFormés aux spécificités de l'accompagnement à domicile, nos professionnels savent s'adapter aux situations les plus délicates, tout en maintenant un climat de confiance avec les patients et leurs familles. Présents, attentifs et bienveillants, ils ne se contentent pas d'exécuter une mission : ils créent un lien humain, essentiel pour surmonter les épreuves de la maladie.\n\nCette approche humaine et professionnelle est au cœur de notre réussite et fait de chaque intervention une expérience respectueuse, sécurisante et profondément humaine."
  }, {
    icon: <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl">
      <OptimizedImage src="/lovable-uploads/b9ac4790-4e3c-4f05-aaa8-cffc22c2b8d9.png" alt="Disponibilité 24/7" width={80} height={80} className="w-full h-full object-cover" />
    </div>,
    title: "Disponibilité 24/7 avec un service personnalisé",
    description: "Notre équipe est disponible jour et nuit pour répondre à tous vos besoins d'urgence.",
    color: "accent" as const,
    detailedDescription: "Un accompagnement disponible 24h/24 et 7j/7\n\nParce que les besoins en soins et en assistance ne connaissent ni pause ni horaires, Mylli Services assure une présence continue, jour et nuit, toute l'année.\n\nNos équipes sont organisées pour intervenir à tout moment, 24h/24 et 7j/7, afin d'apporter un soutien immédiat, que ce soit pour une urgence, un besoin ponctuel ou un accompagnement de longue durée. Cette disponibilité permanente garantit une tranquillité d'esprit totale aux familles, qui savent qu'elles peuvent compter sur nous à chaque instant.\n\nCette réactivité est l'une des clés de notre efficacité et un pilier fondamental de notre engagement envers les patients et leurs proches."
  }];

  return (
    <section className="py-12 md:py-20 relative overflow-hidden bg-gradient-to-b from-white to-mylli-light/30" aria-labelledby="features-heading">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-mylli-primary/5 to-transparent rounded-full transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-mylli-secondary/5 to-transparent rounded-full transform -translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        
        <div className="absolute left-10 top-1/4 w-16 h-16 border border-mylli-primary/20 rounded-full"></div>
        <div className="absolute right-20 bottom-1/4 w-24 h-24 border-2 border-mylli-secondary/10 rounded-lg rotate-12"></div>
        <div className="absolute left-1/2 top-1/2 w-32 h-32 border border-mylli-quaternary/10 rounded-xl -rotate-12 transform -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="absolute top-20 left-1/3 w-4 h-4 bg-mylli-primary/20 animate-pulse-soft"></div>
        <div className="absolute bottom-32 right-1/4 w-6 h-6 bg-mylli-secondary/20 rounded-full animate-pulse-soft" style={{
          animationDelay: '1s'
        }}></div>
        <div className="absolute top-1/2 left-20 w-3 h-3 bg-mylli-quaternary/30 rounded-full animate-pulse-soft" style={{
          animationDelay: '2s'
        }}></div>
      </div>
    
      <div className="container-custom relative z-10 px-4 md:px-6">
        <header className="max-w-2xl mx-auto mb-12 md:mb-16">
          <SectionHeading title="Des services sur mesure pour vous accompagner à domicile" variant="animated" highlightText="sur mesure" className="text-center" id="features-heading" />
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => 
            <div key={index} className="h-full" data-feature={index === 2 ? 'availability' : undefined}>
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-gray-50 p-6 md:p-8 h-full flex flex-col transform transition-all duration-500 hover:-translate-y-3 hover:shadow-3xl hover:border-mylli-primary/20 group relative overflow-hidden min-h-[400px] md:min-h-[450px]">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${feature.color === 'primary' ? 'bg-gradient-to-br from-mylli-primary to-mylli-quaternary' : feature.color === 'secondary' ? 'bg-gradient-to-br from-mylli-secondary to-mylli-tertiary' : 'bg-gradient-to-br from-mylli-quaternary to-mylli-accent'} rounded-2xl md:rounded-3xl`}></div>
                
                <div className="flex justify-center mb-6 md:mb-8 relative z-10">
                  <div className={`relative group-hover:scale-110 transition-transform duration-500 ${feature.color === 'primary' ? 'drop-shadow-lg' : feature.color === 'secondary' ? 'drop-shadow-lg' : 'drop-shadow-lg'}`}>
                    {feature.icon}
                    <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${feature.color === 'primary' ? 'bg-mylli-primary' : feature.color === 'secondary' ? 'bg-mylli-secondary' : 'bg-mylli-quaternary'}`}></div>
                  </div>
                </div>
                
                <div className="flex-grow flex flex-col relative z-10">
                  <h3 className={`text-lg md:text-xl font-bold mb-3 md:mb-4 text-center ${feature.color === 'primary' ? 'text-mylli-primary' : feature.color === 'secondary' ? 'text-mylli-secondary' : 'text-mylli-quaternary'} group-hover:text-mylli-dark transition-colors duration-300`}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-mylli-gray text-center mb-6 flex-grow leading-relaxed group-hover:text-mylli-dark transition-colors duration-300 text-sm md:text-base">
                    {feature.description}
                  </p>
                  
                  <div className="mt-auto pb-2">
                    <button onClick={() => setSelectedFeature(index)} className={`w-full text-center font-semibold flex items-center justify-center py-3 px-4 md:px-6 rounded-xl border transition-all duration-300 text-sm md:text-base ${feature.color === 'primary' ? 'text-mylli-primary border-mylli-primary/20 hover:bg-mylli-primary hover:text-white hover:border-mylli-primary' : feature.color === 'secondary' ? 'text-mylli-secondary border-mylli-secondary/20 hover:bg-mylli-secondary hover:text-white hover:border-mylli-secondary' : 'text-mylli-quaternary border-mylli-quaternary/20 hover:bg-mylli-quaternary hover:text-white hover:border-mylli-quaternary'} hover:shadow-lg hover:scale-105`}>
                      En savoir plus
                      <ArrowRight size={14} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
                
                <div className={`absolute bottom-0 left-0 w-full h-2 ${feature.color === 'primary' ? 'bg-gradient-to-r from-mylli-primary to-mylli-quaternary' : feature.color === 'secondary' ? 'bg-gradient-to-r from-mylli-secondary to-mylli-tertiary' : 'bg-gradient-to-r from-mylli-quaternary to-mylli-accent'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl md:rounded-b-3xl`}></div>
                
                <div className={`absolute top-0 right-0 w-16 md:w-20 h-16 md:h-20 ${feature.color === 'primary' ? 'bg-mylli-primary/10' : feature.color === 'secondary' ? 'bg-mylli-secondary/10' : 'bg-mylli-quaternary/10'} rounded-bl-2xl md:rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-12 md:mt-16 text-center px-4">
          <a href="/services" className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-mylli-primary to-mylli-quaternary text-white font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-neon group mx-0 text-sm md:text-base">
            <span className="mr-2">Découvrir nos services</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-16 text-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V100C69,91.27,141.43,76.12,213.33,66.11Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default FeaturesSection;