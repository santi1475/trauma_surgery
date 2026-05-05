'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, useReducedMotion, AnimatePresence, type Variants } from 'framer-motion'
import { staggerContainer, fadeInUp, reducedMotion } from '@/animations/variants'
import { FloatingParticles } from './Particles'
import { AnimatedGridPattern } from './ui/animated-grid-pattern'

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

const SLIDES = [
  {
    id: 0,
    badge: 'Implantes de Osteosíntesis',
    headline: ['RECUPERA', 'EL MOVIMIENTO', 'CON PRECISIÓN'],
    headlineAccent: 1,
    sub: 'Dispositivos de alta precisión para cirujanos exigentes en osteosíntesis y reemplazos articulares.',
    accent: 'Tecnología ISO · CE certificada',
    imageSrc: '/IMG/P1.svg',
    imageLabel: 'Personas corriendo — con overlay de implantes de osteosíntesis',
    imageTag: '01 — MOVIMIENTO',
  },
  {
    id: 1,
    badge: 'Vida Activa',
    headline: ['VIVE', 'SIN', 'LÍMITES'],
    headlineAccent: 1,
    sub: 'Implantes que restauran la calidad de vida del paciente, permitiendo volver a cada actividad cotidiana.',
    accent: '+2.000 cirugías exitosas en la región',
    imageSrc: '/placeholders/hero-estilo-vida.jpg',
    imageLabel: 'Estilo de vida saludable — actividad física y bienestar',
    imageTag: '02 — CALIDAD DE VIDA',
  },
  {
    id: 2,
    badge: 'Precisión Quirúrgica',
    headline: ['AVANZA', 'CON', 'CONFIANZA'],
    headlineAccent: 2,
    sub: 'Soluciones anatómicas específicas para cada región del cuerpo humano, diseñadas junto al cirujano.',
    accent: 'Perú · Bolivia · Colombia · Uruguay',
    imageSrc: '/placeholders/hero-perfil.jpg',
    imageLabel: 'Persona corriendo de perfil — movimiento y recuperación',
    imageTag: '03 — CONFIANZA',
  },
]

