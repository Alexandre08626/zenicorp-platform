'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, Phone, ArrowRight, ArrowUpRight } from 'lucide-react';
import { divisionsData, ZENICORP_PHONE, ZENICORP_PHONE_HREF } from '@/lib/divisions-data';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  // Passe en mode « verre » dès qu'on quitte le haut de page
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Ferme le menu à la navigation
  useEffect(() => setOpen(false), [pathname]);

  // Verrouille le défilement quand le menu plein écran est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-premium ${
          scrolled || open
            ? 'border-b border-zenicorp-line/70 bg-zenicorp-black/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-zenicorp">
          <div
            className={`flex items-center justify-between transition-all duration-700 ease-premium ${
              scrolled ? 'h-16' : 'h-20 lg:h-24'
            }`}
          >
            {/* Marque */}
            <Link href="/" className="group flex items-center gap-3" aria-label="ZeniCorp, accueil">
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md">
                <Image
                  src="/logo-mark.png"
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
                  priority
                />
              </span>
              <span className="leading-none">
                <span className="block font-heading text-lg font-semibold tracking-tight text-zenicorp-text">
                  ZeniCorp
                </span>
                <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.28em] text-zenicorp-faint">
                  Plateforme
                </span>
              </span>
            </Link>

            {/* Navigation bureau */}
            <nav className="hidden items-center gap-9 lg:flex">
              <div className="group relative">
                <button className="flex items-center gap-2 py-2 font-mono text-label uppercase text-zenicorp-dim transition-colors duration-300 group-hover:text-zenicorp-text">
                  Divisions
                  <span className="h-1 w-1 bg-zenicorp-gold transition-transform duration-500 group-hover:scale-150" />
                </button>

                {/* Panneau divisions */}
                <div className="invisible absolute left-1/2 top-full w-[27rem] -translate-x-1/2 pt-5 opacity-0 transition-all duration-500 ease-premium group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="glass grid grid-cols-2 gap-px bg-zenicorp-line/40 p-px">
                    {divisionsData.map((d) => (
                      <Link
                        key={d.slug}
                        href={`/${d.slug}`}
                        className="group/i relative bg-zenicorp-black/90 p-5 transition-colors duration-300 hover:bg-zenicorp-surface"
                      >
                        <span
                          className="absolute left-0 top-0 h-full w-px transition-all duration-500"
                          style={{ background: d.color }}
                        />
                        <span className="flex items-center justify-between">
                          <span className="font-heading text-base font-semibold text-zenicorp-text">
                            {d.short}
                          </span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-zenicorp-faint transition-all duration-300 group-hover/i:-translate-y-0.5 group-hover/i:translate-x-0.5 group-hover/i:text-zenicorp-gold" />
                        </span>
                        <span className="mt-1.5 block text-xs leading-snug text-zenicorp-faint">
                          {d.services[0]}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/entrepreneur"
                className="link-underline py-2 font-mono text-label uppercase text-zenicorp-dim transition-colors duration-300 hover:text-zenicorp-text"
              >
                Entrepreneurs
              </Link>

              <a
                href={ZENICORP_PHONE_HREF}
                className="flex items-center gap-2 py-2 font-mono text-label uppercase text-zenicorp-dim transition-colors duration-300 hover:text-zenicorp-gold"
              >
                <Phone className="h-3.5 w-3.5 text-zenicorp-gold" />
                {ZENICORP_PHONE}
              </a>

              <Link href="/projet" className="btn-gold group px-6 py-3">
                Soumettre un projet
                <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1" />
              </Link>
            </nav>

            {/* Actions mobile */}
            <div className="flex items-center gap-1 lg:hidden">
              <a
                href={ZENICORP_PHONE_HREF}
                className="p-3 text-zenicorp-gold"
                aria-label={`Appeler le ${ZENICORP_PHONE}`}
              >
                <Phone className="h-5 w-5" />
              </a>
              <button
                onClick={() => setOpen((v) => !v)}
                className="p-3 text-zenicorp-text"
                aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={open}
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────── Menu plein écran (mobile) ─────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-zenicorp-black lg:hidden"
            initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="absolute inset-0 bp-grid-fine opacity-40" />

            <nav className="container-zenicorp relative flex flex-1 flex-col justify-center gap-1 pt-24 pb-10">
              <span className="tech-label mb-6 block">Divisions</span>
              {divisionsData.map((d, i) => (
                <motion.div
                  key={d.slug}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
                >
                  <Link
                    href={`/${d.slug}`}
                    className="flex items-center justify-between border-b border-zenicorp-line/70 py-4"
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: d.color }}
                      />
                      <span className="font-heading text-2xl font-semibold text-zenicorp-text">
                        {d.short}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-zenicorp-faint" />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="mt-10 flex flex-col gap-3"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
              >
                <Link href="/projet" className="btn-gold w-full py-4">
                  Soumettre un projet
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/entrepreneur" className="btn-secondary w-full py-4">
                  Je suis entrepreneur
                </Link>
                <a href={ZENICORP_PHONE_HREF} className="btn-outline-gold w-full py-4">
                  <Phone className="h-4 w-4" />
                  {ZENICORP_PHONE}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
