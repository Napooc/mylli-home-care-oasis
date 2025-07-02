
// Ultra-lightweight bundle analysis
export const analyzeBundleSize = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (entries.length > 0) {
      const entry = entries[0];
      console.log('📊 Bundle Performance:', {
        transferSize: entry.transferSize || 0,
        encodedBodySize: entry.encodedBodySize || 0,
        decodedBodySize: entry.decodedBodySize || 0,
        loadTime: entry.loadEventEnd - entry.loadEventStart
      });
    }
  }
};

export const preloadCriticalChunks = () => {
  const criticalChunks = [
    '/src/main.tsx',
    '/src/App.tsx'
  ];
  
  criticalChunks.forEach(chunk => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = chunk;
    document.head.appendChild(link);
  });
};
