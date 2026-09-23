import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  ShieldCheck,
  Check,
  X,
} from 'lucide-react';
import Magnetic from '@/components/Magnetic';
import { Reveal, RevealLines } from '@/components/Reveal';
import BlueprintScanner from '@/components/BlueprintScanner';
import DispatchTerminal from '@/components/DispatchTerminal';
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

const HERO_META = [
  { k: '4', l: 'Divisions spécialisées' },
  { k: MODEL.contactDelay, l: 'Délai de contact' },
  { k: '0 $', l: 'Pour soumettre' },
  { k: 'RBQ', l: 'Licence vérifiée' },
];

const GALLERY = [
  { src: '/div/realisations/epoxy-3.jpg', t: 'Époxy industriel', div: 'epoxy', h: 'lg:row-span-2' },
  { src: '/div/realisations/asphalte-1.jpg', t: 'Entrée asphaltée', div: 'asphalte', h: '' },
  { src: '/div/realisations/toiture-1.jpg', t: 'Toiture neuve', div: 'toiture', h: '' },
  { src: '/div/realisations/isolation-3.jpg', t: 'Cellulose grenier', div: 'isolation', h: 'lg:col-span-2' },
  { src: '/div/realisations/epoxy-1.jpg', t: 'Époxy commercial', div: 'epoxy', h: '' },
  { src: '/div/realisations/asphalte-2.jpg', t: 'Stationnement', div: 'asphalte', h: 'lg:row-span-2' },
  { src: '/div/realisations/toiture-2.jpg', t: 'Solins et bardeaux', div: 'toiture', h: 'lg:col-span-2' },
  { src: '/div/realisations/epoxy-4.jpg', t: 'Application époxy', div: 'epoxy', h: '' },
];

const colorOf = (slug: string) => divisionsData.find((d) => d.slug === slug)?.color ?? '#3CE1FF';

