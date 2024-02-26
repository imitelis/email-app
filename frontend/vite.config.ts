import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000,
  },
})

/*
proxy: {
    '/api': {
      target: 'http://localhost:8000', // <- consider dynamic route here, like meta.env etc
      changeOrigin: true,
      secure: false,
    },
  },
*/