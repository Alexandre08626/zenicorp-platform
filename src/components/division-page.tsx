import Link from 'next/link';
import { DivisionData } from '@/lib/divisions-data';

export default function DivisionPage({ division }: { division: DivisionData }) {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80`}
            alt={division.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
          <div className="absolute inset-0 bg-mesh opacity-50" />
        </div>

        <div className="relative container-z z-10 text-center py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan hover:text-cyanBright transition-colors mb-8">
            <span>←</span> Retour à la plateforme
          </Link>
          <h1 className="heading-1 mb-5">
            <span className="text-gradient">{division.name}</span>
          </h1>
          <p className="body-large max-w-2xl mx-auto mb-9">{division.positioning}</p>
          <Link href={division.site} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-10 py-5">
            Visiter le site {division.name.replace('ZeniCorp ', '')}
          </Link>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section-pad bg-black2">
        <div className="container-z">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">Nos services</span>
            <h2 className="heading-2 mt-5">Spécialités {division.name.replace('ZeniCorp ', '')}</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {division.services.map((service) => (
              <article key={service} className="glass glass-hover p-6">
                <div className="text-lg font-semibold text-cyan mb-1">›</div>
                <h3 className="heading-3 mb-2">{service}</h3>
                <p className="body-base text-sm">
                  Réalisé par nos entrepreneurs certifiés RBQ, jumelés via le système ZeniCorp.
                </p>
                <a
                  href={division.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-cyan font-semibold text-sm group"
                >
                  En savoir plus
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="section-pad bg-black">
        <div className="container-z">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">Notre processus</span>
            <h2 className="heading-2 mt-5">De la demande à la réalisation</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { t: 'Soumission', d: 'Décrivez votre projet, gratuitement. Vous êtes redirigé vers la bonne division pour un RDV.', n: '01' },
              { t: 'Planification', d: 'Visite sur site, prix ferme, calendrier des travaux, commande des matériaux.', n: '02' },
              { t: 'Réalisation', d: 'Travaux réalisés par l\'entrepreneur, supervisés par la plateforme.', n: '03' },
              { t: 'Signature', d: 'Soumission acceptée et contrat signé. ZeniCorp prend 30 %, l\'entrepreneur garde 70 %.', n: '04' },
            ].map((item) => (
              <div key={item.n} className="glass glass-hover p-7">
                <div className="text-sm font-semibold text-cyan mb-4">PHASE {item.n}</div>
                <h3 className="heading-3 mb-3">{item.t}</h3>
                <p className="body-base text-sm">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-pad bg-black2">
        <div className="container-z max-w-3xl">
          <header className="text-center mb-14">
            <span className="eyebrow">Questions fréquentes</span>
            <h2 className="heading-2 mt-5">FAQ {division.name}</h2>
          </header>

          <div className="space-y-4">
            {[
              { q: 'Qui réalise mes travaux ?', a: 'Un entrepreneur certifié de notre réseau, sélectionné par notre système selon votre secteur et votre job. Vous gardez vos garanties et le suivi ZeniCorp.' },
              { q: 'Combien ça coûte pour commencer ?', a: 'La soumission est 100 % gratuite. Vous ne payez que lorsque la soumission est acceptée et le contrat signé.' },
              { q: 'Quand l\'entrepreneur reçoit-il son paiement ?', a: 'L\'entrepreneur garde 70 % du montant du contrat. ZeniCorp prélève 30 % à la signature du contrat.' },
            ].map((item) => (
              <details key={item.q} className="group glass p-6 open:border-cyan/30 transition-colors">
                <summary className="heading-3 flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span className="text-lg">{item.q}</span>
                  <span className="text-cyan text-xl transition-transform group-open:rotate-45 flex-shrink-0">+</span>
                </summary>
                <p className="body-base text-sm mt-4 border-t border-line pt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-black overflow-hidden text-center">
        <div className="absolute inset-0 bg-mesh opacity-60" />
        <div className="relative container-z">
          <h2 className="heading-2 max-w-3xl mx-auto mb-6">
            Prêt pour votre projet <span className="text-gradient">{division.name.replace('ZeniCorp ', '')}</span> ?
          </h2>
          <p className="body-large max-w-2xl mx-auto mb-10">
            Soumission gratuite, RDV dans la bonne division, 30 % seulement à la signature du contrat.
          </p>
          <a href={division.site} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-10 py-5">
            Visiter le site {division.name.replace('ZeniCorp ', '')}
          </a>
        </div>
      </section>
    </main>
  );
}
