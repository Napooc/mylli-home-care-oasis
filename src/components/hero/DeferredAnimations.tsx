
import React, { useEffect, useState } from 'react';

const DeferredAnimations: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Defer heavy animations until after initial render
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) return null;

  return (
    <>
      {/* Floating elements - loaded after critical content */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float blur-sm"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-blue-300/20 rounded-full animate-pulse-soft"></div>
      <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-white/5 rounded-full animate-bounce-subtle"></div>
      
      {/* Gradient overlays - enhanced after initial load */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-blue-600/20 animate-pulse-soft"></div>
      
      {/* Particle effects - purely decorative */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-200/50 rounded-full animate-pulse"></div>
    </>
  );
};

export default DeferredAnimations;
