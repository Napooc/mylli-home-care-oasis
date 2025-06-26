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
    iconImage: "/lovable-uploads/37fedd5b-3a3c-476d-89c3-c57957c696c5.png"
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
  return <div className="pb-12">
      {/* Banner */}
      <PageBanner title="INFIRMIER(ÈRE) À DOMICILE" subtitle="Une alternative professionnelle à l'hospitalisation pour les patients nécessitant des soins médicaux réguliers" variant="modern" />
      
      {/* Redesigned Description Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-mylli-light/20 relative overflow-hidden">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content Side */}
              <div className="space-y-8 lg:pr-8">
                <div className="space-y-6">
                  
                  
                  <SectionHeading title="Soins infirmiers à domicile" subtitle="Alternative moderne à l'hospitalisation" align="left" variant="gradient" />
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-mylli-primary/10 hover:border-mylli-primary/30 transition-all duration-300">
                    <p className="text-lg text-mylli-gray leading-relaxed">
                      Alternative à l'hospitalisation, la prise en charge des soins à domicile est aujourd'hui effective pour un nombre croissant de pathologies comme les cancers, les maladies respiratoires ou des situations de dépendance comme le handicap.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-mylli-primary/5 to-mylli-secondary/5 rounded-xl p-5 border border-mylli-primary/10">
                      <div className="flex items-center mb-3">
                        <File className="text-mylli-primary mr-3" size={20} />
                        <h4 className="font-semibold text-mylli-dark">Prescription médicale</h4>
                      </div>
                      <p className="text-sm text-mylli-gray">
                        Les soins infirmiers à domicile se font toujours suite à une prescription d'un médecin, sauf pour les soins d'hygiène.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-mylli-secondary/5 to-mylli-primary/5 rounded-xl p-5 border border-mylli-secondary/10">
                      <div className="flex items-center mb-3">
                        <Clipboard className="text-mylli-secondary mr-3" size={20} />
                        <h4 className="font-semibold text-mylli-dark">Dossier patient</h4>
                      </div>
                      <p className="text-sm text-mylli-gray">
                        L'infirmier à domicile doit rédiger et tenir à jour un dossier pour chaque patient.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-mylli-primary to-mylli-secondary text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <Clock size={28} className="mr-4" />
                        <h4 className="font-bold text-xl">Service continu 24h/24</h4>
                      </div>
                      <p className="text-white/95 text-lg">
                        Notre équipe d'infirmiers qualifiés assure une présence adaptée à vos besoins, avec des gardes de jour, de nuit ou continues selon vos besoins médicaux.
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-12 translate-y-12"></div>
                  </div>
                </div>
              </div>
              
              {/* Image Side */}
              <div className="relative">
                <div className="relative z-10">
                  {/* Main image container with modern styling */}
                  <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-mylli-primary/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-mylli-primary/5 to-mylli-secondary/5"></div>
                    <div className="relative p-8">
                      <OptimizedImage src="/lovable-uploads/4ec4bdf4-5ed1-42c3-ae8c-c578bfbab24a.png" alt="Infirmière prodiguant des soins à domicile" width={600} height={400} className="w-full h-auto rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  
                  {/* Floating stats cards */}
                  <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-mylli-primary/20 animate-float">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-mylli-primary mb-1">24/7</div>
                      <div className="text-xs text-mylli-gray font-medium">Service continu</div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-mylli-secondary/20 animate-float" style={{
                  animationDelay: '1s'
                }}>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-mylli-secondary mb-1">100%</div>
                      <div className="text-xs text-mylli-gray font-medium">Professionnel</div>
                    </div>
                  </div>
                </div>
                
                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-mylli-primary/10 to-mylli-secondary/10 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-mylli-accent/5 to-transparent rounded-3xl transform -rotate-2 scale-110 -z-20"></div>
                
                {/* Floating particles */}
                <div className="absolute top-10 right-10 w-4 h-4 bg-mylli-primary/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-6 h-6 bg-mylli-secondary/20 rounded-full animate-pulse" style={{
                animationDelay: '0.5s'
              }}></div>
                <div className="absolute top-1/2 right-0 w-3 h-3 bg-mylli-accent/20 rounded-full animate-pulse" style={{
                animationDelay: '1.5s'
              }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background pattern */}
        
      </section>

      {/* Patient Profiles */}
      <section className="section-padding bg-gradient-to-b from-mylli-light to-white">
        <div className="container-custom">
          <SectionHeading title="Profils des patients concernés" subtitle="Nos services s'adaptent à différents besoins médicaux" align="center" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {patientProfiles.map((profile, index) => <Card key={index} className="border-none shadow-card hover:shadow-hover transition-all duration-300 animate-fade-in h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-5 p-3 rounded-full bg-mylli-primary/10">
                      {profile.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-mylli-dark">{profile.title}</h3>
                    <p className="text-mylli-gray">{profile.description}</p>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Nurse Roles - Centered with Images */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container-custom">
          <SectionHeading title="Rôles de l'infirmier(ère)" subtitle="Une prise en charge médicale complète à domicile" align="center" variant="gradient" />
          
          <div className="max-w-7xl mx-auto mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {nurseRoles.map((role, index) => <div key={index} className="group relative">
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-700 hover:-translate-y-6 hover:shadow-2xl hover:border-mylli-primary/30 group-hover:scale-105 h-80 flex flex-col">
                    {/* Image container with enhanced styling */}
                    <div className="relative p-8 pb-6 flex-grow flex flex-col items-center justify-center">
                      <div className="relative mb-6">
                        {/* Enhanced decorative background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-mylli-primary/10 to-mylli-secondary/10 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 scale-110"></div>
                        <div className="absolute inset-0 bg-gradient-to-tl from-mylli-accent/5 to-transparent rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500 scale-105"></div>
                        
                        {/* Main image container */}
                        <div className="relative w-40 h-40 mx-auto rounded-3xl bg-gradient-to-br from-white to-mylli-light/30 flex items-center justify-center shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl border border-mylli-primary/10">
                          <OptimizedImage src={role.iconImage} alt={role.title} width={140} height={140} className="w-36 h-36 object-contain filter group-hover:brightness-110 transition-all duration-500" />
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

      {/* Schedules */}
      
      
      {/* Testimonials */}
      
      
      {/* Call to Action */}
      
    </div>;
};
export default InfirmierPage;