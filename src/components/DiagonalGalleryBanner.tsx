'use client'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp, reducedMotion } from '@/animations/variants'

/* ─── Tipos ─────────────────────────────────────────────────── */
interface PanelData {
  id: string
  titulo: string
  subtitulo: string
  url: string
}

/* ─── Data por defecto ──────────────────────────────────────── */
const DEFAULT_PANELS: PanelData[] = [
  {
    id: 'correr',
    titulo: 'MUÉVETE',
    subtitulo: 'Sin límites',
    url: '/placeholders/actividad-correr.jpg',
  },
  {
    id: 'ciclismo',
    titulo: 'PEDALEA',
    subtitulo: 'Con confianza',
    url: '/placeholders/actividad-ciclismo.jpg',
  },
  {
    id: 'yoga',
    titulo: 'FLEXIONA',
    subtitulo: 'Tu cuerpo',
    url: '/placeholders/actividad-yoga.jpg',
  },
  {
    id: 'trekking',
    titulo: 'EXPLORA',
    subtitulo: 'Cada sendero',
    url: '/placeholders/actividad-escalar.jpg',
  },
]

/* ─── Componente Panel Diagonal ─────────────────────────────── */
function DiagonalPanel({
  panel,
  isHovered,
  onHover,
  onLeave,
  prefersReduced,
}: {
  panel: PanelData
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  prefersReduced: boolean | null
}) {
  return (
    <div
      className={[
        'relative overflow-hidden cursor-pointer',
        'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isHovered ? 'flex-[2.2]' : 'flex-1',
      ].join(' ')}
      style={{
        /* Skew del contenedor */
        transform: 'skewX(-12deg)',
        borderRadius: '0.5rem',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Imagen de fondo — contra-skew para enderezar */}
      <div
        className="absolute inset-0"
        style={{
          transform: 'skewX(12deg) scale(1.35)',
          transformOrigin: 'center center',
        }}
      >
        <img
          src={panel.url}
          alt={`${panel.titulo} — ${panel.subtitulo}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Overlay gradiente inferior */}
      <div
        className="absolute inset-0"
        style={{
          transform: 'skewX(12deg) scale(1.35)',
          transformOrigin: 'center center',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 40%, transparent 70%)',
        }}
      />

      {/* Borde sutil cyan en hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          border: '1px solid rgba(0,217,255,0.25)',
          borderRadius: '0.5rem',
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered
            ? 'inset 0 0 30px rgba(0,217,255,0.08)'
            : 'none',
        }}
      />

      {/* Texto en la parte inferior — contra-skew */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5"
        style={{
          transform: 'skewX(12deg)',
          transformOrigin: 'bottom left',
        }}
      >
        <motion.h3
          className="font-heading text-white font-bold tracking-wide"
          style={{
            fontSize: 'clamp(14px, 1.5vw, 20px)',
            lineHeight: 1.2,
            marginBottom: 4,
            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          }}
          animate={
            !prefersReduced
              ? { y: isHovered ? -4 : 0, opacity: isHovered ? 1 : 0.9 }
              : {}
          }
          transition={{ duration: 0.35 }}
        >
          {panel.titulo}
        </motion.h3>
        <motion.p
          className="font-sans"
          style={{
            fontSize: 'clamp(10px, 1vw, 13px)',
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.04em',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
          }}
          animate={
            !prefersReduced
              ? { opacity: isHovered ? 1 : 0.6, y: isHovered ? -2 : 0 }
              : {}
          }
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          {panel.subtitulo}
        </motion.p>
      </div>
    </div>
  )
}

/* ─── Componente Principal ──────────────────────────────────── */
export default function DiagonalGalleryBanner({
  panels = DEFAULT_PANELS,
}: {
  panels?: PanelData[]
}) {
  const prefersReduced = useReducedMotion()
  const containerVariants = prefersReduced ? reducedMotion : staggerContainer
  const itemVariants = prefersReduced ? reducedMotion : fadeInUp
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section
      id="diagonal-gallery"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#030f1e' }}
      aria-label="Galería diagonal — Vuelve a hacer lo que amas"
    >
      {/* Glow decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: '20%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '90%',
          background:
            'radial-gradient(ellipse at center, rgba(0,82,163,0.10) 0%, transparent 70%)',
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 py-20 lg:py-28">
        {/* ── BANNER CARD ─────────────────────────────────────── */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            backgroundColor: '#020d1a',
            border: '1px solid rgba(0,168,204,0.15)',
            boxShadow:
              '0 32px 80px rgba(0,0,0,0.4), 0 0 60px rgba(0,100,180,0.06)',
          }}
        >
          {/* Inner glow top-left */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              left: 0,
              top: 0,
              width: '45%',
              height: '100%',
              background:
                'radial-gradient(ellipse at 20% 30%, rgba(0,82,163,0.12) 0%, transparent 60%)',
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row min-h-[420px] lg:min-h-[460px]">
            {/* ── LADO IZQUIERDO: Texto ───────────────────────── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="w-full lg:w-[40%] flex flex-col justify-center px-8 py-10 lg:px-12 lg:py-14"
            >
              {/* Badge */}
              <motion.span
                variants={itemVariants}
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-6 w-fit"
                style={{
                  background: 'rgba(0,168,204,0.08)',
                  border: '1px solid rgba(0,168,204,0.22)',
                  color: 'var(--color-accent)',
                  letterSpacing: '0.14em',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                }}
              >
                Estilo de vida
              </motion.span>

              {/* Título */}
              <motion.h2
                variants={itemVariants}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(24px, 3.5vw, 44px)',
                  fontWeight: 800,
                  lineHeight: 1.08,
                  letterSpacing: '-0.01em',
                  color: '#ffffff',
                  marginBottom: 24,
                }}
              >
                VUELVE A HACER
                <br />
                LO QUE{' '}
                <span style={{ color: '#00d9ff' }}>AMAS</span>
              </motion.h2>

              {/* Párrafo */}
              <motion.p
                variants={itemVariants}
                style={{
                  color: 'rgba(255,255,255,0.50)',
                  fontSize: 'clamp(12px, 1.1vw, 14px)',
                  lineHeight: 1.75,
                  maxWidth: 380,
                  marginBottom: 32,
                }}
              >
                Cada implante que distribuimos devuelve la libertad de moverse,
                competir, explorar y vivir sin miedo. La recuperación termina
                cuando vuelves a sentir tu cuerpo en acción.
              </motion.p>

              {/* Botón ghost */}
              <motion.a
                variants={itemVariants}
                href="#estilo-vida"
                className="group inline-flex items-center gap-3 w-fit"
                style={{
                  border: '1.5px solid rgba(0,217,255,0.45)',
                  color: '#00d9ff',
                  fontSize: 11,
                  letterSpacing: '0.13em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  padding: '11px 24px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  transition: 'all 0.28s ease',
                  fontFamily: 'var(--font-mono)',
                }}
                whileHover={{
                  backgroundColor: 'rgba(0,217,255,0.10)',
                  boxShadow: '0 0 24px rgba(0,217,255,0.18)',
                }}
                whileTap={{ scale: 0.97 }}
              >
                Más historias
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M4 8h8M9 5l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            </motion.div>

            {/* ── LADO DERECHO: Galería Diagonal ──────────────── */}
            <motion.div
              className="w-full lg:w-[60%] relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Contenedor de paneles diagonales */}
              <div
                className="flex h-full min-h-[340px] lg:min-h-[460px]"
                style={{
                  /* Padding extra a los lados para compensar el skew */
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  gap: '6px',
                }}
              >
                {panels.map((panel) => (
                  <DiagonalPanel
                    key={panel.id}
                    panel={panel}
                    isHovered={hoveredId === panel.id}
                    onHover={() => setHoveredId(panel.id)}
                    onLeave={() => setHoveredId(null)}
                    prefersReduced={prefersReduced}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Línea decorativa inferior */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,168,204,0.22), transparent)',
        }}
      />
    </section>
  )
}
