
import React from 'react';
import MobileOptimizedImage from '../images/MobileOptimizedImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = (props) => {
  return <MobileOptimizedImage {...props} />;
};

export default OptimizedImage;
