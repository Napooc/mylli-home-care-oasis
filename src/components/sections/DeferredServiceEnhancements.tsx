import React, { useEffect, useState } from 'react';

const DeferredServiceEnhancements: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load service enhancements after critical content
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) return null;

  return (
    <>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-green-100/25 to-blue-100/15 rounded-full blur-2xl animate-pulse"></div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300/40 rounded-full animate-ping"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-300/50 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-green-300/30 rounded-full animate-bounce"></div>
    </>
  );
};

export default DeferredServiceEnhancements;