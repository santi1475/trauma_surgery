'use client'
import type { ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

export type HeadlinePart = { text: string; cyan?: boolean }

export interface SlideCopy {
  badge: string
  headline: HeadlinePart[][]
  sub: string
  accent?: string
}

interface SlideTextProps {
  copy: SlideCopy
  ctaLabel?: string
  ctaHref?: string
  /** Optional content rendered between subtitle and CTA (features, badges, etc.) */
  extra?: ReactNode
}

const TEXT_VARIANTS: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const TEXT_VARIANTS_REDUCED: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

export function SlideText({
  copy,
  ctaLabel = 'CONOCE MÁS',
  ctaHref = '#soluciones',
  extra,
}: SlideTextProps) {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? TEXT_VARIANTS_REDUCED : TEXT_VARIANTS

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit={
        prefersReduced
          ? { opacity: 0, transition: { duration: 0 } }
          : { opacity: 0, y: -10, transition: { duration: 0.3 } }
      }
    >
      {/* Badge */}
      <p
        style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontWeight: 400,
          marginBottom: 18,
        }}
      >
        {copy.badge}
      </p>

      {/* Headline */}
      <h1
        className="font-black uppercase leading-[0.9] tracking-tight text-5xl md:text-6xl lg:text-7xl mb-6"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {copy.headline.map((line, i) => (
          <div key={i} className="block">
            {line.map((part, j) => (
              <span key={j} className={part.cyan ? 'text-cyan-400' : 'text-white'}>
                {part.text}{j < line.length - 1 ? ' ' : ''}
              </span>
            ))}
          </div>
        ))}
      </h1>

      {/* Sub */}
      <p
        style={{
          color: 'rgba(255,255,255,0.55)',
          fontSize: 13,
          lineHeight: 1.7,
          letterSpacing: '0.01em',
          marginBottom: 12,
          maxWidth: 380,
        }}
      >
        {copy.sub}
      </p>

      {/* Slide-specific extra (features, badges) */}
      {extra}

      {/* Accent — optional */}
      {copy.accent && (
        <p
          style={{
            color: '#00d9ff',
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginTop: 4,
            marginBottom: 28,
            fontFamily: 'var(--font-mono)',
          }}
        >
          {copy.accent}
        </p>
      )}

      {/* CTA */}
      <motion.a
        href={ctaHref}
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
        {ctaLabel} →
      </motion.a>
    </motion.div>
  )
}
