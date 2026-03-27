import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// Compute base statically or fallback to '/'
const BASE_PATH = '/'

export default defineConfig({
  plugins: [react(), cloudflare()],
  base: BASE_PATH,
})