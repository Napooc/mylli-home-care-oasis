
import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-mylli-primary to-mylli-dark text-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Contactez-nous maintenant
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Notre équipe est disponible 24h/24 pour répondre à vos besoins de soins à domicile
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <Phone className="w-12 h-12 mx-auto mb-4 text-white" />
            <h3 className="font-semibold text-xl mb-2">Urgence 24h/24</h3>
            <a 
              href="tel:+212661377438" 
              className="text-lg font-medium hover:text-mylli-light transition-colors"
            >
              +212 661 37 74 38
            </a>
          </div>
          
          <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-white" />
            <h3 className="font-semibold text-xl mb-2">Zone d'intervention</h3>
            <p className="text-white/90">
              Casablanca et environs
            </p>
          </div>
          
          <div className="text-center">
            <Clock className="w-12 h-12 mx-auto mb-4 text-white" />
            <h3 className="font-semibold text-xl mb-2">Disponibilité</h3>
            <p className="text-white/90">
              7j/7 - 24h/24
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <a 
            href="tel:+212661377438" 
            className="bg-white text-mylli-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-mylli-light hover:text-white transition-all duration-300 inline-flex items-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Appeler maintenant
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
