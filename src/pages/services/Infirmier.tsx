import React from 'react';
import { Clock, Heart, Shield, Users, Stethoscope, FileText, AlertCircle, CheckCircle, Phone, Calendar } from 'lucide-react';

const InfirmierPage = () => {
  const patientProfiles = [
    {
      icon: <Heart size={32} className="text-mylli-primary" />,
      title: "Patients en post-opératoire",
      description: "Surveillance et soins après intervention chirurgicale pour une récupération optimale."
    },
    {
      icon: <Users size={32} className="text-mylli-secondary" />,
      title: "Personnes âgées",
      description: "Accompagnement médical adapté aux besoins spécifiques des seniors."
    },
    {
      icon: <AlertCircle size={32} className="text-mylli-accent" />,
      title: "Maladies chroniques",
      description: "Suivi régulier pour diabète, hypertension et autres pathologies chroniques."
    }
  ];

  const nurseRoles = [
    {
      title: "Administration de médicaments",
      iconImage: "/lovable-uploads/medication-icon.png"
    },
    {
      title: "Soins de plaies",
      iconImage: "/lovable-uploads/wound-care-icon.png"
    },
    {
      title: "Surveillance médicale",
      iconImage: "/lovable-uploads/monitoring-icon.png"
    },
    {
      title: "Éducation thérapeutique",
      iconImage: "/lovable-uploads/education-icon.png"
    },
    {
      title: "Coordination des soins",
      iconImage: "/lovable-uploads/coordination-icon.png"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Services d'<span className="text-blue-600">Infirmier</span> à Domicile
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des soins infirmiers professionnels dans le confort de votre domicile, 
              avec une équipe qualifiée disponible 24h/24.
            </p>
          </div>

          {/* Main Service Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Service Cards */}
            <div className="space-y-6">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Soins médicaux spécialisés
                    </h3>
                    <p className="text-gray-600">
                      Administration de traitements, surveillance post-opératoire, 
                      gestion des dispositifs médicaux et suivi des pathologies chroniques.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Suivi personnalisé
                    </h3>
                    <p className="text-gray-600">
                      Évaluation régulière de l'état de santé, coordination avec les médecins 
                      et tenue d'un dossier médical complet pour chaque patient.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Service continu 24h/24
                    </h3>
                    <p className="text-white/90">
                      Notre équipe d'infirmiers qualifiés assure une présence adaptée à vos besoins, 
                      avec des gardes de jour, de nuit ou continues selon vos besoins médicaux.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Main Image */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <img 
                  src="/lovable-uploads/9570e5be-c600-4267-a8d7-4ef12d722304.png" 
                  alt="Infirmière prodiguant des soins à domicile" 
                  className="w-full h-auto rounded-2xl"
                />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600">Disponible</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+15</div>
                  <div className="text-sm text-gray-600">Ans d'expérience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Profiles Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Profils des patients concernés
            </h2>
            <p className="text-xl text-gray-600">
              Nos services s'adaptent à différents besoins médicaux
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {patientProfiles.map((profile, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center transform hover:scale-105 transition-all duration-300">
                <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  {profile.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {profile.title}
                </h3>
                <p className="text-gray-600">
                  {profile.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nurse Roles Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Rôles de l'infirmier(ère)
            </h2>
            <p className="text-xl text-gray-600">
              Une prise en charge médicale complète à domicile
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {nurseRoles.map((role, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center transform hover:scale-105 transition-all duration-300 h-64 flex flex-col">
                  <div className="flex-grow flex flex-col items-center justify-center">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl w-24 h-24 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                      {role.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Besoin de soins infirmiers à domicile ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contactez-nous pour une évaluation gratuite de vos besoins
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
              <Phone className="w-5 h-5" />
              <span>Appeler maintenant</span>
            </button>
            <button className="bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-blue-800 transition-colors">
              <Calendar className="w-5 h-5" />
              <span>Prendre rendez-vous</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfirmierPage;