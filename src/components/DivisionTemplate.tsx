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

export default function DivisionTemplate({ division }: { division: DivisionData }) {
  const accent = division.color;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
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
          alt={`Travaux ${division.short} réalisés par le réseau ZeniCorp`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Étalonnage : la photo devient un fond, jamais un décor bruyant.
            Les photos sources ont des résolutions inégales : un traitement
            graphique assumé vaut mieux qu'un agrandissement flou visible. */}
        <div className="absolute inset-0 bg-zenicorp-black/55" />
        <div
          className="absolute inset-0 opacity-25 mix-blend-color"
          style={{ background: accent }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zenicorp-black via-zenicorp-black/75 to-zenicorp-black/35" />
        <div className="absolute inset-0 bp-grid-fine opacity-[0.14]" />

        <div className="container-zenicorp relative z-10 pb-16 pt-36 sm:pb-24">
          <Reveal>
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 font-mono text-label uppercase text-zenicorp-dim transition-colors hover:text-zenicorp-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 ease-premium group-hover:-translate-x-1" />
              Plateforme ZeniCorp
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Reveal delay={80}>
                <span
                  className="inline-flex items-center gap-2.5 border px-3 py-1.5 font-mono text-label uppercase backdrop-blur"
                  style={{
                    color: accent,
                    borderColor: `${accent}66`,
                    background: 'rgba(5,7,11,0.55)',
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                  Division ZeniCorp
                </span>
              </Reveal>

              <h1 className="mt-7 font-heading text-display-lg font-semibold text-white">
                <RevealLines delay={160} lines={[<>{division.short}</>]} />
              </h1>

              <Reveal delay={400}>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zenicorp-text/85 sm:text-xl">
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
                  <a href={ZENICORP_PHONE_HREF} className="btn-secondary w-full backdrop-blur">
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
      <section className="section-padding relative overflow-hidden border-t border-zenicorp-line/70 bg-zenicorp-void/40">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            background: `radial-gradient(ellipse 55% 60% at 15% 20%, ${accent}, transparent 70%)`,
          }}
        />
        <div className="container-zenicorp relative">
          <Reveal>
            <span className="eyebrow">Déroulement</span>
            <h2 className="heading-2 mt-8 max-w-2xl">
              De la demande
              <br />
              <span className="text-zenicorp-faint">au chantier terminé.</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px border border-zenicorp-line/70 bg-zenicorp-line/40 sm:grid-cols-2 lg:grid-cols-4">
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
                <div className="group h-full bg-zenicorp-black p-8 transition-colors duration-500 hover:bg-zenicorp-surface sm:p-9">
                  <span
                    className="font-mono text-xs transition-colors duration-500"
                    style={{ color: accent }}
                  >
                    {s.n}
                  </span>
                  <h3 className="mt-6 font-heading text-xl font-semibold text-zenicorp-text">
                    {s.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zenicorp-faint transition-colors duration-500 group-hover:text-zenicorp-dim">
                    {s.d}
                  </p>
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
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="relative overflow-hidden border-t border-zenicorp-line/70 py-section">
        <div className="absolute inset-0 bp-grid opacity-40" />
        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            background: `radial-gradient(ellipse 60% 70% at 50% 120%, ${accent}, transparent 70%)`,
          }}
        />

        <div className="container-zenicorp relative text-center">
          <h2 className="mx-auto max-w-3xl font-heading text-display-md font-semibold">
            <RevealLines
              lines={[
                <>Votre projet {division.short.toLowerCase()},</>,
                <>
                  <span className="text-gold-gradient">pris en charge</span>.
                </>,
              ]}
            />
          </h2>

          <Reveal delay={280}>
            <p className="body-base mx-auto mt-8 max-w-lg">
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
              <a href={ZENICORP_PHONE_HREF} className="btn-outline-gold px-10 py-4 text-base">
                <Phone className="h-4 w-4" />
                {ZENICORP_PHONE}
              </a>
            </div>

            <p className="mt-10 text-sm text-zenicorp-faint">
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
