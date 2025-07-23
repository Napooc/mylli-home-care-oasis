import React, { ReactNode, Children } from 'react';
import UltraModernScrollReveal from './UltraModernScrollReveal';

interface UltraStaggeredRevealProps {
  children: ReactNode;
  staggerDelay?: number;
  variant?: 'elastic' | 'magnetic' | 'morphing' | 'cascade' | 'wave' | 'quantum' | 'spiral';
  intensity?: 'subtle' | 'medium' | 'strong' | 'extreme';
  className?: string;
  pattern?: 'sequential' | 'wave' | 'center-out' | 'random' | 'spiral';
  duration?: number;
}

const UltraStaggeredReveal: React.FC<UltraStaggeredRevealProps> = ({
  children,
  staggerDelay = 0.15,
  variant = 'elastic',
  intensity = 'medium',
  className = '',
  pattern = 'sequential',
  duration = 1.2,
}) => {
  const childrenArray = Children.toArray(children);

  const getDelayForIndex = (index: number, total: number) => {
    switch (pattern) {
      case 'wave':
        return Math.sin((index / total) * Math.PI) * staggerDelay * 2;
      case 'center-out':
        const center = Math.floor(total / 2);
        return Math.abs(index - center) * staggerDelay;
      case 'random':
        return Math.random() * staggerDelay * total * 0.5;
      case 'spiral':
        return (index * staggerDelay) + (Math.sin(index * 0.5) * staggerDelay);
      case 'sequential':
      default:
        return index * staggerDelay;
    }
  };

  const getVariantForIndex = (index: number) => {
    if (pattern === 'wave') {
      const variants: Array<typeof variant> = ['elastic', 'magnetic', 'morphing', 'cascade'];
      return variants[index % variants.length];
    }
    return variant;
  };

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <UltraModernScrollReveal
          key={index}
          variant={getVariantForIndex(index)}
          intensity={intensity}
          delay={getDelayForIndex(index, childrenArray.length)}
          duration={duration}
        >
          {child}
        </UltraModernScrollReveal>
      ))}
    </div>
  );
};

export default UltraStaggeredReveal;