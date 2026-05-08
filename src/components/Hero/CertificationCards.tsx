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
          role="listitem"
          className="flex items-center gap-3 rounded-xl p-3"
          style={{
            background: '#040e1f',
            border: '1px solid rgba(22,78,99,0.5)',
            borderLeft: '2px solid rgba(34,211,238,0.6)',
          }}
        >
          {/* Seal column */}
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0" style={{ width: 44 }}>
            <img
              src={card.seal}
              style={{
                width: 36,
                height: 36,
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 6px rgba(0,217,255,0.18))',
              }}
            />
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.08em',
                color: '#ffffff',
                fontWeight: 700,
                textAlign: 'center',
                lineHeight: 1.1,
              }}
            >
            </p>
          </div>

          <div
            className="self-stretch flex-shrink-0 w-px"
            style={{ background: 'rgba(22,78,99,0.4)' }}
          />

          <p className="text-[10px] text-gray-400 leading-snug">{card.label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
