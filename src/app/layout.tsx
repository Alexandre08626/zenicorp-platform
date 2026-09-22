import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import RevealObserver from '@/components/RevealObserver';
import {
  divisionsData,
  MODEL,
  ZENICORP_EMAIL,
  ZENICORP_PHONE,
} from '@/lib/divisions-data';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/** Display architectural : géométrique, technique, sans le côté « mariage » d'un didone. */
const display = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
  variable: '--font-display',
});

/** Annotations type plan technique (numéros d'étapes, labels, chiffres). */
const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono',
});

const SITE_URL = 'https://www.zeniva.ca';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Zeniva — Plateforme de construction et rénovation au Québec',
    template: '%s | Zeniva',
  },
  description: `Zeniva connecte les clients à des entrepreneurs certifiés RBQ : soumission gratuite, ${MODEL.signingShare} du contrat à la signature, ${MODEL.contractorShare} reversé à l'entrepreneur, contact sous ${MODEL.contactDelay}.`,
  keywords: [
    'construction',
    'rénovation',
    'entrepreneur certifié RBQ',
    'Québec',
    'Zeniva',
    'époxy',
    'asphalte',
    'toiture',
    'isolation',
  ],
  authors: [{ name: 'Zeniva' }],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  icons: { icon: '/logo.png', apple: '/logo.png' },
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: SITE_URL,
    siteName: 'Zeniva',
    title: 'Zeniva — Plateforme de construction et rénovation au Québec',
    description:
      "Votre projet. Notre réseau d'entrepreneurs certifiés. Coordonné par une seule plateforme.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zeniva — Plateforme de construction et rénovation',
    description: "Réseau d'entrepreneurs certifiés RBQ au Québec.",
  },
};

export const viewport: Viewport = {
  themeColor: '#F7F7F4',
  width: 'device-width',
  initialScale: 1,
};

const SITE_ID = `${SITE_URL}/#organization`;
const GROUP_ID = `${SITE_URL}/#group`;
const FOUNDER_ID = 'https://www.zenivatravel.com/alexandre-blais#person';

// Graphe d'entités partagé avec zenivatravel.com, zenipay.ca et zenitech.dev (mêmes @id partout).
// zeniva.ca est la plateforme construction ; l'agence de voyage vit uniquement sur zenivatravel.com.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': GROUP_ID,
      name: 'Zeniva Group',
      alternateName: ['Groupe Zeniva'],
      url: `${SITE_URL}/groupe`,
      description:
        "Zeniva Group (Groupe Zeniva) est le groupe fondé par Alexandre Blais. Il regroupe Zeniva Travel (agence de voyage IA, États-Unis), ZeniPay (fintech / banque en ligne, Canada et États-Unis), ZeniCorp (plateforme de construction et rénovation avec réseau d'entrepreneurs certifiés RBQ, Québec) et ZeniTech (division technologique).",
      founder: { '@id': FOUNDER_ID },
      subOrganization: [
        { '@id': 'https://www.zenivatravel.com/#organization' },
        { '@id': 'https://zenipay.ca/#organization' },
        { '@id': SITE_ID },
        { '@id': 'https://zenitech.dev/#organization' },
      ],
    },
    {
      '@type': ['Organization', 'HomeAndConstructionBusiness'],
      '@id': SITE_ID,
      name: 'ZeniCorp',
      alternateName: ['Zeniva Construction', 'Zeniva', 'Plateforme Zeniva', 'ZeniCorp Construction'],
      url: SITE_URL,
      logo: `${SITE_URL}/logo-wordmark.png`,
      email: ZENICORP_EMAIL,
      telephone: ZENICORP_PHONE,
      description: `Plateforme de construction et rénovation au Québec : le client décrit ses travaux, le réseau assigne un entrepreneur certifié RBQ (licence et assurances vérifiées) qui le contacte sous ${MODEL.contactDelay}. Soumission gratuite, prix ferme, ${MODEL.signingShare} du contrat payé à la signature, ${MODEL.contractorShare} reversé à l'entrepreneur. Quatre divisions : époxy, asphalte, toiture, isolation.`,
      parentOrganization: { '@id': GROUP_ID },
      founder: { '@id': FOUNDER_ID },
      areaServed: { '@type': 'AdministrativeArea', name: 'Québec, Canada' },
      address: { '@type': 'PostalAddress', addressRegion: 'QC', addressCountry: 'CA' },
      knowsLanguage: ['fr-CA', 'en'],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: ZENICORP_PHONE,
        email: ZENICORP_EMAIL,
        contactType: 'customer service',
        availableLanguage: ['fr-CA', 'en'],
      },
      subOrganization: divisionsData.map((d) => ({ '@id': `${SITE_URL}/${d.slug}#organization` })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Divisions ZeniCorp',
        itemListElement: divisionsData.map((d) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: d.name, description: d.positioning },
          url: `${SITE_URL}/${d.slug}`,
        })),
      },
    },
    // Une entité par division, ancrée SUR zeniva.ca (c'est ici que le balisage existe).
    // Les sous-domaines (epoxy.zeniva.ca, …) sont déclarés en `url` + `sameAs` : tant qu'ils
    // ne portent pas eux-mêmes de JSON-LD, ancrer l'@id là-bas créerait une référence vide.
    // Quand ils seront balisés, ils devront reprendre exactement ce même @id.
    ...divisionsData.map((d) => ({
      '@type': ['Organization', 'HomeAndConstructionBusiness'],
      '@id': `${SITE_URL}/${d.slug}#organization`,
      name: d.name,
      url: d.site,
      sameAs: [d.site],
      logo: `${SITE_URL}${d.logo}`,
      image: `${SITE_URL}${d.hero}`,
      description: d.positioning,
      telephone: ZENICORP_PHONE,
      email: ZENICORP_EMAIL,
      parentOrganization: { '@id': SITE_ID },
      areaServed: { '@type': 'AdministrativeArea', name: 'Québec, Canada' },
      mainEntityOfPage: `${SITE_URL}/${d.slug}`,
      makesOffer: d.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service },
      })),
    })),
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'ZeniCorp — Plateforme de construction Zeniva',
      inLanguage: 'fr-CA',
      publisher: { '@id': SITE_ID },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr-CA"
      className={`${inter.variable} ${display.variable} ${mono.variable} dark`}
    >
      <body className="flex min-h-screen flex-col bg-zenicorp-void font-sans text-zenicorp-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:bg-zenicorp-gold focus:px-4 focus:py-2 focus:font-semibold focus:text-zenicorp-black"
        >
          Aller au contenu
        </a>
        <SmoothScroll />
        <RevealObserver />
        <Header />
        <div id="contenu" className="flex flex-1 flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
