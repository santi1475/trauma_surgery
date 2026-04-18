'use client'
import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

function FallbackOrb() {
  return (
    <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
      <div
        className="w-56 h-56 rounded-full border-2 opacity-20 animate-pulse"
        style={{ borderColor: 'var(--color-accent)' }}
      />
    </div>
  )
}

// Hueso tecnológico — implante de titanio con overlay de malla digital
function BoneTech() {
  const groupRef = useRef<THREE.Group>(null)
  const boneRef = useRef<THREE.Group>(null)
  const scanRef = useRef<THREE.Mesh>(null)

  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  useFrame((state) => {
    if (prefersReduced) return

    const { mouse, clock } = state

    // Parallax mouse
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.4,
        0.04
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.25,
        0.04
      )
    }

    // Rotación lenta del hueso en su eje
    if (boneRef.current) {
      boneRef.current.rotation.y += 0.006
    }

    // Anillo de escaneo sube y baja por el eje del hueso
    if (scanRef.current) {
      scanRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 1.1
    }
  })

  const metalMat: React.ComponentProps<'meshStandardMaterial'> = {
    color: '#C0CDD8',
    metalness: 0.94,
    roughness: 0.06,
    envMapIntensity: 2,
  }

  return (
    <group ref={groupRef}>
      <Float speed={0.7} rotationIntensity={0.1} floatIntensity={0.35}>
        {/* Hueso inclinado 36° — aspecto fémur/tibia */}
        <group ref={boneRef} rotation={[0, 0, Math.PI / 5]}>

          {/* Diáfisis — cuerpo del hueso */}
          <mesh>
            <cylinderGeometry args={[0.18, 0.18, 2.1, 24]} />
            <meshStandardMaterial {...metalMat} />
          </mesh>

          {/* Epífisis proximal */}
          <mesh position={[0, 1.25, 0]}>
            <sphereGeometry args={[0.44, 32, 32]} />
            <meshStandardMaterial {...metalMat} />
          </mesh>

          {/* Epífisis distal */}
          <mesh position={[0, -1.25, 0]}>
            <sphereGeometry args={[0.44, 32, 32]} />
            <meshStandardMaterial {...metalMat} />
          </mesh>

          {/* Malla digital sobre el cuerpo */}
          <mesh>
            <cylinderGeometry args={[0.21, 0.21, 2.1, 8]} />
            <meshStandardMaterial
              color="#00A8CC"
              wireframe
              transparent
              opacity={0.22}
            />
          </mesh>
          <mesh position={[0, 1.25, 0]}>
            <sphereGeometry args={[0.46, 7, 7]} />
            <meshStandardMaterial
              color="#00A8CC"
              wireframe
              transparent
              opacity={0.22}
            />
          </mesh>
          <mesh position={[0, -1.25, 0]}>
            <sphereGeometry args={[0.46, 7, 7]} />
            <meshStandardMaterial
              color="#00A8CC"
              wireframe
              transparent
              opacity={0.22}
            />
          </mesh>

          {/* Nodos de datos — puntos brillantes en la diáfisis */}
          {([-0.8, -0.3, 0.3, 0.8] as number[]).map((y, i) => (
            <mesh key={i} position={[0.21, y, 0]}>
              <sphereGeometry args={[0.055, 8, 8]} />
              <meshStandardMaterial
                color="#00A8CC"
                emissive="#00A8CC"
                emissiveIntensity={3}
              />
            </mesh>
          ))}

          {/* Anillo de escaneo — se desplaza por la longitud del hueso */}
          <mesh ref={scanRef} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.52, 0.018, 8, 80]} />
            <meshStandardMaterial
              color="#00A8CC"
              emissive="#00A8CC"
              emissiveIntensity={1.5}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      </Float>

      {/* Anillo orbital exterior #1 */}
      <mesh rotation={[Math.PI / 3, 0.5, 0]} scale={2.1}>
        <torusGeometry args={[1, 0.014, 8, 100]} />
        <meshStandardMaterial color="#0A3A60" transparent opacity={0.28} />
      </mesh>

      {/* Anillo orbital exterior #2 */}
      <mesh rotation={[-Math.PI / 4, 0.9, 0.2]} scale={1.7}>
        <torusGeometry args={[1, 0.01, 8, 100]} />
        <meshStandardMaterial color="#00A8CC" transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

export default function SurgicalOrb() {
  return (
    <div className="w-full h-full" aria-hidden="true">
      <Suspense fallback={<FallbackOrb />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 46 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 8, 5]} intensity={1.4} />
          <pointLight position={[-3, 2, 3]} color="#00A8CC" intensity={3.5} />
          <pointLight position={[3, -2, -2]} color="#0A3A60" intensity={2} />
          <Environment preset="studio" />
          <BoneTech />
        </Canvas>
      </Suspense>
    </div>
  )
}
