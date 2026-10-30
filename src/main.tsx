import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import App from './App';
import Shell from './layout/Shell';
import Home from './pages/Home';
import RouteMeta from './components/RouteMeta';
import './index.css';

// Tags padrão do index.html saem: daqui pra frente o RouteMeta manda no <head>, sem duplicata
document.head.querySelectorAll('[data-route-meta]').forEach((el) => el.remove());

// Router de dados: é o modo em que `<NavLink viewTransition>` e
// `navigate(to, { viewTransition: true })` embrulham a troca de rota em
// document.startViewTransition. Só o nível de fora é rota de dados (Shell,
// com Sidebar/Header/⌘K dentro dele); as páginas seguem nas <Routes> do App.
const router = createBrowserRouter([
  {
    element: (
      <>
        <RouteMeta />
        <Outlet />
      </>
    ),
    children: [
      {
        element: <Shell />,
        children: [
          { index: true, element: <Home /> },
          { path: '*', element: <App /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
