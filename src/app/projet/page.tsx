'use client';

import { useState } from 'react';
import Link from 'next/link';
import { divisionsData } from '@/lib/divisions-data';

type Step = 'projet' | 'depot' | 'confirmation';

export default function ProjetPage() {
  const [step, setStep] = useState<Step>('projet');
  const [division, setDivision] = useState('');
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState('');
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

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const projetComplet =
    form.nom && form.telephone && form.email && form.adresse && form.ville && form.codePostal && form.superficie && form.description && division;

  const handleSubmitProjet = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');
    setEnvoi(true);
    try {
      const res = await fetch('/api/soumission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, division }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErreur(data?.error || 'Une erreur est survenue. Réessayez.');
        setEnvoi(false);
        return;
      }
      if (data.paylinkUrl) {
        window.location.href = data.paylinkUrl;
        return;
      }
      setStep('depot');
    } catch {
      setErreur('Problème de connexion. Réessayez.');
      setEnvoi(false);
    }
  };

  const handleConfirmerDepot = () => {
    setStep('confirmation');
  };

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-grid opacity-50 bg-grid-fade" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-gold/10 blur-[120px]" />
        <div className="relative container-zenicorp z-10 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-goldBright hover:text-gold transition-colors mb-6">
            <span>←</span> Retour à ZeniCorp
          </Link>
          <h1 className="heading-1 mb-5">
            Soumettre <span className="text-gradient-gold">mon projet</span>
          </h1>
          <p className="body-large max-w-2xl mx-auto">
            Dépôt de réservation de <strong className="text-goldBright">305 $</strong> — gardé par ZeniCorp.
            Notre système sélectionne l'entrepreneur idéal et il vous contacte sous 24 h.
          </p>
        </div>
      </section>

      {/* Stepper */}
      <section className="py-8 bg-black2 border-y border-line">
        <div className="container-zenicorp">
          <div className="flex items-center justify-center gap-4">
            {[
              { id: 'projet' as Step, label: '1. Mon projet' },
              { id: 'depot' as Step, label: '2. Dépôt 305 $' },
              { id: 'confirmation' as Step, label: '3. Confirmation' },
            ].map((s, i) => (
              <div key={s.id} className="flex items-center gap-4">
                <div className={`flex items-center gap-2 ${step === s.id ? 'text-white' : 'text-dim'}`}>
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm font-bold transition-colors ${step === s.id ? 'border-gold bg-gold-gradient text-black' : 'border-line'}`}>
                    {step === s.id ? s.label[0] : i + 1}
                  </span>
                  <span className="font-medium text-sm hidden sm:block">{s.label}</span>
                </div>
                {i < 2 && <div className="w-10 h-px bg-line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ÉTAPE 1 : PROJET ============ */}
      {step === 'projet' && (
        <section className="py-16 sm:py-24 bg-black">
          <div className="container-zenicorp max-w-4xl">
            <form onSubmit={handleSubmitProjet}>
              {/* Division */}
              <div className="mb-10">
                <h2 className="heading-2 mb-2">Quelle division pour vos travaux ?</h2>
                <p className="body-base mb-6">Choisissez la division ZeniCorp qui réalisera votre projet.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {divisionsData.map((d) => (
                    <button
                      key={d.slug}
                      type="button"
                      onClick={() => setDivision(d.slug)}
                      className={`panel p-6 text-center transition-all duration-200 border ${division === d.slug ? 'border-gold shadow-glow-gold-sm' : 'border-line hover:border-silver'}`}
                    >
                      <div className="text-4xl mb-3">{d.icon}</div>
                      <div className="font-semibold text-sm">{d.name.replace('ZeniCorp ', '')}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Coordonnées */}
              <h2 className="heading-2 mb-6">Vos informations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div>
                  <label className="label">Nom complet *</label>
                  <input className="input-field" value={form.nom} onChange={(e) => update('nom', e.target.value)} placeholder="Jean Tremblay" required />
                </div>
                <div>
                  <label className="label">Téléphone *</label>
                  <input className="input-field" type="tel" value={form.telephone} onChange={(e) => update('telephone', e.target.value)} placeholder="514-555-1234" required />
                </div>
                <div>
                  <label className="label">Courriel *</label>
                  <input className="input-field" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="jean@exemple.com" required />
                </div>
                <div>
                  <label className="label">Adresse du projet *</label>
                  <input className="input-field" value={form.adresse} onChange={(e) => update('adresse', e.target.value)} placeholder="1234 rue Principale" required />
                </div>
                <div>
                  <label className="label">Ville *</label>
                  <input className="input-field" value={form.ville} onChange={(e) => update('ville', e.target.value)} placeholder="Montréal" required />
                </div>
                <div>
                  <label className="label">Code postal *</label>
                  <input className="input-field" value={form.codePostal} onChange={(e) => update('codePostal', e.target.value)} placeholder="H2X 1Y4" required />
                </div>
                <div>
                  <label className="label">Superficie approximative *</label>
                  <input className="input-field" value={form.superficie} onChange={(e) => update('superficie', e.target.value)} placeholder="Ex. : 400 pi²" required />
                </div>
              </div>

              <div className="mb-10">
                <label className="label">Décrivez vos travaux *</label>
                <textarea
                  className="input-field min-h-[140px]"
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  placeholder="Décrivez le projet : état actuel, ce que vous voulez, délais souhaités..."
                  required
                />
              </div>

              <div className="panel panel-glow p-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">💡</div>
                  <div>
                    <h3 className="heading-3 mb-1">Pourquoi le dépôt de 305 $ ?</h3>
                    <p className="body-base text-sm">
                      Le dépôt est gardé par ZeniCorp. Il garantit que votre projet est réel et qu'un
                      entrepreneur de notre réseau se présentera. Pas de ghosting, pas de perte de temps.
                    </p>
                  </div>
                </div>
              </div>

              {erreur && (
                <div className="mb-6 p-4 bg-red-950/50 border-2 border-red-800 text-red-300 text-sm rounded-lg">
                  {erreur}
                </div>
              )}

              <button type="submit" disabled={!projetComplet || envoi} className={`btn-gold w-full text-lg py-5 ${!projetComplet || envoi ? 'opacity-40 cursor-not-allowed' : ''}`}>
                {envoi ? 'ENVOI EN COURS...' : 'CONTINUER VERS LE DÉPÔT — 305 $'}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* ============ ÉTAPE 2 : DÉPÔT ============ */}
      {step === 'depot' && (
        <section className="py-16 sm:py-24 bg-black">
          <div className="container-zenicorp max-w-2xl">
            <div className="panel p-8 mb-8">
              <h2 className="heading-2 mb-6">Récapitulatif</h2>
              <dl className="space-y-3 mb-8">
                {[
                  { k: 'Division', v: divisionsData.find((d) => d.slug === division)?.name || '' },
                  { k: 'Client', v: form.nom },
                  { k: 'Téléphone', v: form.telephone },
                  { k: 'Adresse', v: `${form.adresse}, ${form.ville} ${form.codePostal}` },
                  { k: 'Superficie', v: form.superficie },
                ].map((row) => (
                  <div key={row.k} className="flex justify-between border-b border-line pb-3">
                    <dt className="text-dim">{row.k}</dt>
                    <dd className="font-medium text-right text-silver">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="panel corner p-8 border border-gold/50 shadow-glow-gold-sm mb-8">
              <h3 className="heading-3 mb-2">Dépôt de réservation — 305 $</h3>
              <p className="body-base mb-6">
                Ce dépôt est <strong className="text-goldBright">gardé par ZeniCorp</strong> et sécurise votre
                projet dans le réseau. Le paiement s'effectue en ligne, de façon sécurisée, via ZeniPay.
              </p>
              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold text-silver">Total à payer aujourd'hui</span>
                <span className="font-tech text-4xl font-bold text-gradient-gold">305 $</span>
              </div>
              <button onClick={handleConfirmerDepot} className="btn-gold w-full text-lg py-5">
                Ouvrir la page de paiement
              </button>
              <p className="text-center text-sm text-dim mt-4">
                Paiement sécurisé via ZeniPay. Reçu fourni. Si vous n'avez pas été redirigé, cliquez ci-dessus.
              </p>
            </div>

            <div className="text-center">
              <button onClick={() => setStep('projet')} className="text-dim underline hover:text-silver transition-colors">
                ← Revenir à mon projet
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ============ ÉTAPE 3 : CONFIRMATION ============ */}
      {step === 'confirmation' && (
        <section className="py-16 sm:py-24 bg-black">
          <div className="container-zenicorp max-w-2xl text-center">
            <div className="w-20 h-20 mx-auto grid place-items-center rounded-2xl bg-gold/10 border border-gold/40 mb-6 text-4xl animate-pulse-glow">✓</div>
            <h2 className="heading-2 mb-4">Votre projet est réservé !</h2>
            <p className="body-large mb-8">
              Merci <strong className="text-goldBright">{form.nom}</strong> ! Votre projet{' '}
              <strong className="text-silver">{divisionsData.find((d) => d.slug === division)?.name}</strong>{' '}
              a été enregistré avec le dépôt de 305 $.
            </p>
            <div className="panel p-8 text-left mb-10">
              <h3 className="heading-3 mb-4">Prochaines étapes</h3>
              <ol className="space-y-4">
                {[
                  'Le dépôt de 305 $ est payé en ligne — votre projet est réservé.',
                  'Notre système sélectionne un entrepreneur certifié et il vous contacte sous 24 h.',
                  'L\'entrepreneur planifie une visite et réalise la job.',
                  'Travaux réalisés. Vous payez le solde. Vous gardez vos garanties.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gold-gradient text-black font-bold flex-shrink-0">{i + 1}</span>
                    <span className="body-base text-sm">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <Link href="/" className="btn-ghost">Retour à l'accueil</Link>
          </div>
        </section>
      )}
    </main>
  );
}
