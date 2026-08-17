import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

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
    default: 'ZeniCorp - Votre projet. Notre expertise.',
    template: '%s | ZeniCorp',
  },
  description: 'ZeniCorp simplifie vos projets de construction en vous donnant accès à un réseau d\'entrepreneurs spécialisés, coordonné par une plateforme technologique centralisée.',
  keywords: ['construction', 'rénovation', 'entrepreneur', 'Québec', 'ZeniCorp', 'époxy', 'asphalte', 'toiture', 'isolation'],
  authors: [{ name: 'ZeniCorp' }],
  creator: 'ZeniCorp',
  publisher: 'ZeniCorp',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: 'https://zenicorp.ca',
    siteName: 'ZeniCorp',
    title: 'ZeniCorp - Votre projet. Notre expertise.',
    description: 'ZeniCorp simplifie vos projets de construction en vous donnant accès à un réseau d\'entrepreneurs spécialisés.',
    images: [
      {
        url: '/og/zenicorp.jpg',
        width: 1200,
        height: 630,
        alt: 'ZeniCorp - Construction network',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZeniCorp - Votre projet. Notre expertise.',
    description: 'Réseau d\'entrepreneurs spécialisés en construction au Québec.',
    images: ['/og/zenicorp.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
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
    <html lang="fr-CA" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/logos/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logos/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-zenicorp-black/95 backdrop-blur border-b border-zenicorp-darkGray">
          <div className="container-zenicorp flex items-center justify-between py-4">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl font-heading font-bold text-white">
                Zeni<span className="text-zenicorp-gold">Corp</span>
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-8">
              <a href="/#nos-divisions" className="text-sm text-zenicorp-silver hover:text-zenicorp-gold transition-colors">Nos divisions</a>
              <a href="/entrepreneur" className="text-sm text-zenicorp-silver hover:text-zenicorp-gold transition-colors">Entrepreneurs</a>
              <a href="/projet" className="btn-gold text-sm px-6 py-3">SOUMETTRE UN PROJET</a>
            </nav>
            <a href="/projet" className="md:hidden btn-gold text-sm px-4 py-2">MON PROJET</a>
          </div>
        </header>
        {children}
        <footer className="bg-zenicorp-black border-t border-zenicorp-darkGray">
          <div className="container-zenicorp py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <div className="text-xl font-heading font-bold text-white mb-4">
                  Zeni<span className="text-zenicorp-gold">Corp</span>
                </div>
                <p className="text-sm text-zenicorp-silver leading-relaxed">
                  La plateforme de rénovation qui connecte clients et entrepreneurs certifiés.
                  Dépôt client de 305 $, inscription entrepreneur gratuite, chèque de 70 % par contrat.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Nos divisions</h4>
                <ul className="space-y-2">
                  <li><a href="/epoxy" className="text-sm text-zenicorp-silver hover:text-zenicorp-gold transition-colors">ZeniCorp Epoxy</a></li>
                  <li><a href="/asphalte" className="text-sm text-zenicorp-silver hover:text-zenicorp-gold transition-colors">ZeniCorp Asphalte</a></li>
                  <li><a href="/toiture" className="text-sm text-zenicorp-silver hover:text-zenicorp-gold transition-colors">ZeniCorp Toiture</a></li>
                  <li><a href="/isolation" className="text-sm text-zenicorp-silver hover:text-zenicorp-gold transition-colors">ZeniCorp Isolation</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Plateforme</h4>
                <ul className="space-y-2">
                  <li><a href="/projet" className="text-sm text-zenicorp-silver hover:text-zenicorp-gold transition-colors">Soumettre un projet — 305 $</a></li>
                  <li><a href="/entrepreneur" className="text-sm text-zenicorp-silver hover:text-zenicorp-gold transition-colors">Espace entrepreneur — gratuit</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-zenicorp-darkGray text-center">
              <p className="text-xs text-zenicorp-silver/60">
                © {new Date().getFullYear()} ZeniCorp. Tous droits réservés. Plateforme en développement — bientôt en application mobile (app GO).
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}