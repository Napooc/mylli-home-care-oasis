
import React, { Suspense } from 'react';
import LightweightHero from './LightweightHero';

// Lazy load the deferred animations
const DeferredAnimations = React.lazy(() => import('./DeferredAnimations'));

const EnhancedHero: React.FC = () => {
  return (
    <div className="relative">
      {/* Critical hero content loads immediately */}
      <LightweightHero />
      
      {/* Enhanced animations load after initial render */}
      <Suspense fallback={null}>
        <DeferredAnimations />
      </Suspense>
    </div>
  );
};

export default EnhancedHero;
