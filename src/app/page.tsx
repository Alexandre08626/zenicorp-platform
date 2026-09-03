import Link from 'next/link';
import { divisionsData } from '@/lib/divisions-data';
import { ArrowRight, Shield, Users, Clock, Cpu, Building, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* ══════════ HERO CINÉMATIQUE ══════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-zenicorp-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_0%,rgba(212,175,55,0.10),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_100%,rgba(14,149,217,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-[0.06]" />

        <div className="container-zenicorp relative z-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <span className="badge-gold mb-8">Plateforme de rénovation · Québec</span>
              <h1 className="heading-1 mb-6 text-balance">
                Votre projet.<br />
                <span className="text-zenicorp-gold">Notre réseau.</span><br />
                <span className="text-zenicorp-dim">La technologie avec.</span>
              </h1>
              <p className="text-xl text-zenicorp-dim mb-10 max-w-xl leading-relaxed">
                Vous soumettez votre projet, payez un dépôt unique de <strong className="text-zenicorp-gold">305 $</strong>.
                Un entrepreneur certifié du réseau réalise les travaux. Sans prise de tête.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/projet" className="btn-gold text-lg px-10 py-5">
                  JE SUIS CLIENT — SOUMETTRE MON PROJET
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href="/entrepreneur" className="btn-outline-gold text-lg px-10 py-5">
                  JE SUIS ENTREPRENEUR — GRATUIT
                </Link>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { v: '305 $', l: 'dépôt unique' },
                  { v: '70 %', l: 'à l\'entrepreneur' },
                  { v: '24 h', l: 'contact garanti' },
                ].map((s) => (
                  <div key={s.l} className="border-l border-zenicorp-gold/30 pl-4">
                    <p className="font-heading font-bold text-2xl text-zenicorp-gold">{s.v}</p>
                    <p className="text-xs text-zenicorp-dim mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-full border border-zenicorp-gold/20 animate-float-y" />
                <div className="absolute inset-6 rounded-full border border-zenicorp-line" />
                <div className="absolute inset-14 rounded-full border border-zenicorp-gold/10" />
                <div className="absolute inset-0 m-auto w-28 h-28 rounded-2xl bg-gradient-to-br from-zenicorp-gold to-zenicorp-gold/60 flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.35)]">
                  <Building className="w-12 h-12 text-zenicorp-black" />
                </div>
                {[
                  { ic: Shield, c: '#0E95D9', x: '-top-3 -left-6' },
                  { ic: Users, c: '#E0603A', x: 'top-1/2 -right-10' },
                  { ic: Clock, c: '#2FA086', x: 'bottom-4 -left-12' },
                  { ic: Cpu, c: '#5B6472', x: 'top-1/3 -left-16' },
                ].map((s, i) => (
                  <div key={i} className={`absolute ${s.x} w-14 h-14 rounded-xl flex items-center justify-center border bg-zenicorp-surface/80 backdrop-blur`}
                    style={{ borderColor: s.c + '55' }}>
                    <s.ic className="w-6 h-6" style={{ color: s.c }} />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 rounded-full border border-dashed border-zenicorp-line/30" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zenicorp-surface border-t border-zenicorp-line">
        <div className="container-zenicorp py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { v: '305 $', l: 'Dépôt client — gardé par ZeniCorp', c: 'text-zenicorp-gold' },
              { v: 'GRATUIT', l: 'Inscription entrepreneur', c: 'text-zenicorp-gold' },
              { v: '70 %', l: 'Pour l\'entrepreneur à chaque job', c: 'text-zenicorp-gold' },
            ].map((x) => (
              <div key={x.l}>
                <div className={`font-heading font-bold text-3xl ${x.c}`}>{x.v}</div>
                <p className="text-zenicorp-dim text-sm mt-1">{x.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-zenicorp-black">
        <div className="container-zenicorp">
          <header className="max-w-2xl mb-16">
            <span className="badge-gold mb-4">Côté client</span>
            <h2 className="heading-2 mt-2">Votre projet, géré de A à Z</h2>
            <p className="body-large mt-4">Soumettez, on jumelle, un entrepreneur du réseau réalise. Simple.</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: '01', t: 'Soumettez votre projet', d: 'Décrivez vos travaux en 2 minutes : division, superficie, adresse, photos.' },
              { n: '02', t: 'Dépôt de 305 $', d: 'Le dépôt est gardé par ZeniCorp pour réserver votre projet. Sans surprise.' },
              { n: '03', t: 'Un entrepreneur est jumelé', d: 'Certifié, assigné, il vous contacte sous 24 h.' },
              { n: '04', t: 'La job est faite', d: 'Travaux réalisés, solde payé, garanties conservées.' },
            ].map((item) => (
              <div key={item.n} className="relative card p-8">
                <span className="absolute top-4 right-6 font-heading font-bold text-6xl text-zenicorp-gold/10">{item.n}</span>
                <h3 className="heading-3 mt-4 mb-3">{item.t}</h3>
                <p className="body-base">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="nos-divisions" className="section-padding bg-zenicorp-surface">
        <div className="container-zenicorp">
          <header className="max-w-2xl mb-16">
            <span className="badge-gold mb-4">Nos divisions</span>
            <h2 className="heading-2 mt-2">Quatre spécialités. Un seul réseau.</h2>
            <p className="body-large mt-4">Chaque division a son identité, sa couleur, son réseau — sous une même plateforme.</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {divisionsData.map((d, i) => (
              <Link key={d.slug} href={`/${d.slug}`} className="group relative card p-8 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="absolute top-0 left-0 w-1 h-full" style={{ background: d.color }} />
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{d.icon}</span>
                  <span className="text-xs px-2 py-1 rounded border whitespace-nowrap font-medium"
                    style={{ color: d.color, borderColor: d.color + '44', background: d.color + '11' }}>
                    {d.name}
                  </span>
                </div>
                <h3 className="heading-3 mb-3">{d.positioning}</h3>
                <ul className="space-y-2 mb-6">
                  {d.services.slice(0, 3).map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-zenicorp-dim">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />
                      {s}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-zenicorp-gold group-hover:gap-3 transition-all">
                  Voir la division <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-zenicorp-black">
        <div className="container-zenicorp">
          <header className="max-w-2xl mb-16">
            <span className="badge-gold mb-4">Côté entrepreneur</span>
            <h2 className="heading-2 mt-2">Du travail. Sans payer. Sans chasser les contrats.</h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { ic: Sparkles, t: 'Inscription gratuite', d: 'RBQ, assurances, spécialités. Zéro frais.' },
              { ic: Users, t: 'Contrats assignés', d: 'Les clients paient via ZeniCorp. Vous recevez les mandats.' },
              { ic: Shield, t: 'Chèque de 70 %', d: 'Job complétée = chèque de 70 % du contrat.' },
            ].map((b, i) => (
              <div key={b.t} className="card p-8 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-zenicorp-gold/10 border border-zenicorp-gold/30 flex items-center justify-center mb-4">
                  <b.ic className="w-6 h-6 text-zenicorp-gold" />
                </div>
                <h3 className="heading-3 mb-3">{b.t}</h3>
                <p className="body-base">{b.d}</p>
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

      <section className="section-padding bg-zenicorp-surface">
        <div className="container-zenicorp text-center">
          <span className="badge-gold mb-6">La plateforme qui finira en app GO</span>
          <h2 className="heading-2 text-white mb-6">Client ou entrepreneur ? Rejoignez le réseau.</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/projet" className="btn-gold text-lg px-10 py-5">SOUMETTRE MON PROJET</Link>
            <Link href="/entrepreneur" className="btn-outline-gold text-lg px-10 py-5">CRÉER MON COMPTE ENTREPRENEUR</Link>
          </div>
        </div>
      </section>
    </main>
  );
}