import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import {
  divisionsData,
  MODEL,
  ZENICORP_EMAIL,
  ZENICORP_PHONE,
  ZENICORP_PHONE_HREF,
} from '@/lib/divisions-data';

export default function Footer() {
  return (
    <footer className="bg-zenicorp-surface border-t border-zenicorp-line">
      <div className="container-zenicorp py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-zenicorp-gold flex items-center justify-center">
                <span className="font-heading font-bold text-lg text-zenicorp-black">Z</span>
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-zenicorp-text block">
                  ZeniCorp
                </span>
                <span className="text-[9px] uppercase tracking-[0.24em] text-zenicorp-dim">
                  Plateforme
                </span>
              </div>
            </div>
            <p className="body-base mb-6 max-w-xs">
              Votre projet. Notre réseau d&apos;entrepreneurs certifiés. Une seule plateforme.
            </p>
            <a href={ZENICORP_PHONE_HREF} className="btn-outline-gold">
              <Phone className="w-4 h-4 mr-2" />
              {ZENICORP_PHONE}
            </a>
          </div>

          <div>
            <h4 className="font-semibold text-zenicorp-text mb-4">Divisions</h4>
            <nav className="space-y-2">
              {divisionsData.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${d.slug}`}
                  className="flex items-center gap-2 text-zenicorp-dim hover:text-zenicorp-gold transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />
                  {d.short}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-zenicorp-text mb-4">Plateforme</h4>
            <nav className="space-y-2">
              <Link
                href="/projet"
                className="block text-zenicorp-dim hover:text-zenicorp-gold transition-colors"
              >
                Soumettre un projet — {MODEL.deposit}
              </Link>
              <Link
                href="/entrepreneur"
                className="block text-zenicorp-dim hover:text-zenicorp-gold transition-colors"
              >
                Espace entrepreneur — gratuit
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-zenicorp-text mb-4">Contact</h4>
            <address className="not-italic space-y-3 text-zenicorp-dim">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-zenicorp-gold/70" />
                Québec, QC, Canada
              </p>
              <p className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-zenicorp-gold/70" />
                <a
                  href={ZENICORP_PHONE_HREF}
                  className="hover:text-zenicorp-gold transition-colors"
                >
                  {ZENICORP_PHONE}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-zenicorp-gold/70" />
                <a
                  href={`mailto:${ZENICORP_EMAIL}`}
                  className="hover:text-zenicorp-gold transition-colors break-all"
                >
                  {ZENICORP_EMAIL}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-zenicorp-line pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zenicorp-dim">
            © {new Date().getFullYear()} ZeniCorp. Tous droits réservés.
          </p>
          <p className="text-xs text-zenicorp-dim/60">
            Les travaux sont réalisés par des entrepreneurs indépendants certifiés RBQ du réseau.
          </p>
        </div>
      </div>
    </footer>
  );
}
