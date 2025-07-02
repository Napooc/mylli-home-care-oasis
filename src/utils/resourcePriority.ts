
// Critical resource prioritization system
export const preloadCriticalResources = () => {
  if (typeof document === 'undefined') return;

  // Preload critical hero image
  const heroImageLink = document.createElement('link');
  heroImageLink.rel = 'preload';
  heroImageLink.href = '/lovable-uploads/bc5d5201-c6c6-41c0-8594-5bef9171aea8.png';
  heroImageLink.as = 'image';
  heroImageLink.fetchPriority = 'high';
  document.head.appendChild(heroImageLink);

  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Inter:wght@700&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);

  // Preload logo
  const logoImg = document.createElement('link');
  logoImg.rel = 'preload';
  logoImg.href = '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png';
  logoImg.as = 'image';
  document.head.appendChild(logoImg);

  console.log('✅ Critical resources preloaded');
};

export const addResourceHints = () => {
  if (typeof document === 'undefined') return;

  // DNS prefetch for external domains
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  domains.forEach(domain => {
    if (!document.querySelector(`link[href="${domain}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });

  console.log('✅ Resource hints added');
};
