import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NEWS } from '@/lib/news-data';

const SITE_URL = 'https://www.zeniva.ca';

export const metadata: Metadata = {
  title: 'Nouvelles — Zeniva Group, Zeniva Travel, ZeniPay, ZeniCorp, ZeniTech',
  description:
    "Annonces officielles du groupe fondé par Alexandre Blais : lancement de Zeniva Group, de Lina (Zeniva Travel), de ZeniPay, de la plateforme de construction ZeniCorp et des services ZeniTech.",
  alternates: { canonical: '/nouvelles' },
  openGraph: { title: 'Nouvelles — Zeniva Group', description: 'Annonces officielles des quatre marques du groupe.', url: `${SITE_URL}/nouvelles`, type: 'website', locale: 'fr_CA' },
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

export default function NewsIndex() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/nouvelles`,
    name: 'Nouvelles — Zeniva Group',
    inLanguage: 'fr-CA',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#group` },
    hasPart: NEWS.map((n) => ({ '@type': 'NewsArticle', '@id': `${SITE_URL}/nouvelles/${n.slug}#article`, headline: n.title, datePublished: n.datePublished, url: `${SITE_URL}/nouvelles/${n.slug}` })),
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="section-padding border-b border-zenicorp-line/70">
        <div className="container-zenicorp max-w-4xl">
          <p className="eyebrow">Nouvelles</p>
          <h1 className="heading-1 mt-6 text-white">Annonces officielles du groupe.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Zeniva Group, Zeniva Travel, ZeniPay, ZeniCorp et ZeniTech — ce qu'on lance, dans nos mots.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-zenicorp grid max-w-4xl gap-5">
          {NEWS.map((n) => (
            <Link key={n.slug} href={`/nouvelles/${n.slug}`} className="group border border-zenicorp-line p-7 transition-colors hover:border-zenicorp-gold/60">
              <p className="font-mono text-label uppercase text-zenicorp-faint">{n.brand} · {formatDate(n.datePublished)}</p>
              <h2 className="heading-3 mt-3 text-white">{n.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-white/70">{n.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-mono text-label uppercase text-zenicorp-faint transition-colors group-hover:text-zenicorp-gold">
                Lire <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
