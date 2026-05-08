'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, useReducedMotion, AnimatePresence, type Variants } from 'framer-motion'
import { TechBackground } from './TechBackground'
import { AnatomicalHotspots } from './AnatomicalHotspots'
import { SlideText } from './SlideText'
import { SlideImage } from './SlideImage'
import { StatsColumn } from './StatsColumn'
import { FeatureList } from './FeatureList'
import { AchievementBadges } from './AchievementBadges'
import { CertificationCards } from './CertificationCards'
import { SLIDES } from './slides'

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

  useEffect(() => {
    if (prefersReduced || isPaused) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [prefersReduced, isPaused, next])

  const slide = SLIDES[activeSlide]

  // Slide-specific extra inside text column (between sub and CTA)
  const renderTextExtra = () => {
    if (slide.id === 'precision') return <FeatureList />
    if (slide.id === 'calidad')   return <AchievementBadges />
    return null
  }

  // Slide-specific right column content
  const renderRightColumn = () => {
    if (slide.id === 'calidad') return <CertificationCards />
    return <StatsColumn />
  }

  const sideVars = prefersReduced ? sidePanelVariantsReduced : sidePanelVariants

  return (
    <section
      aria-label="Hero principal"
      className="relative min-h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        background: '#020b18',
      }}
    >
      {/* WCAG live region for slide changes */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Slide ${activeSlide + 1} de ${SLIDES.length}: ${slide.copy.badge}`}
      </div>

      <TechBackground />

      {/* Vertical accent line */}
      <motion.div
        initial={{ scaleY: prefersReduced ? 1 : 0 }}
        animate={{ scaleY: 1 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 bottom-0 w-px origin-top hidden lg:block"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(0,217,255,0.2) 30%, rgba(0,217,255,0.35) 60%, transparent)',
          marginLeft: '50%',
        }}
        aria-hidden="true"
      />

      {/* ── 3-column layout ──────────────────────────────────────────────── */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 xl:px-20 pt-24 lg:pt-0 pointer-events-none">

        {/* LEFT: text */}
        <div className="relative z-20 order-1 w-full lg:w-[40%] xl:w-[36%] pointer-events-auto mt-8 lg:mt-0 lg:translate-y-10">
          <AnimatePresence mode="wait">
            <div key={`text-${activeSlide}`}>
              <SlideText copy={slide.copy} extra={renderTextExtra()} />
            </div>
          </AnimatePresence>
        </div>

        {/* CENTER: image */}
        <div className="
          order-2 relative w-full h-[50vh] z-10 pointer-events-none
          lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:h-auto lg:w-[62%]
        ">
          <div className="relative w-full h-full overflow-hidden pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${activeSlide}`}
                variants={prefersReduced ? slideImgVariantsReduced : slideImgVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <SlideImage src={slide.imageSrc} label={slide.imageLabel} />
              </motion.div>
            </AnimatePresence>

            <AnatomicalHotspots isActive={slide.id === 'movimiento'} />
          </div>
        </div>

        {/* RIGHT: per-slide panel — Stats or CertificationCards */}
        <div className="relative z-20 order-3 lg:order-2 flex flex-col gap-6 w-full lg:w-[230px] pointer-events-auto mt-12 lg:mt-0 pb-16 lg:pb-0 px-4">
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

          <div className="flex flex-col gap-2">
            <span className="text-[9px] tracking-[0.2em] uppercase text-white/80">Operamos en</span>
            <div className="flex gap-2.5">
              {[
                { src: '/flags/peru.png', alt: 'Perú' },
                { src: '/flags/bolivia.png', alt: 'Bolivia' },
                { src: '/flags/colombia.png', alt: 'Colombia' },
                { src: '/flags/paraguay.png', alt: 'Paraguay' },
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        aria-hidden="true"
      >
        <motion.div
          animate={prefersReduced ? {} : { scaleY: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, #00d9ff, transparent)' }}
        />
        <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', fontWeight: 500 }}>
          scroll
        </span>
      </motion.div>

      {/* Bottom bar — slide tag + counter */}
      <div
        aria-hidden="true"
        className="absolute z-30 bottom-0 left-0 right-0 grid grid-cols-3 items-center px-6 lg:px-12 xl:px-20 pb-4"
      >
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

        <span
          className="text-center"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.2)' }}
        >
          ·
        </span>

        <span
          className="text-right"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.14em',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          <span style={{ color: 'rgba(34,211,238,0.8)' }}>{String(activeSlide + 1).padStart(2, '0')}</span>
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
            className="absolute bottom-0 left-0 z-40 h-[2px] pointer-events-none"
            style={{
              background: 'linear-gradient(to right, #06b6d4, #67e8f9)',
              animation: 'hero-progress 5000ms linear forwards',
              willChange: 'width',
            }}
          />
        </>
      )}

      {/* Decorative bottom edge */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px z-20"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,217,255,0.25) 50%, transparent 100%)' }}
      />
    </section>
  )
}
