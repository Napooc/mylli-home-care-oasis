
// iOS-specific compatibility fixes
export const iosCompatibilityInit = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    console.log('🍎 Applying iOS compatibility fixes...');
    
    // Fix iOS viewport scaling issues
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    }
    
    // Fix iOS Safari 100vh issue
    const updateVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    updateVH();
    window.addEventListener('resize', updateVH);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateVH, 100);
    });
    
    // Fix iOS touch events
    document.addEventListener('touchstart', () => {}, { passive: true });
    
    // Fix iOS scroll bounce
    document.body.style.overscrollBehavior = 'none';
    
    // Fix iOS keyboard issues
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        setTimeout(() => {
          if (document.activeElement === input) {
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      });
    });
  }
};

export const iosPerformanceOptimization = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    // Reduce animation complexity on iOS
    const reduceAnimations = () => {
      const style = document.createElement('style');
      style.textContent = `
        @media (prefers-reduced-motion: no-preference) {
          .animate-float { animation-duration: 4s !important; }
          .animate-pulse-soft { animation-duration: 4s !important; }
          .animate-bounce-subtle { animation-duration: 3s !important; }
        }
      `;
      document.head.appendChild(style);
    };
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', reduceAnimations);
    } else {
      reduceAnimations();
    }
  }
};
