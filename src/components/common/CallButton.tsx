
import React, { useState } from 'react';
import { Phone } from 'lucide-react';

const CallButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCallClick = () => {
    window.location.href = 'tel:+212661377438';
  };

  return (
    <div className="fixed bottom-14 right-4 md:bottom-16 md:right-6 z-50 transition-all duration-500">
      <div className="relative call-float">
        {/* Pulse animation background */}
        <div className="absolute inset-0 bg-blue-500 rounded-full call-pulse"></div>
        
        {/* Main button */}
        <button
          onClick={handleCallClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="call-button relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 rounded-full shadow-2xl backdrop-blur-sm border border-white/30 transition-all duration-300 transform hover:scale-110 active:scale-95 group call-shimmer"
          aria-label="Appeler maintenant"
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-white/20 rounded-full backdrop-blur-md"></div>
          
          {/* Icon */}
          <Phone 
            size={24} 
            className="text-white z-10 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" 
          />
          
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full animate-bounce shadow-lg border-2 border-white">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-40"></div>
          </div>
        </button>

        {/* Enhanced Tooltip */}
        <div className={`absolute right-16 bottom-1/2 transform translate-y-1/2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-4 scale-95 pointer-events-none'
        }`}>
          <div className="bg-gray-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/20 whitespace-nowrap relative">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div>
                <div className="text-sm font-semibold">Appelez-nous</div>
                <div className="text-xs opacity-80">+212 661 37 74 38</div>
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

export default CallButton;
