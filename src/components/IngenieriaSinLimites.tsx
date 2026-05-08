'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp, reducedMotion } from '@/animations/variants'

const FEATURES = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5 6.5 5 8 2z" stroke="#00d9ff" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Titanio médico Grado 4',
    desc: 'Aleación de titanio biocompatible con resistencia mecánica óptima para implantes permanentes.',
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="2" stroke="#00d9ff" strokeWidth="1.3" />
        <path d="M5 8h6M8 5v6" stroke="#00d9ff" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: 'Certificación ISO 13485 · CE Mark',
    desc: 'Sistemas de gestión de calidad y conformidad europea para dispositivos médicos activos e implantables.',
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="5" stroke="#00d9ff" strokeWidth="1.3" />
        <path d="M8 5v3" stroke="#00d9ff" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11" r="0.8" fill="#00d9ff" />
      </svg>
    ),
    title: 'Tolerancias de fabricación ≤ 0.01 mm',
    desc: 'Mecanizado CNC de precisión controlado con equipo de medición tridimensional certificado.',
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <path d="M3 13L8 3l5 10H3z" stroke="#00d9ff" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M6.5 10h3" stroke="#00d9ff" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: 'Diseño anatómico por lateralidad',
    desc: 'Geometría específica para lado derecho e izquierdo, adaptada a la morfología ósea de la población latinoamericana.',
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <path d="M2 8a6 6 0 1012 0A6 6 0 002 8z" stroke="#00d9ff" strokeWidth="1.3" />
        <path d="M6 8l1.5 1.5L10 6" stroke="#00d9ff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Biocompatibilidad comprobada',
    desc: 'Pruebas de citotoxicidad, sensibilización e implantación según normas ISO 10993 vigentes.',
  },
]

// ─────────────────────────────────────────────────────────────────────
// Subcomponentes — solo presentación de la columna derecha
// ─────────────────────────────────────────────────────────────────────

const ACCENT = '#00d4ff'
const IMPLANT_IMG = '/models/Distal%20Lateral%20Fibular%20Plate.jpg'

interface AnnotationData {
  position: { top: string; left: string }
  side: 'left' | 'right'
  label: string
  text: string
  delay: number
}

const ANNOTATIONS: AnnotationData[] = [
  {
    position: { top: '25%', left: '5%' },
    side: 'left',
    label: 'TITANIO MÉDICO GRADO 4',
    text: 'Biocompatible · Alta resistencia · Ligero',
    delay: 300,
  },
  {
    position: { top: '15%', left: '60%' },
    side: 'right',
    label: 'DISEÑO ANATÓMICO',
    text: 'Adaptación precisa a la morfología ósea para una fijación segura.',
    delay: 500,
  },
  {
    position: { top: '65%', left: '3%' },
    side: 'left',
    label: 'INGENIERÍA BIOMECÁNICA',
    text: 'Distribución optimizada de cargas para favorecer la consolidación ósea.',
    delay: 700,
  },
  {
    position: { top: '70%', left: '58%' },
    side: 'right',
    label: 'PRECISIÓN QUIRÚRGICA',
    text: 'Tolerancias ≤ 0.01 mm para máxima estabilidad.',
    delay: 900,
  },
]

function Annotation({ data }: { data: AnnotationData }) {
  const isLeft = data.side === 'left'
  return (
    <div
      className={`ann ann-${isLeft ? 'left' : 'right'}`}
      style={{
        position: 'absolute',
        top: data.position.top,
        left: data.position.left,
        animationDelay: `${data.delay}ms`,
        maxWidth: 240,
        zIndex: 6,
      }}
    >
      <div className="ann-card">
        <div className="ann-label">{data.label}</div>
        <div className="ann-text">{data.text}</div>
      </div>
      <div className="ann-line" />
    </div>
  )
}

