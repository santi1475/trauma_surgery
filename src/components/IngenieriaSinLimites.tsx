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
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* ── COLUMNA IZQUIERDA: Texto ─────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="w-full lg:w-[55%]"
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
            className="w-full lg:w-[45%] flex-shrink-0"
          >
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/5',
                maxWidth: 420,
                margin: '0 auto',
              }}
            >
              {/* Marco exterior decorativo */}
              <div
                style={{
                  position: 'absolute',
                  inset: -10,
                  border: '1px solid rgba(0,168,204,0.10)',
                  borderRadius: 16,
                  pointerEvents: 'none',
                }}
              />

              {/* Imagen placeholder principal */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background:
                    'linear-gradient(145deg, rgba(4,18,36,0.95) 0%, rgba(8,28,56,0.88) 60%, rgba(2,13,26,0.92) 100%)',
                  borderRadius: 12,
                  border: '1px solid rgba(0,168,204,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Grid interno */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                      'repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(0,168,204,0.05) 29px, rgba(0,168,204,0.05) 30px), repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(0,168,204,0.05) 29px, rgba(0,168,204,0.05) 30px)',
                  }}
                />
                {/* Glow central */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,82,163,0.20) 0%, transparent 70%)',
                  }}
                />
                {/* Dashed border interno */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 14,
                    border: '1px dashed rgba(0,217,255,0.16)',
                    borderRadius: 8,
                  }}
                />
                {/* Esquinas decorativas */}
                {[
                  { top: 14, left: 14 },
                  { top: 14, right: 14 },
                  { bottom: 14, left: 14 },
                  { bottom: 14, right: 14 },
                ].map((pos, i) => (
                  <div
                    key={i}
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      width: 14,
                      height: 14,
                      borderTop: i < 2 ? '2px solid rgba(0,217,255,0.50)' : 'none',
                      borderBottom: i >= 2 ? '2px solid rgba(0,217,255,0.50)' : 'none',
                      borderLeft: i % 2 === 0 ? '2px solid rgba(0,217,255,0.50)' : 'none',
                      borderRight: i % 2 === 1 ? '2px solid rgba(0,217,255,0.50)' : 'none',
                      ...pos,
                    }}
                  />
                ))}

                {/* Placeholder content */}
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
                  <div style={{ fontSize: 32, opacity: 0.2, marginBottom: 12 }}>🖼</div>
                  <img
                    src="/placeholders/placas-comerciales.svg"
                    alt="Placas comerciales de osteosíntesis"
                    style={{
                      maxWidth: '70%',
                      maxHeight: 180,
                      objectFit: 'contain',
                      opacity: 0.15,
                      filter: 'brightness(0) invert(1)',
                      display: 'block',
                      margin: '0 auto 12px',
                    }}
                  />
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 9,
                      color: 'rgba(0,217,255,0.50)',
                      letterSpacing: '0.12em',
                      marginBottom: 4,
                    }}
                  >
                    /placeholders/placas-comerciales.svg
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.22)',
                    }}
                  >
                    Placas comerciales de osteosíntesis
                  </div>
                </div>

                {/* Label inferior */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 18,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 8,
                      letterSpacing: '0.16em',
                      color: 'rgba(0,217,255,0.4)',
                      textTransform: 'uppercase',
                      background: 'rgba(0,217,255,0.06)',
                      border: '1px solid rgba(0,217,255,0.12)',
                      padding: '3px 10px',
                      borderRadius: 3,
                    }}
                  >
                    Imagen del producto
                  </span>
                </div>
              </div>

              {/* Badge flotante — esquina superior derecha */}
              <div
                style={{
                  position: 'absolute',
                  top: -14,
                  right: -10,
                  background: 'rgba(0,217,255,0.12)',
                  border: '1px solid rgba(0,217,255,0.35)',
                  borderRadius: 6,
                  padding: '5px 10px',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    color: '#00d9ff',
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  ISO 13485
                </span>
              </div>

              {/* Badge flotante — esquina inferior izquierda */}
              <div
                style={{
                  position: 'absolute',
                  bottom: -14,
                  left: -10,
                  background: 'rgba(10,58,96,0.85)',
                  border: '1px solid rgba(0,168,204,0.30)',
                  borderRadius: 6,
                  padding: '5px 12px',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    color: 'rgba(0,217,255,0.8)',
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                  }}
                >
                  CE Mark · Ti Gr.4
                </span>
              </div>
            </div>
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
