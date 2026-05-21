import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

/**
 * Vitest config · unit tests for hooks + component behaviors.
 *
 * Visual / a11y / route-level concerns stay in Playwright (`tests/`).
 * This config covers logic that doesn't need a browser:
 *   - hooks (useToasts, etc.)
 *   - keyboard navigation contracts
 *   - ARIA state transitions
 *   - sort/filter/derived data logic
 *
 * Files live next to the components they test as `*.test.ts(x)`.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/unit-setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'dist-storybook', 'tests/visual.spec.ts', 'tests/a11y.spec.ts'],
    css: false, // CSS not needed for behavior tests; faster
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/lib/**/*.{ts,tsx}'],
      exclude: [
        'src/lib/**/*.stories.tsx',
        'src/lib/**/*.test.{ts,tsx}',
        'src/lib/index.ts',
        'src/lib/tokens.ts', // auto-generated
      ],
      thresholds: {
        // start lenient · ratchet up as we add coverage
        lines: 30,
        branches: 30,
        functions: 30,
        statements: 30,
      },
    },
  },
});
