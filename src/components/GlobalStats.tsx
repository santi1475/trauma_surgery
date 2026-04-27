'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp, reducedMotion } from '@/animations/variants'
import { NumberTicker } from './ui/number-ticker'

const STATS = [
  { value: 3, suffix: '', label: 'Países operativos', detail: 'Perú · Bolivia · Colombia' },
  { value: 15, suffix: '+', label: 'Años de experiencia', detail: 'Trayectoria comprobada' },
  { value: 500, suffix: '+', label: 'Cirujanos atendidos', detail: 'En toda la región' },
  { value: 24, suffix: '/7', label: 'Soporte técnico', detail: 'Disponibilidad permanente' },
]

const VALORES = [
  { icon: '⬡', label: 'Ética' },
  { icon: '⬡', label: 'Pasión' },
  { icon: '⬡', label: 'Cooperación' },
  { icon: '⬡', label: 'Innovación' },
  { icon: '⬡', label: 'Transparencia' },
  { icon: '⬡', label: 'Compromiso' },
]

export default function GlobalStats() {
  const prefersReduced = useReducedMotion()
  const container = prefersReduced ? reducedMotion : staggerContainer
  const item = prefersReduced ? reducedMotion : fadeInUp

  return (
    <section
      id="aliados"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #020d1a 0%, #041422 50%, #020d1a 100%)',
      }}
      aria-label="Presencia regional y valores"
    >
      {/* Glow de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,58,96,0.3) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Encabezado */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.span
            variants={item}
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontWeight: 500, letterSpacing: '0.15em' }}
          >
            Alcance regional
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-4"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              color: '#FFFFFF',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Presencia en{' '}
            <span style={{ color: 'var(--color-accent)' }}>toda la región</span>
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-4 mx-auto"
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontWeight: 400,
              fontSize: '0.95rem',
              lineHeight: 1.7,
              maxWidth: '42ch',
            }}
          >
            Conectando cirujanos, hospitales y clínicas en Perú, Bolivia y Colombia
            con dispositivos médicos de certificación internacional.
          </motion.p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="flex flex-col items-center text-center p-8 rounded-2xl relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(0,168,204,0.12)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Número animado */}
              <div
                className="mb-2 flex items-baseline gap-1"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  color: 'var(--color-accent)',
                  lineHeight: 1,
                }}
              >
                <NumberTicker value={stat.value} delay={0.3} />
                <span>{stat.suffix}</span>
              </div>

              <p
                className="font-semibold mb-1"
                style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 600 }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                }}
              >
                {stat.detail}
              </p>

              {/* Glow interno */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(0,168,204,0.15) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Valores — separador */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center"
        >
          <motion.p
            variants={item}
            className="text-xs font-mono uppercase tracking-widest mb-8"
            style={{ color: 'rgba(0,168,204,0.6)', fontWeight: 500, letterSpacing: '0.15em' }}
          >
            Nuestros valores
          </motion.p>

          <motion.div variants={container} className="flex flex-wrap justify-center gap-3">
            {VALORES.map((v) => (
              <motion.span
                key={v.label}
                variants={item}
                className="px-5 py-2 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(0,168,204,0.07)',
                  border: '1px solid rgba(0,168,204,0.18)',
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.04em',
                }}
              >
                {v.label}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
