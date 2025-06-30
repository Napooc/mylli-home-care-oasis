
import { preloadCriticalImages, optimizeImageUrl } from './imageOptimization';

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

// Core Web Vitals optimization helpers
export const preloadCriticalResources = () => {
  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);
  
  // Use the new image optimization system
  preloadCriticalImages();
};

export const measureCoreWebVitals = () => {
  // This would integrate with web-vitals library in a real implementation
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log(`Core Web Vital: ${entry.name}`, entry);
      });
    });
    
    observer.observe({ entryTypes: ['measure', 'paint', 'largest-contentful-paint'] });
  }
};
