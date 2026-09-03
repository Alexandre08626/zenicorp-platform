'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Phone, AlertCircle, Calculator } from 'lucide-react';
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

  /* ─────────── CONFIRMATION ─────────── */
  if (envoye) {
    return (
      <main className="flex-1 bg-zenicorp-black">
        <section className="section-padding">
          <div className="container-zenicorp max-w-2xl text-center">
            <div className="w-16 h-16 mx-auto grid place-items-center rounded-2xl bg-zenicorp-gold/10 border border-zenicorp-gold/40 mb-6">
              <Check className="w-8 h-8 text-zenicorp-gold" />
            </div>
            <h1 className="heading-2 mb-4">Votre inscription est reçue</h1>
            <p className="body-large mb-10">
              Merci{' '}
              <span className="text-zenicorp-text font-semibold">{form.entreprise}</span>. Un
              conseiller ZeniCorp vous contacte sous {MODEL.contactDelay} pour activer votre profil.
            </p>

            <div className="card p-8 text-left mb-10">
              <h2 className="heading-3 text-lg mb-5">Ce qui vous attend</h2>
              <ol className="space-y-4">
                {[
                  'Vérification de votre licence RBQ et de vos assurances — sans frais.',
                  'Activation de votre profil dans la division choisie.',
                  `Réception de projets de clients ayant déposé ${MODEL.deposit}.`,
                  `Travaux réalisés : vous conservez ${MODEL.contractorShare} du contrat.`,
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
              <Link href="/" className="btn-secondary px-8 py-4">
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* ─────────── PAGE ─────────── */
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
          <span className="badge-gold mb-5">Inscription gratuite</span>
          <h1 className="heading-1 mb-5 text-balance max-w-3xl">Espace entrepreneur</h1>
          <p className="body-large max-w-2xl">
            ZeniCorp qualifie les clients et vous assigne les projets de votre secteur. Vous
            conservez {MODEL.contractorShare} du contrat, sans frais d&apos;adhésion ni abonnement.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-zenicorp max-w-4xl">
          {/* Ce que vous payez / recevez */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="card p-8">
              <h2 className="heading-3 text-lg mb-3">Ce que vous payez</h2>
              <div className="font-heading font-bold text-5xl text-zenicorp-gold mb-5">0 $</div>
              <ul className="space-y-3">
                {[
                  'Inscription au réseau',
                  'Création du profil entrepreneur',
                  'Réception des projets',
                  'Aucun abonnement mensuel',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-zenicorp-gold" />
                    <span className="text-sm text-zenicorp-dim">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-8 border-zenicorp-gold/30">
              <h2 className="heading-3 text-lg mb-3">Ce que vous recevez</h2>
              <div className="font-heading font-bold text-5xl text-zenicorp-gold mb-5">
                {MODEL.contractorShare}
              </div>
              <ul className="space-y-3">
                {[
                  `${MODEL.contractorShare} du montant de chaque contrat`,
                  `Clients qualifiés ayant déposé ${MODEL.deposit}`,
                  'Projets assignés selon votre secteur et votre spécialité',
                  'Aucun démarchage à faire',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-zenicorp-gold" />
                    <span className="text-sm text-zenicorp-dim">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Exemple de calcul */}
          <div className="card p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 shrink-0 rounded-xl bg-zenicorp-gold/10 border border-zenicorp-gold/30 grid place-items-center">
                <Calculator className="w-5 h-5 text-zenicorp-gold" />
              </span>
              <h2 className="heading-3 text-lg">
                Exemple de calcul — contrat de 10 000 $
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { l: 'Contrat de travaux', v: '10 000 $', s: 'montant facturé au client', gold: false },
                { l: 'Votre part', v: '7 000 $', s: `${MODEL.contractorShare} du contrat`, gold: true },
                {
                  l: 'Part plateforme',
                  v: '3 000 $',
                  s: `${MODEL.platformShare} — qualification et gestion`,
                  gold: false,
                },
              ].map((x) => (
                <div
                  key={x.l}
                  className="rounded-lg bg-zenicorp-black/50 border border-zenicorp-line p-6 text-center"
                >
                  <div className="text-xs uppercase tracking-wider text-zenicorp-dim mb-2">
                    {x.l}
                  </div>
                  <div
                    className={`font-heading text-3xl font-bold ${
                      x.gold ? 'text-zenicorp-gold' : 'text-zenicorp-text'
                    }`}
                  >
                    {x.v}
                  </div>
                  <div className="text-xs text-zenicorp-dim mt-2">{x.s}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-zenicorp-dim/70 mt-5">
              Exemple fourni à titre illustratif. Le montant réel dépend du contrat signé avec le
              client.
            </p>
          </div>

          {/* Formulaire */}
          <h2 className="heading-2 mb-6">Créer mon compte entrepreneur</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div>
                <label className="label" htmlFor="nom">
                  Nom complet <span className="text-zenicorp-gold">*</span>
                </label>
                <input
                  id="nom"
                  className="input-field"
                  value={form.nom}
                  onChange={(e) => update('nom', e.target.value)}
                  placeholder="Votre nom"
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label className="label" htmlFor="entreprise">
                  Nom de l&apos;entreprise <span className="text-zenicorp-gold">*</span>
                </label>
                <input
                  id="entreprise"
                  className="input-field"
                  value={form.entreprise}
                  onChange={(e) => update('entreprise', e.target.value)}
                  placeholder="Ex. : Rénos Tremblay Inc."
                  autoComplete="organization"
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
                  placeholder="vous@entreprise.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label className="label" htmlFor="rbq">
                  Numéro de licence RBQ <span className="text-zenicorp-gold">*</span>
                </label>
                <input
                  id="rbq"
                  className="input-field"
                  value={form.rbq}
                  onChange={(e) => update('rbq', e.target.value)}
                  placeholder="Ex. : 1234-5678-01"
                  required
                />
              </div>
              <div>
                <label className="label" htmlFor="assurances">
                  Assurances (responsabilité civile){' '}
                  <span className="text-zenicorp-gold">*</span>
                </label>
                <input
                  id="assurances"
                  className="input-field"
                  value={form.assurances}
                  onChange={(e) => update('assurances', e.target.value)}
                  placeholder="Ex. : 2 M$ responsabilité civile"
                  required
                />
              </div>
              <div className="md:col-span-2">
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
                  <option value="">Choisir une division...</option>
                  {divisionsData.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-10">
              <label className="label" htmlFor="experience">
                Expérience et spécialités (optionnel)
              </label>
              <textarea
                id="experience"
                className="input-field min-h-[110px]"
                value={form.experience}
                onChange={(e) => update('experience', e.target.value)}
                placeholder="Années d'expérience, spécialités, taille des équipes, secteurs desservis..."
              />
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
              {envoi ? 'Envoi en cours...' : "M'inscrire gratuitement"}
              {!envoi && <ArrowRight className="w-4 h-4 ml-2" />}
            </button>

            <p className="text-center text-sm text-zenicorp-dim mt-5">
              Aucun frais d&apos;inscription, aucun abonnement.{' '}
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
