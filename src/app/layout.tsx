import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
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
    <html lang="fr-CA" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-zenicorp-black text-zenicorp-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-zenicorp-gold focus:text-zenicorp-black focus:font-semibold"
        >
          Aller au contenu
        </a>
        <Header />
        <div id="contenu" className="flex flex-col flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
