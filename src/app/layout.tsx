import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, Orbitron } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const space = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zenicorp.ca'),
  title: {
    default: 'ZeniCorp — Le futur de la construction, piloté par IA',
    template: '%s | ZeniCorp',
  },
  description:
    "ZeniCorp est la plateforme technologique qui connecte les clients et les entrepreneurs certifiés du Québec. Vous soumettez votre projet, notre système IA sélectionne l'entrepreneur idéal, et vous gardez vos garanties. Inscription entrepreneur gratuite, chèque de 70 % par contrat.",
  keywords: [
    'construction',
    'rénovation',
    'entrepreneur',
    'Québec',
    'ZeniCorp',
    'époxy',
    'asphalte',
    'toiture',
    'isolation',
    'plateforme IA',
  ],
  authors: [{ name: 'ZeniCorp' }],
  creator: 'ZeniCorp',
  publisher: 'ZeniCorp',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: 'https://zenicorp.ca',
    siteName: 'ZeniCorp',
    title: 'ZeniCorp — Le futur de la construction, piloté par IA',
    description:
      'Vous soumettez votre projet. Notre système IA sélectionne l\'entrepreneur idéal. Chèque de 70 % pour l\'entrepreneur, garanties pour le client.',
    images: [
      {
        url: '/og/zenicorp.jpg',
        width: 1200,
        height: 630,
        alt: 'ZeniCorp - Le futur de la construction',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZeniCorp — Le futur de la construction',
    description: 'Plateforme IA connectant clients et entrepreneurs certifiés au Québec.',
    images: ['/og/zenicorp.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#050505',
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
    <html lang="fr-CA" className={`${inter.variable} ${space.variable} ${orbitron.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col bg-zenicorp-black text-white">
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-line">
          <div className="container-zenicorp flex items-center justify-between py-3.5">
            <a href="/" className="flex items-center gap-2 group">
              <img src="/logo.png" alt="ZeniCorp" className="h-9 w-auto drop-shadow-[0_0_12px_rgba(0,229,255,0.35)]" />
            </a>

            <nav className="hidden md:flex items-center gap-9">
              <a href="/#modele" className="text-sm text-silver hover:text-cyanBright transition-colors">Le modèle</a>
              <a href="/#divisions" className="text-sm text-silver hover:text-cyanBright transition-colors">Divisions</a>
              <a href="/entrepreneur" className="text-sm text-silver hover:text-cyanBright transition-colors">Entrepreneurs</a>
              <a href="/projet" className="btn-cyan btn-sm">Soumettre un projet</a>
            </nav>

            <a href="/projet" className="md:hidden btn-cyan btn-sm">Mon projet</a>
          </div>
        </header>

        {children}

        <footer className="relative bg-black border-t border-line overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40 bg-grid-fade pointer-events-none" />
          <div className="relative container-zenicorp py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="md:col-span-2">
                <a href="/" className="flex items-center gap-2 mb-4">
                  <img src="/logo.png" alt="ZeniCorp" className="h-8 w-auto drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]" />
                </a>
                <p className="text-sm text-muted leading-relaxed max-w-sm">
                  La plateforme technologique qui connecte les clients et les entrepreneurs certifiés du Québec.
                  ZeniCorp trouve les leads, sélectionne l'entrepreneur idéal par IA et gère la facturation.
                  L'entrepreneur garde 70 % de chaque contrat.
                </p>
                <p className="mt-4 text-sm text-silver">
                  <span className="text-muted">Une question ? Appelez-nous :</span>{' '}
                  <a href="tel:5817487017" className="text-cyanBright hover:text-cyan font-semibold">581-748-7017</a>
                </p>
              </div>

              <div>
                <h4 className="font-tech text-xs font-semibold text-cyanBright uppercase tracking-widest mb-4">Divisions</h4>
                <ul className="space-y-2.5">
                  <li><a href="/epoxy" className="text-sm text-silver hover:text-cyanBright transition-colors">ZeniCorp Epoxy</a></li>
                  <li><a href="/asphalte" className="text-sm text-silver hover:text-cyanBright transition-colors">ZeniCorp Asphalte</a></li>
                  <li><a href="/toiture" className="text-sm text-silver hover:text-cyanBright transition-colors">ZeniCorp Toiture</a></li>
                  <li><a href="/isolation" className="text-sm text-silver hover:text-cyanBright transition-colors">ZeniCorp Isolation</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-tech text-xs font-semibold text-cyanBright uppercase tracking-widest mb-4">Plateforme</h4>
                <ul className="space-y-2.5">
                  <li><a href="/projet" className="text-sm text-silver hover:text-cyanBright transition-colors">Soumettre un projet</a></li>
                  <li><a href="/entrepreneur" className="text-sm text-silver hover:text-cyanBright transition-colors">Espace entrepreneur — gratuit</a></li>
                  <li><a href="/#modele" className="text-sm text-silver hover:text-cyanBright transition-colors">Le modèle 70/30</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-dim">
                © {new Date().getFullYear()} ZeniCorp. Tous droits réservés.
              </p>
              <p className="font-tech text-[10px] tracking-widest text-dim uppercase">
                Le futur de la construction · Propulsé par ZeniCorp AI
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
