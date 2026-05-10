'use client'
import { motion, AnimatePresence } from 'framer-motion'

// ── Tipos ─────────────────────────────────────────────────────────────────
export interface HotspotConfig {
  id: string;
  label: string;
  top: string;
  left: string;
  side?: 'left' | 'right' | 'top' | 'bottom'; 
  lineShape?: 'straight' | 'elbow' | 'l-shape';
  lineLength?: number;
  endOffsetY?: number;
  elbowAt?: number;
  dashed?: boolean;
  lineWidth?: number;
  labelGap?: number;
  dotSize?: number;
  delay?: number;
}

// ── Configuración de hotspots ─────────────────────────────────────────────
// Edita esta lista para reposicionar / restilizar cada anotación.
export const HOTSPOTS: HotspotConfig[] = [
  {
    id: 'hombro',
    label: 'HOMBRO',
    top: '28%',    
    left: '32%',   
    side: 'left',  
    lineShape: 'straight',
    lineLength: 80 
  },
  {
    id: 'mano_muneca',
    label: 'MANO Y MUÑECA',
    top: '40%', 
    left: '48%',
    side: 'left',  
    lineShape: 'straight',
    lineLength: 90 
  },
  {
    id: 'tobillo_pie',
    label: 'TOBILLO Y PIE',
    top: '80%',
    left: '35%',
    side: 'left',  
    lineShape: 'straight',
    lineLength: 80
  },
  {
    id: 'rodilla',
    label: 'RODILLA',
    top: '63%',    
    left: '58%',
    side: 'right', 
    lineShape: 'elbow', 
    // Aumentamos endOffsetY para que la caída sea mucho más pronunciada
    endOffsetY: 75,     
    // Quizás también necesites un poco más de largo total para que no se vea apretado
    lineLength: 85,     
    elbowAt: 0.5        
  }
];

// ── Defaults ──────────────────────────────────────────────────────────────
const DEFAULTS = {
  side: 'right' as const,
  lineShape: 'straight' as const,
  lineLength: 56,
  elbowAt: 0.5,
  endOffsetY: 0,
  dashed: false,
  lineWidth: 1,
  labelGap: 8,
  dotSize: 8,
}

const ITEM_TRANSITION = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
const EXIT_TRANSITION = { duration: 0.3, ease: 'easeIn' as const }

// Construye el path SVG según forma elegida
function buildPath(
  shape: NonNullable<HotspotConfig['lineShape']>,
  signedLen: number,
  endY: number,
  elbowAt: number,
): string {
  switch (shape) {
    case 'elbow': {
      const elbowX = signedLen * elbowAt
      return `M 0,0 L ${elbowX},0 L ${signedLen},${endY}`
    }
    case 'l-shape': {
      const elbowX = signedLen * elbowAt
      return `M 0,0 L ${elbowX},0 L ${elbowX},${endY} L ${signedLen},${endY}`
    }
    case 'straight':
    default:
      return `M 0,0 L ${signedLen},${endY}`
  }
}

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
          {isActive && HOTSPOTS.map((spot) => {
            // Resolver overrides con defaults
            const side       = spot.side       ?? DEFAULTS.side
            const lineShape  = spot.lineShape  ?? DEFAULTS.lineShape
            const lineLength = spot.lineLength ?? DEFAULTS.lineLength
            const elbowAt    = spot.elbowAt    ?? DEFAULTS.elbowAt
            const endOffsetY = spot.endOffsetY ?? DEFAULTS.endOffsetY
            const dashed     = spot.dashed     ?? DEFAULTS.dashed
            const lineWidth  = spot.lineWidth  ?? DEFAULTS.lineWidth
            const labelGap   = spot.labelGap   ?? DEFAULTS.labelGap
            const dotSize    = spot.dotSize    ?? DEFAULTS.dotSize

            const sign = side === 'left' ? -1 : 1
            const signedLen = sign * lineLength
            const pathD = buildPath(lineShape, signedLen, endOffsetY, elbowAt)

            // Animación de entrada en dirección opuesta al trazo
            const entranceX = side === 'left' ? 10 : -10

            // Label al extremo de la línea
            const labelLeft = signedLen + (side === 'right' ? labelGap : -labelGap)
            const labelTop  = endOffsetY

            return (
              <motion.div
                key={spot.id}
                className="absolute"
                style={{ top: spot.top, left: spot.left }}
                initial={{ opacity: 0, x: entranceX }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: entranceX, transition: EXIT_TRANSITION }}
                transition={{ ...ITEM_TRANSITION, delay: spot.delay }}
              >
                {/* Dot + pulse ring */}
                <div
                  className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                  style={{ width: dotSize, height: dotSize, top: 0, left: 0 }}
                >
                  <span
                    className="hud-pulse-ring absolute rounded-full bg-cyan-400/50"
                    style={{ width: dotSize, height: dotSize }}
                  />
                  <span
                    className="relative rounded-full bg-cyan-400 z-10"
                    style={{ width: dotSize, height: dotSize }}
                  />
                </div>

                {/* Línea conectora — SVG con overflow visible */}
                <svg
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 1,
                    height: 1,
                    overflow: 'visible',
                    pointerEvents: 'none',
                  }}
                >
                  <path
                    d={pathD}
                    stroke="rgba(34,211,238,0.5)"
                    strokeWidth={lineWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={dashed ? '4 3' : undefined}
                  />
                </svg>

                {/* Label */}
                <span
                  className="font-mono text-[10px] tracking-[0.2em] uppercase whitespace-nowrap absolute"
                  style={{
                    color: 'rgba(103,232,249,0.8)',
                    left: labelLeft,
                    top: labelTop,
                    transform: side === 'left'
                      ? 'translate(-100%, -50%)'
                      : 'translate(0, -50%)',
                  }}
                >
                  {spot.label}
                </span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </>
  )
}
