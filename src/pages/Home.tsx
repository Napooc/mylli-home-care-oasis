
import React from 'react';
import { Helmet } from 'react-helmet-async';
import OptimizedHomePage from '../components/home/OptimizedHomePage';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Mylli Services - N°1 des Soins à Domicile Casablanca</title>
        <meta 
          name="description" 
          content="Services de soins à domicile à Casablanca. Infirmiers diplômés, aides-soignants certifiés, garde malade 24h/24. N°1 depuis 2014. Urgence: +212 661 37 74 38" 
        />
        <meta 
          name="keywords" 
          content="soins domicile casablanca, infirmier domicile, aide soignant, garde malade, mylli services" 
        />
        <link rel="canonical" href="https://mylliservices.com/" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Mylli Services - N°1 des Soins à Domicile Casablanca" />
        <meta property="og:description" content="Services de soins à domicile à Casablanca. Infirmiers diplômés, aides-soignants certifiés, garde malade 24h/24." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mylliservices.com/" />
        <meta property="og:image" content="https://mylliservices.com/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mylli Services - N°1 des Soins à Domicile Casablanca" />
        <meta name="twitter:description" content="Services de soins à domicile à Casablanca. Infirmiers diplômés, aides-soignants certifiés, garde malade 24h/24." />
        <meta name="twitter:image" content="https://mylliservices.com/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png" />
        
        {/* Structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Mylli Services",
            "description": "Services de soins à domicile à Casablanca",
            "url": "https://mylliservices.com",
            "telephone": "+212661377438",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Casablanca",
              "addressCountry": "MA"
            },
            "openingHours": "Mo-Su 00:00-23:59",
            "medicalSpecialty": ["Nursing", "Home Care", "Patient Care"]
          })}
        </script>
      </Helmet>
      
      <OptimizedHomePage />
    </>
  );
};

export default Home;
