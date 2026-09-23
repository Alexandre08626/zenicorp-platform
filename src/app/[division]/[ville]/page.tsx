import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, Phone } from 'lucide-react';
import {
  divisionsData,
  getDivisionBySlug,
  MODEL,
  ZENICORP_EMAIL,
  ZENICORP_PHONE,
  ZENICORP_PHONE_HREF,
} from '@/lib/divisions-data';
import { VILLES, getVille } from '@/lib/villes-data';
import { guidesForDivision } from '@/lib/guides-data';

const SITE_URL = 'https://www.zeniva.ca';
const FOUNDER_ID = 'https://www.zenivatravel.com/alexandre-blais#person';

// Seules les combinaisons division × ville existent : tout autre /a/b est un 404 statique.
export const dynamicParams = false;

export function generateStaticParams() {
  return divisionsData.flatMap((d) => VILLES.map((v) => ({ division: d.slug, ville: v.slug })));
}

export function generateMetadata({ params }: { params: { division: string; ville: string } }): Metadata {
  const d = getDivisionBySlug(params.division);
  const v = getVille(params.ville);
  if (!d || !v) return { title: 'Page introuvable' };
  const title = `${d.short} à ${v.nom} — entrepreneur certifié RBQ`;
  const description = `${d.short} à ${v.nom} et dans la région ${v.region} : soumission gratuite, prix ferme, entrepreneur certifié RBQ qui vous contacte sous ${MODEL.contactDelay}. ${d.positioning}`;
  return {
    title,
    description,
    alternates: { canonical: `/${d.slug}/${v.slug}` },
    openGraph: { title, description, url: `${SITE_URL}/${d.slug}/${v.slug}`, type: 'website', locale: 'fr_CA' },
  };
}

export default function DivisionVillePage({ params }: { params: { division: string; ville: string } }) {
  const d = getDivisionBySlug(params.division);
  const v = getVille(params.ville);
  if (!d || !v) notFound();

  const url = `${SITE_URL}/${d.slug}/${v.slug}`;
  const angle = v.angles[d.slug];
  const guides = guidesForDivision(d.slug);

  // Service local rattaché à l'entité de la division (déclarée dans layout.tsx) et
  // à la ville — c'est ce qui permet à un moteur de réponse de répondre « à Lévis ».
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `${d.short} à ${v.nom}`,
        serviceType: d.name,
        description: `${d.positioning} ${angle}`,
        provider: { '@id': `${SITE_URL}/${d.slug}#organization` },
        areaServed: [
          { '@type': 'City', name: v.nom, address: { '@type': 'PostalAddress', addressLocality: v.nom, addressRegion: 'QC', addressCountry: 'CA' } },
          ...v.secteurs.map((s) => ({ '@type': 'Place', name: s })),
        ],
        availableChannel: {
          '@type': 'ServiceChannel',
          servicePhone: { '@type': 'ContactPoint', telephone: ZENICORP_PHONE, contactType: 'customer service', availableLanguage: ['fr-CA', 'en'] },
          serviceUrl: `${SITE_URL}/projet?division=${d.slug}`,
        },
        offers: {
          '@type': 'Offer',
          description: `Soumission gratuite et sans dépôt. ${MODEL.signingShare} du contrat à la signature, ${MODEL.contractorShare} reversé à l'entrepreneur.`,
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock',
          areaServed: { '@type': 'City', name: v.nom },
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Services ${d.short} à ${v.nom}`,
          itemListElement: d.services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s } })),
        },
      },
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: `${d.short} à ${v.nom}`,
        inLanguage: 'fr-CA',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${url}#service` },
        author: { '@id': FOUNDER_ID },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: `Faites-vous des travaux de ${d.short.toLowerCase()} à ${v.nom} ?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Oui. ${d.name} dessert ${v.nom} et les secteurs environnants (${v.secteurs.join(', ')}). Vous décrivez vos travaux en deux minutes et un entrepreneur certifié RBQ spécialisé vous contacte sous ${MODEL.contactDelay} pour la visite et un prix ferme.`,
            },
          },
          {
            '@type': 'Question',
            name: `La soumission est-elle gratuite à ${v.nom} ?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Oui, la soumission est gratuite et sans dépôt, partout au Québec. Vous payez ${MODEL.signingShare} du contrat à la signature ; l'entrepreneur conserve ${MODEL.contractorShare} du contrat.`,
            },
          },
          {
            '@type': 'Question',
            name: `Les entrepreneurs qui interviennent à ${v.nom} sont-ils certifiés ?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Oui. La licence RBQ et les assurances de chaque entrepreneur sont vérifiées avant toute assignation. Vous pouvez vérifier vous-même n'importe quelle licence gratuitement dans le Registre des détenteurs de licence de la Régie du bâtiment du Québec.`,
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Zeniva', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: d.name, item: `${SITE_URL}/${d.slug}` },
          { '@type': 'ListItem', position: 3, name: v.nom, item: url },
        ],
      },
    ],
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative flex min-h-[52svh] flex-col justify-end overflow-hidden">
        <Image src={d.hero} alt={`Travaux ${d.short.toLowerCase()} à ${v.nom}`} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-zenicorp-void via-zenicorp-void/80 to-zenicorp-void/30" />
        <div className="container-zenicorp relative pb-14 pt-24">
          <p className="eyebrow">
            <Link href={`/${d.slug}`} className="hover:text-zenicorp-gold">{d.name}</Link> · {v.region}
          </p>
          <h1 className="heading-1 mt-6 max-w-3xl text-white">
            {d.short} à {v.nom}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{d.positioning}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/projet?division=${d.slug}`}
              className="inline-flex items-center gap-2.5 px-5 py-3 font-mono text-label uppercase text-zenicorp-black"
              style={{ background: d.color }}
            >
              Soumission gratuite <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={ZENICORP_PHONE_HREF} className="inline-flex items-center gap-2.5 border border-white/25 px-5 py-3 font-mono text-label uppercase text-white">
              <Phone className="h-4 w-4" /> {ZENICORP_PHONE}
            </a>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-zenicorp-line/70">
        <div className="container-zenicorp max-w-4xl">
          <h2 className="heading-2 text-white">Ce qui est particulier à {v.nom}</h2>
          <p className="mt-5 text-base leading-relaxed text-white/75">{v.contexte}</p>
          <p className="mt-5 text-base leading-relaxed text-white/75">{angle}</p>

          <div className="mt-10 border border-zenicorp-line bg-zenicorp-surface/50 p-7">
            <p className="font-mono text-label uppercase" style={{ color: d.color }}>Comment ça fonctionne</p>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              Vous décrivez vos travaux en deux minutes — division, superficie, adresse, contexte. Le réseau assigne un entrepreneur
              spécialisé dont la licence RBQ et les assurances ont été vérifiées, et qui vous contacte sous {MODEL.contactDelay} pour
              la visite et un prix ferme. Aucun dépôt pour soumettre : vous payez {MODEL.signingShare} du contrat à la signature, et
              l'entrepreneur conserve {MODEL.contractorShare}.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-zenicorp-line/70 bg-zenicorp-surface/50">
        <div className="container-zenicorp max-w-4xl">
          <h2 className="heading-2 text-white">Services offerts à {v.nom}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {d.services.map((s) => (
              <li key={s} className="flex gap-3 text-base leading-relaxed text-white/80">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0" style={{ background: d.color }} />
                <span>{s}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-12 font-heading text-lg font-bold text-white">Secteurs desservis</h3>
          <p className="mt-3 text-base leading-relaxed text-white/70">
            {v.nom} et les secteurs environnants : {v.secteurs.join(', ')}.
          </p>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="section-padding border-t border-zenicorp-line/70">
          <div className="container-zenicorp max-w-4xl">
            <p className="eyebrow">Avant de demander une soumission</p>
            {guides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="group mt-6 block border border-zenicorp-line p-7 transition-colors hover:border-zenicorp-gold/60">
                <h2 className="heading-3 text-white">{g.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-white/70">{g.shortAnswer}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-label uppercase text-zenicorp-faint transition-colors group-hover:text-zenicorp-gold">
                  Lire le guide <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section-padding border-t border-zenicorp-line/70 bg-zenicorp-surface/50">
        <div className="container-zenicorp max-w-4xl">
          <h2 className="heading-2 text-white">Questions fréquentes — {v.nom}</h2>
          <dl className="mt-6 divide-y divide-zenicorp-line/70">
            <div className="py-5">
              <dt className="font-heading text-lg font-bold text-white">Faites-vous des travaux de {d.short.toLowerCase()} à {v.nom} ?</dt>
              <dd className="mt-2 text-base leading-relaxed text-white/75">
                Oui. {d.name} dessert {v.nom} et les secteurs environnants ({v.secteurs.join(', ')}). Un entrepreneur certifié RBQ
                spécialisé vous contacte sous {MODEL.contactDelay} pour la visite et un prix ferme.
              </dd>
            </div>
            <div className="py-5">
              <dt className="font-heading text-lg font-bold text-white">La soumission est-elle gratuite à {v.nom} ?</dt>
              <dd className="mt-2 text-base leading-relaxed text-white/75">
                Oui, gratuite et sans dépôt. Vous payez {MODEL.signingShare} du contrat à la signature ; l'entrepreneur conserve {MODEL.contractorShare}.
              </dd>
            </div>
            <div className="py-5">
              <dt className="font-heading text-lg font-bold text-white">Les entrepreneurs sont-ils certifiés ?</dt>
              <dd className="mt-2 text-base leading-relaxed text-white/75">
                Oui. Licence RBQ et assurances vérifiées avant toute assignation — et vous pouvez vérifier n'importe quelle licence
                gratuitement dans le registre de la RBQ.{' '}
                <Link href="/guides/verifier-licence-rbq-entrepreneur" className="underline hover:text-zenicorp-gold">Comment faire</Link>.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section-padding border-t border-zenicorp-line/70">
        <div className="container-zenicorp max-w-4xl">
          <p className="eyebrow">{d.name} — autres villes</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {VILLES.filter((x) => x.slug !== v.slug).map((x) => (
              <Link
                key={x.slug}
                href={`/${d.slug}/${x.slug}`}
                className="border border-zenicorp-line px-4 py-2 font-mono text-label uppercase text-white/70 transition-colors hover:border-zenicorp-gold/60 hover:text-zenicorp-gold"
              >
                {x.nom}
              </Link>
            ))}
          </div>
          <p className="mt-8 text-base text-white/70">
            Autres divisions à {v.nom} :{' '}
            {divisionsData
              .filter((x) => x.slug !== d.slug)
              .map((x, i, arr) => (
                <span key={x.slug}>
                  <Link href={`/${x.slug}/${v.slug}`} className="underline hover:text-zenicorp-gold">{x.short}</Link>
                  {i < arr.length - 1 ? ' · ' : ''}
                </span>
              ))}
          </p>
          <p className="mt-6 font-mono text-label uppercase text-zenicorp-faint">
            {ZENICORP_PHONE} · {ZENICORP_EMAIL}
          </p>
        </div>
      </section>
    </main>
  );
}
