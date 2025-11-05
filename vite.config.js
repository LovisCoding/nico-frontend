import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // proxy toutes les requêtes /api vers VITE_API_URL
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3000',
        changeOrigin: true,
        secure: false, // mettre true si target a TLS valide
        rewrite: (path) => path.replace(/^\/api\//, ''), // retirer /api si nécessaire
      },
    },
  },
})
