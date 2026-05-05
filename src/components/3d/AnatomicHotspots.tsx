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

const CIRCLE_R = 29   // radio del círculo ícono (px)
const CIRCLE_D = CIRCLE_R * 2

function Hotspot({ hotspot, index, isHovered, isSelected, dimmed, onHover, onSelect }: HotspotProps) {
  const ringRef = useRef<THREE.Mesh>(null)
  const pingRef = useRef<THREE.Mesh>(null)
  const pingMatRef = useRef<THREE.MeshBasicMaterial>(null)

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

  // Elbow path: horizontal 50% → angular to circle edge
  const elbowX = ox * 0.50
  const endX = ox > 0 ? ox - CIRCLE_R : ox + CIRCLE_R
  const pathD = `M 0,0 L ${elbowX},0 L ${endX},${oy}`

  // Posiciones absolutas del círculo y texto
  const circleLeft = ox - CIRCLE_R
  const circleTop  = oy - CIRCLE_R

  const textStyle: React.CSSProperties = hotspot.side === 'right'
    ? {
        position: 'absolute',
        left: ox + CIRCLE_R + 10,
        top: oy - 22,
        textAlign: 'left',
      }
    : {
        position: 'absolute',
        left: ox - CIRCLE_R - 10,
        top: oy - 22,
        textAlign: 'right',
        transform: 'translateX(-100%)',
      }

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
          {/* Conector SVG con codo */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              overflow: 'visible',
              width: 1,
              height: 1,
              pointerEvents: 'none', // Las líneas no deben capturar clics
            }}
          >
            {/* Punto en el hotspot */}
            <circle cx="0" cy="0" r="2.5" fill={color} fillOpacity={isHovered || isSelected ? 0.8 : 0.4} />
            {/* Línea con codo */}
            <path
              d={pathD}
              stroke={color}
              strokeWidth={isHovered || isSelected ? 1.2 : 0.7}
              fill="none"
              strokeOpacity={isHovered || isSelected ? 0.88 : 0.42}
              strokeDasharray={isHovered || isSelected ? undefined : '5 3'}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Círculo con ícono */}
          <div style={{
            position: 'absolute',
            left: circleLeft,
            top: circleTop,
            width: CIRCLE_D,
            height: CIRCLE_D,
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
              fontSize: 22,
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
              whiteSpace: 'nowrap',
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
                whiteSpace: 'nowrap',
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
