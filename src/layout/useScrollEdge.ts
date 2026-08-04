import { useEffect, useRef } from 'react';

/**
 * Borda de rolagem (WWDC Fluid Interfaces · scroll edge effect):
 * em repouso o header é limpo; a classe .is-scrolled só existe quando
 * há conteúdo rolado por baixo — o CSS faz a linha/sombra surgirem em fade.
 */
export function useScrollEdge<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      el.classList.toggle('is-scrolled', window.scrollY > 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply(); // estado inicial — restauração de scroll no load não nasce sem borda
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
