import React, { memo, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ZONAS_ANATOMICAS, type ZonaAnatomica } from '@/data/zonasAnatomicas'

/**
 * Galería mobile-first — reemplaza al Visor 3D bajo el breakpoint `lg`.
 * Renderiza una tarjeta por zona anatómica con imagen prótesis + CTA.
 * Incluye banner sugiriendo usar laptop para la experiencia inmersiva.
 */
function ZonesGalleryBase() {
  return (
    <div className="relative w-full">
      <ImmersiveBanner />

      <div className="px-5 sm:px-8 pt-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ZONAS_ANATOMICAS.map((zone) => (
            <ZoneCard key={zone.id} zone={zone} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Banner sugerencia laptop ──────────────────────────────────────────
function ImmersiveBanner() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div
      role="note"
      aria-label="Sugerencia experiencia inmersiva"
      className="mx-5 sm:mx-8 mt-6 rounded-lg overflow-hidden relative"
      style={{
        background:
          'linear-gradient(135deg, rgba(0,217,255,0.10) 0%, rgba(10,58,96,0.35) 100%)',
        border: '1px solid rgba(0,217,255,0.25)',
        boxShadow: '0 0 24px rgba(0,217,255,0.10)',
      }}
    >
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,217,255,0.55), transparent)',
        }}
      />
      <div className="flex items-start gap-3 p-4">
        <div
          aria-hidden="true"
          className="shrink-0 flex items-center justify-center"
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: 'rgba(0,217,255,0.12)',
            border: '1px solid rgba(0,217,255,0.30)',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00d9ff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="13" rx="2" />
            <line x1="2" y1="20" x2="22" y2="20" />
            <line x1="8" y1="20" x2="16" y2="20" strokeWidth="2.5" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.16em',
              color: '#00d9ff',
              textTransform: 'uppercase',
              margin: 0,
              marginBottom: 4,
              fontWeight: 600,
            }}
          >
            Experiencia inmersiva
          </p>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.78)',
              margin: 0,
            }}
          >
            Para explorar el visor 3D interactivo del esqueleto y sus zonas,
            abre esta página desde una <strong style={{ color: '#ffffff' }}>laptop o desktop</strong>.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Cerrar sugerencia"
          className="shrink-0 -mr-1 -mt-1 p-1 rounded"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// ── Tarjeta por zona ──────────────────────────────────────────────────
function ZoneCard({ zone }: { zone: ZonaAnatomica }) {
  const accent = zone.color
  const hasImage = !!zone.imagenProtesis

  return (
    <Card
      role="region"
      aria-label={`Zona ${zone.label}`}
      className={cn(
        'gap-0 border-0 overflow-hidden relative pointer-events-auto',
        'bg-[rgba(2,6,18,0.88)] backdrop-blur-xl',
      )}
      style={{
        border: `1px solid ${accent}33`,
        boxShadow: `0 0 32px ${accent}1f, 0 14px 32px rgba(0,0,0,0.45)`,
      }}
    >
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}88, transparent)`,
        }}
      />

      {/* Imagen */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: '4 / 3',
          background: `
            radial-gradient(ellipse at 50% 40%, ${accent}1a, transparent 70%),
            linear-gradient(180deg, rgba(0,217,255,0.04), rgba(0,0,0,0.20))
          `,
          borderBottom: `1px solid ${accent}22`,
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(${accent}0a 1px, transparent 1px),
              linear-gradient(90deg, ${accent}0a 1px, transparent 1px)
            `,
            backgroundSize: '22px 22px',
            maskImage:
              'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
        />

        {hasImage ? (
          <img
            src={zone.imagenProtesis}
            alt={`Prótesis ${zone.label}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-contain p-5"
            style={{
              filter: `drop-shadow(0 10px 22px ${accent}55) drop-shadow(0 0 18px ${accent}33)`,
            }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-4">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke={accent}
              strokeOpacity="0.5"
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
                fontSize: 9,
                letterSpacing: '0.16em',
                color: 'rgba(255,255,255,0.40)',
                textTransform: 'uppercase',
              }}
            >
              Imagen pronto
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <CardHeader className="gap-1.5 pt-4 pb-2 px-4">
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.20em',
            color: accent,
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          {zone.categoria}
        </span>
        <CardTitle
          style={{
            fontFamily: 'var(--font-heading, var(--font-mono))',
            fontSize: 20,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
          }}
        >
          {zone.label}
        </CardTitle>
        <CardDescription
          style={{
            color: 'rgba(255,255,255,0.60)',
            fontSize: 12,
            lineHeight: 1.55,
            marginTop: 2,
          }}
        >
          {zone.descripcion}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 pb-4 pt-1">
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {zone.productos.slice(0, 3).map((p) => (
            <li
              key={p}
              style={{
                display: 'flex',
                gap: 8,
                fontFamily: 'var(--font-mono)',
                fontSize: 10.5,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.4,
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
          size="default"
          className={cn(
            'w-full h-9 rounded-md font-semibold tracking-[0.12em] uppercase text-[11px]',
            'bg-[#0A3A60] text-white hover:bg-[#0A3A60]/90',
            'border border-[color:var(--cta-accent)]/40',
          )}
          style={
            {
              '--cta-accent': accent,
              fontFamily: 'var(--font-heading, var(--font-mono))',
              boxShadow: `0 0 16px ${accent}2a`,
            } as React.CSSProperties
          }
        >
          <a href={zone.href} aria-label={`Ver catálogo completo de ${zone.label}`}>
            Ver catálogo
            <svg
              width="12"
              height="12"
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

export const ZonesGallery = memo(ZonesGalleryBase)
