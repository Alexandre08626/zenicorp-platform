'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => null,
});

/** Détecte un contexte WebGL exploitable sans polluer la page. */
function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl2') || c.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

export default function HeroCanvas({ colors }: { colors: string[] }) {
  const host = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);
  const [visible, setVisible] = useState(true);
  const [quality, setQuality] = useState(1);
  const [interactive, setInteractive] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const narrow = window.innerWidth < 768;
    const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;

    if (reduced || !webglAvailable()) {
      setMount(false);
      return;
    }

    setQuality(narrow || lowCores ? 0.55 : 1);
    setInteractive(!coarse);

    // On ne monte la scène qu'après le premier paint : le contenu et le CTA
    // restent prioritaires pour le rendu et le LCP.
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => setMount(true), { timeout: 1200 })
      : window.setTimeout(() => setMount(true), 350);

    return () => {
      if (window.cancelIdleCallback && typeof id === 'number') window.cancelIdleCallback(id);
      else clearTimeout(id as number);
    };
  }, []);

  // Coupe le rendu WebGL dès que le hero quitte l'écran (GPU au repos).
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '120px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className="absolute inset-0" aria-hidden="true">
      {/* Repli statique : toujours rendu, sert de fond si WebGL est absent
          ou si l'utilisateur demande un mouvement réduit. */}
      <div className="absolute inset-0 bp-grid mask-fade-b opacity-[0.5]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_45%,rgba(212,175,55,0.13),transparent_70%)]" />

      {mount && (
        <div
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-premium"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {visible && <HeroScene colors={colors} interactive={interactive} quality={quality} />}
        </div>
      )}

      {/* Fondus de lisibilité : le texte doit toujours gagner contre la scène */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zenicorp-black to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-zenicorp-black via-zenicorp-black/80 to-transparent lg:via-zenicorp-black/55" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-zenicorp-black/90 to-transparent" />
    </div>
  );
}
