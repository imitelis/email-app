import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 9000,
  },
  preview: {
    host: '0.0.0.0',
    port: 8080
  }
  
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