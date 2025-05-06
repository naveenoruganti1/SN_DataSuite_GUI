import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // or 'localhost' or your LAN IP
    port: 3000       // change this to any port you like
  }
});
