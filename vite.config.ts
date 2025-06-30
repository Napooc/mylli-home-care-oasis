
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    watch: {
      usePolling: true,
      interval: 1000,
      ignored: ['**/node_modules/**', '**/.git/**']
    },
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@vite/client', '@vite/env']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom'],
          
          // Routing
          'router': ['react-router-dom'],
          
          // UI components (split by usage frequency)
          'ui-core': [
            '@radix-ui/react-dialog', 
            '@radix-ui/react-toast', 
            '@radix-ui/react-slot'
          ],
          'ui-forms': [
            '@radix-ui/react-checkbox',
            '@radix-ui/react-label',
            '@radix-ui/react-radio-group',
            'react-hook-form'
          ],
          'ui-navigation': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-tabs'
          ],
          'ui-data': [
            '@radix-ui/react-select',
            '@radix-ui/react-table',
            'recharts'
          ],
          
          // Query and state management
          'data-fetching': ['@tanstack/react-query'],
          
          // Utilities
          'utils': ['date-fns', 'clsx', 'tailwind-merge'],
          
          // Icons
          'icons': ['lucide-react'],
          
          // Large third-party libraries
          'charts': ['recharts'],
          'carousel': ['embla-carousel-react']
        },
        
        // Optimize chunk size
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? 
            chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `assets/[name]-[hash].js`;
        },
        
        // Optimize asset naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name!.split('.');
          const ext = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      }
    },
    
    // Compression and optimization
    target: 'es2020',
    sourcemap: false,
    minify: mode === 'production' ? 'terser' : false,
    
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2
      },
      mangle: {
        safari10: true
      },
      output: {
        safari10: true
      }
    } : undefined,
    
    // Chunk size warnings
    chunkSizeWarningLimit: 800,
    
    // Asset processing
    assetsInlineLimit: 4096, // 4kb
    
    // CSS code splitting
    cssCodeSplit: true
  },
  
  // Performance optimizations
  esbuild: {
    legalComments: 'none',
    minifyIdentifiers: mode === 'production',
    minifySyntax: mode === 'production',
    minifyWhitespace: mode === 'production'
  }
}));
