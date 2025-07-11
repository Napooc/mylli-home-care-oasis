
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import OptimizedImage from '@/components/seo/OptimizedImage';

const DeferredServices: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) return null;

  const services = [
    {
      title: "Aide-soignant(e) à domicile",
      description: "Préservation de l'autonomie tout en accomplissant des actes de la vie quotidienne.",
      image: "/lovable-uploads/a19bc553-aa29-42f9-b4dc-c1b200faa0f8.png",
      features: [
        "Assiste à l'hygiène corporelle",
        "Aide à la mobilité", 
        "Aide à l'alimentation",
        "Aide à la prise de médicaments"
      ],
      link: "/services/aide-soignant",
      buttonGradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Infirmier(ère) à domicile", 
      description: "Soins médicaux à domicile comme alternative à l'hospitalisation.",
      image: "/lovable-uploads/50a817cb-5544-420a-88d1-793d11dc6290.png",
      features: [
        "Pose et surveillance de perfusions",
        "Pansements et injections",
        "Pose et surveillance de sondes nasogastrique et urinaire", 
        "Traitement Des escarres"
      ],
      link: "/services/infirmier",
      buttonGradient: "from-red-500 to-blue-600"
    }
  ];

  return (
    <div className="absolute inset-0 max-w-7xl mx-auto mt-16 fade-in-fast">
      <div className="grid lg:grid-cols-2 gap-8 h-full">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-between h-[600px] max-w-[500px] mx-auto w-full"
          >
            {/* Header Section - Fixed Height */}
            <div className="text-center mb-6 h-[120px] flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-mylli-primary mb-4 leading-tight">
                {service.title}
              </h3>
              <p className="text-mylli-gray text-base leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Features Section - Fixed Height */}
            <div className="mb-8 h-[300px] flex flex-col">
              <h4 className="text-lg font-semibold text-mylli-primary text-center mb-6">
                Nos prestations :
              </h4>
              <div className="space-y-4 flex-1">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start h-[50px]">
                    <div className="w-2 h-2 bg-mylli-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-mylli-gray text-sm leading-relaxed flex-1">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Button Section - Fixed Height */}
            <div className="h-[60px] flex items-center">
              <button 
                onClick={() => window.location.href = service.link}
                className={`w-full py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r ${service.buttonGradient} flex items-center justify-center gap-2`}
              >
                Découvrir le service 
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeferredServices;
