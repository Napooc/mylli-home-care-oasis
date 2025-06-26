
// DOM optimization utilities - iOS Safe Version

export const optimizeDOM = () => {
  try {
    // iOS-safe DOM optimization
    console.log('🔧 Starting iOS-safe DOM optimization...');
    
    // Remove unnecessary wrapper divs with null checks
    const wrappers = document.querySelectorAll('div:only-child');
    wrappers.forEach(wrapper => {
      try {
        const parent = wrapper.parentElement;
        const child = wrapper.firstElementChild;
        
        if (parent && child && wrapper.classList && wrapper.classList.length === 0 && !wrapper.id) {
          parent.replaceChild(child, wrapper);
        }
      } catch (error) {
        console.warn('DOM wrapper optimization skipped for element:', error);
      }
    });

    // Optimize nested flexbox/grid containers with safety checks
    const containers = document.querySelectorAll('.flex, .grid');
    containers.forEach(container => {
      try {
        if (!container.classList) return;
        
        const children = Array.from(container.children);
        if (children.length === 1) {
          const child = children[0] as HTMLElement;
          if (child && child.classList && 
              (child.classList.contains('flex') || child.classList.contains('grid'))) {
            // Merge container styles if possible
            if (container.classList.length === 1 && child.classList.length > 1) {
              container.className = child.className;
              container.innerHTML = child.innerHTML;
            }
          }
        }
      } catch (error) {
        console.warn('Container optimization skipped for element:', error);
      }
    });
    
    console.log('✅ iOS-safe DOM optimization completed');
  } catch (error) {
    console.error('❌ DOM optimization failed:', error);
  }
};

export const virtualizeContent = (containerSelector: string, itemHeight: number) => {
  try {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const items = Array.from(container.children);
    const viewportHeight = window.innerHeight;
    const visibleItems = Math.ceil(viewportHeight / itemHeight) + 2; // Buffer

    let scrollTop = 0;
    const updateVisibleItems = () => {
      try {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.min(startIndex + visibleItems, items.length);

        items.forEach((item, index) => {
          try {
            const element = item as HTMLElement;
            if (element && element.style) {
              if (index >= startIndex && index < endIndex) {
                element.style.display = '';
                element.style.transform = `translateY(${index * itemHeight}px)`;
              } else {
                element.style.display = 'none';
              }
            }
          } catch (error) {
            console.warn('Virtualization update skipped for item:', error);
          }
        });
      } catch (error) {
        console.warn('Virtualization update failed:', error);
      }
    };

    container.addEventListener('scroll', () => {
      scrollTop = container.scrollTop;
      requestAnimationFrame(updateVisibleItems);
    });

    updateVisibleItems();
  } catch (error) {
    console.error('Content virtualization failed:', error);
  }
};

export const reduceReflows = () => {
  try {
    // iOS-safe reflow reduction
    console.log('🔧 Starting iOS-safe reflow reduction...');
    
    // Batch DOM operations with safety checks
    const elementsToStyle = document.querySelectorAll('[data-batch-style]');
    
    if (elementsToStyle.length === 0) {
      console.log('ℹ️ No elements found for batch styling');
      return;
    }
    
    const fragment = document.createDocumentFragment();
    
    elementsToStyle.forEach(element => {
      try {
        if (element && element.parentNode) {
          fragment.appendChild(element);
        }
      } catch (error) {
        console.warn('Element batching skipped:', error);
      }
    });
    
    // Apply all styles at once with error handling
    requestAnimationFrame(() => {
      try {
        if (fragment.hasChildNodes()) {
          document.body.appendChild(fragment);
        }
      } catch (error) {
        console.warn('Batch DOM operation failed:', error);
      }
    });
    
    console.log('✅ iOS-safe reflow reduction completed');
  } catch (error) {
    console.error('❌ Reflow reduction failed:', error);
  }
};