export default function HomePage() {
  const tickerItems = divisionsData.flatMap((d) => d.services.slice(0, 4));

  return (
    <main className="flex-1 overflow-x-clip">
      {/* ═══════════════════════════════════════════════════════
          HERO — texte + scanner « plan → réalisé »
          ═══════════════════════════════════════════════════════ */}
      <section className="relative">
        <div className="container-zenicorp grid items-center gap-12 pb-16 pt-28 sm:pt-32 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-28">
          <div className="min-w-0 lg:col-span-7">
            <Reveal>
              <span className="chip">
                <span className="chip-dot" />
                Plateforme de construction · Québec
              </span>
            </Reveal>

            <h1 className="mt-7 font-heading text-[clamp(2.6rem,5.4vw,4.9rem)] font-black leading-[0.98] tracking-[-0.035em] text-white">
              <RevealLines
                delay={100}
                lines={[
                  <>Votre projet.</>,
                  <>
                    Notre <span className="grad-text">réseau.</span>
                  </>,
                  <span key="c" className="text-white/45">
                    Une seule plateforme.
                  </span>,
                ]}
              />
            </h1>

            <Reveal delay={420}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-zenicorp-dim sm:text-xl">
                Vous décrivez vos travaux, et le réseau vous assigne{' '}
                <b className="font-semibold text-white">l&apos;entrepreneur certifié</b> qui les
                exécute. Garanties vérifiées, prix ferme, contact sous{' '}
                <b className="font-semibold text-white">{MODEL.contactDelay}</b>.
              </p>
            </Reveal>

            <Reveal delay={540}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Magnetic strength={0.18}>
                  <Link href="/projet" className="btn-gold group w-full px-7 py-4 text-[0.95rem] sm:w-auto">
                    Soumettre mon projet
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1.5" />
                  </Link>
                </Magnetic>
                <Link href="/entrepreneur" className="btn-secondary group w-full px-7 py-4 text-[0.95rem] sm:w-auto">
                  Je suis entrepreneur
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={ZENICORP_PHONE_HREF}
                  className="inline-flex items-center gap-2 self-start px-1 py-2 font-mono text-sm text-zenicorp-dim transition-colors hover:text-white sm:ml-2 sm:self-center"
                >
                  <Phone className="h-4 w-4 text-zenicorp-gold" />
                  {ZENICORP_PHONE}
                </a>
              </div>
            </Reveal>

            <Reveal delay={680}>
              <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[rgba(120,160,255,0.14)] pt-7 sm:grid-cols-4">
                {HERO_META.map((m) => (
                  <div key={m.l} className="flex flex-col gap-1">
                    <dt className="order-2 font-mono text-[0.64rem] font-medium uppercase tracking-[0.12em] text-zenicorp-faint">
                      {m.l}
                    </dt>
                    <dd className="order-1 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-[1.7rem]">
                      {m.k}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="min-w-0 lg:col-span-5">
            <Reveal delay={250}>
              <BlueprintScanner />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ TICKER — ce que le réseau exécute ═══════════════ */}
      <div
        className="relative overflow-hidden border-y border-[rgba(120,160,255,0.14)] bg-zenicorp-noirSub/60 py-4 mask-fade-edges"
        aria-label="Services du réseau"
      >
        <div className="flex w-max animate-marquee gap-11 hover:[animation-play-state:paused]">
          {[...tickerItems, ...tickerItems].map((s, i) => (
            <span
              key={i}
              aria-hidden={i >= tickerItems.length}
              className="flex items-center gap-4 whitespace-nowrap font-mono text-[0.8rem] font-medium tracking-[0.05em] text-zenicorp-dim after:h-1.5 after:w-1.5 after:rounded-full after:bg-gradient-to-r after:from-zenicorp-gold after:to-zenicorp-safety after:content-['']"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          DIVISIONS — cartes spotlight
          ═══════════════════════════════════════════════════════ */}
      <section id="nos-divisions" className="section-padding relative">
        <div className="container-zenicorp">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">Nos divisions</span>
            <h2 className="heading-2 mt-5">
              Quatre spécialités.{' '}
              <span className="text-zenicorp-faint">Des réalisations concrètes.</span>
            </h2>
            <p className="body-large mt-5 max-w-2xl">
              Chaque division a ses entrepreneurs, ses produits et ses méthodes. La
              plateforme, elle, reste la même : une demande, un spécialiste assigné.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {divisionsData.map((d, i) => (
              <Reveal key={d.slug} delay={i * 70} className="h-full">
                <Link
                  href={`/${d.slug}`}
                  className="spot group flex h-full flex-col overflow-hidden rounded-[20px] border border-[rgba(120,160,255,0.14)] bg-gradient-to-b from-[#0E1524] to-[#0A0F1A] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div
                    className="hud relative aspect-[4/3] overflow-hidden"
                    style={{ ['--hud' as string]: d.color } as React.CSSProperties}
                  >
                    <Image
                      src={d.hero}
                      alt={`Travaux ${d.short} réalisés par le réseau Zeniva`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1524] via-[#0E1524]/20 to-transparent" />
                    <span
                      className="absolute inset-0 opacity-25 mix-blend-color transition-opacity duration-700 group-hover:opacity-0"
                      style={{ background: d.color }}
                    />
                    <span className="absolute right-4 top-4 z-[4] rounded-md bg-black/50 px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-white/80 backdrop-blur">
                      DIV-0{i + 1}
                    </span>
                  </div>

                  <div className="relative z-[3] flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full" style={{ background: d.color, boxShadow: `0 0 12px ${d.color}` }} />
                      <h3 className="font-heading text-xl font-extrabold text-white">{d.short}</h3>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-zenicorp-dim">{d.positioning}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {d.services.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-[rgba(120,160,255,0.14)] bg-black/30 px-2 py-1 font-mono text-[0.62rem] text-zenicorp-dim"
                        >
                          {s.split(' (')[0]}
                        </span>
                      ))}
                    </div>
                    <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-label uppercase text-zenicorp-gold">
                      Explorer la division
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
          LE PROBLÈME — avant / avec la plateforme
          ═══════════════════════════════════════════════════════ */}
      <section className="section-padding relative border-t border-[rgba(120,160,255,0.1)]">
        <div className="container-zenicorp grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <span className="eyebrow">Le problème</span>
                <h2 className="heading-2 mt-5">
                  Chercher un entrepreneur fiable ne devrait pas être{' '}
                  <span className="grad-build">un projet.</span>
                </h2>
                <p className="body-large mt-6 max-w-md">
                  Trois soumissions à relancer, des délais qui glissent, des licences
                  qu&apos;on ne vérifie jamais. La coordination est le vrai travail.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal>
                <div className="h-full rounded-[20px] border border-[rgba(120,160,255,0.12)] bg-zenicorp-surface/40 p-7">
                  <span className="tech-label">Sans plateforme</span>
                  <ul className="mt-6 space-y-4">
                    {[
                      'Trois soumissions à relancer',
                      'Des délais qui glissent',
                      'Des licences qu’on ne vérifie jamais',
                      'Vous coordonnez tout, seul',
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-3 text-zenicorp-faint">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-red-400/25 bg-red-400/10">
                          <X className="h-3.5 w-3.5 text-red-300/80" />
                        </span>
                        <span className="line-through decoration-red-300/30">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="frame-grad h-full rounded-[20px]">
                  <div className="h-full rounded-[19px] bg-gradient-to-b from-[#0E1524] to-[#070a12] p-7">
                    <span className="font-mono text-label uppercase text-zenicorp-gold">Avec Zeniva</span>
                    <ul className="mt-6 space-y-4">
                      {[
                        'Une seule demande, gratuite',
                        `Un entrepreneur qui vous appelle sous ${MODEL.contactDelay}`,
                        'Licence RBQ et assurances vérifiées avant l’assignation',
                        'Une plateforme coordonne, le spécialiste exécute',
                      ].map((t) => (
                        <li key={t} className="flex items-start gap-3 text-white">
                          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-zenicorp-gold/40 bg-zenicorp-gold/10">
                            <Check className="h-3.5 w-3.5 text-zenicorp-gold" />
                          </span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={160}>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {[
                  { photo: '/div/realisations/epoxy-5.jpg', label: 'Finitions premium' },
                  { photo: '/div/realisations/toiture-4.jpg', label: 'Parfaitement scellé' },
                  { photo: '/div/realisations/isolation-2.jpg', label: 'Isolation efficace' },
                ].map((g) => (
                  <div key={g.photo} className="hud group relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={g.photo}
                      alt={g.label}
                      fill
                      sizes="(max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute bottom-3 left-3 right-3 text-[11px] font-semibold text-white sm:text-xs">
                      {g.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zenicorp-dim">
                Zeniva regroupe quatre divisions spécialisées et un réseau
                d&apos;entrepreneurs dont la licence RBQ et les assurances sont vérifiées
                avant toute assignation. Vous traitez avec une seule plateforme&nbsp;; le
                spécialiste, lui, ne fait que son métier.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROCESSUS — étapes + terminal dispatch
          ═══════════════════════════════════════════════════════ */}
      <section className="section-padding relative border-t border-[rgba(120,160,255,0.1)]">
        <div className="container-zenicorp">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">Côté client</span>
            <h2 className="heading-2 mt-5">
              Quatre étapes, <span className="grad-tech">zéro relance.</span>
            </h2>
            <p className="body-large mt-5 max-w-xl">
              Le parcours est identique pour un garage de 400&nbsp;pi² comme pour une
              toiture commerciale.
            </p>
          </Reveal>

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <ol className="flex flex-col gap-1.5">
              {STEPS.map((s, i) => (
                <Reveal as="li" key={s.n} delay={i * 60}>
                  <div className="group grid grid-cols-[3.25rem_1fr] gap-5 rounded-2xl border border-transparent p-4 transition-colors duration-300 hover:border-[rgba(120,160,255,0.14)] hover:bg-zenicorp-surface/50 sm:p-5">
                    <span className="relative grid h-[3.25rem] w-[3.25rem] place-items-center rounded-[14px] border border-[rgba(120,160,255,0.28)] bg-zenicorp-noir/80 font-mono text-[0.95rem] font-bold text-white">
                      <span aria-hidden className="grad-ring absolute -inset-px rounded-[14px] opacity-80" />
                      {s.n}
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-extrabold text-white sm:text-xl">{s.t}</h3>
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-zenicorp-dim">{s.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
              <li className="mt-6 pl-4 sm:pl-5">
                <Magnetic strength={0.16}>
                  <Link href="/projet" className="btn-gold group">
                    Commencer maintenant
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1.5" />
                  </Link>
                </Magnetic>
              </li>
            </ol>

            <Reveal delay={150} className="min-w-0">
              <DispatchTerminal />
              <p className="mt-4 text-center font-mono text-[0.66rem] uppercase tracking-[0.16em] text-zenicorp-faint">
                Parcours illustratif d&apos;une demande dans le réseau
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ENTREPRENEUR — bande chantier
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-[rgba(120,160,255,0.1)]">
        <div aria-hidden className="hazard h-2.5 w-full opacity-90" />
        <div className="absolute inset-0 top-2.5">
          <Image
            src="/div/realisations/isolation-hero.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zenicorp-void via-zenicorp-void/90 to-zenicorp-void/60" />
          <div className="absolute inset-0 bp-grid opacity-60" />
        </div>

        <div className="container-zenicorp relative">
          <div className="grid gap-12 py-section lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="eyebrow !text-zenicorp-amber before:!bg-zenicorp-amber">Côté entrepreneur</span>
                <h2 className="mt-5 font-heading text-display-md font-black text-white">
                  Des contrats.
                  <br />
                  <span className="grad-build">Pas de démarchage.</span>
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-zenicorp-dim">
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
                    { k: '0 $', t: 'Adhésion', d: 'Aucun frais, aucun abonnement.', c: 'rgba(60,225,255,0.5)' },
                    { k: MODEL.contractorShare, t: 'Votre part', d: 'Sur chaque contrat réalisé.', c: 'rgba(255,176,32,0.5)' },
                    { k: MODEL.signingShare, t: 'Payé à la signature', d: 'Par le client, dès la signature.', c: 'rgba(255,107,26,0.5)' },
                    { k: 'RBQ', t: 'Vérifié', d: 'Licence et assurances contrôlées.', c: 'rgba(70,150,255,0.5)' },
                  ].map((b) => (
                    <div
                      key={b.t}
                      className="spot relative overflow-hidden rounded-[20px] border border-[rgba(120,160,255,0.14)] bg-zenicorp-surface/70 p-7 backdrop-blur"
                    >
                      <span
                        aria-hidden
                        className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full opacity-40 blur-2xl"
                        style={{ background: `radial-gradient(circle, ${b.c}, transparent 70%)` }}
                      />
                      <div className="relative font-heading text-4xl font-black tracking-tight text-white">{b.k}</div>
                      <div className="relative mt-3 font-mono text-label uppercase text-zenicorp-gold">{b.t}</div>
                      <p className="relative mt-2 text-sm leading-relaxed text-zenicorp-dim">{b.d}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
        <div aria-hidden className="hazard relative h-2.5 w-full opacity-90" />
      </section>

      {/* ═══════════════════════════════════════════════════════
          RÉALISATIONS — galerie en viseur
          ═══════════════════════════════════════════════════════ */}
      <section className="section-padding relative">
        <div className="container-zenicorp">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Réalisations</span>
              <h2 className="heading-2 mt-5">
                Le travail parle. <span className="grad-text">Nos chantiers aussi.</span>
              </h2>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2 md:flex-nowrap">
              {divisionsData.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${d.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-[rgba(120,160,255,0.14)] px-3 py-1.5 font-mono text-[0.7rem] text-zenicorp-dim transition-colors hover:border-[rgba(120,160,255,0.35)] hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.color }} />
                  {d.short}
                </Link>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[15rem] lg:grid-flow-dense lg:grid-cols-4">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={i * 50} className={g.h}>
                <div
                  className="hud group relative aspect-[4/5] h-full overflow-hidden rounded-[20px] border border-[rgba(120,160,255,0.12)] lg:aspect-auto"
                  style={{ ['--hud' as string]: colorOf(g.div) } as React.CSSProperties}
                >
                  <Image
                    src={g.src}
                    alt={g.t}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2">
                    <span className="text-sm font-semibold text-white">{g.t}</span>
                    <span className="font-mono text-[10px] tracking-[0.14em] text-white/55">
                      RÉF-{String(i + 1).padStart(3, '0')}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA FINAL — carte à bordure dégradée
          ═══════════════════════════════════════════════════════ */}
      <section className="relative pb-section">
        <div className="container-zenicorp">
          <Reveal>
            <div className="frame-grad">
              <div className="relative grid gap-10 overflow-hidden rounded-[27px] bg-gradient-to-br from-[#0E1524] to-[#070a12] px-6 py-14 sm:px-12 sm:py-16 lg:grid-cols-12 lg:items-center lg:px-16">
                <div aria-hidden className="absolute -left-40 -top-52 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(70,150,255,0.25),transparent_65%)] blur-[30px]" />
                <div aria-hidden className="absolute -bottom-52 -right-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,107,26,0.2),transparent_65%)] blur-[30px]" />
                <div aria-hidden className="absolute inset-0 bp-grid opacity-50 mask-fade-b" />

                <div className="relative lg:col-span-7">
                  <span className="eyebrow">Prêt à démarrer</span>
                  <h2 className="mt-6 font-heading text-display-md font-black text-white">
                    <RevealLines
                      lines={[
                        <>Décrivez vos travaux.</>,
                        <>
                          Le réseau <span className="grad-text">s&apos;occupe du reste.</span>
                        </>,
                      ]}
                    />
                  </h2>
                  <p className="mt-6 max-w-md text-lg leading-relaxed text-zenicorp-dim">
                    Soumission gratuite, sans engagement. Un entrepreneur certifié du réseau
                    vous contacte sous {MODEL.contactDelay}.
                  </p>
                </div>

                <div className="relative flex flex-col gap-3 lg:col-span-5">
                  <Magnetic strength={0.2}>
                    <Link href="/projet" className="btn-gold group w-full py-4 text-base">
                      Soumettre mon projet
                      <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1.5" />
                    </Link>
                  </Magnetic>
                  <a href={ZENICORP_PHONE_HREF} className="btn-outline-gold w-full py-4 font-mono text-base">
                    <Phone className="h-4 w-4 text-zenicorp-gold" />
                    {ZENICORP_PHONE}
                  </a>
                  <p className="mt-2 flex items-center justify-center gap-2 text-xs text-zenicorp-faint">
                    <ShieldCheck className="h-4 w-4 text-zenicorp-gold" />
                    Entrepreneurs indépendants certifiés RBQ
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
