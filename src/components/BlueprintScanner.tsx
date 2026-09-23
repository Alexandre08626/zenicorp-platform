'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ShieldCheck, Clock, ScanLine } from 'lucide-react';
import { divisionsData, MODEL } from '@/lib/divisions-data';

/**
 * Hero visuel « Plan → Réalisé ».
 * Une même photo de chantier est rendue deux fois : à gauche en plan technique
 * (négatif bleuté + grille + cotes), à droite en photo réelle. La ligne de scan
 * suit le curseur ; au repos elle balaie seule. Les onglets changent de division.
 */
const CYCLE_MS = 7000;

export default function BlueprintScanner() {
  const reduced = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);

  const setPos = useCallback((p: number) => {
    box.current?.style.setProperty('--scan', `${p}%`);
  }, []);

  // Balayage automatique quand le curseur n'est pas sur le visuel
  useEffect(() => {
    if (hover || reduced) return;
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      setPos(50 + Math.sin(t * 0.9) * 30);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hover, reduced, setPos]);

  // Rotation des divisions
  useEffect(() => {
    if (hover || reduced) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % divisionsData.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [hover, reduced, idx]);

  const onMove = useCallback((e: React.PointerEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    const p = ((e.clientX - r.left) / r.width) * 100;
    setPos(Math.max(4, Math.min(96, p)));
  }, [setPos]);

  const d = divisionsData[idx];

  return (
    <div className="relative">
      {/* Anneaux d'orbite (clin d'œil au hero de zenitech) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2 animate-[spin_90s_linear_infinite] rounded-full border border-dashed border-[rgba(120,160,255,0.12)]"
      />

      <div className="frame-grad rounded-[26px] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
        <div
          ref={box}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
          onPointerLeave={() => setHover(false)}
          onPointerMove={onMove}
          style={{ ['--scan' as string]: '52%' } as React.CSSProperties}
          className="relative aspect-[4/5] cursor-ew-resize select-none overflow-hidden rounded-[25px] bg-zenicorp-noir sm:aspect-[5/5] lg:aspect-[4/5]"
          role="img"
          aria-label={`Réalisation ${d.short} du réseau Zeniva, du plan au chantier terminé`}
        >
          {divisionsData.map((div, i) => (
            <div
              key={div.slug}
              className="absolute inset-0 transition-opacity duration-1000 ease-premium"
              style={{ opacity: i === idx ? 1 : 0 }}
              aria-hidden={i !== idx}
            >
              {/* RÉALISÉ — la photo */}
              <Image
                src={div.hero}
                alt=""
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

              {/* PLAN — même photo, en négatif technique, révélée jusqu'à la ligne de scan */}
              <div
                className="absolute inset-0"
                style={{ clipPath: 'inset(0 calc(100% - var(--scan)) 0 0)' }}
              >
                <Image
                  src={div.hero}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  style={{ filter: 'grayscale(1) invert(1) contrast(1.9) brightness(0.85)' }}
                />
                <div className="absolute inset-0 bg-[#0B3A8C] mix-blend-multiply" />
                <div className="absolute inset-0 bg-[#1D6FE0]/25 mix-blend-screen" />
                <div className="absolute inset-0 bp-grid-fine opacity-70" />
                <div className="absolute inset-0 bp-grid opacity-90" />
              </div>
            </div>
          ))}

          {/* Cotes du plan (toujours dans la zone « plan ») */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ clipPath: 'inset(0 calc(100% - var(--scan)) 0 0)' }}
          >
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 125">
              <g stroke="rgba(170,215,255,0.75)" strokeWidth="0.18" fill="none">
                <path d="M8 16 H92" />
                <path d="M8 14 V18 M92 14 V18" />
                <path d="M7 22 V104" />
                <path d="M5 22 H9 M5 104 H9" />
                <rect x="16" y="30" width="68" height="66" strokeDasharray="1.2 1" />
                <circle cx="50" cy="63" r="12" strokeDasharray="0.8 0.8" />
                <path d="M44 63 H56 M50 57 V69" />
              </g>
            </svg>
            <span className="absolute left-1/2 top-[9.5%] -translate-x-1/2 rounded bg-[#0B3A8C]/80 px-1.5 font-mono text-[10px] tracking-widest text-[#BFE3FF]">
              RELEVÉ · {d.short.toUpperCase()}
            </span>
          </div>

          {/* Ligne de scan */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 z-10 w-px bg-zenicorp-gold shadow-[0_0_18px_2px_rgba(60,225,255,0.7)]"
            style={{ left: 'var(--scan)' }}
          >
            <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-zenicorp-gold/70 bg-zenicorp-noir/70 backdrop-blur">
              <ScanLine className="h-4 w-4 text-zenicorp-gold" />
            </span>
          </div>

          {/* Libellés */}
          <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-md border border-[#BFE3FF]/30 bg-[#0B3A8C]/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#BFE3FF] backdrop-blur">
            Plan
          </span>
          <span className="pointer-events-none absolute right-4 top-4 z-10 rounded-md border border-zenicorp-amber/40 bg-black/50 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zenicorp-amber backdrop-blur">
            Réalisé
          </span>

          {/* Fiche chantier */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 sm:inset-x-4 sm:bottom-4">
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zenicorp-faint">
                  DIV-0{idx + 1} · {d.short}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  Réseau actif
                </span>
              </div>
              <p className="mt-2 line-clamp-1 font-heading text-base font-bold text-white">
                {d.services[0]}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(120,160,255,0.2)] bg-black/40 px-2 py-1 text-[11px] text-zenicorp-dim">
                  <ShieldCheck className="h-3.5 w-3.5 text-zenicorp-gold" />
                  Licence RBQ vérifiée
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(120,160,255,0.2)] bg-black/40 px-2 py-1 text-[11px] text-zenicorp-dim">
                  <Clock className="h-3.5 w-3.5 text-zenicorp-amber" />
                  Contact sous {MODEL.contactDelay}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Onglets divisions */}
      <div className="mt-4 grid grid-cols-4 gap-2" role="tablist" aria-label="Divisions">
        {divisionsData.map((div, i) => (
          <button
            key={div.slug}
            role="tab"
            aria-selected={i === idx}
            onClick={() => setIdx(i)}
            className={`group relative overflow-hidden rounded-xl border px-2 py-2.5 text-left transition-colors duration-300 ${
              i === idx
                ? 'border-[rgba(120,160,255,0.35)] bg-zenicorp-surface'
                : 'border-[rgba(120,160,255,0.12)] bg-zenicorp-surface/40 hover:border-[rgba(120,160,255,0.28)]'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: div.color }} />
              <span
                className={`truncate text-xs font-semibold sm:text-sm ${
                  i === idx ? 'text-white' : 'text-zenicorp-dim group-hover:text-white'
                }`}
              >
                {div.short}
              </span>
            </span>
            {/* Barre de progression du cycle */}
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[rgba(120,160,255,0.1)]">
              {i === idx && (
                <span
                  key={`${idx}-${hover}`}
                  className="block h-full origin-left"
                  style={{
                    background: 'linear-gradient(90deg,#3ce1ff,#ff6b1a)',
                    animation:
                      hover || reduced ? undefined : `line-grow ${CYCLE_MS}ms linear both`,
                    transform: hover || reduced ? 'scaleX(1)' : undefined,
                  }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
