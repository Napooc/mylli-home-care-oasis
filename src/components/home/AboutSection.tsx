
import React from 'react';
import { Link } from 'react-router-dom';

const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-mylli-dark mb-6">
              Pourquoi choisir Mylli Services ?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-mylli-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-mylli-dark mb-2">N°1 à Casablanca depuis 2014</h3>
                  <p className="text-gray-600">Plus de 10 ans d'expérience dans les soins à domicile</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-mylli-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-mylli-dark mb-2">Équipe certifiée</h3>
                  <p className="text-gray-600">Infirmiers diplômés d'État et aides-soignants certifiés</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-mylli-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-mylli-dark mb-2">Disponibilité 24h/24</h3>
                  <p className="text-gray-600">Service d'urgence et garde malade en continu</p>
                </div>
              </div>
            </div>
            
            <Link 
              to="/a-propos" 
              className="btn-secondary mt-8 inline-block"
            >
              En savoir plus sur nous
            </Link>
          </div>
          
          <div className="relative">
            <img 
              src="/lovable-uploads/f0c529ef-4f6d-4841-b538-cf39800c85e2.png"
              alt="Équipe Mylli Services"
              className="rounded-2xl shadow-xl w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
