import Link from 'next/link';
import { divisionsData } from '@/lib/divisions-data';

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black">
        {/* Fond animé */}
        <div className="absolute inset-0 bg-grid opacity-60 animate-grid-pan bg-grid-fade" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full bg-cyan/10 blur-[140px] animate-pulse-glow" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-cyan/5 blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-0 -right-32 w-[500px] h-[400px] rounded-full bg-cyan/10 blur-[120px]" />

        {/* Ligne de scan */}
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent animate-scan-line" />

        {/* Voile bas */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent" />

        <div className="relative container-zenicorp z-10 pt-24 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="tech-chip animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyanBright opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyanBright" />
              </span>
              SYSTÈME IA DE LA CONSTRUCTION — QUÉBEC
            </span>

            <h1 className="heading-1 mt-8 mb-7 text-balance animate-fade-up animate-delay-100">
              LE FUTUR DE LA<br />
              <span className="text-gradient-cyan">CONSTRUCTION.</span>
            </h1>

            <p className="body-large max-w-2xl mx-auto mb-11 animate-fade-up animate-delay-200">
              Vous soumettez votre projet. Notre système IA sélectionne l'entrepreneur idéal dans notre
              réseau certifié. ZeniCorp gère la soumission, le jumelage et la facturation —
              <span className="text-cyanBright font-semibold"> l'entrepreneur garde 70 %</span> de chaque contrat.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animate-delay-300">
              <Link href="/projet" className="btn-cyan text-lg px-10 py-5 w-full sm:w-auto">
                Je suis client — soumettre
              </Link>
              <Link href="/entrepreneur" className="btn-ghost text-lg px-10 py-5 w-full sm:w-auto">
                Je suis entrepreneur — gratuit
              </Link>
            </div>

            <p className="mt-7 text-sm text-dim animate-fade-up animate-delay-400">
              Dépôt de réservation 305 $ · Inscription entrepreneur 0 $ · Jumelage par IA sous 24 h
            </p>
          </div>

          {/* Bandeau statistiques / modèle */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-up animate-delay-500">
            {[
              { k: '30 %', v: 'à ZeniCorp — plateforme, leads, jumelage IA, support' },
              { k: '70 %', v: "à l'entrepreneur — à chaque contrat complété" },
              { k: '24 h', v: 'pour jumeler un entrepreneur certifié à votre projet' },
            ].map((s) => (
              <div key={s.k} className="panel panel-glow panel-hover corner p-6">
                <div className="font-tech text-4xl font-bold text-gradient-cyan">{s.k}</div>
                <div className="mt-2 text-sm text-muted leading-relaxed">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LE MODÈLE ZENICORP ================= */}
      <section id="modele" className="relative py-20 sm:py-28 bg-black2">
        <div className="container-zenicorp">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">Le modèle</span>
            <h2 className="heading-2 mt-4 mb-6">
              ZeniCorp est <span className="text-gradient-cyan">l'outil</span> entre les deux
            </h2>
            <p className="body-large">
              Nous ne connectons pas deux inconnus. Nous sommes l'image marketing, l'outil technologique
              et le garant. Le client ne choisit pas : <strong className="text-silver">ZeniCorp sélectionne</strong>
              {' '}l'entrepreneur dans sa banque de données, selon le secteur et la job.
            </p>
          </header>

          {/* Flux Client -> ZeniCorp -> Entrepreneur */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Client */}
            <div className="panel panel-hover p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 grid place-items-center rounded-lg bg-panel2 border border-line text-2xl">🏠</div>
                <div>
                  <div className="font-tech text-xs uppercase tracking-widest text-dim">1 · Client</div>
                  <h3 className="heading-3">Je soumets mon projet</h3>
                </div>
              </div>
              <p className="body-base text-sm">
                Je décris mes travaux en 2 minutes. Je paye le dépôt de 305 $. Mon projet entre dans le système.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-muted">
                <li className="flex gap-2"><span className="text-cyanBright">›</span>Division + superficie + adresse</li>
                <li className="flex gap-2"><span className="text-cyanBright">›</span>Dépôt sécurisé par ZeniCorp</li>
              </ul>
            </div>

            {/* ZeniCorp (centre, mise en avant) */}
            <div className="panel panel-glow corner p-8 border-cyan/40 shadow-glow-cyan-sm relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 tech-chip">L'IMAGE · L'OUTIL · LE GARANT</div>
              <div className="flex items-center gap-3 mb-4 mt-2">
                <div className="w-11 h-11 grid place-items-center rounded-lg bg-cyan-gradient font-tech font-black text-black">Z</div>
                <div>
                  <div className="font-tech text-xs uppercase tracking-widest text-cyanBright">2 · ZeniCorp</div>
                  <h3 className="heading-3">Le système sélectionne</h3>
                </div>
              </div>
              <p className="body-base text-sm">
                Notre IA analyse la job, la région et le secteur, puis assigne l'entrepreneur le mieux qualifié
                de notre banque. ZeniCorp gère la soumission, la facture et le suivi.
              </p>
              <div className="mt-5 rounded-lg bg-black/50 border border-line p-4 font-mono text-xs text-cyanBright/80 space-y-1">
                <div>› Analyse de la demande…</div>
                <div>› Correspondance avec {`{banque: '1 200+ entrepreneurs'}`}</div>
                <div>› Sélection : <span className="text-cyanBright">qualifié · dispo · noté</span></div>
                <div className="animate-pulse text-cyan">▌ Jumelage confirmé sous 24 h</div>
              </div>
            </div>

            {/* Entrepreneur */}
            <div className="panel panel-hover p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 grid place-items-center rounded-lg bg-panel2 border border-line text-2xl">👷</div>
                <div>
                  <div className="font-tech text-xs uppercase tracking-widest text-dim">3 · Entrepreneur</div>
                  <h3 className="heading-3">Il réalise la job</h3>
                </div>
              </div>
              <p className="body-base text-sm">
                L'entrepreneur sélectionné réalise les travaux. Le client paye le solde. L'entrepreneur reçoit
                son chèque de <strong className="text-cyanBright">70 %</strong>.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-muted">
                <li className="flex gap-2"><span className="text-cyanBright">›</span>Travaux supervisés + garanties</li>
                <li className="flex gap-2"><span className="text-cyanBright">›</span>Chèque de 70 % à la complétion</li>
              </ul>
            </div>
          </div>

          {/* Barre de répartition */}
          <div className="mt-12 panel p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="font-tech text-3xl sm:text-4xl font-bold text-gradient-cyan">70 %</div>
                <p className="text-sm text-muted max-w-[220px]">à l'entrepreneur après les travaux</p>
              </div>
              <div className="flex-1 w-full h-3 rounded-full bg-black2 border border-line overflow-hidden flex">
                <div className="h-full w-[70%] bg-cyan-gradient"></div>
                <div className="h-full w-[30%] bg-white/10"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="font-tech text-3xl sm:text-4xl font-bold text-white/40">30 %</div>
                <p className="text-sm text-muted max-w-[220px]">à ZeniCorp — plateforme, leads, support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMMENT ÇA MARCHE — CLIENT ================= */}
      <section className="relative py-20 sm:py-28 bg-black">
        <div className="container-zenicorp">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">Côté client</span>
            <h2 className="heading-2 mt-4 mb-6">Votre projet, géré de A à Z</h2>
            <p className="body-large">
              Pas de prise de tête, pas de ghosting. Vous soumettez, nous jumelons, un entrepreneur du réseau réalise.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '01', title: 'Soumettez votre projet', desc: 'Décrivez vos travaux en 2 minutes : division, superficie, adresse, photos.' },
              { step: '02', title: 'Dépôt de 305 $', desc: 'Dépôt sécurisé par ZeniCorp pour réserver votre projet. Sans surprise.' },
              { step: '03', title: 'Jumelage par IA', desc: 'Notre système sélectionne l\'entrepreneur idéal. Il vous contacte sous 24 h.' },
              { step: '04', title: 'La job est faite', desc: 'Travaux réalisés. Vous payez le solde. Vous gardez vos garanties.' },
            ].map((item) => (
              <div key={item.step} className="panel panel-hover corner p-7 relative overflow-hidden">
                <span className="font-tech text-6xl font-bold text-cyan/15 absolute -top-2 -right-1">{item.step}</span>
                <div className="text-sm font-tech text-cyanBright tracking-widest mb-4">PHASE {item.step}</div>
                <h3 className="heading-3 mb-3">{item.title}</h3>
                <p className="body-base text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CÔTÉ ENTREPRENEUR ================= */}
      <section className="relative py-20 sm:py-28 bg-black2 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 bg-grid-fade pointer-events-none" />
        <div className="container-zenicorp relative">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">Côté entrepreneur</span>
            <h2 className="heading-2 mt-4 mb-6">
              Du travail. Sans payer. <span className="text-gradient-cyan">Sans chasser les contrats.</span>
            </h2>
            <p className="body-large">
              Créez votre compte gratuitement. ZeniCorp vous envoie des contrats. Vous faites la job.
              Vous recevez votre chèque de 70 %.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: 'Inscription gratuite', d: 'RBQ, assurances, spécialités. Zéro frais pour vous rejoindre.', i: 'M1' },
              { t: 'Contrats assignés par IA', d: 'Le système vous jumelle aux jobs de votre secteur. Vous recevez les mandats.', i: 'M2' },
              { t: 'Chèque de 70 %', d: 'Job complétée = chèque de 70 %. ZeniCorp couvre la plateforme avec le reste.', i: 'M3' },
            ].map((c) => (
              <div key={c.t} className="panel panel-hover panel-glow p-8">
                <div className="font-tech text-cyan/20 text-5xl font-bold mb-5">{c.i}</div>
                <h3 className="heading-3 mb-3">{c.t}</h3>
                <p className="body-base text-sm">{c.d}</p>
              </div>
            ))}
          </div>

          {/* Exemple concret */}
          <div className="mt-12 panel p-8 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="lg:w-1/3">
                <h3 className="heading-3 mb-2">Exemple concret</h3>
                <p className="body-base text-sm">Un contrat de 10 000 $ — la répartition réelle.</p>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-black/50 border border-line p-5">
                  <div className="text-xs text-dim uppercase tracking-widest mb-1">Client paie</div>
                  <div className="font-tech text-2xl font-bold text-white">10 000 $</div>
                  <div className="text-xs text-muted mt-1">dont 305 $ de dépôt</div>
                </div>
                <div className="rounded-xl bg-black/50 border border-cyan/50 p-5 shadow-glow-cyan-sm">
                  <div className="text-xs text-dim uppercase tracking-widest mb-1">Votre chèque</div>
                  <div className="font-tech text-2xl font-bold text-gradient-cyan">7 000 $</div>
                  <div className="text-xs text-muted mt-1">70 % à la complétion</div>
                </div>
                <div className="rounded-xl bg-black/50 border border-line p-5">
                  <div className="text-xs text-dim uppercase tracking-widest mb-1">Plateforme</div>
                  <div className="font-tech text-2xl font-bold text-white/60">3 000 $</div>
                  <div className="text-xs text-muted mt-1">30 % à ZeniCorp</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/entrepreneur" className="btn-cyan text-lg px-10 py-5">
              Créer mon compte entrepreneur — gratuit
            </Link>
          </div>
        </div>
      </section>

      {/* ================= DIVISIONS ================= */}
      <section id="divisions" className="py-20 sm:py-28 bg-black">
        <div className="container-zenicorp">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">Nos divisions</span>
            <h2 className="heading-2 mt-4 mb-6">
              Quatre spécialités. <span className="text-gradient-cyan">Un seul réseau.</span>
            </h2>
            <p className="body-large">
              Chaque division partage la même plateforme, la même banque d'entrepreneurs et les mêmes standards.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {divisionsData.map((division, index) => (
              <Link
                key={division.slug}
                href={`/${division.slug}`}
                className="panel panel-hover group p-7 flex flex-col"
              >
                <div className="w-12 h-12 grid place-items-center rounded-lg bg-panel2 border border-line text-2xl mb-5 group-hover:border-cyan/50 transition-colors">
                  {division.icon}
                </div>
                <h3 className="heading-3 mb-2 group-hover:text-cyanBright transition-colors">{division.name}</h3>
                <p className="body-base text-sm mb-6 flex-1">{division.positioning}</p>
                <ul className="space-y-2 mb-7">
                  {division.services.slice(0, 3).map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-muted">
                      <span className="text-cyanBright mt-0.5">›</span>
                      {s}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 text-cyanBright font-semibold text-sm">
                  Voir la division
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POURQUOI ZENICORP ================= */}
      <section className="py-20 sm:py-28 bg-black2">
        <div className="container-zenicorp">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">Pourquoi ZeniCorp</span>
            <h2 className="heading-2 mt-4 mb-6">Une plateforme, <span className="text-gradient-cyan">deux gagnants</span></h2>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="panel panel-hover p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">🏠</span>
                <h3 className="heading-3">Pour le client</h3>
              </div>
              <ul className="space-y-3.5">
                {[
                  'Votre projet est réellement pris en charge : pas de ghosting d\'entrepreneur.',
                  'Le dépôt de 305 $ sécurise votre place et garantit qu\'un entrepreneur se présente.',
                  'L\'entrepreneur est sélectionné par notre système selon votre secteur et votre job.',
                  'Vous gardez vos garanties et le suivi ZeniCorp de A à Z.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <span className="w-5 h-5 mt-0.5 grid place-items-center rounded-full bg-cyan/15 text-cyanBright text-xs font-bold flex-shrink-0">✓</span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel panel-hover p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">👷</span>
                <h3 className="heading-3">Pour l'entrepreneur</h3>
              </div>
              <ul className="space-y-3.5">
                {[
                  'Inscription 100 % gratuite : rien à payer pour obtenir du travail.',
                  'ZeniCorp trouve les leads et sélectionne les meilleures jobs pour vous.',
                  'Vous recevez un chèque de 70 % à chaque contrat complété.',
                  'Zéro marketing à faire : les clients viennent à nous.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <span className="w-5 h-5 mt-0.5 grid place-items-center rounded-full bg-cyan/15 text-cyanBright text-xs font-bold flex-shrink-0">✓</span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20 sm:py-28 bg-black">
        <div className="container-zenicorp max-w-3xl">
          <header className="text-center mb-16">
            <span className="eyebrow">Questions fréquentes</span>
            <h2 className="heading-2 mt-4">FAQ Plateforme</h2>
          </header>

          <div className="space-y-4">
            {[
              { q: 'Le dépôt de 305 $ est-il remboursable ?', a: 'Non. Le dépôt de 305 $ est gardé par ZeniCorp. Il sécurise votre projet et garantit qu\'un entrepreneur se présente. C\'est ce qui nous permet d\'offrir un service fiable des deux côtés.' },
              { q: 'Combien l\'entrepreneur reçoit-il vraiment ?', a: 'L\'entrepreneur reçoit un chèque de 70 % du montant du contrat, une fois la job complétée et acceptée. Les 30 % restants financent la plateforme, le jumelage IA, les leads et le support.' },
              { q: 'Le client choisit-il son entrepreneur ?', a: 'Non. C\'est notre force : ZeniCorp sélectionne l\'entrepreneur dans sa banque de données selon le secteur et la job. Vous n\'avez pas à magasiner : on vous donne le meilleur profil pour vos travaux.' },
              { q: 'L\'inscription entrepreneur est-elle vraiment gratuite ?', a: 'Oui. Créer un compte, recevoir des contrats et soumissionner ne coûte rien. C\'est notre modèle inversé : les clients paient, nous jumelons, vous travaillez.' },
              { q: 'Quelles divisions sont disponibles ?', a: 'ZeniCorp Epoxy, Asphalte, Toiture et Isolation. D\'autres divisions s\'ajouteront sur la plateforme pour couvrir tous les domaines de la construction.' },
              { q: 'Est-ce que ça devient une application ?', a: 'Oui. La plateforme est conçue pour devenir une application mobile : soumission, suivi de projet et paiements directement depuis votre téléphone.' },
            ].map((item) => (
              <details key={item.q} className="group panel p-6 open:border-cyan/40 transition-colors">
                <summary className="heading-3 flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span>{item.q}</span>
                  <span className="text-cyanBright text-xl transition-transform group-open:rotate-45 flex-shrink-0">+</span>
                </summary>
                <p className="body-base text-sm mt-4 border-t border-line pt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="relative py-24 sm:py-32 bg-black overflow-hidden text-center">
        <div className="absolute inset-0 bg-grid opacity-40 bg-grid-fade" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-cyan/10 blur-[120px]" />
        <div className="relative container-zenicorp">
          <h2 className="heading-2 max-w-3xl mx-auto mb-6 text-balance">
            Rejoignez la plateforme qui va <span className="text-gradient-cyan">redéfinir la construction</span>
          </h2>
          <p className="body-large max-w-2xl mx-auto mb-11">
            Client ou entrepreneur ? Le futur de la construction commence ici.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/projet" className="btn-cyan text-lg px-10 py-5 w-full sm:w-auto">Soumettre mon projet</Link>
            <Link href="/entrepreneur" className="btn-ghost text-lg px-10 py-5 w-full sm:w-auto">Créer mon compte entrepreneur</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
