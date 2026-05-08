import { Suspense } from 'react'
import { Html, Line, Grid, OrbitControls, Float, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import PieModel from './PieModel'

/**
 * Anclajes 3D de las anotaciones HUD.
 * `anchor` = punto exacto sobre la malla.
 * `label`  = posición a la que se ofset la etiqueta <Html>.
 */
const ANNOTATIONS: {
  id: string
  title: string
  value: string
  anchor: [number, number, number]
  label: [number, number, number]
}[] = [
  {
    id: 'tibia',
    title: 'Tibia distal',
    value: 'Placa LCP · Ti Gr.4',
    anchor: [0.0, 0.95, 0.0],
    label: [1.5, 1.45, 0.2],
  },
  {
    id: 'metatarso',
    title: 'Metatarso',
    value: 'Tornillos Ø 3.5',
    anchor: [0.05, -0.05, 0.55],
    label: [1.7, 0.05, 0.4],
  },
  {
    id: 'calcaneo',
    title: 'Calcáneo',
    value: 'Placa anatómica',
    anchor: [-0.1, -0.35, -0.45],
    label: [-1.7, -0.25, -0.4],
  },
  {
    id: 'falange',
    title: 'Falange',
    value: 'Mini-fragmento',
    anchor: [0.18, -0.15, 0.85],
    label: [-1.55, -1.2, 0.6],
  },
]

function HudLabel({ title, value }: { title: string; value: string }) {
  return (
    <div className="pointer-events-none select-none">
      <div className="text-[8px] tracking-[0.22em] uppercase text-[#00F0FF]/55 leading-tight">
        {title}
      </div>
      <div
        className="text-[10px] font-bold tracking-widest uppercase text-[#00F0FF] leading-tight whitespace-nowrap"
        style={{ textShadow: '0 0 6px rgba(0,240,255,0.55)', fontFamily: 'var(--font-mono, monospace)' }}
      >
        {value}
      </div>
    </div>
  )
}

interface PieHologramSceneProps {
  modelUrl?: string
  autoRotate?: boolean
  autoRotateSpeed?: number
}

export default function PieHologramScene({
  modelUrl = '/models/pie2.glb',
  autoRotate = true,
  autoRotateSpeed = 0.5,
}: PieHologramSceneProps) {
  return (
    <>
      {/* Entorno mínimo para reflejos sobre los implantes metálicos */}
      <Environment preset="warehouse" environmentIntensity={0.35} />

      {/* Iluminación de contraste — sin ambientLight global */}
      <directionalLight position={[4, 3, 2]} intensity={0.9} color="#00F0FF" />
      <directionalLight position={[-4, 1, -2]} intensity={0.55} color="#0066ff" />
      {/* @ts-ignore drei intrinsic */}
      <spotLight
        position={[0, 4, 3]}
        angle={0.45}
        penumbra={0.8}
        intensity={1.6}
        color="#00F0FF"
        distance={9}
      />
      {/* Rim trasero — perfila el contorno del modelo */}
      {/* @ts-ignore */}
      <spotLight
        position={[0, 1.5, -3.5]}
        angle={0.6}
        penumbra={0.9}
        intensity={1.1}
        color="#0099cc"
        distance={8}
      />

      <Suspense fallback={null}>
        <Float speed={1.0} rotationIntensity={0.12} floatIntensity={0.18}>
          <PieModel url={modelUrl} scale={1.55} position={[0, 0, 0]} />
        </Float>

        {ANNOTATIONS.map((a) => (
          <group key={a.id}>
            {/* Línea fina ancla → etiqueta */}
            <Line
              points={[a.anchor, a.label]}
              color="#00F0FF"
              lineWidth={1}
              transparent
              opacity={0.45}
              dashed={false}
            />
            {/* Punto luminoso en el ancla */}
            <mesh position={a.anchor}>
              <sphereGeometry args={[0.014, 16, 16]} />
              <meshBasicMaterial color="#00F0FF" toneMapped={false} />
            </mesh>
            {/* Etiqueta — solo texto, sin caja */}
            <Html
              position={a.label}
              center
              transform={false}
              zIndexRange={[10, 0]}
              style={{ pointerEvents: 'none' }}
            >
              <HudLabel title={a.title} value={a.value} />
            </Html>
          </group>
        ))}
      </Suspense>

      {/* Base — grid + anillos concéntricos */}
      <group position={[0, -1.05, 0]}>
        <Grid
          args={[6, 6]}
          cellSize={0.3}
          cellThickness={0.5}
          cellColor="#005a78"
          sectionSize={1.5}
          sectionThickness={0.9}
          sectionColor="#00F0FF"
          fadeDistance={4.5}
          fadeStrength={1.6}
          infiniteGrid={false}
          followCamera={false}
        />
        {[0.55, 0.95, 1.35].map((r, i) => (
          <mesh key={r} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001 * (i + 1), 0]}>
            <ringGeometry args={[r - 0.008, r, 96]} />
            <meshBasicMaterial
              color="#00F0FF"
              transparent
              opacity={0.32 - i * 0.08}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed}
        minPolarAngle={Math.PI * 0.28}
        maxPolarAngle={Math.PI * 0.7}
        target={[0, 0, 0]}
      />

      <EffectComposer>
        <Bloom
          intensity={1.0}
          luminanceThreshold={0.18}
          luminanceSmoothing={0.85}
          mipmapBlur
          radius={0.8}
        />
      </EffectComposer>
    </>
  )
}
