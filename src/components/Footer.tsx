import Link from 'next/link';

const divisions = [
  { name: 'Époxy', href: '/epoxy' },
  { name: 'Asphalte', href: '/asphalte' },
  { name: 'Toiture', href: '/toiture' },
  { name: 'Isolation', href: '/isolation' },
];

export default function Footer() {
  return (
    <footer className="bg-zenicorp-darkGray/60 border-t border-zenicorp-line">
      <div className="container-zenicorp py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-zenicorp-gold flex items-center justify-center">
                <span className="font-heading font-bold text-lg text-zenicorp-black">Z</span>
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-zenicorp-text block">ZeniCorp</span>
                <span className="text-[9px] uppercase tracking-[0.24em] text-zenicorp-dim">Plateforme</span>
              </div>
            </div>
            <p className="body-base mb-6 max-w-xs">
              Votre projet. Notre réseau d'entrepreneurs certifiés. Une seule plateforme technologique.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-zenicorp-text mb-4">Divisions</h4>
            <nav className="space-y-2">
              {divisions.map((d) => (
                <Link key={d.href} href={d.href} className="block text-zenicorp-dim hover:text-zenicorp-gold transition-colors">
                  {d.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-zenicorp-text mb-4">Plateforme</h4>
            <nav className="space-y-2">
              <Link href="/projet" className="block text-zenicorp-dim hover:text-zenicorp-gold transition-colors">Soumettre un projet — 305 $</Link>
              <Link href="/entrepreneur" className="block text-zenicorp-dim hover:text-zenicorp-gold transition-colors">Espace entrepreneur — gratuit</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-zenicorp-text mb-4">Contact</h4>
            <address className="not-italic space-y-2 text-zenicorp-dim">
              <p>Québec, QC, Canada</p>
              <p><a href="tel:+1800555ZENI" className="hover:text-zenicorp-gold transition-colors">1-800-555-ZENI</a></p>
              <p><a href="mailto:info@zenicorp.ca" className="hover:text-zenicorp-gold transition-colors">info@zenicorp.ca</a></p>
            </address>
          </div>
        </div>

        <div className="border-t border-zenicorp-line pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zenicorp-dim">
            © {new Date().getFullYear()} ZeniCorp. Tous droits réservés.
          </p>
          <p className="text-xs text-zenicorp-dim/60">
            Plateforme en développement — bientôt en application mobile (app GO).
          </p>
        </div>
      </div>
    </footer>
  );
}