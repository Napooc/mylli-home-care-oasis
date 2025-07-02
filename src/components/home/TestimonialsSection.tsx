import SectionHeading from '@/components/common/SectionHeading';
import TestimonialCard from '@/components/common/TestimonialCard';

const TestimonialsSection = () => {
  const testimonials = [{
    name: "HAYAT ABOUNAI",
    text: "Vous méritez plus que 5 étoiles merci infiniment et lah yrham lwalidine bonne continuation",
    rating: 5,
    service: "Service d'aide à domicile",
    avatar: "H",
    verified: true
  }, {
    name: "Mohammed Mohamed",
    text: "Mylli Service est Un organisme professionnel, une équipe à l'écoute qui respecte les normes d'hygiène et surtout humaine ! Je vous remercie beaucoup et je vous recommanderai avec plaisir !",
    rating: 5,
    service: "Soins infirmiers",
    avatar: "M",
    verified: true
  }, {
    name: "Amal LOUDIYI",
    text: "Merci à l'équipe qui a été très réactive et l'infirmier j'ai rien senti et très gentil. Je recommande !!!",
    rating: 5,
    service: "Soins infirmiers",
    avatar: "A",
    verified: true
  }, {
    name: "MOUHAJIR ABDELAZIZ",
    text: "Écoute. Professionnalisme. Empathie et efficacité. Bravo et merci à tout le staff de l'équipe. Services ayant bénéficié à plusieurs membres de ma famille. 👏👏",
    rating: 5,
    service: "Services multiples",
    avatar: "M",
    verified: true
  }];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-white via-mylli-light/20 to-white relative overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-16 left-12 w-28 h-28 border border-mylli-primary/15 rounded-full"></div>
        <div className="absolute bottom-24 right-20 w-36 h-36 border-2 border-mylli-secondary/10 rounded-lg rotate-45"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-mylli-quaternary/12 rounded-xl -rotate-12"></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 border-2 border-mylli-accent/8 rounded-full"></div>
        
        <div className="absolute top-24 right-1/3 w-5 h-5 bg-mylli-primary/15 rounded-full animate-pulse-soft"></div>
        <div className="absolute bottom-40 left-1/4 w-4 h-4 bg-mylli-secondary/20 animate-pulse-soft" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-2/3 right-16 w-6 h-6 bg-mylli-quaternary/15 rounded-full animate-pulse-soft" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <header className="text-center mb-12 md:mb-16">
          <SectionHeading 
            title="Ce que disent nos clients"
            variant="animated"
            highlightText="clients"
            className="mb-4"
            id="testimonials-heading"
          />
          <p className="text-lg md:text-xl text-mylli-gray max-w-3xl mx-auto leading-relaxed">
            Découvrez les témoignages de nos patients et de leurs familles sur la qualité de nos services
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="transform transition-all duration-500 hover:scale-[1.02]">
              <TestimonialCard 
                quote={testimonial.text}
                name={testimonial.name}
                title={testimonial.service}
                rating={testimonial.rating}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;