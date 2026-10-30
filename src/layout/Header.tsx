import { Link } from 'react-router-dom';
import { Maximize2, Menu, Search, X } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import ThemeToggle from '../components/ThemeToggle';
import { useScrollEdge } from './useScrollEdge';

type Props = {
  onOpenSearch?: () => void;
  onToggleDrawer?: () => void;
  drawerOpen?: boolean;
  /** Só nas páginas-modelo: abre a página sem o chrome do site */
  onEnterFullscreen?: () => void;
};

export default function Header({ onOpenSearch, onToggleDrawer, drawerOpen, onEnterFullscreen }: Props) {
  const edgeRef = useScrollEdge<HTMLElement>();
  return (
    <header ref={edgeRef} className="vds-header">
      <div className="vds-header-left">
        <button
          type="button"
          className="vds-drawer-toggle"
          aria-label={drawerOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={drawerOpen}
          aria-controls="vds-sidebar"
          onClick={onToggleDrawer}
        >
          {drawerOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
        </button>
        <Link to="/" className="vds-brand" viewTransition>
          <BrandLogo variant="auto" size="md" />
          <span className="vds-brand-tag">Design System</span>
        </Link>
      </div>

      <div className="vds-header-right">
        {onEnterFullscreen && (
          <button type="button" className="vds-header-btn vds-fullscreen-btn" onClick={onEnterFullscreen}>
            <Maximize2 size={14} strokeWidth={1.8} aria-hidden="true" />
            <span className="vds-header-btn-label">Tela cheia</span>
          </button>
        )}
        <button type="button" className="vds-search" onClick={onOpenSearch}>
          <Search size={14} strokeWidth={2} aria-hidden="true" />
          <span>Buscar fundamentos, componentes…</span>
          <kbd className="vds-kbd">⌘K</kbd>
        </button>
        {/* Telas estreitas: o campo some, a lupa abre a mesma busca */}
        <button type="button" className="vds-header-btn vds-search-icon" aria-label="Buscar" onClick={onOpenSearch}>
          <Search size={16} strokeWidth={2} aria-hidden="true" />
        </button>
        <ThemeToggle />
        <a className="vds-header-link" href="https://viverdeia.ai" target="_blank" rel="noreferrer">viverdeia.ai</a>
      </div>
    </header>
  );
}
