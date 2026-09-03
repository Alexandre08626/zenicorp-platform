import { ImageResponse } from 'next/og';

// Runtime edge requis : le chemin Node de @vercel/og échoue au prerender sous Windows.
export const runtime = 'edge';
export const alt = 'ZeniCorp — Plateforme de construction et rénovation';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #05070B 0%, #0A0D13 55%, #05070B 100%)',
          padding: '72px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 16,
              background: '#2F6FED',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              fontWeight: 700,
              color: '#05070B',
            }}
          >
            Z
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 38, fontWeight: 700, color: '#E8EDF4' }}>ZeniCorp</div>
            <div style={{ fontSize: 17, letterSpacing: 5, color: '#A5B0C2' }}>PLATEFORME</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 700,
              color: '#E8EDF4',
              lineHeight: 1.1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Votre projet.</span>
            <span style={{ color: '#2F6FED' }}>Notre réseau d&apos;entrepreneurs.</span>
          </div>
          <div style={{ fontSize: 30, color: '#A5B0C2' }}>
            Époxy · Asphalte · Toiture · Isolation — Québec
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { c: '#0E95D9', l: 'Époxy' },
            { c: '#8A94A6', l: 'Asphalte' },
            { c: '#E0603A', l: 'Toiture' },
            { c: '#2FA086', l: 'Isolation' },
          ].map((d) => (
            <div
              key={d.l}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 22px',
                borderRadius: 10,
                border: `1px solid ${d.c}66`,
                background: `${d.c}1A`,
                fontSize: 24,
                color: d.c,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 6, background: d.c }} />
              {d.l}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
