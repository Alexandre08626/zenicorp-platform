import Link from 'next/link';
import { divisionsData } from '@/lib/divisions-data';

const divisionImages: Record<string, string> = {
  epoxy: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
  asphalte: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
  toiture: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80',
  isolation: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
};

const divisionTint: Record<string, string> = {
  epoxy: 'from-[#0891B2]/80',
  asphalte: 'from-[#475569]/80',
  toiture: 'from-[#7f1d1d]/80',
  isolation: 'from-[#047857]/80',
};

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
            alt="Architecture moderne"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black" />
          <div className="absolute inset-0 bg-mesh opacity-50" />
        </div>

        <div className="relative container-z z-10 pt-28 pb-24 text-center">
          <span className="chip animate-fade-up">Système IA de la construction — Québec</span>

          <h1 className="heading-1 mt-7 mb-6 text-balance animate-fade-up animate-delay-100">
            Le futur de la<br />
            <span className="text-gradient">construction.</span>
          </h1>

          <p className="body-large max-w-2xl mx-auto mb-10 animate-fade-up animate-delay-200">
            Soumettez votre projet, <span className="text-white font-semibold">gratuitement</span>. Notre système
            IA vous redirige vers la bonne division et sélectionne l'entrepreneur idéal. ZeniCorp prend{' '}
            <span className="text-cyan font-semibold">30 %</span> seulement à la signature du contrat.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animate-delay-300">
            <Link href="/projet" className="btn-primary text-lg px-10 py-5 w-full sm:w-auto">
              Je suis client — soumettre
            </Link>
            <Link href="/entrepreneur" className="btn-ghost text-lg px-10 py-5 w-full sm:w-auto">
              Je suis entrepreneur — gratuit
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-up animate-delay-400">
            <div className="glass glass-hover p-5 text-left">
              <div className="text-3xl font-heading font-bold text-white">0 $</div>
              <div className="text-sm text-muted mt-1">soumission gratuite pour le client</div>
            </div>
            <div className="glass glass-hover p-5 text-left">
              <div className="text-3xl font-heading font-bold text-cyan">30 %</div>
              <div className="text-sm text-muted mt-1">à ZeniCorp à la signature du contrat</div>
            </div>
            <div className="glass glass-hover p-5 text-left">
              <div className="text-3xl font-heading font-bold text-white">70 %</div>
              <div className="text-sm text-muted mt-1">à l'entrepreneur, pour chaque job</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BANDEAU DIVISIONS ================= */}
      <section className="py-12 border-y border-line bg-black2">
        <div className="container-z">
          <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-dim mb-6">
            Quatre spécialités · un seul réseau
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {divisionsData.map((d) => (
              <a
                key={d.slug}
                href={d.site}
                target="_blank"
                rel="noopener noreferrer"
                className="chip hover:bg-cyan/[0.12] hover:text-cyanBright transition-colors"
              >
                {d.name.replace('ZeniCorp ', '')}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LE MODÈLE ================= */}
      <section id="modele" className="relative section-pad bg-black">
        <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />
        <div className="relative container-z">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">Le modèle</span>
            <h2 className="heading-2 mt-5 mb-6">
              ZeniCorp est <span className="text-gradient">l'outil</span> entre les deux
            </h2>
            <p className="body-large">
              Nous sommes l'image, la technologie et le garant. Le client ne choisit pas :{' '}
              <span className="text-white font-semibold">ZeniCorp sélectionne</span> l'entrepreneur selon le secteur et la job.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Client */}
            <div className="glass glass-hover p-8">
              <div className="w-12 h-12 grid place-items-center rounded-xl bg-white/[0.06] border border-line text-cyan mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
                </svg>
              </div>
              <div className="text-xs font-semibold uppercase tracking-widest text-cyan mb-2">1 · Client</div>
              <h3 className="heading-3 mb-3">Je soumets mon projet</h3>
              <p className="body-base text-sm">
                Je décris mes travaux en 2 minutes, gratuitement. Je suis redirigé vers la bonne division.
              </p>
            </div>

            {/* ZeniCorp */}
            <div className="glass-strong p-8 border-cyan/30 shadow-glow-cyan">
              <div className="flex items-center justify-between mb-5">
                <img src="/logo.png" alt="ZeniCorp" className="h-9 w-auto" />
                <span className="chip">L'image · L'outil · Le garant</span>
              </div>
              <div className="text-xs font-semibold uppercase tracking-widest text-cyan mb-2">2 · ZeniCorp</div>
              <h3 className="heading-3 mb-3">Le système sélectionne</h3>
              <p className="body-base text-sm">
                Notre IA analyse la job, la région et le secteur, puis assigne l'entrepreneur le plus qualifié.
              </p>
              <div className="mt-5 rounded-xl bg-black/40 border border-line p-4 font-mono text-xs text-cyan/80 space-y-1.5">
                <div className="flex gap-2"><span className="text-cyanBright">›</span> Analyse de la demande…</div>
                <div className="flex gap-2"><span className="text-cyanBright">›</span> Jumelage : qualifié · dispo · noté</div>
                <div className="flex gap-2"><span className="text-cyanBright">›</span> Soumission + RDV confirmés</div>
                <div className="flex gap-2 text-cyan animate-pulse"><span>▌</span> Contrat prêt à signer</div>
              </div>
            </div>

            {/* Entrepreneur */}
            <div className="glass glass-hover p-8">
              <div className="w-12 h-12 grid place-items-center rounded-xl bg-white/[0.06] border border-line text-cyan mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 21h14a1 1 0 001-1v-7a1 1 0 00-1-1H5a1 1 0 00-1 1v7a1 1 0 001 1z" />
                </svg>
              </div>
              <div className="text-xs font-semibold uppercase tracking-widest text-cyan mb-2">3 · Entrepreneur</div>
              <h3 className="heading-3 mb-3">Il réalise la job</h3>
              <p className="body-base text-sm">
                Contrat signé → ZeniCorp prend 30 %, l'entrepreneur garde 70 % et réalise les travaux.
              </p>
            </div>
          </div>

          {/* Barre de répartition */}
          <div className="mt-10 glass-strong p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-3 sm:w-44">
                <div className="text-4xl font-heading font-bold text-cyan">70 %</div>
                <p className="text-sm text-muted">à l'entrepreneur après la job</p>
              </div>
              <div className="flex-1 w-full h-3 rounded-full bg-black/40 border border-line overflow-hidden flex">
                <div className="h-full w-[70%] bg-gradient-to-r from-cyan to-cyanDeep"></div>
                <div className="h-full w-[30%] bg-white/10"></div>
              </div>
              <div className="flex items-center gap-3 sm:w-44 justify-end">
                <p className="text-sm text-muted text-right">à ZeniCorp, à la signature</p>
                <div className="text-4xl font-heading font-bold text-white/40">30 %</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DIVIDER IMAGE ================= */}
      <section className="relative h-[46vh] sm:h-[56vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80"
          alt="Chantier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        <div className="absolute inset-0 grid place-items-center text-center px-6">
          <p className="heading-2 max-w-3xl text-balance">
            De la soumission gratuite au contrat signé, <span className="text-gradient">tout passe par ZeniCorp</span>
          </p>
        </div>
      </section>

      {/* ================= CÔTÉ CLIENT ================= */}
      <section className="section-pad bg-black">
        <div className="container-z">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">Côté client</span>
            <h2 className="heading-2 mt-5 mb-6">Votre projet, géré de A à Z</h2>
            <p className="body-large">Pas de prise de tête. Vous soumettez, nous jumelons, on s'occupe du reste.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: '01', t: 'Soumission gratuite', d: 'Décrivez vos travaux en 2 minutes : division, superficie, adresse.' },
              { n: '02', t: 'RDV dans la bonne division', d: 'Vous êtes redirigé vers la division adaptée pour planifier une visite.' },
              { n: '03', t: 'Contrat signé', d: 'Soumission acceptée. ZeniCorp prend 30 %, l\'entrepreneur garde 70 %.' },
              { n: '04', t: 'La job est faite', d: 'Travaux réalisés par l\'entrepreneur sélectionné. Garanties incluses.' },
            ].map((item) => (
              <div key={item.n} className="glass glass-hover p-7">
                <div className="text-sm font-semibold text-cyan mb-4">PHASE {item.n}</div>
                <h3 className="heading-3 mb-3">{item.t}</h3>
                <p className="body-base text-sm">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CÔTÉ ENTREPRENEUR ================= */}
      <section className="section-pad bg-black2 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
        <div className="relative container-z">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">Côté entrepreneur</span>
            <h2 className="heading-2 mt-5 mb-6">
              Du travail. Sans payer. <span className="text-gradient">Sans chasser les contrats.</span>
            </h2>
            <p className="body-large">
              Créez votre compte gratuitement. ZeniCorp vous envoie les contrats. Soumission acceptée
              et signée, vous gardez 70 %.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { t: 'Inscription gratuite', d: 'RBQ, assurances, spécialités. Zéro frais pour rejoindre le réseau.', i: '01' },
              { t: 'Contrats assignés par IA', d: 'Le système vous jumelle aux jobs de votre secteur. Les mandats arrivent à vous.', i: '02' },
              { t: '70 % à la signature', d: 'Soumission acceptée et contrat signé = vous gardez 70 %. ZeniCorp prend 30 %.', i: '03' },
            ].map((c) => (
              <div key={c.t} className="glass glass-hover p-8">
                <div className="text-4xl font-heading font-bold text-white/15 mb-5">{c.i}</div>
                <h3 className="heading-3 mb-3">{c.t}</h3>
                <p className="body-base text-sm">{c.d}</p>
              </div>
            ))}
          </div>

          {/* Exemple concret */}
          <div className="mt-10 glass-strong p-8 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="lg:w-1/3">
                <h3 className="heading-3 mb-2">Exemple concret</h3>
                <p className="body-base text-sm">Un contrat de 10 000 $ — la répartition réelle.</p>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-black/30 border border-line p-5">
                  <div className="text-xs text-dim uppercase tracking-widest mb-1">Client (contrat signé)</div>
                  <div className="text-2xl font-heading font-bold text-white">10 000 $</div>
                  <div className="text-xs text-muted mt-1">soumission gratuite</div>
                </div>
                <div className="rounded-xl bg-black/30 border border-cyan/40 p-5 shadow-glow-cyan">
                  <div className="text-xs text-dim uppercase tracking-widest mb-1">Votre part</div>
                  <div className="text-2xl font-heading font-bold text-cyan">7 000 $</div>
                  <div className="text-xs text-muted mt-1">70 % du contrat</div>
                </div>
                <div className="rounded-xl bg-black/30 border border-line p-5">
                  <div className="text-xs text-dim uppercase tracking-widest mb-1">Plateforme</div>
                  <div className="text-2xl font-heading font-bold text-white/60">3 000 $</div>
                  <div className="text-xs text-muted mt-1">30 % à la signature</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/entrepreneur" className="btn-primary text-lg px-10 py-5">
              Créer mon compte entrepreneur — gratuit
            </Link>
          </div>
        </div>
      </section>

      {/* ================= DIVISIONS ================= */}
      <section id="divisions" className="section-pad bg-black">
        <div className="container-z">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">Nos divisions</span>
            <h2 className="heading-2 mt-5 mb-6">
              Quatre spécialités. <span className="text-gradient">Un seul réseau.</span>
            </h2>
            <p className="body-large">
              Chaque division a son site dédié, sa propre identité — et partage la même plateforme et les mêmes standards.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {divisionsData.map((division) => (
              <a
                key={division.slug}
                href={division.site}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-[340px] rounded-2xl overflow-hidden border border-line hover:border-cyan/40 transition-colors"
              >
                <img
                  src={divisionImages[division.slug]}
                  alt={division.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${divisionTint[division.slug]} via-black/50 to-black/10`} />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <div className="flex items-center justify-between">
                    <h3 className="heading-3">{division.name.replace('ZeniCorp ', '')}</h3>
                    <span className="flex items-center gap-2 text-sm text-white/80 group-hover:text-cyanBright transition-colors">
                      Voir le site <ArrowIcon />
                    </span>
                  </div>
                  <p className="text-sm text-white/80 mt-2 max-w-lg">{division.positioning}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POURQUOI ================= */}
      <section className="section-pad bg-black2">
        <div className="container-z">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">Pourquoi ZeniCorp</span>
            <h2 className="heading-2 mt-5 mb-6">
              Une plateforme, <span className="text-gradient">deux gagnants</span>
            </h2>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="glass glass-hover p-8">
              <h3 className="heading-3 mb-5">Pour le client</h3>
              <ul className="space-y-3.5">
                {[
                  'Projet réellement pris en charge : pas de ghosting d\'entrepreneur.',
                  'Soumission gratuite et sans engagement.',
                  'Redirection vers la bonne division pour un RDV et une soumission.',
                  'Entrepreneur sélectionné par notre système selon votre secteur et votre job.',
                  'Vous ne payez que lorsque la soumission est acceptée et le contrat signé.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <span className="w-5 h-5 mt-0.5 grid place-items-center rounded-full bg-cyan/15 text-cyan text-xs font-bold flex-shrink-0">✓</span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass glass-hover p-8">
              <h3 className="heading-3 mb-5">Pour l'entrepreneur</h3>
              <ul className="space-y-3.5">
                {[
                  'Inscription 100 % gratuite : rien à payer pour obtenir du travail.',
                  'ZeniCorp trouve les leads et sélectionne les meilleures jobs pour vous.',
                  'Vous gardez 70 % du contrat, à la soumission acceptée et signée.',
                  'Zéro marketing à faire : les clients viennent à nous.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <span className="w-5 h-5 mt-0.5 grid place-items-center rounded-full bg-cyan/15 text-cyan text-xs font-bold flex-shrink-0">✓</span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="section-pad bg-black">
        <div className="container-z max-w-3xl">
          <header className="text-center mb-14">
            <span className="eyebrow">Questions fréquentes</span>
            <h2 className="heading-2 mt-5">FAQ Plateforme</h2>
          </header>

          <div className="space-y-4">
            {[
              { q: 'Combien coûte la soumission ?', a: 'La soumission est 100 % gratuite pour le client. Vous décrivez votre projet, vous êtes redirigé vers la bonne division pour prendre RDV. Vous ne payez que lorsque la soumission est acceptée et le contrat signé.' },
              { q: 'Quand ZeniCorp prend-il sa part ?', a: 'ZeniCorp prélève 30 % du montant du contrat au moment où la soumission est acceptée et le contrat signé. L\'entrepreneur garde 70 %.' },
              { q: 'Le client choisit-il son entrepreneur ?', a: 'Non. C\'est notre force : ZeniCorp sélectionne l\'entrepreneur dans sa banque de données selon le secteur et la job. On vous donne le meilleur profil pour vos travaux.' },
              { q: 'L\'inscription entrepreneur est-elle vraiment gratuite ?', a: 'Oui. Créer un compte, recevoir des contrats et soumissionner ne coûte rien. ZeniCorp prend 30 % seulement à la signature du contrat.' },
              { q: 'Quelles divisions sont disponibles ?', a: 'ZeniCorp Epoxy, Asphalte, Toiture et Isolation. D\'autres divisions s\'ajouteront pour couvrir tous les domaines de la construction.' },
            ].map((item) => (
              <details key={item.q} className="group glass p-6 open:border-cyan/30 transition-colors">
                <summary className="heading-3 flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span className="text-lg">{item.q}</span>
                  <span className="text-cyan text-xl transition-transform group-open:rotate-45 flex-shrink-0">+</span>
                </summary>
                <p className="body-base text-sm mt-4 border-t border-line pt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-black text-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80"
            alt="Construction"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0 bg-mesh opacity-60" />
        </div>
        <div className="relative container-z">
          <h2 className="heading-2 max-w-3xl mx-auto mb-6 text-balance">
            Rejoignez la plateforme qui va <span className="text-gradient">redéfinir la construction</span>
          </h2>
          <p className="body-large max-w-2xl mx-auto mb-10">
            Client ou entrepreneur ? Le futur de la construction commence ici.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/projet" className="btn-primary text-lg px-10 py-5 w-full sm:w-auto">Soumettre mon projet</Link>
            <Link href="/entrepreneur" className="btn-ghost text-lg px-10 py-5 w-full sm:w-auto">Créer mon compte entrepreneur</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
