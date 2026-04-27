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

      </group>
    </>
  )
}

useGLTF.preload('/models/esqueleto2.glb')