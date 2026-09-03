'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Phone,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import Magnetic from '@/components/Magnetic';
import { Reveal, RevealLines } from '@/components/Reveal';
import {
  divisionsData,
  MODEL,
  ZENICORP_PHONE,
  ZENICORP_PHONE_HREF,
} from '@/lib/divisions-data';

export default function EntrepreneurPage() {
  const [envoye, setEnvoye] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState('');
  const [form, setForm] = useState({
    nom: '',
    entreprise: '',
    telephone: '',
    email: '',
    rbq: '',
    assurances: '',
    division: '',
    experience: '',
  });

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const complet =
    form.nom &&
    form.entreprise &&
    form.telephone &&
    form.email &&
    form.rbq &&
    form.assurances &&
    form.division;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');
    setEnvoi(true);
    try {
      const res = await fetch('/api/entrepreneur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setErreur(data?.error || 'Une erreur est survenue. Réessayez.');
        setEnvoi(false);
        return;
      }
      setEnvoye(true);
    } catch {
      setErreur('Problème de connexion. Réessayez ou appelez-nous.');
      setEnvoi(false);
    }
  };

  /* ═══════════════ CONFIRMATION ═══════════════ */
  if (envoye) {
    return (
      <main className="relative flex flex-1 items-center overflow-x-clip">
        <div className="absolute inset-0 bp-grid-fine opacity-25" />
        <section className="container-tight relative py-40 text-center">
          <Reveal>
            <span className="mx-auto grid h-16 w-16 place-items-center border border-zenicorp-gold/50 bg-zenicorp-gold/[0.08]">
              <Check className="h-7 w-7 text-zenicorp-gold" />
            </span>
          </Reveal>

          <h1 className="mt-10 font-heading text-display-md font-semibold">
            <RevealLines lines={[<>Inscription reçue.</>]} />
          </h1>

          <Reveal delay={200}>
            <p className="body-large mx-auto mt-7 max-w-lg">
              Merci <span className="text-zenicorp-text">{form.entreprise}</span>. Un
              conseiller vous contacte sous {MODEL.contactDelay} pour activer votre profil.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <ol className="mx-auto mt-14 max-w-xl text-left">
              {[
                'Vérification de votre licence RBQ et de vos assurances — sans frais.',
                'Activation de votre profil dans la division choisie.',
                `Réception de projets de clients ayant engagé un dépôt de ${MODEL.deposit}.`,
                `Travaux réalisés : vous conservez ${MODEL.contractorShare} du contrat.`,
              ].map((item, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[auto_1fr] gap-6 border-t border-zenicorp-line/70 py-5"
                >
                  <span className="font-mono text-xs text-zenicorp-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-relaxed text-zenicorp-dim">{item}</span>
                </li>
              ))}
              <li className="border-t border-zenicorp-line/70" />
            </ol>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={ZENICORP_PHONE_HREF} className="btn-gold px-9 py-4">
                <Phone className="h-4 w-4" />
                {ZENICORP_PHONE}
              </a>
              <Link href="/" className="btn-secondary px-9 py-4">
                Retour à l&apos;accueil
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
    );
  }

  /* ═══════════════ PAGE ═══════════════ */
  return (
    <main className="flex-1 overflow-x-clip">
      {/* En-tête */}
      <section className="relative overflow-hidden border-b border-zenicorp-line/70">
        <div className="absolute inset-0 bp-grid opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_75%_0%,rgba(47, 111, 237,0.11),transparent_70%)]" />

        <div className="container-zenicorp relative pb-16 pt-36">
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
              <span className="badge-gold">Inscription gratuite</span>
              <h1 className="mt-7 font-heading text-display-lg font-semibold">
                <RevealLines
                  delay={80}
                  lines={[
                    <>Des contrats.</>,
                    <span key="b" className="text-zenicorp-faint">
                      Pas de démarchage.
                    </span>,
                  ]}
                />
              </h1>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={300}>
                <p className="body-base max-w-sm">
                  La plateforme qualifie les clients et vous assigne les projets de votre
                  secteur. Vous conservez {MODEL.contractorShare} du contrat.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section className="border-b border-zenicorp-line/70">
        <div className="container-zenicorp">
          <dl className="grid gap-px bg-zenicorp-line/40 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: '0 $', t: 'Adhésion', d: 'Aucun frais, aucun abonnement mensuel.' },
              {
                k: MODEL.contractorShare,
                t: 'Votre part',
                d: 'Sur chaque contrat que vous réalisez.',
              },
              {
                k: MODEL.deposit,
                t: 'Déjà engagé',
                d: 'Par le client avant assignation du projet.',
              },
              { k: 'RBQ', t: 'Vérifié', d: 'Licence et assurances contrôlées à l’entrée.' },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 60}>
                <div className="group h-full bg-zenicorp-black px-8 py-12 transition-colors duration-500 hover:bg-zenicorp-surface">
                  <dt className="font-heading text-4xl font-semibold text-zenicorp-gold sm:text-5xl">
                    {x.k}
                  </dt>
                  <dd className="mt-6">
                    <span className="block font-mono text-label uppercase text-zenicorp-text">
                      {x.t}
                    </span>
                    <span className="mt-3 block text-sm leading-relaxed text-zenicorp-faint transition-colors duration-500 group-hover:text-zenicorp-dim">
                      {x.d}
                    </span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Exemple de calcul */}
      <section className="section-padding border-b border-zenicorp-line/70">
        <div className="container-zenicorp">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Reveal>
                <span className="eyebrow">Exemple de calcul</span>
                <h2 className="heading-3 mt-7">
                  Sur un contrat
                  <br />
                  de 10 000 $.
                </h2>
                <p className="mt-6 max-w-sm text-xs leading-relaxed text-zenicorp-faint">
                  Exemple fourni à titre illustratif. Le montant réel dépend du contrat
                  signé avec le client.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <div className="grid gap-px bg-zenicorp-line/40 sm:grid-cols-3">
                {[
                  { l: 'Contrat de travaux', v: '10 000 $', s: 'facturé au client', gold: false },
                  {
                    l: 'Votre part',
                    v: '7 000 $',
                    s: `${MODEL.contractorShare} du contrat`,
                    gold: true,
                  },
                  {
                    l: 'Plateforme',
                    v: '3 000 $',
                    s: `${MODEL.platformShare} — qualification et gestion`,
                    gold: false,
                  },
                ].map((x, i) => (
                  <Reveal key={x.l} delay={i * 70}>
                    <div className="h-full bg-zenicorp-black p-8">
                      <span className="tech-label">{x.l}</span>
                      <div
                        className={`mt-6 font-heading text-3xl font-semibold sm:text-4xl ${
                          x.gold ? 'text-zenicorp-gold' : 'text-zenicorp-text'
                        }`}
                      >
                        {x.v}
                      </div>
                      <p className="mt-3 text-xs text-zenicorp-faint">{x.s}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} noValidate>
        <section className="section-padding">
          <div className="container-zenicorp">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <Reveal>
                    <span className="eyebrow">Votre inscription</span>
                    <h2 className="heading-2 mt-7">
                      Rejoindre
                      <br />
                      <span className="text-zenicorp-faint">le réseau.</span>
                    </h2>
                    <p className="body-base mt-6 max-w-sm">
                      Nous vérifions votre licence et vos assurances avant de vous assigner
                      des projets.
                    </p>
                  </Reveal>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
                  {[
                    { id: 'nom', l: 'Nom complet', ph: 'Votre nom', ac: 'name', type: 'text' },
                    {
                      id: 'entreprise',
                      l: "Nom de l'entreprise",
                      ph: 'Ex. : Rénos Tremblay Inc.',
                      ac: 'organization',
                      type: 'text',
                    },
                    {
                      id: 'telephone',
                      l: 'Téléphone',
                      ph: '581 748 7017',
                      ac: 'tel',
                      type: 'tel',
                    },
                    {
                      id: 'email',
                      l: 'Courriel',
                      ph: 'vous@entreprise.com',
                      ac: 'email',
                      type: 'email',
                    },
                    {
                      id: 'rbq',
                      l: 'Numéro de licence RBQ',
                      ph: 'Ex. : 1234-5678-01',
                      ac: 'off',
                      type: 'text',
                    },
                    {
                      id: 'assurances',
                      l: 'Assurances (responsabilité civile)',
                      ph: 'Ex. : 2 M$ responsabilité civile',
                      ac: 'off',
                      type: 'text',
                    },
                  ].map((f) => (
                    <div key={f.id}>
                      <label className="label" htmlFor={f.id}>
                        {f.l} <span className="text-zenicorp-gold">*</span>
                      </label>
                      <input
                        id={f.id}
                        type={f.type}
                        className="input-field"
                        value={form[f.id as keyof typeof form]}
                        onChange={(e) => update(f.id, e.target.value)}
                        placeholder={f.ph}
                        autoComplete={f.ac}
                        required
                      />
                    </div>
                  ))}

                  <div className="sm:col-span-2">
                    <label className="label" htmlFor="division">
                      Division souhaitée <span className="text-zenicorp-gold">*</span>
                    </label>
                    <select
                      id="division"
                      className="input-field"
                      value={form.division}
                      onChange={(e) => update('division', e.target.value)}
                      required
                    >
                      <option value="">Choisir une division…</option>
                      {divisionsData.map((d) => (
                        <option key={d.slug} value={d.slug}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="label" htmlFor="experience">
                      Expérience et spécialités{' '}
                      <span className="text-zenicorp-faint">(optionnel)</span>
                    </label>
                    <textarea
                      id="experience"
                      className="input-field min-h-[140px]"
                      value={form.experience}
                      onChange={(e) => update('experience', e.target.value)}
                      placeholder="Années d'expérience, spécialités, taille des équipes, secteurs desservis…"
                    />
                  </div>
                </div>

                {erreur && (
                  <div
                    role="alert"
                    className="mt-8 flex items-start gap-3 border border-red-900/60 bg-red-950/30 p-5 text-sm text-red-200"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{erreur}</span>
                  </div>
                )}

                <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                  <Magnetic strength={0.16}>
                    <button
                      type="submit"
                      disabled={!complet || envoi}
                      className={`btn-gold group px-10 py-4 text-base ${
                        !complet || envoi ? 'cursor-not-allowed opacity-40' : ''
                      }`}
                    >
                      {envoi ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Envoi en cours
                        </>
                      ) : (
                        <>
                          M&apos;inscrire gratuitement
                          <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1.5" />
                        </>
                      )}
                    </button>
                  </Magnetic>

                  <p className="text-sm text-zenicorp-faint">
                    Aucun frais d&apos;inscription.{' '}
                    <a
                      href={ZENICORP_PHONE_HREF}
                      className="link-underline text-zenicorp-gold"
                    >
                      {ZENICORP_PHONE}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
}
