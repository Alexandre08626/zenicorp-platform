'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, ClipboardList } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Divisions', href: '/#nos-divisions', children: [
    { label: 'Époxy', href: '/epoxy' },
    { label: 'Asphalte', href: '/asphalte' },
    { label: 'Toiture', href: '/toiture' },
    { label: 'Isolation', href: '/isolation' },
  ]},
  { label: 'Entrepreneurs', href: '/entrepreneur' },
];

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
              <span className="font-heading font-bold text-xl text-zenicorp-text block">ZeniCorp</span>
              <span className="text-[9px] uppercase tracking-[0.24em] text-zenicorp-dim">Plateforme</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-zenicorp-dim hover:text-zenicorp-text hover:bg-zenicorp-surface rounded-md transition-colors">
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                    <div className="w-48 glass rounded-md p-1.5 shadow-2xl">
                      {link.children.map((c) => (
                        <Link key={c.href} href={c.href} className="block px-3 py-2 text-sm text-zenicorp-dim hover:text-zenicorp-text hover:bg-zenicorp-surface rounded-md">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.label} href={link.href} className="px-4 py-2.5 text-sm font-medium text-zenicorp-dim hover:text-zenicorp-text hover:bg-zenicorp-surface rounded-md transition-colors">
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/projet" className="btn-gold">
              <ClipboardList className="w-4 h-4 mr-2" />
              Soumettre un projet
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-zenicorp-dim hover:text-zenicorp-text rounded-md"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden glass border-x-0 border-t-0 rounded-none">
          <div className="container-zenicorp py-4 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="space-y-1">
                  <button
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-zenicorp-dim rounded-md"
                    onClick={() => setDivOpen(!divOpen)}
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${divOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {divOpen && (
                    <div className="pl-4 space-y-1">
                      {link.children.map((c) => (
                        <Link key={c.href} href={c.href} className="block px-3 py-2 text-sm text-zenicorp-dim hover:text-zenicorp-text hover:bg-zenicorp-surface rounded-md" onClick={() => setOpen(false)}>
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.label} href={link.href} className="block px-3 py-2.5 text-sm font-medium text-zenicorp-dim hover:text-zenicorp-text hover:bg-zenicorp-surface rounded-md" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              )
            )}
            <Link href="/projet" className="btn-gold w-full mt-2" onClick={() => setOpen(false)}>
              Soumettre un projet
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}