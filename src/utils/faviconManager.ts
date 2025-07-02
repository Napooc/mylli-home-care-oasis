
// Simplified favicon management for better performance
interface FaviconConfig {
  href: string;
  type: string;
  sizes?: string;
}

const FAVICON_CONFIGS: FaviconConfig[] = [
  { href: '/favicon.ico', type: 'image/x-icon' },
  { href: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
  { href: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
  { href: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }
];

// Simple favicon update function
export const updateFavicon = (iconUrl: string): void => {
  try {
    // Remove existing favicons
    const existingIcons = document.querySelectorAll('link[rel*="icon"]');
    existingIcons.forEach(link => link.remove());

    // Add new favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = iconUrl;
    document.head.appendChild(link);

    console.log('✅ Favicon updated successfully');
  } catch (error) {
    console.error('❌ Failed to update favicon:', error);
  }
};

// Initialize favicon system
export const initializeFaviconSystem = (): void => {
  console.log('🎯 Favicon system initialized');
};

// Simple preload function for critical favicons
export const preloadFavicons = (): void => {
  FAVICON_CONFIGS.forEach(config => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = config.href;
    document.head.appendChild(link);
  });
  
  console.log('✅ Critical favicons preloaded');
};
