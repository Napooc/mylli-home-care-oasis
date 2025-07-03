
import React, { useState, useRef, useEffect } from 'react';
import { mobileImageOptimizer } from '@/utils/mobileImageOptimizer';

interface MobileLazySectionProps {
  children: React.ReactNode;
  className?: string;
  priority?: boolean;
  fallback?: React.ReactNode;
}

const MobileLazySection: React.FC<MobileLazySectionProps> = ({
  children,
  className = '',
  priority = false,
  fallback = null
}) => {
  const [isVisible, setIsVisible] = useState(priority);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const config = mobileImageOptimizer.getMobileIntersectionConfig();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      config
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div ref={sectionRef} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
};

export default MobileLazySection;
