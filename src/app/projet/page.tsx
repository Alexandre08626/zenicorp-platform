'use client';

import { useState } from 'react';
import Link from 'next/link';
import { divisionsData } from '@/lib/divisions-data';

type Step = 'projet' | 'depot' | 'confirmation';

export default function ProjetPage() {
  const [step, setStep] = useState<Step>('projet');
  const [division, setDivision] = useState('');
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

  const handleSubmitProjet = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('depot');
  };

  const handleConfirmerDepot = () => {
    setStep('confirmation');
  };

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-zenicorp-black">
        <div className="absolute inset-0 bg-gradient-to-br from-zenicorp-black via-zenicorp-darkGray to-zenicorp-black" />
        <div className="relative container-zenicorp z-10 text-center">
          <Link href="/" className="inline-block mb-6 text-zenicorp-gold hover:text-white transition-colors">
            ← Retour à ZeniCorp
          </Link>
          <h1 className="heading-1 text-white mb-4">Soumettre mon projet</h1>
          <p className="text-xl text-zenicorp-silver max-w-2xl mx-auto">
            Dépôt unique de <strong className="text-zenicorp-gold">305 $</strong> — gardé par ZeniCorp pour réserver
            votre projet. Un entrepreneur certifié vous est jumelé sous 24 h.
          </p>
        </div>
      </section>

      {/* Stepper */}
      <section className="py-10 bg-zenicorp-lightGray border-b border-zenicorp-border">
        <div className="container-zenicorp">
          <div className="flex items-center justify-center gap-4">
            {[
              { id: 'projet' as Step, label: '1. Mon projet' },
              { id: 'depot' as Step, label: '2. Dépôt 305 $' },
              { id: 'confirmation' as Step, label: '3. Confirmation' },
            ].map((s, i) => (
              <div key={s.id} className="flex items-center gap-4">
                <div className={`flex items-center gap-2 ${step === s.id ? 'text-zenicorp-black' : 'text-zenicorp-silver'}`}>
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-bold ${step === s.id ? 'border-zenicorp-gold bg-zenicorp-gold text-zenicorp-black' : 'border-zenicorp-silver'}`}>
                    {step === s.id ? s.label[0] : i + 1}
                  </span>
                  <span className="font-medium hidden sm:block">{s.label}</span>
                </div>
                {i < 2 && <div className="w-10 h-px bg-zenicorp-silver" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ÉTAPE 1 : PROJET ============ */}
      {step === 'projet' && (
        <section className="section-padding bg-white">
          <div className="container-zenicorp max-w-4xl">
            <form onSubmit={handleSubmitProjet}>
              {/* Division */}
              <div className="mb-10">
                <h2 className="heading-2 mb-2">Quelle division pour vos travaux ?</h2>
                <p className="body-base mb-6">Choisissez la sous-division ZeniCorp qui réalisera votre projet.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {divisionsData.map((d) => (
                    <button
                      key={d.slug}
                      type="button"
                      onClick={() => setDivision(d.slug)}
                      className={`p-6 border-2 text-center transition-all duration-200 ${division === d.slug ? 'border-zenicorp-gold bg-zenicorp-gold/5' : 'border-zenicorp-border hover:border-zenicorp-silver'}`}
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

              <div className="card p-6 mb-10 bg-zenicorp-lightGray border-zenicorp-border">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💡</div>
                  <div>
                    <h3 className="font-semibold mb-1">Pourquoi le dépôt de 305 $ ?</h3>
                    <p className="body-base text-sm">
                      Le dépôt de 305 $ est gardé par ZeniCorp. Il garantit que votre projet est réel et qu'un
                      entrepreneur de notre réseau se présentera. Pas de ghosting, pas de perte de temps.
                    </p>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={!projetComplet} className={`btn-gold w-full text-lg py-5 ${!projetComplet ? 'opacity-40 cursor-not-allowed' : ''}`}>
                CONTINUER VERS LE DÉPÔT — 305 $
              </button>
            </form>
          </div>
        </section>
      )}

      {/* ============ ÉTAPE 2 : DÉPÔT ============ */}
      {step === 'depot' && (
        <section className="section-padding bg-white">
          <div className="container-zenicorp max-w-2xl">
            <div className="card p-8 mb-8">
              <h2 className="heading-2 mb-6">Récapitulatif</h2>
              <dl className="space-y-3 mb-8">
                {[
                  { k: 'Division', v: divisionsData.find((d) => d.slug === division)?.name || '' },
                  { k: 'Client', v: form.nom },
                  { k: 'Téléphone', v: form.telephone },
                  { k: 'Adresse', v: `${form.adresse}, ${form.ville} ${form.codePostal}` },
                  { k: 'Superficie', v: form.superficie },
                ].map((row) => (
                  <div key={row.k} className="flex justify-between border-b border-zenicorp-border pb-3">
                    <dt className="text-zenicorp-mediumGray">{row.k}</dt>
                    <dd className="font-medium text-right">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="card p-8 border-2 border-zenicorp-gold mb-8">
              <h3 className="heading-3 mb-2">Dépôt de réservation — 305 $</h3>
              <p className="body-base mb-6">
                Ce dépôt est <strong>gardé par ZeniCorp</strong> et sécurise votre projet dans le réseau.
                Un entrepreneur certifié vous contacte sous 24 h pour planifier la job.
              </p>
              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold">Total à payer aujourd'hui</span>
                <span className="text-3xl font-heading font-bold text-zenicorp-gold">305 $</span>
              </div>
              <button onClick={handleConfirmerDepot} className="btn-gold w-full text-lg py-5">
                PAYER LE DÉPÔT DE 305 $
              </button>
              <p className="text-center text-sm text-zenicorp-mediumGray mt-4">
                Paiement sécurisé. Reçu fourni. Mode de paiement en ligne à venir — pour l'instant, un
                conseiller vous appelle pour finaliser.
              </p>
            </div>

            <div className="text-center">
              <button onClick={() => setStep('projet')} className="text-zenicorp-mediumGray underline hover:text-zenicorp-black">
                ← Revenir à mon projet
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ============ ÉTAPE 3 : CONFIRMATION ============ */}
      {step === 'confirmation' && (
        <section className="section-padding bg-white">
          <div className="container-zenicorp max-w-2xl text-center">
            <div className="text-7xl mb-6">✅</div>
            <h2 className="heading-2 mb-4">Votre projet est réservé !</h2>
            <p className="body-large mb-8">
              Merci <strong>{form.nom}</strong> ! Votre projet <strong>{divisionsData.find((d) => d.slug === division)?.name}</strong>
              {' '}a été enregistré avec le dépôt de 305 $.
            </p>
            <div className="card p-8 text-left mb-10">
              <h3 className="heading-3 mb-4">Prochaines étapes</h3>
              <ol className="space-y-4">
                {[
                  'Un conseiller ZeniCorp vous appelle sous 24 h pour finaliser le dépôt.',
                  'Un entrepreneur certifié est jumelé à votre projet.',
                  'L\'entrepreneur vous contacte pour planifier une visite et la job.',
                  'Travaux réalisés. Vous payez le solde. Vous gardez vos garanties.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-zenicorp-gold text-zenicorp-black font-bold flex-shrink-0">{i + 1}</span>
                    <span className="body-base">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <Link href="/" className="btn-primary">
              RETOUR À L'ACCUEIL
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}