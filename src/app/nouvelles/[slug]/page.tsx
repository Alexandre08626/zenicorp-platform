import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { NEWS, findNews } from '@/lib/news-data';

const SITE_URL = 'https://www.zeniva.ca';
const AUTHOR_ID = 'https://www.zenivatravel.com/alexandre-blais#person';
const GROUP_ID = `${SITE_URL}/#group`;

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = findNews(params.slug);
  if (!item) return { title: 'Nouvelle introuvable' };
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/nouvelles/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.summary,
      url: `${SITE_URL}/nouvelles/${item.slug}`,
      type: 'article',
      locale: 'fr_CA',
      publishedTime: item.datePublished,
    },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

export default function NewsPage({ params }: { params: { slug: string } }) {
  const item = findNews(params.slug);
  if (!item) notFound();
  const url = `${SITE_URL}/nouvelles/${item.slug}`;

  // NewsArticle signé par le fondateur, publié par le groupe, rattaché à la marque concernée.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NewsArticle',
        '@id': `${url}#article`,
        headline: item.title,
        description: item.summary,
        inLanguage: 'fr-CA',
        datePublished: item.datePublished,
        dateModified: item.datePublished,
        author: { '@id': AUTHOR_ID },
        publisher: { '@id': GROUP_ID },
        about: { '@id': item.aboutId },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleBody: item.paragraphs.join('\n\n'),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Zeniva', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Nouvelles', item: `${SITE_URL}/nouvelles` },
          { '@type': 'ListItem', position: 3, name: item.title, item: url },
        ],
      },
    ],
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="section-padding border-b border-zenicorp-line/70">
        <div className="container-zenicorp max-w-4xl">
          <p className="eyebrow">
            <Link href="/nouvelles" className="hover:text-zenicorp-gold">Nouvelles</Link> · {item.brand}
          </p>
          <h1 className="heading-1 mt-6 text-white">{item.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75">{item.summary}</p>
          <p className="mt-6 font-mono text-label uppercase text-zenicorp-faint">
            {item.dateline} · <time dateTime={item.datePublished}>{formatDate(item.datePublished)}</time>
          </p>
        </div>
      </section>

      <article className="section-padding">
        <div className="container-zenicorp max-w-4xl">
          {item.paragraphs.map((p, i) => (
            <p key={i} className="mt-5 text-base leading-relaxed text-white/80 first:mt-0">{p}</p>
          ))}

          {item.quote && (
            <blockquote className="mt-10 border-l-2 border-zenicorp-gold pl-6">
              <p className="font-heading text-xl leading-relaxed text-white">« {item.quote} »</p>
              <footer className="mt-3 font-mono text-label uppercase text-zenicorp-faint">
                — <Link href="/alexandre-blais" className="underline">Alexandre Blais</Link>, fondateur et président
              </footer>
            </blockquote>
          )}

          <section className="mt-12 border-t border-zenicorp-line/70 pt-8">
            <p className="eyebrow">À propos</p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{item.boilerplate}</p>
            <ul className="mt-6 space-y-2">
              {item.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex items-center gap-2 text-sm text-white/80 underline hover:text-zenicorp-gold">
                    {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-zenicorp-faint">Contact médias : info@zeniva.ca · 581-748-7017</p>
          </section>
        </div>
      </article>
    </main>
  );
}
