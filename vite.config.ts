import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Para GitHub Pages: cambiar a base: '/stories_clon/' si el repo no es tu-usuario.github.io
  // Dejar como '/' si publicas en tu-usuario.github.io
  // base: '/stories_clon/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
