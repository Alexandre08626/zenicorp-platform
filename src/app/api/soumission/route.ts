import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';
import { getDivisionBySlug } from '@/lib/divisions-data';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, telephone, email, adresse, ville, codePostal, superficie, description, division } = body || {};

    if (!nom || !email || !division || !description) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
    }
    if (!String(email).includes('@')) {
      return NextResponse.json({ error: 'Courriel invalide' }, { status: 400 });
    }

    const nomParts = String(nom).trim().split(/\s+/);
    const prenom = nomParts.shift() || '';
    const nomFamille = nomParts.join(' ');

    const divisionData = getDivisionBySlug(String(division));
    const divisionSite = divisionData?.site || null;

    const soumission = {
      prenom,
      nom: nomFamille,
      email: String(email).trim().toLowerCase(),
      telephone: telephone ? String(telephone) : null,
      ville: ville ? String(ville) : null,
      code_postal: codePostal ? String(codePostal) : null,
      division: String(division),
      type_projet: superficie ? `Superficie : ${superficie}` : null,
      description: String(description),
      statut: 'nouveau',
    };

    const supabase = getSupabaseAdmin();
    const { data: row, error: insertError } = await supabase
      .from('zenicorp_soumissions')
      .insert(soumission)
      .select('id')
      .single();

    if (insertError || !row) {
      return NextResponse.json({ error: `Base de données indisponible : ${insertError?.message || 'inconnu'}` }, { status: 500 });
    }

    await sendEmail({
      to: String(email),
      subject: 'ZeniCorp — Votre soumission est bien reçue',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto">
          <h2 style="color:#000">Votre projet est entre de bonnes mains</h2>
          <p>Bonjour <strong>${prenom}</strong>,</p>
          <p>Nous avons bien reçu votre soumission pour <strong>${division}</strong>.</p>
          ${divisionSite ? `<p>Pour planifier votre RDV et recevoir votre soumission, visitez la division :</p>
          <p><a href="${divisionSite}" style="display:inline-block;background:#00E5FF;color:#000;padding:14px 28px;text-decoration:none;font-weight:bold">PRENDRE MON RDV</a></p>` : ''}
          <p>Un conseiller ZeniCorp vous contactera pour confirmer la suite. Aucun paiement n'est requis à cette étape.</p>
          <p style="color:#666;font-size:13px">ZeniCorp — Votre projet. Notre expertise.</p>
        </div>`,
    });

    await sendEmail({
      to: process.env.SMTP_USER || 'zenipay@zeniva.ca',
      subject: `NOUVELLE SOUMISSION — ${division} — ${nom}`,
      html: `
        <div style="font-family:Arial,sans-serif">
          <h3>Nouvelle soumission ZeniCorp</h3>
          <p><strong>Client :</strong> ${nom}<br/>
          <strong>Courriel :</strong> ${email}<br/>
          <strong>Téléphone :</strong> ${telephone || '—'}<br/>
          <strong>Adresse :</strong> ${adresse || '—'}, ${ville || ''} ${codePostal || ''}<br/>
          <strong>Division :</strong> ${division}<br/>
          <strong>Superficie :</strong> ${superficie || '—'}</p>
          <p><strong>Description :</strong><br/>${description.replace(/\n/g, '<br/>')}</p>
          ${divisionSite ? `<p><strong>RDV division :</strong> <a href="${divisionSite}">${divisionSite}</a></p>` : ''}
        </div>`,
    });

    return NextResponse.json({ success: true, id: row.id, divisionSite });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
