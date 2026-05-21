import { useEffect, useState } from 'react';
import './scroll-progress.css';

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const next = max <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / max));
      setPct(next);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="vds-scroll-progress" aria-hidden="true">
      <div className="vds-scroll-progress-bar" style={{ transform: `scaleX(${pct})` }} />
    </div>
  );
}
