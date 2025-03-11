import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["yoga-with-friends.recurse.cloud", "localhost", "127.0.0.1"]
  }
});
