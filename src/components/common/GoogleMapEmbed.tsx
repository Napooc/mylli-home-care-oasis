
import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface GoogleMapEmbedProps {
  address: string;
  className?: string;
}

const GoogleMapEmbed = ({ address, className = '' }: GoogleMapEmbedProps) => {
  // Encode the address for the URL
  const encodedAddress = encodeURIComponent(address);
  
  // Use Google Maps embed without API key (more secure)
  const mapUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed&z=16`;
  
  // Fallback: Direct Google Maps link
  const directMapUrl = `https://www.google.com/maps/search/${encodedAddress}`;
  
  return (
    <div className={`w-full h-full overflow-hidden rounded-3xl shadow-2xl ${className}`}>
      <div className="relative w-full h-full">
        <iframe
          title="Google Maps Location"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={mapUrl}
          className="w-full h-full"
          onError={() => {
            // Fallback to static map view if embed fails
            window.open(directMapUrl, '_blank');
          }}
        />
        
        {/* Overlay with direct link option */}
        <div className="absolute top-4 right-4 z-10">
          <a
            href={directMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-lg shadow-lg hover:bg-white transition-colors text-sm font-medium"
            aria-label="Ouvrir dans Google Maps"
          >
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">Ouvrir dans Maps</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapEmbed;
