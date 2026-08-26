import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { divisionsData } from '@/lib/divisions-data';
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

export const metadata: Metadata = {
  metadataBase: new URL('https://zenicorp.ca'),
  title: {
    default: 'ZeniCorp — Le futur de la construction, piloté par IA',
    template: '%s | ZeniCorp',
  },
  description:
    'ZeniCorp est la plateforme technologique qui connecte les clients et les entrepreneurs certifiés du Québec. Soumission gratuite, redirection vers la bonne division, et 30 % seulement à la signature du contrat.',
  keywords: ['construction', 'rénovation', 'entrepreneur', 'Québec', 'ZeniCorp', 'époxy', 'asphalte', 'toiture', 'isolation'],
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: 'https://zenicorp.ca',
    siteName: 'ZeniCorp',
    title: 'ZeniCorp — Le futur de la construction, piloté par IA',
    description:
      'Vous soumettez votre projet, gratuitement. Notre système IA sélectionne l\'entrepreneur idéal.',
    images: [{ url: '/og/zenicorp.jpg', width: 1200, height: 630, alt: 'ZeniCorp' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#060607',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${inter.variable} ${space.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col bg-black text-white">
        <header className="sticky top-0 z-50 border-b border-line/60 bg-black/70 backdrop-blur-xl">
          <div className="container-z flex items-center justify-between py-3.5">
            <a href="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="ZeniCorp" className="h-9 w-auto" />
            </a>
            <nav className="hidden md:flex items-center gap-8">
              <a href="/#modele" className="text-sm text-muted hover:text-white transition-colors">Le modèle</a>
              <a href="/#divisions" className="text-sm text-muted hover:text-white transition-colors">Divisions</a>
              <a href="/entrepreneur" className="text-sm text-muted hover:text-white transition-colors">Entrepreneurs</a>
              <a href="/projet" className="btn-primary btn-sm">Soumettre un projet</a>
            </nav>
            <a href="/projet" className="md:hidden btn-primary btn-sm">Projet</a>
          </div>
        </header>

        {children}

        <footer className="relative border-t border-line bg-black2 overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />
          <div className="relative container-z py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="md:col-span-2">
                <a href="/" className="flex items-center gap-2.5 mb-4">
                  <img src="/logo.png" alt="ZeniCorp" className="h-8 w-auto" />
                </a>
                <p className="text-sm text-muted leading-relaxed max-w-sm">
                  La plateforme technologique qui connecte les clients et les entrepreneurs certifiés du Québec.
                  ZeniCorp trouve les leads, sélectionne l'entrepreneur idéal par IA et gère la facturation.
                  L'entrepreneur garde 70 % de chaque contrat.
                </p>
                <p className="mt-4 text-sm text-silver">
                  <span className="text-muted">Une question ? Appelez-nous :</span>{' '}
                  <a href="tel:5817487017" className="text-cyan hover:text-cyanBright font-semibold">581-748-7017</a>
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-silver uppercase tracking-widest mb-4">Divisions</h4>
                <ul className="space-y-2.5">
                  {divisionsData.map((d) => (
                    <li key={d.slug}>
                      <a href={d.site} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-white transition-colors">
                        {d.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-silver uppercase tracking-widest mb-4">Plateforme</h4>
                <ul className="space-y-2.5">
                  <li><a href="/projet" className="text-sm text-muted hover:text-white transition-colors">Soumettre un projet</a></li>
                  <li><a href="/entrepreneur" className="text-sm text-muted hover:text-white transition-colors">Espace entrepreneur — gratuit</a></li>
                  <li><a href="/#modele" className="text-sm text-muted hover:text-white transition-colors">Le modèle 70/30</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-dim">© {new Date().getFullYear()} ZeniCorp. Tous droits réservés.</p>
              <p className="text-[10px] tracking-widest text-dim uppercase">Le futur de la construction · Propulsé par ZeniCorp AI</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
