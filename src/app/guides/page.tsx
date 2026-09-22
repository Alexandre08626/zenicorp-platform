import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { GUIDES } from '@/lib/guides-data';
import { getDivisionBySlug } from '@/lib/divisions-data';

const SITE_URL = 'https://www.zeniva.ca';

export const metadata: Metadata = {
  title: 'Guides de prix 2026 — époxy, toiture, asphalte, isolation au Québec',
  description:
    "Combien coûtent vraiment un plancher époxy, une toiture en bardeaux, le scellant d'asphalte ou l'isolation d'un grenier au Québec en 2026 ? Fourchettes de marché sourcées, facteurs de prix et questions à poser avant de signer.",
  alternates: { canonical: '/guides' },
  openGraph: {
    title: 'Guides de prix 2026 — Zeniva',
    description: "Prix réels 2026 au Québec pour l'époxy, la toiture, l'asphalte et l'isolation.",
    url: `${SITE_URL}/guides`,
    type: 'website',
    locale: 'fr_CA',
  },
};

export default function GuidesIndex() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/guides`,
    name: 'Guides de prix Zeniva',
    inLanguage: 'fr-CA',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    hasPart: GUIDES.map((g) => ({ '@type': 'Article', '@id': `${SITE_URL}/guides/${g.slug}#article`, headline: g.title, url: `${SITE_URL}/guides/${g.slug}` })),
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="section-padding border-b border-zenicorp-line/70">
        <div className="container-zenicorp max-w-4xl">
          <p className="eyebrow">Guides de prix 2026</p>
          <h1 className="heading-1 mt-6 text-white">Des prix réels. Pas de « ça dépend ».</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Ce que coûtent vraiment les travaux au Québec cette année, avec les sources, avant même de demander une soumission.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-zenicorp grid max-w-4xl gap-5">
          {GUIDES.map((g) => {
            const d = g.division ? getDivisionBySlug(g.division) : undefined;
            return (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="group border border-zenicorp-line p-7 transition-colors hover:border-zenicorp-gold/60">
                <p className="font-mono text-label uppercase" style={{ color: d ? d.color : '#FFD746' }}>{d ? d.name : 'ZeniCorp'} · {g.readingMinutes} min</p>
                <h2 className="heading-3 mt-3 text-white">{g.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-white/70">{g.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-label uppercase text-zenicorp-faint transition-colors group-hover:text-zenicorp-gold">
                  Lire le guide <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
