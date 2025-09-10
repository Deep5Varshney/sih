import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Fix for static hosting (Render)
  base: './', // Use relative paths for JS, CSS, and assets

  build: {
    outDir: 'dist', // Default Vite build folder
    assetsDir: 'assets', // Folder for static assets
    sourcemap: false, // optional, reduces bundle size
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Optional: allows @/ imports
    },
  },

  server: {
    port: 5173, // Dev server port
  },
})
