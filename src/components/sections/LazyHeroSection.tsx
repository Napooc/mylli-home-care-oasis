
import React, { Suspense } from 'react';
import InstantHero from '../hero/InstantHero';

const DeferredEnhancements = React.lazy(() => import('../hero/DeferredEnhancements'));

const LazyHeroSection: React.FC = () => {
  return (
    <div className="relative">
      <InstantHero />
      <Suspense fallback={null}>
        <DeferredEnhancements />
      </Suspense>
    </div>
  );
};

export default LazyHeroSection;
