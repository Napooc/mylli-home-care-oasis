
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
      
      {/* Revolutionary New Design Section - Full Width Hero */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-mylli-primary to-mylli-dark overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0">
          {/* Animated geometric shapes */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-white/10 to-mylli-secondary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-tl from-mylli-accent/15 to-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-mylli-secondary/5 via-transparent to-mylli-accent/5 rounded-full blur-3xl animate-spin-slow"></div>
          
          {/* Flowing lines */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
              <path d="M0 400 Q300 200 600 400 T1200 400" stroke="url(#gradient)" strokeWidth="2" fill="none" className="animate-pulse"/>
              <path d="M0 300 Q400 100 800 300 T1200 300" stroke="url(#gradient2)" strokeWidth="1" fill="none" className="animate-pulse delay-500"/>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" stopOpacity="0"/>
                  <stop offset="50%" stopColor="white" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="white" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0"/>
                  <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
              
              {/* Left Side - Revolutionary Content */}
              <div className="space-y-12 order-2 lg:order-1">
                
                {/* Ultra Modern Heading */}
                <div className="space-y-8">
                  <div className="relative">
                    {/* Creative background text effect */}
                    <div className="absolute -top-8 -left-8 text-9xl font-black text-white/5 pointer-events-none select-none leading-none">
                      CARE
                    </div>
                    
                    <h2 className="relative text-5xl lg:text-7xl font-black leading-tight tracking-tight">
                      <span className="block bg-gradient-to-r from-white via-mylli-light to-white bg-clip-text text-transparent animate-text-gradient">
                        Un accompagnement
                      </span>
                      <span className="block text-white mt-4 relative">
                        quotidien
                        <div className="absolute -bottom-3 left-0 w-40 h-2 bg-gradient-to-r from-mylli-secondary to-mylli-accent rounded-full animate-scale-in"></div>
                      </span>
                      <span className="block bg-gradient-to-r from-mylli-light via-white to-mylli-secondary bg-clip-text text-transparent mt-4 relative">
                        personnalisé
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-mylli-accent to-mylli-quaternary rounded-full animate-pulse"></div>
                      </span>
                    </h2>
                  </div>
                </div>

                {/* Revolutionary Content Cards */}
                <div className="space-y-8">
                  
                  {/* Card 1 - Floating Glass Design */}
                  <div className="group relative perspective-1000">
                    <div className="absolute -inset-4 bg-gradient-to-r from-white/20 to-mylli-secondary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                    <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl transform group-hover:rotateX-5 group-hover:rotateY-5 transition-all duration-1000 hover:shadow-white/10">
                      <div className="flex items-start space-x-6">
                        <div className="relative">
                          <div className="w-6 h-6 bg-gradient-to-br from-white to-mylli-light rounded-full animate-pulse"></div>
                          <div className="absolute -inset-3 bg-white/20 rounded-full animate-ping"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-xl text-white/95 leading-relaxed font-medium">
                            Tout en <span className="font-bold text-mylli-light bg-white/10 px-2 py-1 rounded-lg">stimulant et préservant l'autonomie</span> du malade, l'aide-soignant accomplit différents actes de la vie quotidienne : aide au lever et au coucher, aide au transfert du malade, aide à la toilette et à l'habillage, administration des repas, changement de la literie…
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card 2 - Sliding Glass Design */}
                  <div className="group relative overflow-hidden">
                    <div className="absolute -inset-4 bg-gradient-to-r from-mylli-accent/20 to-white/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                    <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl transform group-hover:translate-x-4 transition-all duration-700">
                      {/* Sliding accent bar */}
                      <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-mylli-light to-white rounded-l-3xl transform scale-y-0 group-hover:scale-y-100 transition-transform duration-1000 origin-top"></div>
                      
                      <div className="flex items-start space-x-6">
                        <div className="relative">
                          <div className="w-6 h-6 bg-gradient-to-br from-mylli-light to-white rounded-full animate-bounce-subtle"></div>
                          <div className="absolute -inset-3 bg-mylli-light/20 rounded-full animate-ping delay-500"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-xl text-white/95 leading-relaxed font-medium">
                            Il accompagne cette personne dans les <span className="font-bold text-mylli-light bg-white/10 px-2 py-1 rounded-lg">activités de sa vie quotidienne</span>, il contribue à son bien-être et à lui faire recouvrer, dans la mesure du possible, son autonomie.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card 3 - Morphing Glass Design */}
                  <div className="group relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-mylli-secondary/20 to-white/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                    <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl transform group-hover:scale-105 transition-all duration-700">
                      {/* Morphing corner accent */}
                      <div className="absolute top-6 right-6 w-10 h-10 bg-gradient-to-br from-white to-mylli-light rounded-full transform group-hover:rotate-180 group-hover:scale-150 transition-all duration-1000"></div>
                      
                      <div className="flex items-start space-x-6">
                        <div className="relative">
                          <div className="w-6 h-6 bg-gradient-to-br from-mylli-secondary to-white rounded-full animate-pulse delay-1000"></div>
                          <div className="absolute -inset-3 bg-mylli-secondary/20 rounded-full animate-ping delay-1000"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-xl text-white/95 leading-relaxed font-medium">
                            L'aide-soignant réalise des <span className="font-bold text-mylli-light bg-white/10 px-2 py-1 rounded-lg">soins liés aux fonctions d'entretien</span> et de continuité de la vie visant à compenser partiellement ou totalement un manque ou une diminution de l'autonomie de la personne.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revolutionary Service Schedule with 3D Glass Effect */}
                <div className="relative group perspective-1000">
                  <div className="absolute -inset-6 bg-gradient-to-r from-white/30 via-mylli-secondary/30 to-mylli-accent/30 rounded-3xl blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-1000"></div>
                  <div className="relative bg-white/15 backdrop-blur-2xl rounded-3xl p-12 shadow-3xl border border-white/30 transform group-hover:rotateX-3 group-hover:rotateY-3 transition-all duration-1000">
                    
                    {/* Floating elements */}
                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-white to-mylli-light rounded-full flex items-center justify-center shadow-2xl animate-float">
                      <Clock size={28} className="text-mylli-primary" />
                    </div>
                    
                    {/* Content */}
                    <div className="text-center space-y-8">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-white via-mylli-light to-white mb-6 shadow-2xl animate-pulse">
                        <Clock size={40} className="text-mylli-primary" />
                      </div>
                      
                      <div className="space-y-6">
                        <p className="text-3xl text-white font-bold leading-tight">
                          Le service d'aide-soignant assure les gardes
                        </p>
                        
                        {/* Dynamic time badges */}
                        <div className="flex flex-wrap justify-center gap-6">
                          <div className="group/badge relative">
                            <div className="absolute -inset-2 bg-gradient-to-r from-white to-mylli-light rounded-full blur opacity-50 group-hover/badge:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-gradient-to-r from-white/20 to-mylli-light/20 backdrop-blur-xl text-white px-8 py-4 rounded-full font-black text-xl shadow-2xl border border-white/30 transform group-hover/badge:scale-110 transition-transform duration-500">
                              JOUR
                            </div>
                          </div>
                          
                          <div className="group/badge relative">
                            <div className="absolute -inset-2 bg-gradient-to-r from-mylli-secondary to-mylli-accent rounded-full blur opacity-50 group-hover/badge:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-gradient-to-r from-mylli-secondary/20 to-mylli-accent/20 backdrop-blur-xl text-white px-8 py-4 rounded-full font-black text-xl shadow-2xl border border-white/30 transform group-hover/badge:scale-110 transition-transform duration-500">
                              NUIT
                            </div>
                          </div>
                          
                          <div className="group/badge relative">
                            <div className="absolute -inset-2 bg-gradient-to-r from-mylli-accent to-white rounded-full blur opacity-50 group-hover/badge:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-gradient-to-r from-mylli-accent/20 to-white/20 backdrop-blur-xl text-white px-8 py-4 rounded-full font-black text-xl shadow-2xl border border-white/30 transform group-hover/badge:scale-110 transition-transform duration-500">
                              24H/24H
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute bottom-6 left-6 w-4 h-16 bg-gradient-to-b from-white/40 to-transparent rounded-full animate-pulse"></div>
                    <div className="absolute top-6 right-16 w-16 h-4 bg-gradient-to-r from-mylli-light/40 to-transparent rounded-full animate-pulse delay-500"></div>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Full Card Image Design */}
              <div className="order-1 lg:order-2 relative">
                
                {/* Ultra Creative Background Elements */}
                <div className="absolute -inset-16 opacity-30">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/20 to-mylli-light/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tl from-mylli-secondary/20 to-white/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-mylli-accent/10 via-transparent to-white/10 rounded-full blur-3xl animate-spin-slow"></div>
                </div>
                
                {/* Main Revolutionary Full-Coverage Image Container */}
                <div className="relative group">
                  
                  {/* Multiple layered backgrounds for ultra depth */}
                  <div className="absolute -inset-8 bg-gradient-to-br from-white/30 via-mylli-light/20 to-mylli-secondary/30 rounded-[4rem] transform rotate-2 group-hover:rotate-4 transition-all duration-1500 blur-2xl scale-110"></div>
                  <div className="absolute -inset-6 bg-gradient-to-tl from-mylli-accent/20 via-transparent to-white/20 rounded-[4rem] transform -rotate-1 group-hover:-rotate-3 transition-all duration-1500 blur-xl scale-105"></div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-white/40 to-mylli-light/30 rounded-[4rem] blur-lg"></div>
                  
                  {/* Main container with revolutionary full-coverage styling */}
                  <div className="relative bg-gradient-to-br from-white/20 via-white/10 to-mylli-light/20 rounded-[4rem] overflow-hidden shadow-3xl transform group-hover:-translate-y-6 group-hover:scale-105 group-hover:rotate-1 transition-all duration-1500 border border-white/40 backdrop-blur-2xl">
                    
                    {/* Full Coverage Image - No padding, covers entire card */}
                    <div className="relative w-full h-[700px] overflow-hidden rounded-[4rem]">
                      <OptimizedImage 
                        src="/lovable-uploads/a2b58306-36ba-415f-bae7-8204094ce944.png" 
                        alt="Aide-soignant accompagnant un patient âgé lors d'un repas - Soins personnalisés à domicile" 
                        width={600} 
                        height={700} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1500 filter group-hover:brightness-110 group-hover:contrast-105" 
                      />
                      
                      {/* Creative overlay effects for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-mylli-primary/30 via-transparent to-transparent group-hover:from-mylli-primary/20 transition-all duration-700"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/10 group-hover:to-white/5 transition-all duration-700"></div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-mylli-secondary/10 via-transparent to-transparent group-hover:from-mylli-secondary/5 transition-all duration-700"></div>
                      
                      {/* Floating interactive elements overlaid on image */}
                      <div className="absolute top-8 left-8 w-4 h-4 bg-white rounded-full animate-pulse opacity-70 group-hover:opacity-100 transition-opacity duration-500 shadow-lg"></div>
                      <div className="absolute top-16 right-12 w-3 h-3 bg-mylli-light rounded-full animate-pulse delay-300 opacity-70 group-hover:opacity-100 transition-opacity duration-500 shadow-lg"></div>
                      <div className="absolute bottom-16 left-12 w-5 h-5 bg-mylli-secondary rounded-full animate-pulse delay-600 opacity-70 group-hover:opacity-100 transition-opacity duration-500 shadow-lg"></div>
                    </div>
                    
                    {/* Revolutionary floating stats positioned over the image */}
                    <div className="absolute bottom-8 left-8 bg-gradient-to-br from-mylli-primary/90 via-mylli-secondary/90 to-mylli-accent/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30 transform group-hover:scale-110 group-hover:-translate-y-4 group-hover:rotate-3 transition-all duration-1000">
                      <div className="text-center space-y-2">
                        <div className="text-4xl font-black text-white drop-shadow-lg">+15</div>
                        <div className="text-sm text-white/90 font-medium">Ans d'expérience</div>
                        <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                          <div className="h-full bg-white rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute top-8 right-8 bg-gradient-to-br from-white/90 via-mylli-light/90 to-mylli-secondary/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30 transform group-hover:scale-110 group-hover:-translate-y-4 group-hover:-rotate-3 transition-all duration-1000">
                      <div className="text-center space-y-2">
                        <div className="text-3xl font-black text-mylli-primary drop-shadow-lg">24/7</div>
                        <div className="text-sm text-mylli-dark/90 font-medium">Disponible</div>
                      </div>
                    </div>
                    
                    {/* Creative decorative elements over image */}
                    <div className="absolute top-1/3 right-4 w-8 h-24 bg-gradient-to-b from-white/40 via-mylli-light/30 to-transparent rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                    <div className="absolute bottom-1/3 left-4 w-24 h-8 bg-gradient-to-r from-mylli-secondary/40 via-white/30 to-transparent rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 animate-pulse delay-300"></div>
                  </div>
                  
                  {/* External magical glow effect */}
                  <div className="absolute inset-0 rounded-[4rem] bg-gradient-to-br from-white/20 via-mylli-light/10 to-mylli-secondary/20 transform scale-0 group-hover:scale-150 transition-transform duration-2000 -z-10 blur-3xl"></div>
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
