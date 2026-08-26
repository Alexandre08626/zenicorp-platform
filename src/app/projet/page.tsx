'use client';

import { useState } from 'react';
import Link from 'next/link';
import { divisionsData } from '@/lib/divisions-data';

type Step = 'projet' | 'confirmation';

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

  const divisionSite = divisionsData.find((d) => d.slug === division)?.site || '/';

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
      setStep('confirmation');
    } catch {
      setErreur('Problème de connexion. Réessayez.');
      setEnvoi(false);
    }
  };

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-grid opacity-50 bg-grid-fade" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-cyan/10 blur-[120px]" />
        <div className="relative container-zenicorp z-10 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-cyanBright hover:text-cyan transition-colors mb-6">
            <span>←</span> Retour à ZeniCorp
          </Link>
          <h1 className="heading-1 mb-5">
            Soumettre <span className="text-gradient-cyan">mon projet</span>
          </h1>
          <p className="body-large max-w-2xl mx-auto">
            <strong className="text-cyanBright">100 % gratuit.</strong> Décrivez votre projet et nous vous
            redirigeons vers la bonne division pour prendre RDV et recevoir une soumission.
            Vous ne payez que si la soumission est acceptée.
          </p>
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
                <p className="body-base mb-6">Choisissez la division ZeniCorp correspondant à votre projet.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {divisionsData.map((d) => (
                    <button
                      key={d.slug}
                      type="button"
                      onClick={() => setDivision(d.slug)}
                      className={`panel p-6 text-center transition-all duration-200 border ${division === d.slug ? 'border-cyan shadow-glow-cyan-sm' : 'border-line hover:border-silver'}`}
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
                    <h3 className="heading-3 mb-1">C'est gratuit, sans engagement</h3>
                    <p className="body-base text-sm">
                      La soumission ne vous coûte rien. Nous vous redirigeons vers la bonne division pour
                      prendre RDV. ZeniCorp prend 30 % uniquement lorsque la soumission est acceptée
                      et le contrat signé.
                    </p>
                  </div>
                </div>
              </div>

              {erreur && (
                <div className="mb-6 p-4 bg-red-950/50 border-2 border-red-800 text-red-300 text-sm rounded-lg">
                  {erreur}
                </div>
              )}

              <button type="submit" disabled={!projetComplet || envoi} className={`btn-cyan w-full text-lg py-5 ${!projetComplet || envoi ? 'opacity-40 cursor-not-allowed' : ''}`}>
                {envoi ? 'ENVOI EN COURS...' : 'SOUMETTRE GRATUITEMENT'}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* ============ ÉTAPE 2 : CONFIRMATION + RDV ============ */}
      {step === 'confirmation' && (
        <section className="py-16 sm:py-24 bg-black">
          <div className="container-zenicorp max-w-2xl text-center">
            <div className="w-20 h-20 mx-auto grid place-items-center rounded-2xl bg-cyan/10 border border-cyan/40 mb-6 text-4xl animate-pulse-glow">✓</div>
            <h2 className="heading-2 mb-4">Votre projet est reçu !</h2>
            <p className="body-large mb-8">
              Merci <strong className="text-cyanBright">{form.nom}</strong> ! Votre projet{' '}
              <strong className="text-silver">{divisionsData.find((d) => d.slug === division)?.name}</strong>{' '}
              a bien été transmis. Aucun paiement requis.
            </p>
            <div className="panel p-8 text-left mb-10">
              <h3 className="heading-3 mb-4">Prochaines étapes</h3>
              <ol className="space-y-4">
                {[
                  'Vous êtes redirigé vers la bonne division pour planifier votre RDV.',
                  'Un conseiller de la division vous contacte pour confirmer la visite et la soumission.',
                  'La soumission est préparée et envoyée pour acceptation.',
                  'Contrat signé → ZeniCorp prend 30 %, l\'entrepreneur garde 70 %.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-gradient text-black font-bold flex-shrink-0">{i + 1}</span>
                    <span className="body-base text-sm">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={divisionSite} target="_blank" rel="noopener noreferrer" className="btn-cyan text-lg px-10 py-5 w-full sm:w-auto">
                Prendre mon RDV dans la division
              </a>
            </div>
            <div className="mt-5">
              <Link href="/" className="text-dim underline hover:text-silver transition-colors">Retour à l'accueil</Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
