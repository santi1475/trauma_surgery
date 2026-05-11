'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/animations/variants'
import Visor3D from './Visor3D'
import { AnimatedGridPattern } from './ui/animated-grid-pattern'
import { type ZonaAnatomica } from '@/data/zonasAnatomicas'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ZonesGallery } from './visor/ZonesGallery'

type VistaMode = 'anterior' | 'completa'

export default function ProductosSection() {
  const [modo, setModo] = useState<VistaMode>('anterior')
  const [selectedZone, setSelectedZone] = useState<ZonaAnatomica | null>(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const handleZoneSelect = (zone: ZonaAnatomica | null) => {
    setSelectedZone(zone)
    if (zone) setModo('anterior')
  }

  const handleModoChange = (m: VistaMode) => {
    setModo(m)
    if (m === 'completa') setSelectedZone(null)
  }

  return (
    <section
      id="productos"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#020d1a' }}
      aria-label="Visor 3D — Soluciones adaptadas a cada anatomía"
    >
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.04}
        duration={4}
        width={60}
        height={60}
        style={{
          stroke: 'rgba(0,168,204,0.15)',
          fill: 'rgba(0,168,204,0.04)',
        }}
      />

      {/* Resplandor de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,82,163,0.25) 0%, transparent 70%)',
        }}
      />

      {/* ── Header de sección ──────────────────────────────────────────────
          Desktop (≥lg): superpuesto sobre el visor 3D.
          Mobile (<lg): flujo normal arriba de la galería.                  */}
      <div
        className={
          isDesktop
            ? 'absolute top-8 left-0 right-0 z-10 flex flex-col items-center pointer-events-none'
            : 'relative z-10 flex flex-col items-center px-5 pt-24 pb-2'
        }
      >
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded mb-3"
          style={{
            background: 'rgba(0,168,204,0.10)',
            border: '1px solid rgba(0,168,204,0.30)',
            color: 'var(--color-accent)',
            letterSpacing: '0.15em',
          }}
        >
          Soluciones
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center font-bold uppercase"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(13px, 2vw, 21px)',
            letterSpacing: '0.12em',
            color: '#ffffff',
            margin: 0,
          }}
        >
          Soluciones Adaptadas a{' '}
          <span style={{ color: 'var(--color-accent)' }}>Cada Anatomía</span>
        </motion.h2>
      </div>

      {/* ── Experiencia principal ─────────────────────────────────────────
          Desktop: Visor 3D inmersivo + toggle bar.
          Mobile/Tablet (<lg): galería de tarjetas con banner sugerencia.  */}
      {isDesktop ? (
        <>
          <Visor3D
            showPanel={modo === 'anterior'}
            externalViewIndex={modo === 'anterior' ? 0 : null}
            externalAutoRotate={modo === 'completa'}
            onZoneSelect={handleZoneSelect}
            selectedZoneId={selectedZone?.id ?? null}
          />

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-0 rounded-full p-1"
              style={{
                background: 'rgba(4,24,48,0.85)',
                border: '1px solid rgba(0,168,204,0.25)',
                backdropFilter: 'blur(16px)',
              }}
            >
              {(['anterior', 'completa'] as VistaMode[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleModoChange(opt)}
                  className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    background: modo === opt ? 'var(--color-accent)' : 'transparent',
                    color: modo === opt ? '#020d1a' : 'rgba(255,255,255,0.6)',
                    fontWeight: modo === opt ? 700 : 500,
                  }}
                >
                  {opt === 'anterior' ? 'Vista anatómica' : 'Vista libre'}
                </button>
              ))}
            </motion.div>
          </div>
        </>
      ) : (
        <ZonesGallery />
      )}

      {/* Línea decorativa inferior */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,168,204,0.3), transparent)' }}
      />
    </section>
  )
}
