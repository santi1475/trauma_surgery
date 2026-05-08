import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import * as THREE from 'three'
import PieHologramScene from './3d/PieHologramScene'

interface PieHologramProps {
  className?: string
  style?: React.CSSProperties
  modelUrl?: string
}

/**
 * Wrapper del Canvas R3F. Aísla la configuración de renderer/cámara para que
 * la escena (PieHologramScene) sólo se ocupe de lógica 3D.
 */
export default function PieHologram({ className, style, modelUrl }: PieHologramProps) {
  return (
    <div className={className} style={style}>
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{ position: [0, 0.25, 2.4], fov: 35, near: 0.1, far: 50 }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Suspense fallback={null}>
          <PieHologramScene modelUrl={modelUrl} autoRotate autoRotateSpeed={0.55} />
        </Suspense>
      </Canvas>
    </div>
  )
}
