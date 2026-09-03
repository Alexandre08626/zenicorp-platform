'use client';

import { useState } from 'react';
import Link from 'next/link';
import { divisionsData } from '@/lib/divisions-data';

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

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const complet =
    form.nom && form.entreprise && form.telephone && form.email && form.rbq && form.assurances && form.division;

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
      const data = await res.json();
      if (!res.ok) {
        setErreur(data?.error || 'Une erreur est survenue. Réessayez.');
        setEnvoi(false);
        return;
      }
      setEnvoye(true);
    } catch {
      setErreur('Problème de connexion. Réessayez.');
      setEnvoi(false);
    }
  };

  if (envoye) {
    return (
      <main className="flex-1">
        <section className="section-pad bg-black">
          <div className="container-z max-w-2xl text-center">
            <div className="w-20 h-20 mx-auto grid place-items-center rounded-2xl bg-zenicorp-darkGray/[0.06] border border-white/20 mb-6 text-4xl">✓</div>
            <h2 className="heading-2 mb-4">Votre inscription est reçue !</h2>
            <p className="body-large mb-8">
              Merci <span className="text-white font-semibold">{form.entreprise}</span> ! Un conseiller ZeniCorp
              vous contacte sous 24 h pour activer votre profil d'entrepreneur.
            </p>
            <div className="glass-strong p-8 text-left mb-10">
              <h3 className="heading-3 mb-4">Ce qui vous attend</h3>
              <ol className="space-y-4">
                {[
                  'Vérification de votre RBQ et de vos assurances (gratuit).',
                  'Activation de votre profil dans la division choisie.',
                  'Les clients soumettent gratuitement — les contrats vous sont assignés par le système.',
                  'Soumission acceptée et contrat signé = vous gardez 70 %.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-b from-cyan to-cyanDeep text-black font-bold flex-shrink-0">{i + 1}</span>
                    <span className="body-base text-sm">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <Link href="/" className="btn-ghost">Retour à l'accueil</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-60" />
        <div className="relative container-z z-10 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan hover:text-cyanBright transition-colors mb-6">
            <span>←</span> Retour à ZeniCorp
          </Link>
          <h1 className="heading-1 mb-5">
            Espace <span className="text-gradient">entrepreneur</span>
          </h1>
          <p className="body-large max-w-2xl mx-auto">
            <span className="text-white font-semibold">Inscription 100 % gratuite.</span> ZeniCorp trouve les leads,
            sélectionne les jobs de votre secteur et vous les assigne. Soumission acceptée et contrat signé,
            vous gardez <span className="text-cyan font-semibold">70 %</span>.
          </p>
        </div>
      </section>

      <section className="section-pad pt-10 bg-black">
        <div className="container-z max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            <div className="glass glass-hover p-8">
              <h3 className="heading-3 mb-4">Ce que vous payez</h3>
              <div className="text-5xl font-heading font-bold text-cyan mb-4">0 $</div>
              <ul className="space-y-2.5">
                {['Inscription gratuite', 'Profil entrepreneur', 'Réception de contrats', 'Aucun abonnement'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <span className="w-5 h-5 mt-0.5 grid place-items-center rounded-full bg-zenicorp-darkGray/10 text-silver text-xs font-bold flex-shrink-0">✓</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-strong p-8 border-white/15">
              <h3 className="heading-3 mb-4">Ce que vous recevez</h3>
              <div className="text-5xl font-heading font-bold text-cyan mb-4">70 %</div>
              <ul className="space-y-2.5">
                {['70 % à chaque contrat signé', 'Clients qualifiés, soumission gratuite côté client', 'Jumelage IA selon votre secteur et la job', 'Zéro marketing à faire'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <span className="w-5 h-5 mt-0.5 grid place-items-center rounded-full bg-zenicorp-darkGray/10 text-silver text-xs font-bold flex-shrink-0">✓</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Exemple concret */}
          <div className="glass-strong p-8 mb-14">
            <h3 className="heading-3 mb-6">Exemple concret — Contrat de 10 000 $</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-black/30 border border-line p-6">
                <div className="text-sm text-dim mb-2">Client (contrat signé)</div>
                <div className="font-heading text-3xl font-bold text-white">10 000 $</div>
                <div className="text-xs text-muted mt-2">soumission gratuite</div>
              </div>
              <div className="rounded-xl bg-black/30 border border-line p-6">
                <div className="text-sm text-dim mb-2">Votre part</div>
                <div className="font-heading text-3xl font-bold text-cyan">7 000 $</div>
                <div className="text-xs text-muted mt-2">70 % du contrat</div>
              </div>
              <div className="rounded-xl bg-black/30 border border-line p-6">
                <div className="text-sm text-dim mb-2">Plateforme</div>
                <div className="font-heading text-3xl font-bold text-white/60">3 000 $</div>
                <div className="text-xs text-muted mt-2">30 % à la signature</div>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <h2 className="heading-2 mb-6">Créer mon compte entrepreneur — gratuit</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div>
                <label className="label">Nom complet *</label>
                <input className="input-field" value={form.nom} onChange={(e) => update('nom', e.target.value)} placeholder="Votre nom" required />
              </div>
              <div>
                <label className="label">Nom de l'entreprise *</label>
                <input className="input-field" value={form.entreprise} onChange={(e) => update('entreprise', e.target.value)} placeholder="Ex. : Rénos Tremblay Inc." required />
              </div>
              <div>
                <label className="label">Téléphone *</label>
                <input className="input-field" type="tel" value={form.telephone} onChange={(e) => update('telephone', e.target.value)} placeholder="514-555-1234" required />
              </div>
              <div>
                <label className="label">Courriel *</label>
                <input className="input-field" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="vous@entreprise.com" required />
              </div>
              <div>
                <label className="label">Numéro RBQ *</label>
                <input className="input-field" value={form.rbq} onChange={(e) => update('rbq', e.target.value)} placeholder="Ex. : 1234-5678-01" required />
              </div>
              <div>
                <label className="label">Assurances (civil + RC) *</label>
                <input className="input-field" value={form.assurances} onChange={(e) => update('assurances', e.target.value)} placeholder="Ex. : 2 M$ responsabilité civile" required />
              </div>
              <div>
                <label className="label">Division souhaitée *</label>
                <select className="input-field bg-ink" value={form.division} onChange={(e) => update('division', e.target.value)} required>
                  <option value="">Choisir une division...</option>
                  {divisionsData.map((d) => (
                    <option key={d.slug} value={d.slug}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-10">
              <label className="label">Années d'expérience (optionnel)</label>
              <textarea
                className="input-field min-h-[100px]"
                value={form.experience}
                onChange={(e) => update('experience', e.target.value)}
                placeholder="Décrivez votre expérience, vos spécialités, vos équipes..."
              />
            </div>

            {erreur && (
              <div className="mb-6 p-4 bg-red-950/50 border border-red-800 text-red-300 text-sm rounded-xl">
                {erreur}
              </div>
            )}

            <button type="submit" disabled={!complet || envoi} className={`btn-primary w-full text-lg py-5 ${!complet || envoi ? 'opacity-40 cursor-not-allowed' : ''}`}>
              {envoi ? 'ENVOI EN COURS...' : 'M\'INSCRIRE GRATUITEMENT'}
            </button>
            <p className="text-center text-sm text-dim mt-4">
              Aucun frais d'inscription. Aucun abonnement. Vous ne payez rien pour obtenir du travail.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
