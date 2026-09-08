import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Phone, ShieldCheck, Clock, MapPin } from 'lucide-react';
import Magnetic from '@/components/Magnetic';
import { Reveal, RevealLines } from '@/components/Reveal';
import {
  divisionsData,
  MODEL,
  ZENICORP_PHONE,
  ZENICORP_PHONE_HREF,
} from '@/lib/divisions-data';

const STEPS = [
  {
    n: '01',
    t: 'Vous décrivez le projet',
    d: 'Division, superficie, adresse, contexte. Deux minutes, gratuit, sans engagement.',
  },
  {
    n: '02',
    t: 'Aucun dépôt pour soumettre',
    d: 'Votre demande est transmise au réseau. Rien n’est facturé avant la signature d’un contrat.',
  },
  {
    n: '03',
    t: 'Le réseau assigne un entrepreneur',
    d: `Licence RBQ et assurances vérifiées, spécialisé dans votre division. Il vous contacte sous ${MODEL.contactDelay} pour la visite et le prix ferme.`,
  },
  {
    n: '04',
    t: 'Contrat signé, travaux exécutés',
    d: `Vous payez ${MODEL.signingShare} du contrat à la signature ; le solde suit les modalités convenues. L'entrepreneur conserve ${MODEL.contractorShare} du contrat.`,
  },
];

