import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AmbientParticlesProps {
  count?: number
}

export function AmbientParticles({ count = 80 }: AmbientParticlesProps) {
  const meshRef = useRef<THREE.Points>(null)

  const [positions, velocities, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    const phs = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.2 + Math.random() * 1.8

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.cos(phi) * 0.8 + 0.3
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      vel[i * 3]     = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.001
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002

      phs[i] = Math.random() * Math.PI * 2
    }
    return [pos, vel, phs]
  }, [count])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    return geo
  }, [positions])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute

    for (let i = 0; i < count; i++) {
      posAttr.setXYZ(
        i,
        positions[i * 3]     + Math.sin(t * 0.3 + phases[i]) * 0.008,
        positions[i * 3 + 1] + Math.cos(t * 0.2 + phases[i] * 1.3) * 0.005,
        positions[i * 3 + 2] + Math.sin(t * 0.25 + phases[i] * 0.7) * 0.008
      )
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        color="#00d9ff"
        size={0.012}
        transparent
        opacity={0.18}
        sizeAttenuation
        toneMapped={false}
        depthWrite={false}
      />
    </points>
  )
}
