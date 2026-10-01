import type { Metadata } from 'next';
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
  getDivisionBySlug,
  pausedDivisions,
  MODEL,
  ZENICORP_PHONE,
  ZENICORP_PHONE_HREF,
} from '@/lib/divisions-data';
import { VILLES } from '@/lib/villes-data';

const EPOXY = getDivisionBySlug('epoxy')!;

export const metadata: Metadata = {
  title: { absolute: 'Plancher époxy et rénovation au Québec — entrepreneurs RBQ | Zeniva' },
  description:
    'Plancher époxy de garage, sous-sol ou commerce au Québec, posé par un entrepreneur certifié RBQ. Soumission gratuite en 2 minutes, prix ferme après visite. Appelez le 581-748-7017.',
  alternates: { canonical: '/' },
};

/** FAQ en langage naturel : les questions que les gens posent à Google et aux assistants IA. */
const HOME_FAQ = [
  {
    q: 'Combien coûte un plancher époxy de garage au Québec en 2026 ?',
    a: "Généralement de 4 $ à 15 $ le pied carré, posé par un professionnel, selon le système choisi (époxy clair, époxy 100 % solides avec flocons, métallique ou polyaspartique) et l'état du béton. Pour un garage de 500 pi², comptez environ 2 000 $ à 7 500 $. Ces fourchettes viennent de guides de prix québécois publiés pour 2026 ; le prix ferme de votre projet est donné après la visite.",
  },
  {
    q: 'Comment fonctionne Zeniva ?',
    a: `Vous décrivez vos travaux en deux minutes, en ligne ou au ${ZENICORP_PHONE}. Un conseiller valide la demande, puis un entrepreneur certifié RBQ du réseau vous contacte sous ${MODEL.contactDelay} pour la visite et un prix ferme. La soumission est gratuite et sans engagement ; vous payez ${MODEL.signingShare} du contrat seulement à la signature.`,
  },
  {
    q: 'Les entrepreneurs du réseau sont-ils vérifiés ?',
    a: "Oui. La licence de la Régie du bâtiment du Québec (RBQ) et les assurances de l'entrepreneur sont vérifiées avant qu'un projet lui soit assigné. Vous pouvez aussi vérifier vous-même n'importe quelle licence dans le registre public et gratuit de la RBQ.",
  },
  {
    q: 'Dans quelles villes Zeniva pose-t-elle des planchers époxy ?',
    a: `Partout au Québec, notamment à ${VILLES.map((v) => v.nom).join(', ')} et dans leurs environs.`,
  },
  {
    q: 'Faut-il payer quelque chose pour obtenir une soumission ?',
    a: 'Non. La soumission est gratuite et sans engagement. Rien n’est facturé avant la signature d’un contrat.',
  },
];

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
  { k: '4–15 $', l: 'Prix marché époxy / pi² (2026)' },
  { k: MODEL.contactDelay, l: 'Délai de contact' },
  { k: '0 $', l: 'Pour soumettre' },
  { k: 'RBQ', l: 'Licence vérifiée' },
];

const GALLERY = [
  { src: '/div/realisations/epoxy-3.jpg', t: 'Époxy industriel', h: 'lg:row-span-2' },
  { src: '/div/realisations/epoxy-hero.jpg', t: 'Plancher de garage', h: 'lg:col-span-2' },
  { src: '/div/realisations/epoxy-1.jpg', t: 'Époxy commercial', h: '' },
  { src: '/div/realisations/epoxy-5.jpg', t: 'Finition lustrée', h: 'lg:row-span-2' },
  { src: '/div/realisations/epoxy-4.jpg', t: 'Application époxy', h: 'lg:col-span-2' },
  { src: '/div/realisations/epoxy-2.jpg', t: 'Revêtement époxy', h: '' },
];


