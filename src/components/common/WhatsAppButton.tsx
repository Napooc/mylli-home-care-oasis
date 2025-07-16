import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = '212661377438'; // Your phone number without spaces or special characters
    const message = encodeURIComponent('Bonjour! Je souhaite obtenir plus d\'informations sur vos services d\'aide à domicile.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 transition-all duration-500">
      <div className="relative whatsapp-float">
        {/* Pulse animation background */}
        <div className="absolute inset-0 bg-green-500 rounded-full whatsapp-pulse"></div>
        
        {/* Main button */}
        <button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="whatsapp-button relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 rounded-full shadow-2xl backdrop-blur-sm border border-white/30 transition-all duration-300 transform hover:scale-110 active:scale-95 group whatsapp-shimmer"
          aria-label="Contactez-nous sur WhatsApp"
        >
          {/* ... keep existing code (glassmorphism overlay, icon, notification dot) */}
          <div className="absolute inset-0 bg-white/20 rounded-full backdrop-blur-md"></div>
          
          <MessageCircle 
            size={28} 
            className="text-white z-10 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" 
          />
          
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full animate-bounce shadow-lg border-2 border-white">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-40"></div>
          </div>
        </button>

        {/* Enhanced Tooltip */}
        <div className={`absolute right-20 bottom-1/2 transform translate-y-1/2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-4 scale-95 pointer-events-none'
        }`}>
          <div className="bg-gray-900/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 whitespace-nowrap relative">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div>
                <div className="text-sm font-semibold">Discutez avec nous</div>
                <div className="text-xs opacity-80">Réponse rapide sur WhatsApp</div>
              </div>
            </div>
            
            {/* Enhanced Arrow */}
            <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2">
              <div className="w-0 h-0 border-l-8 border-l-gray-900/95 border-t-6 border-t-transparent border-b-6 border-b-transparent"></div>
            </div>
          </div>
        </div>

        {/* Click ripple effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-white/30 rounded-full transform scale-0 group-active:scale-150 transition-transform duration-300"></div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppButton;
