
import React, { ReactNode, Children } from 'react';
import ModernScrollReveal from './ModernScrollReveal';

interface StaggeredRevealProps {
  children: ReactNode;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  className?: string;
}

const StaggeredReveal: React.FC<StaggeredRevealProps> = ({
  children,
  staggerDelay = 0.1,
  direction = 'up',
  className = '',
}) => {
  const childrenArray = Children.toArray(children);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <ModernScrollReveal
          key={index}
          direction={direction}
          delay={index * staggerDelay}
          duration={0.8}
        >
          {child}
        </ModernScrollReveal>
      ))}
    </div>
  );
};

export default StaggeredReveal;
