'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, ClipboardList, Phone } from 'lucide-react';
import { divisionsData, ZENICORP_PHONE, ZENICORP_PHONE_HREF } from '@/lib/divisions-data';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [divOpen, setDivOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-x-0 border-t-0 rounded-none">
      <div className="container-zenicorp">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zenicorp-gold flex items-center justify-center shadow-[0_0_22px_rgba(212,175,55,0.3)]">
              <span className="font-heading font-bold text-xl text-zenicorp-black">Z</span>
            </div>
            <div className="leading-tight">
              <span className="font-heading font-bold text-xl text-zenicorp-text block">
                ZeniCorp
              </span>
              <span className="text-[9px] uppercase tracking-[0.24em] text-zenicorp-dim">
                Plateforme
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2.5 text-sm font-medium text-zenicorp-dim hover:text-zenicorp-text hover:bg-zenicorp-surface rounded-md transition-colors"
            >
              Accueil
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-zenicorp-dim hover:text-zenicorp-text hover:bg-zenicorp-surface rounded-md transition-colors">
                Divisions
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                <div className="w-56 glass rounded-md p-1.5 shadow-2xl">
                  {divisionsData.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/${d.slug}`}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-zenicorp-dim hover:text-zenicorp-text hover:bg-zenicorp-surface rounded-md transition-colors"
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: d.color }}
                      />
                      {d.short}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/entrepreneur"
              className="px-4 py-2.5 text-sm font-medium text-zenicorp-dim hover:text-zenicorp-text hover:bg-zenicorp-surface rounded-md transition-colors"
            >
              Entrepreneurs
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <a
              href={ZENICORP_PHONE_HREF}
              className="inline-flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-zenicorp-text hover:text-zenicorp-gold transition-colors"
            >
              <Phone className="w-4 h-4 text-zenicorp-gold" />
              {ZENICORP_PHONE}
            </a>
            <Link href="/projet" className="btn-gold">
              <ClipboardList className="w-4 h-4 mr-2" />
              Soumettre un projet
            </Link>
          </div>

          {/* Mobile: téléphone toujours visible + toggle */}
          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={ZENICORP_PHONE_HREF}
              className="p-2.5 text-zenicorp-gold hover:bg-zenicorp-surface rounded-md transition-colors"
              aria-label={`Appeler ${ZENICORP_PHONE}`}
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              className="p-2 text-zenicorp-dim hover:text-zenicorp-text rounded-md"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden glass border-x-0 border-t-0 rounded-none">
          <div className="container-zenicorp py-4 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2.5 text-sm font-medium text-zenicorp-dim hover:text-zenicorp-text hover:bg-zenicorp-surface rounded-md"
              onClick={() => setOpen(false)}
            >
              Accueil
            </Link>

            <button
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-zenicorp-dim rounded-md"
              onClick={() => setDivOpen(!divOpen)}
              aria-expanded={divOpen}
            >
              Divisions
              <ChevronDown
                className={`w-4 h-4 transition-transform ${divOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {divOpen && (
              <div className="pl-4 space-y-1">
                {divisionsData.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/${d.slug}`}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-zenicorp-dim hover:text-zenicorp-text hover:bg-zenicorp-surface rounded-md"
                    onClick={() => setOpen(false)}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                    {d.short}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/entrepreneur"
              className="block px-3 py-2.5 text-sm font-medium text-zenicorp-dim hover:text-zenicorp-text hover:bg-zenicorp-surface rounded-md"
              onClick={() => setOpen(false)}
            >
              Entrepreneurs
            </Link>

            <Link href="/projet" className="btn-gold w-full mt-3" onClick={() => setOpen(false)}>
              <ClipboardList className="w-4 h-4 mr-2" />
              Soumettre un projet
            </Link>
            <a href={ZENICORP_PHONE_HREF} className="btn-secondary w-full mt-2">
              <Phone className="w-4 h-4 mr-2" />
              {ZENICORP_PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
