import React, { useEffect, useState } from 'react';
import FeatureCollapsible from '@/components/common/FeatureCollapsible';
import OptimizedImage from '@/components/seo/OptimizedImage';

const DeferredFeatures: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) return null;

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

  const formatDetailedDescription = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') return <br key={index} />;
      if (line.includes('•')) {
        return <li key={index} className="ml-4 text-mylli-gray leading-relaxed">
            {line.replace('•', '').trim()}
          </li>;
      }
      if (line.match(/^[A-Z\s]+$/)) {
        return <h4 key={index} className="font-bold text-mylli-dark text-lg mt-4 mb-2">
            {line}
          </h4>;
      }
      if (line.endsWith(':')) {
        return <h4 key={index} className="font-semibold text-mylli-dark text-base mt-4 mb-2">
            {line}
          </h4>;
      }
      return <p key={index} className="text-mylli-gray leading-relaxed mb-3">
          {line}
        </p>;
    });
  };

  return (
    <div className="absolute inset-0 grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16 fade-in-fast">
      {features.map((feature, index) => (
        <FeatureCollapsible 
          key={index}
          title={feature.title}
          description={feature.description}
          detailedContent={feature.detailedDescription}
          icon={feature.icon}
          color={feature.color}
        />
      ))}
    </div>
  );
};

export default DeferredFeatures;