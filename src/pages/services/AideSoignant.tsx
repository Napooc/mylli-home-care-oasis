import { Link } from 'react-router-dom';
import { Heart, User, Clock, Shield, CheckCircle, Star, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PageBanner from '@/components/common/PageBanner';
import SectionHeading from '@/components/common/SectionHeading';
import OptimizedImage from '@/components/seo/OptimizedImage';

const AideSoignantPage = () => {
  // Roles of caregiver with specific healthcare icons
  const roles = [{
    title: "Assister à l'hygiène corporelle",
    iconImage: "/lovable-uploads/d2780d4e-04e6-4ff9-8a1f-a54048bb2eb8.png"
  }, {
    title: "Aider à la prise de médicaments",
    iconImage: "/lovable-uploads/bde9c2cf-6a1e-4994-bb87-13e3a1bc9321.png"
  }, {
    title: "Aider à l'alimentation",
    iconImage: "/lovable-uploads/0ac5ce88-2b3f-4931-9488-210bc9425794.png"
  }, {
    title: "Mesurer électroniquement les constantes",
    iconImage: "/lovable-uploads/5364c2b1-9466-4ff2-b1bf-f6288e735add.png"
  }, {
    title: "Accompagner et sécuriser le patient",
    iconImage: "/lovable-uploads/da550c48-1c62-4eb0-b6cc-df8d0db5cdd8.png"
  }];

  return (
    <div>
      <PageBanner 
        title="AIDE-SOIGNANT(E) À DOMICILE" 
        subtitle="Préservation de l'autonomie et accompagnement quotidien" 
      />
      
      {/* Modern Compact Introduction Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-white via-mylli-light/10 to-white">
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-mylli-primary/5 to-mylli-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-mylli-accent/5 to-mylli-quaternary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto">
            
            {/* Creative Header Design */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-mylli-primary to-mylli-secondary mb-8 shadow-xl">
                <User size={40} className="text-white" />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-mylli-primary via-mylli-secondary to-mylli-accent bg-clip-text text-transparent">
                  Un accompagnement
                </span>
                <br />
                <span className="text-mylli-dark">quotidien</span>
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-mylli-secondary to-mylli-accent bg-clip-text text-transparent">
                    personnalisé
                  </span>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-mylli-secondary to-mylli-accent rounded-full"></div>
                </span>
              </h2>
            </div>
            
            {/* Modern Content Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Card 1 */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-mylli-primary/20 to-mylli-secondary/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-mylli-primary/10 transform group-hover:-translate-y-2 transition-all duration-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-mylli-primary rounded-full mt-2 animate-pulse"></div>
                    <p className="text-lg text-mylli-gray leading-relaxed">
                      Tout en stimulant et préservant l'autonomie du malade, l'aide-soignant accomplit différents actes de la vie quotidienne : aide au lever et au coucher, aide au transfert du malade, aide à la toilette et à l'habillage, administration des repas, changement de la literie…
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-mylli-accent/20 to-mylli-quaternary/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-mylli-accent/10 transform group-hover:-translate-y-2 transition-all duration-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-mylli-accent rounded-full mt-2 animate-pulse delay-200"></div>
                    <p className="text-lg text-mylli-gray leading-relaxed">
                      Il accompagne cette personne dans les activités de sa vie quotidienne, il contribue à son bien-être et à lui faire recouvrer, dans la mesure du possible, son autonomie.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-mylli-secondary/20 to-mylli-primary/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-mylli-secondary/10 transform group-hover:-translate-y-2 transition-all duration-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-mylli-secondary rounded-full mt-2 animate-pulse delay-400"></div>
                    <p className="text-lg text-mylli-gray leading-relaxed">
                      L'aide-soignant réalise des soins liés aux fonctions d'entretien et de continuité de la vie visant à compenser partiellement ou totalement un manque ou une diminution de l'autonomie de la personne.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Card 4 - Highlighted Service Info */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-mylli-quaternary/20 to-mylli-accent/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-mylli-quaternary/10 transform group-hover:-translate-y-2 transition-all duration-500">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-mylli-quaternary rounded-full mt-2 animate-pulse delay-600"></div>
                      <p className="text-lg text-mylli-gray leading-relaxed">
                        Son rôle s'inscrit dans une approche globale de la personne soignée et prend en compte la dimension relationnelle des soins.
                      </p>
                    </div>
                    
                    {/* Service schedule highlight */}
                    <div className="relative bg-gradient-to-r from-mylli-primary/10 to-mylli-secondary/10 rounded-xl p-6 border border-mylli-primary/20">
                      <p className="text-xl text-mylli-dark font-bold text-center leading-tight">
                        Le service d'aide-soignant assure les gardes de{' '}
                        <span className="text-mylli-primary font-black">jour</span>, de{' '}
                        <span className="text-mylli-secondary font-black">nuit</span>
                        {' '}ou de{' '}
                        <span className="text-mylli-accent font-black">24h/24h</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Roles - Enhanced larger cards with uniform sizing */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container-custom">
          <SectionHeading title="Rôles de l'aide-soignant(e)" subtitle="Un accompagnement complet pour le bien-être quotidien" variant="gradient" />
          
          <div className="max-w-7xl mx-auto mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {roles.map((role, index) => <div key={index} className="group relative">
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-700 hover:-translate-y-6 hover:shadow-2xl hover:border-mylli-primary/30 group-hover:scale-105 h-80 flex flex-col">
                    {/* Image container with enhanced styling */}
                    <div className="relative p-8 pb-6 flex-grow flex flex-col items-center justify-center">
                      <div className="relative mb-6">
                        {/* Enhanced decorative background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-mylli-primary/10 to-mylli-secondary/10 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 scale-110"></div>
                        <div className="absolute inset-0 bg-gradient-to-tl from-mylli-accent/5 to-transparent rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500 scale-105"></div>
                        
                        {/* Main image container - much larger size */}
                        <div className="relative w-40 h-40 mx-auto rounded-3xl bg-gradient-to-br from-white to-mylli-light/30 flex items-center justify-center shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl border border-mylli-primary/10">
                          <OptimizedImage src={role.iconImage} alt={role.title} width={120} height={120} className="w-32 h-32 object-contain filter group-hover:brightness-110 transition-all duration-500" />
                        </div>
                        
                        {/* Additional decorative elements */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-mylli-secondary/20 animate-pulse group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-mylli-primary/20 animate-pulse delay-500 group-hover:scale-150 transition-transform duration-500"></div>
                      </div>
                    </div>
                    
                    {/* Title section with fixed height */}
                    <div className="px-6 pb-8 flex items-center justify-center min-h-[80px]">
                      <h3 className="text-center text-mylli-dark font-bold text-base leading-tight group-hover:text-mylli-primary transition-colors duration-300">
                        {role.title}
                      </h3>
                    </div>
                    
                    {/* Enhanced bottom accent */}
                    <div className="h-2 bg-gradient-to-r from-mylli-primary via-mylli-secondary to-mylli-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    
                    {/* Floating elements for enhanced uniqueness */}
                    <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-mylli-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-bounce"></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-mylli-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                  </div>
                  
                  {/* External glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-mylli-primary/5 to-mylli-secondary/5 transform scale-0 group-hover:scale-110 transition-transform duration-700 -z-10 blur-xl"></div>
                </div>)}
            </div>
          </div>
        </div>
      </section>
      
      {/* Types of Interventions - Modern cards with animation */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <SectionHeading title="Types d'interventions" subtitle="Des formules adaptées à tous les besoins" variant="gradient" />
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-mylli-primary to-mylli-dark text-white rounded-3xl p-8 shadow-xl transform transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <Clock size={24} className="text-white" />
                  </div>
                  Garde de jour
                </h3>
                <p className="text-white/90 mb-6 text-lg">
                  Présence attentive pendant la journée pour les soins quotidiens, l'accompagnement aux activités et la surveillance continue.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-mylli-secondary to-mylli-primary/90 text-white rounded-3xl p-8 shadow-xl transform transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <Clock size={24} className="text-white" />
                  </div>
                  Garde de nuit
                </h3>
                <p className="text-white/90 mb-6 text-lg">
                  Surveillance nocturne, aide au coucher et au lever, gestion des réveils nocturnes et des situations d'urgence.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-mylli-accent to-mylli-primary text-white rounded-3xl p-8 shadow-xl transform transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <Clock size={24} className="text-white" />
                  </div>
                  Garde 24h/24h
                </h3>
                <p className="text-white/90 mb-6 text-lg">
                  Accompagnement permanent avec relève d'équipes pour une présence continue et des soins ininterrompus.
                </p>
              </div>
            </div>
            
            
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-mylli-primary to-mylli-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">Besoin de nos services ?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto animate-fade-in">
            Contactez-nous dès aujourd'hui pour une consultation gratuite et découvrez comment nous pouvons vous aider.
          </p>
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
        </div>
      </section>
    </div>
  );
};

export default AideSoignantPage;
