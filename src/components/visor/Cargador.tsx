import React from 'react'
import { Html, useProgress } from '@react-three/drei'

export function Cargador() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 80,
          height: 2,
          background: 'rgba(0,217,255,0.15)',
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #00a8cc, #00d9ff)',
            transition: 'width 0.3s ease',
            boxShadow: '0 0 10px #00d9ff',
          }} />
        </div>
        <span style={{
          fontFamily: 'monospace',
          fontSize: 10,
          letterSpacing: '0.15em',
          color: '#00d9ff',
        }}>
          CARGANDO {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  )
}
