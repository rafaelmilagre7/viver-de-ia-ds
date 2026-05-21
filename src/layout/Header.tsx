import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import ThemeToggle from '../components/ThemeToggle';

type Props = {
  onOpenSearch?: () => void;
  onToggleDrawer?: () => void;
  drawerOpen?: boolean;
};

export default function Header({ onOpenSearch, onToggleDrawer, drawerOpen }: Props) {
  return (
    <header className="vds-header">
      <div className="vds-header-left">
        <button
          className="vds-drawer-toggle"
          aria-label={drawerOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={onToggleDrawer}
        >
          {drawerOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
        </button>
        <Link to="/" className="vds-brand" aria-label="Viver de IA — Design System">
          <BrandLogo variant="black" size="md" />
          <span className="vds-brand-tag">Design System</span>
        </Link>
      </div>

      <div className="vds-header-right">
        <button className="vds-search" aria-label="Buscar (Cmd K)" onClick={onOpenSearch}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>Buscar fundamentos, componentes…</span>
          <kbd className="vds-kbd">⌘K</kbd>
        </button>
        <ThemeToggle />
        <a className="vds-header-link" href="https://viverdeia.ai" target="_blank" rel="noreferrer">viverdeia.ai</a>
      </div>
    </header>
  );
}
