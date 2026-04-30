'use client'
/*
 * ─── CÓMO SEPARAR EL MODELO EN BLENDER PARA INTERACTIVIDAD COMPLETA ────────────
 *
 * El archivo esqueleto2.glb puede ser un único mesh. Para activar hover/glow
 * por zona anatómica directamente en el mesh (sin hitboxes), separarlo así:
 *
 * 1. Importa el GLB en Blender: File → Import → glTF 2.0
 * 2. En Object Mode selecciona el mesh del esqueleto → Tab para Edit Mode
 * 3. Activa Vertex Select (tecla 1), selecciona los vértices de una zona
 *    anatómica (p.ej. todos los huesos del cráneo)
 * 4. Presiona P → "Separate by Selection" — se crea un nuevo objeto
 * 5. En Object Mode, renombra el objeto separado con el nombre exacto de
 *    ZonaAnatomica.meshNames[0]:
 *      Craneo | Hombro | Columna | Pelvis | Rodilla | Pie
 * 6. Repite para cada zona del array ZONAS_ANATOMICAS
 * 7. Exporta: File → Export → glTF 2.0 (Binary .glb)
 *    Opciones recomendadas: Include → Selected Objects, Mesh → Apply Modifiers
 *    Guarda en /public/models/esqueleto2.glb
 *
 * Con el modelo separado, traverseScene() detectará los meshes automáticamente
 * y aplicará emissive highlight por zona sin los hitboxes (aunque los hitboxes
 * seguirán activos como fallback y mejoran el área de clic).
 * ──────────────────────────────────────────────────────────────────────────────
 */

import * as THREE from 'three'
import { useRef, useEffect } from 'react'
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
}

// Anillo pulsante que aparece en hover/selección de zona
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
      {/* Anillo exterior pulsante */}
      <mesh ref={outerRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.35, 0.004, 8, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0} depthWrite={false} />
      </mesh>
      {/* Disco interior semitransparente */}
      <mesh ref={innerRef} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius * 1.1, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// Tooltip HTML flotante sobre zona (aparece solo en hover, no en selección)
function ZoneTooltip({
  zone,
  visible,
}: {
  zone: ZonaAnatomica
  visible: boolean
}) {
  if (!visible) return null
  return (
    <Html
      position={[zone.position[0] + 0.30, zone.position[1], zone.position[2]]}
      distanceFactor={2.2}
      style={{ pointerEvents: 'none', userSelect: 'none' }}
    >
      <div
        style={{
          background: 'rgba(2,6,18,0.92)',
          border: `1px solid ${zone.color}44`,
          borderLeft: `2px solid ${zone.color}`,
          backdropFilter: 'blur(14px)',
          borderRadius: 6,
          padding: '7px 13px',
          minWidth: 148,
          whiteSpace: 'nowrap',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            color: zone.color,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: 3,
          }}
        >
          {zone.icon} {zone.label}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            color: 'rgba(255,255,255,0.48)',
            letterSpacing: '0.03em',
            marginBottom: 4,
          }}
        >
          {zone.categoria}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            color: `${zone.color}88`,
            letterSpacing: '0.1em',
          }}
        >
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
  ...props
}: ModelSkeletonProps) {
  const { scene } = useGLTF('/models/esqueleto2.glb') as unknown as GLTFResult
  // Mapa de meshes nombrados encontrados en el GLB (activo cuando el modelo esté separado)
  const namedMeshes = useRef<Map<string, THREE.Mesh>>(new Map())

  // Traversa el scene buscando meshes con nombres que coincidan con las zonas
  useEffect(() => {
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return
      const matched = ZONAS_ANATOMICAS.find((z) =>
        z.meshNames?.some((n) =>
          obj.name.toLowerCase().includes(n.toLowerCase())
        )
      )
      if (!matched) return
      // Clona material para no mutar el material compartido del cache de useGLTF
      if (!Array.isArray(obj.material)) {
        const clone = (obj.material as THREE.MeshStandardMaterial).clone()
        clone.emissive = new THREE.Color(0x000000)
        obj.material = clone
      }
      namedMeshes.current.set(matched.id, obj)
    })
  }, [scene])

  // Aplica emissive highlight a meshes nombrados cuando cambia hover/selección
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
      {/* GLB principal — se reemplaza con meshes separados cuando estén listos */}
      <primitive object={scene} />

      {/* Hitboxes invisibles + efectos visuales por zona anatómica */}
      {ZONAS_ANATOMICAS.map((zone) => {
        const isHovered = hoveredZoneId === zone.id
        const isSelected = selectedZoneId === zone.id

        return (
          <group key={zone.id}>
            {/* Esfera invisible — captura onPointerOver/Out/Click */}
            <mesh
              position={zone.position}
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

            {/* Glow ring pulsante */}
            <ZoneGlowRing
              position={zone.position}
              radius={zone.hitboxRadius}
              color={zone.color}
              active={isSelected}
              hovered={isHovered}
            />

            {/* Tooltip flotante — solo en hover (no cuando ya está seleccionada) */}
            <ZoneTooltip
              zone={zone}
              visible={isHovered && !isSelected}
            />
          </group>
        )
      })}
    </group>
  )
}

useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
useGLTF.preload('/models/esqueleto2.glb')
