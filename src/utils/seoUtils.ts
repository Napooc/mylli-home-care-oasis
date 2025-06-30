
import { preloadCriticalResources } from './resourceCache';
import { fontOptimizer } from './fontOptimization';

// SEO utility functions

export const generateSitemap = (routes: string[]) => {
  const baseUrl = 'https://mylliservices.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  return sitemap;
};

export const optimizeTitle = (title: string, maxLength = 60) => {
  if (title.length <= maxLength) return title;
  return title.substring(0, maxLength - 3) + '...';
};

export const optimizeDescription = (description: string, maxLength = 160) => {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + '...';
};

export const generateKeywords = (primary: string[], secondary: string[] = []) => {
  return [...primary, ...secondary].join(', ');
};

// Enhanced Core Web Vitals optimization
export const preloadCriticalResourcesOptimized = async () => {
  // Initialize font optimization first (critical for LCP)
  await fontOptimizer.initialize();
  
  // Preload critical resources with our new system
  await preloadCriticalResources();
  
  console.log('✅ Critical resources preloaded with optimization');
};

export const measureCoreWebVitals = () => {
  // Enhanced performance monitoring
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log(`LCP: ${entry.startTime}ms`);
        }
        if (entry.entryType === 'first-input') {
          console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
        }
        if (entry.entryType === 'layout-shift') {
          console.log(`CLS: ${entry.value}`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  }
};
