import Link from 'next/link';
import Image from 'next/image';
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
    <footer className="relative overflow-hidden border-t border-zenicorp-noirLine bg-zenicorp-noir">
      <div className="absolute inset-0 bp-grid-fine-noir opacity-25" />

      <div className="container-zenicorp relative">
        {/* Bandeau d'appel */}
        <div className="grid gap-10 border-b border-white/10 py-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="eyebrow">Parlons de votre projet</span>
            <p className="mt-7 font-heading text-display-sm font-semibold text-white">
              Un conseiller répond au téléphone.
              <br />
              <span className="text-white/50">Pas un formulaire automatique.</span>
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
            <div className="flex items-center">
              <span className="inline-flex items-center gap-2.5">
                <span className="relative h-10 w-auto shrink-0 overflow-hidden rounded-md ring-1 ring-white/15">
                  <Image
                    src="/logo.png"
                    alt="Zeniva"
                    width={400}
                    height={267}
                    className="h-10 w-auto object-contain"
                  />
                </span>
                <span className="leading-none">
                  <span className="block font-heading text-lg font-black tracking-tight text-white">
                    ZENIVA
                  </span>
                  <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.28em] text-white/50">
                    Plateforme
                  </span>
                </span>
              </span>
            </div>
            <p className="mt-7 max-w-xs text-sm leading-relaxed text-white/55">
              Plateforme de construction et de rénovation au Québec. Quatre divisions
              spécialisées, un réseau d&apos;entrepreneurs certifiés RBQ.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="tech-label mb-6 block text-white/50">Divisions</h2>
            <nav className="flex flex-col">
              {divisionsData.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${d.slug}`}
                  className="group flex items-center justify-between border-b border-white/10 py-3 text-sm text-white/70 transition-colors duration-300 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: d.color }}
                    />
                    {d.short}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zenicorp-gold" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2">
            <h2 className="tech-label mb-6 block text-white/50">Plateforme</h2>
            <nav className="flex flex-col gap-3">
              <Link
                href="/projet"
                className="link-underline w-fit text-sm text-white/70 transition-colors hover:text-zenicorp-gold"
              >
                Soumettre un projet
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                Soumission gratuite
              </span>
              <Link
                href="/entrepreneur"
                className="link-underline mt-2 w-fit text-sm text-white/70 transition-colors hover:text-zenicorp-gold"
              >
                Espace entrepreneur
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                Inscription gratuite
              </span>
            </nav>
          </div>

          <div className="lg:col-span-3">
            <h2 className="tech-label mb-6 block text-white/50">Contact</h2>
            <address className="flex flex-col gap-4 not-italic text-sm text-white/70">
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
        <div className="flex flex-col gap-4 border-t border-white/10 py-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            © {new Date().getFullYear()} Zeniva — Tous droits réservés
          </p>
          <p className="max-w-xl text-xs leading-relaxed text-white/35">
            Les travaux sont réalisés par des entrepreneurs indépendants certifiés RBQ du
            réseau.
          </p>
        </div>
      </div>
    </footer>
  );
}
