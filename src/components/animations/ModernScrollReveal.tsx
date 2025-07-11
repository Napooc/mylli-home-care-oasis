
import React, { ReactNode } from 'react';
import { useModernScroll } from '@/hooks/useModernScroll';

interface ModernScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const ModernScrollReveal: React.FC<ModernScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  threshold = 0.1,
}) => {
  const { ref, isVisible } = useModernScroll({ 
    threshold, 
    stagger: delay * 1000,
    triggerOnce: true 
  });

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return 'translateY(60px)';
        case 'down':
          return 'translateY(-60px)';
        case 'left':
          return 'translateX(60px)';
        case 'right':
          return 'translateX(-60px)';
        case 'scale':
          return 'scale(0.8)';
        default:
          return 'translateY(60px)';
      }
    }
    return 'translateY(0) translateX(0) scale(1)';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};

export default ModernScrollReveal;
