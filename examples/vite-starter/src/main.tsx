import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Tokens FIRST · then component styles · then your own globals
import '@viverdeia/design-system/tokens.css';
import '@viverdeia/design-system/style.css';
import './app.css';

import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
