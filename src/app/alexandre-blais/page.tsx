import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Alexandre Blais — Entrepreneur québécois | ZeniCorp',
  description:
    'Alexandre Blais est un entrepreneur québécois à l’origine de plusieurs projets dans le voyage, la technologie, les paiements et les services de construction, dont ZeniCorp.',
  alternates: { canonical: 'https://www.zeniva.ca/alexandre-blais' },
  openGraph: {
    title: 'Alexandre Blais — Entrepreneur québécois | ZeniCorp',
    description:
      'Profil d’Alexandre Blais, entrepreneur québécois et fondateur lié à ZeniCorp et à plusieurs projets technologiques au Canada et aux États-Unis.',
    url: 'https://www.zeniva.ca/alexandre-blais',
    type: 'profile',
    locale: 'fr_CA',
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.zenivatravel.com/alexandre-blais#person',
  name: 'Alexandre Blais',
  jobTitle: 'Entrepreneur, fondateur et président',
  description:
    'Entrepreneur québécois actif dans le voyage, la technologie, les paiements et les services de construction.',
  url: 'https://www.zeniva.ca/alexandre-blais',
  sameAs: [
    'https://www.zenivatravel.com/alexandre-blais',
    'https://zenipay.ca/alexandre-blais',
    'https://github.com/Alexandre08626',
  ],
  knowsAbout: [
    'Entrepreneuriat',
    'Technologie',
    'Intelligence artificielle',
    'Voyage',
    'Paiements numériques',
    'Construction et rénovation',
  ],
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ZeniCorp',
  url: 'https://www.zeniva.ca',
  founder: { '@id': 'https://www.zenivatravel.com/alexandre-blais#person' },
};

export default function AlexandreBlaisPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <section className="border-b border-slate-200 bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">Fondateur · Entrepreneur · Québec</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">Alexandre Blais</h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-300">
            Entrepreneur québécois à l’origine de plusieurs projets développés au Canada et aux États-Unis dans le voyage, la technologie, les paiements numériques et les services de construction.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h2 className="text-3xl font-bold">Parcours entrepreneurial</h2>
            <p className="mt-5 leading-8 text-slate-600">
              Alexandre Blais développe un écosystème de projets qui combine opérations traditionnelles et technologies numériques. Son travail touche notamment le voyage sur mesure avec Zeniva, les technologies financières et de paiement avec ZeniPay, le développement technologique avec Zenitech ainsi que la mise en relation et la coordination de projets de construction par ZeniCorp.
            </p>
            <p className="mt-5 leading-8 text-slate-600">
              ZeniCorp regroupe actuellement des activités spécialisées en revêtements époxy, entretien d’asphalte, toiture et isolation. La plateforme vise à simplifier le parcours client, de la demande initiale jusqu’à l’assignation d’un entrepreneur du réseau.
            </p>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-bold">Écosystème</h2>
            <div className="mt-5 space-y-3 text-sm">
              <a className="block font-semibold hover:underline" href="https://www.zenivatravel.com">Zeniva Travel — voyage et technologie</a>
              <a className="block font-semibold hover:underline" href="https://zenipay.ca">ZeniPay — paiements et technologie financière</a>
              <span className="block font-semibold">Zenitech — développement et intelligence artificielle</span>
              <Link className="block font-semibold hover:underline" href="/">ZeniCorp — construction et rénovation</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold">ZeniCorp</h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            Le réseau ZeniCorp est structuré autour de quatre divisions spécialisées : Époxy, Asphalte, Toiture et Isolation. Chacune dispose de son propre parcours de demande et s’inscrit dans une plateforme commune de gestion des projets.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Époxy', '/epoxy'],
              ['Asphalte', '/asphalte'],
              ['Toiture', '/toiture'],
              ['Isolation', '/isolation'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="rounded-xl border border-slate-200 bg-white p-5 font-bold hover:border-slate-400">
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
