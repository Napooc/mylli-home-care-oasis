import { Link } from 'react-router-dom';
import { Heart, User, Clock, Shield, CheckCircle, Star, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PageBanner from '@/components/common/PageBanner';
import SectionHeading from '@/components/common/SectionHeading';
import OptimizedImage from '@/components/seo/OptimizedImage';

const AideSoignantPage = () => {
  // Roles of caregiver with specific healthcare icons
  const roles = [
    {
      title: "Assister à l'hygiène corporelle",
      iconImage: "/lovable-uploads/d2780d4e-04e6-4ff9-8a1f-a54048bb2eb8.png"
    },
    {
      title: "Aider à la prise de médicaments",
      iconImage: "/lovable-uploads/1154475c-65aa-44df-bcaf-ab3092ac9960.png"
    },
    {
      title: "Aider à l'alimentation",
      iconImage: "/lovable-uploads/0ac5ce88-2b3f-4931-9488-210bc9425794.png"
    },
    {
      title: "Mesurer électroniquement les constantes",
      iconImage: "/lovable-uploads/5364c2b1-9466-4ff2-b1bf-f6288e735add.png"
    },
    {
      title: "Accompagner et sécuriser le patient",
      iconImage: "/lovable-uploads/da550c48-1c62-4eb0-b6cc-df8d0db5cdd8.png"
    }
  ];

  return (
    <div>
      <PageBanner 
        title="AIDE-SOIGNANT(E) À DOMICILE" 
        subtitle="Préservation de l'autonomie et accompagnement quotidien" 
      />
      
      {/* Ultra Modern Redesigned Introduction Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Dynamic Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated geometric shapes */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-mylli-primary/20 to-mylli-secondary/20 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-mylli-accent/15 to-mylli-quaternary/15 rounded-full animate-bounce-subtle"></div>
            <div className="absolute bottom-32 left-40 w-20 h-20 bg-gradient-to-br from-mylli-secondary/20 to-mylli-primary/20 rounded-full animate-float"></div>
          </div>
          
          {/* Flowing gradient waves */}
          <div className="absolute inset-0 bg-gradient-to-r from-mylli-primary/5 via-transparent to-mylli-accent/5 animate-pulse-soft"></div>
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-mylli-light/10 to-transparent"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Revolutionary Split Design with Creative Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Side - Enhanced Creative Content */}
              <div className="lg:col-span-7 space-y-10">
                
                {/* Ultra Modern Heading with Creative Typography */}
                <div className="space-y-8">
                  <div className="relative">
                    {/* Creative background text effect */}
                    <div className="absolute -top-4 -left-4 text-8xl font-black text-mylli-primary/5 pointer-events-none select-none">
                      CARE
                    </div>
                    
                    <h2 className="relative text-4xl lg:text-6xl font-black leading-tight tracking-tight">
                      <span className="block bg-gradient-to-r from-mylli-primary via-mylli-secondary to-mylli-accent bg-clip-text text-transparent animate-text-gradient">
                        Un accompagnement
                      </span>
                      <span className="block text-mylli-dark mt-2 relative">
                        quotidien
                        <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-mylli-primary to-mylli-secondary rounded-full animate-scale-in"></div>
                      </span>
                      <span className="block bg-gradient-to-r from-mylli-secondary via-mylli-accent to-mylli-quaternary bg-clip-text text-transparent mt-2 relative">
                        personnalisé
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-mylli-accent to-mylli-quaternary rounded-full animate-pulse"></div>
                      </span>
                    </h2>
                  </div>
                </div>

                {/* Revolutionary Content Cards with Unique Design */}
                <div className="space-y-6">
                  
                  {/* Card 1 - Floating Design */}
                  <div className="group relative perspective-1000">
                    <div className="absolute -inset-2 bg-gradient-to-r from-mylli-primary/20 to-mylli-secondary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 transform group-hover:rotateX-5 group-hover:rotateY-5 transition-all duration-700 hover:shadow-3xl">
                      <div className="flex items-start space-x-6">
                        <div className="relative">
                          <div className="w-4 h-4 bg-gradient-to-br from-mylli-primary to-mylli-secondary rounded-full animate-pulse"></div>
                          <div className="absolute -inset-2 bg-mylli-primary/20 rounded-full animate-ping"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-lg text-mylli-gray leading-relaxed font-medium">
                            Tout en <span className="font-bold text-mylli-primary">stimulant et préservant l'autonomie</span> du malade, l'aide-soignant accomplit différents actes de la vie quotidienne : aide au lever et au coucher, aide au transfert du malade, aide à la toilette et à l'habillage, administration des repas, changement de la literie…
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card 2 - Sliding Design */}
                  <div className="group relative overflow-hidden">
                    <div className="absolute -inset-2 bg-gradient-to-r from-mylli-accent/20 to-mylli-quaternary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 transform group-hover:translate-x-2 transition-all duration-500">
                      {/* Sliding accent bar */}
                      <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-mylli-accent to-mylli-quaternary rounded-l-3xl transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top"></div>
                      
                      <div className="flex items-start space-x-6">
                        <div className="relative">
                          <div className="w-4 h-4 bg-gradient-to-br from-mylli-accent to-mylli-quaternary rounded-full animate-bounce-subtle"></div>
                          <div className="absolute -inset-2 bg-mylli-accent/20 rounded-full animate-ping delay-500"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-lg text-mylli-gray leading-relaxed font-medium">
                            Il accompagne cette personne dans les <span className="font-bold text-mylli-accent">activités de sa vie quotidienne</span>, il contribue à son bien-être et à lui faire recouvrer, dans la mesure du possible, son autonomie.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card 3 - Morphing Design */}
                  <div className="group relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-mylli-secondary/20 to-mylli-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 transform group-hover:scale-105 transition-all duration-500">
                      {/* Morphing corner accent */}
                      <div className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-br from-mylli-secondary to-mylli-primary rounded-full transform group-hover:rotate-180 group-hover:scale-150 transition-all duration-700"></div>
                      
                      <div className="flex items-start space-x-6">
                        <div className="relative">
                          <div className="w-4 h-4 bg-gradient-to-br from-mylli-secondary to-mylli-primary rounded-full animate-pulse delay-1000"></div>
                          <div className="absolute -inset-2 bg-mylli-secondary/20 rounded-full animate-ping delay-1000"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-lg text-mylli-gray leading-relaxed font-medium">
                            L'aide-soignant réalise des <span className="font-bold text-mylli-secondary">soins liés aux fonctions d'entretien</span> et de continuité de la vie visant à compenser partiellement ou totalement un manque ou une diminution de l'autonomie de la personne.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revolutionary Service Schedule with 3D Effect */}
                <div className="relative group perspective-1000">
                  <div className="absolute -inset-4 bg-gradient-to-r from-mylli-primary/30 via-mylli-secondary/30 to-mylli-accent/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
                  <div className="relative bg-gradient-to-br from-white via-white to-mylli-light/20 rounded-3xl p-10 shadow-3xl border border-white/30 backdrop-blur-xl transform group-hover:rotateX-3 group-hover:rotateY-3 transition-all duration-700">
                    
                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-mylli-primary to-mylli-secondary rounded-full flex items-center justify-center shadow-xl animate-float">
                      <Clock size={20} className="text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="text-center space-y-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-mylli-primary via-mylli-secondary to-mylli-accent mb-4 shadow-2xl animate-pulse">
                        <Clock size={32} className="text-white" />
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-2xl text-mylli-dark font-bold leading-tight">
                          Le service d'aide-soignant assure les gardes
                        </p>
                        
                        {/* Dynamic time badges */}
                        <div className="flex flex-wrap justify-center gap-4">
                          <div className="group/badge relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-mylli-primary to-mylli-secondary rounded-full blur opacity-50 group-hover/badge:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative bg-gradient-to-r from-mylli-primary to-mylli-secondary text-white px-6 py-3 rounded-full font-black text-lg shadow-lg transform group-hover/badge:scale-110 transition-transform duration-300">
                              JOUR
                            </div>
                          </div>
                          
                          <div className="group/badge relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-mylli-secondary to-mylli-accent rounded-full blur opacity-50 group-hover/badge:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative bg-gradient-to-r from-mylli-secondary to-mylli-accent text-white px-6 py-3 rounded-full font-black text-lg shadow-lg transform group-hover/badge:scale-110 transition-transform duration-300">
                              NUIT
                            </div>
                          </div>
                          
                          <div className="group/badge relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-mylli-accent to-mylli-quaternary rounded-full blur opacity-50 group-hover/badge:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative bg-gradient-to-r from-mylli-accent to-mylli-quaternary text-white px-6 py-3 rounded-full font-black text-lg shadow-lg transform group-hover/badge:scale-110 transition-transform duration-300">
                              24H/24H
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute bottom-4 left-4 w-3 h-12 bg-gradient-to-b from-mylli-primary/30 to-transparent rounded-full animate-pulse"></div>
                    <div className="absolute top-4 right-12 w-12 h-3 bg-gradient-to-r from-mylli-secondary/30 to-transparent rounded-full animate-pulse delay-500"></div>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Revolutionary Image Design */}
              <div className="lg:col-span-5 relative">
                
                {/* Creative background elements */}
                <div className="absolute -inset-8 opacity-20">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-mylli-primary/30 to-mylli-secondary/30 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tl from-mylli-accent/30 to-mylli-quaternary/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
                
                {/* Main Revolutionary Image Container */}
                <div className="relative group">
                  
                  {/* Multiple layered backgrounds for depth */}
                  <div className="absolute -inset-6 bg-gradient-to-br from-mylli-primary/40 via-mylli-secondary/30 to-mylli-accent/40 rounded-[3rem] transform rotate-3 group-hover:rotate-6 transition-all duration-1000 blur-xl scale-110"></div>
                  <div className="absolute -inset-4 bg-gradient-to-tl from-mylli-quaternary/30 via-transparent to-mylli-primary/30 rounded-[3rem] transform -rotate-2 group-hover:-rotate-4 transition-all duration-1000 blur-lg scale-105"></div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-white/60 to-mylli-light/40 rounded-[3rem] blur-sm"></div>
                  
                  {/* Main container with revolutionary styling */}
                  <div className="relative bg-gradient-to-br from-white via-white to-mylli-light/20 rounded-[3rem] p-6 shadow-3xl transform group-hover:-translate-y-4 group-hover:scale-105 group-hover:rotate-1 transition-all duration-1000 border border-white/60 backdrop-blur-xl">
                    
                    {/* Image wrapper with unique aspect ratio and effects */}
                    <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-mylli-light/30 to-white shadow-inner">
                      <div className="aspect-[3/4] relative">
                        <OptimizedImage 
                          src="/lovable-uploads/faf36ebb-3182-48d2-bee8-b230c9b182eb.png" 
                          alt="Aide-soignant avec patient âgé - Accompagnement personnalisé à domicile" 
                          width={400} 
                          height={533} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 filter group-hover:brightness-110 group-hover:contrast-105" 
                        />
                        
                        {/* Creative overlay effects */}
                        <div className="absolute inset-0 bg-gradient-to-t from-mylli-dark/20 via-transparent to-transparent group-hover:from-mylli-dark/10 transition-all duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-mylli-primary/10 group-hover:to-mylli-primary/5 transition-all duration-500"></div>
                        
                        {/* Floating interactive elements */}
                        <div className="absolute top-6 left-6 w-3 h-3 bg-mylli-primary rounded-full animate-pulse opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-12 right-8 w-2 h-2 bg-mylli-secondary rounded-full animate-pulse delay-300 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-12 left-8 w-4 h-4 bg-mylli-accent rounded-full animate-pulse delay-600 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                    
                    {/* Revolutionary floating stats with unique design */}
                    <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-mylli-primary via-mylli-secondary to-mylli-accent rounded-2xl p-6 shadow-2xl border border-white/30 backdrop-blur-xl transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-3 transition-all duration-700">
                      <div className="text-center space-y-2">
                        <div className="text-3xl font-black text-white drop-shadow-lg">+15</div>
                        <div className="text-sm text-white/90 font-medium">Ans d'expérience</div>
                        <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                          <div className="h-full bg-white rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute -top-4 -right-4 bg-gradient-to-br from-mylli-accent via-mylli-quaternary to-mylli-secondary rounded-2xl p-4 shadow-2xl border border-white/30 backdrop-blur-xl transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:-rotate-3 transition-all duration-700">
                      <div className="text-center space-y-1">
                        <div className="text-2xl font-black text-white drop-shadow-lg">24/7</div>
                        <div className="text-xs text-white/90 font-medium">Disponible</div>
                      </div>
                    </div>
                    
                    {/* Creative decorative elements */}
                    <div className="absolute top-1/3 -right-2 w-6 h-20 bg-gradient-to-b from-mylli-primary/40 via-mylli-secondary/30 to-transparent rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    <div className="absolute bottom-1/3 -left-2 w-20 h-6 bg-gradient-to-r from-mylli-secondary/40 via-mylli-accent/30 to-transparent rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-300"></div>
                  </div>
                  
                  {/* External magical glow effect */}
                  <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-mylli-primary/20 via-mylli-secondary/10 to-mylli-accent/20 transform scale-0 group-hover:scale-150 transition-transform duration-1500 -z-10 blur-3xl"></div>
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
