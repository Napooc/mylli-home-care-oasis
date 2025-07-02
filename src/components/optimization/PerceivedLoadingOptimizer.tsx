import React, { useState, useEffect } from 'react';

interface LoadingState {
  isLoading: boolean;
  progress: number;
  stage: 'initial' | 'hero' | 'content' | 'complete';
  message: string;
}

const PerceiveedLoadingOptimizer: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    progress: 0,
    stage: 'initial',
    message: 'Initialisation...'
  });

  useEffect(() => {
    // Phase 4: Optimized loading sequence for perceived performance
    const loadingSequence = [
      { progress: 20, stage: 'initial' as const, message: 'Chargement des ressources critiques...', delay: 50 },
      { progress: 50, stage: 'hero' as const, message: 'Préparation de l\'interface...', delay: 100 },
      { progress: 80, stage: 'content' as const, message: 'Finalisation...', delay: 150 },
      { progress: 100, stage: 'complete' as const, message: 'Prêt !', delay: 200 }
    ];

    let currentStep = 0;
    
    const progressTimer = () => {
      if (currentStep < loadingSequence.length) {
        const step = loadingSequence[currentStep];
        
        setLoadingState(prev => ({
          ...prev,
          progress: step.progress,
          stage: step.stage,
          message: step.message
        }));

        currentStep++;
        setTimeout(progressTimer, step.delay);
      } else {
        // Complete loading
        setTimeout(() => {
          setLoadingState(prev => ({ ...prev, isLoading: false }));
        }, 300);
      }
    };

    // Start loading sequence
    progressTimer();

    // Monitor actual loading and adjust if needed
    const checkRealLoadingState = () => {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection && currentStep < loadingSequence.length - 1) {
        // Skip to final stages if hero is already loaded
        currentStep = loadingSequence.length - 1;
      }
    };

    const observer = new MutationObserver(checkRealLoadingState);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  if (!loadingState.isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-mylli-primary/95 to-mylli-secondary/95 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-6">
        {/* Optimized logo/brand */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
          <div className="w-16 h-16 rounded-full bg-white/40 animate-pulse"></div>
        </div>

        {/* Progress indicator */}
        <div className="space-y-4">
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-white to-white/80 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingState.progress}%` }}
            />
          </div>
          
          <div className="text-white/90 text-sm font-medium animate-pulse">
            {loadingState.message}
          </div>
          
          <div className="text-white/60 text-xs">
            {loadingState.progress}% terminé
          </div>
        </div>

        {/* Stage indicators */}
        <div className="flex justify-center space-x-3">
          {(['initial', 'hero', 'content', 'complete'] as const).map((stage, index) => (
            <div
              key={stage}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                loadingState.stage === stage
                  ? 'bg-white scale-125'
                  : index <= (['initial', 'hero', 'content', 'complete'] as const).indexOf(loadingState.stage)
                  ? 'bg-white/60'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerceiveedLoadingOptimizer;