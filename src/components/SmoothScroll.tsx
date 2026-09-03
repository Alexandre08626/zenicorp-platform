'use client';

import { useEffect } from 'react';

/**
 * Scroll inertiel Lenis.
 * - Désactivé si l'utilisateur demande un mouvement réduit.
 * - Désactivé sur pointeur grossier (mobile) : le scroll natif y est meilleur
 *   et Lenis y coûte des frames pour rien.
 * - Intercepte les liens d'ancrage pour conserver un défilement fluide.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || coarse) return;

    let lenis: import('lenis').default | null = null;
    let frame = 0;
    let onAnchorClick: ((e: MouseEvent) => void) | null = null;
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        wheelMultiplier: 0.95,
        touchMultiplier: 1.6,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      onAnchorClick = (e: MouseEvent) => {
        const el = (e.target as HTMLElement | null)?.closest('a[href^="#"]');
        if (!el) return;
        const href = el.getAttribute('href');
        if (!href || href === '#') return;
        const dest = document.querySelector(href);
        if (!dest) return;
        e.preventDefault();
        lenis?.scrollTo(dest as HTMLElement, { offset: -90 });
      };
      document.addEventListener('click', onAnchorClick);
    });

    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
      if (onAnchorClick) document.removeEventListener('click', onAnchorClick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