function MiniBlueprint() {
  return (
    <div
      className="blueprint-card"
      style={{
        position: 'absolute',
        left: '5%',
        top: '35%',
        width: 130,
        background: 'rgba(0,20,40,0.85)',
        border: `1px solid ${ACCENT}40`,
        borderRadius: 4,
        padding: '10px 8px',
        backdropFilter: 'blur(6px)',
        zIndex: 5,
        animationDelay: '600ms',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: 10,
          letterSpacing: '0.18em',
          color: ACCENT,
          textTransform: 'uppercase',
          marginBottom: 6,
        }}
      >
        SPEC · LCP-04
      </div>

      <svg viewBox="0 0 160 220" width="100%" height="170" aria-hidden="true">
        <defs>
          <marker id="bp-arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={ACCENT} />
          </marker>
        </defs>

        {/* Cota arriba — 2.7 mm */}
        <line x1="58" y1="20" x2="102" y2="20" stroke={ACCENT} strokeWidth="0.6" markerStart="url(#bp-arr)" markerEnd="url(#bp-arr)" />
        <text x="80" y="14" fill={ACCENT} fontSize="8" fontFamily="monospace" textAnchor="middle">2.7 mm</text>

        {/* Placa */}
        <rect x="60" y="30" width="40" height="150" rx="20" ry="20" fill="none" stroke={ACCENT} strokeWidth="1.2" />
        {/* 6 agujeros */}
        {[48, 72, 96, 120, 144, 168].map((cy) => (
          <g key={cy}>
            <circle cx="80" cy={cy} r="6" fill="none" stroke={ACCENT} strokeWidth="0.8" />
            <circle cx="80" cy={cy} r="2.4" fill="none" stroke={ACCENT} strokeWidth="0.5" opacity="0.6" />
          </g>
        ))}

        {/* Cota lateral — 86.0 mm */}
        <line x1="115" y1="32" x2="115" y2="178" stroke={ACCENT} strokeWidth="0.6" markerStart="url(#bp-arr)" markerEnd="url(#bp-arr)" />
        <text x="120" y="108" fill={ACCENT} fontSize="8" fontFamily="monospace" textAnchor="start">86.0 mm</text>
        <line x1="100" y1="32" x2="118" y2="32" stroke={ACCENT} strokeWidth="0.4" opacity="0.5" />
        <line x1="100" y1="178" x2="118" y2="178" stroke={ACCENT} strokeWidth="0.4" opacity="0.5" />

        {/* Cota base — 10.6 mm */}
        <line x1="58" y1="198" x2="102" y2="198" stroke={ACCENT} strokeWidth="0.6" markerStart="url(#bp-arr)" markerEnd="url(#bp-arr)" />
        <text x="80" y="210" fill={ACCENT} fontSize="8" fontFamily="monospace" textAnchor="middle">10.6 mm</text>
        <line x1="60" y1="180" x2="60" y2="200" stroke={ACCENT} strokeWidth="0.4" opacity="0.5" />
        <line x1="100" y1="180" x2="100" y2="200" stroke={ACCENT} strokeWidth="0.4" opacity="0.5" />
      </svg>
    </div>
  )
}

function HudCorners() {
  // Top-left + bottom-right · líneas de 20px
  const color = 'rgba(0,212,255,0.6)'
  const size = 20
  const thick = '1px'
  return (
    <>
      <span aria-hidden="true" style={{ position: 'absolute', top: 14, left: 14, width: size, height: thick, background: color, zIndex: 8 }} />
      <span aria-hidden="true" style={{ position: 'absolute', top: 14, left: 14, width: thick, height: size, background: color, zIndex: 8 }} />
      <span aria-hidden="true" style={{ position: 'absolute', bottom: 14, right: 14, width: size, height: thick, background: color, zIndex: 8 }} />
      <span aria-hidden="true" style={{ position: 'absolute', bottom: 14, right: 14, width: thick, height: size, background: color, zIndex: 8 }} />
    </>
  )
}

