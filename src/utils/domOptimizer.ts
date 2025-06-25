
// DOM optimization utilities for better performance

export const optimizeDOM = () => {
  // Safely optimize DOM elements with null checks
  try {
    // Remove unnecessary whitespace nodes
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          return node.textContent?.trim() === '' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );

    const emptyNodes: Node[] = [];
    let node;
    while (node = walker.nextNode()) {
      emptyNodes.push(node);
    }

    emptyNodes.forEach(node => {
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    });

    // Optimize images with loading="lazy" - safely check for existence
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      if (img && img.setAttribute) {
        img.setAttribute('loading', 'lazy');
      }
    });

    // Add will-change hints for animations - with null checks
    const animatedElements = document.querySelectorAll('[class*="animate-"], [class*="transition-"]');
    animatedElements.forEach(element => {
      if (element && element.style && !element.style.willChange) {
        element.style.willChange = 'transform, opacity';
      }
    });

    console.log('✅ DOM optimized successfully');
  } catch (error) {
    console.warn('⚠️ DOM optimization failed:', error);
  }
};

export const reduceReflows = () => {
  try {
    // Batch DOM reads and writes to reduce reflows
    const elementsToOptimize = document.querySelectorAll('[data-optimize]');
    
    if (elementsToOptimize.length === 0) return;

    // Read phase
    const measurements: Array<{element: Element, rect: DOMRect}> = [];
    elementsToOptimize.forEach(element => {
      if (element && element.getBoundingClientRect) {
        measurements.push({
          element,
          rect: element.getBoundingClientRect()
        });
      }
    });

    // Write phase
    measurements.forEach(({ element, rect }) => {
      if (element && element.classList && rect.width > 0) {
        element.classList.add('optimized');
      }
    });

    console.log('✅ Reflows reduced successfully');
  } catch (error) {
    console.warn('⚠️ Reflow reduction failed:', error);
  }
};

// iOS-specific optimizations
export const optimizeForIOS = () => {
  try {
    // Prevent iOS scroll bounce
    document.body.style.overscrollBehavior = 'none';
    
    // Optimize touch events for iOS
    document.body.style.webkitTouchCallout = 'none';
    document.body.style.webkitUserSelect = 'none';
    
    // Fix iOS viewport issues
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    }

    console.log('✅ iOS optimizations applied');
  } catch (error) {
    console.warn('⚠️ iOS optimization failed:', error);
  }
};
