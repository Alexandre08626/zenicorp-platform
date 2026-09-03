import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, Check, Phone, ExternalLink } from 'lucide-react';
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
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ═══════════ HERO — photo réelle de la division ═══════════ */}
      <section className="relative min-h-[68vh] flex items-end overflow-hidden">
        <Image
          src={division.photo}
          alt={`Travaux ${division.short} réalisés par le réseau ZeniCorp`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Voiles de lisibilité : sombre en bas, teinte division sur les bords */}
        <div className="absolute inset-0 bg-gradient-to-t from-zenicorp-black via-zenicorp-black/85 to-zenicorp-black/45" />
        <div
          className="absolute inset-0 opacity-25 mix-blend-color"
          style={{ background: `linear-gradient(120deg, ${accent} 0%, transparent 65%)` }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zenicorp-black to-transparent" />

        <div className="container-zenicorp relative z-10 pb-16 pt-32">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 text-sm text-zenicorp-dim hover:text-zenicorp-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la plateforme
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span
              className="relative w-14 h-14 rounded-xl overflow-hidden border bg-zenicorp-black/70 backdrop-blur flex items-center justify-center"
              style={{ borderColor: `${accent}66` }}
            >
              <Image
                src={division.logo}
                alt={`Logo ${division.name}`}
                width={40}
                height={40}
                className="object-contain"
              />
            </span>
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold border backdrop-blur"
              style={{ color: accent, borderColor: `${accent}55`, background: `${accent}1A` }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
              Division ZeniCorp
            </span>
          </div>

          <h1 className="heading-1 mb-5 text-balance max-w-4xl">{division.name}</h1>
          <p className="text-xl text-zenicorp-dim max-w-2xl leading-relaxed mb-10">
            {division.positioning}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/projet?division=${division.slug}`} className="btn-gold text-base px-8 py-4">
              Soumettre mon projet {division.short.toLowerCase()}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <a href={ZENICORP_PHONE_HREF} className="btn-secondary text-base px-8 py-4">
              <Phone className="w-4 h-4 mr-2" />
              {ZENICORP_PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section className="section-padding bg-zenicorp-surface border-t border-zenicorp-line">
        <div className="container-zenicorp">
          <header className="max-w-2xl mb-14">
            <span className="badge-gold mb-4">Nos services</span>
            <h2 className="heading-2 mt-2">Spécialités {division.short.toLowerCase()}</h2>
            <p className="body-large mt-4">
              Travaux réalisés par des entrepreneurs certifiés RBQ du réseau, assignés selon votre
              secteur.
            </p>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {division.services.map((service) => (
              <li key={service}>
                <Link
                  href={`/projet?division=${division.slug}`}
                  className="group card flex items-start gap-4 p-6 h-full"
                >
                  <span
                    className="mt-0.5 w-9 h-9 shrink-0 rounded-lg flex items-center justify-center border"
                    style={{ borderColor: `${accent}44`, background: `${accent}14` }}
                  >
                    <Check className="w-4 h-4" style={{ color: accent }} />
                  </span>
                  <span>
                    <span className="block font-semibold text-zenicorp-text leading-snug">
                      {service}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-zenicorp-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      Demander <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════ PROCESSUS — aligné sur le modèle réel ═══════════ */}
      <section className="section-padding bg-zenicorp-black">
        <div className="container-zenicorp">
          <header className="max-w-2xl mb-14">
            <span className="badge-gold mb-4">Comment ça marche</span>
            <h2 className="heading-2 mt-2">De la demande à la réalisation</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                n: '01',
                t: 'Vous décrivez le projet',
                d: `Division ${division.short.toLowerCase()}, superficie, adresse, photos. Deux minutes suffisent.`,
              },
              {
                n: '02',
                t: `Dépôt de ${MODEL.deposit}`,
                d: 'Le dépôt réserve votre projet dans le réseau et est conservé par ZeniCorp.',
              },
              {
                n: '03',
                t: 'Un entrepreneur est assigné',
                d: `Certifié RBQ et assuré, il vous contacte sous ${MODEL.contactDelay} pour la visite et le prix ferme.`,
              },
              {
                n: '04',
                t: 'Travaux et paiement',
                d: `Les travaux sont réalisés puis l'entrepreneur reçoit ${MODEL.contractorShare} du contrat.`,
              },
            ].map((item) => (
              <div key={item.n} className="relative card p-7">
                <span
                  className="absolute top-4 right-5 font-heading font-bold text-5xl opacity-15"
                  style={{ color: accent }}
                >
                  {item.n}
                </span>
                <h3 className="heading-3 text-lg mt-6 mb-2">{item.t}</h3>
                <p className="body-base text-sm">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="section-padding bg-zenicorp-surface border-y border-zenicorp-line">
        <div className="container-zenicorp max-w-3xl">
          <header className="mb-10">
            <span className="badge-gold mb-4">Questions fréquentes</span>
            <h2 className="heading-2 mt-2">Ce que les clients demandent</h2>
          </header>

          <div className="space-y-3">
            {division.faq.map((item) => (
              <details key={item.q} className="group card p-6">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="font-semibold text-zenicorp-text text-lg leading-snug">
                    {item.q}
                  </span>
                  <span
                    className="shrink-0 text-2xl leading-none transition-transform duration-200 group-open:rotate-45"
                    style={{ color: accent }}
                  >
                    +
                  </span>
                </summary>
                <p className="body-base text-sm mt-4 pt-4 border-t border-zenicorp-line">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="relative section-padding bg-zenicorp-black overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ background: `radial-gradient(ellipse 60% 60% at 50% 0%, ${accent}, transparent)` }}
        />
        <div className="container-zenicorp relative text-center">
          <h2 className="heading-2 mb-5 max-w-2xl mx-auto text-balance">
            Prêt à lancer votre projet {division.short.toLowerCase()} ?
          </h2>
          <p className="body-large mb-10 max-w-xl mx-auto">
            Dépôt unique de {MODEL.deposit}. Un entrepreneur certifié du réseau vous contacte sous{' '}
            {MODEL.contactDelay}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/projet?division=${division.slug}`} className="btn-gold text-base px-9 py-4">
              Soumettre mon projet
            </Link>
            <a href={ZENICORP_PHONE_HREF} className="btn-outline-gold text-base px-9 py-4">
              <Phone className="w-4 h-4 mr-2" />
              {ZENICORP_PHONE}
            </a>
          </div>

          <p className="mt-8 text-sm text-zenicorp-dim">
            Vous cherchez le site de la division ?{' '}
            <a
              href={division.site}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-zenicorp-gold hover:underline"
            >
              {division.site.replace('https://', '')}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
