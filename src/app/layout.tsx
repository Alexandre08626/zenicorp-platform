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
    default: 'ZeniCorp — Plateforme de construction et rénovation au Québec',
    template: '%s | ZeniCorp',
  },
  description: `ZeniCorp connecte les clients à des entrepreneurs certifiés RBQ : dépôt unique de ${MODEL.deposit}, inscription entrepreneur gratuite, ${MODEL.contractorShare} du contrat à l'entrepreneur, contact sous ${MODEL.contactDelay}.`,
  keywords: [
    'construction',
    'rénovation',
    'entrepreneur certifié RBQ',
    'Québec',
    'ZeniCorp',
    'époxy',
    'asphalte',
    'toiture',
    'isolation',
  ],
  authors: [{ name: 'ZeniCorp' }],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  icons: { icon: '/logo.png', apple: '/logo.png' },
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: SITE_URL,
    siteName: 'ZeniCorp',
    title: 'ZeniCorp — Plateforme de construction et rénovation au Québec',
    description:
      "Votre projet. Notre réseau d'entrepreneurs certifiés. Coordonné par une seule plateforme.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZeniCorp — Plateforme de construction et rénovation',
    description: "Réseau d'entrepreneurs certifiés RBQ au Québec.",
  },
};

export const viewport: Viewport = {
  themeColor: '#05070B',
  width: 'device-width',
  initialScale: 1,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ZeniCorp',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: ZENICORP_EMAIL,
  telephone: ZENICORP_PHONE,
  areaServed: { '@type': 'AdministrativeArea', name: 'Québec, Canada' },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: ZENICORP_PHONE,
    contactType: 'customer service',
    availableLanguage: ['fr-CA', 'en'],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Divisions ZeniCorp',
    itemListElement: divisionsData.map((d) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: d.name, description: d.positioning },
      url: `${SITE_URL}/${d.slug}`,
    })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr-CA"
      className={`${inter.variable} ${display.variable} ${mono.variable} dark`}
    >
      <body className="flex min-h-screen flex-col bg-zenicorp-black font-sans text-zenicorp-text antialiased">
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
