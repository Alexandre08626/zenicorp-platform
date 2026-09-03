import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Phone } from 'lucide-react';
import HeroCanvas from '@/components/HeroCanvas';
import Magnetic from '@/components/Magnetic';
import { Reveal, RevealLines, Stagger, StaggerItem } from '@/components/Reveal';
import {
  divisionsData,
  MODEL,
  ZENICORP_PHONE,
  ZENICORP_PHONE_HREF,
} from '@/lib/divisions-data';

const TICKER = [
  'Entrepreneurs certifiés RBQ',
  'Québec',
  `Dépôt unique ${MODEL.deposit}`,
  'Époxy',
  'Asphalte',
  'Toiture',
  'Isolation',
  `${MODEL.contractorShare} à l'entrepreneur`,
  `Contact sous ${MODEL.contactDelay}`,
  'Assurances vérifiées',
];

const STEPS = [
  {
    n: '01',
    t: 'Vous décrivez le projet',
    d: 'Division, superficie, adresse, contexte. Deux minutes, sans appel commercial, sans comparateur à remplir dix fois.',
  },
  {
    n: '02',
    t: `Dépôt unique de ${MODEL.deposit}`,
    d: 'Le dépôt réserve votre projet dans le réseau. Il est confirmé avec vous par un conseiller avant toute assignation.',
  },
  {
    n: '03',
    t: 'Le réseau assigne un entrepreneur',
    d: `Licence RBQ et assurances vérifiées, spécialisé dans votre division. Il vous contacte sous ${MODEL.contactDelay} pour la visite et le prix ferme.`,
  },
  {
    n: '04',
    t: 'Les travaux sont exécutés',
    d: `Le chantier est réalisé par le spécialiste. Sur le contrat, il conserve ${MODEL.contractorShare} et la plateforme ${MODEL.platformShare}.`,
  },
];

