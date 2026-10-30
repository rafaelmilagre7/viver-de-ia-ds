import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useSearchParams, useViewTransitionState } from 'react-router-dom';
import { Minimize2 } from 'lucide-react';
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

/** Página-modelo em tela cheia: ?tela-cheia na URL (dá pra mandar o link) */
const FULLSCREEN_PARAM = 'tela-cheia';

function useScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // link pra uma seção (#props) fica onde a âncora mandar
    if (window.location.hash) return;
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
  const [params, setParams] = useSearchParams();
  const pageRef = useFallbackFade(pathname);
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Páginas-modelo ocupam a coluna inteira (sem a margem do texto) e podem
  // abrir em tela cheia, sem header/sidebar/footer do site
  const isShowcase = pathname.startsWith('/showcase/');
  const fullscreen = isShowcase && params.has(FULLSCREEN_PARAM);
  const setFullscreen = (on: boolean) =>
    setParams(
      (p) => {
        const next = new URLSearchParams(p);
        if (on) next.set(FULLSCREEN_PARAM, '1');
        else next.delete(FULLSCREEN_PARAM);
        return next;
      },
      { viewTransition: true },
    );

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

  // Gaveta aberta: ESC fecha e devolve o foco ao botão que abriu
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || e.defaultPrevented) return;
      setDrawerOpen(false);
      document.querySelector<HTMLButtonElement>('.vds-drawer-toggle')?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  // fecha o drawer ao trocar de rota — ajuste em render-phase (sem effect)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setDrawerOpen(false);
  }

  // Pular pro conteúdo: foco no <main> sem mexer no hash da URL
  const skipToContent = (e: React.MouseEvent) => {
    e.preventDefault();
    const main = document.getElementById('conteudo');
    main?.focus({ preventScroll: true });
    main?.scrollIntoView();
  };

  const shellClass = [
    'vds-shell',
    drawerOpen && 'drawer-open',
    isShowcase && 'is-showcase',
    fullscreen && 'is-fullscreen',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={shellClass}>
      <a className="vds-skip-link" href="#conteudo" onClick={skipToContent}>
        Pular para o conteúdo
      </a>
      {!fullscreen && (
        <>
          <ScrollProgress />
          <Header
            onOpenSearch={() => setCmdkOpen(true)}
            onToggleDrawer={() => setDrawerOpen((d) => !d)}
            drawerOpen={drawerOpen}
            onEnterFullscreen={isShowcase ? () => setFullscreen(true) : undefined}
          />
          <Sidebar />
        </>
      )}
      <main id="conteudo" className="vds-main" tabIndex={-1}>
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
      {!fullscreen && <Footer />}
      {fullscreen && (
        <button type="button" className="vds-fullscreen-exit" onClick={() => setFullscreen(false)}>
          <Minimize2 size={14} strokeWidth={1.8} aria-hidden="true" />
          Sair da tela cheia
        </button>
      )}
      <CommandPalette open={cmdkOpen} onClose={() => setCmdkOpen(false)} />
      {drawerOpen && <div className="vds-drawer-scrim" onClick={() => setDrawerOpen(false)} />}
    </div>
  );
}
