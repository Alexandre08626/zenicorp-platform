import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendEmail, escapeHtml, escapeHtmlMultiline } from '@/lib/email';
import { getDivisionBySlug, MODEL, ZENICORP_PHONE } from '@/lib/divisions-data';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, entreprise, telephone, email, rbq, assurances, division, experience } = body || {};

    if (!nom || !entreprise || !telephone || !email || !rbq || !assurances || !division) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
    }
    if (!String(email).includes('@')) {
      return NextResponse.json({ error: 'Courriel invalide' }, { status: 400 });
    }

    const divisionData = getDivisionBySlug(String(division));
    if (!divisionData) {
      return NextResponse.json({ error: 'Division inconnue' }, { status: 400 });
    }
    const divisionNom = divisionData.name;

    const nomParts = String(nom).trim().split(/\s+/);
    const prenom = nomParts.shift() || '';
    const nomFamille = nomParts.join(' ');

    const supabase = getSupabaseAdmin();
    const { error: insertError } = await supabase.from('zenicorp_entrepreneurs').insert({
      prenom,
      nom: nomFamille,
      email: String(email).trim().toLowerCase(),
      telephone: String(telephone),
      entreprise: String(entreprise),
      rbq: String(rbq),
      assurances: String(assurances),
      specialites: [String(division)],
      statut: 'en_revision',
    });

    if (insertError) {
      if (String(insertError.message).includes('duplicate') || String(insertError.code) === '23505') {
        return NextResponse.json({ error: 'Ce courriel est déjà inscrit dans notre réseau.' }, { status: 409 });
      }
      return NextResponse.json({ error: `Base de données indisponible : ${insertError.message}` }, { status: 500 });
    }

    await sendEmail({
      to: String(email),
      subject: 'ZeniCorp — Inscription entrepreneur reçue',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#111">
          <h2 style="color:#111;margin:0 0 16px">Bienvenue dans le réseau ZeniCorp</h2>
          <p>Bonjour <strong>${escapeHtml(prenom)}</strong>,</p>
          <p>Votre inscription (<strong>${escapeHtml(entreprise)}</strong>) est bien reçue pour la division
             <strong>${escapeHtml(divisionNom)}</strong>.</p>
          <p>Un conseiller vous contacte sous <strong>${MODEL.contactDelay}</strong> après vérification de votre
             licence RBQ et de vos assurances. L'inscription au réseau est gratuite&nbsp;: vous conservez
             <strong>${MODEL.contractorShare}</strong> du montant de chaque contrat réalisé.</p>
          <p>Une question ? Appelez-nous au <strong>${ZENICORP_PHONE}</strong>.</p>
          <p style="color:#666;font-size:13px;margin-top:28px">ZeniCorp — Votre projet. Notre réseau d'entrepreneurs certifiés.</p>
        </div>`,
    });

    await sendEmail({
      to: process.env.SMTP_USER || 'zenipay@zeniva.ca',
      subject: `NOUVEL ENTREPRENEUR — ${entreprise} — ${divisionNom}`,
      html: `
        <div style="font-family:Arial,sans-serif">
          <h3>Nouvelle inscription entrepreneur</h3>
          <p><strong>Nom :</strong> ${escapeHtml(nom)}<br/>
          <strong>Entreprise :</strong> ${escapeHtml(entreprise)}<br/>
          <strong>Courriel :</strong> ${escapeHtml(email)}<br/>
          <strong>Téléphone :</strong> ${escapeHtml(telephone)}<br/>
          <strong>RBQ :</strong> ${escapeHtml(rbq)}<br/>
          <strong>Assurances :</strong> ${escapeHtml(assurances)}<br/>
          <strong>Division :</strong> ${escapeHtml(divisionNom)}</p>
          ${experience ? `<p><strong>Expérience :</strong><br/>${escapeHtmlMultiline(experience)}</p>` : ''}
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}