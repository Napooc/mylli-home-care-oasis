
import React from 'react';
import UltraFastImage from '../images/UltraFastImage';

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
  return <UltraFastImage {...props} />;
};

export default OptimizedImage;
