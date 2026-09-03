import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendEmail, escapeHtml, escapeHtmlMultiline } from '@/lib/email';
import { getDivisionBySlug, MODEL, ZENICORP_PHONE } from '@/lib/divisions-data';

export const dynamic = 'force-dynamic';

// Push la soumission vers le Command Center Zenitech (/global) — non bloquant.
async function pushToCommandCenter(payload: Record<string, unknown>): Promise<boolean> {
  try {
    const url = process.env.ZENITECH_INGEST_URL;
    const key = process.env.ZENICORP_INGEST_KEY;
    if (!url || !key) return false;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': key },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch {
    return false;
  }
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

    const divisionData = getDivisionBySlug(String(division));
    if (!divisionData) {
      return NextResponse.json({ error: 'Division inconnue' }, { status: 400 });
    }

    const nomParts = String(nom).trim().split(/\s+/);
    const prenom = nomParts.shift() || '';
    const nomFamille = nomParts.join(' ');

    const divisionSite = divisionData.site;
    const divisionNom = divisionData.name;

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

    // Push vers le Command Center Zenitech (/global) — en arrière-plan, non bloquant.
    // Fait AVANT la gestion d'erreur Supabase : même si la table Supabase est absente,
    // le lead doit arriver dans le dashboard /global.
    const commandCenterOk = await pushToCommandCenter({
      division,
      nom,
      prenom,
      email,
      telephone,
      adresse,
      ville,
      codePostal,
      superficie,
      description,
      source: 'zenicorp-platform',
    });

    if (insertError || !row) {
      // Supabase indisponible → si le Command Center a accepté, la soumission est
      // quand même enregistrée : on la considère réussie pour le client.
      if (commandCenterOk) {
        return NextResponse.json({ success: true, divisionSite, fallback: true });
      }
      return NextResponse.json({ error: `Base de données indisponible : ${insertError?.message || 'inconnu'}` }, { status: 500 });
    }

    await sendEmail({
      to: String(email),
      subject: 'ZeniCorp — Votre demande de projet est reçue',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#111">
          <h2 style="color:#111;margin:0 0 16px">Votre projet est entre de bonnes mains</h2>
          <p>Bonjour <strong>${escapeHtml(prenom)}</strong>,</p>
          <p>Nous avons bien reçu votre demande pour <strong>${escapeHtml(divisionNom)}</strong>.</p>
          <p>Un conseiller ZeniCorp valide votre demande et confirme avec vous le dépôt unique de
             <strong>${MODEL.deposit}</strong> qui réserve votre projet dans le réseau. Un entrepreneur
             certifié RBQ vous contacte ensuite sous <strong>${MODEL.contactDelay}</strong>.</p>
          <p style="margin:24px 0">
            <a href="${escapeHtml(divisionSite)}" style="display:inline-block;background:#2F6FED;color:#05070B;padding:14px 28px;text-decoration:none;font-weight:bold;border-radius:6px">Découvrir la division</a>
          </p>
          <p>Une question ? Appelez-nous au <strong>${ZENICORP_PHONE}</strong>.</p>
          <p style="color:#666;font-size:13px;margin-top:28px">ZeniCorp — Votre projet. Notre réseau d'entrepreneurs certifiés.</p>
        </div>`,
    });

    await sendEmail({
      to: process.env.SMTP_USER || 'zenipay@zeniva.ca',
      subject: `NOUVELLE SOUMISSION — ${divisionNom} — ${nom}`,
      html: `
        <div style="font-family:Arial,sans-serif">
          <h3>Nouvelle soumission ZeniCorp</h3>
          <p><strong>Client :</strong> ${escapeHtml(nom)}<br/>
          <strong>Courriel :</strong> ${escapeHtml(email)}<br/>
          <strong>Téléphone :</strong> ${escapeHtml(telephone) || '—'}<br/>
          <strong>Adresse :</strong> ${escapeHtml(adresse) || '—'}, ${escapeHtml(ville)} ${escapeHtml(codePostal)}<br/>
          <strong>Division :</strong> ${escapeHtml(divisionNom)}<br/>
          <strong>Superficie :</strong> ${escapeHtml(superficie) || '—'}</p>
          <p><strong>Description :</strong><br/>${escapeHtmlMultiline(description)}</p>
          <p><strong>Site division :</strong> <a href="${escapeHtml(divisionSite)}">${escapeHtml(divisionSite)}</a></p>
        </div>`,
    });

    return NextResponse.json({ success: true, id: row.id, divisionSite });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
