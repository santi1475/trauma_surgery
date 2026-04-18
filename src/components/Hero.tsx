'use client'
import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp, fadeIn, reducedMotion } from '@/animations/variants'
import { FloatingParticles } from './Particles'

// Lazy load del orbe 3D — no bloquea el LCP
const SurgicalOrb = lazy(() => import('./3d/SurgicalOrb'))

// Fallback mientras carga WebGL
function OrbSkeleton() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      aria-hidden="true"
    >
      <div
        className="w-64 h-64 rounded-full border opacity-10 animate-pulse"
        style={{ borderColor: 'var(--color-accent)', borderWidth: '2px' }}
      />
    </div>
  )
}

export default function Hero() {
  const prefersReduced = useReducedMotion()

  // Elegir variantes según preferencia de movimiento
  const containerVariants = prefersReduced ? reducedMotion : staggerContainer
  const itemVariants = prefersReduced ? reducedMotion : fadeInUp
  const bgVariants = prefersReduced ? reducedMotion : fadeIn

  return (

    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#FFFFFF' }}
      aria-labelledby="hero-heading"
    >

      {/* Gradiente de fondo — refuerza profundidad sin distraer */}
      <motion.div
        variants={bgVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 75% 50%, rgba(0,168,204,0.06) 0%, transparent 70%)',
        }}
      />
      <FloatingParticles count={75} />

      {/* Línea decorativa vertical */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 bottom-0 w-px origin-top hidden lg:block"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(10,58,96,0.2) 30%, rgba(0,168,204,0.3) 60%, transparent)',
          marginLeft: '10%',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-6rem)]">

          {/* Columna izquierda — contenido textual */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center max-w-xl"
          >
            {/* Eyebrow — indicador de categoría */}
            <motion.p
              variants={itemVariants}
              className="text-xs font-mono tracking-widest uppercase mb-6"
              style={{
                color: 'var(--color-accent)',
                fontWeight: 500,
                letterSpacing: '0.15em',
              }}
            >
              Dispositivos Médicos de Alta Precisión
            </motion.p>

            {/* Titular principal */}
            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="leading-tight mb-5"
              style={{
                fontWeight: 700,
                color: 'var(--color-primary)',
                fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Soluciones en{' '}
              <span
                style={{
                  color: 'var(--color-accent)',
                  fontWeight: 700,
                  display: 'inline-block',
                }}
              >
                Osteosíntesis
              </span>{' '}
              y Reemplazo Articular
            </motion.h1>

            {/* Subtítulo — promesa de valor */}
            <motion.p
              variants={itemVariants}
              className="mb-5 leading-relaxed"
              style={{
                fontWeight: 500,
                color: 'var(--color-accent)',
                fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                lineHeight: 1.55,
              }}
            >
              Tecnología de vanguardia para cirujanos, hospitales y clínicas
              especializadas.
            </motion.p>

            {/* Cuerpo de texto */}
            <motion.p
              variants={itemVariants}
              className="mb-9 leading-relaxed"
              style={{
                fontWeight: 400,
                color: 'var(--color-text)',
                fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
                lineHeight: 1.7,
                maxWidth: '46ch',
              }}
            >
              TraumaSurgery EIRL respaldo a especialistas en Perú, Bolivia y
              Colombia con implantes y sistemas de fijación con certificación
              internacional — precisión quirúrgica en cada solución.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 mb-10"
            >
              {/* CTA primario */}
              <a
                href="#soluciones"
                className="inline-flex items-center gap-2 text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  padding: '12px 28px',
                  borderRadius: '7px',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                }}
              >
                Ver soluciones
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="2" y1="7" x2="12" y2="7" />
                  <polyline points="8,3 12,7 8,11" />
                </svg>
              </a>

              {/* CTA secundario */}
              <a
                href="#contacto"
                className="inline-flex items-center text-sm transition-all duration-200 hover:opacity-80 active:scale-95"
                style={{
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  padding: '12px 28px',
                  borderRadius: '7px',
                  textDecoration: 'none',
                  border: '1.5px solid var(--color-primary)',
                  letterSpacing: '0.01em',
                }}
              >
                Contactar ahora
              </a>
            </motion.div>

            {/* Indicadores de presencia regional */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <span
                className="text-xs uppercase tracking-widest"
                style={{ color: 'var(--color-text)', opacity: 0.6, fontWeight: 500 }}
              >
                Operamos en
              </span>
              {[
                { flag: '/peru.png', name: 'Perú' },
                { flag: '/bolivia.png', name: 'Bolivia' },
                { flag: '/colombia.png', name: 'Colombia' },
              ].map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2"
                >
                  <img
                    src={c.flag}
                    alt={c.name}
                    className="w-5 h-5 rounded-full object-cover border border-gray-100 shadow-sm"
                  />
                  <span
                    className="text-xs"
                    style={{ color: 'var(--color-text)', fontWeight: 500 }}
                  >
                    {c.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Columna derecha — elemento 3D */}
          <motion.div
            variants={bgVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="relative hidden lg:flex items-center justify-center"
            style={{ height: 'clamp(400px, 55vw, 600px)' }}
            aria-hidden="true"
          >
            {/* Halo de fondo para el orbe */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,168,204,0.08) 0%, transparent 70%)',
              }}
            />
            <Suspense fallback={<OrbSkeleton />}>
              <SurgicalOrb />
            </Suspense>
          </motion.div>

        </div>
      </div>

      {/* Indicador scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: 'var(--color-text)', opacity: 0.4, fontSize: '10px', fontWeight: 500 }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
