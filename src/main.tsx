import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RouteMeta from './components/RouteMeta';
import './index.css';

// Tags padrão do index.html saem: daqui pra frente o RouteMeta manda no <head>, sem duplicata
document.head.querySelectorAll('[data-route-meta]').forEach((el) => el.remove());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RouteMeta />
      <App />
    </BrowserRouter>
  </StrictMode>,
);
