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
      
      {/* Enhanced Mission Section with new image and interactive design */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border-2 border-mylli-primary animate-spin-slow" style={{
          animationDuration: '30s'
        }}></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 rounded-full border border-mylli-secondary animate-spin-slow" style={{
          animationDuration: '25s',
          animationDirection: 'reverse'
        }}></div>
        </div>
        
        <div className="container-custom relative z-10">
          <SectionHeading title="Notre Mission" subtitle="Permettre aux personnes en perte d'autonomie de rester chez elles dans les meilleures conditions possibles" variant="gradient" className="mb-20" />
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Enhanced Image Section with the new image */}
              <div className="lg:col-span-6 relative">
                <div className="relative group perspective-1000">
                  {/* Multiple layered backgrounds for depth */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-mylli-primary/30 via-mylli-secondary/30 to-mylli-accent/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-all duration-700 animate-pulse-soft"></div>
                  <div className="absolute -inset-6 bg-gradient-to-l from-mylli-quaternary/40 to-mylli-primary/40 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
                  
                  {/* Main image container with 3D transform */}
                  <div className="relative bg-white rounded-3xl p-4 shadow-2xl transform group-hover:scale-105 group-hover:rotate-y-3 transition-all duration-700 border border-gray-100">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img src="/lovable-uploads/4518a561-bb46-401c-97bf-1fcc8a183433.png" alt="Équipe médicale prodiguant des soins à domicile avec compassion et professionnalisme" className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-700" />
                      
                      {/* Sophisticated overlay gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-mylli-dark/20 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-mylli-primary/10"></div>
                      
                      {/* Interactive floating elements */}
                      
                      
                    </div>
                    
                    {/* Enhanced mission statement overlay */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl px-8 py-6 border border-white/20 max-w-md">
                      <div className="text-center">
                        <Quote size={20} className="text-mylli-primary mx-auto mb-2" />
                        <p className="text-mylli-dark font-semibold text-sm leading-relaxed">
                          "Accompagner avec dignité et compassion"
                        </p>
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-mylli-primary to-mylli-secondary rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating stats */}
                  <div className="absolute -top-4 -left-4 bg-gradient-to-br from-mylli-primary to-mylli-secondary rounded-2xl p-4 shadow-xl animate-float" style={{
                  animationDelay: '1s'
                }}>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">10+</div>
                      <div className="text-xs text-white/80">Années</div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-mylli-accent to-mylli-quaternary rounded-2xl p-4 shadow-xl animate-bounce-subtle">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">24/7</div>
                      <div className="text-xs text-white/80">Support</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Content Section */}
              <div className="lg:col-span-6">
                <div className="space-y-8">
                  
                  {/* Mission Statement Card */}
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-mylli-primary via-mylli-secondary to-mylli-accent rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-6">
                          <div className="w-3 h-20 bg-gradient-to-b from-mylli-primary via-mylli-secondary to-mylli-accent rounded-full"></div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-mylli-primary to-mylli-secondary rounded-xl flex items-center justify-center mr-4 shadow-lg">
                              <Target size={24} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-mylli-dark to-mylli-primary bg-clip-text text-transparent">
                              Notre Engagement
                            </h3>
                          </div>
                          
                          <p className="text-lg text-mylli-gray leading-relaxed mb-4">
                            Chez Mylli Services, nous croyons fermement que chaque personne a droit au meilleur accompagnement possible, dans l'environnement qui lui est familier.
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gradient-to-r from-mylli-primary/10 to-mylli-secondary/10 rounded-xl p-4 border border-mylli-primary/20">
                              <div className="flex items-center mb-2">
                                <Heart size={16} className="text-mylli-primary mr-2" />
                                <span className="font-medium text-mylli-dark text-sm">Compassion</span>
                              </div>
                              <p className="text-xs text-mylli-gray">Accompagnement humain</p>
                            </div>
                            <div className="bg-gradient-to-r from-mylli-secondary/10 to-mylli-accent/10 rounded-xl p-4 border border-mylli-secondary/20">
                              <div className="flex items-center mb-2">
                                <Shield size={16} className="text-mylli-secondary mr-2" />
                                <span className="font-medium text-mylli-dark text-sm">Professionnalisme</span>
                              </div>
                              <p className="text-xs text-mylli-gray">Expertise reconnue</p>
                            </div>
                          </div>
                          
                          <p className="text-lg text-mylli-gray leading-relaxed">
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
      
      {/* Ultra Modern Why Choose Us Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJtIDQwIDAgbCAwIDQwIG0gLTQwIDAgbCA0MCAwIiBzdHJva2U9IiMwMDc3QzAiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] animate-pulse-soft"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <SectionHeading title="Pourquoi Choisir Mylli Services" subtitle="Des raisons solides de nous confier votre bien-être ou celui de vos proches" variant="animated" highlightText="Mylli Services" />
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reasons.map((reason, index) => {
              const IconComponent = reason.icon;
              return <div key={index} className="group relative transform transition-all duration-700 hover:translate-y-[-10px] hover:scale-105" style={{
                animationDelay: `${index * 0.1}s`
              }}>
                    {/* Animated background glow */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${reason.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
                    
                    {/* Main card */}
                    <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:border-mylli-primary/20">
                      
                      {/* Animated top border */}
                      <div className={`h-1 bg-gradient-to-r ${reason.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                      
                      {/* Content */}
                      <div className="p-8 flex flex-col h-full">
                        
                        {/* Icon section with floating animation */}
                        <div className="flex items-center justify-between mb-6">
                          <div className={`w-16 h-16 bg-gradient-to-br ${reason.color} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}>
                            <IconComponent size={28} className="text-white" />
                          </div>
                          
                          {/* Floating index number */}
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-mylli-gray group-hover:bg-mylli-primary group-hover:text-white transition-all duration-500">
                            {index + 1}
                          </div>
                        </div>
                        
                        {/* Title with gradient text on hover */}
                        <h3 className="text-xl font-bold mb-4 text-mylli-dark group-hover:bg-gradient-to-r group-hover:from-mylli-primary group-hover:to-mylli-secondary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 leading-tight">
                          {reason.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-mylli-gray leading-relaxed flex-grow mb-6">
                          {reason.description}
                        </p>
                        
                        {/* Interactive bottom section */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-mylli-primary/20 transition-colors duration-500">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-yellow-400 fill-current opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                          transitionDelay: `${i * 0.1}s`
                        }} />)}
                          </div>
                          
                          {/* Animated arrow */}
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-mylli-primary transition-all duration-500 transform group-hover:translate-x-2">
                            <Zap size={16} className="text-gray-400 group-hover:text-white transition-colors duration-500" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-mylli-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  </div>;
            })}
            </div>
            
            {/* Call to action section */}
            <div className="mt-16 text-center">
              <div className="relative inline-block">
                <div className="absolute -inset-2 bg-gradient-to-r from-mylli-primary via-mylli-secondary to-mylli-accent rounded-2xl blur opacity-30 animate-pulse-soft"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-mylli-primary/10">
                  <p className="text-xl text-mylli-dark mb-6 font-medium">
                    Prêt à découvrir nos services personnalisés ?
                  </p>
                  <Link to="/contact">
                    <Button className="btn-primary group relative overflow-hidden">
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