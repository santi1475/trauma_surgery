'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, useReducedMotion, AnimatePresence, type Variants } from 'framer-motion'
import { TechBackground } from './TechBackground'
import { AnatomicalHotspots } from './AnatomicalHotspots'
import { SlideText } from './SlideText'
import { StatsColumn } from './StatsColumn'
import { FeatureList } from './FeatureList'
import { AchievementBadges } from './AchievementBadges'
import { CertificationCards } from './CertificationCards'
import { SLIDES } from './slides'

// ── Tokens ────────────────────────────────────────────────────────────────
const HERO_BG = '#020b18'   // Fondo quirúrgico profundo
const ACCENT  = '#00d9ff'   // Cian biotecnológico

// Máscara de fundido — Capa 2 derecha → izquierda (transparente → opaco)
const IMAGE_MASK =
  'linear-gradient(to right, transparent 0%, black 15%, black 100%)'

// ── Variants Framer Motion ────────────────────────────────────────────────
const slideImgVariants: Variants = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.7 } },
  exit:   { opacity: 0, transition: { duration: 0.3 } },
}
const slideImgVariantsReduced: Variants = {
  enter:  { opacity: 1 },
  center: { opacity: 1, transition: { duration: 0 } },
  exit:   { opacity: 1, transition: { duration: 0 } },
}

const sidePanelVariants: Variants = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, x: 16, transition: { duration: 0.25 } },
}
const sidePanelVariantsReduced: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
  exit:    { opacity: 0, transition: { duration: 0 } },
}

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setActiveSlide((p) => (p + 1) % SLIDES.length)
  }, [])

  const prev = useCallback(() => {
    setActiveSlide((p) => (p - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (prefersReduced || isPaused) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [prefersReduced, isPaused, next])

  const slide = SLIDES[activeSlide]

  const renderTextExtra = () => {
    if (slide.id === 'precision') return <FeatureList />
    if (slide.id === 'calidad')   return <AchievementBadges />
    return null
  }

  const renderRightColumn = () => {
    if (slide.id === 'calidad') return <CertificationCards />
    return <StatsColumn />
  }

  const sideVars = prefersReduced ? sidePanelVariantsReduced : sidePanelVariants

  return (
    // ── Capa 0 — Wrapper base ────────────────────────────────────────────
    <section
      aria-label="Hero principal"
      className="relative w-full overflow-hidden min-h-screen pt-20 lg:pt-24"
      style={{ background: HERO_BG }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Live region accesible */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Slide ${activeSlide + 1} de ${SLIDES.length}: ${slide.copy.badge}`}
      </div>

      {/* ── Capa 1 — Background animado (z-0) ─────────────────────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <TechBackground />
      </div>

      {/* ── Capa 2 — Visual / Media SVG (z-10) ────────────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none grid grid-cols-1 lg:grid-cols-2"
        aria-hidden="true"
      >
        {/* Columna izquierda — vacía (reservada para textos de Capa 3) */}
        <div />

        {/* Columna derecha — SVG con máscara de fundido a la izquierda */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            WebkitMaskImage: IMAGE_MASK,
            maskImage: IMAGE_MASK,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={`img-${activeSlide}`}
              src={slide.imageSrc}
              alt={slide.imageLabel}
              variants={prefersReduced ? slideImgVariantsReduced : slideImgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full object-cover object-center select-none"
              draggable={false}
            />
          </AnimatePresence>

          <AnatomicalHotspots isActive={slide.id === 'movimiento'} />
        </div>
      </div>

      {/* ── Capa 3 — Textos y UI interactiva (z-20) ───────────────────── */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Línea vertical decorativa central */}
        <motion.div
          initial={{ scaleY: prefersReduced ? 1 : 0 }}
          animate={{ scaleY: 1 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }
          }
          className="absolute left-1/2 top-0 bottom-0 w-px origin-top hidden lg:block"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(0,217,255,0.2) 30%, rgba(0,217,255,0.35) 60%, transparent)',
          }}
          aria-hidden="true"
        />

        {/* Grid 2 columnas — refleja la Capa 2 */}
        <div className="relative w-full h-full grid grid-cols-1 lg:grid-cols-2 px-6 lg:px-12 xl:px-20">
          {/* Col izquierda — textos del slider sobre área vacía de Capa 2 */}
          <div className="flex items-center pt-8 lg:pt-0">
            <div className="pointer-events-auto w-full max-w-[480px] lg:translate-y-6">
              <AnimatePresence mode="wait">
                <div key={`text-${activeSlide}`}>
                  <SlideText copy={slide.copy} extra={renderTextExtra()} />
                </div>
              </AnimatePresence>
            </div>
          </div>

          {/* Col derecha — panel auxiliar + banderas (flotan sobre la imagen) */}
          <div className="hidden lg:flex flex-col items-end justify-center gap-6">
            <div className="pointer-events-auto w-[230px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`side-${slide.id}`}
                  variants={sideVars}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {renderRightColumn()}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pointer-events-auto flex flex-col gap-2 w-[230px]">
              <span className="text-[9px] tracking-[0.2em] uppercase text-white/80">
                Operamos en
              </span>
              <div className="flex gap-2.5">
                {[
                  { src: '/flags/peru.svg',     alt: 'Perú' },
                  { src: '/flags/bolivia.svg',  alt: 'Bolivia' },
                  { src: '/flags/colombia.svg', alt: 'Colombia' },
                  { src: '/flags/paraguay.svg', alt: 'Paraguay' },
                ].map((flag) => (
                  <div
                    key={flag.src}
                    className="w-5 h-5 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-white/5"
                  >
                    <img
                      src={flag.src}
                      alt={flag.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <motion.div
            animate={prefersReduced ? {} : { scaleY: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10"
            style={{ background: `linear-gradient(to bottom, ${ACCENT}, transparent)` }}
          />
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', fontWeight: 500 }}
          >
            scroll
          </span>
        </motion.div>

        {/* Barra inferior — tag + controles + counter */}
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 items-center px-6 lg:px-12 xl:px-20 pb-4">
          <AnimatePresence mode="wait">
            <motion.span
              key={`tag-${activeSlide}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              {slide.imageTag}
            </motion.span>
          </AnimatePresence>

          {/* Flechas del slider — único punto interactivo además del CTA */}
          <div className="pointer-events-auto flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Slide anterior"
              className="w-7 h-7 rounded-full border border-white/15 text-white/70 text-sm hover:border-cyan-400/60 hover:text-cyan-300 hover:bg-cyan-400/5 transition-colors"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Slide siguiente"
              className="w-7 h-7 rounded-full border border-white/15 text-white/70 text-sm hover:border-cyan-400/60 hover:text-cyan-300 hover:bg-cyan-400/5 transition-colors"
            >
              ›
            </button>
          </div>

          <span
            className="text-right"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            <span style={{ color: 'rgba(34,211,238,0.8)' }}>
              {String(activeSlide + 1).padStart(2, '0')}
            </span>
            {' / '}
            {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>

        {/* Progress bar */}
        {!prefersReduced && (
          <>
            <style>{`
              @keyframes hero-progress {
                from { width: 0%; }
                to   { width: 100%; }
              }
            `}</style>
            <div
              key={`progress-${activeSlide}`}
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-[2px] pointer-events-none"
              style={{
                background: 'linear-gradient(to right, #06b6d4, #67e8f9)',
                animation: 'hero-progress 5000ms linear forwards',
                willChange: 'width',
              }}
            />
          </>
        )}

        {/* Borde inferior decorativo */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(0,217,255,0.25) 50%, transparent 100%)',
          }}
        />
      </div>
    </section>
  )
}
