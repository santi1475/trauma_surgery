import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { HOTSPOTS, type HotspotData } from '@/data/hotspots'

interface AnatomicHotspotsProps {
  hoveredZone: string | null
  selectedZone: string | null
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
}

interface HotspotProps {
  hotspot: HotspotData
  index: number
  isHovered: boolean
  isSelected: boolean
  dimmed: boolean
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
}

// ── Defaults ─────────────────────────────────────────────────────────────
const DEFAULT_CIRCLE_R = 29           // radio del círculo ícono (px)
const DEFAULT_ICON_SIZE = 22          // tamaño del emoji/ícono (px)
const DEFAULT_LINE_WIDTH = 0.7        // grosor base de la línea
const DEFAULT_TEXT_GAP = 10           // gap círculo → texto (px)
const DEFAULT_TEXT_VOFFSET = -22      // offset vertical del bloque de texto
const DEFAULT_ELBOW_AT = 0.5          // codo al 50% del eje X

// ── Helper: construye el path SVG de la línea conectora ─────────────────
function buildPathD(
  shape: NonNullable<HotspotData['lineShape']>,
  ox: number,
  oy: number,
  circleR: number,
  elbowAt: number,
): string {
  const goingRight = ox > 0
  const endX = goingRight ? ox - circleR : ox + circleR

  switch (shape) {
    case 'straight': {
      // Recta directa hasta el borde del círculo (en dirección al centro)
      const dx = ox
      const dy = oy
      const len = Math.hypot(dx, dy) || 1
      const ex = ox - (dx / len) * circleR
      const ey = oy - (dy / len) * circleR
      return `M 0,0 L ${ex},${ey}`
    }
    case 'l-shape': {
      // Horizontal hasta elbowX, luego vertical hasta y, luego al borde
      const elbowX = ox * elbowAt
      return `M 0,0 L ${elbowX},0 L ${elbowX},${oy} L ${endX},${oy}`
    }
    case 'elbow':
    default: {
      // Horizontal → diagonal al borde del círculo (comportamiento original)
      const elbowX = ox * elbowAt
      return `M 0,0 L ${elbowX},0 L ${endX},${oy}`
    }
  }
}

