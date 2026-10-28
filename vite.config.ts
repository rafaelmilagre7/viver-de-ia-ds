import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // CSS minificado pelo padrão do Vite 8 (lightningcss). O vidro sobrevive porque
    // todo bloco declara -webkit-backdrop-filter ANTES do padrão — `bun run lint:glass` barra.
    rolldownOptions: {
      output: {
        codeSplitting: {
          // React + router num chunk próprio: muda pouco, fica no cache entre deploys
          groups: [
            { name: 'vendor', test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/ },
          ],
        },
      },
    },
  },
})
