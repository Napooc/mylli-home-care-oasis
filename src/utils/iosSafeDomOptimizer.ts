
// iOS-safe DOM optimization utilities
export const iosSafeOptimizeDOM = () => {
  try {
    // Only perform safe DOM operations on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
      // Minimal optimizations for iOS to avoid conflicts
      console.log('🍎 Applying iOS-safe DOM optimizations...');
      
      // Simple cleanup of empty elements
      const emptyDivs = document.querySelectorAll('div:empty');
      emptyDivs.forEach(div => {
        if (div.parentElement && !div.id && div.classList.length === 0) {
          div.remove();
        }
      });
    } else {
      // Full optimizations for other platforms
      console.log('🖥️ Applying full DOM optimizations...');
      
      // Remove unnecessary wrapper divs
      const wrappers = document.querySelectorAll('div:only-child');
      wrappers.forEach(wrapper => {
        const parent = wrapper.parentElement;
        const child = wrapper.firstElementChild;
        if (parent && child && wrapper.classList.length === 0 && !wrapper.id) {
          parent.replaceChild(child, wrapper);
        }
      });
    }
  } catch (error) {
    console.log('DOM optimization skipped due to error:', error);
  }
};

export const iosSafeReduceReflows = () => {
  try {
    // Use requestAnimationFrame for smoother operations on iOS
    requestAnimationFrame(() => {
      const elementsToOptimize = document.querySelectorAll('[data-optimize]');
      
      elementsToOptimize.forEach(element => {
        const htmlElement = element as HTMLElement;
        if (htmlElement && htmlElement.style) {
          htmlElement.style.willChange = 'transform';
        }
      });
      
      // Reset will-change after optimization
      setTimeout(() => {
        elementsToOptimize.forEach(element => {
          const htmlElement = element as HTMLElement;
          if (htmlElement && htmlElement.style) {
            htmlElement.style.willChange = 'auto';
          }
        });
      }, 1000);
    });
  } catch (error) {
    console.log('Reflow optimization skipped due to error:', error);
  }
};
