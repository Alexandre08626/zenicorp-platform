import { Metadata } from 'next';
import Link from 'next/link';
import { getDivisionBySlug } from '@/lib/divisions-data';

const division = getDivisionBySlug('epoxy')!;

export const metadata: Metadata = {
  title: division.name,
  description: division.positioning,
  openGraph: {
    title: division.name,
    description: division.positioning,
    images: [`/og/${division.slug}.jpg`],
  },
};

export default function EpoxyPage() {
  if (!division) return null;

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden" style={{ background: division.gradient }}>
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative container-zenicorp z-10 text-center text-white">
          <Link href="/" className="inline-block mb-6 text-zenicorp-gold hover:text-white transition-colors">
            ← Retour à la plateforme ZeniCorp
          </Link>
          <h1 className="heading-1 mb-4">{division.name}</h1>
          <p className="text-xl sm:text-2xl text-zenicorp-silver/90 max-w-3xl mx-auto leading-relaxed mb-8">
            {division.positioning}
          </p>
          <Link href="/projet" className="btn-gold text-lg px-10 py-5">
            SOUMETTRE MON PROJET — DÉPÔT 305 $
          </Link>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section-padding bg-white">
        <div className="container-zenicorp">
          <header className="text-center mb-16">
            <span className="text-zenicorp-gold font-medium tracking-wider uppercase text-sm">Nos services</span>
            <h2 className="heading-2 mt-2">{division.name} — Spécialités</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {division.services.map((service) => (
              <article key={service} className="card p-6 group">
                <div className="text-4xl mb-4">{division.icon}</div>
                <h3 className="heading-3 mb-2">{service}</h3>
                <p className="body-base text-zenicorp-mediumGray">
                  Service professionnel réalisé par nos entrepreneurs certifiés RBQ.
                </p>
                <Link href="/projet" className="inline-flex items-center gap-2 mt-4 text-zenicorp-gold font-medium hover:text-zenicorp-black transition-colors">
                  Soumettre un projet
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="section-padding bg-zenicorp-lightGray">
        <div className="container-zenicorp">
          <header className="text-center mb-16">
            <span className="text-zenicorp-gold font-medium tracking-wider uppercase text-sm">Notre processus</span>
            <h2 className="heading-2 mt-2">De la demande à la réalisation</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Soumission', desc: 'Décrivez votre projet et payez le dépôt de 305 $. Un entrepreneur certifié est jumelé sous 24 h.', step: 1 },
              { title: 'Planification', desc: 'Visite sur site, prix ferme, calendrier des travaux, commande des matériaux.', step: 2 },
              { title: 'Réalisation', desc: 'Travaux réalisés par l\'entrepreneur, supervisés par la plateforme, photos à chaque étape.', step: 3 },
              { title: 'Paiement', desc: 'Vous payez le solde à la complétion. L\'entrepreneur reçoit son chèque de 70 %.', step: 4 },
            ].map((item) => (
              <div key={item.title} className="card p-8 relative">
                <span className="absolute -top-3 -right-3 text-6xl font-heading font-bold text-zenicorp-gold/10">{item.step}</span>
                <h3 className="heading-3 mb-3">{item.title}</h3>
                <p className="body-base text-zenicorp-mediumGray">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding bg-white">
        <div className="container-zenicorp max-w-3xl">
          <header className="text-center mb-16">
            <span className="text-zenicorp-gold font-medium tracking-wider uppercase text-sm">Questions fréquentes</span>
            <h2 className="heading-2 mt-2">FAQ {division.name}</h2>
          </header>

          <dl className="space-y-4">
            {[
              { q: 'Combien coûte un revêtement époxy ?', a: 'Le prix varie selon la surface, l\'état du béton et le type de produit. À partir de 7 $/pi² pour l\'époxy standard. Le dépôt de 305 $ réserve votre projet.' },
              { q: 'Combien de temps ça prend ?', a: 'Généralement 2-3 jours pour un garage standard (préparation + application + séchage).' },
              { q: 'Est-ce que c\'est glissant ?', a: 'Nous ajoutons des additifs antidérapants selon l\'usage (plus agressif pour garage, plus doux pour intérieur).' },
              { q: 'Qui réalise mes travaux ?', a: 'Un entrepreneur certifié de notre réseau, jumelé via la plateforme. Vous gardez vos garanties et le suivi ZeniCorp.' },
            ].map((item, index) => (
              <div key={index} className="card p-6 group">
                <dt className="heading-3 flex items-center justify-between cursor-pointer">
                  {item.q}
                  <svg className="w-5 h-5 text-zenicorp-gold transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </dt>
                <dd className="body-base text-zenicorp-mediumGray mt-2">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-zenicorp-black text-center">
        <div className="container-zenicorp">
          <h2 className="heading-2 text-white mb-6">Prêt pour votre projet {division.name} ?</h2>
          <p className="body-large text-zenicorp-silver mb-10 max-w-2xl mx-auto">
            Dépôt de 305 $, entrepreneur jumelé sous 24 h, job complétée et garantie.
          </p>
          <Link href="/projet" className="btn-gold text-lg px-10 py-5">
            SOUMETTRE MON PROJET
          </Link>
        </div>
      </section>
    </main>
  );
}