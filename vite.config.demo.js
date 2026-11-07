// Single-file app build; large videos remain separate files in dist-demo.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import path from 'path'
export default defineConfig({
  plugins: [react(), viteSingleFile({ useRecommendedBuildConfig: false })],
  assetsInclude: ['**/*.MP4'],
  define: { __DEMO__: true },
  base: './',
  resolve: {
    alias: {
      '@media': path.resolve('demo_media'),
      '@videos': path.resolve('demo_media/videos'),
    },
  },
  build: {
    assetsInlineLimit: 1000000,
    outDir: 'dist-demo',
    assetsDir: '',
    cssCodeSplit: false,
    chunkSizeWarningLimit: 50000,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
})