// Placeholder visual claro — reemplazar src con imagen real
function SlideImage({ src, label, tag }: { src: string; label: string; tag: string }) {
  const isPlaceholder = src.includes('/placeholders/')

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: isPlaceholder ? '#020d1a' : 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Contenido Principal */}
      {isPlaceholder ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Patrón de fondo interno (solo para placeholders) */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,217,255,0.04) 39px, rgba(0,217,255,0.04) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,217,255,0.04) 39px, rgba(0,217,255,0.04) 40px)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Borde dashed decorativo (solo para placeholders) */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 12,
              border: '1px dashed rgba(0,217,255,0.18)',
              borderRadius: 8,
              pointerEvents: 'none',
              zIndex: 5,
            }}
          />

          {/* Esquinas decorativas (solo para placeholders) */}
          {[
            { top: 12, left: 12 },
            { top: 12, right: 12 },
            { bottom: 12, left: 12 },
            { bottom: 12, right: 12 },
          ].map((pos, i) => (
            <div
              key={i}
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: 12,
                height: 12,
                borderTop: i < 2 ? '2px solid rgba(0,217,255,0.45)' : 'none',
                borderBottom: i >= 2 ? '2px solid rgba(0,217,255,0.45)' : 'none',
                borderLeft: i % 2 === 0 ? '2px solid rgba(0,217,255,0.45)' : 'none',
                borderRight: i % 2 === 1 ? '2px solid rgba(0,217,255,0.45)' : 'none',
                zIndex: 10,
                ...pos,
              }}
            />
          ))}

          {/* Texto de placeholder */}
          <div className="relative z-20 flex flex-col items-center gap-3">
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 28,
                opacity: 0.25,
                lineHeight: 1,
              }}
            >
              🖼
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'rgba(0,217,255,0.55)',
                letterSpacing: '0.10em',
                textAlign: 'center',
                padding: '0 20px',
                wordBreak: 'break-all',
              }}
            >
              {src}
            </div>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={label}
          style={{
            width: '100%',
            height: '100%',
            objectFit: isPlaceholder ? 'cover' : 'contain',
          }}
        />
      )}

      {/* Info técnica superpuesta (siempre visible) */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 24,
          right: 24,
          zIndex: 15,
          pointerEvents: 'none',
          textShadow: isPlaceholder ? 'none' : '0 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.16em',
            color: isPlaceholder ? 'rgba(0,217,255,0.45)' : 'rgba(0,217,255,0.95)',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {tag}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            color: isPlaceholder ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.85)',
            margin: '2px 0 0 0',
            maxWidth: '80%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </p>
      </div>
    </div>
  )
}

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const [activeSlide, setActiveSlide] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > activeSlide ? 1 : -1)
      setActiveSlide(index)
    },
    [activeSlide]
  )

  const next = useCallback(() => {
    setDirection(1)
    setActiveSlide((p) => (p + 1) % SLIDES.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setActiveSlide((p) => (p - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (prefersReduced) return
    const t = setInterval(next, 5500)
    return () => clearInterval(t)
  }, [prefersReduced, next])

  const slide = SLIDES[activeSlide]
  const containerVariants = prefersReduced ? reducedMotion : staggerContainer
  const itemVariants = prefersReduced ? reducedMotion : fadeInUp

  const slideImgVariants: Variants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 0.96,
      x: dir > 0 ? 48 : -48,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 1.03,
      x: dir > 0 ? -48 : 48,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    }),
  }

  const textVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  }

  const textLine: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      aria-label="Hero principal"
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 100% at 60% 40%, #0a3060 0%, #041224 50%, #020d1a 100%)',
      }}
    >
      {/* Grid animado de fondo */}
      <AnimatedGridPattern
        numSquares={20}
        maxOpacity={0.04}
        duration={5}
        width={60}
        height={60}
        style={{
          stroke: 'rgba(0,217,255,0.06)',
          fill: 'rgba(0,217,255,0.04)',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Partículas flotantes */}
      <FloatingParticles count={22} />

      {/* Línea vertical central decorativa */}
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

      {/* ── LAYOUT 3 COLUMNAS ─────────────────────────────────────────────── */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 xl:px-20 pt-24 lg:pt-0 lg:pb-[15vh] pointer-events-none">

        {/* ── IZQUIERDA: Texto del slide ─── */}
        <div className="relative z-20 order-2 lg:order-1 w-full lg:w-[38%] xl:w-[34%] pointer-events-auto mt-8 lg:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${activeSlide}`}
              variants={prefersReduced ? reducedMotion : textVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.28 } }}
            >
              {/* Badge */}
              <motion.p
                variants={prefersReduced ? reducedMotion : textLine}
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                  marginBottom: 18,
                }}
              >
                {slide.badge}
              </motion.p>

              {/* Headline — líneas stagger */}
              {slide.headline.map((line, i) => (
                <motion.h1
                  key={`${activeSlide}-${i}`}
                  variants={prefersReduced ? reducedMotion : textLine}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: i === slide.headlineAccent ? '#00d9ff' : '#ffffff',
                    fontSize: 'clamp(44px, 6.5vw, 70px)',
                    fontWeight: 800,
                    lineHeight: 1.0,
                    letterSpacing: '-0.02em',
                    margin: i === slide.headline.length - 1 ? '0 0 28px 0' : '0',
                  }}
                >
                  {line}
                </motion.h1>
              ))}

              {/* Subtítulo */}
              <motion.p
                variants={prefersReduced ? reducedMotion : textLine}
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: 13,
                  lineHeight: 1.7,
                  letterSpacing: '0.01em',
                  marginBottom: 10,
                  maxWidth: 360,
                }}
              >
                {slide.sub}
              </motion.p>

              {/* Accent line */}
              <motion.p
                variants={prefersReduced ? reducedMotion : textLine}
                style={{
                  color: '#00d9ff',
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: 32,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {slide.accent}
              </motion.p>

              {/* CTA */}
              <motion.a
                variants={prefersReduced ? reducedMotion : textLine}
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
                  transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
                }}
                whileHover={{
                  borderColor: '#00d9ff',
                  backgroundColor: 'rgba(0,217,255,0.08)',
                  boxShadow: '0 0 20px rgba(0,217,255,0.15)',
                }}
                whileTap={{ scale: 0.97 }}
              >
                Explorar soluciones
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── CENTRO: Slider de imágenes (absoluto en desktop) ─── */}
        <div className="relative lg:absolute lg:inset-0 z-10 flex items-center justify-center pointer-events-none order-1 lg:order-none w-full h-[55vh] lg:h-full lg:pb-[15vh]">
          {/* Glow central */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(0,160,230,0.15) 0%, rgba(0,80,180,0.04) 50%, transparent 70%)',
            }}
          />

          <div className="relative w-full h-full max-w-[900px] max-h-[85vh] flex items-center justify-center pointer-events-auto">
            {/* Imagen del slide */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={`img-${activeSlide}`}
                custom={direction}
                variants={slideImgVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`absolute ${slide.imageSrc.includes('/placeholders/') ? 'rounded-xl overflow-hidden' : ''}`}
                style={{
                  width: slide.imageSrc.includes('/placeholders/') ? '60%' : '85%',
                  height: slide.imageSrc.includes('/placeholders/') ? '78%' : '90%',
                  maxWidth: slide.imageSrc.includes('/placeholders/') ? 480 : 720,
                  minHeight: 300,
                  boxShadow: slide.imageSrc.includes('/placeholders/') 
                    ? '0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,100,200,0.15)'
                    : 'none',
                  overflow: slide.imageSrc.includes('/placeholders/') ? 'hidden' : 'visible',
                }}
              >
                <SlideImage
                  src={slide.imageSrc}
                  label={slide.imageLabel}
                  tag={slide.imageTag}
                />
              </motion.div>
            </AnimatePresence>

            {/* Flecha izquierda */}
            <button
              onClick={prev}
              aria-label="Slide anterior"
              className="absolute left-4 lg:left-8"
              style={{
                background: 'rgba(2,13,26,0.7)',
                border: '1px solid rgba(0,217,255,0.20)',
                borderRadius: '50%',
                width: 38,
                height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.6)',
                transition: 'all 0.2s',
                backdropFilter: 'blur(8px)',
                zIndex: 20,
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = '#00d9ff'
                ;(e.currentTarget as HTMLElement).style.color = '#00d9ff'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,217,255,0.10)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,217,255,0.20)'
                ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(2,13,26,0.7)'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Flecha derecha */}
            <button
              onClick={next}
              aria-label="Slide siguiente"
              className="absolute right-4 lg:right-8"
              style={{
                background: 'rgba(2,13,26,0.7)',
                border: '1px solid rgba(0,217,255,0.20)',
                borderRadius: '50%',
                width: 38,
                height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.6)',
                transition: 'all 0.2s',
                backdropFilter: 'blur(8px)',
                zIndex: 20,
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = '#00d9ff'
                ;(e.currentTarget as HTMLElement).style.color = '#00d9ff'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,217,255,0.10)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,217,255,0.20)'
                ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(2,13,26,0.7)'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Indicador de número de slide */}
            <div
              className="absolute"
              style={{
                bottom: '10%',
                right: '22%',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.12em',
                zIndex: 20,
              }}
            >
              <span style={{ color: '#00d9ff' }}>{String(activeSlide + 1).padStart(2, '0')}</span>
              {' / '}
              {String(SLIDES.length).padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* ── DERECHA: Stats (constantes) ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 order-3 lg:order-2 flex flex-col justify-start gap-6 lg:gap-8 w-full lg:w-[200px] pointer-events-auto mt-12 lg:mt-0 pb-16 lg:pb-0"
        >
          <motion.div variants={itemVariants}>
            <p style={{ color: '#00d9ff', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 4px 0' }}>
              Innovación
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, lineHeight: 1.5 }}>
              Que transforma<br />vidas
            </p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{ width: 36, height: 1, background: 'rgba(0,217,255,0.35)' }}
          />

          <div className="flex flex-col gap-6">
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
              >
                <div style={{
                  width: 30, height: 30,
                  border: '1.5px solid rgba(0,217,255,0.35)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 2,
                }}>
                  {stat.icon}
                </div>
                <div>
                  <p style={{ color: '#ffffff', fontSize: 18, fontWeight: 800, margin: 0, lineHeight: 1, letterSpacing: '-0.01em' }}>
                    {stat.value}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '4px 0 0 0', lineHeight: 1.3 }}>
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} style={{ marginTop: '0.5rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, display: 'block', marginBottom: '0.75rem' }}>
              Operamos en
            </span>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['/flags/peru.png', '/flags/bolivia.png', '/flags/colombia.png', '/flags/uruguay.png'].map((flag) => (
                <div key={flag}>
                  <img src={flag} alt="" style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.15)' }} />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Dots de navegación ─────────────────────────────────────────────── */}
      <div
        className="absolute z-30 flex items-center gap-2"
        style={{ bottom: 80, left: '50%', transform: 'translateX(-50%)' }}
        role="tablist"
        aria-label="Navegación del slider"
      >
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === activeSlide}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i)}
            style={{
              height: 4,
              borderRadius: 2,
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              background: i === activeSlide ? '#00d9ff' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.35s ease',
              width: i === activeSlide ? 28 : 6,
              boxShadow: i === activeSlide ? '0 0 8px rgba(0,217,255,0.6)' : 'none',
            }}
          />
        ))}
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
        <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', fontWeight: 500 }}>
          scroll
        </span>
      </motion.div>

      {/* Borde inferior decorativo */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px z-20"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,217,255,0.25) 50%, transparent 100%)' }}
      />
    </section>
  )
}
