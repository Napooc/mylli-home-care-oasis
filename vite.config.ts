
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';
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
    // Ultra-fast compression
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 512, // Compress files larger than 512B
      deleteOriginFile: false
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 512,
      deleteOriginFile: false
    }),
    // Bundle analyzer for optimization monitoring
    ...(process.env.ANALYZE ? [visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })] : [])
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ultra-optimized code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Core vendor chunks (smallest possible)
          'react': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'query': ['@tanstack/react-query'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'icons': ['lucide-react'],
          'utils': ['clsx', 'tailwind-merge'],
          // Feature chunks (lazy loaded)
          'charts': ['recharts'],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'email': ['@emailjs/browser'],
        },
        // Ultra-optimized file names
        chunkFileNames: 'js/[name]-[hash:8].js',
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
    // Ultra-fast build settings
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    // Aggressive optimization
    chunkSizeWarningLimit: 500, // Stricter chunk size limit
    sourcemap: false,
    cssCodeSplit: true,
    cssMinify: true,
    // Preload critical resources
    assetsInlineLimit: 2048, // Inline small assets
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
    exclude: ['@vite/client', '@vite/env']
  },
  // Ultra-fast esbuild
  esbuild: {
    target: 'es2020',
    logOverride: {
      'this-is-undefined-in-esm': 'silent'
    },
    // Remove all console logs in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  }
}));