export default function HomePage() {
  const tickerItems = EPOXY.services;
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="flex-1 overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* ═══════════════════════════════════════════════════════
          HERO — texte + scanner « plan → réalisé »
          ═══════════════════════════════════════════════════════ */}
      <section className="relative">
        <div className="container-zenicorp grid items-center gap-12 pb-16 pt-28 sm:pt-32 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-28">
          <div className="min-w-0 lg:col-span-7">
            <Reveal>
              <span className="chip">
                <span className="chip-dot" />
                Plancher époxy · Rénovation · Québec
              </span>
            </Reveal>

            <h1 className="mt-7 font-heading text-[clamp(2.6rem,5.4vw,4.9rem)] font-black leading-[0.98] tracking-[-0.035em] text-white">
              <RevealLines
                delay={100}
                lines={[
                  <>Plancher époxy.</>,
                  <>
                    Entrepreneurs <span className="grad-text">RBQ.</span>
                  </>,
                  <span key="c" className="text-white/45">
                    Partout au Québec.
                  </span>,
                ]}
              />
            </h1>

            <Reveal delay={420}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-zenicorp-dim sm:text-xl">
                Garage, sous-sol, commerce ou usine&nbsp;: décrivez vos travaux et un{' '}
                <b className="font-semibold text-white">entrepreneur certifié RBQ</b> vous
                contacte sous <b className="font-semibold text-white">{MODEL.contactDelay}</b>{' '}
                pour la visite et un prix ferme.{' '}
                <Link href="/epoxy" className="link-underline text-white">
                  Voir nos planchers époxy
                </Link>
                .
              </p>
            </Reveal>

            <Reveal delay={540}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Magnetic strength={0.18}>
                  <Link href="/projet?division=epoxy" className="btn-gold group w-full px-7 py-4 text-[0.95rem] sm:w-auto">
                    Soumission gratuite
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
      <section id="epoxy" className="section-padding relative">
        <div className="container-zenicorp">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <Reveal className="lg:col-span-6">
              <div
                className="hud relative aspect-[4/3] overflow-hidden rounded-[24px] border border-[rgba(120,160,255,0.14)]"
                style={{ ['--hud' as string]: EPOXY.color } as React.CSSProperties}
              >
                <Image
                  src={EPOXY.hero}
                  alt="Plancher de garage en époxy posé au Québec"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-6">
              <span className="eyebrow">Zeniva Époxy</span>
              <h2 className="heading-2 mt-5">
                Planchers époxy et polyaspartique,{' '}
                <span className="text-zenicorp-faint">posés sur un béton bien préparé.</span>
              </h2>
              <p className="body-large mt-5 max-w-xl">
                Garages, sous-sols, commerces, restaurants et espaces industriels. Le béton est
                meulé et les fissures réparées avant l&apos;application&nbsp;: c&apos;est ce
                qui fait durer un plancher de 10 à 20 ans plutôt que deux hivers.
              </p>
              <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                {EPOXY.services.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-[0.95rem] text-zenicorp-dim">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-zenicorp-gold" />
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/projet?division=epoxy" className="btn-gold group px-7 py-4">
                  Soumission époxy gratuite
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1.5" />
                </Link>
                <Link href="/epoxy" className="btn-secondary group px-7 py-4">
                  Tout sur nos planchers époxy
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-zenicorp-dim">
                Finis métalliques, flocons et naturels&nbsp;:{' '}
                <a href={EPOXY.site} className="link-underline text-zenicorp-gold">
                  epoxy.zeniva.ca
                </a>
                {' '}· Prix 2026&nbsp;:{' '}
                <Link
                  href="/guides/prix-plancher-epoxy-garage-quebec"
                  className="link-underline text-zenicorp-gold"
                >
                  combien coûte un plancher époxy de garage
                </Link>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zenicorp-faint">
                Époxy près de chez vous&nbsp;:{' '}
                {VILLES.map((v, i) => (
                  <span key={v.slug}>
                    <Link href={`/epoxy/${v.slug}`} className="hover:text-white">
                      {v.nom}
                    </Link>
                    {i < VILLES.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </p>
            </Reveal>
          </div>

          {pausedDivisions.length > 0 && (
            <p className="mt-12 border-t border-[rgba(120,160,255,0.1)] pt-6 text-xs text-zenicorp-faint">
              Autres spécialités du réseau&nbsp;:{' '}
              {pausedDivisions.map((d, i) => (
                <span key={d.slug}>
                  <Link href={`/${d.slug}`} className="hover:text-white">
                    {d.short}
                  </Link>
                  {i < pausedDivisions.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>
          )}
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
                  { photo: '/div/realisations/epoxy-1.jpg', label: 'Béton meulé, fissures réparées' },
                  { photo: '/div/realisations/epoxy-4.jpg', label: 'Application en couches' },
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
                Zeniva regroupe des divisions spécialisées, à commencer par l&apos;époxy, et un
                réseau d&apos;entrepreneurs dont la licence RBQ et les assurances sont vérifiées
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
              Le parcours est identique pour un garage de 400&nbsp;pi² comme pour un
              plancher commercial ou industriel.
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
            src="/div/realisations/epoxy-3.jpg"
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
                  Vous êtes poseur d&apos;époxy ou entrepreneur spécialisé certifié
                  RBQ&nbsp;? La plateforme qualifie les clients et vous assigne les projets de
                  votre secteur.
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
              <Link
                href="/epoxy"
                className="inline-flex items-center gap-2 rounded-lg border border-[rgba(120,160,255,0.14)] px-3 py-1.5 font-mono text-[0.7rem] text-zenicorp-dim transition-colors hover:border-[rgba(120,160,255,0.35)] hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: EPOXY.color }} />
                Planchers époxy
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[15rem] lg:grid-flow-dense lg:grid-cols-4">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={i * 50} className={g.h}>
                <div
                  className="hud group relative aspect-[4/5] h-full overflow-hidden rounded-[20px] border border-[rgba(120,160,255,0.12)] lg:aspect-auto"
                  style={{ ['--hud' as string]: EPOXY.color } as React.CSSProperties}
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

      {/* ═══════════════ FAQ — réponses directes (Google, assistants IA) ═══════════════ */}
      <section className="section-padding relative border-t border-[rgba(120,160,255,0.1)]">
        <div className="container-zenicorp grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">Questions fréquentes</span>
              <h2 className="heading-2 mt-5">Réponses directes.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            {HOME_FAQ.map((f) => (
              <details key={f.q} className="group border-t border-[rgba(120,160,255,0.14)]">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6">
                  <h3 className="font-heading text-lg font-medium leading-snug text-white sm:text-xl">
                    {f.q}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-1 font-mono text-zenicorp-gold transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 text-base leading-relaxed text-zenicorp-dim">{f.a}</p>
              </details>
            ))}
            <span className="block border-t border-[rgba(120,160,255,0.14)]" />
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
                    <Link href="/projet?division=epoxy" className="btn-gold group w-full py-4 text-base">
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
