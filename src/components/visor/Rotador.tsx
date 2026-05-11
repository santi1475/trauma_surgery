import React from 'react'
import { useFrame } from '@react-three/fiber'
import type { CameraControls } from '@react-three/drei'

interface Props {
  rotacionActiva: boolean
  animando: boolean
  cameraControlsRef: React.RefObject<CameraControls | null>
}

export function Rotador({ rotacionActiva, animando, cameraControlsRef }: Props) {
  useFrame((_, delta) => {
    if (rotacionActiva && !animando && cameraControlsRef.current) {
      cameraControlsRef.current.rotate(delta * 0.15, 0, false)
    }
  })
  return null
}
