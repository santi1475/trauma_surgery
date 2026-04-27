'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/animations/variants'
import Visor3D from './Visor3D'
import { AnimatedGridPattern } from './ui/animated-grid-pattern'

type VistaMode = 'anterior' | 'completa'

export default function ProductosSection() {
  const [modo, setModo] = useState<VistaMode>('anterior')

  // "Vista anterior" → Vista General (index 0), sin rotación
  // "Vista completa" → rotación libre activa
  const externalViewIndex = modo === 'anterior' ? 0 : null
  const externalAutoRotate = modo === 'completa' ? true : false

  return (
    <section
      id="productos"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#020d1a' }}
      aria-label="Visor 3D de implantes"
    >
      {/* Grid animado de fondo */}
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

      {/* Resplandor central */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,82,163,0.25) 0%, transparent 70%)',
        }}
      />

      {/* Badge PRODUCTOS */}
      <div className="absolute top-8 left-10 z-10">
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded"
          style={{
            background: 'rgba(0,168,204,0.1)',
            border: '1px solid rgba(0,168,204,0.3)',
            color: 'var(--color-accent)',
            letterSpacing: '0.15em',
          }}
        >
          Productos
        </motion.span>
      </div>

      {/* Visor 3D — sin fondo propio */}
      <Visor3D
        showPanel={modo === 'anterior'}
        externalViewIndex={modo === 'anterior' ? 0 : null}
        externalAutoRotate={externalAutoRotate}
      />

      {/* Toggle bar inferior */}
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
              onClick={() => setModo(opt)}
              className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-250"
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
