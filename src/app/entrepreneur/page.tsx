'use client';

import { useState } from 'react';
import Link from 'next/link';
import { divisionsData } from '@/lib/divisions-data';

export default function EntrepreneurPage() {
  const [envoye, setEnvoye] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnvoye(true);
  };

  if (envoye) {
    return (
      <main className="flex-1">
        <section className="section-padding bg-white">
          <div className="container-zenicorp max-w-2xl text-center">
            <div className="text-7xl mb-6">✅</div>
            <h2 className="heading-2 mb-4">Votre inscription est reçue !</h2>
            <p className="body-large mb-8">
              Merci <strong>{form.entreprise}</strong> ! Un conseiller ZeniCorp vous contacte sous 24 h
              pour activer votre profil d'entrepreneur.
            </p>
            <div className="card p-8 text-left mb-10">
              <h3 className="heading-3 mb-4">Ce qui vous attend</h3>
              <ol className="space-y-4">
                {[
                  'Vérification de votre RBQ et de vos assurances (gratuit).',
                  'Activation de votre profil dans la division choisie.',
                  'Les clients paient via la plateforme — les contrats vous sont assignés.',
                  'Job complétée = chèque de 70 % du contrat.',
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
      </main>
    );
  }

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-zenicorp-black">
        <div className="absolute inset-0 bg-gradient-to-br from-zenicorp-black via-zenicorp-darkGray to-zenicorp-black" />
        <div className="relative container-zenicorp z-10 text-center">
          <Link href="/" className="inline-block mb-6 text-zenicorp-gold hover:text-white transition-colors">
            ← Retour à ZeniCorp
          </Link>
          <h1 className="heading-1 text-white mb-4">Espace entrepreneur</h1>
          <p className="text-xl text-zenicorp-silver max-w-2xl mx-auto">
            <strong className="text-zenicorp-gold">Inscription 100 % gratuite.</strong> Vous obtenez du travail.
            Vous faites la job. Vous recevez votre chèque de <strong className="text-zenicorp-gold">70 %</strong>.
          </p>
        </div>
      </section>

      {/* Le deal */}
      <section className="section-padding bg-white">
        <div className="container-zenicorp max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="card p-8 border-2 border-zenicorp-gold">
              <h3 className="heading-3 mb-4">Ce que vous payez</h3>
              <div className="text-5xl font-heading font-bold text-zenicorp-gold mb-4">0 $</div>
              <ul className="space-y-2">
                {['Inscription gratuite', 'Profil entrepreneur', 'Réception de contrats', 'Aucun abonnement'].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-0.5 text-zenicorp-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="body-base text-zenicorp-mediumGray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-8 bg-zenicorp-black">
              <h3 className="heading-3 text-white mb-4">Ce que vous recevez</h3>
              <div className="text-5xl font-heading font-bold text-zenicorp-gold mb-4">70 %</div>
              <ul className="space-y-2">
                {['Chèque de 70 % par contrat complété', 'Clients qualifiés qui ont déjà payé leur dépôt', 'Jumelage automatique selon votre division', 'Zéro marketing à faire'].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-0.5 text-zenicorp-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="body-base text-zenicorp-silver">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Exemple concret */}
          <div className="card p-8 mb-16 bg-zenicorp-lightGray border-zenicorp-border">
            <h3 className="heading-3 mb-6">Exemple concret — Contrat de 10 000 $</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-white border border-zenicorp-border">
                <div className="text-sm text-zenicorp-mediumGray mb-2">Client paie via ZeniCorp</div>
                <div className="text-3xl font-heading font-bold">10 000 $</div>
                <div className="text-xs text-zenicorp-silver mt-2">dont 305 $ de dépôt déjà payé</div>
              </div>
              <div className="p-6 bg-white border border-zenicorp-border">
                <div className="text-sm text-zenicorp-mediumGray mb-2">Votre chèque à la complétion</div>
                <div className="text-3xl font-heading font-bold text-zenicorp-gold">7 000 $</div>
                <div className="text-xs text-zenicorp-silver mt-2">70 % du contrat</div>
              </div>
              <div className="p-6 bg-white border border-zenicorp-border">
                <div className="text-sm text-zenicorp-mediumGray mb-2">Couvre la plateforme</div>
                <div className="text-3xl font-heading font-bold">3 000 $</div>
                <div className="text-xs text-zenicorp-silver mt-2">30 % + dépôt pour ZeniCorp</div>
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
                <select className="input-field" value={form.division} onChange={(e) => update('division', e.target.value)} required>
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

            <button type="submit" disabled={!complet} className={`btn-gold w-full text-lg py-5 ${!complet ? 'opacity-40 cursor-not-allowed' : ''}`}>
              M'INSCRIRE GRATUITEMENT
            </button>
            <p className="text-center text-sm text-zenicorp-mediumGray mt-4">
              Aucun frais d'inscription. Aucun abonnement. Vous ne payez rien pour obtenir du travail.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}