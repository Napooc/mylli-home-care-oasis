
import React, { useEffect, useState } from 'react';

const DeferredEnhancements: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Phase 2: Defer non-critical animations until after initial paint
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      // Batch animation updates using requestAnimationFrame
      requestAnimationFrame(() => {
        // Add scroll indicator animation
        const hero = document.querySelector('.hero-section');
        if (hero) {
          const scrollIndicator = document.createElement('div');
          scrollIndicator.className = 'absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center animate-fade-in';
          scrollIndicator.innerHTML = `
            <p class="text-sm text-white/80 mb-2">Découvrir</p>
            <div class="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center">
              <div class="w-1.5 h-1.5 rounded-full bg-white/80 mt-2 animate-bounce"></div>
            </div>
          `;
          hero.appendChild(scrollIndicator);
        }
      });
    }, 100); // Reduced from 500ms to 100ms for better UX

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Phase 2: Deferred background patterns with CSS transforms */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-mylli-primary/10 blur-3xl animate-pulse-soft"
        style={{ transform: 'translateZ(0)' }}
      ></div>
      <div 
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-mylli-secondary/10 blur-3xl animate-pulse-soft" 
        style={{ animationDelay: '1s', transform: 'translateZ(0)' }}
      ></div>
      <div 
        className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-mylli-quaternary/10 blur-2xl animate-pulse-soft" 
        style={{ animationDelay: '2s', transform: 'translateZ(0)' }}
      ></div>
      
      {/* Subtle pattern overlay with GPU acceleration */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwMDc3QzAxMCIgZD0iTTAgMGg2MHY2MEgweiIvPjxwYXRoIGQ9Ik0zNiAxOGgtMTJWMmgxMnYxMnptMCAxMmgtMTJWMThoMTJ2MTJ6bTAgMTJoLTEyVjMwaDEydjEyIiBmaWxsPSIjMDA5OUU4MTAiLz48L2c+PC9zdmc+')`,
          transform: 'translateZ(0)'
        }}
      ></div>
    </div>
  );
};

export default DeferredEnhancements;
