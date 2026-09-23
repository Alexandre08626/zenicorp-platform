import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, Phone, ExternalLink } from 'lucide-react';
import Magnetic from '@/components/Magnetic';
import { Reveal, RevealLines } from '@/components/Reveal';
import {
  type DivisionData,
  MODEL,
  ZENICORP_PHONE,
  ZENICORP_PHONE_HREF,
} from '@/lib/divisions-data';
import { guidesForDivision } from '@/lib/guides-data';

export default function DivisionTemplate({ division }: { division: DivisionData }) {
  const accent = division.color;
  const guides = guidesForDivision(division.slug);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    // Rattache la FAQ à l'entité de la division déclarée dans le layout (même @id).
    about: { '@id': `https://www.zeniva.ca/${division.slug}#organization` },
    mainEntity: division.faq.map((f) => ({
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
          HERO — photo pleine page, titre éditorial
          ═══════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[78svh] flex-col justify-end overflow-hidden">
        <Image
          src={division.photo}
          alt={`Travaux ${division.short} réalisés par le réseau Zeniva`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Étalonnage : la photo devient un fond, jamais un décor bruyant.
            Les photos sources ont des résolutions inégales : un traitement
            graphique assumé vaut mieux qu'un agrandissement flou visible. */}
        <div className="absolute inset-0 bg-zenicorp-noir/25" />
        <div
          className="absolute inset-0 opacity-20 mix-blend-color"
          style={{ background: accent }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zenicorp-void via-zenicorp-void/55 to-zenicorp-void/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-zenicorp-void/80 via-zenicorp-void/30 to-transparent" />
        <div className="absolute inset-0 bp-grid opacity-50" />

        <div className="container-zenicorp relative z-10 pb-16 pt-36 sm:pb-24">
          <Reveal>
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 font-mono text-label uppercase text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 ease-premium group-hover:-translate-x-1" />
              Plateforme Zeniva
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Reveal delay={80}>
                <span
                  className="inline-flex items-center gap-2.5 rounded-full border px-3.5 py-2 font-mono text-label uppercase backdrop-blur"
                  style={{
                    color: accent,
                    borderColor: `${accent}66`,
                    background: 'rgba(5,7,11,0.55)',
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                  Division Zeniva
                </span>
              </Reveal>

              <h1 className="mt-7 font-heading text-display-xl font-black text-white">
                <RevealLines delay={160} lines={[<>{division.short}</>]} />
              </h1>

              <Reveal delay={400}>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
                  {division.positioning}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <Reveal delay={500}>
                <div className="flex flex-col gap-3">
                  <Magnetic strength={0.16}>
                    <Link
                      href={`/projet?division=${division.slug}`}
                      className="btn-gold group w-full"
                    >
                      Soumettre mon projet
                      <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1.5" />
                    </Link>
                  </Magnetic>
                  <a
                    href={ZENICORP_PHONE_HREF}
                    className="btn-secondary w-full font-mono"
                  >
                    <Phone className="h-4 w-4 text-zenicorp-gold" />
                    {ZENICORP_PHONE}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Filet de couleur de division */}
        <span className="absolute inset-x-0 bottom-0 h-px" style={{ background: accent }} />
      </section>

      {/* ═══════════════ SERVICES — liste éditoriale ═══════════════ */}
      <section className="section-padding relative">
        <div className="container-zenicorp">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <span className="eyebrow">Nos services</span>
                  <h2 className="heading-2 mt-8">
                    Ce que le réseau
                    <br />
                    <span className="text-zenicorp-faint">exécute.</span>
                  </h2>
                  <p className="body-base mt-7 max-w-sm">
                    Chaque prestation est réalisée par un entrepreneur dont la licence RBQ
                    et les assurances ont été vérifiées.
                  </p>
                  <p className="mt-8 font-mono text-label uppercase text-zenicorp-faint">
                    {String(division.services.length).padStart(2, '0')} prestations
                  </p>
                </Reveal>
              </div>
            </div>

            <ul className="lg:col-span-8">
              {division.services.map((service, i) => (
                <Reveal as="li" key={service} delay={i * 30}>
                  <Link
                    href={`/projet?division=${division.slug}`}
                    className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 border-t border-zenicorp-line/70 py-6 sm:gap-8 sm:py-7"
                  >
                    <span
                      className="absolute left-0 top-0 h-px w-0 transition-all duration-[900ms] ease-premium group-hover:w-full"
                      style={{ background: accent }}
                    />
                    <span className="font-mono text-xs text-zenicorp-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-heading text-lg font-medium leading-snug text-zenicorp-text transition-colors duration-500 sm:text-xl">
                      {service}
                    </span>
                    <span className="flex items-center gap-2 font-mono text-label uppercase text-zenicorp-faint transition-colors duration-500 group-hover:text-zenicorp-gold">
                      <span className="hidden sm:inline">Demander</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
              <span className="block border-t border-zenicorp-line/70" />
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESSUS ═══════════════ */}
      <section className="section-padding relative overflow-hidden border-t border-zenicorp-line/70 bg-zenicorp-surface/50">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            background: `radial-gradient(ellipse 55% 60% at 15% 20%, ${accent}, transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 bp-grid opacity-40" />
        <div className="container-zenicorp relative">
          <Reveal>
            <span className="eyebrow">Déroulement</span>
            <h2 className="heading-2 mt-8 max-w-2xl">
              De la demande
              <br />
              <span className="text-zenicorp-faint">au chantier terminé.</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: '01',
                t: 'Votre demande',
                d: `Division ${division.short.toLowerCase()}, superficie, adresse, contexte.`,
              },
              {
                n: '02',
                t: 'Soumission gratuite',
                d: 'Votre demande est validée par un conseiller, sans engagement.',
              },
              {
                n: '03',
                t: 'Entrepreneur assigné',
                d: `Certifié RBQ, il vous contacte sous ${MODEL.contactDelay} pour le prix ferme.`,
              },
              {
                n: '04',
                t: 'Contrat et exécution',
                d: `Vous payez ${MODEL.signingShare} à la signature ; l'entrepreneur conserve ${MODEL.contractorShare} du contrat.`,
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 60}>
                <div className="spot group h-full rounded-[20px] border border-[rgba(120,160,255,0.14)] bg-gradient-to-b from-[#0E1524] to-[#0A0F1A] p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-9">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl border bg-zenicorp-noir/80 font-mono text-sm font-bold"
                    style={{ color: accent, borderColor: `${accent}66` }}
                  >
                    {s.n}
                  </span>
                  <h3 className="mt-6 font-heading text-xl font-extrabold text-zenicorp-text">
                    {s.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zenicorp-dim">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ GALERIE — réalisations photo ═══════════════ */}
      <section className="section-padding relative border-t border-zenicorp-line/70 bg-zenicorp-surface/50">
        <div className="container-zenicorp">
          <Reveal>
            <span className="eyebrow">Réalisations</span>
            <h2 className="heading-2 mt-6">
              Des chantiers.
              <br />
              <span className="text-zenicorp-faint">Des résultats.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
            {division.gallery.map((src, i) => (
              <Reveal key={src} delay={i * 60}>
                <div
                  className="hud group relative aspect-[4/3] overflow-hidden rounded-[20px] border border-[rgba(120,160,255,0.12)]"
                  style={{ ['--hud' as string]: accent } as React.CSSProperties}
                >
                  <Image
                    src={src}
                    alt={`Réalisation ${division.short} du réseau Zeniva`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-110"
                  />
                  <span
                    className="pointer-events-none absolute inset-0 opacity-25 mix-blend-color transition-opacity duration-700 group-hover:opacity-0"
                    style={{ background: accent }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="section-padding relative border-t border-zenicorp-line/70">
        <div className="container-zenicorp">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Reveal>
                <span className="eyebrow">Questions fréquentes</span>
                <h2 className="heading-2 mt-8">
                  Ce que les clients
                  <br />
                  <span className="text-zenicorp-faint">demandent.</span>
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              {division.faq.map((item, i) => (
                <Reveal key={item.q} delay={i * 50}>
                  <details className="group border-t border-zenicorp-line/70">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7">
                      <span className="font-heading text-lg font-medium leading-snug text-zenicorp-text sm:text-xl">
                        {item.q}
                      </span>
                      <span className="relative mt-1.5 grid h-5 w-5 shrink-0 place-items-center">
                        <span
                          className="absolute h-px w-4"
                          style={{ background: accent }}
                        />
                        <span
                          className="absolute h-4 w-px transition-transform duration-500 ease-premium group-open:rotate-90 group-open:opacity-0"
                          style={{ background: accent }}
                        />
                      </span>
                    </summary>
                    <p className="max-w-2xl pb-8 text-base leading-relaxed text-zenicorp-dim">
                      {item.a}
                    </p>
                  </details>
                </Reveal>
              ))}
              <span className="block border-t border-zenicorp-line/70" />

              {guides.length > 0 && (
                <div className="mt-10">
                  <span className="eyebrow">Guide de prix 2026</span>
                  {guides.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/guides/${g.slug}`}
                      className="spot group mt-4 flex items-start justify-between gap-6 rounded-2xl border border-[rgba(120,160,255,0.14)] bg-zenicorp-surface/60 p-6 transition-colors"
                    >
                      <span>
                        <span className="block font-heading text-lg font-medium leading-snug text-zenicorp-text">{g.title}</span>
                        <span className="mt-2 block text-sm leading-relaxed text-zenicorp-dim">{g.shortAnswer}</span>
                      </span>
                      <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-zenicorp-faint transition-colors group-hover:text-zenicorp-gold" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA — bandeau photo ═══════════════ */}
      <section className="relative overflow-hidden border-t border-zenicorp-line">
        <div aria-hidden className="hazard relative z-10 h-2.5 w-full opacity-90" />
        <div className="absolute inset-0">
          <Image
            src={division.hero}
            alt={`Chantier ${division.short} du réseau Zeniva`}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-zenicorp-void/80" />
          <div className="absolute inset-0 bp-grid opacity-60" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.16] mix-blend-color"
          style={{ background: accent }}
        />

        <div className="container-zenicorp relative py-section text-center">
          <h2 className="mx-auto max-w-3xl font-heading text-display-md font-black text-white">
            <RevealLines
              lines={[
                <>Votre projet {division.short.toLowerCase()},</>,
                <>
                  <span className="grad-text">pris en charge.</span>
                </>,
              ]}
            />
          </h2>

          <Reveal delay={280}>
            <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-white/70">
              Soumission gratuite, sans engagement. Un entrepreneur certifié du réseau
              vous contacte sous {MODEL.contactDelay}.
            </p>

            <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Magnetic strength={0.2}>
                <Link
                  href={`/projet?division=${division.slug}`}
                  className="btn-gold group px-10 py-4 text-base"
                >
                  Soumettre mon projet
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1.5" />
                </Link>
              </Magnetic>
              <a
                href={ZENICORP_PHONE_HREF}
                className="btn-outline-gold px-10 py-4 font-mono text-base"
              >
                <Phone className="h-4 w-4" />
                {ZENICORP_PHONE}
              </a>
            </div>

            <p className="mt-10 text-sm text-white/60">
              Site de la division&nbsp;:{' '}
              <a
                href={division.site}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1 text-zenicorp-gold"
              >
                {division.site.replace('https://', '')}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
