import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

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
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto">
          <h2 style="color:#000">Bienvenue dans le réseau ZeniCorp</h2>
          <p>Bonjour <strong>${prenom}</strong>,</p>
          <p>Votre inscription (<strong>${entreprise}</strong>) est bien reçue pour la division <strong>${division}</strong>.</p>
          <p>Un conseiller vous contactera sous 24 h après vérification de votre RBQ et de vos assurances.</p>
          <p style="color:#666;font-size:13px">ZeniCorp — Votre projet. Notre expertise.</p>
        </div>`,
    });

    await sendEmail({
      to: process.env.SMTP_USER || 'zenipay@zeniva.ca',
      subject: `NOUVEL ENTREPRENEUR — ${entreprise} — ${division}`,
      html: `
        <div style="font-family:Arial,sans-serif">
          <h3>Nouvelle inscription entrepreneur</h3>
          <p><strong>Nom :</strong> ${nom}<br/>
          <strong>Entreprise :</strong> ${entreprise}<br/>
          <strong>Courriel :</strong> ${email}<br/>
          <strong>Téléphone :</strong> ${telephone}<br/>
          <strong>RBQ :</strong> ${rbq}<br/>
          <strong>Assurances :</strong> ${assurances}<br/>
          <strong>Division :</strong> ${division}</p>
          ${experience ? `<p><strong>Expérience :</strong><br/>${experience.replace(/\n/g, '<br/>')}</p>` : ''}
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}