export default function HomePage() {
  return (
    <main className="flex-1 overflow-x-clip">
      {/* ═══════════════════════════════════════════════════════
          HERO — photo plein écran, résultats avant tout
          ═══════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-black">
        <Image
          src="/div/realisations/epoxy-hero.jpg"
          alt="Réalisations du réseau Zeniva — époxy, toiture, asphalte, isolation"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay léger : la photo respire, mais le texte reste lisible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute inset-0 bp-grid-noir opacity-[0.12]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="container-zenicorp relative z-10 pb-14 pt-36 sm:pb-20">
          <div className="max-w-[54rem]">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-label uppercase text-white/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                Plateforme de construction · Québec
              </span>
            </Reveal>

            <h1 className="mt-7 font-heading text-display-xl font-black text-white">
              <RevealLines
                delay={100}
                lines={[
                  <>Votre projet.</>,
                  <>
                    Notre{' '}
                    <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                      réseau.
                    </span>
                  </>,
                  <span key="c" className="text-white/60">
                    Une seule plateforme.
                  </span>,
                ]}
              />
            </h1>

            <Reveal delay={450}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
                Vous décrivez vos travaux, et le réseau vous assigne l&apos;entrepreneur
                certifié qui les exécute. Garanties vérifiées, prix ferme, contact sous{' '}
                {MODEL.contactDelay}.
              </p>
            </Reveal>

            <Reveal delay={580}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Magnetic strength={0.18}>
                  <Link href="/projet" className="btn-gold group w-full sm:w-auto">
                    Soumettre mon projet
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1.5" />
                  </Link>
                </Magnetic>
                <Link href="/entrepreneur" className="btn-secondary group w-full sm:w-auto">
                  Je suis entrepreneur
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={ZENICORP_PHONE_HREF}
                  className="link-underline inline-flex items-center gap-2 self-start px-1 py-2 text-sm text-white/75 transition-colors hover:text-cyan-300 sm:ml-2"
                >
                  <Phone className="h-4 w-4 text-cyan-300" />
                  {ZENICORP_PHONE}
                </a>
              </div>
            </Reveal>

            <Reveal delay={720}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/15 pt-6 text-sm">
                <span className="flex items-center gap-2 text-white/75">
                  <ShieldCheck className="h-5 w-5 text-cyan-300" />
                  Entrepreneurs certifiés RBQ
                </span>
                <span className="flex items-center gap-2 text-white/75">
                  <Clock className="h-5 w-5 text-cyan-300" />
                  Contact sous {MODEL.contactDelay}
                </span>
                <span className="flex items-center gap-2 text-white/75">
                  <MapPin className="h-5 w-5 text-cyan-300" />
                  Partout au Québec
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          DIVISIONS — cartes photo riches
          ═══════════════════════════════════════════════════════ */}
      <section id="nos-divisions" className="section-padding relative">
        <div className="container-zenicorp">
          <Reveal>
            <span className="eyebrow">Nos divisions</span>
            <h2 className="heading-2 mt-6 max-w-2xl">
              Quatre spécialités.
              <br />
              <span className="text-zenicorp-faint">Des réalisations concrètes.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {divisionsData.map((d, i) => (
              <Reveal key={d.slug} delay={i * 70}>
                <Link
                  href={`/${d.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-3xl"
                >
                  <Image
                    src={d.hero}
                    alt={`Travaux ${d.short} réalisés par le réseau Zeniva`}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <span
                    className="absolute inset-0 opacity-30 mix-blend-color transition-opacity duration-700 group-hover:opacity-10"
                    style={{ background: d.color }}
                  />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span
                      className="h-1 w-10 rounded-full"
                      style={{ background: d.color }}
                    />
                    <h3 className="mt-4 font-heading text-2xl font-bold text-white">
                      {d.short}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/70">
                      {d.positioning}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-label uppercase text-cyan-300">
                      Voir
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MANIFESTE — pourquoi la plateforme existe
          ═══════════════════════════════════════════════════════ */}
      <section className="relative border-t border-zenicorp-line/70 bg-zenicorp-surface/50">
        <div className="container-zenicorp">
          <div className="grid gap-14 py-section lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <span className="eyebrow">Le problème</span>
                  <h2 className="heading-2 mt-6">
                    Chercher un entrepreneur fiable ne devrait pas être{' '}
                    <span className="text-zenicorp-faint">un projet.</span>
                  </h2>
                  <p className="body-base mt-6 max-w-sm">
                    Trois soumissions à relancer, des délais qui glissent, des licences
                    qu&apos;on ne vérifie jamais. La coordination est le vrai travail.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                  {[
                    { photo: '/div/realisations/epoxy-3.jpg', label: 'Époxy haute performance' },
                    { photo: '/div/realisations/toiture-2.jpg', label: 'Toiture certifiée' },
                    { photo: '/div/realisations/asphalte-1.jpg', label: 'Asphalte durable' },
                    { photo: '/div/realisations/isolation-2.jpg', label: 'Isolation efficace' },
                    { photo: '/div/realisations/epoxy-5.jpg', label: 'Finitions premium' },
                    { photo: '/div/realisations/toiture-4.jpg', label: 'Parfaitement scellé' },
                  ].map((g) => (
                    <div
                      key={g.photo}
                      className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
                    >
                      <Image
                        src={g.photo}
                        alt={g.label}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80" />
                      <span className="absolute bottom-4 left-4 right-4 text-xs font-semibold text-white">
                        {g.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-zenicorp-dim">
                  Zeniva regroupe quatre divisions spécialisées et un réseau
                  d&apos;entrepreneurs dont la licence RBQ et les assurances sont vérifiées
                  avant toute assignation. Vous traitez avec une seule plateforme&nbsp;; le
                  spécialiste, lui, ne fait que son métier.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROCESSUS — colonne collante + étapes révélées
          ═══════════════════════════════════════════════════════ */}
      <section className="relative border-t border-zenicorp-line/70">
        <div className="container-zenicorp">
          <div className="grid lg:grid-cols-12 lg:gap-8">
            <div className="py-16 lg:col-span-4 lg:py-section">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <span className="eyebrow">Côté client</span>
                  <h2 className="heading-2 mt-6">
                    Quatre étapes,
                    <br />
                    <span className="text-zenicorp-faint">zéro relance.</span>
                  </h2>
                  <p className="body-base mt-6 max-w-sm">
                    Le parcours est identique pour un garage de 400&nbsp;pi² comme pour une
                    toiture commerciale.
                  </p>
                  <Magnetic strength={0.16}>
                    <Link href="/projet" className="btn-outline-gold group mt-8">
                      Commencer maintenant
                      <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1.5" />
                    </Link>
                  </Magnetic>
                </Reveal>
              </div>
            </div>

            <ol className="lg:col-span-8 lg:py-section">
              {STEPS.map((s, i) => (
                <Reveal as="li" key={s.n} delay={i * 50}>
                  <div className="group grid grid-cols-[auto_1fr] gap-6 border-t border-zenicorp-line/70 py-10 transition-colors duration-500 hover:border-cyan-400/40 sm:gap-10 sm:py-12">
                    <span className="bg-gradient-to-b from-cyan-300 to-blue-500 bg-clip-text font-mono text-sm font-bold text-transparent">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-zenicorp-text sm:text-3xl">
                        {s.t}
                      </h3>
                      <p className="body-base mt-4 max-w-xl">{s.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
              <span className="block border-t border-zenicorp-line/70" />
            </ol>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ENTREPRENEUR — apportez vos champs à la plateforme
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-zenicorp-line/70">
        <div className="absolute inset-0">
          <Image
            src="/div/realisations/isolation-hero.jpg"
            alt="Chantier du réseau Zeniva"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container-zenicorp relative">
          <div className="grid gap-12 py-section lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="eyebrow">Côté entrepreneur</span>
                <h2 className="mt-6 font-heading text-display-md font-black text-white">
                  Des contrats.
                  <br />
                  <span className="text-white/60">Pas de démarchage.</span>
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
                  Vous êtes couvreur, poseur d&apos;époxy, isolateur ou spécialiste de
                  l&apos;asphalte&nbsp;? La plateforme qualifie les clients et vous assigne
                  les projets de votre secteur.
                </p>
                <Magnetic strength={0.16}>
                  <Link href="/entrepreneur" className="btn-gold group mt-8">
                    Rejoindre le réseau — gratuit
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1.5" />
                  </Link>
                </Magnetic>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={150}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { k: '0 $', t: 'Adhésion', d: 'Aucun frais, aucun abonnement.' },
                    {
                      k: MODEL.contractorShare,
                      t: 'Votre part',
                      d: 'Sur chaque contrat réalisé.',
                    },
                    {
                      k: MODEL.signingShare,
                      t: 'Payé à la signature',
                      d: 'Par le client, dès la signature.',
                    },
                    { k: 'RBQ', t: 'Vérifié', d: 'Licence et assurances contrôlées.' },
                  ].map((b) => (
                    <div
                      key={b.t}
                      className="glass rounded-2xl p-6 transition-colors duration-500 hover:border-cyan-400/40"
                    >
                      <div className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text font-heading text-3xl font-black text-transparent">
                        {b.k}
                      </div>
                      <div className="mt-3 font-mono text-label uppercase text-white">
                        {b.t}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">{b.d}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          GALERIE — les réalisations parlent
          ═══════════════════════════════════════════════════════ */}
      <section className="section-padding relative">
        <div className="container-zenicorp">
          <Reveal>
            <span className="eyebrow">Réalisations</span>
            <h2 className="heading-2 mt-6">
              Le travail parle.{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Nos chantiers aussi.
              </span>
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {[
              { src: '/div/realisations/epoxy-3.jpg', t: 'Époxy garage', h: 'lg:row-span-2' },
              { src: '/div/realisations/asphalte-1.jpg', t: 'Entrée asphaltée', h: '' },
              { src: '/div/realisations/toiture-1.jpg', t: 'Toiture neuve', h: '' },
              { src: '/div/realisations/isolation-3.jpg', t: 'Cellulose grenier', h: '' },
              { src: '/div/realisations/epoxy-1.jpg', t: 'Époxy commercial', h: '' },
              { src: '/div/realisations/asphalte-2.jpg', t: 'Stationnement', h: 'lg:row-span-2' },
              { src: '/div/realisations/toiture-2.jpg', t: 'Solins et bardeaux', h: '' },
              { src: '/div/realisations/epoxy-4.jpg', t: 'Finition flocons', h: '' },
            ].map((g, i) => (
              <Reveal key={g.src} delay={i * 50}>
                <div
                  className={`group relative aspect-[4/5] overflow-hidden rounded-3xl lg:aspect-auto lg:min-h-[15rem] ${g.h}`}
                >
                  <Image
                    src={g.src}
                    alt={g.t}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-4 right-4 translate-y-2 text-sm font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {g.t}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA FINAL — bandeau photo
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/div/realisations/asphalte-hero.jpg"
            alt="Chantier asphalte"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="container-zenicorp relative py-section text-center">
          <Reveal>
            <span className="eyebrow justify-center">Prêt à démarrer</span>
          </Reveal>

          <h2 className="mx-auto mt-8 max-w-4xl font-heading text-display-lg font-black text-white">
            <RevealLines
              lines={[
                <>Décrivez vos travaux.</>,
                <>
                  Le réseau{' '}
                  <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                    s&apos;occupe du reste.
                  </span>
                </>,
              ]}
            />
          </h2>

          <Reveal delay={300}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Magnetic strength={0.2}>
                <Link href="/projet" className="btn-gold group px-10 py-4 text-base">
                  Soumettre mon projet
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1.5" />
                </Link>
              </Magnetic>
              <a
                href={ZENICORP_PHONE_HREF}
                className="btn-outline-gold border-white/40 text-white hover:bg-white/10 px-10 py-4 text-base"
              >
                <Phone className="h-4 w-4" />
                {ZENICORP_PHONE}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}