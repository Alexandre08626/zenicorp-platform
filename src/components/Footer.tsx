import Link from 'next/link';
import { ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';
import {
  divisionsData,
  MODEL,
  ZENICORP_EMAIL,
  ZENICORP_PHONE,
  ZENICORP_PHONE_HREF,
} from '@/lib/divisions-data';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-zenicorp-line/70 bg-zenicorp-void">
      <div className="absolute inset-0 bp-grid-fine opacity-25" />

      <div className="container-zenicorp relative">
        {/* Bandeau d'appel */}
        <div className="grid gap-10 border-b border-zenicorp-line/70 py-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="eyebrow">Parlons de votre projet</span>
            <p className="mt-7 font-heading text-display-sm font-semibold text-zenicorp-text">
              Un conseiller répond au téléphone.
              <br />
              <span className="text-zenicorp-faint">Pas un formulaire automatique.</span>
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <a
              href={ZENICORP_PHONE_HREF}
              className="group inline-flex items-center gap-3 font-heading text-2xl font-semibold text-zenicorp-gold sm:text-3xl"
            >
              <Phone className="h-5 w-5" />
              <span className="link-underline">{ZENICORP_PHONE}</span>
            </a>
          </div>
        </div>

        {/* Colonnes */}
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3.5">
              <span className="grid h-9 w-9 place-items-center bg-zenicorp-gold">
                <span className="font-heading text-lg font-bold leading-none text-zenicorp-black">
                  Z
                </span>
              </span>
              <span className="leading-none">
                <span className="block font-heading text-lg font-semibold text-zenicorp-text">
                  ZeniCorp
                </span>
                <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.28em] text-zenicorp-faint">
                  Plateforme
                </span>
              </span>
            </div>
            <p className="mt-7 max-w-xs text-sm leading-relaxed text-zenicorp-faint">
              Plateforme de construction et de rénovation au Québec. Quatre divisions
              spécialisées, un réseau d&apos;entrepreneurs certifiés RBQ.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="tech-label mb-6 block">Divisions</h2>
            <nav className="flex flex-col">
              {divisionsData.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${d.slug}`}
                  className="group flex items-center justify-between border-b border-zenicorp-line/50 py-3 text-sm text-zenicorp-dim transition-colors duration-300 hover:text-zenicorp-text"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: d.color }}
                    />
                    {d.short}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zenicorp-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zenicorp-gold" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2">
            <h2 className="tech-label mb-6 block">Plateforme</h2>
            <nav className="flex flex-col gap-3">
              <Link
                href="/projet"
                className="link-underline w-fit text-sm text-zenicorp-dim transition-colors hover:text-zenicorp-gold"
              >
                Soumettre un projet
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zenicorp-faint">
                Dépôt {MODEL.deposit}
              </span>
              <Link
                href="/entrepreneur"
                className="link-underline mt-2 w-fit text-sm text-zenicorp-dim transition-colors hover:text-zenicorp-gold"
              >
                Espace entrepreneur
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zenicorp-faint">
                Inscription gratuite
              </span>
            </nav>
          </div>

          <div className="lg:col-span-3">
            <h2 className="tech-label mb-6 block">Contact</h2>
            <address className="flex flex-col gap-4 not-italic text-sm text-zenicorp-dim">
              <span className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zenicorp-gold/70" />
                Québec, QC, Canada
              </span>
              <a
                href={ZENICORP_PHONE_HREF}
                className="flex items-start gap-3 transition-colors hover:text-zenicorp-gold"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-zenicorp-gold/70" />
                {ZENICORP_PHONE}
              </a>
              <a
                href={`mailto:${ZENICORP_EMAIL}`}
                className="flex items-start gap-3 break-all transition-colors hover:text-zenicorp-gold"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-zenicorp-gold/70" />
                {ZENICORP_EMAIL}
              </a>
            </address>
          </div>
        </div>

        {/* Mentions */}
        <div className="flex flex-col gap-4 border-t border-zenicorp-line/70 py-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-zenicorp-faint">
            © {new Date().getFullYear()} ZeniCorp — Tous droits réservés
          </p>
          <p className="max-w-xl text-xs leading-relaxed text-zenicorp-faint/80">
            Les travaux sont réalisés par des entrepreneurs indépendants certifiés RBQ du
            réseau.
          </p>
        </div>
      </div>
    </footer>
  );
}
