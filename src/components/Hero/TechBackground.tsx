'use client'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// ── Grid geometry ─────────────────────────────────────────────────────────────

const W = 1920
const H = 1080
const VPX = W * 0.5
const VPY = H * 0.36          // vanishing point: slightly above center
const ARC_CX = W / 2
const ARC_CY = H + 120        // centered below viewport — arcs rise from bottom
const PARALLAX_MAX = 15
const PARTICLE_COUNT = 8

function buildGridLines() {
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = []

  // Converging vertical lines — fan from VP to bottom edge
  for (let i = 0; i <= 11; i++) {
    const x2 = W * (i / 11)
    lines.push({ x1: VPX, y1: VPY, x2, y2: H })
  }

  // Horizontal lines — exponential spacing (more compressed near VP)
  for (const t of [0.25, 0.42, 0.57, 0.70, 0.82, 0.92, 1.0]) {
    const y = VPY + (H - VPY) * t
    const spread = (y - VPY) / (H - VPY)
    lines.push({ x1: VPX - spread * W * 0.52, y1: y, x2: VPX + spread * W * 0.52, y2: y })
  }

  return lines
}

const GRID_LINES = buildGridLines()

// ── Component ─────────────────────────────────────────────────────────────────

export function TechBackground() {
  const prefersReduced = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gridGroupRef = useRef<SVGGElement>(null)
  const rafRef = useRef<number>(0)

  // Canvas particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReduced) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const syncSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    syncSize()
    window.addEventListener('resize', syncSize)

    const ps = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * (canvas.width || 1),
      y: Math.random() * (canvas.height || 1),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.2 + 0.8,
      a: Math.random() * 0.45 + 0.2,
    }))

    const tick = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)
      for (const p of ps) {
        p.x = (p.x + p.vx + width) % width
        p.y = (p.y + p.vy + height) % height
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34,211,238,${p.a})`
        ctx.fill()
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', syncSize)
    }
  }, [prefersReduced])

  // Mouse parallax on grid layer
  useEffect(() => {
    if (prefersReduced) return
    const hero = canvasRef.current?.closest('section')
    if (!hero) return

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5   // -0.5 … 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      if (gridGroupRef.current) {
        gridGroupRef.current.style.transform =
          `translate(${nx * PARALLAX_MAX * 2}px, ${ny * PARALLAX_MAX * 2}px)`
      }
    }

    hero.addEventListener('mousemove', onMove)
    return () => hero.removeEventListener('mousemove', onMove)
  }, [prefersReduced])

  return (
    <>
      <style>{`
        @keyframes tech-arc-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes tech-scanline {
          from { transform: translateY(0); }
          to   { transform: translateY(100vh); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tech-arc, .tech-scanline { animation: none !important; }
        }
      `}</style>

      {/* Perspective grid + radar arcs — single SVG */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Grid lines with parallax */}
        <g
          ref={gridGroupRef}
          stroke="#0a2a4a"
          strokeWidth="1"
          opacity="0.32"
          style={{ transition: 'transform 0.1s ease-out', willChange: 'transform' }}
        >
          {GRID_LINES.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
          ))}
        </g>

        {/* Radar arcs — centered below viewport, slow rotation */}
        {([
          { r: 420, speed: 18, dash: 0.16 },
          { r: 660, speed: 26, dash: 0.11 },
          { r: 930, speed: 36, dash: 0.08 },
        ] as const).map(({ r, speed, dash }, i) => (
          <g
            key={i}
            className="tech-arc"
            style={{
              transformOrigin: `${ARC_CX}px ${ARC_CY}px`,
              animation: `tech-arc-spin ${speed}s linear infinite`,
              willChange: 'transform',
            }}
          >
            <circle
              cx={ARC_CX}
              cy={ARC_CY}
              r={r}
              fill="none"
              stroke="rgba(8,145,178,0.11)"
              strokeWidth="1.5"
              strokeDasharray={`${r * dash} ${r * (1 - dash)}`}
            />
          </g>
        ))}
      </svg>

      {/* Particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />

      {/* Scan line — 1px gradient sweeping top → bottom */}
      <div
        className="tech-scanline absolute inset-x-0 top-0 z-0 pointer-events-none h-px opacity-40"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.3) 50%, transparent 100%)',
          animation: 'tech-scanline 8s linear infinite',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
    </>
  )
}
