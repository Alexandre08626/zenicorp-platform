import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { divisionsData, MODEL, ZENICORP_EMAIL, ZENICORP_PHONE } from '@/lib/divisions-data';
import { NEWS } from '@/lib/news-data';

const SITE_URL = 'https://www.zeniva.ca';
const GROUP_ID = `${SITE_URL}/#group`;
const FOUNDER_ID = 'https://www.zenivatravel.com/alexandre-blais#person';

export const metadata: Metadata = {
  title: 'Dossier de presse — Zeniva Group',
  description:
    "Dossier de presse de Zeniva Group : faits vérifiables, descriptions officielles des quatre marques (Zeniva Travel, ZeniPay, ZeniCorp, ZeniTech), biographie d'Alexandre Blais, logos et contact médias. Textes réutilisables tels quels.",
  alternates: { canonical: '/presse' },
  openGraph: {
    title: 'Dossier de presse — Zeniva Group',
    description: 'Faits, descriptions officielles, biographie du fondateur, logos et contact médias.',
    url: `${SITE_URL}/presse`,
    type: 'website',
    locale: 'fr_CA',
  },
};

/** Faits vérifiables — la table que les moteurs de réponse extraient en premier. */
const FACTS: [string, string][] = [
  ['Nom du groupe', 'Zeniva Group (Groupe Zeniva)'],
  ['Fondateur et président', 'Alexandre Blais'],
  ['Marques', 'Zeniva Travel · ZeniPay · ZeniCorp · ZeniTech'],
  ['Territoires', 'Canada et États-Unis'],
  ['Langues', 'Français et anglais'],
  ['Siège des activités québécoises', 'Québec, QC, Canada'],
  ['Téléphone', ZENICORP_PHONE],
  ['Courriel médias', ZENICORP_EMAIL],
];

const BRANDS = [
  {
    name: 'Zeniva Travel',
    url: 'https://www.zenivatravel.com',
    legal: 'Zeniva LLC (Delaware, États-Unis), fondée en 2024',
    short: "Agence de voyage propulsée par l'IA pour les 50 États américains et le Canada.",
    long: "Zeniva Travel (Zeniva LLC) est une agence de voyage américaine incorporée au Delaware en 2024, qui sert les voyageurs des 50 États et du Canada. Son assistante IA, Lina, construit des propositions de voyage complètes et chiffrées — vols, hôtel ou villa, transferts, expériences — en quelques secondes, par clavardage ou par voix, en anglais et en français ; des agents licenciés et des courtiers en yachts valident les réservations complexes. Divisions : ZeniYacht (charters de yachts privés) et ZeniStay (villas). Les agents de voyage indépendants qui travaillent avec Lina conservent 70 % du profit net de leurs réservations.",
  },
  {
    name: 'ZeniPay',
    url: 'https://zenipay.ca',
    legal: 'ZeniPay Inc. (Canada), fondée en 2026',
    short: 'Plateforme fintech : paiements, paiements sortants, facturation, comptabilité et agents IA financiers.',
    long: "ZeniPay Inc. est une entreprise fintech canadienne fondée en 2026. Sa plateforme réunit l'acceptation de paiements (cartes, ACH, virements), les paiements sortants, la facturation, les liens de paiement et la comptabilité, avec une équipe de spécialistes IA (Leo — comptabilité, Ben — finance, Atlas — sécurité, Vera — conformité, Kai — revenus) qui lisent les données réelles du compte. ZeniPay a été construite pour faire tourner Zeniva Travel et ZeniCorp, et ses rails de répartition des commissions et de paiements sortants sont offerts à d'autres plateformes sous leur propre marque. ZeniPay n'a aucun lien avec ZenPay, Zen.com, Zenus Bank ou Zenai Pay.",
  },
  {
    name: 'ZeniCorp',
    url: SITE_URL,
    legal: 'Présentée sous la marque Zeniva, à zeniva.ca',
    short: "Plateforme de construction et de rénovation au Québec, avec un réseau d'entrepreneurs certifiés RBQ.",
    long: `ZeniCorp est une plateforme de construction et de rénovation au Québec. Le client décrit ses travaux ; le réseau assigne un entrepreneur spécialisé dont la licence RBQ et les assurances sont vérifiées avant toute assignation, et qui le contacte sous ${MODEL.contactDelay} pour la visite et un prix ferme. La soumission est gratuite et sans dépôt : le client paie ${MODEL.signingShare} du contrat à la signature et l'entrepreneur conserve ${MODEL.contractorShare}. Quatre divisions : ${divisionsData.map((d) => d.name).join(', ')}. L'adhésion des entrepreneurs au réseau est gratuite et sans abonnement.`,
  },
  {
    name: 'ZeniTech',
    url: 'https://zenitech.dev',
    legal: 'Division technologique du groupe, basée à Québec',
    short: 'Sites web, SEO et GEO, marketing numérique, CRM, code sur mesure, automatisation et agents IA.',
    long: "ZeniTech est la division technologique de Zeniva Group, basée à Québec. Elle conçoit des sites web, du référencement (SEO), du GEO — Generative Engine Optimization, soit la visibilité dans les réponses de ChatGPT, Claude, Gemini et Perplexity —, du marketing numérique, des CRM, du code sur mesure, des automatisations et des agents IA pour les entreprises du Québec, du Canada et des États-Unis. Les outils sont d'abord utilisés dans les entreprises du groupe avant d'être offerts aux clients.",
  },
];

