'use client'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Clock, User, Users, type LucideIcon } from 'lucide-react'

interface Stat {
  icon: LucideIcon
  value: string
  label: string
}

const STATS: Stat[] = [
  { icon: Clock, value: '+10',       label: 'Años de innovación'     },
  { icon: User,  value: '+2000',     label: 'Cirugías exitosas'      },
  { icon: Users, value: '+100.000',  label: 'Pacientes beneficiados' },
]

const LIST_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.96 },
  visible: {
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: 'spring', 
      duration: 0.9, 
      bounce: 0.2,
    },
  },
}

const REDUCED: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
}

export function StatsColumn() {
  const prefersReduced = useReducedMotion()
  const listVars = prefersReduced ? { hidden: {}, visible: {} } : LIST_VARIANTS
  const itemVars = prefersReduced ? REDUCED : ITEM_VARIANTS

  return (
    <motion.div
      variants={listVars}
      initial="hidden"
      animate="visible"
      className="flex flex-col"
    >
      {STATS.map((stat, i) => {
        const Icon = stat.icon
        return (
          <motion.div key={stat.label} variants={itemVars}>
            <div 
              className="flex items-center gap-3 py-3 px-4 rounded-xl border border-white/5 mb-2 transition-all duration-300 hover:bg-white/5"
              style={{ 
                background: 'rgba(10, 58, 96, 0.15)', 
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div className="w-9 h-9 rounded-full border border-cyan-700/40 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-cyan-400" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-black text-white leading-none tabular-nums">{stat.value}</p>
                <p className="text-[10px] tracking-widest uppercase text-gray-400 leading-tight max-w-[110px] mt-1">
                  {stat.label}
                </p>
              </div>
            </div>

          </motion.div>
        )
      })}
    </motion.div>
  )
}
