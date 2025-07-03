import React, { useEffect, useState } from 'react';

const DeferredTestimonialEnhancements: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load testimonial enhancements after critical content
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) return null;

  return (
    <>
      {/* Subtle background animations */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-mylli-primary/10 to-mylli-secondary/5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-tl from-mylli-quaternary/10 to-mylli-accent/5 rounded-full blur-lg animate-pulse"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-1/5 w-4 h-4 bg-mylli-primary/20 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/3 right-1/5 w-3 h-3 bg-mylli-secondary/25 rounded-full animate-bounce"></div>
    </>
  );
};

export default DeferredTestimonialEnhancements;