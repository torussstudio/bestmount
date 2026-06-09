import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  build: {
    // Drop console.log and debugger in production builds
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — cached separately as it never changes
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Heavy animation library — only needed on pages with animations
          'vendor-framer': ['framer-motion'],
          // GSAP — large, needed only on animated sections
          'vendor-gsap': ['gsap'],
          // Icons — large icon set, split away from main bundle
          'vendor-icons': ['react-icons'],
          // Toast
          'vendor-toast': ['react-hot-toast'],
          // HTTP client
          'vendor-axios': ['axios'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  esbuild: {
    // Remove console.log and debugger statements in production
    drop: ['console', 'debugger'],
  },
})
