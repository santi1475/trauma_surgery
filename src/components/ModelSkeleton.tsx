'use client'

import * as THREE from 'three'
import { useRef, useEffect, useState } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import type { ComponentProps } from 'react'
import type { GLTF } from 'three-stdlib'
import { ZONAS_ANATOMICAS, type ZonaAnatomica } from '@/data/zonasAnatomicas'

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Object3D>
  materials: Record<string, THREE.Material>
}

interface ModelSkeletonProps extends ComponentProps<'group'> {
  hoveredZoneId: string | null
  selectedZoneId: string | null
  onZoneHover: (id: string | null) => void
  onZoneClick: (zone: ZonaAnatomica) => void
  debug?: boolean
}

function ZoneGlowRing({
  position,
  radius,
  color,
  active,
  hovered,
}: {
  position: [number, number, number]
  radius: number
  color: string
  active: boolean
  hovered: boolean
}) {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const visible = active || hovered

    if (outerRef.current) {
      const mat = outerRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = visible
        ? (Math.sin(t * (active ? 2.5 : 4)) * 0.3 + 0.5) * (active ? 0.9 : 0.6)
        : 0
      const pulse = 1 + Math.sin(t * (active ? 2.5 : 4)) * 0.04
      outerRef.current.scale.setScalar(pulse)
    }

    if (innerRef.current) {
      const mat = innerRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = visible ? (active ? 0.25 : 0.12) : 0
    }
  })

  return (
    <group position={position}>
      <mesh ref={outerRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.35, 0.004, 8, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh ref={innerRef} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius * 1.1, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function ZoneTooltip({ zone, visible }: { zone: ZonaAnatomica; visible: boolean }) {
  if (!visible) return null
  return (
    <Html
      position={[zone.position[0] + 0.30, zone.position[1], zone.position[2]]}
      distanceFactor={2.2}
      style={{ pointerEvents: 'none', userSelect: 'none' }}
    >
      <div style={{
        background: 'rgba(2,6,18,0.92)',
        border: `1px solid ${zone.color}44`,
        borderLeft: `2px solid ${zone.color}`,
        backdropFilter: 'blur(14px)',
        borderRadius: 6,
        padding: '7px 13px',
        minWidth: 148,
        whiteSpace: 'nowrap',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: zone.color, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 3 }}>
          {zone.icon} {zone.label}
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'rgba(255,255,255,0.48)', letterSpacing: '0.03em', marginBottom: 4 }}>
          {zone.categoria}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: `${zone.color}88`, letterSpacing: '0.1em' }}>
          ▶ CLICK PARA EXPLORAR
        </div>
      </div>
    </Html>
  )
}

export function ModelSkeleton({
  hoveredZoneId,
  selectedZoneId,
  onZoneHover,
  onZoneClick,
  debug = false,
  ...props
}: ModelSkeletonProps) {
  const { scene } = useGLTF('/models/modelo3.glb') as unknown as GLTFResult
  const namedMeshes = useRef<Map<string, THREE.Mesh>>(new Map())

  // Escala normalizada: modelo siempre mide ~1.8 unidades de alto en world space
  const [modelScale, setModelScale] = useState(1)
  const [centerOffset, setCenterOffset] = useState<[number, number, number]>([0, 0, 0])

  useEffect(() => {
    // 1. Calcular bounding box original para normalizar escala
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())

    if (size.y > 0) {
      const s = 1.8 / size.y
      setModelScale(s)
      // Offset para centrar el modelo en el origen del grupo padre
      setCenterOffset([-center.x, -center.y, -center.z])

      if (debug) {
        console.log(`[ModelSkeleton] Tamaño original: ${size.x.toFixed(3)} × ${size.y.toFixed(3)} × ${size.z.toFixed(3)}`)
        console.log(`[ModelSkeleton] Centro original: [${center.x.toFixed(3)}, ${center.y.toFixed(3)}, ${center.z.toFixed(3)}]`)
        console.log(`[ModelSkeleton] Escala aplicada: ${s.toFixed(4)}`)
        console.log(`[ModelSkeleton] Tras normalización — cabeza aprox y≈+0.9, pies aprox y≈-0.9`)
      }
    }

    // 2. Fix de materiales
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return

      obj.material = (obj.material as THREE.MeshStandardMaterial).clone()
      const mat = obj.material as THREE.MeshStandardMaterial
      if (mat.roughness > 0.9) mat.roughness = 0.42
      if (mat.metalness < 0.1) mat.metalness = 0.58
      if (!mat.map) mat.color.set('#c0cfe0')
      mat.envMapIntensity = 1.3
      mat.emissive = new THREE.Color(0x000000)
      mat.needsUpdate = true
      obj.renderOrder = 1

      const matched = ZONAS_ANATOMICAS.find((z) =>
        z.meshNames?.some((n) => obj.name.toLowerCase().includes(n.toLowerCase()))
      )
      if (matched) namedMeshes.current.set(matched.id, obj)
    })
  }, [scene, debug])

  useEffect(() => {
    namedMeshes.current.forEach((mesh, zoneId) => {
      const zone = ZONAS_ANATOMICAS.find((z) => z.id === zoneId)
      if (!zone || Array.isArray(mesh.material)) return
      const mat = mesh.material as THREE.MeshStandardMaterial
      if (selectedZoneId === zoneId) {
        mat.emissive.set(zone.color)
        mat.emissiveIntensity = 0.38
      } else if (hoveredZoneId === zoneId) {
        mat.emissive.set(zone.color)
        mat.emissiveIntensity = 0.20
      } else {
        mat.emissive.set(0x000000)
        mat.emissiveIntensity = 0
      }
    })
  }, [hoveredZoneId, selectedZoneId])

  return (
    <group {...props} dispose={null}>
      {/* Modelo normalizado a 1.8 unidades de alto, centrado en origen */}
      <group
        scale={[modelScale, modelScale, modelScale]}
        onPointerDown={debug
          ? (e: ThreeEvent<PointerEvent>) => {
              const p = e.point
              console.log(
                `🎯 [HOTSPOT COORD] Click en modelo: [${p.x.toFixed(3)}, ${p.y.toFixed(3)}, ${p.z.toFixed(3)}]`
              )
            }
          : undefined
        }
      >
        {/* Rotación PI/2 en Y para que el modelo mire de frente al espectador */}
        <group position={centerOffset} rotation={[0, -Math.PI / 2, 0]}>
          <primitive object={scene} />
        </group>
      </group>

      {/* Hitboxes en world space — recalibrar con debug=true tras normalizar escala */}
      {ZONAS_ANATOMICAS.map((zone) => {
        const isHovered = hoveredZoneId === zone.id
        const isSelected = selectedZoneId === zone.id

        return (
          <group key={zone.id}>
            <mesh
              position={zone.position}
              visible={false}
              onPointerOver={(e: ThreeEvent<PointerEvent>) => {
                e.stopPropagation()
                document.body.style.cursor = 'pointer'
                onZoneHover(zone.id)
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'default'
                onZoneHover(null)
              }}
              onClick={(e: ThreeEvent<MouseEvent>) => {
                e.stopPropagation()
                onZoneClick(zone)
              }}
            >
              <sphereGeometry args={[zone.hitboxRadius, 8, 8]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>

            <ZoneGlowRing
              position={zone.position}
              radius={zone.hitboxRadius}
              color={zone.color}
              active={isSelected}
              hovered={isHovered}
            />

            <ZoneTooltip zone={zone} visible={isHovered && !isSelected} />
          </group>
        )
      })}
    </group>
  )
}

useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
useGLTF.preload('/models/modelo3.glb')
