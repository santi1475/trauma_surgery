'use client'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Crosshair, ShieldCheck, Activity, Zap, type LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  label: string
}

const FEATURES: Feature[] = [
  { icon: Crosshair,   label: 'Precisión\nQuirúrgica'  },
  { icon: ShieldCheck, label: 'Máxima\nSeguridad'      },
  { icon: Activity,    label: 'Recuperación\nEficiente' },
  { icon: Zap,         label: 'Alto\nRendimiento'      },
]

const LIST_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
}

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.88 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', duration: 0.5, bounce: 0.15 },
  },
}

const LIST_VARIANTS_REDUCED: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
}

const ITEM_VARIANTS_REDUCED: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
}

function FeatureItem({ icon: Icon, label, variants }: Feature & { variants: Variants }) {
  return (
    <motion.div variants={variants} className="flex flex-col items-center gap-2">
      <div className="border border-cyan-800/50 rounded-full p-2 flex items-center justify-center">
        <Icon size={14} color="#22d3ee" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 8,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.42)',
          textAlign: 'center',
          lineHeight: 1.4,
          maxWidth: 64,
          whiteSpace: 'pre-line',
        }}
      >
        {label}
      </span>
    </motion.div>
  )
}

export function FeatureList() {
  const prefersReduced = useReducedMotion()
  const listVars = prefersReduced ? LIST_VARIANTS_REDUCED : LIST_VARIANTS
  const itemVars = prefersReduced ? ITEM_VARIANTS_REDUCED : ITEM_VARIANTS

  return (
    <motion.div
      variants={listVars}
      initial="hidden"
      animate="visible"
      className="flex items-start gap-5 mt-6 mb-4"
      role="list"
      aria-label="Características del producto"
    >
      {FEATURES.map((f) => (
        <div key={f.label} role="listitem">
          <FeatureItem icon={f.icon} label={f.label} variants={itemVars} />
        </div>
      ))}
    </motion.div>
  )
}
