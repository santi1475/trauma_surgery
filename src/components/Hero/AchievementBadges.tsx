'use client'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Award, Link2, BadgeCheck, ShieldCheck, type LucideIcon } from 'lucide-react'

interface Badge {
  icon: LucideIcon
  label: string
}

const BADGES: Badge[] = [
  { icon: Award,       label: 'Certificado\nInternacional' },
  { icon: Link2,       label: 'Trazabilidad\nGarantizada'  },
  { icon: BadgeCheck,  label: 'Cumplimiento\nNormativo'    },
  { icon: ShieldCheck, label: 'Confianza\nRegulatoria'     },
]

const LIST_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
}

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', duration: 0.5, bounce: 0.15 },
  },
}

const REDUCED: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
}

function BadgeItem({ icon: Icon, label, variants }: Badge & { variants: Variants }) {
  return (
    <motion.div variants={variants} className="flex flex-col items-center gap-2">
      <div
        className="rounded-md flex items-center justify-center"
        style={{
          width: 36,
          height: 36,
          background: 'rgba(4,14,31,0.6)',
          border: '1px solid rgba(34,211,238,0.25)',
          boxShadow: 'inset 0 0 8px rgba(0,217,255,0.08)',
        }}
      >
        <Icon size={16} color="#22d3ee" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 8,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
          textAlign: 'center',
          lineHeight: 1.4,
          maxWidth: 72,
          whiteSpace: 'pre-line',
        }}
      >
        {label}
      </span>
    </motion.div>
  )
}

export function AchievementBadges() {
  const prefersReduced = useReducedMotion()
  const listVars = prefersReduced ? { hidden: {}, visible: {} } : LIST_VARIANTS
  const itemVars = prefersReduced ? REDUCED : ITEM_VARIANTS

  return (
    <motion.div
      variants={listVars}
      initial="hidden"
      animate="visible"
      className="flex items-start gap-5 mt-6 mb-4"
      role="list"
      aria-label="Garantías de certificación"
    >
      {BADGES.map((b) => (
        <div key={b.label} role="listitem">
          <BadgeItem icon={b.icon} label={b.label} variants={itemVars} />
        </div>
      ))}
    </motion.div>
  )
}
