
import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../common/ServiceCard';

const ServicesSection: React.FC = () => {
  const services = [
    {
      id: 'infirmier',
      title: 'Infirmier à Domicile',
      description: 'Soins infirmiers professionnels dispensés par des infirmiers diplômés d\'État',
      icon: 'Heart',
      image: '/lovable-uploads/bc659d89-2f47-4184-b283-c7f41ba9193c.png',
      features: ['Injections et perfusions', 'Pansements complexes', 'Surveillance médicale']
    },
    {
      id: 'aide-soignant',
      title: 'Aide-Soignant',
      description: 'Assistance quotidienne pour les actes essentiels de la vie',
      icon: 'Users',
      image: '/lovable-uploads/f44d65a2-d31c-4815-a088-b4b4465908e2.png',
      features: ['Toilette et hygiène', 'Aide à la mobilité', 'Accompagnement social']
    },
    {
      id: 'garde-malade',
      title: 'Garde Malade 24h/24',
      description: 'Surveillance et accompagnement continu jour et nuit',
      icon: 'Clock',
      image: '/lovable-uploads/12ada3b4-5734-4170-b5a3-090ee9c4f507.png',
      features: ['Présence continue', 'Surveillance médicale', 'Assistance d\'urgence']
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-mylli-light/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-mylli-dark mb-6">
            Nos Services de Soins
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Une équipe de professionnels qualifiés pour tous vos besoins de soins à domicile
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            to="/services" 
            className="btn-primary inline-flex items-center gap-2"
          >
            Découvrir tous nos services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
