'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp, reducedMotion } from '@/animations/variants'

/* ─── Nodos de presencia ────────────────────────────────────── */
interface PresenceNode {
  id: string
  label: string
  /** Posición en % relativo al viewBox del SVG (0-100) */
  x: number
  y: number
}

const NODES: PresenceNode[] = [
  { id: 'peru',      label: 'Perú',      x: 27, y: 62 },
  { id: 'colombia',  label: 'Colombia',  x: 25, y: 52 },
  { id: 'bolivia',   label: 'Bolivia',   x: 30, y: 66 },
  { id: 'uruguay',   label: 'Uruguay',   x: 33, y: 72 },
  { id: 'usa',       label: 'EE.UU.',    x: 20, y: 38 },
  { id: 'europa',    label: 'Europa',    x: 52, y: 34 },
]

/** Arcos de conexión entre nodos (índices en NODES) */
const CONNECTIONS: [number, number][] = [
  [0, 1], // Perú → Colombia
  [0, 2], // Perú → Bolivia
  [0, 3], // Perú → Uruguay
  [0, 4], // Perú → EE.UU.
  [0, 5], // Perú → Europa
  [1, 4], // Colombia → EE.UU.
]

/** Genera un path SVG con curva de Bézier geodésica entre dos puntos */
function arcPath(x1: number, y1: number, x2: number, y2: number): string {
  const midX = (x1 + x2) / 2
  // Elevar el punto de control para un arco elegante
  const midY = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.25
  return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`
}

/* ─── Dotted World Map SVG (simplified continents) ──────────── */
function DottedWorldMap() {
  // Mapa punteado simplificado — continentes en dots ~2px
  // Coordenadas en viewBox 0 0 200 100
  const dotRows: { y: number; ranges: [number, number][] }[] = [
    // América del Norte
    { y: 24, ranges: [[14, 24]] },
    { y: 26, ranges: [[12, 28]] },
    { y: 28, ranges: [[10, 30]] },
    { y: 30, ranges: [[10, 30]] },
    { y: 32, ranges: [[12, 30]] },
    { y: 34, ranges: [[14, 28]] },
    { y: 36, ranges: [[14, 26]] },
    { y: 38, ranges: [[16, 24]] },
    { y: 40, ranges: [[18, 24]] },
    { y: 42, ranges: [[20, 24]] },
    // Centroamérica
    { y: 44, ranges: [[22, 26]] },
    { y: 46, ranges: [[22, 26]] },
    { y: 48, ranges: [[24, 28]] },
    // Sudamérica
    { y: 50, ranges: [[24, 34]] },
    { y: 52, ranges: [[24, 36]] },
    { y: 54, ranges: [[24, 36]] },
    { y: 56, ranges: [[24, 36]] },
    { y: 58, ranges: [[26, 38]] },
    { y: 60, ranges: [[26, 38]] },
    { y: 62, ranges: [[26, 36]] },
    { y: 64, ranges: [[28, 36]] },
    { y: 66, ranges: [[28, 36]] },
    { y: 68, ranges: [[30, 36]] },
    { y: 70, ranges: [[30, 36]] },
    { y: 72, ranges: [[32, 36]] },
    { y: 74, ranges: [[32, 34]] },
    // Europa
    { y: 26, ranges: [[46, 56]] },
    { y: 28, ranges: [[44, 58]] },
    { y: 30, ranges: [[44, 60]] },
    { y: 32, ranges: [[44, 60]] },
    { y: 34, ranges: [[46, 58]] },
    { y: 36, ranges: [[46, 56]] },
    { y: 38, ranges: [[48, 56]] },
    // África
    { y: 40, ranges: [[46, 56]] },
    { y: 42, ranges: [[44, 58]] },
    { y: 44, ranges: [[44, 60]] },
    { y: 46, ranges: [[44, 60]] },
    { y: 48, ranges: [[44, 60]] },
    { y: 50, ranges: [[46, 58]] },
    { y: 52, ranges: [[46, 58]] },
    { y: 54, ranges: [[48, 56]] },
    { y: 56, ranges: [[48, 56]] },
    { y: 58, ranges: [[48, 56]] },
    { y: 60, ranges: [[50, 56]] },
    { y: 62, ranges: [[50, 56]] },
    { y: 64, ranges: [[50, 54]] },
    // Asia
    { y: 22, ranges: [[62, 68], [72, 82]] },
    { y: 24, ranges: [[60, 70], [72, 86]] },
    { y: 26, ranges: [[58, 70], [72, 88]] },
    { y: 28, ranges: [[60, 70], [72, 90]] },
    { y: 30, ranges: [[62, 68], [72, 90]] },
    { y: 32, ranges: [[62, 68], [72, 88]] },
    { y: 34, ranges: [[62, 68], [72, 86]] },
    { y: 36, ranges: [[62, 68], [74, 86]] },
    { y: 38, ranges: [[64, 68], [76, 84]] },
    { y: 40, ranges: [[64, 70], [78, 84]] },
    { y: 42, ranges: [[66, 72]] },
    { y: 44, ranges: [[68, 74]] },
    // Oceanía
    { y: 64, ranges: [[78, 88]] },
    { y: 66, ranges: [[78, 90]] },
    { y: 68, ranges: [[80, 90]] },
    { y: 70, ranges: [[80, 88]] },
    { y: 72, ranges: [[82, 88]] },
  ]

  const dots: React.ReactElement[] = []
  const dotSpacing = 2
  let key = 0

  dotRows.forEach((row) => {
    row.ranges.forEach(([start, end]) => {
      for (let x = start; x <= end; x += dotSpacing) {
        dots.push(
          <circle
            key={key++}
            cx={x}
            cy={row.y}
            r={0.5}
            fill="rgba(0,168,204,0.18)"
          />
        )
      }
    })
  })

  return <>{dots}</>
}

/* ─── Componente Nodo con pulso ─────────────────────────────── */
function PulsingNode({
  node,
  delay,
  prefersReduced,
}: {
  node: PresenceNode
  delay: number
  prefersReduced: boolean | null
}) {
  return (
    <g>
      {/* Anillo de pulso exterior */}
      {!prefersReduced && (
        <circle
          cx={node.x}
          cy={node.y}
          r={2.5}
          fill="none"
          stroke="rgba(0,217,255,0.35)"
          strokeWidth={0.3}
        >
          <animate
            attributeName="r"
            values="1.5;4;1.5"
            dur="3s"
            begin={`${delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.5;0;0.5"
            dur="3s"
            begin={`${delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      )}
      {/* Segundo anillo de pulso (desfasado) */}
      {!prefersReduced && (
        <circle
          cx={node.x}
          cy={node.y}
          r={1.8}
          fill="none"
          stroke="rgba(0,217,255,0.2)"
          strokeWidth={0.2}
        >
          <animate
            attributeName="r"
            values="1.2;3.5;1.2"
            dur="3s"
            begin={`${delay + 1.5}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.4;0;0.4"
            dur="3s"
            begin={`${delay + 1.5}s`}
            repeatCount="indefinite"
          />
        </circle>
      )}
      {/* Glow halo */}
      <circle
        cx={node.x}
        cy={node.y}
        r={2}
        fill="rgba(0,217,255,0.08)"
      />
      {/* Punto central */}
      <circle
        cx={node.x}
        cy={node.y}
        r={1}
        fill="#00d9ff"
      >
        {!prefersReduced && (
          <animate
            attributeName="opacity"
            values="1;0.6;1"
            dur="2.5s"
            begin={`${delay * 0.5}s`}
            repeatCount="indefinite"
          />
        )}
      </circle>
      {/* Label */}
      <text
        x={node.x}
        y={node.y - 3}
        textAnchor="middle"
        style={{
          fontSize: 2,
          fontFamily: 'var(--font-mono)',
          fill: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.08em',
        }}
      >
        {node.label}
      </text>
    </g>
  )
}

