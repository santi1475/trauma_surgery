'use client'
import { useState, useEffect } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { staggerContainer, fadeInUp, fadeIn, reducedMotion } from '@/animations/variants'
import { FloatingParticles } from './Particles'
import { AnimatedGridPattern } from './ui/animated-grid-pattern'
import SurgicalOrb from './3d/SurgicalOrb'

const STATS = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="5" stroke="#00d9ff" strokeWidth="1.5" />
        <path d="M8 5v3l2 1" stroke="#00d9ff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    value: '+10',
    label: 'Años de innovación',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M8 2a3 3 0 100 6 3 3 0 000-6zM3 13c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="#00d9ff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    value: '+2000',
    label: 'Cirugías exitosas',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <circle cx="5" cy="6" r="2" stroke="#00d9ff" strokeWidth="1.5" />
        <circle cx="11" cy="6" r="2" stroke="#00d9ff" strokeWidth="1.5" />
        <path d="M1 13c0-2 1.8-3.5 4-3.5M15 13c0-2-1.8-3.5-4-3.5M8 13c0-1.8-1.3-3.5-3-3.5" stroke="#00d9ff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    value: '+100.000',
    label: 'Pacientes beneficiados',
  },
]

const CARRUSEL = [
  { id: 0, type: 'orb', src: '' },
  { id: 1, type: 'image', src: '/IMG/P1.svg' },
]

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const containerVariants = prefersReduced ? reducedMotion : staggerContainer
  const itemVariants = prefersReduced ? reducedMotion : fadeInUp
  const bgVariants = prefersReduced ? reducedMotion : fadeIn

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (prefersReduced) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CARRUSEL.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [prefersReduced])

  return (
    <section
      aria-label="Hero principal"
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 100% at 60% 40%, #0a3060 0%, #041224 50%, #020d1a 100%)',
      }}
    >
      {/* Fondo: patrón animado de rejilla */}
      <AnimatedGridPattern
        numSquares={20}
        maxOpacity={0.04}
        duration={5}
        width={60}
        height={60}
        style={{
          stroke: 'rgba(0,217,255,0.06)',
          fill: 'rgba(0,217,255,0.04)',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Partículas flotantes */}
      <FloatingParticles count={22} />

      {/* Línea vertical decorativa */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 bottom-0 w-px origin-top hidden lg:block"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(0,217,255,0.2) 30%, rgba(0,217,255,0.35) 60%, transparent)',
          marginLeft: '50%',
        }}
        aria-hidden="true"
      />

      {/* Contenedor Principal */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 xl:px-20 pt-24 lg:pt-0 lg:pb-[15vh] pointer-events-none">
        
        {/* ── COLUMNA IZQUIERDA: Texto ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 order-2 lg:order-1 w-full lg:w-[40%] xl:w-[35%] pointer-events-auto mt-8 lg:mt-0"
          >
            <div className="w-full">
              {/* Eyebrow */}
              <motion.p
                variants={itemVariants}
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                  marginBottom: 16,
                }}
              >
                Especialistas en implantes de osteosíntesis
              </motion.p>

              {/* Títulos */}
              <motion.h1
                variants={itemVariants}
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#ffffff',
                  fontSize: 'clamp(48px, 7vw, 72px)',
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                  margin: '0 0 0px 0',
                }}
              >
                RECUPERA
              </motion.h1>
              <motion.h1
                variants={itemVariants}
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#00d9ff',
                  fontSize: 'clamp(48px, 7vw, 72px)',
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                  margin: '0 0 0px 0',
                }}
              >
                EL MOVIMIENTO
              </motion.h1>
              <motion.h1
                variants={itemVariants}
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#ffffff',
                  fontSize: 'clamp(48px, 7vw, 72px)',
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                  margin: '0 0 40px 0',
                }}
              >
                CON PRECISIÓN
              </motion.h1>

              {/* CTA */}
              <motion.a
                variants={itemVariants}
                href="#soluciones"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  padding: '12px 24px',
                  borderRadius: 4,
                  textDecoration: 'none',
                  width: 'fit-content',
                  transition: 'border-color 0.25s, background 0.25s',
                }}
                whileHover={{
                  borderColor: '#00d9ff',
                  backgroundColor: 'rgba(0,217,255,0.08)',
                }}
                whileTap={{ scale: 0.97 }}
              >
                Explorar soluciones
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

        {/* ── CENTRO: Carrusel Visual (ABSOLUTO EN DESKTOP) ── */}
        <div className="relative lg:absolute lg:inset-0 z-10 flex items-center justify-center pointer-events-none order-1 lg:order-none w-full h-[55vh] lg:h-full lg:pb-[15vh]">
          {/* Glow */}
          <motion.div
            variants={bgVariants}
            initial="hidden"
            animate="visible"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(0,180,255,0.2) 0%, rgba(0,100,200,0.05) 50%, transparent 70%)',
            }}
          />

          <motion.div
            variants={bgVariants}
            className="relative w-full h-full max-w-[1000px] max-h-[85vh] flex items-center justify-center pointer-events-auto"
          >
            <AnimatePresence mode="wait">
              {CARRUSEL[currentSlide].type === 'orb' ? (
                <motion.div
                  key="orb"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 z-10 cursor-move"
                >
                  <SurgicalOrb />
                </motion.div>
              ) : (
                <motion.img
                  key={currentSlide}
                  src={CARRUSEL[currentSlide].src}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1, y: -30 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute h-[95%] w-auto object-contain object-center drop-shadow-[0_0_60px_rgba(0,217,255,0.25)] pointer-events-none"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── COLUMNA DERECHA: Stats ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 order-3 lg:order-2 flex flex-col justify-start gap-6 lg:gap-8 w-full lg:w-[220px] pointer-events-auto mt-12 lg:mt-0 pb-16 lg:pb-0"
        >
                {/* Encabezado */}
                <motion.div variants={itemVariants}>
                  <p
                    style={{
                      color: '#00d9ff',
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      margin: '0 0 4px 0',
                    }}
                  >
                    Innovación
                  </p>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: 10,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    Que transforma
                    <br />
                    vidas
                  </p>
                </motion.div>

                {/* Separador */}
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  style={{
                    width: 36,
                    height: 1,
                    background: 'rgba(0,217,255,0.35)',
                  }}
                />

                {/* Stats */}
                <div className="flex flex-col gap-6">
                  {STATS.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      variants={itemVariants}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          border: '1.5px solid rgba(0,217,255,0.35)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        {stat.icon}
                      </div>
                      <div>
                        <p
                          style={{
                            color: '#ffffff',
                            fontSize: 18,
                            fontWeight: 800,
                            margin: 0,
                            lineHeight: 1,
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {stat.value}
                        </p>
                        <p
                          style={{
                            color: 'rgba(255,255,255,0.4)',
                            fontSize: 9,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            margin: '4px 0 0 0',
                            lineHeight: 1.3,
                          }}
                        >
                          {stat.label}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Banderas */}
                <motion.div variants={itemVariants} style={{ marginTop: '0.5rem' }}>
                  <span
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: 500,
                      display: 'block',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Operamos en
                  </span>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {['/flags/peru.png', '/flags/bolivia.png', '/flags/colombia.png', '/flags/uruguay.png'].map((flag) => (
                      <div key={flag} style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={flag}
                          alt=""
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '1px solid rgba(255,255,255,0.15)',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        aria-hidden="true"
      >
        <motion.div
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, #00d9ff, transparent)' }}
        />
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', fontWeight: 500 }}
        >
          scroll
        </span>
      </motion.div>

      {/* Borde inferior decorativo */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px z-20"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(0,217,255,0.25) 50%, transparent 100%)',
        }}
      />
    </section>
  )
}
