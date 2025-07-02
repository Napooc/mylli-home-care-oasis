
// Critical resource prioritization system
export const preloadCriticalResources = () => {
  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Inter:wght@700&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);

  // Preload critical images
  const logoImg = document.createElement('link');
  logoImg.rel = 'preload';
  logoImg.href = '/lovable-uploads/554676d0-4988-4b83-864c-15c32ee349a2.png';
  logoImg.as = 'image';
  document.head.appendChild(logoImg);
};

export const addResourceHints = () => {
  // DNS prefetch for external resources
  const dnsHints = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  dnsHints.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });

  // Preconnect to critical domains
  const preconnectHints = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  preconnectHints.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};
