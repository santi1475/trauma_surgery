import { useEffect, useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface PieModelProps {
  url?: string
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

const IMPLANT_KEYWORDS = [
  'plate', 'placa', 'screw', 'tornillo', 'implant', 'metal', 'titan',
  'clavo', 'rod', 'pin', 'nail', 'bolt', 'plat', 'host'
]

function isImplantMesh(mesh: THREE.Mesh): boolean {
  const haystack = `${mesh.name} ${(mesh.material as THREE.Material)?.name ?? ''}`.toLowerCase()
  return IMPLANT_KEYWORDS.some((kw) => haystack.includes(kw))
}

/**
 * Inyecta un término Fresnel cyan en el shader de un MeshPhysicalMaterial,
 * para que los bordes del hueso "brillen" como en una radiografía.
 */
function applyFresnel(mat: THREE.MeshPhysicalMaterial) {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uFresnelColor = { value: new THREE.Color('#00F0FF') }
    shader.uniforms.uFresnelPower = { value: 2.6 }
    shader.uniforms.uFresnelIntensity = { value: 1.4 }

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>
       uniform vec3  uFresnelColor;
       uniform float uFresnelPower;
       uniform float uFresnelIntensity;`
    )
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <emissivemap_fragment>',
      `#include <emissivemap_fragment>
       float fres = pow(1.0 - saturate(dot(normalize(vNormal), normalize(-vViewPosition))), uFresnelPower);
       totalEmissiveRadiance += uFresnelColor * fres * uFresnelIntensity;`
    )
  }
}

export default function PieModel({
  url = '/models/pie2.glb',
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: PieModelProps) {
  const { scene } = useGLTF(url)
  const groupRef = useRef<THREE.Group>(null)

  // Clona la escena para no mutar el cache de useGLTF
  const cloned = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    cloned.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return
      const mesh = child as THREE.Mesh

      if (isImplantMesh(mesh)) {
        // ── Implante metálico (placas / tornillos) ──────────────────
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: '#7d8a99',          // titanio cepillado tirando a azul
          metalness: 1,
          roughness: 0.2,
          envMapIntensity: 1.2,
          clearcoat: 0.4,
          clearcoatRoughness: 0.25,
        })
      } else {
        // ── Hueso / anatomía: rayos-X translúcido con Fresnel cyan ──
        const xray = new THREE.MeshPhysicalMaterial({
          color: '#0e2538',
          emissive: '#003a4a',
          emissiveIntensity: 0.6,
          metalness: 0,
          roughness: 0.1,
          transmission: 0.9,
          thickness: 0.4,
          ior: 1.25,
          attenuationColor: new THREE.Color('#00A8CC'),
          attenuationDistance: 1.6,
          opacity: 0.3,
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
        })
        applyFresnel(xray)
        mesh.material = xray
        mesh.renderOrder = 1
      }

      mesh.castShadow = false
      mesh.receiveShadow = false
    })
  }, [cloned])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={cloned} />
    </group>
  )
}

useGLTF.preload('/models/pie2.glb')
