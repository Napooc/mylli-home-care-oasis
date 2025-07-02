import { Home as HomeIcon, User, Heart, CheckCircle } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';

const HowItWorksSection = () => {
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

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-mylli-light via-white to-mylli-light/30 relative overflow-hidden" aria-labelledby="how-it-works-heading">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-12 right-16 w-40 h-40 border border-mylli-primary/10 rounded-full"></div>
        <div className="absolute bottom-16 left-12 w-48 h-48 border-2 border-mylli-secondary/8 rounded-lg rotate-12"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-mylli-quaternary/12 rounded-xl -rotate-45"></div>
        <div className="absolute top-1/4 left-1/4 w-24 h-24 border-2 border-mylli-accent/10 rounded-full"></div>
        
        <div className="absolute top-28 left-1/3 w-6 h-6 bg-mylli-primary/15 rounded-full animate-pulse-soft"></div>
        <div className="absolute bottom-36 right-1/4 w-4 h-4 bg-mylli-secondary/20 animate-pulse-soft" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 left-16 w-5 h-5 bg-mylli-quaternary/15 rounded-full animate-pulse-soft" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <header className="text-center mb-12 md:mb-16">
          <SectionHeading 
            title="Comment ça marche ?"
            variant="animated"
            highlightText="marche"
            className="mb-4"
            id="how-it-works-heading"
          />
          <p className="text-lg md:text-xl text-mylli-gray max-w-3xl mx-auto leading-relaxed">
            Un processus simple et transparent pour vous garantir les meilleurs soins
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {howItWorks.map((step, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-50 p-6 md:p-8 h-full flex flex-col transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden min-h-[280px]">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${
                  step.color === 'primary' ? 'bg-gradient-to-br from-mylli-primary to-mylli-quaternary' :
                  step.color === 'secondary' ? 'bg-gradient-to-br from-mylli-secondary to-mylli-tertiary' :
                  step.color === 'quaternary' ? 'bg-gradient-to-br from-mylli-quaternary to-mylli-accent' :
                  'bg-gradient-to-br from-mylli-accent to-mylli-primary'
                } rounded-2xl md:rounded-3xl`}></div>
                
                <div className="flex items-center justify-center mb-6 relative z-10">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    step.color === 'primary' ? 'bg-mylli-primary/10' :
                    step.color === 'secondary' ? 'bg-mylli-secondary/10' :
                    step.color === 'quaternary' ? 'bg-mylli-quaternary/10' :
                    'bg-mylli-accent/10'
                  } group-hover:scale-110 transition-transform duration-500`}>
                    {step.icon}
                  </div>
                </div>
                
                <div className="text-center mb-4 relative z-10">
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full mb-4 ${
                    step.color === 'primary' ? 'bg-mylli-primary text-white' :
                    step.color === 'secondary' ? 'bg-mylli-secondary text-white' :
                    step.color === 'quaternary' ? 'bg-mylli-quaternary text-white' :
                    'bg-mylli-accent text-white'
                  } font-bold text-sm`}>
                    {step.step}
                  </div>
                  
                  <h3 className={`text-lg md:text-xl font-bold mb-3 ${
                    step.color === 'primary' ? 'text-mylli-primary' :
                    step.color === 'secondary' ? 'text-mylli-secondary' :
                    step.color === 'quaternary' ? 'text-mylli-quaternary' :
                    'text-mylli-accent'
                  } group-hover:text-mylli-dark transition-colors duration-300`}>
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-mylli-gray text-center leading-relaxed flex-grow group-hover:text-mylli-dark transition-colors duration-300 text-sm md:text-base relative z-10">
                  {step.description}
                </p>
                
                <div className={`absolute bottom-0 left-0 w-full h-1 ${
                  step.color === 'primary' ? 'bg-gradient-to-r from-mylli-primary to-mylli-quaternary' :
                  step.color === 'secondary' ? 'bg-gradient-to-r from-mylli-secondary to-mylli-tertiary' :
                  step.color === 'quaternary' ? 'bg-gradient-to-r from-mylli-quaternary to-mylli-accent' :
                  'bg-gradient-to-r from-mylli-accent to-mylli-primary'
                } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl md:rounded-b-3xl`}></div>
              </div>
              
              {index < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <div className={`w-8 h-0.5 ${
                    step.color === 'primary' ? 'bg-mylli-primary/30' :
                    step.color === 'secondary' ? 'bg-mylli-secondary/30' :
                    step.color === 'quaternary' ? 'bg-mylli-quaternary/30' :
                    'bg-mylli-accent/30'
                  }`}></div>
                  <div className={`w-2 h-2 rounded-full ${
                    step.color === 'primary' ? 'bg-mylli-primary' :
                    step.color === 'secondary' ? 'bg-mylli-secondary' :
                    step.color === 'quaternary' ? 'bg-mylli-quaternary' :
                    'bg-mylli-accent'
                  } absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;