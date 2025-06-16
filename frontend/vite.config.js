import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180, // Changed from 5173 to 5180 to test a different port
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});