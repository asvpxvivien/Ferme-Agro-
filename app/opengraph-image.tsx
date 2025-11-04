import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Ferme AgroEcologique ASSIKO - Produits Bio & Naturels'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #2d5016 0%, #4a7c2c 50%, #6ba043 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
          position: 'relative',
          padding: '60px',
        }}
      >
        {/* Overlay pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              marginBottom: 20,
              textShadow: '0 4px 12px rgba(0,0,0,0.3)',
              lineHeight: 1.2,
            }}
          >
            Ferme AgroEcologique
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: '#ffd700',
              marginBottom: 40,
              textShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          >
            ASSIKO
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 'normal',
              opacity: 0.95,
              maxWidth: 900,
              lineHeight: 1.4,
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            Produits biologiques 100% naturels
          </div>
          <div
            style={{
              fontSize: 32,
              marginTop: 20,
              opacity: 0.9,
              display: 'flex',
              gap: 30,
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            <span>🐔 Poulets fermiers</span>
            <span>🥬 Légumes bio</span>
            <span>🐰 Lapins</span>
            <span>🥚 Œufs frais</span>
          </div>

          {/* Location badge */}
          <div
            style={{
              marginTop: 50,
              fontSize: 28,
              background: 'rgba(255,255,255,0.2)',
              padding: '12px 30px',
              borderRadius: 50,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            📍 Calavi, Bénin
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
