/**
 * Ladle provider · injeta tokens.css e font Geist em todas as stories.
 * Sem isso, os componentes caem em fallbacks (Helvetica etc).
 */
import type { GlobalProvider } from '@ladle/react';
import '../src/styles/tokens.css';
import '../src/index.css';

export const Provider: GlobalProvider = ({ children }) => {
  return (
    <div
      style={{
        fontFamily: 'var(--via-font, Geist, system-ui, sans-serif)',
        color: 'var(--via-text-primary, #0A1F3B)',
        padding: 'var(--via-space-8, 32px)',
        minHeight: '100vh',
        background: 'var(--via-bg, #fff)',
      }}
    >
      {children}
    </div>
  );
};
