import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Shield,
  Users,
  Clock,
  FileCheck,
  Building2,
  Phone,
  BadgeCheck,
} from 'lucide-react';
import {
  divisionsData,
  MODEL,
  ZENICORP_PHONE,
  ZENICORP_PHONE_HREF,
} from '@/lib/divisions-data';

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-zenicorp-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_0%,rgba(212,175,55,0.10),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_100%,rgba(14,149,217,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-[0.05]" />

        <div className="container-zenicorp relative z-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 animate-fade-up">
              <span className="badge-gold mb-8">Plateforme de rénovation · Québec</span>

              <h1 className="heading-1 mb-6 text-balance">
                Votre projet.
                <br />
                <span className="text-zenicorp-gold">Notre réseau d&apos;entrepreneurs.</span>
                <br />
                <span className="text-zenicorp-dim">Une seule plateforme.</span>
              </h1>

              <p className="text-xl text-zenicorp-dim mb-10 max-w-xl leading-relaxed">
                Vous décrivez vos travaux et payez un dépôt unique de{' '}
                <strong className="text-zenicorp-gold">{MODEL.deposit}</strong>. Un entrepreneur
                certifié RBQ du réseau prend le projet en charge et vous contacte sous{' '}
                {MODEL.contactDelay}.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/projet" className="btn-gold text-base px-8 py-4">
                  Soumettre mon projet
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link href="/entrepreneur" className="btn-outline-gold text-base px-8 py-4">
                  Je suis entrepreneur — gratuit
                </Link>
              </div>

              <a
                href={ZENICORP_PHONE_HREF}
                className="inline-flex items-center gap-2 mt-6 text-zenicorp-dim hover:text-zenicorp-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-zenicorp-gold" />
                Une question ? {ZENICORP_PHONE}
              </a>

              <dl className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
                {[
                  { v: MODEL.deposit, l: 'dépôt unique client' },
                  { v: MODEL.contractorShare, l: "du contrat à l'entrepreneur" },
                  { v: MODEL.contactDelay, l: 'pour être contacté' },
                ].map((s) => (
                  <div key={s.l} className="border-l border-zenicorp-gold/30 pl-4">
                    <dt className="font-heading font-bold text-2xl text-zenicorp-gold">{s.v}</dt>
                    <dd className="text-xs text-zenicorp-dim mt-1 leading-snug">{s.l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Visuel plateforme */}
            <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center">
              <div className="relative w-[340px] h-[340px]">
                <div className="absolute inset-0 rounded-full border border-zenicorp-gold/20 animate-float-y" />
                <div className="absolute inset-8 rounded-full border border-zenicorp-line" />
                <div className="absolute inset-16 rounded-full border border-zenicorp-gold/10" />

                <div className="absolute inset-0 m-auto w-28 h-28 rounded-2xl bg-gradient-to-br from-zenicorp-gold to-zenicorp-gold/60 flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.35)]">
                  <Building2 className="w-12 h-12 text-zenicorp-black" />
                </div>

                {divisionsData.map((d, i) => {
                  const pos = [
                    '-top-2 left-1/2 -translate-x-1/2',
                    'top-1/2 -right-4 -translate-y-1/2',
                    '-bottom-2 left-1/2 -translate-x-1/2',
                    'top-1/2 -left-4 -translate-y-1/2',
                  ][i];
                  return (
                    <Link
                      key={d.slug}
                      href={`/${d.slug}`}
                      className={`absolute ${pos} group flex items-center gap-2 px-3 py-2 rounded-xl border bg-zenicorp-surface/90 backdrop-blur transition-transform hover:scale-105`}
                      style={{ borderColor: `${d.color}55` }}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: d.color }}
                      />
                      <span className="text-xs font-medium text-zenicorp-text whitespace-nowrap">
                        {d.short}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ BANDEAU MODÈLE ═══════════════ */}
      <section className="bg-zenicorp-surface border-y border-zenicorp-line">
        <div className="container-zenicorp py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                ic: FileCheck,
                v: MODEL.deposit,
                l: 'Dépôt client unique, conservé par ZeniCorp',
              },
              { ic: BadgeCheck, v: 'Gratuit', l: 'Inscription des entrepreneurs au réseau' },
              {
                ic: Shield,
                v: MODEL.contractorShare,
                l: "Part du contrat versée à l'entrepreneur",
              },
            ].map((x) => (
              <div key={x.l} className="flex items-start gap-4">
                <span className="w-11 h-11 shrink-0 rounded-xl bg-zenicorp-gold/10 border border-zenicorp-gold/30 flex items-center justify-center">
                  <x.ic className="w-5 h-5 text-zenicorp-gold" />
                </span>
                <div>
                  <div className="font-heading font-bold text-2xl text-zenicorp-gold leading-tight">
                    {x.v}
                  </div>
                  <p className="text-sm text-zenicorp-dim mt-1 leading-snug">{x.l}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESSUS CLIENT ═══════════════ */}
      <section className="section-padding bg-zenicorp-black">
        <div className="container-zenicorp">
          <header className="max-w-2xl mb-14">
            <span className="badge-gold mb-4">Côté client</span>
            <h2 className="heading-2 mt-2">Votre projet, géré de A à Z</h2>
            <p className="body-large mt-4">
              Vous soumettez, le réseau exécute. Vous n&apos;avez pas à chercher, comparer ni
              relancer.
            </p>
          </header>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                n: '01',
                t: 'Décrivez vos travaux',
                d: 'Division, superficie, adresse, photos. Deux minutes suffisent.',
              },
              {
                n: '02',
                t: `Dépôt de ${MODEL.deposit}`,
                d: 'Le dépôt réserve votre projet dans le réseau. Aucun frais caché.',
              },
              {
                n: '03',
                t: 'Un entrepreneur est assigné',
                d: `Certifié RBQ et assuré, il vous contacte sous ${MODEL.contactDelay} pour la visite et le prix ferme.`,
              },
              {
                n: '04',
                t: 'Travaux réalisés',
                d: `Le chantier est exécuté, puis l'entrepreneur reçoit ${MODEL.contractorShare} du contrat.`,
              },
            ].map((item) => (
              <li key={item.n} className="relative card p-7">
                <span className="absolute top-4 right-5 font-heading font-bold text-5xl text-zenicorp-gold/10">
                  {item.n}
                </span>
                <h3 className="heading-3 text-lg mt-6 mb-2">{item.t}</h3>
                <p className="body-base text-sm">{item.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════════════ DIVISIONS — vraies photos ═══════════════ */}
      <section id="nos-divisions" className="section-padding bg-zenicorp-surface border-t border-zenicorp-line">
        <div className="container-zenicorp">
          <header className="max-w-2xl mb-14">
            <span className="badge-gold mb-4">Nos divisions</span>
            <h2 className="heading-2 mt-2">Quatre spécialités. Un seul réseau.</h2>
            <p className="body-large mt-4">
              Chaque division regroupe ses propres entrepreneurs spécialisés, sous une même
              plateforme.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {divisionsData.map((d, i) => (
              <Link
                key={d.slug}
                href={`/${d.slug}`}
                className="group card overflow-hidden animate-fade-up"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={d.photo}
                    alt={`Travaux ${d.short} — réseau ZeniCorp`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zenicorp-surface via-zenicorp-surface/40 to-transparent" />
                  <span
                    className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold border backdrop-blur"
                    style={{
                      color: d.color,
                      borderColor: `${d.color}66`,
                      background: 'rgba(5,7,11,0.6)',
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                    {d.name}
                  </span>
                </div>

                <div className="p-7">
                  <h3 className="heading-3 text-xl mb-3">{d.positioning}</h3>
                  <ul className="space-y-2 mb-6">
                    {d.services.slice(0, 3).map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2.5 text-sm text-zenicorp-dim"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: d.color }}
                        />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-zenicorp-gold group-hover:gap-3 transition-all">
                    Voir la division <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CÔTÉ ENTREPRENEUR ═══════════════ */}
      <section className="section-padding bg-zenicorp-black">
        <div className="container-zenicorp">
          <header className="max-w-2xl mb-14">
            <span className="badge-gold mb-4">Côté entrepreneur</span>
            <h2 className="heading-2 mt-2">Des contrats, sans frais d&apos;adhésion</h2>
            <p className="body-large mt-4">
              Vous exécutez le métier, la plateforme s&apos;occupe de trouver et qualifier les
              clients.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                ic: BadgeCheck,
                t: 'Inscription gratuite',
                d: 'Licence RBQ, assurances et spécialités. Aucun frais pour rejoindre le réseau.',
              },
              {
                ic: Users,
                t: 'Projets qualifiés',
                d: `Les clients ont déjà déposé ${MODEL.deposit} : les demandes reçues sont sérieuses.`,
              },
              {
                ic: Clock,
                t: `${MODEL.contractorShare} du contrat`,
                d: `Vous conservez ${MODEL.contractorShare} du montant du contrat, ZeniCorp retient ${MODEL.platformShare}.`,
              },
            ].map((b, i) => (
              <div
                key={b.t}
                className="card p-7 animate-fade-up"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-zenicorp-gold/10 border border-zenicorp-gold/30 flex items-center justify-center mb-5">
                  <b.ic className="w-6 h-6 text-zenicorp-gold" />
                </div>
                <h3 className="heading-3 text-lg mb-2">{b.t}</h3>
                <p className="body-base text-sm">{b.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/entrepreneur" className="btn-gold text-base px-8 py-4">
              Créer mon compte entrepreneur — gratuit
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA FINAL ═══════════════ */}
      <section className="relative section-padding bg-zenicorp-surface border-t border-zenicorp-line overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(212,175,55,0.08),transparent)]" />
        <div className="container-zenicorp relative text-center">
          <h2 className="heading-2 mb-5 text-balance">Client ou entrepreneur ?</h2>
          <p className="body-large mb-10 max-w-xl mx-auto">
            Déposez votre projet ou rejoignez le réseau. Les deux se font en ligne, en quelques
            minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/projet" className="btn-gold text-base px-9 py-4">
              Soumettre mon projet
            </Link>
            <Link href="/entrepreneur" className="btn-secondary text-base px-9 py-4">
              Devenir entrepreneur partenaire
            </Link>
          </div>
          <a
            href={ZENICORP_PHONE_HREF}
            className="inline-flex items-center gap-2 mt-8 text-zenicorp-dim hover:text-zenicorp-gold transition-colors"
          >
            <Phone className="w-4 h-4 text-zenicorp-gold" />
            {ZENICORP_PHONE}
          </a>
        </div>
      </section>
    </main>
  );
}
