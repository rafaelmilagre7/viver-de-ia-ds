import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

/**
 * Build config para a library publicável.
 * Roda com: `bun run build:lib` ou `vite build --config vite.config.lib.ts`
 *
 * Output:
 *   dist/lib/index.js   (ESM)
 *   dist/lib/index.cjs  (CommonJS)
 *   dist/lib/style.css  (CSS único de todos os components)
 *
 * react / react-dom / lucide-react ficam como peer dependencies — não
 * bundled — pra evitar duplicação no projeto consumidor.
 */
export default defineConfig({
  plugins: [react()],
  publicDir: false, // don't copy public/ assets into the lib bundle
  build: {
    outDir: 'dist/lib',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'ViverDeIaDS',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react'],
      output: {
        assetFileNames: 'style.css',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'lucide-react': 'Lucide',
        },
      },
    },
    sourcemap: true,
    minify: 'oxc',
  },
});
