'use client'
import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp, fadeIn, reducedMotion } from '@/animations/variants'
import { FloatingParticles } from './Particles'
import { AnimatedGridPattern } from './ui/animated-grid-pattern'
import { AnimatedShinyText } from './ui/animated-shiny-text'

const SurgicalOrb = lazy(() => import('./3d/SurgicalOrb'))

function OrbSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
      <div
        className="w-64 h-64 rounded-full animate-pulse"
        style={{ border: '2px solid rgba(0,217,255,0.2)' }}
      />
    </div>
  )
}

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const containerVariants = prefersReduced ? reducedMotion : staggerContainer
  const itemVariants    = prefersReduced ? reducedMotion : fadeInUp
  const bgVariants      = prefersReduced ? reducedMotion : fadeIn

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 100% at 60% 40%, #0a3060 0%, #041224 50%, #020d1a 100%)',
      }}
      aria-labelledby="hero-heading"
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
          fill:   'rgba(0,217,255,0.04)',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Resplandor derecho */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          right: '5%', top: '10%',
          width: '55%', height: '80%',
          background:
            'radial-gradient(ellipse 60% 80% at 60% 40%, rgba(0,100,200,0.35) 0%, transparent 70%)',
        }}
      />

      {/* Partículas flotantes */}
      <FloatingParticles count={22} />

      {/* Línea decorativa vertical */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 bottom-0 w-px origin-top hidden lg:block"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(0,217,255,0.2) 30%, rgba(0,217,255,0.35) 60%, transparent)',
          marginLeft: '10%',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-90 items-center min-h-[calc(100vh-7rem)]">

          {/* ── Columna izquierda ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center max-w-xl"
          >
            {/* Badge shiny */}
            <motion.div variants={itemVariants} className="mb-7">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{
                  background: 'rgba(0,217,255,0.1)',
                  border: '1px solid rgba(0,217,255,0.3)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: '#00d9ff' }}
                  aria-hidden="true"
                />
                <AnimatedShinyText
                  shimmerWidth={150}
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    backgroundImage:
                      'linear-gradient(to right, transparent, rgba(0,217,255,0.95) 50%, transparent)',
                    animation: 'shiny-text 4.5s ease-in-out infinite',
                  }}
                >
                  Innovación médica · 2025
                </AnimatedShinyText>
              </span>
            </motion.div>

            {/* Titular */}
            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="mb-6 leading-tight"
              style={{
                fontWeight: 800,
                color: '#ffffff',
                fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.08,
              }}
            >
              Soluciones en{' '}
              <span style={{ color: '#00d9ff' }}>Osteosíntesis</span>{' '}
              y Reemplazo Articular
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              variants={itemVariants}
              className="mb-10 leading-relaxed"
              style={{
                fontWeight: 300,
                color: 'rgba(255,255,255,0.6)',
                fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
                lineHeight: 1.7,
                maxWidth: '44ch',
              }}
            >
              TraumaSurgery EIRL respalda a especialistas en Perú, Bolivia y Colombia
              con implantes y sistemas de fijación con certificación internacional —
              precisión quirúrgica en cada solución.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
              <a
                href="#soluciones"
                className="inline-flex items-center gap-2 text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #00d9ff 0%, #0099cc 100%)',
                  color: '#020d1a',
                  fontWeight: 700,
                  padding: '13px 30px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                  boxShadow: '0 8px 30px rgba(0,217,255,0.3)',
                }}
              >
                Ver soluciones
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="2" y1="7" x2="12" y2="7" />
                  <polyline points="8,3 12,7 8,11" />
                </svg>
              </a>

              <a
                href="#contacto"
                className="inline-flex items-center text-sm transition-all duration-200 active:scale-95"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 400,
                  padding: '13px 28px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.3)',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = '#00d9ff'
                  ;(e.currentTarget as HTMLElement).style.color = '#00d9ff'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'
                  ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'
                }}
              >
                Contactar ahora
              </a>
            </motion.div>

            {/* Banderas */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <span
                className="text-xs uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}
              >
                Operamos en
              </span>
              {[
                { flag: '/peru.png',     name: 'Perú' },
                { flag: '/bolivia.png',  name: 'Bolivia' },
                { flag: '/colombia.png', name: 'Colombia' },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-1.5">
                  <img
                    src={c.flag}
                    alt={c.name}
                    className="w-5 h-5 rounded-full object-cover"
                    style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                  />
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 400 }}>
                    {c.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Columna derecha — orbe 3D ── */}
          <motion.div
            variants={bgVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="relative hidden lg:flex items-center justify-center"
            style={{ height: 'clamp(400px, 55vw, 600px)' }}
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,100,200,0.2) 0%, transparent 70%)',
              }}
            />
            <Suspense fallback={<OrbSkeleton />}>
              <SurgicalOrb />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
    </section>
  )
}
