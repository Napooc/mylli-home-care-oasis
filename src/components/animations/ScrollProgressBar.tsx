
import React from 'react';
import { useScrollProgress } from '@/hooks/useModernScroll';

const ScrollProgressBar: React.FC = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/20 z-50 backdrop-blur-sm">
      <div
        className="h-full bg-gradient-to-r from-mylli-primary to-mylli-secondary transition-all duration-300 ease-out"
        style={{
          width: `${scrollProgress}%`,
          boxShadow: '0 0 10px rgba(0, 123, 192, 0.3)',
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;
