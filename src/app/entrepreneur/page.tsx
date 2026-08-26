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
        <section className="py-16 sm:py-24 bg-black">
          <div className="container-zenicorp max-w-2xl text-center">
            <div className="w-20 h-20 mx-auto grid place-items-center rounded-2xl bg-gold/10 border border-gold/40 mb-6 text-4xl animate-pulse-glow">✓</div>
            <h2 className="heading-2 mb-4">Votre inscription est reçue !</h2>
            <p className="body-large mb-8">
              Merci <strong className="text-goldBright">{form.entreprise}</strong> ! Un conseiller ZeniCorp
              vous contacte sous 24 h pour activer votre profil d'entrepreneur.
            </p>
            <div className="panel p-8 text-left mb-10">
              <h3 className="heading-3 mb-4">Ce qui vous attend</h3>
              <ol className="space-y-4">
                {[
                  'Vérification de votre RBQ et de vos assurances (gratuit).',
                  'Activation de votre profil dans la division choisie.',
                  'Les clients paient via la plateforme — les contrats vous sont assignés par le système.',
                  'Job complétée = chèque de 70 % du contrat.',
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
      </main>
    );
  }

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
            Espace <span className="text-gradient-gold">entrepreneur</span>
          </h1>
          <p className="body-large max-w-2xl mx-auto">
            <strong className="text-goldBright">Inscription 100 % gratuite.</strong> ZeniCorp trouve les leads,
            sélectionne les jobs de votre secteur et vous les assigne. Vous recevez votre chèque de{' '}
            <strong className="text-goldBright">70 %</strong>.
          </p>
        </div>
      </section>

      {/* Le deal */}
      <section className="py-16 sm:py-24 bg-black2">
        <div className="container-zenicorp max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            <div className="panel panel-hover p-8">
              <h3 className="heading-3 mb-4">Ce que vous payez</h3>
              <div className="font-tech text-5xl font-bold text-gradient-gold mb-4">0 $</div>
              <ul className="space-y-2.5">
                {['Inscription gratuite', 'Profil entrepreneur', 'Réception de contrats', 'Aucun abonnement'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <span className="w-5 h-5 mt-0.5 grid place-items-center rounded-full bg-gold/15 text-goldBright text-xs font-bold flex-shrink-0">✓</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel panel-glow corner p-8 border-gold/40 shadow-glow-gold-sm">
              <h3 className="heading-3 mb-4">Ce que vous recevez</h3>
              <div className="font-tech text-5xl font-bold text-gradient-gold mb-4">70 %</div>
              <ul className="space-y-2.5">
                {['Chèque de 70 % par contrat complété', 'Clients qualifiés qui ont déjà payé leur dépôt', 'Jumelage IA selon votre secteur et la job', 'Zéro marketing à faire'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <span className="w-5 h-5 mt-0.5 grid place-items-center rounded-full bg-gold/15 text-goldBright text-xs font-bold flex-shrink-0">✓</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Exemple concret */}
          <div className="panel p-8 mb-14">
            <h3 className="heading-3 mb-6">Exemple concret — Contrat de 10 000 $</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-black/50 border border-line p-6">
                <div className="text-sm text-dim mb-2">Client paie via ZeniCorp</div>
                <div className="font-tech text-3xl font-bold text-white">10 000 $</div>
                <div className="text-xs text-muted mt-2">dont 305 $ de dépôt déjà payé</div>
              </div>
              <div className="rounded-xl bg-black/50 border border-gold/50 p-6 shadow-glow-gold-sm">
                <div className="text-sm text-dim mb-2">Votre chèque à la complétion</div>
                <div className="font-tech text-3xl font-bold text-gradient-gold">7 000 $</div>
                <div className="text-xs text-muted mt-2">70 % du contrat</div>
              </div>
              <div className="rounded-xl bg-black/50 border border-line p-6">
                <div className="text-sm text-dim mb-2">Couvre la plateforme</div>
                <div className="font-tech text-3xl font-bold text-white/60">3 000 $</div>
                <div className="text-xs text-muted mt-2">30 % + dépôt pour ZeniCorp</div>
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
                <select className="input-field bg-black2" value={form.division} onChange={(e) => update('division', e.target.value)} required>
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
              <div className="mb-6 p-4 bg-red-950/50 border-2 border-red-800 text-red-300 text-sm rounded-lg">
                {erreur}
              </div>
            )}

            <button type="submit" disabled={!complet || envoi} className={`btn-gold w-full text-lg py-5 ${!complet || envoi ? 'opacity-40 cursor-not-allowed' : ''}`}>
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
