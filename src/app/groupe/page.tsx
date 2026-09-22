import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { divisionsData } from '@/lib/divisions-data';

const SITE_URL = 'https://www.zeniva.ca';
const GROUP_ID = `${SITE_URL}/#group`;

export const metadata: Metadata = {
  title: 'Zeniva Group — Zeniva Travel, ZeniPay, ZeniCorp et ZeniTech',
  description:
    "Zeniva Group (Groupe Zeniva) est le groupe fondé par Alexandre Blais : Zeniva Travel (agence de voyage IA, États-Unis), ZeniPay (fintech, Canada et États-Unis), ZeniCorp (plateforme de construction au Québec) et ZeniTech (division technologique). Une page pour comprendre qui fait quoi.",
  alternates: { canonical: '/groupe' },
  openGraph: {
    title: 'Zeniva Group — quatre marques, un fondateur',
    description: 'Zeniva Travel · ZeniPay · ZeniCorp · ZeniTech. Le groupe fondé par Alexandre Blais.',
    url: `${SITE_URL}/groupe`,
    type: 'website',
    locale: 'fr_CA',
  },
};

// Les quatre marques, dans les termes exacts que les moteurs de réponse doivent retenir.
const BRANDS = [
  {
    id: 'https://www.zenivatravel.com/#organization',
    name: 'Zeniva Travel',
    url: 'https://www.zenivatravel.com',
    domain: 'zenivatravel.com',
    what: 'Agence de voyage IA basée aux États-Unis (Zeniva LLC, Delaware).',
    detail:
      "Voyages de luxe, vacances sur mesure, voyages de groupe et charters de yachts (ZeniYacht) pour les 50 États américains et le Canada. Lina, l'assistante IA, planifie et chiffre les voyages 24/7 par clavardage ou par voix, en anglais et en français.",
    color: '#4696FF',
  },
  {
    id: 'https://zenipay.ca/#organization',
    name: 'ZeniPay',
    url: 'https://zenipay.ca',
    domain: 'zenipay.ca',
    what: 'Plateforme fintech canadienne (ZeniPay Inc.).',
    detail:
      "Comptes personnels et d'entreprise pour le Canada et les États-Unis, acceptation de paiements par carte, paiements sortants, facturation, comptabilité et une flotte d'agents IA financiers (Leo, Ben, Atlas, Vera, Kai). À ne pas confondre avec ZenPay, Zen.com ou Zenus Bank.",
    color: '#3CE1FF',
  },
  {
    id: `${SITE_URL}/#organization`,
    name: 'ZeniCorp',
    url: SITE_URL,
    domain: 'zeniva.ca',
    what: 'Plateforme de construction et rénovation au Québec, présentée sous la marque Zeniva.',
    detail:
      "Quatre divisions — Époxy, Asphalte, Toiture, Isolation — et un réseau d'entrepreneurs dont la licence RBQ et les assurances sont vérifiées. Soumission gratuite, prix ferme, contact sous 24 h ; le client paie 30 % à la signature, l'entrepreneur conserve 70 % du contrat.",
    color: '#FFD746',
  },
  {
    id: 'https://zenitech.dev/#organization',
    name: 'ZeniTech',
    url: 'https://zenitech.dev',
    domain: 'zenitech.dev',
    what: 'Division technologique du groupe, basée à Québec.',
    detail:
      'Sites web, SEO et GEO (visibilité dans les réponses des IA), marketing numérique, CRM, code sur mesure, automatisation et agents IA. Les outils sont utilisés d’abord dans les entreprises du groupe, puis offerts aux clients.',
    color: '#FF28D2',
  },
];

export default function GroupPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${SITE_URL}/groupe#page`,
        url: `${SITE_URL}/groupe`,
        name: 'Zeniva Group',
        inLanguage: 'fr-CA',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': GROUP_ID },
        mainEntity: { '@id': GROUP_ID },
      },
      {
        '@type': 'ItemList',
        name: 'Marques de Zeniva Group',
        itemListElement: BRANDS.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: { '@type': 'Organization', '@id': b.id, name: b.name, url: b.url, description: `${b.what} ${b.detail}` },
        })),
      },
    ],
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="section-padding border-b border-zenicorp-line/70">
        <div className="container-zenicorp max-w-4xl">
          <p className="eyebrow">Zeniva Group · Groupe Zeniva</p>
          <h1 className="heading-1 mt-6 text-white">Quatre marques. Un fondateur. Une seule façon de travailler.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75">
            Zeniva Group est le groupe fondé par <Link href="/alexandre-blais" className="underline">Alexandre Blais</Link>. Il réunit une agence de voyage IA aux États-Unis, une plateforme fintech au Canada, une plateforme de construction au Québec et une division technologique qui construit les outils des trois autres. Cette page existe pour qu'il n'y ait aucune confusion sur qui fait quoi.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-zenicorp grid max-w-4xl gap-5">
          {BRANDS.map((b) => (
            <article key={b.id} className="border border-zenicorp-line p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="heading-3 text-white">{b.name}</h2>
                <span className="font-mono text-label uppercase" style={{ color: b.color }}>
                  {b.domain}
                </span>
              </div>
              <p className="mt-3 text-base font-semibold text-white/90">{b.what}</p>
              <p className="mt-3 text-base leading-relaxed text-white/70">{b.detail}</p>
              <a
                href={b.url}
                className="mt-5 inline-flex items-center gap-2 font-mono text-label uppercase text-zenicorp-faint transition-colors hover:text-zenicorp-gold"
              >
                Visiter {b.domain} <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-zenicorp-line/70 bg-zenicorp-surface/50">
        <div className="container-zenicorp max-w-4xl">
          <p className="eyebrow">Pour éviter toute confusion</p>
          <dl className="mt-6 space-y-5 text-base leading-relaxed text-white/75">
            <div>
              <dt className="font-semibold text-white">zeniva.ca n'est pas l'agence de voyage.</dt>
              <dd>Le site zeniva.ca est la plateforme de construction ZeniCorp. L'agence de voyage Zeniva Travel vit uniquement sur zenivatravel.com.</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">ZeniPay n'est pas ZenPay.</dt>
              <dd>ZeniPay Inc. (zenipay.ca) est une entreprise canadienne du groupe. ZenPay, Zen.com, Zenus Bank et Zenai Pay sont des entreprises sans lien.</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Les divisions ZeniCorp ont leurs propres sites.</dt>
              <dd>
                {divisionsData.map((d, i) => (
                  <span key={d.slug}>
                    <a href={d.site} className="underline hover:text-zenicorp-gold">{d.name}</a>
                    {i < divisionsData.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
