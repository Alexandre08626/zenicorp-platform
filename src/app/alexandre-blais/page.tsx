import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, RevealLines } from '@/components/Reveal';
import { divisionsData } from '@/lib/divisions-data';

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
  disambiguatingDescription:
    "Entrepreneur québécois fondateur de Zeniva Group (Zeniva Travel, ZeniPay, ZeniCorp, ZeniTech). À ne pas confondre avec Alexandre Blais, le physicien de l'Institut quantique de l'Université de Sherbrooke, ni avec les autres personnes du même nom.",
  description:
    'Entrepreneur québécois actif dans le voyage, la technologie, les paiements et les services de construction.',
  url: 'https://www.zeniva.ca/alexandre-blais',
  // Fiche canonique sur zenivatravel.com (même @id) ; cette page la reflète.
  worksFor: { '@id': 'https://www.zeniva.ca/#group' },
  affiliation: [
    { '@type': 'Organization', '@id': 'https://www.zeniva.ca/#group', name: 'Zeniva Group', url: 'https://www.zeniva.ca/groupe' },
    { '@type': 'Organization', '@id': 'https://www.zeniva.ca/#organization', name: 'ZeniCorp', url: 'https://www.zeniva.ca' },
    { '@type': 'Organization', '@id': 'https://www.zenivatravel.com/#organization', name: 'Zeniva Travel', url: 'https://www.zenivatravel.com' },
    { '@type': 'Organization', '@id': 'https://zenipay.ca/#organization', name: 'ZeniPay', url: 'https://zenipay.ca' },
    { '@type': 'Organization', '@id': 'https://zenitech.dev/#organization', name: 'ZeniTech', url: 'https://zenitech.dev' },
  ],
  sameAs: [
    'https://www.facebook.com/alexandre.blais.826776',
    'https://www.instagram.com/zeniva.ca/',
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
  '@id': 'https://www.zeniva.ca/#group',
  name: 'Zeniva Group',
  alternateName: ['Groupe Zeniva'],
  url: 'https://www.zeniva.ca/groupe',
  description:
    'Groupe fondé par Alexandre Blais regroupant Zeniva Travel, ZeniPay, ZeniCorp (construction) et ZeniTech.',
  founder: { '@id': 'https://www.zenivatravel.com/alexandre-blais#person' },
  subOrganization: [
    { '@id': 'https://www.zenivatravel.com/#organization' },
    { '@id': 'https://zenipay.ca/#organization' },
    { '@id': 'https://www.zeniva.ca/#organization' },
    { '@id': 'https://zenitech.dev/#organization' },
  ],
};

const GROUP = [
  { name: 'Zeniva Travel', d: 'Voyage et technologie', href: 'https://www.zenivatravel.com', ext: true, c: '#3CE1FF' },
  { name: 'ZeniPay', d: 'Paiements et technologie financière', href: 'https://zenipay.ca', ext: true, c: '#4696FF' },
  { name: 'ZeniTech', d: 'Développement et intelligence artificielle', href: 'https://zenitech.dev', ext: true, c: '#FF28D2' },
  { name: 'ZeniCorp', d: 'Construction et rénovation', href: '/', ext: false, c: '#FF6B1A' },
];

export default function AlexandreBlaisPage() {
  return (
    <main className="flex-1 overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      {/* ═══════════════ EN-TÊTE ═══════════════ */}
      <section className="relative">
        <div className="container-zenicorp pb-16 pt-36 sm:pb-20 sm:pt-40">
          <Reveal>
            <span className="chip">
              <span className="chip-dot" />
              Fondateur · Entrepreneur · Québec
            </span>
          </Reveal>
          <h1 className="mt-7 font-heading text-display-xl font-black text-white">
            <RevealLines
              delay={100}
              lines={[
                <>Alexandre</>,
                <>
                  <span className="grad-text">Blais.</span>
                </>,
              ]}
            />
          </h1>
          <Reveal delay={350}>
            <p className="body-large mt-7 max-w-3xl">
              Entrepreneur québécois à l’origine de plusieurs projets développés au Canada et aux États-Unis dans le voyage, la technologie, les paiements numériques et les services de construction.
            </p>
          </Reveal>
        </div>
        <div aria-hidden className="hazard h-2 w-full opacity-80" />
      </section>

      {/* ═══════════════ PARCOURS + GROUPE ═══════════════ */}
      <section className="section-padding relative">
        <div className="container-zenicorp grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <span className="eyebrow">Parcours</span>
            <h2 className="heading-2 mt-5">Parcours entrepreneurial</h2>
            <p className="body-large mt-6">
              Alexandre Blais développe un écosystème de projets qui combine opérations traditionnelles et technologies numériques. Son travail touche notamment le voyage sur mesure avec Zeniva, les technologies financières et de paiement avec ZeniPay, le développement technologique avec Zenitech ainsi que la mise en relation et la coordination de projets de construction par ZeniCorp.
            </p>
            <p className="body-large mt-5">
              ZeniCorp regroupe actuellement des activités spécialisées en revêtements époxy, entretien d’asphalte, toiture et isolation. La plateforme vise à simplifier le parcours client, de la demande initiale jusqu’à l’assignation d’un entrepreneur du réseau.
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <aside className="frame-grad rounded-[22px]">
              <div className="rounded-[21px] bg-gradient-to-b from-[#0E1524] to-[#070a12] p-6 sm:p-7">
                <h2 className="font-heading text-xl font-extrabold text-white">
                  <Link href="/groupe" className="link-underline">Zeniva Group</Link>
                </h2>
                <div className="mt-5 flex flex-col gap-2.5">
                  {GROUP.map((g) => {
                    const inner = (
                      <>
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: g.c, boxShadow: `0 0 10px ${g.c}` }} />
                        <span className="flex-1">
                          <span className="block font-semibold text-white">{g.name}</span>
                          <span className="block text-sm text-zenicorp-dim">{g.d}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-zenicorp-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zenicorp-gold" />
                      </>
                    );
                    const cls =
                      'spot group flex items-center gap-3.5 rounded-xl border border-[rgba(120,160,255,0.14)] bg-black/30 px-4 py-3 transition-colors';
                    return g.ext ? (
                      <a key={g.name} href={g.href} className={cls}>{inner}</a>
                    ) : (
                      <Link key={g.name} href={g.href} className={cls}>{inner}</Link>
                    );
                  })}
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ ZENICORP ═══════════════ */}
      <section className="section-padding relative border-t border-[rgba(120,160,255,0.1)]">
        <div className="container-zenicorp">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">Construction</span>
            <h2 className="heading-2 mt-5">
              Zeni<span className="grad-build">Corp</span>
            </h2>
            <p className="body-large mt-6">
              Le réseau ZeniCorp est structuré autour de quatre divisions spécialisées : Époxy, Asphalte, Toiture et Isolation. Chacune dispose de son propre parcours de demande et s’inscrit dans une plateforme commune de gestion des projets.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {divisionsData.map((d, i) => (
              <Reveal key={d.slug} delay={i * 60}>
                <Link
                  href={`/${d.slug}`}
                  className="spot group flex items-center justify-between rounded-[18px] border border-[rgba(120,160,255,0.14)] bg-gradient-to-b from-[#0E1524] to-[#0A0F1A] p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full" style={{ background: d.color, boxShadow: `0 0 10px ${d.color}` }} />
                    <span className="font-heading text-lg font-extrabold text-white">{d.short}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-zenicorp-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zenicorp-gold" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
