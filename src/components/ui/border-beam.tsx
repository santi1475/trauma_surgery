'use client'
import { motion } from 'framer-motion'

interface BorderBeamProps {
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  reverse?: boolean
  initialOffset?: number
  borderWidth?: number
}

export function BorderBeam({
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = '#00A8CC',
  colorTo = 'transparent',
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
}: BorderBeamProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        border: `${borderWidth}px solid transparent`,
        maskImage:
          'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
        WebkitMaskImage:
          'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
        maskClip: 'padding-box, border-box',
        WebkitMaskClip: 'padding-box, border-box',
        maskComposite: 'exclude',
        WebkitMaskComposite: 'destination-out',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        style={
          {
            position: 'absolute',
            width: size,
            height: size,
            background: `linear-gradient(to left, ${colorFrom}, ${colorTo})`,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          } as React.CSSProperties
        }
        initial={{ offsetDistance: `${initialOffset}%` } as React.CSSProperties}
        animate={
          {
            offsetDistance: reverse
              ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
              : [`${initialOffset}%`, `${100 + initialOffset}%`],
          } as any
        }
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration,
          delay: -delay,
        }}
      />
    </div>
  )
}
