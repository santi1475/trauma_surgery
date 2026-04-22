import * as THREE from 'three'
import { useState } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import type { ComponentProps } from 'react'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: any
  materials: any
}

export function ModelSkeleton(props: ComponentProps<'group'>) {
  const { scene } = useGLTF('/models/esqueleto2.glb') as unknown as GLTFResult
  const [modalManoAbierto, setModalManoAbierto] = useState(false)

  return (
    <>
      <group {...props} dispose={null}>
        <primitive object={scene} />

        <group>
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color="#00ffcc" />
          </mesh>

          <Html
            position={[0, 0.1, 0]}
            center
            distanceFactor={5}
            zIndexRange={[1, 0]}
          >
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setModalManoAbierto(true)
                }}
                className="h-4 w-4 cursor-pointer rounded-full bg-teal-400 transition-transform hover:scale-150 animate-ping"
                title="Ver detalles de la mano"
                aria-label="Ver detalles de la mano"
              />
            </div>
          </Html>
        </group>
      </group>

      {modalManoAbierto && (
        <Html center fullscreen zIndexRange={[10, 0]}>
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-2xl w-80 text-black border border-gray-200">
            <h3 className="text-xl font-bold text-teal-600 mb-2">Huesos de la Mano</h3>
            <p className="text-sm text-gray-700 mb-4">
              La mano humana tiene 27 huesos: 8 carpianos, 5 metacarpianos y 14 falanges.
            </p>
            <button
              type="button"
              onClick={() => setModalManoAbierto(false)}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 w-full font-semibold transition-colors"
            >
              Cerrar
            </button>
          </div>
        </Html>
      )}
    </>
  )
}

useGLTF.preload('/models/esqueleto2.glb')