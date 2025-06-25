import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Clock, MapPin, Star, Shield, Heart, Users, Award, CheckCircle, ArrowRight, Stethoscope, Home as HomeIcon, Calendar, Zap } from "lucide-react";
import { motion } from "framer-motion";
import PageBanner from "@/components/common/PageBanner";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import ServiceCard from "@/components/common/ServiceCard";
import TestimonialCard from "@/components/common/TestimonialCard";
import OptimizedImage from "@/components/common/OptimizedImage";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  useEffect(() => {
    console.log('🏠 HomePage loaded successfully');
  }, []);

  const services = [
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "Soins Infirmiers",
      description: "Injections, pansements, perfusions par des infirmiers diplômés d'État",
      link: "/services/infirmier"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Aide Soignant",
      description: "Assistance quotidienne, toilette, aide aux repas par des professionnels certifiés",
      link: "/services/aide-soignant"
    },
    {
      icon: <HomeIcon className="h-8 w-8" />,
      title: "Garde à Domicile",
      description: "Surveillance 24h/24, accompagnement personnalisé",
      link: "/services"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Soins Post-Opératoires",
      description: "Suivi médical après intervention chirurgicale",
      link: "/services"
    }
  ];

  const testimonials = [
    {
      name: "Fatima Bennani",
      title: "Maarif, Casablanca",
      rating: 5,
      quote: "Service exceptionnel! L'infirmière était très professionnelle et à l'écoute. Je recommande vivement Mylli Services.",
      image: "/lovable-uploads/2d768651-e0d0-42ed-925c-e0c72eba8ee1.png"
    },
    {
      name: "Mohammed Alami",
      title: "Gauthier, Casablanca",
      rating: 5,
      quote: "Rapidité d'intervention remarquable. Mon père a reçu des soins de qualité à domicile. Merci à toute l'équipe!",
      image: "/lovable-uploads/37e30e5f-e19b-476f-9b63-7be9bbaa5a3e.png"
    },
    {
      name: "Aicha Tazi",
      title: "Ain Diab, Casablanca",
      rating: 5,
      quote: "Personnel très compétent et chaleureux. Les tarifs sont raisonnables pour la qualité des services proposés.",
      image: "/lovable-uploads/2f756573-a96c-4061-998c-b25adfae324e.png"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Mylli Services - N°1 Soins à Domicile Casablanca | Infirmier & Aide-Soignant 24h</title>
        <meta name="description" content="🏥 MYLLI SERVICES - Leader des soins à domicile Casablanca depuis 2014! Infirmiers diplômés, aides-soignants certifiés, garde malades 24h/24. URGENCES: +212 661 37 74 38" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen flex items-center py-20">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/00945798-dc13-478e-94d1-d1aaa70af5a6.png')] bg-cover bg-center opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 px-4 py-2">
                  🏥 N°1 depuis 2014
                </Badge>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Soins à Domicile
                  <span className="text-blue-600 block">Casablanca</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  <strong className="text-blue-600">Mylli Services</strong> - Votre partenaire de confiance pour des soins professionnels à domicile. 
                  Infirmiers diplômés d'État et aides-soignants certifiés disponibles 24h/24.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Intervention rapide</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Professionnels certifiés</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Disponible 24h/24</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Tous quartiers Casablanca</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
                  asChild
                >
                  <Link to="/contact">
                    <Phone className="mr-2 h-5 w-5" />
                    Appeler Maintenant
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg px-8 py-6 rounded-xl border-2 border-blue-200 hover:bg-blue-50 transition-all duration-300"
                  asChild
                >
                  <Link to="/services">
                    Voir nos Services
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Contact Info */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Urgences 24h</p>
                      <p className="font-semibold text-gray-900">+212 661 37 74 38</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Disponibilité</p>
                      <p className="font-semibold text-gray-900">24h/24 - 7j/7</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Zone</p>
                      <p className="font-semibold text-gray-900">Tout Casablanca</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-2">
                <OptimizedImage
                  src="/lovable-uploads/00945798-dc13-478e-94d1-d1aaa70af5a6.png"
                  alt="Équipe médicale Mylli Services - Infirmiers et aides-soignants professionnels à Casablanca"
                  className="w-full h-[600px] object-cover rounded-2xl"
                  priority
                />
                
                {/* Floating Stats Cards */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-bold text-gray-900">4.9/5</span>
                  </div>
                  <p className="text-sm text-gray-600">+150 avis clients</p>
                </div>
                
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-bold text-gray-900">+1000</span>
                  </div>
                  <p className="text-sm text-gray-600">Patients satisfaits</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-2xl text-gray-900">+10 ans</h3>
              <p className="text-gray-600">d'expérience</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-2xl text-gray-900">50+</h3>
              <p className="text-gray-600">Professionnels</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-2xl text-gray-900">4.9/5</h3>
              <p className="text-gray-600">Note moyenne</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-2xl text-gray-900">24h/24</h3>
              <p className="text-gray-600">Disponibilité</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 mb-4">
              Nos Services
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Services Professionnels
              <span className="text-blue-600 block">à Domicile</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une gamme complète de soins médicaux et d'assistance à domicile, 
              adaptée à vos besoins spécifiques et dispensée par des professionnels qualifiés.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/services">
                Voir tous nos services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 mb-4">
              Pourquoi Mylli Services
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Votre Confiance,
              <span className="text-blue-600 block">Notre Priorité</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Professionnels Certifiés</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tous nos infirmiers sont diplômés d'État et nos aides-soignants certifiés. 
                  Formation continue et mise à jour des compétences garanties.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Intervention Rapide</h3>
                <p className="text-gray-600 leading-relaxed">
                  Service d'urgence disponible 24h/24 et 7j/7. 
                  Intervention dans les meilleurs délais sur tout Casablanca.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Soins Personnalisés</h3>
                <p className="text-gray-600 leading-relaxed">
                  Chaque patient bénéficie d'un plan de soins adapté à ses besoins spécifiques. 
                  Approche humaine et bienveillante garantie.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 mb-4">
              Témoignages
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ce que disent
              <span className="text-blue-600 block">nos patients</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Besoin de soins à domicile ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contactez-nous dès maintenant pour une intervention rapide et professionnelle. 
              Devis gratuit et sans engagement.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl"
                asChild
              >
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  +212 661 37 74 38
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="text-white border-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6 rounded-xl"
                asChild
              >
                <Link to="/contact">
                  Demander un devis gratuit
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <WhatsAppButton />
    </>
  );
};

export default HomePage;
