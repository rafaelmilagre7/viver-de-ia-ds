import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useViewTransitionState } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import CommandPalette from '../components/CommandPalette';
import { enableGlassLens } from '../lib/_shared/lens';
import ScrollProgress from '../components/ScrollProgress';
import { DUR, EASE, prefersReducedMotion } from '../lib/_shared/motion';
import './layout.css';

/* Troca de rota · com View Transitions (Chrome/Edge 111+, Safari 18+,
   Firefox 144+) os links de navegação trocam a página por
   document.startViewTransition (CSS em layout.css). Aí o conteúdo NÃO
   remonta a cada rota: o Suspense persistente segura a página velha
   enquanto o chunk da nova baixa, e a captura pega a página pronta.
   Sem View Transitions, fica o fade de sempre (div com key = remonta). */
const supportsViewTransitions =
  typeof document !== 'undefined' && typeof document.startViewTransition === 'function';

function useScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
}

/** Navegação que NÃO veio por view transition (link no meio do texto,
 *  voltar/avançar) ainda ganha o fade de entrada — por WAAPI, sem remontar */
function useFallbackFade(pathname: string) {
  const ref = useRef<HTMLDivElement>(null);
  const inViewTransition = useViewTransitionState(pathname);
  const first = useRef(true);
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return; // 1ª montagem: o fade do CSS já roda
    }
    const el = ref.current;
    if (!el || inViewTransition || prefersReducedMotion() || typeof el.animate !== 'function') return;
    el.animate(
      [
        { opacity: 0, translate: '0 8px' },
        { opacity: 1, translate: '0 0' },
      ],
      { duration: DUR.page, easing: EASE.enter },
    );
    // só a troca de rota dispara · o estado de view transition é lido no mesmo render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return ref;
}

export default function Shell() {
  useScrollToTop();
  const { pathname } = useLocation();
  const pageRef = useFallbackFade(pathname);
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Lente do vidro (opt-in · só Chromium; fora dele nada muda)
  useEffect(() => {
    enableGlassLens();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdkOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // fecha o drawer ao trocar de rota — ajuste em render-phase (sem effect)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setDrawerOpen(false);
  }

  return (
    <div className={`vds-shell${drawerOpen ? ' drawer-open' : ''}`}>
      <ScrollProgress />
      <Header
        onOpenSearch={() => setCmdkOpen(true)}
        onToggleDrawer={() => setDrawerOpen((d) => !d)}
        drawerOpen={drawerOpen}
      />
      <Sidebar />
      <main className="vds-main">
        {supportsViewTransitions ? (
          <div ref={pageRef} className="vds-page-transition">
            <Outlet />
          </div>
        ) : (
          <div key={pathname} className="vds-page-transition">
            <Outlet />
          </div>
        )}
      </main>
      <Footer />
      <CommandPalette open={cmdkOpen} onClose={() => setCmdkOpen(false)} />
      {drawerOpen && <div className="vds-drawer-scrim" onClick={() => setDrawerOpen(false)} />}
    </div>
  );
}
