'use client'
import { motion, AnimatePresence } from 'framer-motion'

interface Hotspot {
  id: string
  label: string
  top: string
  left: string
  delay: number
}

const HOTSPOTS: Hotspot[] = [
  { id: 'hombro',  label: 'HOMBRO',       top: '22%', left: '30%', delay: 0.60 },
  { id: 'rodilla', label: 'RODILLA',       top: '72%', left: '60%', delay: 0.75 },
  { id: 'mano',    label: 'MANO Y MUÑECA', top: '41%', left: '29%', delay: 0.90 },
  { id: 'tobillo', label: 'TOBILLO Y PIE', top: '78%', left: '40%', delay: 1.05 },
]

const ITEM_TRANSITION = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
const EXIT_TRANSITION = { duration: 0.3, ease: 'easeIn' as const }

export function AnatomicalHotspots({ isActive }: { isActive: boolean }) {
  return (
    <>
      <style>{`
        @keyframes hud-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0;   }
        }
        .hud-pulse-ring {
          animation: hud-pulse 2s ease-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hud-pulse-ring { animation: none; }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <AnimatePresence>
          {isActive && HOTSPOTS.map((spot) => (
            <motion.div
              key={spot.id}
              className="absolute flex items-center gap-2"
              style={{ top: spot.top, left: spot.left }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10, transition: EXIT_TRANSITION }}
              transition={{ ...ITEM_TRANSITION, delay: spot.delay }}
            >
              {/* Dot + pulse ring */}
              <div className="relative flex items-center justify-center w-2 h-2 flex-shrink-0">
                <span className="hud-pulse-ring absolute w-2 h-2 rounded-full bg-cyan-400/50" />
                <span className="relative w-2 h-2 rounded-full bg-cyan-400 z-10" />
              </div>

              {/* Connector line */}
              <div className="w-12 h-px bg-cyan-400/40 flex-shrink-0" />

              {/* Label */}
              <span
                className="font-mono text-[10px] tracking-[0.2em] uppercase whitespace-nowrap"
                style={{ color: 'rgba(103,232,249,0.8)' }}
              >
                {spot.label}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}
