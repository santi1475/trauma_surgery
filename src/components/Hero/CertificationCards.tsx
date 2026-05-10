'use client'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

interface Card {
  id: string
  seal: string
  label: string
}

const CARDS: Card[] = [
  {
    id: 'iso-13485',
    seal: '/IMG/HERO/S_Cert1.svg',
    label: 'Gestión de calidad para dispositivos médicos.',
  },
  {
    id: 'iso-9001',
    seal: '/IMG/HERO/S_Cert2.svg',
    label: 'Sistemas de gestión de calidad certificados.',
  },
  {
    id: 'ce',
    seal: '/IMG/HERO/S_Cert3.svg',
    label: 'Cumplimiento de la normativa Europea.',
  },
]

const LIST_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1, x: 0,
    transition: { type: 'spring', stiffness: 130, damping: 22 },
  },
}

const REDUCED: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
}

export function CertificationCards() {
  const prefersReduced = useReducedMotion()
  const listVars = prefersReduced ? { hidden: {}, visible: {} } : LIST_VARIANTS
  const itemVars = prefersReduced ? REDUCED : ITEM_VARIANTS

  return (
    <motion.div
      variants={listVars}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-3"
      role="list"
      aria-label="Certificaciones"
    >
      {CARDS.map((card) => (
        <motion.div
          key={card.id}
          variants={itemVars}
          whileHover={!prefersReduced ? { scale: 1.01, x: 2 } : {}}
          role="listitem"
          className="flex items-center gap-3.5 rounded-xl p-3.5 shadow-lg cursor-default transition-shadow hover:shadow-[0_0_15px_rgba(0,217,255,0.15)]"
          style={{
            background: 'linear-gradient(135deg, rgba(4,14,31,0.9) 0%, rgba(4,14,31,0.6) 100%)',
            border: '1px solid rgba(34,211,238,0.15)',
            borderLeft: '3px solid rgba(34,211,238,0.7)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Seal column */}
          <div className="flex flex-col items-center justify-center flex-shrink-0" style={{ width: 50 }}>
            <img
              src={card.seal}
              alt="Certificación"
              style={{
                width: 40,
                height: 40,
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 8px rgba(0,217,255,0.25))',
              }}
            />
          </div>

          <div
            className="self-stretch flex-shrink-0 w-px rounded-full"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(34,211,238,0.3), transparent)' }}
          />

          <p className="text-xs text-gray-300 leading-snug font-medium">
            {card.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}
