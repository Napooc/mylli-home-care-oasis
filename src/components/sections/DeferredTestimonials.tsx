import React, { useEffect, useState } from 'react';
import TestimonialCard from '@/components/common/TestimonialCard';

const DeferredTestimonials: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) return null;

  const testimonials = [{
    name: "HAYAT ABOUNAI",
    quote: "Vous méritez plus que 5 étoiles merci infiniment et lah yrham lwalidine bonne continuation",
    title: "Service d'aide à domicile",
    rating: 5
  }, {
    name: "Mohammed Mohamed",
    quote: "Mylli Service est Un organisme professionnel, une équipe à l'écoute qui respecte les normes d'hygiène et surtout humaine ! Je vous remercie beaucoup et je vous recommanderai avec plaisir !",
    title: "Soins infirmiers",
    rating: 5
  }, {
    name: "Amal LOUDIYI",
    quote: "Merci à l'équipe qui a été très réactive et l'infirmier j'ai rien senti et très gentil. Je recommande !!!",
    title: "Soins infirmiers",
    rating: 5
  }, {
    name: "MOUHAJIR ABDELAZIZ",
    quote: "Écoute. Professionnalisme. Empathie et efficacité. Bravo et merci à tout le staff de l'équipe. Services ayant bénéficié à plusieurs membres de ma famille. 👏👏",
    title: "Services multiples",
    rating: 5
  }];

  return (
    <div className="absolute inset-0 grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mt-16 fade-in-fast">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} {...testimonial} />
      ))}
    </div>
  );
};

export default DeferredTestimonials;