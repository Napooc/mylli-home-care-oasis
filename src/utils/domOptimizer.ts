
// DOM optimization utilities

export const optimizeDOM = () => {
  // Remove unnecessary wrapper divs
  const wrappers = document.querySelectorAll('div:only-child');
  wrappers.forEach(wrapper => {
    const parent = wrapper.parentElement;
    const child = wrapper.firstElementChild;
    if (parent && child && wrapper.classList.length === 0 && !wrapper.id) {
      parent.replaceChild(child, wrapper);
    }
  });

  // Optimize nested flexbox/grid containers
  const containers = document.querySelectorAll('.flex, .grid');
  containers.forEach(container => {
    const children = Array.from(container.children);
    if (children.length === 1 && children[0].classList.contains('flex') || children[0].classList.contains('grid')) {
      // Merge container styles if possible
      const child = children[0] as HTMLElement;
      if (container.classList.length === 1 && child.classList.length > 1) {
        container.className = child.className;
        container.innerHTML = child.innerHTML;
      }
    }
  });
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
      if (index >= startIndex && index < endIndex) {
        element.style.display = '';
        element.style.transform = `translateY(${index * itemHeight}px)`;
      } else {
        element.style.display = 'none';
      }
    });
  };

  container.addEventListener('scroll', () => {
    scrollTop = container.scrollTop;
    requestAnimationFrame(updateVisibleItems);
  });

  updateVisibleItems();
};

export const reduceReflows = () => {
  // Batch DOM operations
  const elementsToStyle = document.querySelectorAll('[data-batch-style]');
  const fragment = document.createDocumentFragment();
  
  elementsToStyle.forEach(element => {
    fragment.appendChild(element);
  });
  
  // Apply all styles at once
  requestAnimationFrame(() => {
    document.body.appendChild(fragment);
  });
};
