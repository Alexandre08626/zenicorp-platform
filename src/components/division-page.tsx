import Link from 'next/link';
import { DivisionData } from '@/lib/divisions-data';

export default function DivisionPage({ division }: { division: DivisionData }) {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-grid opacity-60 animate-grid-pan bg-grid-fade" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-cyan/10 blur-[130px] animate-pulse-glow" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

        <div className="relative container-zenicorp z-10 text-center py-20">
          <Link href="/" className="inline-flex items-center gap-2 text-cyanBright hover:text-cyan transition-colors mb-8">
            <span>←</span> Retour à la plateforme
          </Link>
          <div className="w-16 h-16 mx-auto grid place-items-center rounded-2xl bg-panel2 border border-cyan/30 text-4xl mb-6 shadow-glow-cyan-sm">
            {division.icon}
          </div>
          <h1 className="heading-1 mb-5">
            <span className="text-gradient-cyan">{division.name}</span>
          </h1>
          <p className="body-large max-w-2xl mx-auto mb-9">{division.positioning}</p>
          <Link href="/projet" className="btn-cyan text-lg px-10 py-5">
            Soumettre mon projet — dépôt 305 $
          </Link>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 sm:py-28 bg-black2">
        <div className="container-zenicorp">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">Nos services</span>
            <h2 className="heading-2 mt-4">Spécialités {division.name.replace('ZeniCorp ', '')}</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {division.services.map((service) => (
              <article key={service} className="panel panel-hover p-6">
                <div className="w-11 h-11 grid place-items-center rounded-lg bg-panel2 border border-line text-2xl mb-4">
                  {division.icon}
                </div>
                <h3 className="heading-3 mb-2">{service}</h3>
                <p className="body-base text-sm mb-4">
                  Réalisé par nos entrepreneurs certifiés RBQ, jumelés via le système ZeniCorp.
                </p>
                <Link href="/projet" className="inline-flex items-center gap-2 text-cyanBright font-semibold text-sm group">
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
      <section className="py-20 sm:py-28 bg-black">
        <div className="container-zenicorp">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">Notre processus</span>
            <h2 className="heading-2 mt-4">De la demande à la réalisation</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Soumission', desc: 'Décrivez votre projet et payez le dépôt de 305 $. Le système jumelle un entrepreneur certifié sous 24 h.', step: '01' },
              { title: 'Planification', desc: 'Visite sur site, prix ferme, calendrier des travaux, commande des matériaux.', step: '02' },
              { title: 'Réalisation', desc: 'Travaux réalisés par l\'entrepreneur, supervisés par la plateforme, photos à chaque étape.', step: '03' },
              { title: 'Paiement', desc: 'Vous payez le solde à la complétion. L\'entrepreneur reçoit son chèque de 70 %.', step: '04' },
            ].map((item) => (
              <div key={item.title} className="panel panel-hover corner p-7 relative overflow-hidden">
                <span className="font-tech text-6xl font-bold text-cyan/15 absolute -top-2 -right-1">{item.step}</span>
                <div className="text-sm font-tech text-cyanBright tracking-widest mb-4">PHASE {item.step}</div>
                <h3 className="heading-3 mb-3">{item.title}</h3>
                <p className="body-base text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-28 bg-black2">
        <div className="container-zenicorp max-w-3xl">
          <header className="text-center mb-16">
            <span className="eyebrow">Questions fréquentes</span>
            <h2 className="heading-2 mt-4">FAQ {division.name}</h2>
          </header>

          <div className="space-y-4">
            {[
              { q: 'Qui réalise mes travaux ?', a: 'Un entrepreneur certifié de notre réseau, sélectionné par notre système selon votre secteur et votre job. Vous gardez vos garanties et le suivi ZeniCorp.' },
              { q: 'Combien ça coûte pour commencer ?', a: 'Le dépôt de réservation de 305 $ est gardé par ZeniCorp. Il sécurise votre projet et garantit qu\'un entrepreneur se présente chez vous.' },
              { q: 'Quand est-ce que l\'entrepreneur reçoit son paiement ?', a: 'L\'entrepreneur reçoit un chèque de 70 % du montant du contrat, une fois la job complétée et acceptée par le client.' },
              { q: 'Y a-t-il des garanties ?', a: 'Oui. Les travaux sont réalisés par des entrepreneurs certifiés RBQ avec garanties en place, et le suivi ZeniCorp encadre le projet de A à Z.' },
            ].map((item) => (
              <details key={item.q} className="group panel p-6 open:border-cyan/40 transition-colors">
                <summary className="heading-3 flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span>{item.q}</span>
                  <span className="text-cyanBright text-xl transition-transform group-open:rotate-45 flex-shrink-0">+</span>
                </summary>
                <p className="body-base text-sm mt-4 border-t border-line pt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-black overflow-hidden text-center">
        <div className="absolute inset-0 bg-grid opacity-40 bg-grid-fade" />
        <div className="relative container-zenicorp">
          <h2 className="heading-2 max-w-3xl mx-auto mb-6">
            Prêt pour votre projet <span className="text-gradient-cyan">{division.name.replace('ZeniCorp ', '')}</span> ?
          </h2>
          <p className="body-large max-w-2xl mx-auto mb-10">
            Dépôt de 305 $, entrepreneur jumelé sous 24 h, job complétée et garantie.
          </p>
          <Link href="/projet" className="btn-cyan text-lg px-10 py-5">Soumettre mon projet</Link>
        </div>
      </section>
    </main>
  );
}