export default function HomePage() {
  return (
    <main className="flex-1 overflow-x-clip">
      {/* ═══════════════════════════════════════════════════════
          HERO — la plateforme comme infrastructure
          ═══════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
        <HeroCanvas colors={divisionsData.map((d) => d.color)} />

        <div className="container-zenicorp relative z-10 pb-12 pt-28 sm:pt-32">
          <div className="max-w-[54rem]">
            <Reveal>
              <span className="eyebrow">Plateforme de construction · Québec</span>
            </Reveal>

            <h1 className="mt-6 font-heading text-display-lg font-semibold text-zenicorp-text sm:mt-7">
              <RevealLines
                delay={100}
                lines={[
                  <>Votre projet.</>,
                  <>
                    Notre <span className="text-gold-gradient">réseau</span>.
                  </>,
                  <span key="c" className="text-zenicorp-faint">
                    Une seule plateforme.
                  </span>,
                ]}
              />
            </h1>

            <Reveal delay={450}>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-zenicorp-dim sm:text-lg">
                Vous ne cherchez pas un entrepreneur. Vous décrivez vos travaux, et le
                réseau vous assigne le spécialiste certifié qui les exécute.
              </p>
            </Reveal>

            <Reveal delay={580}>
              <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <Magnetic strength={0.18}>
                  <Link href="/projet" className="btn-gold group w-full sm:w-auto">
                    Soumettre mon projet
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1.5" />
                  </Link>
                </Magnetic>
                <Link
                  href="/entrepreneur"
                  className="btn-secondary group w-full sm:w-auto"
                >
                  Je suis entrepreneur
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={ZENICORP_PHONE_HREF}
                  className="link-underline inline-flex items-center gap-2 self-start px-1 py-2 text-sm text-zenicorp-dim transition-colors hover:text-zenicorp-gold sm:ml-2"
                >
                  <Phone className="h-4 w-4 text-zenicorp-gold" />
                  {ZENICORP_PHONE}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Barre de données — vocabulaire de fiche technique */}
          <Reveal delay={800}>
            <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-zenicorp-line/70 pt-6 sm:mt-14 lg:max-w-none lg:grid-cols-4">
              {[
                { v: MODEL.deposit, l: 'Dépôt client unique' },
                { v: MODEL.contractorShare, l: "Reversé à l'entrepreneur" },
                { v: MODEL.contactDelay, l: 'Délai de prise de contact' },
                { v: '04', l: 'Divisions spécialisées' },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-heading text-2xl font-semibold text-zenicorp-text sm:text-3xl">
                    {s.v}
                  </dt>
                  <dd className="tech-label mt-1.5 block leading-relaxed">{s.l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Indice de scroll */}
        <div className="pointer-events-none absolute bottom-6 right-6 hidden items-center gap-3 lg:flex">
          <span className="tech-label">Défiler</span>
          <span className="relative block h-14 w-px overflow-hidden bg-zenicorp-line">
            <span className="absolute inset-x-0 top-0 h-5 animate-[float-y_2.6s_ease-in-out_infinite] bg-zenicorp-gold" />
          </span>
        </div>
      </section>

      {/* ═══════════════ TICKER TECHNIQUE ═══════════════ */}
      <section
        aria-hidden="true"
        className="relative overflow-hidden border-y border-zenicorp-line/70 bg-zenicorp-void/60 py-4"
      >
        <div className="mask-fade-edges flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[0, 1].map((pass) => (
            <div key={pass} className="flex items-center gap-10">
              {TICKER.map((t) => (
                <span key={t} className="flex items-center gap-10">
                  <span className="font-mono text-label uppercase text-zenicorp-faint">
                    {t}
                  </span>
                  <span className="h-1 w-1 shrink-0 bg-zenicorp-gold/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MANIFESTE — pourquoi la plateforme existe
          ═══════════════════════════════════════════════════════ */}
      <section className="section-padding relative">
        <div className="container-zenicorp">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <Reveal>
                <span className="eyebrow">Le problème</span>
                <p className="mt-8 max-w-xs text-sm leading-relaxed text-zenicorp-faint">
                  Trois soumissions à relancer, des délais qui glissent, des licences
                  qu&apos;on ne vérifie jamais. La coordination est le vrai travail.
                </p>
                <span className="mt-8 block h-px w-full origin-left animate-line-grow bg-zenicorp-gold/40" />
              </Reveal>
            </div>

            <div className="lg:col-span-9">
              <h2 className="font-heading text-display-md font-semibold leading-[1.06]">
                <RevealLines
                  lineClassName="text-zenicorp-text"
                  lines={[
                    <>Chercher un entrepreneur fiable</>,
                    <>
                      ne devrait pas être{' '}
                      <span className="text-zenicorp-faint">un projet</span>
                    </>,
                    <>
                      <span className="text-zenicorp-faint">en soi.</span>
                    </>,
                  ]}
                />
              </h2>

              <Reveal delay={250}>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-zenicorp-dim">
                  ZeniCorp regroupe quatre divisions spécialisées et un réseau
                  d&apos;entrepreneurs dont la licence RBQ et les assurances sont
                  vérifiées avant toute assignation. Vous traitez avec une seule
                  plateforme&nbsp;; le spécialiste, lui, ne fait que son métier.
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
                  <h2 className="heading-2 mt-8">
                    Quatre étapes,
                    <br />
                    <span className="text-zenicorp-faint">zéro relance.</span>
                  </h2>
                  <p className="body-base mt-7 max-w-sm">
                    Le parcours est identique pour un garage de 400&nbsp;pi² comme pour
                    une toiture commerciale.
                  </p>
                  <Magnetic strength={0.16}>
                    <Link href="/projet" className="btn-outline-gold group mt-10">
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
                  <div className="group grid grid-cols-[auto_1fr] gap-6 border-t border-zenicorp-line/70 py-10 transition-colors duration-500 hover:border-zenicorp-gold/30 sm:gap-10 sm:py-12">
                    <span className="font-mono text-sm text-zenicorp-gold/70 transition-colors duration-500 group-hover:text-zenicorp-gold">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="font-heading text-2xl font-semibold text-zenicorp-text sm:text-3xl">
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
          DIVISIONS — lignes éditoriales alternées, photos réelles
          ═══════════════════════════════════════════════════════ */}
      <section
        id="nos-divisions"
        className="section-padding relative border-t border-zenicorp-line/70 bg-zenicorp-void/40"
      >
        <div className="container-zenicorp">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <Reveal>
              <span className="eyebrow">Nos divisions</span>
              <h2 className="heading-2 mt-8 max-w-xl">
                Quatre spécialités.
                <br />
                <span className="text-zenicorp-faint">Un seul interlocuteur.</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="max-w-sm text-sm leading-relaxed text-zenicorp-faint lg:text-right">
                Chaque division a son réseau d&apos;entrepreneurs, ses équipements et ses
                garanties propres.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 sm:mt-20">
            {divisionsData.map((d, i) => (
              <Reveal key={d.slug} delay={50}>
                <Link
                  href={`/${d.slug}`}
                  className="group relative grid items-center gap-8 border-t border-zenicorp-line/70 py-10 lg:grid-cols-12 lg:gap-10 lg:py-14"
                >
                  {/* Filet coloré qui se déploie au survol */}
                  <span
                    className="absolute left-0 top-0 h-px w-0 transition-all duration-[900ms] ease-premium group-hover:w-full"
                    style={{ background: d.color }}
                  />

                  <div className="flex items-center gap-5 lg:col-span-1">
                    <span className="font-mono text-sm text-zenicorp-faint">
                      0{i + 1}
                    </span>
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-500 group-hover:scale-[1.6]"
                      style={{ background: d.color }}
                    />
                  </div>

                  <div className="lg:col-span-4">
                    <h3 className="font-heading text-3xl font-semibold text-zenicorp-text sm:text-4xl">
                      {d.short}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-zenicorp-dim">
                      {d.positioning}
                    </p>
                  </div>

                  <ul className="hidden lg:col-span-3 lg:block">
                    {d.services.slice(0, 3).map((s) => (
                      <li
                        key={s}
                        className="border-b border-zenicorp-line/50 py-2 text-xs text-zenicorp-faint transition-colors duration-500 group-hover:text-zenicorp-dim"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="relative aspect-[16/10] overflow-hidden lg:col-span-3 lg:aspect-[16/11]">
                    <Image
                      src={d.photo}
                      alt={`Travaux ${d.short} réalisés par le réseau ZeniCorp`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover opacity-70 grayscale transition-all duration-[900ms] ease-premium group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
                    />
                    <span
                      className="pointer-events-none absolute inset-0 opacity-40 mix-blend-color transition-opacity duration-700 group-hover:opacity-0"
                      style={{ background: d.color }}
                    />
                  </div>

                  <span className="flex items-center gap-2 font-mono text-label uppercase text-zenicorp-gold lg:col-span-1 lg:justify-end">
                    Voir
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
            <span className="block border-t border-zenicorp-line/70" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ENTREPRENEURS — panneau inversé
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden border-t border-zenicorp-line/70">
        <div className="absolute inset-0 bp-grid-fine opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_80%_35%,rgba(47, 111, 237,0.075),transparent_70%)]" />

        <div className="container-zenicorp relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="eyebrow">Côté entrepreneur</span>
                <h2 className="heading-2 mt-8">
                  Des contrats.
                  <br />
                  <span className="text-zenicorp-faint">Pas de démarchage.</span>
                </h2>
                <p className="body-base mt-7 max-w-md">
                  Vous êtes couvreur, poseur d&apos;époxy, isolateur ou spécialiste de
                  l&apos;asphalte&nbsp;? La plateforme qualifie les clients et vous
                  assigne les projets de votre secteur.
                </p>
                <Magnetic strength={0.16}>
                  <Link href="/entrepreneur" className="btn-gold group mt-10">
                    Rejoindre le réseau — gratuit
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1.5" />
                  </Link>
                </Magnetic>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Stagger className="grid gap-px border border-zenicorp-line/70 bg-zenicorp-line/40 sm:grid-cols-2">
                {[
                  {
                    k: '0 $',
                    t: 'Adhésion',
                    d: 'Aucun frais d’inscription, aucun abonnement mensuel.',
                  },
                  {
                    k: MODEL.contractorShare,
                    t: 'Votre part',
                    d: 'Part du contrat que vous conservez sur chaque chantier réalisé.',
                  },
                  {
                    k: MODEL.deposit,
                    t: 'Déjà déposé',
                    d: 'Les clients assignés ont engagé un dépôt : les demandes sont sérieuses.',
                  },
                  {
                    k: 'RBQ',
                    t: 'Vérifié',
                    d: 'Licence et assurances contrôlées à l’entrée du réseau.',
                  },
                ].map((b) => (
                  <StaggerItem
                    key={b.t}
                    className="group bg-zenicorp-black p-8 transition-colors duration-500 hover:bg-zenicorp-surface sm:p-10"
                  >
                    <div className="font-heading text-4xl font-semibold text-zenicorp-gold sm:text-5xl">
                      {b.k}
                    </div>
                    <h3 className="mt-6 font-mono text-label uppercase text-zenicorp-text">
                      {b.t}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zenicorp-faint transition-colors duration-500 group-hover:text-zenicorp-dim">
                      {b.d}
                    </p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA FINAL
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-zenicorp-line/70 py-section">
        <div className="absolute inset-0 bp-grid opacity-[0.45]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_120%,rgba(47, 111, 237,0.12),transparent_70%)]" />

        <div className="container-zenicorp relative text-center">
          <Reveal>
            <span className="eyebrow justify-center">Prêt à démarrer</span>
          </Reveal>

          <h2 className="mx-auto mt-9 max-w-4xl font-heading text-display-lg font-semibold">
            <RevealLines
              lines={[
                <>Décrivez vos travaux.</>,
                <>
                  Le réseau <span className="text-gold-gradient">s&apos;occupe du reste</span>.
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
              <a href={ZENICORP_PHONE_HREF} className="btn-outline-gold px-10 py-4 text-base">
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
