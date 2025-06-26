import { Link } from 'react-router-dom';
import { CheckCircle, Heart, Award, Clock, Users, Calendar, Building, Phone, Quote, Shield, Star, Zap, Target } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PageBanner from '@/components/common/PageBanner';
import SectionHeading from '@/components/common/SectionHeading';
import ParallaxSection from '@/components/common/ParallaxSection';
const AProposPage = () => {
  // Why choose us data
  const reasons = [{
    title: "Plus de 10 ans d'expérience spécifique",
    description: "Notre expertise s'est construite au fil du temps, nous permettant d'anticiper les besoins et d'offrir des solutions éprouvées.",
    icon: Award,
    color: "from-mylli-primary to-mylli-secondary"
  }, {
    title: "Une relation contractuelle claire et transparente",
    description: "Nous vous garantissons une transparence totale sur nos services, nos tarifs et nos engagements.",
    icon: Shield,
    color: "from-mylli-secondary to-mylli-accent"
  }, {
    title: "Des exigences déontologiques très élevées",
    description: "Nos intervenants respectent une charte éthique stricte garantissant le respect et la dignité de chaque patient.",
    icon: Star,
    color: "from-mylli-accent to-mylli-quaternary"
  }, {
    title: "Une personnalisation des prestations",
    description: "Nous adaptons nos services à votre situation unique, en tenant compte de vos habitudes et préférences.",
    icon: Target,
    color: "from-mylli-quaternary to-mylli-primary"
  }, {
    title: "Un suivi individualisé",
    description: "Votre conseiller personnel assure un suivi régulier pour garantir votre satisfaction et ajuster nos services si nécessaire.",
    icon: Users,
    color: "from-mylli-primary to-mylli-accent"
  }];
  return <div>
      <PageBanner title="À Propos de Mylli Services" subtitle="PLUS DE 10 ANS D'EXPÉRIENCE AU SERVICE DES PERSONNES FRAGILISÉES À LEUR DOMICILE" />
      
      {/* Enhanced Mission Section with mobile-first responsive design */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements - hidden on mobile for performance */}
        <div className="absolute inset-0 opacity-5 hidden lg:block">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border-2 border-mylli-primary animate-spin-slow" style={{
          animationDuration: '30s'
        }}></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 rounded-full border border-mylli-secondary animate-spin-slow" style={{
          animationDuration: '25s',
          animationDirection: 'reverse'
        }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading title="Notre Mission" subtitle="Permettre aux personnes en perte d'autonomie de rester chez elles dans les meilleures conditions possibles" variant="gradient" className="mb-12 lg:mb-20" />
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              
              {/* Enhanced Image Section - mobile optimized */}
              <div className="lg:col-span-6 relative order-2 lg:order-1">
                <div className="relative group perspective-1000">
                  {/* Simplified backgrounds for mobile */}
                  <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 bg-gradient-to-r from-mylli-primary/20 via-mylli-secondary/20 to-mylli-accent/20 rounded-2xl lg:rounded-3xl blur-xl lg:blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-700"></div>
                  
                  {/* Main image container */}
                  <div className="relative bg-white rounded-2xl lg:rounded-3xl p-3 lg:p-4 shadow-xl lg:shadow-2xl transform group-hover:scale-105 transition-all duration-700 border border-gray-100">
                    <div className="relative overflow-hidden rounded-xl lg:rounded-2xl">
                      <img src="/lovable-uploads/4518a561-bb46-401c-97bf-1fcc8a183433.png" alt="Équipe médicale prodiguant des soins à domicile avec compassion et professionnalisme" className="w-full h-64 sm:h-80 lg:h-96 object-cover transform group-hover:scale-110 transition-transform duration-700" />
                      
                      {/* Overlay gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-mylli-dark/20 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-mylli-primary/10"></div>
                    </div>
                    
                    {/* Mission statement overlay - responsive positioning */}
                    <div className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-xl rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 border border-white/20 w-11/12 sm:w-auto max-w-xs sm:max-w-md">
                      <div className="text-center">
                        
                        
                        
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating stats - responsive sizing and positioning */}
                  <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 bg-gradient-to-br from-mylli-primary to-mylli-secondary rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-lg lg:shadow-xl animate-float" style={{
                  animationDelay: '1s'
                }}>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">10+</div>
                      <div className="text-xs text-white/80">Années</div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-gradient-to-br from-mylli-accent to-mylli-quaternary rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-lg lg:shadow-xl animate-bounce-subtle">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">24/7</div>
                      <div className="text-xs text-white/80">Support</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Content Section - mobile optimized */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                <div className="space-y-6 lg:space-y-8">
                  
                  {/* Mission Statement Card - responsive design */}
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-mylli-primary via-mylli-secondary to-mylli-accent rounded-2xl lg:rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg lg:shadow-xl border border-white/20 hover:shadow-xl lg:hover:shadow-2xl transition-all duration-500">
                      <div className="flex flex-col sm:flex-row sm:items-start">
                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                          <div className="w-2 sm:w-3 h-16 sm:h-20 bg-gradient-to-b from-mylli-primary via-mylli-secondary to-mylli-accent rounded-full mx-auto sm:mx-0"></div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-mylli-primary to-mylli-secondary rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 shadow-lg mx-auto sm:mx-0">
                              <Target size={20} className="sm:hidden text-white" />
                              <Target size={24} className="hidden sm:block text-white" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-mylli-dark to-mylli-primary bg-clip-text text-transparent text-center sm:text-left">
                              Notre Engagement
                            </h3>
                          </div>
                          
                          <p className="text-base sm:text-lg text-mylli-gray leading-relaxed mb-4 text-center sm:text-left">
                            Chez Mylli Services, nous croyons fermement que chaque personne a droit au meilleur accompagnement possible, dans l'environnement qui lui est familier.
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <div className="bg-gradient-to-r from-mylli-primary/10 to-mylli-secondary/10 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-mylli-primary/20">
                              <div className="flex items-center mb-2 justify-center sm:justify-start">
                                <Heart size={14} className="sm:hidden text-mylli-primary mr-2" />
                                <Heart size={16} className="hidden sm:block text-mylli-primary mr-2" />
                                <span className="font-medium text-mylli-dark text-sm">Compassion</span>
                              </div>
                              <p className="text-xs text-mylli-gray text-center sm:text-left">Accompagnement humain</p>
                            </div>
                            <div className="bg-gradient-to-r from-mylli-secondary/10 to-mylli-accent/10 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-mylli-secondary/20">
                              <div className="flex items-center mb-2 justify-center sm:justify-start">
                                <Shield size={14} className="sm:hidden text-mylli-secondary mr-2" />
                                <Shield size={16} className="hidden sm:block text-mylli-secondary mr-2" />
                                <span className="font-medium text-mylli-dark text-sm">Professionnalisme</span>
                              </div>
                              <p className="text-xs text-mylli-gray text-center sm:text-left">Expertise reconnue</p>
                            </div>
                          </div>
                          
                          <p className="text-base sm:text-lg text-mylli-gray leading-relaxed text-center sm:text-left">
                            Notre mission va au-delà des soins techniques : nous créons une relation humaine basée sur la confiance, l'empathie et le respect.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ultra Modern Why Choose Us Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Simplified background for mobile */}
        <div className="absolute inset-0 opacity-5 hidden lg:block">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJtIDQwIDAgbCAwIDQwIG0gLTQwIDAgbCA0MCAwIiBzdHJva2U9IiMwMDc3QzAiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] animate-pulse-soft"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading title="Pourquoi Choisir Mylli Services" subtitle="Des raisons solides de nous confier votre bien-être ou celui de vos proches" variant="animated" highlightText="Mylli Services" />
          
          <div className="max-w-6xl mx-auto">
            {/* Mobile-first responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {reasons.map((reason, index) => {
              const IconComponent = reason.icon;
              return <div key={index} className="group relative transform transition-all duration-700 hover:translate-y-[-5px] lg:hover:translate-y-[-10px] hover:scale-105" style={{
                animationDelay: `${index * 0.1}s`
              }}>
                    {/* Simplified glow for mobile */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${reason.color} rounded-xl lg:rounded-2xl blur opacity-0 group-hover:opacity-20 lg:group-hover:opacity-30 transition-all duration-500`}></div>
                    
                    {/* Main card - mobile optimized */}
                    <div className="relative h-full bg-white rounded-xl lg:rounded-2xl shadow-md lg:shadow-lg hover:shadow-lg lg:hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:border-mylli-primary/20">
                      
                      {/* Animated top border */}
                      <div className={`h-1 bg-gradient-to-r ${reason.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                      
                      {/* Content - mobile optimized padding */}
                      <div className="p-4 sm:p-6 lg:p-8 flex flex-col h-full">
                        
                        {/* Icon section - responsive sizing */}
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                          <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${reason.color} rounded-xl lg:rounded-2xl flex items-center justify-center shadow-md lg:shadow-lg transform group-hover:rotate-3 lg:group-hover:rotate-6 group-hover:scale-105 lg:group-hover:scale-110 transition-all duration-500`}>
                            <IconComponent size={20} className="sm:hidden text-white" />
                            <IconComponent size={24} className="hidden sm:block lg:hidden text-white" />
                            <IconComponent size={28} className="hidden lg:block text-white" />
                          </div>
                          
                          {/* Floating index number - responsive */}
                          <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-mylli-gray group-hover:bg-mylli-primary group-hover:text-white transition-all duration-500">
                            {index + 1}
                          </div>
                        </div>
                        
                        {/* Title - responsive text sizing */}
                        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-mylli-dark group-hover:bg-gradient-to-r group-hover:from-mylli-primary group-hover:to-mylli-secondary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 leading-tight">
                          {reason.title}
                        </h3>
                        
                        {/* Description - responsive text */}
                        <p className="text-sm sm:text-base text-mylli-gray leading-relaxed flex-grow mb-4 sm:mb-6">
                          {reason.description}
                        </p>
                        
                        {/* Interactive bottom section - mobile optimized */}
                        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 group-hover:border-mylli-primary/20 transition-colors duration-500">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={10} className="sm:hidden text-yellow-400 fill-current opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                          transitionDelay: `${i * 0.1}s`
                        }} />)}
                            {[...Array(5)].map((_, i) => <Star key={i} size={12} className="hidden sm:block text-yellow-400 fill-current opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                          transitionDelay: `${i * 0.1}s`
                        }} />)}
                          </div>
                          
                          {/* Animated arrow - responsive sizing */}
                          <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-mylli-primary transition-all duration-500 transform group-hover:translate-x-1 lg:group-hover:translate-x-2">
                            <Zap size={12} className="sm:hidden text-gray-400 group-hover:text-white transition-colors duration-500" />
                            <Zap size={14} className="hidden sm:block lg:hidden text-gray-400 group-hover:text-white transition-colors duration-500" />
                            <Zap size={16} className="hidden lg:block text-gray-400 group-hover:text-white transition-colors duration-500" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-mylli-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  </div>;
            })}
            </div>
            
            {/* Call to action section - mobile optimized */}
            <div className="mt-12 sm:mt-16 text-center">
              <div className="relative inline-block w-full sm:w-auto">
                <div className="absolute -inset-2 bg-gradient-to-r from-mylli-primary via-mylli-secondary to-mylli-accent rounded-xl lg:rounded-2xl blur opacity-30 animate-pulse-soft"></div>
                <div className="relative bg-white rounded-xl lg:rounded-2xl p-6 sm:p-8 shadow-lg lg:shadow-xl border border-mylli-primary/10">
                  <p className="text-lg sm:text-xl text-mylli-dark mb-4 sm:mb-6 font-medium px-2">
                    Prêt à découvrir nos services personnalisés ?
                  </p>
                  <Link to="/contact">
                    <Button className="btn-primary group relative overflow-hidden w-full sm:w-auto">
                      <span className="relative z-10">Contactez-nous</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-mylli-secondary to-mylli-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default AProposPage;