import path from 'path';
import dotenv from 'dotenv';

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });
const DEV_PROXY_URL = process.env.DEV_PROXY_URL;
const PROD_PROXY_URL = process.env.PROD_PROXY_URL;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 9000,
    proxy: {
      '/api': {
        target: DEV_PROXY_URL,
        changeOrigin: true,
        secure: false,
      },
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: PROD_PROXY_URL,
        changeOrigin: true,
        secure: false,
      },
    }
  },
});