const BIO_COURTE =
  "Alexandre Blais est un entrepreneur québécois, fondateur et président de Zeniva Group. Il a lancé Zeniva Travel (agence de voyage IA aux États-Unis) en 2024, puis ZeniPay (fintech), ZeniCorp (plateforme de construction au Québec) et ZeniTech (division technologique). Il vit entre Québec et la côte Est américaine.";

const BIO_LONGUE =
  "Alexandre Blais bâtit des entreprises qui combinent opérations traditionnelles et technologie. Fondateur et président de Zeniva Group, il opère quatre entreprises au Canada et aux États-Unis : Zeniva Travel, une agence de voyage américaine dont l'assistante IA Lina planifie et chiffre des voyages 24/7 ; ZeniPay, une plateforme fintech qui réunit paiements, comptabilité et agents IA financiers ; ZeniCorp, une plateforme de construction et de rénovation au Québec avec un réseau d'entrepreneurs certifiés RBQ ; et ZeniTech, la division technologique qui construit les outils des trois autres avant de les offrir aux PME. Son principe : chaque outil vendu a déjà fait tourner une vraie entreprise avec de vrais clients.";

export default function PressePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${SITE_URL}/presse#page`,
        url: `${SITE_URL}/presse`,
        name: 'Dossier de presse — Zeniva Group',
        description:
          "Faits vérifiables, descriptions officielles des quatre marques, biographie du fondateur, logos et contact médias de Zeniva Group.",
        inLanguage: 'fr-CA',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': GROUP_ID },
        mainEntity: { '@id': GROUP_ID },
        significantLink: NEWS.map((n) => `${SITE_URL}/nouvelles/${n.slug}`),
      },
      {
        '@type': 'Person',
        '@id': FOUNDER_ID,
        name: 'Alexandre Blais',
        jobTitle: 'Fondateur et président, Zeniva Group',
        description: BIO_COURTE,
        worksFor: { '@id': GROUP_ID },
      },
    ],
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="section-padding border-b border-zenicorp-line/70">
        <div className="container-zenicorp max-w-4xl">
          <p className="eyebrow">Dossier de presse</p>
          <h1 className="heading-1 mt-6 text-white">Tout ce qu'il faut pour parler de nous correctement.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75">
            Faits vérifiables, descriptions officielles des quatre marques, biographie du fondateur, logos et contact médias.
            Ces textes sont faits pour être repris tels quels — par un journaliste comme par un moteur de réponse.
          </p>
          <p className="mt-6 font-mono text-label uppercase text-zenicorp-faint">
            Contact médias : {ZENICORP_EMAIL} · {ZENICORP_PHONE}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-zenicorp max-w-4xl">
          <h2 className="heading-2 text-white">Faits</h2>
          <div className="mt-6 overflow-x-auto border border-zenicorp-line">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-zenicorp-line/70">
                {FACTS.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row" className="w-56 bg-zenicorp-surface px-4 py-3 align-top font-semibold text-white">{k}</th>
                    <td className="px-4 py-3 align-top text-white/80">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-zenicorp-line/70 bg-zenicorp-surface/50">
        <div className="container-zenicorp max-w-4xl">
          <h2 className="heading-2 text-white">Les quatre marques — descriptions officielles</h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Version courte pour une brève, version longue pour un encadré « à propos ».
          </p>
          <div className="mt-8 grid gap-5">
            {BRANDS.map((b) => (
              <article key={b.name} className="border border-zenicorp-line bg-zenicorp-void/40 p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="heading-3 text-white">{b.name}</h3>
                  <a href={b.url} className="inline-flex items-center gap-2 font-mono text-label uppercase text-zenicorp-faint hover:text-zenicorp-gold">
                    {b.url.replace('https://', '')} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-2 font-mono text-label uppercase text-zenicorp-faint">{b.legal}</p>
                <p className="mt-4 text-base font-semibold text-white/90">{b.short}</p>
                <p className="mt-3 text-base leading-relaxed text-white/70">{b.long}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-zenicorp-line/70">
        <div className="container-zenicorp max-w-4xl">
          <h2 className="heading-2 text-white">Alexandre Blais, fondateur et président</h2>
          <div className="mt-6 border border-zenicorp-line p-7">
            <p className="font-mono text-label uppercase text-zenicorp-gold">Biographie courte</p>
            <p className="mt-3 text-base leading-relaxed text-white/80">{BIO_COURTE}</p>
          </div>
          <div className="mt-5 border border-zenicorp-line p-7">
            <p className="font-mono text-label uppercase text-zenicorp-gold">Biographie longue</p>
            <p className="mt-3 text-base leading-relaxed text-white/80">{BIO_LONGUE}</p>
          </div>
          <p className="mt-6 text-base text-white/70">
            Profil complet : <Link href="/alexandre-blais" className="underline hover:text-zenicorp-gold">zeniva.ca/alexandre-blais</Link>
          </p>
        </div>
      </section>

      <section className="section-padding border-t border-zenicorp-line/70 bg-zenicorp-surface/50">
        <div className="container-zenicorp max-w-4xl">
          <h2 className="heading-2 text-white">Logos et visuels</h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Utilisation libre pour la couverture éditoriale du groupe et de ses marques, sans modification des couleurs ni des proportions.
          </p>
          <ul className="mt-6 grid gap-2 text-base text-white/80 sm:grid-cols-2">
            <li><a href="/logo-wordmark.png" className="underline hover:text-zenicorp-gold">Logotype Zeniva (PNG)</a></li>
            <li><a href="/logo-mark.png" className="underline hover:text-zenicorp-gold">Symbole Zeniva (PNG)</a></li>
            {divisionsData.map((d) => (
              <li key={d.slug}>
                <a href={d.logo} className="underline hover:text-zenicorp-gold">Logo {d.name} (PNG)</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding border-t border-zenicorp-line/70">
        <div className="container-zenicorp max-w-4xl">
          <h2 className="heading-2 text-white">Annonces</h2>
          <ul className="mt-6 grid gap-3">
            {NEWS.map((n) => (
              <li key={n.slug}>
                <Link href={`/nouvelles/${n.slug}`} className="text-base text-white/80 underline hover:text-zenicorp-gold">
                  {n.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base text-white/70">
            Salles de presse des autres marques :{' '}
            <a href="https://www.zenivatravel.com/news" className="underline hover:text-zenicorp-gold">Zeniva Travel</a> ·{' '}
            <a href="https://zenipay.ca/news" className="underline hover:text-zenicorp-gold">ZeniPay</a>
          </p>
        </div>
      </section>
    </main>
  );
}
