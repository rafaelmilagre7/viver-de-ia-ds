import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Tokens + reset do design system Viver de IA
import '@viverdeia/design-system/styles.css';
// CSS local (sobre os tokens)
import './index.css';
import { ThemeProvider } from '@viverdeia/design-system';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultMode="system">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
