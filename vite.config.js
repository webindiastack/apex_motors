import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  base: '/apex_motors/',

  server: {
    port: 3000,
    open: true
  }
});
