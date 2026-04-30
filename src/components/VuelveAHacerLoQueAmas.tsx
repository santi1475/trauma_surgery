'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp, reducedMotion } from '@/animations/variants'

const ACTIVIDADES = [
  {
    id: 'correr',
    label: 'Correr',
    src: '/placeholders/actividad-correr.jpg',
    desc: 'Atletismo y running',
    gridArea: 'a',
    delay: 0,
    fromY: 30,
    fromX: 0,
  },
  {
    id: 'escalar',
    label: 'Escalar',
    src: '/placeholders/actividad-escalar.jpg',
    desc: 'Escalada y senderismo',
    gridArea: 'b',
    delay: 0.10,
    fromY: -20,
    fromX: 0,
  },
  {
    id: 'yoga',
    label: 'Yoga',
    src: '/placeholders/actividad-yoga.jpg',
    desc: 'Yoga y meditación',
    gridArea: 'c',
    delay: 0.18,
    fromY: 20,
    fromX: 0,
  },
  {
    id: 'ciclismo',
    label: 'Ciclismo',
    src: '/placeholders/actividad-ciclismo.jpg',
    desc: 'Ciclismo y MTB',
    gridArea: 'd',
    delay: 0.08,
    fromY: 25,
    fromX: 0,
  },
  {
    id: 'nadar',
    label: 'Nadar',
    src: '/placeholders/actividad-nadar.jpg',
    desc: 'Natación y acuáticos',
    gridArea: 'e',
    delay: 0.22,
    fromY: -15,
    fromX: 0,
  },
]

const ACTIVIDADES_ICONS = [
  { label: 'Correr',   icon: '🏃' },
  { label: 'Escalar',  icon: '🧗' },
  { label: 'Yoga',     icon: '🧘' },
  { label: 'Ciclismo', icon: '🚴' },
  { label: 'Nadar',    icon: '🏊' },
]

// Placeholder de imagen de actividad — diseño horizontal integrado
function ActividadPlaceholder({
  src,
  label,
  desc,
}: {
  src: string
  label: string
  desc: string
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background:
          'linear-gradient(145deg, rgba(4,18,36,0.92) 0%, rgba(8,28,56,0.80) 70%, rgba(2,13,26,0.90) 100%)',
        border: '1px dashed rgba(0,217,255,0.15)',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Grid de fondo */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,168,204,0.04) 19px, rgba(0,168,204,0.04) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(0,168,204,0.04) 19px, rgba(0,168,204,0.04) 20px)',
        }}
      />
      {/* Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,82,163,0.15) 0%, transparent 70%)',
        }}
      />
      {/* Contenido */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 12px' }}>
        <div style={{ fontSize: 20, opacity: 0.35, marginBottom: 6 }}>🖼</div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            color: 'rgba(0,217,255,0.50)',
            letterSpacing: '0.1em',
            marginBottom: 3,
            wordBreak: 'break-all',
          }}
        >
          {src}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            color: 'rgba(255,255,255,0.20)',
          }}
        >
          {desc}
        </div>
      </div>
      {/* Label de actividad */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: 0,
          right: 0,
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            letterSpacing: '0.14em',
            color: 'rgba(0,217,255,0.45)',
            textTransform: 'uppercase',
            background: 'rgba(0,217,255,0.06)',
            padding: '2px 8px',
            borderRadius: 2,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

export default function VuelveAHacerLoQueAmas() {
  const prefersReduced = useReducedMotion()
  const containerVariants = prefersReduced ? reducedMotion : staggerContainer
  const itemVariants = prefersReduced ? reducedMotion : fadeInUp

  return (
    <section
      id="estilo-vida"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#030f1e' }}
      aria-label="Vuelve a hacer lo que amas"
    >
      {/* Glow derecho */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '50%',
          height: '80%',
          background:
            'radial-gradient(ellipse at right center, rgba(0,82,163,0.14) 0%, transparent 70%)',
        }}
      />

      {/* Número de sección decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: '-0.05em',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(140px, 22vw, 260px)',
          fontWeight: 800,
          color: 'rgba(0,168,204,0.028)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          userSelect: 'none',
        }}
      >
        04
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── IZQUIERDA: Texto emocional ────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="w-full lg:w-[42%] flex-shrink-0"
          >
            {/* Badge */}
            <motion.span
              variants={itemVariants}
              className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded mb-7"
              style={{
                background: 'rgba(0,168,204,0.10)',
                border: '1px solid rgba(0,168,204,0.28)',
                color: 'var(--color-accent)',
                letterSpacing: '0.15em',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Recuperación
            </motion.span>

            {/* Heading emocional */}
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 4.5vw, 52px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: '#ffffff',
                marginBottom: 6,
              }}
            >
              VUELVE
            </motion.h2>
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 4.5vw, 52px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: '#00d9ff',
                marginBottom: 6,
              }}
            >
              A HACER
            </motion.h2>
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 4.5vw, 52px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: '#ffffff',
                marginBottom: 28,
              }}
            >
              LO QUE AMAS
            </motion.h2>

            {/* Párrafo emocional */}
            <motion.p
              variants={itemVariants}
              style={{
                color: 'rgba(255,255,255,0.52)',
                fontSize: 14,
                lineHeight: 1.80,
                maxWidth: 420,
                marginBottom: 32,
              }}
            >
              Cada implante que distribuimos tiene un propósito más profundo que la cirugía:
              devolver al paciente la libertad de moverse, competir, explorar y vivir sin miedo.
              Porque la recuperación no termina en el quirófano — termina cuando vuelves a correr.
            </motion.p>

            {/* Lista de actividades */}
            <motion.div variants={itemVariants} style={{ marginBottom: 36 }}>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: '0.16em',
                  color: 'rgba(0,217,255,0.55)',
                  textTransform: 'uppercase',
                  marginBottom: 14,
                }}
              >
                Actividades recuperadas
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ACTIVIDADES_ICONS.map((act) => (
                  <div
                    key={act.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '5px 12px',
                      borderRadius: 20,
                      border: '1px solid rgba(0,217,255,0.15)',
                      background: 'rgba(0,217,255,0.05)',
                    }}
                  >
                    <span style={{ fontSize: 13 }}>{act.icon}</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 11,
                        color: 'rgba(255,255,255,0.55)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {act.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.a
              variants={itemVariants}
              href="#productos"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                border: '1.5px solid rgba(0,217,255,0.45)',
                color: '#00d9ff',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
                padding: '12px 26px',
                borderRadius: 6,
                textDecoration: 'none',
                transition: 'all 0.22s',
                fontFamily: 'var(--font-mono)',
              }}
              whileHover={{
                backgroundColor: 'rgba(0,217,255,0.10)',
                boxShadow: '0 0 22px rgba(0,217,255,0.20)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              Conoce nuestros implantes
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </motion.div>

          {/* ── DERECHA: Collage dinámico ─────────────────────────────────── */}
          <div
            className="w-full lg:w-[58%]"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridTemplateRows: '180px 180px',
              gridTemplateAreas: '"a a b" "c d d"',
              gap: 10,
            }}
          >
            {ACTIVIDADES.map((act) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: act.fromY, x: act.fromX }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: act.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  prefersReduced
                    ? {}
                    : { scale: 1.025, transition: { duration: 0.25 } }
                }
                style={{ gridArea: act.gridArea }}
              >
                <ActividadPlaceholder
                  src={act.src}
                  label={act.label}
                  desc={act.desc}
                />
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Línea decorativa inferior */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,168,204,0.22), transparent)' }}
      />
    </section>
  )
}
