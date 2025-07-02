
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ultra-aggressive code splitting for maximum performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Core essentials only (smallest possible)
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-query': ['@tanstack/react-query'],
          // Feature chunks (lazy loaded)
          'ui-components': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          'icons': ['lucide-react'],
          'utils': ['clsx', 'tailwind-merge'],
          'email': ['@emailjs/browser'],
        },
        // Ultra-optimized file names for better caching
        chunkFileNames: 'js/[name]-[hash:8].js',
        entryFileNames: 'js/[name]-[hash:8].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') ?? [];
          const extType = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name ?? '')) {
            return 'css/[name]-[hash:8][extname]';
          }
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(assetInfo.name ?? '')) {
            return 'img/[name]-[hash:8][extname]';
          }
          return 'assets/[name]-[hash:8][extname]';
        }
      }
    },
    // Maximum optimization settings
    target: 'es2020',
    minify: 'esbuild', // Faster than terser
    chunkSizeWarningLimit: 300, // Stricter limit
    sourcemap: false,
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    assetsInlineLimit: 1024, // Inline very small assets only
    reportCompressedSize: false, // Skip size reporting for faster builds
  },
  // Ultra-optimized dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'lucide-react',
      'clsx',
      'tailwind-merge'
    ],
    exclude: ['@vite/client', '@vite/env'],
    force: false // Don't force re-optimization unless needed
  },
  // Ultra-fast esbuild configuration
  esbuild: {
    target: 'es2020',
    logOverride: {
      'this-is-undefined-in-esm': 'silent'
    },
    // Remove all console logs in production for smaller bundles
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none', // Remove license comments
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  }
}));
