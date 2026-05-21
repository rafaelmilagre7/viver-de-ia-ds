import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Vite 8 default cssMinify chokes on a multi-line `--via-glow-navy-strong`
    // custom property inside :root. Disable CSS minify (JS minify still oxc).
    cssMinify: false,
  },
})