/* ─── Componente Principal ──────────────────────────────────── */
export default function GlobalPresence({
  onOpenMap,
}: {
  onOpenMap?: () => void
}) {
  const prefersReduced = useReducedMotion()
  const containerVariants = prefersReduced ? reducedMotion : staggerContainer
  const itemVariants = prefersReduced ? reducedMotion : fadeInUp

  return (
    <section
      id="presencia-global"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#020d1a' }}
      aria-label="Presencia Global"
    >
      {/* Glow superior izquierdo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: 0,
          top: 0,
          width: '40%',
          height: '80%',
          background:
            'radial-gradient(ellipse at top left, rgba(0,82,163,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Número de sección decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          right: '-0.05em',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(120px, 18vw, 220px)',
          fontWeight: 800,
          color: 'rgba(0,168,204,0.022)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          userSelect: 'none',
        }}
      >
        05
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 py-20 lg:py-28">
        {/* ── BANNER CARD ──────────────────────────────────── */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            backgroundColor: 'rgba(4,18,36,0.85)',
            border: '1px solid rgba(0,168,204,0.12)',
            boxShadow:
              '0 24px 60px rgba(0,0,0,0.35), 0 0 40px rgba(0,100,180,0.05)',
            minHeight: 340,
          }}
        >
          {/* Inner glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 30% 50%, rgba(0,82,163,0.08) 0%, transparent 60%)',
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row min-h-[340px] lg:min-h-[380px]">
            {/* ── IZQUIERDA: Texto ──────────────────────────── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="w-full lg:w-[35%] flex flex-col justify-center px-8 py-10 lg:px-12 lg:py-14"
            >
              {/* Badge */}
              <motion.span
                variants={itemVariants}
                className="inline-block w-fit mb-6"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  background: 'rgba(0,168,204,0.08)',
                  border: '1px solid rgba(0,168,204,0.22)',
                  padding: '4px 12px',
                  borderRadius: 4,
                }}
              >
                Alcance internacional
              </motion.span>

              {/* Título */}
              <motion.h2
                variants={itemVariants}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(26px, 3.5vw, 46px)',
                  fontWeight: 800,
                  lineHeight: 1.06,
                  letterSpacing: '-0.01em',
                  color: '#ffffff',
                  marginBottom: 20,
                }}
              >
                PRESENCIA
                <br />
                <span style={{ color: '#00d9ff' }}>GLOBAL</span>
              </motion.h2>

              {/* Párrafo */}
              <motion.p
                variants={itemVariants}
                style={{
                  color: 'rgba(255,255,255,0.48)',
                  fontSize: 'clamp(12px, 1.1vw, 14px)',
                  lineHeight: 1.75,
                  maxWidth: 340,
                  marginBottom: 28,
                }}
              >
                Llevamos nuestra tecnología a cirujanos ortopédicos en Perú,
                Bolivia, Colombia y Uruguay, con soporte técnico y logístico en
                cada punto de operación.
              </motion.p>

              {/* Países */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-2 mb-8"
              >
                {['🇵🇪 Perú', '🇧🇴 Bolivia', '🇨🇴 Colombia', '🇺🇾 Uruguay'].map(
                  (country) => (
                    <span
                      key={country}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        color: 'rgba(255,255,255,0.5)',
                        background: 'rgba(0,217,255,0.05)',
                        border: '1px solid rgba(0,217,255,0.12)',
                        padding: '4px 10px',
                        borderRadius: 4,
                        letterSpacing: '0.06em',
                      }}
                    >
                      {country}
                    </span>
                  )
                )}
              </motion.div>

              {/* Botón VER MAPA */}
              <motion.button
                variants={itemVariants}
                onClick={onOpenMap}
                className="group inline-flex items-center gap-3 w-fit cursor-pointer"
                style={{
                  border: '1.5px solid rgba(0,217,255,0.45)',
                  background: 'transparent',
                  color: '#00d9ff',
                  fontSize: 11,
                  letterSpacing: '0.13em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  padding: '11px 24px',
                  borderRadius: 6,
                  transition: 'all 0.28s ease',
                  fontFamily: 'var(--font-mono)',
                }}
                whileHover={{
                  backgroundColor: 'rgba(0,217,255,0.10)',
                  boxShadow: '0 0 24px rgba(0,217,255,0.18)',
                }}
                whileTap={{ scale: 0.97 }}
              >
                Ver mapa
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M4 8h8M9 5l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </motion.div>

            {/* ── DERECHA: Mapa SVG ─────────────────────────── */}
            <motion.div
              className="w-full lg:w-[65%] relative flex items-center justify-center px-4 py-8 lg:p-8"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Glow focal detrás del mapa */}
              <div
                aria-hidden="true"
                className="absolute pointer-events-none"
                style={{
                  left: '30%',
                  top: '40%',
                  width: '50%',
                  height: '60%',
                  transform: 'translate(-50%, -50%)',
                  background:
                    'radial-gradient(ellipse, rgba(0,120,200,0.12) 0%, transparent 65%)',
                }}
              />

              <svg
                viewBox="0 0 100 100"
                className="w-full h-full max-h-[360px]"
                style={{ overflow: 'visible' }}
                aria-label="Mapa mundial con presencia de TraumaSurgery"
                role="img"
              >
                <defs>
                  {/* Gradiente para los arcos */}
                  <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#00d9ff" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#00d9ff" stopOpacity="0.5" />
                  </linearGradient>

                  {/* Glow filter para nodos */}
                  <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Dots del mapa mundial */}
                <DottedWorldMap />

                {/* Arcos de conexión */}
                {CONNECTIONS.map(([from, to], i) => {
                  const a = NODES[from]
                  const b = NODES[to]
                  return (
                    <path
                      key={`arc-${i}`}
                      d={arcPath(a.x, a.y, b.x, b.y)}
                      fill="none"
                      stroke="url(#arcGrad)"
                      strokeWidth={0.35}
                      strokeDasharray="1.5 0.8"
                      opacity={0.7}
                    >
                      {!prefersReduced && (
                        <animate
                          attributeName="stroke-dashoffset"
                          values="0;4.6"
                          dur={`${3 + i * 0.5}s`}
                          repeatCount="indefinite"
                        />
                      )}
                    </path>
                  )
                })}

                {/* Nodos con pulso */}
                <g filter="url(#nodeGlow)">
                  {NODES.map((node, i) => (
                    <PulsingNode
                      key={node.id}
                      node={node}
                      delay={i * 0.5}
                      prefersReduced={prefersReduced}
                    />
                  ))}
                </g>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Línea decorativa inferior */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,168,204,0.22), transparent)',
        }}
      />
    </section>
  )
}