function RightColumnVisual() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 720,
        overflow: 'hidden',
        background: 'transparent',
        border: 'none',
      }}
    >
      {/* Keyframes + clases (scoped a este wrapper) */}
      <style>{`
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeInLeft  { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn      { from { opacity: 0; } to { opacity: 1; } }

        .image-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .image-wrapper::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 120px;
          background: linear-gradient(to bottom, #020d1a 0%, transparent 100%);
          z-index: 2;
          pointer-events: none;
        }
        .image-wrapper::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 150px;
          background: linear-gradient(to top, #020d1a 0%, transparent 100%);
          z-index: 2;
          pointer-events: none;
        }
        .image-fade-left {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 100px;
          background: linear-gradient(to right, #020d1a 0%, transparent 100%);
          z-index: 2;
          pointer-events: none;
        }
        .implant-img {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          filter: sepia(1) hue-rotate(185deg) saturate(2.5) brightness(0.85);
          z-index: 1;
          opacity: 0;
          animation: fadeInScale 1s ease-out forwards;
        }
        .ann {
          opacity: 0;
          animation-duration: 0.7s;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          transition: filter 0.25s ease;
        }
        .ann-left  { animation-name: fadeInLeft; }
        .ann-right { animation-name: fadeInRight; }
        .ann-card {
          background: rgba(2, 13, 26, 0.6);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 1px solid rgba(0, 212, 255, 0.20);
          border-radius: 4px;
          padding: 8px 12px;
          transition: filter 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }
        .ann-label {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 700;
          color: ${ACCENT};
          letter-spacing: 1.5px;
          text-transform: uppercase;
          line-height: 1.3;
          transition: filter 0.25s ease;
        }
        .ann-text {
          font-family: var(--font-sans, sans-serif);
          font-size: 11px;
          color: rgba(255, 255, 255, 0.78);
          line-height: 1.45;
          margin-top: 4px;
        }
        .ann-line {
          height: 1px;
          width: 60px;
          border-bottom: 1px dashed ${ACCENT};
          opacity: 0.55;
          transition: opacity 0.25s ease, border-bottom-style 0.25s ease;
        }
        .ann-left .ann-line  { margin-left: 8px;  margin-top: -10px; }
        .ann-right .ann-line { margin-right: 8px; margin-top: -10px; margin-left: auto; }
        .ann-right .ann-card { text-align: right; }

        .ann:hover .ann-label { filter: brightness(1.2); }
        .ann:hover .ann-line  { opacity: 1; border-bottom-style: solid; }
        .ann:hover .ann-card  { border-color: rgba(0, 212, 255, 0.45); }

        .blueprint-card {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }
        .iso-badge { opacity: 0; animation: fadeIn 0.8s 0.4s ease-out forwards; }

        @media (prefers-reduced-motion: reduce) {
          .implant-img, .ann, .blueprint-card, .iso-badge {
            opacity: 1 !important;
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* HUD corner brackets — top-left + bottom-right */}
      <HudCorners />

      {/* Imagen del implante con fundidos perimetrales */}
      <div className="image-wrapper" aria-hidden="false">
        <img
          src={IMPLANT_IMG}
          alt="Distal Lateral Fibular Plate"
          className="implant-img"
          draggable={false}
        />
        <div className="image-fade-left" />
      </div>

      {/* Diagrama técnico flotante */}
      <MiniBlueprint />

      {/* 4 anotaciones */}
      {ANNOTATIONS.map((a) => (
        <Annotation key={a.label} data={a} />
      ))}

      {/* Badge ISO 13485 — top-right */}
      <div
        className="iso-badge"
        style={{
          position: 'absolute',
          top: 18,
          right: 18,
          padding: '4px 10px',
          background: 'rgba(0,20,40,0.7)',
          border: `1px solid ${ACCENT}`,
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: 11,
          color: ACCENT,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontWeight: 700,
          backdropFilter: 'blur(6px)',
          zIndex: 9,
        }}
      >
        ISO 13485
      </div>
    </div>
  )
}

export default function IngenieriaSinLimites() {
  const prefersReduced = useReducedMotion()
  const containerVariants = prefersReduced ? reducedMotion : staggerContainer
  const itemVariants = prefersReduced ? reducedMotion : fadeInUp

  return (
    <section
      id="ingenieria"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#020d1a' }}
      aria-label="Ingeniería sin límites"
    >
      {/* Fondo: grid técnico tenue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(0,168,204,0.03) 59px, rgba(0,168,204,0.03) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(0,168,204,0.03) 59px, rgba(0,168,204,0.03) 60px)',
        }}
      />

      {/* Número de sección decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          right: '-0.05em',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(140px, 22vw, 260px)',
          fontWeight: 800,
          color: 'rgba(0,168,204,0.035)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          userSelect: 'none',
        }}
      >
        02
      </div>

      {/* Glow lateral izquierdo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '40%',
          height: '80%',
          background: 'radial-gradient(ellipse at left center, rgba(0,82,163,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] items-stretch gap-16 lg:gap-12">

          {/* ── COLUMNA IZQUIERDA: Texto ─────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="w-full"
          >
            {/* Badge */}
            <motion.span
              variants={itemVariants}
              className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded mb-6"
              style={{
                background: 'rgba(0,168,204,0.10)',
                border: '1px solid rgba(0,168,204,0.30)',
                color: 'var(--color-accent)',
                letterSpacing: '0.15em',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Ingeniería Avanzada
            </motion.span>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.01em',
                color: '#ffffff',
                marginBottom: 8,
              }}
            >
              INGENIERÍA
            </motion.h2>
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.01em',
                color: '#00d9ff',
                marginBottom: 28,
              }}
            >
              SIN LÍMITES
            </motion.h2>

            {/* Descripción */}
            <motion.p
              variants={itemVariants}
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: 14,
                lineHeight: 1.75,
                maxWidth: 540,
                marginBottom: 36,
              }}
            >
              Diseñamos y distribuimos dispositivos médicos de osteosíntesis que combinan metalurgia
              de precisión con ingeniería biomecánica. Cada implante es el resultado de un proceso
              riguroso de I+D orientado a reducir el tiempo de recuperación quirúrgica.
            </motion.p>

            {/* Lista de features */}
            <div className="flex flex-col gap-4">
              {FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  variants={itemVariants}
                  className="flex items-start gap-4 group"
                  style={{
                    padding: '12px 14px',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.04)',
                    background: 'rgba(255,255,255,0.02)',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  whileHover={{
                    borderColor: 'rgba(0,217,255,0.18)',
                    backgroundColor: 'rgba(0,217,255,0.04)',
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* Ícono */}
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      border: '1px solid rgba(0,217,255,0.25)',
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      background: 'rgba(0,168,204,0.08)',
                    }}
                  >
                    {feat.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        color: '#ffffff',
                        fontSize: 13,
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        margin: '0 0 3px',
                      }}
                    >
                      {feat.title}
                    </p>
                    <p
                      style={{
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: 11,
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="mt-10">
              <a
                href="#soluciones"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#00d9ff',
                  color: '#020d1a',
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  padding: '13px 28px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  transition: 'box-shadow 0.25s, transform 0.15s',
                  fontFamily: 'var(--font-mono)',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(0,217,255,0.40)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  ;(e.currentTarget as HTMLElement).style.transform = 'none'
                }}
              >
                Ver catálogo de soluciones
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* ── COLUMNA DERECHA: Imagen placeholder ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative w-full"
          >
            <RightColumnVisual />
          </motion.div>

        </div>
      </div>

      {/* Línea decorativa inferior */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,168,204,0.25), transparent)' }}
      />
    </section>
  )
}
