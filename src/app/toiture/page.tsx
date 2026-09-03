import { Metadata } from 'next';
import Link from 'next/link';
import { getDivisionBySlug } from '@/lib/divisions-data';
import { ArrowRight, ChevronRight } from 'lucide-react';

const division = getDivisionBySlug('toiture')!;

export const metadata: Metadata = {
  title: division.name,
  description: division.positioning,
  openGraph: { title: division.name, description: division.positioning, images: ['/og/' + division.slug + '.jpg'] },
};

export default function DivisionPage() {
  if (!division) return null;
  return (
    <main className="flex-1 bg-zenicorp-black">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-zenicorp-darkGray">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-[0.06]" />
        <div className="absolute inset-0 bg-gradient-to-t from-zenicorp-black via-transparent to-transparent" />
        <div className="relative container-zenicorp z-10 text-zenicorp-text py-24">
          <Link href="/" className="inline-flex items-center gap-1 mb-6 text-zenicorp-gold hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180" /> Retour à ZeniCorp
          </Link>
          <span className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-md text-xs font-semibold border" style={{ color: division.color, borderColor: division.color + '55', background: division.color + '11' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: division.color }}></span>Division ZeniCorp
          </span>
          <h1 className="heading-1 mb-4">{division.name}</h1>
          <p className="text-xl text-zenicorp-text/80 max-w-3xl leading-relaxed mb-8">{division.positioning}</p>
          <Link href="/projet" className="btn-gold text-lg px-10 py-5">DEMANDER UNE SOUMISSION</Link>
        </div>
      </section>

      <section className="section-padding bg-zenicorp-surface">
        <div className="container-zenicorp">
          <header className="max-w-2xl mb-16">
            <span className="badge-gold mb-4">Nos services</span>
            <h2 className="heading-2 mt-2">{division.name} — Spécialités</h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {division.services.map((service) => (
              <article key={service} className="card p-6 group">
                <div className="text-4xl mb-4">{division.icon}</div>
                <h3 className="heading-3 mb-2">{service}</h3>
                <p className="body-base">Service professionnel réalisé par nos entrepreneurs certifiés RBQ.</p>
                <Link href="/projet" className="inline-flex items-center gap-2 mt-4 text-zenicorp-gold font-medium group-hover:gap-3 transition-all">
                  Soumission <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-zenicorp-black">
        <div className="container-zenicorp">
          <header className="max-w-2xl mb-16">
            <span className="badge-gold mb-4">Notre processus</span>
            <h2 className="heading-2 mt-2">De la demande à la réalisation</h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Soumission détaillée', desc: 'Analyse de votre projet, prix ferme et détaillé.', step: 1 },
              { title: 'Planification', desc: 'Sélection de l\'entrepreneur, calendrier des travaux.', step: 2 },
              { title: 'Réalisation & Suivi', desc: 'Travaux supervisés, photos, inspection finale.', step: 3 },
            ].map((item) => (
              <div key={item.title} className="relative card p-8">
                <span className="absolute top-4 right-6 text-6xl font-heading font-bold text-zenicorp-gold/10">{item.step}</span>
                <h3 className="heading-3 mb-3">{item.title}</h3>
                <p className="body-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-zenicorp-black text-center">
        <div className="container-zenicorp">
          <h2 className="heading-2 text-white mb-6">Prêt pour votre projet {division.name.toLowerCase()} ?</h2>
          <p className="body-large text-zenicorp-dim mb-10 max-w-2xl mx-auto">Soumission gratuite, sans engagement. Rappel sous 24h.</p>
          <Link href="/projet" className="btn-gold text-lg px-10 py-5">DEMANDER MA SOUMISSION</Link>
        </div>
      </section>
    </main>
  );
}
