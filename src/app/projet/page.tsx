'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
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

function ProjetForm() {
  const params = useSearchParams();

  const [step, setStep] = useState<'projet' | 'confirmation'>('projet');
  const [division, setDivision] = useState('');
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState('');

  // La page est prérendue statiquement : les search params ne sont connus qu'après
  // hydratation. On applique la présélection ici pour éviter tout écart d'hydratation.
  useEffect(() => {
    const preset = params.get('division');
    if (preset && divisionsData.some((d) => d.slug === preset)) {
      setDivision((actuel) => actuel || preset);
    }
  }, [params]);

  const [form, setForm] = useState({
    nom: '',
    telephone: '',
    email: '',
    adresse: '',
    ville: '',
    codePostal: '',
    superficie: '',
    description: '',
  });

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const complet =
    form.nom &&
    form.telephone &&
    form.email &&
    form.adresse &&
    form.ville &&
    form.codePostal &&
    form.superficie &&
    form.description &&
    division;

  const divisionChoisie = divisionsData.find((d) => d.slug === division);
  const accent = divisionChoisie?.color ?? '#2F6FED';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');
    setEnvoi(true);
    try {
      const res = await fetch('/api/soumission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, division }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setErreur(data?.error || 'Une erreur est survenue. Réessayez.');
        setEnvoi(false);
        return;
      }
      setStep('confirmation');
    } catch {
      setErreur('Problème de connexion. Réessayez ou appelez-nous.');
      setEnvoi(false);
    }
  };

  /* ═══════════════ CONFIRMATION ═══════════════ */
  if (step === 'confirmation') {
    return (
      <main className="flex flex-1 items-center overflow-x-clip">
        <div className="absolute inset-0 bp-grid-fine opacity-25" />
        <section className="container-tight relative py-40 text-center">
          <Reveal>
            <span
              className="mx-auto grid h-16 w-16 place-items-center border"
              style={{ borderColor: `${accent}66`, background: `${accent}14` }}
            >
              <Check className="h-7 w-7" style={{ color: accent }} />
            </span>
          </Reveal>

          <h1 className="mt-10 font-heading text-display-md font-semibold">
            <RevealLines lines={[<>Projet enregistré.</>]} />
          </h1>

          <Reveal delay={200}>
            <p className="body-large mx-auto mt-7 max-w-lg">
              Merci <span className="text-zenicorp-text">{form.nom}</span>. Votre demande{' '}
              <span className="text-zenicorp-text">{divisionChoisie?.name}</span> a été
              transmise au réseau.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <ol className="mx-auto mt-14 max-w-xl text-left">
              {[
                'Un conseiller valide votre demande — aucun paiement à cette étape.',
                'Un entrepreneur certifié RBQ de la division est assigné à votre projet.',
                `Il vous contacte sous ${MODEL.contactDelay} pour la visite et le prix ferme.`,
                `Contrat signé : vous payez ${MODEL.signingShare} à la signature, l'entrepreneur conserve ${MODEL.contractorShare} du contrat.`,
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
              {divisionChoisie && (
                <Link href={`/${divisionChoisie.slug}`} className="btn-secondary px-9 py-4">
                  Voir la division {divisionChoisie.short}
                </Link>
              )}
            </div>
            <Link
              href="/"
              className="link-underline mt-8 inline-block text-sm text-zenicorp-faint hover:text-zenicorp-gold"
            >
              Retour à l&apos;accueil
            </Link>
          </Reveal>
        </section>
      </main>
    );
  }

  /* ═══════════════ FORMULAIRE ═══════════════ */
  return (
    <main className="flex-1 overflow-x-clip">
      {/* En-tête */}
      <section className="relative overflow-hidden border-b border-zenicorp-line/70">
        <div className="absolute inset-0 bp-grid opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_25%_0%,rgba(47, 111, 237,0.11),transparent_70%)]" />

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
              <h1 className="font-heading text-display-lg font-semibold">
                <RevealLines
                  delay={80}
                  lines={[<>Soumettre</>, <>mon projet.</>]}
                />
              </h1>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={300}>
                <p className="body-base max-w-sm">
                  Décrivez vos travaux. Un entrepreneur certifié du réseau vous contacte
                  sous {MODEL.contactDelay}.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} noValidate>
        {/* ─────────── 01 · Division ─────────── */}
        <section className="section-padding border-b border-zenicorp-line/70">
          <div className="container-zenicorp">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <Reveal>
                    <span className="eyebrow">01 · Division</span>
                    <h2 className="heading-3 mt-7">Quelle spécialité&nbsp;?</h2>
                    <p className="body-base mt-5 max-w-sm">
                      Sélectionnez la division correspondant à vos travaux.
                    </p>
                  </Reveal>
                </div>
              </div>

              <div className="lg:col-span-8">
                <fieldset>
                  <legend className="sr-only">Division des travaux</legend>
                  <div className="grid gap-px bg-zenicorp-line/40 sm:grid-cols-2">
                    {divisionsData.map((d) => {
                      const actif = division === d.slug;
                      return (
                        <button
                          key={d.slug}
                          type="button"
                          onClick={() => setDivision(d.slug)}
                          aria-pressed={actif}
                          className="group relative overflow-hidden bg-zenicorp-black text-left transition-colors duration-500"
                        >
                          <span className="relative block aspect-[16/7] overflow-hidden">
                            <Image
                              src={d.photo}
                              alt=""
                              fill
                              sizes="(max-width: 640px) 100vw, 420px"
                              className={`object-cover transition-all duration-[900ms] ease-premium ${
                                actif
                                  ? 'scale-105 opacity-70 grayscale-0'
                                  : 'opacity-30 grayscale group-hover:opacity-50'
                              }`}
                            />
                            <span
                              className="absolute inset-0 transition-opacity duration-700"
                              style={{
                                background: d.color,
                                opacity: actif ? 0.18 : 0.4,
                                mixBlendMode: 'color',
                              }}
                            />
                          </span>

                          <span className="flex items-center justify-between gap-3 px-6 py-5">
                            <span>
                              <span className="block font-heading text-lg font-semibold text-zenicorp-text">
                                {d.short}
                              </span>
                              <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-zenicorp-faint">
                                {d.services.length} prestations
                              </span>
                            </span>
                            <span
                              className="grid h-6 w-6 shrink-0 place-items-center border transition-all duration-500"
                              style={{
                                borderColor: actif ? d.color : '#3A4453',
                                background: actif ? d.color : 'transparent',
                              }}
                            >
                              {actif && (
                                <Check className="h-3.5 w-3.5 text-zenicorp-black" />
                              )}
                            </span>
                          </span>

                          <span
                            className="absolute bottom-0 left-0 h-px transition-all duration-[900ms] ease-premium"
                            style={{
                              background: d.color,
                              width: actif ? '100%' : '0%',
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── 02 · Coordonnées ─────────── */}
        <section className="section-padding border-b border-zenicorp-line/70">
          <div className="container-zenicorp">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <Reveal>
                    <span className="eyebrow">02 · Coordonnées</span>
                    <h2 className="heading-3 mt-7">Où et pour qui&nbsp;?</h2>
                    <p className="body-base mt-5 max-w-sm">
                      L&apos;adresse sert à assigner un entrepreneur qui couvre votre
                      secteur.
                    </p>
                  </Reveal>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
                  {[
                    { id: 'nom', l: 'Nom complet', ph: 'Jean Tremblay', ac: 'name', type: 'text' },
                    { id: 'telephone', l: 'Téléphone', ph: '581 748 7017', ac: 'tel', type: 'tel' },
                    { id: 'email', l: 'Courriel', ph: 'jean@exemple.com', ac: 'email', type: 'email' },
                    {
                      id: 'adresse',
                      l: 'Adresse du projet',
                      ph: '1234 rue Principale',
                      ac: 'street-address',
                      type: 'text',
                    },
                    { id: 'ville', l: 'Ville', ph: 'Québec', ac: 'address-level2', type: 'text' },
                    {
                      id: 'codePostal',
                      l: 'Code postal',
                      ph: 'G1A 1A1',
                      ac: 'postal-code',
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
                    <label className="label" htmlFor="superficie">
                      Superficie approximative <span className="text-zenicorp-gold">*</span>
                    </label>
                    <input
                      id="superficie"
                      className="input-field"
                      value={form.superficie}
                      onChange={(e) => update('superficie', e.target.value)}
                      placeholder="Ex. : 400 pi²"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── 03 · Le projet ─────────── */}
        <section className="section-padding">
          <div className="container-zenicorp">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <Reveal>
                    <span className="eyebrow">03 · Le projet</span>
                    <h2 className="heading-3 mt-7">Décrivez les travaux.</h2>
                    <p className="body-base mt-5 max-w-sm">
                      Plus le contexte est précis, plus le prix ferme sera juste dès la
                      première visite.
                    </p>
                  </Reveal>
                </div>
              </div>

              <div className="lg:col-span-8">
                <label className="label" htmlFor="description">
                  Description <span className="text-zenicorp-gold">*</span>
                </label>
                <textarea
                  id="description"
                  className="input-field min-h-[190px]"
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  placeholder="État actuel, résultat souhaité, contraintes d'accès, délais visés..."
                  required
                />

                {/* Modèle commercial — transparence */}
                <div className="mt-12 border border-zenicorp-line/70 bg-zenicorp-surface/50 p-8">
                  <span className="tech-label">Le modèle, sans ambiguïté</span>
                  <dl className="mt-7 grid gap-8 sm:grid-cols-3">
                    {[
                      { k: 'Gratuit', l: 'Soumission de votre projet, sans engagement' },
                      { k: MODEL.signingShare, l: 'Payé par vous à la signature du contrat' },
                      { k: MODEL.contractorShare, l: "Reversé à l'entrepreneur sur le contrat" },
                    ].map((x) => (
                      <div key={x.l}>
                        <dt className="font-heading text-3xl font-semibold text-zenicorp-gold">
                          {x.k}
                        </dt>
                        <dd className="mt-3 text-xs leading-relaxed text-zenicorp-faint">
                          {x.l}
                        </dd>
                      </div>
                    ))}
                  </dl>
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
                          Envoyer ma demande
                          <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1.5" />
                        </>
                      )}
                    </button>
                  </Magnetic>

                  <p className="text-sm text-zenicorp-faint">
                    Une question&nbsp;?{' '}
                    <a
                      href={ZENICORP_PHONE_HREF}
                      className="link-underline text-zenicorp-gold"
                    >
                      {ZENICORP_PHONE}
                    </a>
                  </p>
                </div>

                {!complet && (
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-zenicorp-faint">
                    Tous les champs marqués * sont requis
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
}

export default function ProjetPage() {
  return (
    <Suspense
      fallback={
        <main className="flex-1">
          <div className="container-zenicorp py-40">
            <p className="tech-label">Chargement du formulaire…</p>
          </div>
        </main>
      }
    >
      <ProjetForm />
    </Suspense>
  );
}
