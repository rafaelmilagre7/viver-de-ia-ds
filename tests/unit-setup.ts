/**
 * Unit test setup · runs once before each test file.
 *
 * - extends `expect` with @testing-library/jest-dom matchers
 *   (toBeInTheDocument, toHaveAttribute, etc.)
 * - cleans up rendered React trees between tests (RTL does this in
 *   the Vitest-aware build, but we make it explicit for safety).
 */
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
