
import React from 'react';
import { Shield, Eye, Lock, UserCheck, FileText, Clock, Mail, Phone } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import SectionHeading from '@/components/common/SectionHeading';
import ModernScrollReveal from '@/components/animations/ModernScrollReveal';
import StaggeredReveal from '@/components/animations/StaggeredReveal';
import { Card, CardContent } from '@/components/ui/card';

const PolitiqueConfidentialite = () => {
  const sections = [
    {
      icon: FileText,
      title: "Collecte des informations",
      content: "Nous collectons les informations que vous nous fournissez directement, comme votre nom, adresse e-mail, numéro de téléphone et informations médicales nécessaires à la prestation de nos services."
    },
    {
      icon: Eye,
      title: "Utilisation des données",
      content: "Vos données personnelles sont utilisées exclusivement pour fournir nos services de soins à domicile, communiquer avec vous, et améliorer la qualité de nos prestations."
    },
    {
      icon: Lock,
      title: "Protection des données",
      content: "Nous mettons en place des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, altération ou destruction."
    },
    {
      icon: UserCheck,
      title: "Partage des informations",
      content: "Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. Le partage se limite aux professionnels de santé impliqués dans vos soins."
    }
  ];

  const rights = [
    "Droit d'accès à vos données personnelles",
    "Droit de rectification des informations inexactes",
    "Droit à l'effacement de vos données",
    "Droit à la portabilité de vos données",
    "Droit d'opposition au traitement",
    "Droit à la limitation du traitement"
  ];

  return (
    <>
      <SEOHead
        title="Politique de Confidentialité - Mylli Services"
        description="Découvrez comment Mylli Services protège et traite vos données personnelles. Transparence totale sur notre politique de confidentialité."
        keywords="politique confidentialité, protection données, RGPD, vie privée, Mylli Services"
        canonicalUrl="/politique-confidentialite"
      />

      <div className="min-h-screen bg-gradient-to-br from-white via-mylli-light/20 to-mylli-accent/10">
        {/* Hero Section */}
        <ModernScrollReveal direction="fade" duration={1.0}>
          <section className="relative overflow-hidden bg-gradient-to-r from-mylli-primary to-mylli-accent py-20">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="container-custom relative">
              <div className="max-w-4xl mx-auto text-center text-white">
                <ModernScrollReveal direction="scale" delay={0.2}>
                  <div className="mb-6">
                    <Shield className="w-16 h-16 mx-auto mb-4 animate-pulse-soft" />
                  </div>
                </ModernScrollReveal>
                <ModernScrollReveal direction="up" delay={0.4}>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                    Politique de <span className="text-mylli-light">Confidentialité</span>
                  </h1>
                </ModernScrollReveal>
                <ModernScrollReveal direction="up" delay={0.6}>
                  <p className="text-xl md:text-2xl text-mylli-light/90 animate-fade-in">
                    Votre vie privée est notre priorité absolue
                  </p>
                </ModernScrollReveal>
              </div>
            </div>
          </section>
        </ModernScrollReveal>

        {/* Introduction */}
        <ModernScrollReveal direction="up" duration={0.8}>
          <section className="py-16">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <Card className="border-0 shadow-card bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <Clock className="w-6 h-6 text-mylli-primary mr-3" />
                      <span className="text-sm text-mylli-gray">Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</span>
                    </div>
                    <p className="text-lg text-mylli-gray leading-relaxed">
                      Chez Mylli Services, nous nous engageons à protéger et respecter votre vie privée. 
                      Cette politique de confidentialité explique comment nous collectons, utilisons et 
                      protégeons vos informations personnelles conformément au Règlement Général sur la 
                      Protection des Données (RGPD) et aux lois marocaines en vigueur.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </ModernScrollReveal>

        {/* Main Sections */}
        <ModernScrollReveal direction="up" duration={1.0}>
          <section className="py-16">
            <div className="container-custom">
              <ModernScrollReveal direction="fade" delay={0.2}>
                <SectionHeading
                  title="Comment nous protégeons vos données"
                  subtitle="Découvrez nos pratiques en matière de confidentialité"
                  variant="modern"
                />
              </ModernScrollReveal>
              
              <StaggeredReveal 
                staggerDelay={0.2}
                className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
              >
                {sections.map((section, index) => (
                  <Card 
                    key={index} 
                    className="group hover:shadow-hover transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-br from-mylli-primary to-mylli-accent p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                          <section.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-mylli-dark mb-3 group-hover:text-mylli-primary transition-colors">
                            {section.title}
                          </h3>
                          <p className="text-mylli-gray leading-relaxed">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </StaggeredReveal>
            </div>
          </section>
        </ModernScrollReveal>

        {/* Your Rights Section */}
        <ModernScrollReveal direction="up" duration={1.0}>
          <section className="py-16 bg-gradient-to-r from-mylli-light/30 to-white/50">
            <div className="container-custom">
              <ModernScrollReveal direction="fade" delay={0.2}>
                <SectionHeading
                  title="Vos droits"
                  subtitle="Vous disposez de droits concernant vos données personnelles"
                  variant="gradient"
                />
              </ModernScrollReveal>
              
              <ModernScrollReveal direction="up" delay={0.4}>
                <div className="max-w-4xl mx-auto">
                  <Card className="border-0 shadow-card bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <StaggeredReveal staggerDelay={0.1} className="grid gap-4">
                        {rights.map((right, index) => (
                          <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-mylli-light/20 hover:bg-mylli-light/30 transition-colors">
                            <UserCheck className="w-5 h-5 text-mylli-primary flex-shrink-0" />
                            <span className="text-mylli-dark font-medium">{right}</span>
                          </div>
                        ))}
                      </StaggeredReveal>
                    </CardContent>
                  </Card>
                </div>
              </ModernScrollReveal>
            </div>
          </section>
        </ModernScrollReveal>

        {/* Cookies Section */}
        <ModernScrollReveal direction="up" duration={1.0}>
          <section className="py-16">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <Card className="border-0 shadow-card bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <ModernScrollReveal direction="left" delay={0.2}>
                      <h2 className="text-2xl font-bold text-mylli-dark mb-6 flex items-center">
                        <Shield className="w-6 h-6 text-mylli-primary mr-3" />
                        Utilisation des cookies
                      </h2>
                    </ModernScrollReveal>
                    <StaggeredReveal staggerDelay={0.1} className="space-y-4 text-mylli-gray">
                      <p>
                        Notre site web utilise des cookies pour améliorer votre expérience de navigation. 
                        Les cookies sont de petits fichiers texte stockés sur votre appareil.
                      </p>
                      <p>
                        <strong>Types de cookies utilisés :</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Cookies techniques : nécessaires au fonctionnement du site</li>
                        <li>Cookies analytiques : pour comprendre l'utilisation du site</li>
                        <li>Cookies de préférences : pour mémoriser vos choix</li>
                      </ul>
                      <p>
                        Vous pouvez gérer vos préférences de cookies à tout moment via le bouton 
                        "Gérer les cookies" présent sur notre site.
                      </p>
                    </StaggeredReveal>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </ModernScrollReveal>

        {/* Contact Section */}
        <ModernScrollReveal direction="up" duration={1.0}>
          <section className="py-16 bg-gradient-to-r from-mylli-primary/5 to-mylli-accent/5">
            <div className="container-custom">
              <ModernScrollReveal direction="fade" delay={0.2}>
                <SectionHeading
                  title="Nous contacter"
                  subtitle="Pour toute question concernant cette politique de confidentialité"
                  variant="underline"
                />
              </ModernScrollReveal>
              
              <ModernScrollReveal direction="scale" delay={0.4}>
                <div className="max-w-2xl mx-auto">
                  <Card className="border-0 shadow-card bg-white/90 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <StaggeredReveal staggerDelay={0.2} className="space-y-6">
                        <div className="flex items-center justify-center space-x-4">
                          <Mail className="w-6 h-6 text-mylli-primary" />
                          <a 
                            href="mailto:info@mylliservices.com" 
                            className="text-lg text-mylli-primary hover:text-mylli-secondary transition-colors font-medium"
                          >
                            info@mylliservices.com
                          </a>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                          <Phone className="w-6 h-6 text-mylli-primary" />
                          <a 
                            href="tel:+212661377438" 
                            className="text-lg text-mylli-primary hover:text-mylli-secondary transition-colors font-medium"
                          >
                            +212 661 37 74 38
                          </a>
                        </div>
                        <p className="text-mylli-gray">
                          Notre équipe vous répondra dans les plus brefs délais pour toute 
                          question relative à la protection de vos données personnelles.
                        </p>
                      </StaggeredReveal>
                    </CardContent>
                  </Card>
                </div>
              </ModernScrollReveal>
            </div>
          </section>
        </ModernScrollReveal>
      </div>
    </>
  );
};

export default PolitiqueConfidentialite;
