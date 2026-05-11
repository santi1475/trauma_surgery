import React, { memo } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { IntroCard } from './IntroCard'
import { ProductZoneCard } from './ProductZoneCard'
import type { ZonaAnatomica } from '@/data/zonasAnatomicas'

interface Props {
  /** Zona activa cuando la cámara está enfocada en una región. */
  zone: ZonaAnatomica | null
}

/**
 * Panel izquierdo unificado — estados mutuamente exclusivos.
 *  - A: IntroCard         (vista libre, sin zona)
 *  - B: ProductZoneCard   (zona seleccionada)
 *
 * AnimatePresence con `mode="wait"` garantiza que el componente saliente
 * desaparezca completamente antes de montar el entrante. Así nunca hay
 * dos tarjetas superpuestas en el mismo slot.
 */
function LeftPanelBase({ zone }: Props) {
  const reduced = useReducedMotion()
  const duration = reduced ? 0 : 0.42

  return (
    <div
      className="absolute top-24 left-6 z-10 hidden lg:block pointer-events-none"
      style={{
        width: 'clamp(320px, 26vw, 400px)',
        maxHeight: 'calc(100vh - 7rem)',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {zone ? (
          <motion.div
            key={`product-${zone.id}`}
            initial={{ opacity: 0, x: -16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -16, filter: 'blur(6px)' }}
            transition={{ duration, ease: [0.22, 0.61, 0.36, 1] }}
            className="pointer-events-auto"
          >
            <ProductZoneCard zone={zone} />
          </motion.div>
        ) : (
          <motion.div
            key="intro"
            initial={{ opacity: 0, x: -16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -16, filter: 'blur(6px)' }}
            transition={{ duration, ease: [0.22, 0.61, 0.36, 1] }}
            className="pointer-events-auto"
          >
            <IntroCard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const LeftPanel = memo(LeftPanelBase)
