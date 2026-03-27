import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Compute base statically or fallback to '/'
const BASE_PATH = '/'

export default defineConfig({
  plugins: [react()],
  base: BASE_PATH,
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
})
