'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Info, Phone, AlertCircle } from 'lucide-react';
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

  /* ─────────── CONFIRMATION ─────────── */
  if (step === 'confirmation') {
    return (
      <main className="flex-1 bg-zenicorp-black">
        <section className="section-padding">
          <div className="container-zenicorp max-w-2xl text-center">
            <div className="w-16 h-16 mx-auto grid place-items-center rounded-2xl bg-zenicorp-gold/10 border border-zenicorp-gold/40 mb-6">
              <Check className="w-8 h-8 text-zenicorp-gold" />
            </div>
            <h1 className="heading-2 mb-4">Votre projet est enregistré</h1>
            <p className="body-large mb-10">
              Merci <span className="text-zenicorp-text font-semibold">{form.nom}</span>. Votre
              demande{' '}
              <span className="text-zenicorp-text font-semibold">
                {divisionChoisie?.name}
              </span>{' '}
              a été transmise au réseau.
            </p>

            <div className="card p-8 text-left mb-10">
              <h2 className="heading-3 text-lg mb-5">Prochaines étapes</h2>
              <ol className="space-y-4">
                {[
                  `Un conseiller ZeniCorp valide votre demande et confirme avec vous le dépôt de ${MODEL.deposit}.`,
                  `Un entrepreneur certifié RBQ de la division est assigné à votre projet.`,
                  `Il vous contacte sous ${MODEL.contactDelay} pour la visite et le prix ferme.`,
                  `Les travaux sont réalisés, puis l'entrepreneur reçoit ${MODEL.contractorShare} du contrat.`,
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-7 h-7 shrink-0 grid place-items-center rounded-full bg-zenicorp-gold text-zenicorp-black text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="body-base text-sm">{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={ZENICORP_PHONE_HREF} className="btn-gold px-8 py-4">
                <Phone className="w-4 h-4 mr-2" />
                {ZENICORP_PHONE}
              </a>
              {divisionChoisie && (
                <Link href={`/${divisionChoisie.slug}`} className="btn-secondary px-8 py-4">
                  Voir la division {divisionChoisie.short}
                </Link>
              )}
            </div>

            <div className="mt-6">
              <Link
                href="/"
                className="text-sm text-zenicorp-dim underline hover:text-zenicorp-gold transition-colors"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* ─────────── FORMULAIRE ─────────── */
  return (
    <main className="flex-1 bg-zenicorp-black">
      <section className="relative py-20 overflow-hidden border-b border-zenicorp-line">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_30%_0%,rgba(212,175,55,0.09),transparent)]" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-[0.05]" />
        <div className="container-zenicorp relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-6 text-sm text-zenicorp-dim hover:text-zenicorp-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à ZeniCorp
          </Link>
          <span className="badge-gold mb-5">Dépôt unique de {MODEL.deposit}</span>
          <h1 className="heading-1 mb-5 text-balance max-w-3xl">Soumettre mon projet</h1>
          <p className="body-large max-w-2xl">
            Décrivez vos travaux. Un entrepreneur certifié RBQ du réseau est assigné à votre
            projet et vous contacte sous {MODEL.contactDelay}.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-zenicorp max-w-4xl">
          <form onSubmit={handleSubmit} noValidate>
            {/* Division */}
            <fieldset className="mb-12">
              <legend className="heading-2 mb-2">Quelle division pour vos travaux&nbsp;?</legend>
              <p className="body-base mb-6">
                Choisissez la spécialité qui correspond à votre projet.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {divisionsData.map((d) => {
                  const actif = division === d.slug;
                  return (
                    <button
                      key={d.slug}
                      type="button"
                      onClick={() => setDivision(d.slug)}
                      aria-pressed={actif}
                      className="group relative overflow-hidden rounded-lg border bg-zenicorp-surface text-left transition-all duration-200"
                      style={{
                        borderColor: actif ? d.color : '#232B38',
                        boxShadow: actif ? `0 0 0 1px ${d.color}, 0 0 26px ${d.color}33` : 'none',
                      }}
                    >
                      <span className="relative block h-24">
                        <Image
                          src={d.photo}
                          alt=""
                          fill
                          sizes="200px"
                          className={`object-cover transition-all duration-300 ${
                            actif ? 'opacity-70' : 'opacity-35 group-hover:opacity-55'
                          }`}
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-zenicorp-surface to-transparent" />
                      </span>
                      <span className="flex items-center justify-between gap-2 px-4 py-3">
                        <span className="font-semibold text-sm text-zenicorp-text">
                          {d.short}
                        </span>
                        <span
                          className="w-4 h-4 shrink-0 rounded-full grid place-items-center border"
                          style={{
                            borderColor: actif ? d.color : '#3A4453',
                            background: actif ? d.color : 'transparent',
                          }}
                        >
                          {actif && <Check className="w-2.5 h-2.5 text-zenicorp-black" />}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Coordonnées */}
            <fieldset className="mb-12">
              <legend className="heading-2 mb-6">Vos informations</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label" htmlFor="nom">
                    Nom complet <span className="text-zenicorp-gold">*</span>
                  </label>
                  <input
                    id="nom"
                    className="input-field"
                    value={form.nom}
                    onChange={(e) => update('nom', e.target.value)}
                    placeholder="Jean Tremblay"
                    autoComplete="name"
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="telephone">
                    Téléphone <span className="text-zenicorp-gold">*</span>
                  </label>
                  <input
                    id="telephone"
                    className="input-field"
                    type="tel"
                    value={form.telephone}
                    onChange={(e) => update('telephone', e.target.value)}
                    placeholder="581-748-7017"
                    autoComplete="tel"
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="email">
                    Courriel <span className="text-zenicorp-gold">*</span>
                  </label>
                  <input
                    id="email"
                    className="input-field"
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="jean@exemple.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="adresse">
                    Adresse du projet <span className="text-zenicorp-gold">*</span>
                  </label>
                  <input
                    id="adresse"
                    className="input-field"
                    value={form.adresse}
                    onChange={(e) => update('adresse', e.target.value)}
                    placeholder="1234 rue Principale"
                    autoComplete="street-address"
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="ville">
                    Ville <span className="text-zenicorp-gold">*</span>
                  </label>
                  <input
                    id="ville"
                    className="input-field"
                    value={form.ville}
                    onChange={(e) => update('ville', e.target.value)}
                    placeholder="Québec"
                    autoComplete="address-level2"
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="codePostal">
                    Code postal <span className="text-zenicorp-gold">*</span>
                  </label>
                  <input
                    id="codePostal"
                    className="input-field"
                    value={form.codePostal}
                    onChange={(e) => update('codePostal', e.target.value)}
                    placeholder="G1A 1A1"
                    autoComplete="postal-code"
                    required
                  />
                </div>
                <div className="md:col-span-2">
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
            </fieldset>

            {/* Description */}
            <fieldset className="mb-10">
              <legend className="heading-2 mb-6">Votre projet</legend>
              <label className="label" htmlFor="description">
                Décrivez les travaux <span className="text-zenicorp-gold">*</span>
              </label>
              <textarea
                id="description"
                className="input-field min-h-[150px]"
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="État actuel, résultat souhaité, contraintes, délais..."
                required
              />
            </fieldset>

            {/* Modèle — transparent */}
            <div className="card p-6 mb-10">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-zenicorp-gold/10 border border-zenicorp-gold/30 grid place-items-center">
                  <Info className="w-5 h-5 text-zenicorp-gold" />
                </span>
                <div>
                  <h3 className="heading-3 text-base mb-2">
                    Comment fonctionne le dépôt de {MODEL.deposit}
                  </h3>
                  <p className="body-base text-sm">
                    Le dépôt unique de {MODEL.deposit} réserve votre projet dans le réseau et est
                    confirmé avec vous par un conseiller avant l&apos;assignation. Sur le contrat de
                    travaux, l&apos;entrepreneur conserve {MODEL.contractorShare} et ZeniCorp{' '}
                    {MODEL.platformShare}.
                  </p>
                </div>
              </div>
            </div>

            {erreur && (
              <div
                role="alert"
                className="mb-6 flex items-start gap-3 p-4 rounded-md bg-red-950/40 border border-red-800/60 text-red-200 text-sm"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{erreur}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!complet || envoi}
              className={`btn-gold w-full text-base py-5 ${
                !complet || envoi ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              {envoi ? 'Envoi en cours...' : 'Envoyer ma demande'}
              {!envoi && <ArrowRight className="w-4 h-4 ml-2" />}
            </button>

            <p className="text-center text-sm text-zenicorp-dim mt-5">
              Une question avant d&apos;envoyer ?{' '}
              <a href={ZENICORP_PHONE_HREF} className="text-zenicorp-gold hover:underline">
                {ZENICORP_PHONE}
              </a>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default function ProjetPage() {
  return (
    <Suspense
      fallback={
        <main className="flex-1 bg-zenicorp-black">
          <div className="container-zenicorp section-padding">
            <p className="body-base">Chargement du formulaire...</p>
          </div>
        </main>
      }
    >
      <ProjetForm />
    </Suspense>
  );
}
