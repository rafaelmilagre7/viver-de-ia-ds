import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import CommandPalette from '../components/CommandPalette';
import ScrollProgress from '../components/ScrollProgress';
import './layout.css';

function useScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
}

export default function Shell() {
  useScrollToTop();
  const { pathname } = useLocation();
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

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
        <div key={pathname} className="vds-page-transition">
          <Outlet />
        </div>
      </main>
      <Footer />
      <CommandPalette open={cmdkOpen} onClose={() => setCmdkOpen(false)} />
      {drawerOpen && <div className="vds-drawer-scrim" onClick={() => setDrawerOpen(false)} />}
    </div>
  );
}
