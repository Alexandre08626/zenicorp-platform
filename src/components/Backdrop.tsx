'use client';

import { useEffect, useRef } from 'react';

/**
 * Fond global « chantier numérique » : grille de plan, halos qui dérivent et
 * lueur qui suit le curseur (même langage visuel que zenitech.dev).
 *
 * Pose aussi --mx / --my sur la carte `.spot` survolée : un seul écouteur pour
 * tout le site, aucune carte n'a besoin d'être un composant client.
 */
export default function Backdrop() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;

      const card = (e.target as Element | null)?.closest?.('.spot') as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${x - r.left}px`);
        card.style.setProperty('--my', `${y - r.top}px`);
      }

      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          if (glow.current) {
            glow.current.style.opacity = '1';
            glow.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
          }
        });
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grille de plan, fondue vers le bas */}
      <div
        className="absolute -inset-px bp-grid"
        style={{
          maskImage: 'radial-gradient(ellipse 85% 65% at 50% 0%, #000 25%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 0%, #000 25%, transparent 100%)',
        }}
      />
      {/* Halos : bleu tech, orange chantier, cyan */}
      <div className="absolute -left-44 -top-40 h-[640px] w-[640px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(70,150,255,0.35),transparent_65%)] blur-[90px]" />
      <div
        className="absolute -right-40 top-28 h-[560px] w-[560px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(255,107,26,0.22),transparent_65%)] blur-[90px]"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute left-[35%] top-[70vh] h-[520px] w-[520px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(60,225,255,0.14),transparent_65%)] blur-[90px]"
        style={{ animationDelay: '-12s' }}
      />
      {/* Lueur curseur */}
      <div
        ref={glow}
        className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle, rgba(60,225,255,0.09), rgba(255,107,26,0.05) 40%, transparent 70%)',
        }}
      />
    </div>
  );
}
