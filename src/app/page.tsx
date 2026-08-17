import Link from 'next/link';
import { divisionsData } from '@/lib/divisions-data';

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* ============ HERO PLATEFORME ============ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-zenicorp-black">
        <div className="absolute inset-0 bg-gradient-to-br from-zenicorp-black via-zenicorp-darkGray to-zenicorp-black" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />

        <div className="relative container-zenicorp z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-zenicorp-gold border border-zenicorp-gold/30 bg-zenicorp-gold/5 rounded-none tracking-wider">
              PLATEFORME DE RÉNOVATION — QUÉBEC
            </span>

            <h1 className="heading-1 text-white mb-6 text-balance">
              VOTRE PROJET.<br />
              <span className="text-zenicorp-gold">NOTRE RÉSEAU D'ENTREPRENEURS.</span>
            </h1>

            <p className="text-xl sm:text-2xl text-zenicorp-silver mb-10 max-w-3xl mx-auto leading-relaxed">
              Vous soumettez votre projet. Vous payez un dépôt unique de <strong className="text-zenicorp-gold">305 $</strong>.
              Un entrepreneur certifié de notre réseau fait la job.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/projet" className="btn-gold text-lg px-10 py-5">
                JE SUIS CLIENT — SOUMETTRE MON PROJET
              </Link>
              <Link href="/entrepreneur" className="btn-secondary text-lg px-10 py-5 border-white text-white hover:bg-white hover:text-zenicorp-black">
                JE SUIS ENTREPRENEUR — GRATUIT
              </Link>
            </div>

            <p className="mt-6 text-sm text-zenicorp-silver/60">
              Entrepreneurs : inscription gratuite. Vous gardez 70 % de chaque contrat.
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-zenicorp-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ============ MODÈLE EN 1 LIGNE ============ */}
      <section className="bg-zenicorp-black border-t border-zenicorp-darkGray">
        <div className="container-zenicorp py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-heading font-bold text-zenicorp-gold">305 $</div>
              <p className="text-zenicorp-silver text-sm mt-1">Dépôt client — gardé par ZeniCorp</p>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-zenicorp-gold">GRATUIT</div>
              <p className="text-zenicorp-silver text-sm mt-1">Inscription entrepreneur</p>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-zenicorp-gold">70 %</div>
              <p className="text-zenicorp-silver text-sm mt-1">Pour l'entrepreneur à chaque job</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMMENT ÇA MARCHE — CLIENT ============ */}
      <section className="section-padding bg-white">
        <div className="container-zenicorp">
          <header className="text-center mb-16 animate-slide-up">
            <span className="text-zenicorp-gold font-medium tracking-wider uppercase text-sm">Côté client</span>
            <h2 className="heading-2 mt-2">Votre projet, géré de A à Z</h2>
            <p className="body-large mt-4 max-w-2xl mx-auto">
              Pas de prise de tête. Vous soumettez, nous jumelons, un entrepreneur de notre réseau réalise.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Soumettez votre projet', desc: 'Décrivez vos travaux en 2 minutes : type de division, superficie, adresse, photos.' },
              { step: '02', title: 'Dépôt de 305 $', desc: 'Le dépôt est gardé par ZeniCorp pour réserver votre projet. Sans surprise.' },
              { step: '03', title: 'Un entrepreneur est jumelé', desc: 'Un entrepreneur certifié de notre réseau est assigné à votre projet. Il vous contacte sous 24 h.' },
              { step: '04', title: 'La job est faite', desc: 'L\'entrepreneur réalise les travaux. Vous payez le solde. Vous gardez vos garanties.' },
            ].map((item) => (
              <div key={item.step} className="card p-8 relative">
                <span className="text-5xl font-heading font-bold text-zenicorp-gold/20">{item.step}</span>
                <h3 className="heading-3 mt-4 mb-3">{item.title}</h3>
                <p className="body-base text-zenicorp-mediumGray">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CÔTÉ ENTREPRENEUR ============ */}
      <section className="section-padding bg-zenicorp-black">
        <div className="container-zenicorp">
          <header className="text-center mb-16">
            <span className="text-zenicorp-gold font-medium tracking-wider uppercase text-sm">Côté entrepreneur</span>
            <h2 className="heading-2 text-white mt-2">Du travail. Sans payer. Sans chasser les contrats.</h2>
            <p className="body-large text-zenicorp-silver mt-4 max-w-2xl mx-auto">
              Vous commencez et vous voulez du travail ? Créez votre compte gratuitement.
              ZeniCorp vous envoie des contrats. Vous faites la job. Vous recevez votre chèque de 70 %.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: '📋', title: 'Inscription gratuite', desc: 'RBQ, assurances, spécialités. Zéro frais pour vous rejoindre.' },
              { icon: '🔗', title: 'Contrats assignés', desc: 'Les clients paient et embauchent via ZeniCorp. Vous recevez les mandats.' },
              { icon: '💵', title: 'Chèque de 70 %', desc: 'Job complétée = chèque de 70 % du montant du contrat. Le reste couvre la plateforme.' },
            ].map((item) => (
              <div key={item.title} className="card p-8 bg-zenicorp-darkGray border-zenicorp-darkGray hover:border-zenicorp-gold">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="heading-3 text-white mb-3">{item.title}</h3>
                <p className="body-base text-zenicorp-silver">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/entrepreneur" className="btn-gold text-lg px-10 py-5">
              CRÉER MON COMPTE ENTREPRENEUR — GRATUIT
            </Link>
          </div>
        </div>
      </section>

      {/* ============ DIVISIONS ============ */}
      <section id="nos-divisions" className="section-padding bg-white">
        <div className="container-zenicorp">
          <header className="text-center mb-16 animate-slide-up">
            <span className="text-zenicorp-gold font-medium tracking-wider uppercase text-sm">Nos divisions</span>
            <h2 className="heading-2 mt-2">Quatre spécialités. Un seul réseau.</h2>
            <p className="body-large mt-4 max-w-2xl mx-auto">
              Chaque division ZeniCorp bénéficie de sa propre identité commerciale tout en partageant
              la même plateforme, le même réseau d'entrepreneurs et les mêmes standards de qualité.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisionsData.map((division, index) => (
              <Link key={division.slug} href={`/${division.slug}`} className={`card p-8 group block animate-slide-up`} style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`text-5xl mb-4`}>{division.icon}</div>
                <h3 className="heading-3 mb-3 group-hover:text-zenicorp-gold transition-colors">{division.name}</h3>
                <p className="body-base text-zenicorp-mediumGray mb-6">{division.positioning}</p>
                <ul className="space-y-2 mb-8">
                  {division.services.slice(0, 3).map((service) => (
                    <li key={service} className="flex items-start gap-2 text-sm text-zenicorp-mediumGray">
                      <svg className="w-4 h-4 mt-0.5 text-zenicorp-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {service}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 text-zenicorp-gold font-medium group-hover:text-zenicorp-black transition-colors">
                  Voir la division
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ POURQUOI ZENICORP ============ */}
      <section className="section-padding bg-zenicorp-lightGray">
        <div className="container-zenicorp">
          <header className="text-center mb-16">
            <span className="text-zenicorp-gold font-medium tracking-wider uppercase text-sm">Pourquoi ZeniCorp</span>
            <h2 className="heading-2 mt-2">Le dépôt de 305 $, c'est quoi ?</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="card p-8">
              <h3 className="heading-3 mb-4">Pour le client</h3>
              <ul className="space-y-3">
                {[
                  'Votre projet est réellement pris en charge : pas de ghosting d\'entrepreneur.',
                  'Un dépôt de 305 $ réserve votre projet et garantit qu\'un entrepreneur se présente.',
                  'Le dépôt est gardé par ZeniCorp — il sert à sécuriser votre place dans le réseau.',
                  'Vous embauchez une de nos sous-divisions : qualité contrôlée, garanties en place.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-0.5 text-zenicorp-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="body-base text-zenicorp-mediumGray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-8">
              <h3 className="heading-3 mb-4">Pour l'entrepreneur</h3>
              <ul className="space-y-3">
                {[
                  'Inscription 100 % gratuite : rien à payer pour obtenir du travail.',
                  'Les clients paient via la plateforme : vous êtes payé à chaque job complétée.',
                  'Vous recevez un chèque de 70 % du contrat — ZeniCorp couvre la plateforme avec le reste.',
                  'Pas de marketing à faire : les clients viennent à nous, on vous les assigne.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-0.5 text-zenicorp-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="body-base text-zenicorp-mediumGray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section-padding bg-white">
        <div className="container-zenicorp max-w-3xl">
          <header className="text-center mb-16">
            <span className="text-zenicorp-gold font-medium tracking-wider uppercase text-sm">Questions fréquentes</span>
            <h2 className="heading-2 mt-2">FAQ Plateforme</h2>
          </header>

          <dl className="space-y-4">
            {[
              { q: 'Le dépôt de 305 $ est-il remboursable ?', a: 'Non. Le dépôt de 305 $ est gardé par ZeniCorp. Il sécurise votre projet et garantit qu\'un entrepreneur se présente chez vous. C\'est ce qui nous permet d\'offrir un service fiable aux deux côtés.' },
              { q: 'Combien l\'entrepreneur reçoit-il vraiment ?', a: 'L\'entrepreneur reçoit un chèque de 70 % du montant du contrat, une fois la job complétée et acceptée. Les 30 % restants financent la plateforme, le jumelage et le support.' },
              { q: 'L\'inscription entrepreneur est-elle vraiment gratuite ?', a: 'Oui. Créer un compte, recevoir des contrats et soumissionner ne coûte rien. Vous ne payez rien à l\'inscription : c\'est notre modèle inversé. Les clients paient, nous jumelons, vous travaillez.' },
              { q: 'Quelles divisions sont disponibles ?', a: 'ZeniCorp Epoxy, ZeniCorp Asphalte, ZeniCorp Toiture et ZeniCorp Isolation. D\'autres divisions s\'ajouteront sur la plateforme.' },
              { q: 'Est-ce que ça va devenir une application ?', a: 'Oui. La plateforme ZeniCorp est conçue pour devenir une application mobile (app GO) : soumission, suivi de projet et paiements directement depuis votre téléphone.' },
              { q: 'Qui fait la job finalement ?', a: 'Un entrepreneur certifié (RBQ) de notre réseau, jumelé à votre projet selon la division choisie. Chaque entrepreneur est vérifié avant d\'être accepté sur la plateforme.' },
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

      {/* ============ CTA FINAL ============ */}
      <section className="section-padding bg-zenicorp-black text-center">
        <div className="container-zenicorp">
          <h2 className="heading-2 text-white mb-6">La plateforme qui va finir en app GO.</h2>
          <p className="body-large text-zenicorp-silver mb-10 max-w-2xl mx-auto">
            Client ou entrepreneur ? Rejoignez le réseau dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/projet" className="btn-gold text-lg px-10 py-5">
              SOUMETTRE MON PROJET
            </Link>
            <Link href="/entrepreneur" className="btn-secondary text-lg px-10 py-5 border-white text-white hover:bg-white hover:text-zenicorp-black">
              CRÉER MON COMPTE ENTREPRENEUR
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}