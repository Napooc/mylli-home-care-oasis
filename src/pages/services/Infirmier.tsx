import { Link } from 'react-router-dom';
import { Heart, Clock, File, Phone, Clipboard, Syringe, Hospital, Calendar, CheckCircle, User, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageBanner from '@/components/common/PageBanner';
import SectionHeading from '@/components/common/SectionHeading';
import TestimonialCard from '@/components/common/TestimonialCard';
import OptimizedImage from '@/components/seo/OptimizedImage';

const InfirmierPage = () => {
  // Patient profiles
  const patientProfiles = [{
    title: "Personnes en convalescence après hospitalisation",
    description: "Patients nécessitant un suivi médical après une intervention chirurgicale ou une hospitalisation, pour assurer une transition en douceur vers le domicile et prévenir les complications.",
    icon: <Hospital className="text-mylli-primary" size={32} />
  }, {
    title: "Personnes atteintes de maladies chroniques",
    description: "Patients souffrant de pathologies de longue durée comme le diabète, l'insuffisance cardiaque ou respiratoire, nécessitant des soins réguliers et un suivi constant.",
    icon: <Heart className="text-mylli-primary" size={32} />
  }, {
    title: "Personnes nécessitant des soins palliatifs",
    description: "Accompagnement des patients en fin de vie pour assurer leur confort, soulager la douleur et offrir un soutien psychologique tant au patient qu'à son entourage.",
    icon: <User className="text-mylli-primary" size={32} />
  }];

  // Nurse roles with updated images
  const nurseRoles = [{
    title: "Exécuter une ordonnance médicale",
    description: "Administration de traitements, préparation et administration d'injections, surveillance des effets secondaires.",
    iconImage: "/lovable-uploads/b8378166-5f0c-4885-a490-0d24a2bdf1eb.png"
  }, {
    title: "Poser et surveiller les sondes",
    description: "Installation et maintenance des sondes urinaires, nasogastriques et autres dispositifs médicaux invasifs.",
    iconImage: "/lovable-uploads/71e01351-d096-455c-85cc-a8d9d3c6a6b2.png"
  }, {
    title: "Poser et surveiller une perfusion",
    description: "Mise en place et surveillance des perfusions pour l'hydratation, la nutrition et l'administration de médicaments.",
    iconImage: "/lovable-uploads/da550c48-1c62-4eb0-b6cc-df8d0db5cdd8.png"
  }, {
    title: "Assurer la communication avec le médecin traitant",
    description: "Transmission régulière des informations sur l'évolution de l'état du patient, coordination des soins.",
    iconImage: "/lovable-uploads/2f756573-a96c-4061-998c-b25adfae324e.png"
  }, {
    title: "Rédiger un rapport quotidiennement",
    description: "Documentation détaillée des soins prodigués, des observations et de l'évolution du patient pour une traçabilité optimale.",
    iconImage: "/lovable-uploads/bc659d89-2f47-4184-b283-c7f41ba9193c.png"
  }];

  // Testimonials
  const testimonials = [{
    quote: "Après mon opération de la hanche, j'étais inquiète de rentrer chez moi. L'infirmière de Mylli Services m'a rassurée dès sa première visite. Ses soins professionnels et sa présence chaleureuse ont grandement contribué à ma récupération rapide.",
    name: "Mme Bennani, 72 ans",
    title: "Casablanca",
    image: "/placeholder.svg"
  }, {
    quote: "Mon père souffre d'un cancer avancé et souhaitait rester à la maison. Les infirmiers de Mylli Services ont été remarquables dans la gestion de sa douleur et des soins complexes. Leur expertise et leur humanité font toute la différence.",
    name: "Ahmed L.",
    title: "Fils d'un patient",
    image: "/placeholder.svg"
  }];

  return (
    <div className="pb-12">
      {/* Banner */}
      <PageBanner 
        title="INFIRMIER(ÈRE) À DOMICILE" 
        subtitle="Une alternative professionnelle à l'hospitalisation pour les patients nécessitant des soins médicaux réguliers" 
        variant="modern" 
      />
      
      {/* Modern Redesigned Introduction Section */}
      <section className="py-16 relative overflow-hidden bg-white">
        {/* Artistic background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-mylli-light/5 via-transparent to-mylli-primary/5"></div>
          <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-mylli-primary/8 to-mylli-secondary/8 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tl from-mylli-accent/8 to-mylli-quaternary/8 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Modern Split Layout Design */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Content */}
              <div className="space-y-6">
                {/* Main Heading */}
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-mylli-primary via-mylli-secondary to-mylli-accent bg-clip-text text-transparent">
                      Soins infirmiers
                    </span>
                    <br />
                    <span className="text-mylli-dark">à domicile</span>
                    <br />
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-mylli-secondary to-mylli-accent bg-clip-text text-transparent">
                        professionnels
                      </span>
                      <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-mylli-secondary to-mylli-accent rounded-full transform scale-x-0 animate-scale-in" style={{animationDelay: '1s', animationFillMode: 'forwards'}}></div>
                    </span>
                  </h2>
                </div>

                {/* Content Cards */}
                <div className="space-y-4">
                  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-mylli-primary/10 hover:shadow-xl hover:border-mylli-primary/30 transition-all duration-500">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-mylli-primary rounded-full mt-3 group-hover:scale-150 transition-transform duration-300"></div>
                      <p className="text-base text-mylli-gray leading-relaxed">
                        Alternative à l'hospitalisation, la prise en charge des soins à domicile est aujourd'hui effective pour un nombre croissant de pathologies comme les cancers, les maladies respiratoires ou des situations de dépendance comme le handicap.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group bg-gradient-to-br from-mylli-primary/5 to-mylli-secondary/5 rounded-xl p-5 border border-mylli-primary/10 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <File className="text-mylli-primary mr-3 group-hover:scale-110 transition-transform duration-300" size={20} />
                        <h4 className="font-semibold text-mylli-dark">Prescription médicale</h4>
                      </div>
                      <p className="text-sm text-mylli-gray">
                        Les soins infirmiers à domicile se font toujours suite à une prescription d'un médecin, sauf pour les soins d'hygiène.
                      </p>
                    </div>
                    
                    <div className="group bg-gradient-to-br from-mylli-secondary/5 to-mylli-primary/5 rounded-xl p-5 border border-mylli-secondary/10 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <Clipboard className="text-mylli-secondary mr-3 group-hover:scale-110 transition-transform duration-300" size={20} />
                        <h4 className="font-semibold text-mylli-dark">Dossier patient</h4>
                      </div>
                      <p className="text-sm text-mylli-gray">
                        L'infirmier à domicile doit rédiger et tenir à jour un dossier pour chaque patient.
                      </p>
                    </div>
                  </div>

                  {/* Service Schedule Highlight */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-mylli-primary/20 to-mylli-secondary/20 rounded-2xl blur-sm"></div>
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-mylli-primary/20 shadow-xl">
                      <div className="text-center space-y-3">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-mylli-primary to-mylli-secondary mb-3">
                          <Clock size={24} className="text-white" />
                        </div>
                        <p className="text-xl text-mylli-dark font-bold leading-tight">
                          Notre équipe d'infirmiers qualifiés assure une présence adaptée à vos besoins, avec des gardes de{' '}
                          <span className="text-mylli-primary font-black">jour</span>, de{' '}
                          <span className="text-mylli-secondary font-black">nuit</span>
                          {' '}ou{' '}
                          <span className="text-mylli-accent font-black">continues</span>{' '}
                          selon vos besoins médicaux.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Hero Image */}
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-mylli-primary/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-mylli-secondary/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
                
                {/* Main image container - more compact */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-mylli-primary/20 to-mylli-secondary/20 rounded-2xl transform rotate-2 group-hover:rotate-3 transition-transform duration-500 blur-sm"></div>
                  <div className="relative bg-white rounded-2xl p-3 shadow-xl transform group-hover:-translate-y-1 transition-all duration-500">
                    <div className="aspect-square overflow-hidden rounded-xl">
                      <OptimizedImage 
                        src="/lovable-uploads/9570e5be-c600-4267-a8d7-4ef12d722304.png" 
                        alt="Infirmière prodiguant des soins à domicile" 
                        width={400} 
                        height={400} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    
                    {/* Floating stats - smaller */}
                    <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-mylli-primary/20 transform group-hover:scale-110 transition-all duration-500">
                      <div className="text-center">
                        <div className="text-lg font-bold text-mylli-primary">24/7</div>
                        <div className="text-xs text-mylli-gray">Service continu</div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-mylli-secondary/20 transform group-hover:scale-110 transition-all duration-500">
                      <div className="text-center">
                        <div className="text-lg font-bold text-mylli-secondary">100%</div>
                        <div className="text-xs text-mylli-gray">Professionnel</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Profiles */}
      <section className="section-padding bg-gradient-to-b from-mylli-light to-white">
        <div className="container-custom">
          <SectionHeading 
            title="Profils des patients concernés" 
            subtitle="Nos services s'adaptent à différents besoins médicaux" 
            align="center" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {patientProfiles.map((profile, index) => (
              <Card key={index} className="border-none shadow-card hover:shadow-hover transition-all duration-300 animate-fade-in h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-5 p-3 rounded-full bg-mylli-primary/10">
                      {profile.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-mylli-dark">{profile.title}</h3>
                    <p className="text-mylli-gray">{profile.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nurse Roles - Centered with Images */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container-custom">
          <SectionHeading 
            title="Rôles de l'infirmier(ère)" 
            subtitle="Une prise en charge médicale complète à domicile" 
            align="center" 
            variant="gradient" 
          />
          
          <div className="max-w-7xl mx-auto mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {nurseRoles.map((role, index) => (
                <div key={index} className="group relative">
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-700 hover:-translate-y-6 hover:shadow-2xl hover:border-mylli-primary/30 group-hover:scale-105 h-80 flex flex-col">
                    {/* Image container with enhanced styling */}
                    <div className="relative p-8 pb-6 flex-grow flex flex-col items-center justify-center">
                      <div className="relative mb-6">
                        {/* Enhanced decorative background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-mylli-primary/10 to-mylli-secondary/10 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 scale-110"></div>
                        <div className="absolute inset-0 bg-gradient-to-tl from-mylli-accent/5 to-transparent rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500 scale-105"></div>
                        
                        {/* Main image container */}
                        <div className="relative w-40 h-40 mx-auto rounded-3xl bg-gradient-to-br from-white to-mylli-light/30 flex items-center justify-center shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl border border-mylli-primary/10">
                          <OptimizedImage 
                            src={role.iconImage} 
                            alt={role.title} 
                            width={140} 
                            height={140} 
                            className="w-36 h-36 object-contain filter group-hover:brightness-110 transition-all duration-500" 
                          />
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfirmierPage;