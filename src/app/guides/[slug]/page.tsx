import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Phone } from 'lucide-react';
import { GUIDES, findGuide } from '@/lib/guides-data';
import { getDivisionBySlug, ZENICORP_PHONE, ZENICORP_PHONE_HREF } from '@/lib/divisions-data';

const SITE_URL = 'https://www.zeniva.ca';
const AUTHOR_ID = 'https://www.zenivatravel.com/alexandre-blais#person';

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = findGuide(params.slug);
  if (!guide) return { title: 'Guide introuvable' };
  const url = `${SITE_URL}/guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.tags,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      type: 'article',
      locale: 'fr_CA',
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
    },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = findGuide(params.slug);
  if (!guide) notFound();
  const division = getDivisionBySlug(guide.division)!;
  const url = `${SITE_URL}/guides/${guide.slug}`;

  // Article + FAQPage rattachés à l'entité de la division et signés par le fondateur
  // (Person @id partagé) — les moteurs IA pèsent un auteur humain nommé plus qu'une marque.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: guide.title,
        description: guide.description,
        inLanguage: 'fr-CA',
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        author: { '@id': AUTHOR_ID },
        publisher: { '@id': `${SITE_URL}/#organization` },
        about: { '@id': `${division.site}/#organization` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        keywords: guide.tags.join(', '),
        citation: guide.sources.map((s) => ({ '@type': 'CreativeWork', name: s.name, url: s.url })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        about: { '@id': `${division.site}/#organization` },
        mainEntity: guide.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Zeniva', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Guides de prix', item: `${SITE_URL}/guides` },
          { '@type': 'ListItem', position: 3, name: guide.title, item: url },
        ],
      },
    ],
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="section-padding relative border-b border-zenicorp-line/70">
        <div className="container-zenicorp max-w-4xl">
          <p className="eyebrow">
            <Link href="/guides" className="hover:text-zenicorp-gold">Guides de prix</Link> · {division.short} · {guide.readingMinutes} min
          </p>
          <h1 className="heading-1 mt-6 text-white">{guide.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75">{guide.description}</p>
          <p className="mt-6 font-mono text-label uppercase text-zenicorp-faint">
            Par <Link href="/alexandre-blais" className="underline">Alexandre Blais</Link>, fondateur · Mis à jour le{' '}
            <time dateTime={guide.dateModified}>{formatDate(guide.dateModified)}</time>
          </p>
        </div>
      </section>

      <article className="section-padding">
        <div className="container-zenicorp max-w-4xl">
          <div className="border border-zenicorp-gold/40 bg-zenicorp-surface/60 p-7">
            <p className="font-mono text-label uppercase text-zenicorp-gold">Réponse courte</p>
            <p className="mt-3 text-lg leading-relaxed text-white">{guide.shortAnswer}</p>
          </div>

          <div className="mt-12">
            <h2 className="heading-3 text-white">À retenir</h2>
            <ul className="mt-5 space-y-3 text-base leading-relaxed text-white/80">
              {guide.keyTakeaways.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-zenicorp-gold" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {guide.sections.map((s) => (
            <section key={s.h} className="mt-14">
              <h2 className="heading-2 text-white">{s.h}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="mt-5 text-base leading-relaxed text-white/75">{p}</p>
              ))}
              {s.table && (
                <div className="mt-6 overflow-x-auto border border-zenicorp-line">
                  <table className="w-full text-left text-sm">
                    <caption className="px-4 py-3 text-left font-mono text-label uppercase text-zenicorp-faint">{s.table.caption}</caption>
                    <thead className="bg-zenicorp-surface text-white">
                      <tr>
                        {s.table.columns.map((c) => (
                          <th key={c} scope="col" className="px-4 py-3 font-semibold">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zenicorp-line/70 text-white/80">
                      {s.table.rows.map((row, ri) => (
                        <tr key={ri}>
                          {row.map((cell, ci) => (
                            <td key={ci} className="px-4 py-3 align-top">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

          <section className="mt-14">
            <h2 className="heading-2 text-white">Questions fréquentes</h2>
            <dl className="mt-6 divide-y divide-zenicorp-line/70">
              {guide.faq.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="font-heading text-lg font-bold text-white">{f.q}</dt>
                  <dd className="mt-2 text-base leading-relaxed text-white/75">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-14 border border-zenicorp-line bg-zenicorp-surface/50 p-8">
            <p className="eyebrow">{division.name}</p>
            <h2 className="heading-3 mt-4 text-white">Prix ferme, entrepreneur certifié RBQ, contact sous 24 h.</h2>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href={`/projet?division=${division.slug}`}
                className="inline-flex items-center gap-2.5 bg-zenicorp-gold px-5 py-3 font-mono text-label uppercase text-zenicorp-black"
              >
                Soumettre mon projet <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={ZENICORP_PHONE_HREF} className="inline-flex items-center gap-2.5 border border-zenicorp-line px-5 py-3 font-mono text-label uppercase text-white">
                <Phone className="h-4 w-4" /> {ZENICORP_PHONE}
              </a>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-lg font-bold text-white">Sources</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {guide.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-zenicorp-gold">{s.name}</a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-zenicorp-faint">
              Les fourchettes sont des prix de marché compilés à partir des sources ci-dessus le {formatDate(guide.dateModified)} ; elles ne constituent pas une soumission Zeniva. Chaque projet est chiffré individuellement après visite.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