function Hotspot({ hotspot, index, isHovered, isSelected, dimmed, onHover, onSelect }: HotspotProps) {
  const ringRef = useRef<THREE.Mesh>(null)
  const pingRef = useRef<THREE.Mesh>(null)
  const pingMatRef = useRef<THREE.MeshBasicMaterial>(null)

  // Resolver overrides con defaults
  const circleR    = hotspot.circleRadius     ?? DEFAULT_CIRCLE_R
  const circleD    = circleR * 2
  const iconSize   = hotspot.iconSize         ?? DEFAULT_ICON_SIZE
  const lineWidth  = hotspot.lineWidth        ?? DEFAULT_LINE_WIDTH
  const dashed     = hotspot.dashed           ?? true
  const textGap    = hotspot.textGap          ?? DEFAULT_TEXT_GAP
  const textVOff   = hotspot.textVerticalOffset ?? DEFAULT_TEXT_VOFFSET
  const textMaxW   = hotspot.textMaxWidth
  const elbowAt    = hotspot.elbowAt          ?? DEFAULT_ELBOW_AT
  const lineShape  = hotspot.lineShape        ?? 'elbow'

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const phase = index * ((Math.PI * 2) / HOTSPOTS.length)

    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.25 + Math.sin(t * 2.5 + phase) * 0.2
    }

    const pingCycle = (t * 0.38 + phase * 0.15) % 1
    if (pingRef.current) pingRef.current.scale.setScalar(1 + pingCycle * 2.2)
    if (pingMatRef.current) {
      pingMatRef.current.opacity = Math.max(0, (1 - pingCycle * 1.5) * 0.55)
    }
  })

  const [ox, oy] = hotspot.labelOffset
  const color = isSelected ? '#D4AF37' : '#00d9ff'
  const borderColor = isSelected ? 'rgba(212,175,55,0.75)' : 'rgba(0,217,255,0.65)'
  const glowColor  = isSelected ? 'rgba(212,175,55,0.4)'  : 'rgba(0,217,255,0.32)'
  const emissiveIntensity = isSelected ? 2.8 : isHovered ? 4.2 : 2.2

  // Path de la línea según forma elegida
  const pathD = buildPathD(lineShape, ox, oy, circleR, elbowAt)

  // Posiciones absolutas del círculo
  const circleLeft = ox - circleR
  const circleTop  = oy - circleR

  // Bloque de texto: anclado al lado del círculo según `side`
  const textStyle: React.CSSProperties = hotspot.side === 'right'
    ? {
        position: 'absolute',
        left: ox + circleR + textGap,
        top: oy + textVOff,
        textAlign: 'left',
      }
    : {
        position: 'absolute',
        left: ox - circleR - textGap,
        top: oy + textVOff,
        textAlign: 'right',
        transform: 'translateX(-100%)',
      }

  const whiteSpaceMode: React.CSSProperties['whiteSpace'] =
    textMaxW != null ? 'normal' : 'nowrap'

  return (
    <group position={hotspot.position}>

      {/* ── Esfera central 3D ── */}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); onHover(hotspot.id) }}
        onPointerOut={() => onHover(null)}
        onClick={(e) => { e.stopPropagation(); onSelect(hotspot.id) }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <sphereGeometry args={[0.024, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={emissiveIntensity} toneMapped={false} />
      </mesh>

      {/* Ring pulsante */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.030, 0.040, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} toneMapped={false} depthWrite={false} />
      </mesh>

      {/* Ring ping */}
      <mesh ref={pingRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.036, 0.045, 32]} />
        <meshBasicMaterial ref={pingMatRef} color={color} transparent opacity={0.5} side={THREE.DoubleSide} toneMapped={false} depthWrite={false} />
      </mesh>

      {/* ── Label HTML ── */}
      <Html center={false} occlude={false}>
        <div
          onClick={(e) => { e.stopPropagation(); onSelect(hotspot.id) }}
          onPointerOver={(e) => { e.stopPropagation(); onHover(hotspot.id) }}
          onPointerOut={() => onHover(null)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            cursor: 'pointer',
            userSelect: 'none',
            opacity: dimmed ? 0.15 : 1,
            transition: 'opacity 0.4s ease',
          }}
        >
          {/* Conector SVG */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              overflow: 'visible',
              width: 1,
              height: 1,
              pointerEvents: 'none',
            }}
          >
            {/* Punto de origen en el hotspot */}
            <circle cx="0" cy="0" r="2.5" fill={color} fillOpacity={isHovered || isSelected ? 0.8 : 0.4} />
            {/* Línea con la forma seleccionada */}
            <path
              d={pathD}
              stroke={color}
              strokeWidth={isHovered || isSelected ? lineWidth + 0.5 : lineWidth}
              fill="none"
              strokeOpacity={isHovered || isSelected ? 0.88 : 0.42}
              strokeDasharray={
                isHovered || isSelected
                  ? undefined
                  : dashed ? '5 3' : undefined
              }
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Círculo con ícono */}
          <div style={{
            position: 'absolute',
            left: circleLeft,
            top: circleTop,
            width: circleD,
            height: circleD,
            borderRadius: '50%',
            border: `1.5px solid ${borderColor}`,
            boxShadow: `
              0 0 22px ${glowColor},
              0 0 8px ${glowColor},
              inset 0 0 18px rgba(0,217,255,0.07)
            `,
            background: 'rgba(2,10,22,0.90)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.3s, box-shadow 0.3s',
          }}>
            <span style={{
              fontSize: iconSize,
              lineHeight: 1,
              filter: isSelected
                ? 'sepia(1) saturate(4) hue-rotate(5deg) brightness(1.2)'
                : isHovered ? 'brightness(1.3)' : 'brightness(0.9)',
              transition: 'filter 0.3s',
            }}>
              {hotspot.icon}
            </span>
          </div>

          {/* Bloque de texto */}
          <div style={textStyle}>
            <div style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.11em',
              textTransform: 'uppercase',
              whiteSpace: whiteSpaceMode,
              maxWidth: textMaxW,
              color: isSelected ? '#D4AF37' : isHovered ? '#ffffff' : '#8ec8e0',
              textShadow: isSelected
                ? '0 0 16px rgba(212,175,55,0.95)'
                : '0 0 12px rgba(0,217,255,0.6)',
              transition: 'color 0.3s',
              lineHeight: 1.3,
            }}>
              {hotspot.label}
            </div>
            {hotspot.sublabel && (
              <div style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '8px',
                fontWeight: 500,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                whiteSpace: whiteSpaceMode,
                maxWidth: textMaxW,
                color: isSelected ? 'rgba(212,175,55,0.75)' : 'rgba(0,217,255,0.52)',
                transition: 'color 0.3s',
                marginTop: 3,
                lineHeight: 1.3,
              }}>
                {hotspot.sublabel}
              </div>
            )}
          </div>

        </div>
      </Html>
    </group>
  )
}

export function AnatomicHotspots({ hoveredZone, selectedZone, onHover, onSelect }: AnatomicHotspotsProps) {
  return (
    <group>
      {HOTSPOTS.map((hotspot, index) => (
        <Hotspot
          key={hotspot.id}
          hotspot={hotspot}
          index={index}
          isHovered={hoveredZone === hotspot.id}
          isSelected={selectedZone === hotspot.id}
          dimmed={selectedZone !== null && selectedZone !== hotspot.id}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}
    </group>
  )
}
