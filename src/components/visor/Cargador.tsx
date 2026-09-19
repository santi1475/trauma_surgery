import { Html, useProgress } from '@react-three/drei'

export function Cargador() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 80,
          height: 2,
          background: 'rgb(var(--ts-accent-rgb)/0.15)',
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          {/* La barra avanza con scaleX, no con width: animar la anchura
              provoca reflow en cada frame y está prohibido por CLAUDE.md. */}
          <div style={{
            width: '100%',
            height: '100%',
            transformOrigin: 'left center',
            transform: `scaleX(${Math.min(progress, 100) / 100})`,
            background: 'linear-gradient(90deg, var(--ts-accent-deep), var(--ts-accent))',
            transition: 'transform 0.3s ease-out',
            boxShadow: '0 0 10px var(--ts-accent)',
          }} />
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.15em',
          color: 'var(--ts-accent)',
        }}>
          CARGANDO {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  )
}
