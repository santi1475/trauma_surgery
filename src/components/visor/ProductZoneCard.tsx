import React, { memo } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ZonaAnatomica } from '@/data/zonasAnatomicas'

interface Props {
  zone: ZonaAnatomica
}

function ProductZoneCardBase({ zone }: Props) {
  const accent = zone.color
  const hasImage = !!zone.imagenProtesis

  return (
    <Card
      role="region"
      aria-label={`Detalle de prótesis para ${zone.label}`}
      className={cn(
        'gap-0 border-0 overflow-hidden relative pointer-events-auto w-full',
        'bg-[rgba(2,6,18,0.88)] backdrop-blur-xl backdrop-saturate-150',
      )}
      style={{
        border: `1px solid ${accent}33`,
        boxShadow: `0 0 80px ${accent}25, 0 30px 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.02)`,
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
          background: `linear-gradient(90deg, transparent, ${accent}88, transparent)`,
          zIndex: 1,
        }}
      />

      {/* ── PARTE SUPERIOR — imagen prótesis ─────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: '4 / 5',
          background: `
            radial-gradient(ellipse at 50% 40%, ${accent}1f, transparent 65%),
            radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.55), transparent 70%),
            linear-gradient(180deg, rgba(0,217,255,0.04) 0%, rgba(2,6,18,0.0) 100%)
          `,
          borderBottom: `1px solid ${accent}22`,
        }}
      >
        {/* Grid técnico */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(${accent}0c 1px, transparent 1px),
              linear-gradient(90deg, ${accent}0c 1px, transparent 1px)
            `,
            backgroundSize: '26px 26px',
            maskImage:
              'radial-gradient(ellipse at center, black 35%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, black 35%, transparent 80%)',
          }}
        />

        {/* Esquinas L-corner */}
        {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => (
          <span
            key={corner}
            aria-hidden="true"
            className="absolute size-4"
            style={{
              top: corner.startsWith('t') ? 10 : undefined,
              bottom: corner.startsWith('b') ? 10 : undefined,
              left: corner.endsWith('l') ? 10 : undefined,
              right: corner.endsWith('r') ? 10 : undefined,
              borderTop: corner.startsWith('t')
                ? `1px solid ${accent}aa`
                : 'none',
              borderBottom: corner.startsWith('b')
                ? `1px solid ${accent}aa`
                : 'none',
              borderLeft: corner.endsWith('l')
                ? `1px solid ${accent}aa`
                : 'none',
              borderRight: corner.endsWith('r')
                ? `1px solid ${accent}aa`
                : 'none',
            }}
          />
        ))}

        {hasImage ? (
          <img
            src={zone.imagenProtesis}
            alt={`Prótesis ${zone.label}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-contain p-7 transition-transform duration-700 ease-out hover:scale-[1.04]"
            style={{
              filter: `drop-shadow(0 16px 32px ${accent}55) drop-shadow(0 0 24px ${accent}3a)`,
            }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke={accent}
              strokeOpacity="0.55"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="9" cy="11" r="1.5" />
              <path d="M21 15l-5-5L5 19" />
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.16em',
                color: 'rgba(255,255,255,0.45)',
                textTransform: 'uppercase',
              }}
            >
              Imagen pronto disponible
            </span>
          </div>
        )}
      </div>

      {/* ── PARTE INFERIOR — info + CTA ─────────────────────────────── */}
      <CardHeader className="gap-1.5 pt-4 pb-2">
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.20em',
            color: accent,
            textTransform: 'uppercase',
            opacity: 0.95,
          }}
        >
          {zone.categoria}
        </span>
        <CardTitle
          style={{
            fontFamily: 'var(--font-display, var(--font-mono))',
            fontSize: 26,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
          }}
        >
          {zone.label}
        </CardTitle>
        <CardDescription
          style={{
            color: 'rgba(255,255,255,0.62)',
            fontSize: 12.5,
            lineHeight: 1.55,
            marginTop: 4,
          }}
        >
          {zone.descripcion}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2 pb-5">
        <div
          aria-hidden="true"
          style={{
            height: 1,
            background: `linear-gradient(90deg, transparent, ${accent}33, transparent)`,
            marginBottom: 12,
          }}
        />

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.40)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 8,
          }}
        >
          Implantes disponibles
        </span>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            marginBottom: 16,
          }}
        >
          {zone.productos.map((p) => (
            <li
              key={p}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.03em',
                color: 'rgba(255,255,255,0.68)',
                lineHeight: 1.45,
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke={accent}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0, marginTop: 4 }}
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <Button
          asChild
          size="lg"
          className={cn(
            'w-full h-10 rounded-md font-semibold tracking-[0.14em] uppercase text-xs',
            'bg-[#0A3A60] text-white hover:bg-[#0A3A60]/90',
            'border border-[color:var(--cta-accent,#00d9ff)]/40 hover:border-[color:var(--cta-accent,#00d9ff)]',
            'focus-visible:ring-2 focus-visible:ring-[color:var(--cta-accent,#00d9ff)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020d1a]',
          )}
          style={
            {
              '--cta-accent': accent,
              fontFamily: 'var(--font-display, var(--font-mono))',
              boxShadow: `0 0 24px ${accent}33`,
            } as React.CSSProperties
          }
        >
          <a
            href={zone.href}
            aria-label={`Ver catálogo completo de ${zone.label}`}
          >
            Ver catálogo completo
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

export const ProductZoneCard = memo(ProductZoneCardBase)
