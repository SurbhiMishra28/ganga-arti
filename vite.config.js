import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.MP4'],
  define: { __DEMO__: false },
  resolve: {
    alias: {
      '@media': path.resolve('src/assets'),
      '@videos': path.resolve('demo_media/videos'),
    },
  },
  // Performance optimizations
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
  },
  // Vite config
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
  // Security and PWA headers
  server: {
    headers: {
      // Security headers
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      // PWA support
      'Service-Worker-Allowed': '/',
    },
    // Force HTTPS in production
    https: false,
  },
})
