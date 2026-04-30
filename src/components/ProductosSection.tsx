'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp } from '@/animations/variants'
import Visor3D from './Visor3D'
import { AnimatedGridPattern } from './ui/animated-grid-pattern'
import { ZONAS_ANATOMICAS, type ZonaAnatomica } from '@/data/zonasAnatomicas'

type VistaMode = 'anterior' | 'completa'

export default function ProductosSection() {
  const [modo, setModo] = useState<VistaMode>('anterior')
  const [selectedZone, setSelectedZone] = useState<ZonaAnatomica | null>(null)

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

      {/* ── Header de sección — superpuesto en top-center ─────────────────── */}
      <div className="absolute top-8 left-0 right-0 z-10 flex flex-col items-center pointer-events-none">
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

      {/* ── Overlay de zona seleccionada — izquierda ─────────────────────── */}
      <AnimatePresence mode="wait">
        {selectedZone && (
          <motion.aside
            key={selectedZone.id}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-label={`Información de zona: ${selectedZone.label}`}
            className="absolute z-20 hidden lg:block"
            style={{ left: 32, top: '50%', transform: 'translateY(-50%)', width: 276 }}
          >
            <div
              style={{
                background: 'rgba(2,6,18,0.90)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: `1px solid ${selectedZone.color}28`,
                borderLeft: `2px solid ${selectedZone.color}`,
                borderRadius: 10,
                padding: '18px 18px 16px',
                boxShadow: `0 0 48px rgba(0,0,0,0.65), 0 0 24px ${selectedZone.color}0e`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glow corner decorativo */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 80,
                  height: 80,
                  background: `radial-gradient(circle at top right, ${selectedZone.color}18, transparent 70%)`,
                  pointerEvents: 'none',
                }}
              />

              {/* Header zona */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 8,
                    letterSpacing: '0.16em',
                    color: selectedZone.color,
                    textTransform: 'uppercase',
                    opacity: 0.8,
                    marginBottom: 4,
                  }}>
                    ◆ Zona activa
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '0.06em',
                    margin: 0,
                    lineHeight: 1.1,
                  }}>
                    {selectedZone.label}
                  </h3>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginTop: 3,
                  }}>
                    {selectedZone.categoria}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedZone(null)}
                  aria-label="Cerrar panel"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 4,
                    color: 'rgba(255,255,255,0.35)',
                    cursor: 'pointer',
                    width: 22,
                    height: 22,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    flexShrink: 0,
                    lineHeight: 1,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.10)'
                    ;(e.currentTarget as HTMLElement).style.color = '#ffffff'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'
                  }}
                >
                  ×
                </button>
              </div>

              {/* Descripción */}
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 12,
                color: 'rgba(255,255,255,0.48)',
                lineHeight: 1.65,
                margin: '0 0 14px',
              }}>
                {selectedZone.descripcion}
              </p>

              {/* Separador con color de zona */}
              <div style={{
                height: 1,
                background: `linear-gradient(90deg, ${selectedZone.color}35, transparent)`,
                marginBottom: 12,
              }} />

              {/* Lista de productos */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 8,
                letterSpacing: '0.14em',
                color: `${selectedZone.color}80`,
                textTransform: 'uppercase',
                marginBottom: 7,
              }}>
                Implantes disponibles
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: 5 }}>
                {selectedZone.productos.map((prod) => (
                  <li
                    key={prod}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 9,
                      fontFamily: 'var(--font-sans)',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.62)',
                    }}
                  >
                    <span style={{ color: selectedZone.color, fontSize: 7, flexShrink: 0 }}>◆</span>
                    {prod}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={selectedZone.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: `${selectedZone.color}15`,
                  border: `1px solid ${selectedZone.color}45`,
                  borderRadius: 6,
                  color: selectedZone.color,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  padding: '9px 14px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = `${selectedZone.color}28`
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 18px ${selectedZone.color}20`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = `${selectedZone.color}15`
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                Ver catálogo completo →
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Visor 3D ──────────────────────────────────────────────────────── */}
      <Visor3D
        showPanel={modo === 'anterior'}
        externalViewIndex={modo === 'anterior' ? 0 : null}
        externalAutoRotate={modo === 'completa'}
        onZoneSelect={handleZoneSelect}
        selectedZoneId={selectedZone?.id ?? null}
      />

      {/* ── Toggle bar inferior ────────────────────────────────────────────── */}
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

      {/* Línea decorativa inferior */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,168,204,0.3), transparent)' }}
      />
    </section>
  )
}
