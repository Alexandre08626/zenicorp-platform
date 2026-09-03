import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

export const metadata: Metadata = {
  title: {
    default: 'ZeniCorp — Plateforme de construction technologique',
    template: '%s | ZeniCorp',
  },
  description: 'ZeniCorp connecte clients et entrepreneurs certifiés : dépôt unique de 305 $, inscription gratuite, 70 % à l\'entrepreneur, paiements sécurisés et suivi en temps réel.',
  keywords: ['construction', 'rénovation', 'entrepreneur', 'Québec', 'ZeniCorp', 'époxy', 'asphalte', 'toiture', 'isolation', 'plateforme'],
  authors: [{ name: 'ZeniCorp' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: 'https://www.zeniva.ca',
    siteName: 'ZeniCorp',
    title: 'ZeniCorp — Plateforme de construction technologique',
    description: 'Votre projet. Notre réseau d\'entrepreneurs certifiés. Coordonné par la technologie.',
    images: [{ url: '/og/zenicorp.jpg', width: 1200, height: 630, alt: 'ZeniCorp - Construction network' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZeniCorp — Plateforme de construction technologique',
    description: 'Réseau d\'entrepreneurs spécialisés en construction au Québec.',
    images: ['/og/zenicorp.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#05070B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr-CA" className={`${inter.variable} ${playfair.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/logos/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col bg-zenicorp-black text-zenicorp-text antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}