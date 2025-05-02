import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
  },
  server: {
    open: true,
  },
  // 👇 This part is key for React Router on Vercel
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});