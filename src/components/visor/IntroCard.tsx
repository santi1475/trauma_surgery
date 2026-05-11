import React, { memo } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

function IntroCardBase() {
  return (
    <Card
      role="region"
      aria-label="Introducción TraumaSurgery"
      className={cn(
        'gap-3 border-0 overflow-hidden relative pointer-events-auto w-full',
        'bg-[rgba(2,6,18,0.86)] backdrop-blur-xl backdrop-saturate-150',
      )}
      style={{
        border: '1px solid rgba(0,217,255,0.16)',
        boxShadow:
          '0 0 60px rgba(0,217,255,0.10), 0 30px 60px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.02)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(0,217,255,0.45), transparent)',
        }}
      />

      <CardHeader className="gap-2">
        <div className="flex items-center gap-2">
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#00d9ff',
              boxShadow: '0 0 8px #00d9ff',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.18em',
              color: 'rgba(0,217,255,0.75)',
              textTransform: 'uppercase',
            }}
          >
            TraumaSurgery EIRL
          </span>
        </div>
        <CardTitle
          style={{
            fontFamily: 'var(--font-display, var(--font-mono))',
            fontSize: 22,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
          }}
        >
          Exploración Anatómica Interactiva
        </CardTitle>
        <CardDescription
          style={{
            color: 'rgba(255,255,255,0.58)',
            fontSize: 12.5,
            lineHeight: 1.55,
          }}
        >
          Navegue las zonas del esqueleto para descubrir nuestros sistemas de
          osteosíntesis y reemplazo articular. Cada región revela soluciones
          específicas diseñadas para la precisión quirúrgica.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div
          aria-hidden="true"
          style={{
            height: 1,
            background:
              'linear-gradient(90deg, transparent, rgba(0,217,255,0.20), transparent)',
            marginBottom: 12,
          }}
        />
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {[
            'Seleccione una zona en el panel derecho',
            'O haga clic directamente sobre el modelo 3D',
            'Use arrastre para orbitar el modelo',
          ].map((tip, i) => (
            <li
              key={tip}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                fontFamily: 'var(--font-mono)',
                fontSize: 10.5,
                letterSpacing: '0.04em',
                color: 'rgba(255,255,255,0.50)',
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: '#00d9ff', flexShrink: 0, fontWeight: 700 }}>
                {`0${i + 1}`}
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export const IntroCard = memo(IntroCardBase)
