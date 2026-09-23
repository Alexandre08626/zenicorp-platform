'use client';

import { useEffect, useRef, useState } from 'react';
import { MODEL } from '@/lib/divisions-data';

/**
 * Terminal « dispatch » : montre, ligne par ligne, ce que fait la plateforme
 * quand une demande arrive. Démarre à l'entrée dans l'écran, puis boucle.
 * Exemple illustratif du parcours — aucune donnée client réelle.
 */
type Line = { c: string; t: string };

const SCRIPT: Line[] = [
  { c: 'p', t: '$ zeniva dispatch --nouvelle-demande' },
  { c: 'd', t: '  division    : époxy · garage résidentiel' },
  { c: 'd', t: '  superficie  : 420 pi²' },
  { c: 'd', t: '  secteur     : Québec (Capitale-Nationale)' },
  { c: 'ok', t: '✓ demande reçue — soumission gratuite, aucun dépôt' },
  { c: 'k', t: '→ recherche d’un entrepreneur spécialisé du réseau…' },
  { c: 'ok', t: '✓ licence RBQ vérifiée' },
  { c: 'ok', t: '✓ assurances responsabilité vérifiées' },
  { c: 'ok', t: '✓ spécialité et secteur confirmés' },
  { c: 'y', t: `→ entrepreneur assigné · contact prévu sous ${MODEL.contactDelay}` },
  { c: 'd', t: `  modalités : ${MODEL.signingShare} à la signature · ${MODEL.contractorShare} à l’entrepreneur` },
  { c: 'p', t: '$ statut : en route vers la visite et le prix ferme' },
];

const COLORS: Record<string, string> = {
  p: 'text-zenicorp-gold',
  d: 'text-zenicorp-faint',
  ok: 'text-emerald-300',
  k: 'text-sky-300',
  y: 'text-zenicorp-amber',
};

export default function DispatchTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(SCRIPT.length);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const done = shown >= SCRIPT.length;
    const id = window.setTimeout(
      () => setShown((n) => (n >= SCRIPT.length ? 0 : n + 1)),
      done ? 4200 : shown === 0 ? 500 : 420
    );
    return () => window.clearTimeout(id);
  }, [started, shown]);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-[18px] border border-[rgba(120,160,255,0.28)] bg-[#070a12] font-mono text-[0.78rem] shadow-[0_30px_80px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(60,225,255,0.06)] sm:text-[0.82rem]"
    >
      <div className="flex items-center gap-2 border-b border-[rgba(120,160,255,0.14)] bg-zenicorp-surface/80 px-4 py-3">
        <i className="h-[11px] w-[11px] rounded-full bg-[#FF5F57]" />
        <i className="h-[11px] w-[11px] rounded-full bg-[#FEBC2E]" />
        <i className="h-[11px] w-[11px] rounded-full bg-[#28C840]" />
        <span className="ml-auto text-[0.7rem] text-zenicorp-faint">zeniva — dispatch · réseau RBQ</span>
      </div>
      <div className="min-h-[21rem] px-4 pb-6 pt-4 leading-[1.75] text-[#C8D3E6] sm:px-5" aria-live="off">
        {SCRIPT.map((l, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap break-words transition-all duration-300 ${COLORS[l.c]} ${
              i < shown ? 'translate-x-0 opacity-100' : '-translate-x-1.5 opacity-0'
            }`}
          >
            {l.t}
          </div>
        ))}
        <span className="mt-1 inline-block h-[15px] w-2 translate-y-0.5 animate-blink bg-zenicorp-gold" />
      </div>
    </div>
  );
}
