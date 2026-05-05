import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { HotspotData } from '@/data/hotspots'

interface LightingRigProps {
  selectedZone: string | null
  hotspots: HotspotData[]
}

export function LightingRig({ selectedZone, hotspots }: LightingRigProps) {
  const orbRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    if (!orbRef.current) return
    const t = clock.getElapsedTime()
    orbRef.current.position.x = Math.cos(t * 0.4) * 2.8
    orbRef.current.position.z = Math.sin(t * 0.4) * 2.8
    orbRef.current.intensity = 0.7 + Math.sin(t * 1.2) * 0.25
  })

  const activeHotspot = selectedZone
    ? hotspots.find((h) => h.id === selectedZone)
    : null

  return (
    <>
      <ambientLight intensity={0.35} color="#ffffff" />
      <directionalLight position={[2, 4, 3]} intensity={1.3} color="#b8d4ff" />
      <pointLight
        ref={orbRef}
        position={[2.8, 1.2, 0]}
        color="#00d9ff"
        intensity={0.9}
        distance={8}
      />
      <pointLight
        position={[0, -1.8, 0.5]}
        color="#D4AF37"
        intensity={0.4}
        distance={5}
      />
      {activeHotspot && (
        <pointLight
          position={activeHotspot.position}
          color="#D4AF37"
          intensity={1.4}
          distance={1.5}
        />
      )}
    </>
  )
}
