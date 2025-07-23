
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // Add base configuration for different deployment scenarios
  base: "./",
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
    rollupOptions: {
      output: {
        manualChunks: {
          // Core essentials - smallest possible
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-query': ['@tanstack/react-query'],
          // UI components - lazy loaded
          'ui-components': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          'icons': ['lucide-react'],
          'utils': ['clsx', 'tailwind-merge'],
        },
        chunkFileNames: 'assets/js/[name]-[hash:8].js',
        entryFileNames: 'assets/js/[name]-[hash:8].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') ?? [];
          const extType = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name ?? '')) {
            return 'assets/css/[name]-[hash:8][extname]';
          }
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(assetInfo.name ?? '')) {
            return 'assets/img/[name]-[hash:8][extname]';
          }
          return 'assets/[name]-[hash:8][extname]';
        }
      }
    },
    target: 'es2020',
    minify: 'esbuild',
    chunkSizeWarningLimit: 200,
    sourcemap: false,
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    assetsInlineLimit: 1024,
    reportCompressedSize: false,
    // Ensure public directory is properly copied
    copyPublicDir: true,
    // Fix asset handling for deployment
    assetsDir: 'assets',
    outDir: 'dist',
    emptyOutDir: true,
  },
  // Ensure public files are accessible
  publicDir: 'public',
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'lucide-react'
    ],
    exclude: ['@vite/client', '@vite/env'],
  },
  esbuild: {
    target: 'es2020',
    logOverride: {
      'this-is-undefined-in-esm': 'silent'
    },
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  }
}));
