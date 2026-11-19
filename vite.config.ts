import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base './' ensures GitHub Pages works under any repository subpath
export default defineConfig({
  base: './',
  plugins: [react()],
});
