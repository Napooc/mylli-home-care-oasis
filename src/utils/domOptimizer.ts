// DOM optimization utilities - iOS compatible

export const optimizeDOM = () => {
  // iOS-safe DOM optimization
  try {
    // Remove unnecessary wrapper divs - with iOS safety checks
    const wrappers = document.querySelectorAll('div:only-child');
    wrappers.forEach(wrapper => {
      // Type safety for iOS
      if (wrapper && wrapper.parentElement && wrapper.firstElementChild) {
        const parent = wrapper.parentElement;
        const child = wrapper.firstElementChild;
        
        // Additional iOS safety checks
        if (parent && child && wrapper.classList && wrapper.classList.length === 0 && !wrapper.id) {
          try {
            parent.replaceChild(child, wrapper);
          } catch (error) {
            console.warn('iOS DOM optimization skipped for wrapper:', error);
          }
        }
      }
    });

    // Optimize nested flexbox/grid containers - iOS safe
    const containers = document.querySelectorAll('.flex, .grid');
    containers.forEach(container => {
      if (container && container.children) {
        const children = Array.from(container.children);
        if (children.length === 1 && children[0]) {
          const child = children[0] as HTMLElement;
          if (child.classList && (child.classList.contains('flex') || child.classList.contains('grid'))) {
            // Merge container styles if possible - iOS safe
            if (container.classList && container.classList.length === 1 && child.classList.length > 1) {
              try {
                container.className = child.className;
                container.innerHTML = child.innerHTML;
              } catch (error) {
                console.warn('iOS DOM optimization skipped for container:', error);
              }
            }
          }
        }
      }
    });
  } catch (error) {
    console.warn('iOS DOM optimization failed:', error);
  }
};

export const virtualizeContent = (containerSelector: string, itemHeight: number) => {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const items = Array.from(container.children);
  const viewportHeight = window.innerHeight;
  const visibleItems = Math.ceil(viewportHeight / itemHeight) + 2; // Buffer

  let scrollTop = 0;
  const updateVisibleItems = () => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(startIndex + visibleItems, items.length);

    items.forEach((item, index) => {
      const element = item as HTMLElement;
      if (element) {
        if (index >= startIndex && index < endIndex) {
          element.style.display = '';
          element.style.transform = `translateY(${index * itemHeight}px)`;
          // iOS optimization
          element.style.webkitTransform = `translateY(${index * itemHeight}px)`;
        } else {
          element.style.display = 'none';
        }
      }
    });
  };

  // iOS-optimized scroll handling
  const handleScroll = () => {
    scrollTop = container.scrollTop;
    if (window.requestAnimationFrame) {
      requestAnimationFrame(updateVisibleItems);
    } else {
      updateVisibleItems();
    }
  };

  container.addEventListener('scroll', handleScroll, { passive: true });
  updateVisibleItems();
};

export const reduceReflows = () => {
  // iOS-safe batch DOM operations
  try {
    const elementsToStyle = document.querySelectorAll('[data-batch-style]');
    if (elementsToStyle.length === 0) return;
    
    const fragment = document.createDocumentFragment();
    
    elementsToStyle.forEach(element => {
      if (element && element.parentNode) {
        fragment.appendChild(element);
      }
    });
    
    // Apply all styles at once - iOS optimized
    if (window.requestAnimationFrame) {
      requestAnimationFrame(() => {
        if (document.body) {
          document.body.appendChild(fragment);
        }
      });
    } else {
      if (document.body) {
        document.body.appendChild(fragment);
      }
    }
  } catch (error) {
    console.warn('iOS reflow optimization failed:', error);
  }
};

// iOS-specific DOM helpers
export const iosOptimizeElement = (element: HTMLElement) => {
  if (!element) return;
  
  // Add iOS-specific optimizations
  element.style.webkitTransform = element.style.webkitTransform || 'translateZ(0)';
  element.style.webkitBackfaceVisibility = 'hidden';
  element.style.webkitPerspective = '1000px';
  
  // Optimize for touch - Fix TypeScript errors with bracket notation
  (element.style as any).webkitTapHighlightColor = 'transparent';
  (element.style as any).webkitTouchCallout = 'none';
};

export const iosOptimizeAnimations = () => {
  const animatedElements = document.querySelectorAll('[class*="animate"], .transition, [class*="transition"]');
  animatedElements.forEach(element => {
    if (element instanceof HTMLElement) {
      iosOptimizeElement(element);
    }
  });
};
