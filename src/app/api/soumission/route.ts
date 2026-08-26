import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

const DEPOT_AMOUNT = 305;
const DEPOT_CURRENCY = 'CAD';
const ZENIPAY_CREATE_LINK = 'https://zenipay.ca/api/zenipay/create-link';

async function creerLienPaiementZenipay(description: string) {
  const res = await fetch(ZENIPAY_CREATE_LINK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: DEPOT_AMOUNT,
      currency: DEPOT_CURRENCY,
      description,
      merchant: 'zenicorp',
    }),
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok || !data?.url) {
    return { ok: false as const, error: data?.error || `ZeniPay ${res.status}` };
  }
  return { ok: true as const, id: data.id as string, url: data.url as string };
}

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

    const descPaylink = `Dépôt ZeniCorp ${String(division)} — ${nom}`;
    const lien = await creerLienPaiementZenipay(descPaylink);

    let paylinkId: string | null = null;
    let paylinkUrl: string | null = null;
    if (lien.ok) {
      paylinkId = lien.id;
      paylinkUrl = lien.url;
      await supabase
        .from('zenicorp_soumissions')
        .update({ paylink_id: paylinkId, paylink_url: paylinkUrl, statut: 'paiement_attente' })
        .eq('id', row.id);
    }

    await sendEmail({
      to: String(email),
      subject: 'ZeniCorp — Votre soumission est bien reçue',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto">
          <h2 style="color:#000">Votre projet est entre de bonnes mains</h2>
          <p>Bonjour <strong>${prenom}</strong>,</p>
          <p>Nous avons bien reçu votre soumission pour <strong>${division}</strong>.</p>
          ${paylinkUrl ? `<p>Pour réserver votre projet, payez le dépôt de <strong>305 $</strong> :</p>
          <p><a href="${paylinkUrl}" style="display:inline-block;background:#00E5FF;color:#000;padding:14px 28px;text-decoration:none;font-weight:bold">PAYER LE DÉPÔT DE 305 $</a></p>` : ''}
          <p>Un conseiller ZeniCorp vous contactera sous 24 h.</p>
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
          ${paylinkUrl ? `<p><strong>Paiement :</strong> <a href="${paylinkUrl}">${paylinkId}</a> (305 $ CAD)</p>` : '<p style="color:#c00"><strong>Échec création lien ZeniPay — paiement manuel requis</strong></p>'}
        </div>`,
    });

    return NextResponse.json({ success: true, id: row.id, paylinkUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}