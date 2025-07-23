import React, { ReactNode } from 'react';
import { useUltraModernScroll } from '@/hooks/useUltraModernScroll';

interface UltraModernScrollRevealProps {
  children: ReactNode;
  variant?: 'elastic' | 'magnetic' | 'morphing' | 'cascade' | 'wave' | 'quantum' | 'spiral';
  intensity?: 'subtle' | 'medium' | 'strong' | 'extreme';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  stagger?: boolean;
}

const UltraModernScrollReveal: React.FC<UltraModernScrollRevealProps> = ({
  children,
  variant = 'elastic',
  intensity = 'medium',
  delay = 0,
  duration = 1.2,
  className = '',
  threshold = 0.1,
  stagger = false,
}) => {
  const { ref, isVisible, progress } = useUltraModernScroll({ 
    threshold, 
    delay: delay * 1000,
    triggerOnce: true 
  });

  const getAnimationStyle = () => {
    const intensityMap = {
      subtle: { scale: 0.95, distance: 30, rotation: 2 },
      medium: { scale: 0.85, distance: 60, rotation: 5 },
      strong: { scale: 0.7, distance: 100, rotation: 8 },
      extreme: { scale: 0.5, distance: 150, rotation: 15 }
    };

    const config = intensityMap[intensity];
    
    if (!isVisible) {
      switch (variant) {
        case 'elastic':
          return {
            opacity: 0,
            transform: `translateY(${config.distance}px) scale(${config.scale}) rotateX(10deg)`,
            filter: 'blur(10px)',
          };
        case 'magnetic':
          return {
            opacity: 0,
            transform: `translateY(${config.distance}px) translateX(-${config.distance/2}px) scale(${config.scale}) rotateZ(${config.rotation}deg)`,
            filter: 'blur(8px) saturate(0.3)',
          };
        case 'morphing':
          return {
            opacity: 0,
            transform: `scale(${config.scale}) rotateY(${config.rotation * 2}deg) skewX(${config.rotation}deg)`,
            filter: 'blur(12px) hue-rotate(180deg)',
          };
        case 'cascade':
          return {
            opacity: 0,
            transform: `translateY(${config.distance}px) translateX(${config.distance/3}px) scale(${config.scale})`,
            filter: 'blur(6px)',
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
          };
        case 'wave':
          return {
            opacity: 0,
            transform: `translateY(${config.distance}px) scale(${config.scale}) rotateX(15deg) rotateY(5deg)`,
            filter: 'blur(8px)',
            borderRadius: '50% 20% 80% 30%',
          };
        case 'quantum':
          return {
            opacity: 0,
            transform: `translateY(${config.distance}px) scale(${config.scale}) rotateZ(${config.rotation * 3}deg)`,
            filter: 'blur(15px) contrast(0.5) brightness(1.5)',
            backdropFilter: 'blur(10px)',
          };
        case 'spiral':
          return {
            opacity: 0,
            transform: `translateY(${config.distance}px) scale(${config.scale}) rotateZ(${config.rotation * 4}deg) rotateX(${config.rotation}deg)`,
            filter: 'blur(10px) sepia(0.3)',
          };
        default:
          return {
            opacity: 0,
            transform: `translateY(${config.distance}px) scale(${config.scale})`,
          };
      }
    }

    return {
      opacity: 1,
      transform: 'translateY(0) translateX(0) scale(1) rotateX(0) rotateY(0) rotateZ(0) skewX(0)',
      filter: 'blur(0px) saturate(1) hue-rotate(0deg) contrast(1) brightness(1) sepia(0)',
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      borderRadius: 'initial',
      backdropFilter: 'none',
    };
  };

  const getTransition = () => {
    const easingMap = {
      elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      magnetic: 'cubic-bezier(0.23, 1, 0.32, 1)',
      morphing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      cascade: 'cubic-bezier(0.77, 0, 0.175, 1)',
      wave: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      quantum: 'cubic-bezier(0.19, 1, 0.22, 1)',
      spiral: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    };

    const easing = easingMap[variant];
    return `all ${duration}s ${easing}`;
  };

  const dynamicStyle = React.useMemo(() => ({
    ...getAnimationStyle(),
    transition: getTransition(),
    willChange: 'transform, opacity, filter, clip-path, border-radius, backdrop-filter',
    backfaceVisibility: 'hidden' as const,
    perspective: '1000px',
  }), [isVisible, variant, intensity, duration]);

  return (
    <div
      ref={ref}
      className={className}
      style={dynamicStyle}
    >
      {children}
    </div>
  );
};

export default UltraModernScrollReveal;