import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, Environment, Html } from '@react-three/drei'
import * as THREE from 'three'
import { ModelSkeleton } from './ModelSkeleton'
import { LightingRig } from './3d/LightingRig'
import { AmbientParticles } from './3d/AmbientParticles'
import { AnatomicHotspots } from './3d/AnatomicHotspots'
import type { VistaAnatomica } from '@/interface/vistas'
import { VISTAS_ANATOMICAS } from '@/data/vistasAnatomicas'
import { ZONAS_ANATOMICAS, type ZonaAnatomica } from '@/data/zonasAnatomicas'
import { HOTSPOTS } from '@/data/hotspots'
import { Cargador } from './visor/Cargador'
import { Rotador } from './visor/Rotador'
import { VisorUIOverlay } from './visor/VisorUIOverlay'

export type CameraState = 'free' | 'focusing' | 'focused' | 'returning'

interface Visor3DProps {
  showPanel?: boolean
  externalViewIndex?: number | null
  externalAutoRotate?: boolean
  onZoneSelect?: (zone: ZonaAnatomica | null) => void
  selectedZoneId?: string | null
  debug?: boolean
}

export default function Visor3D({
  showPanel = true,
  externalViewIndex = null,
  externalAutoRotate,
  onZoneSelect,
  selectedZoneId: externalSelectedZoneId = null,
  debug = false,
}: Visor3DProps) {
  const cameraControlsRef = useRef<CameraControls>(null)
  const [rotacionActiva, setRotacionActiva] = useState(true)
  const [animando, setAnimando] = useState(false)
  const [, setVistaSeleccionada] = useState<number | null>(null)
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null)
  const [internalSelectedZone, setInternalSelectedZone] = useState<string | null>(null)

  const selectedZone = externalSelectedZoneId ?? internalSelectedZone

  const cameraState: CameraState = animando
    ? (selectedZone ? 'focusing' : 'returning')
    : selectedZone
      ? 'focused'
      : 'free'

  const irAVista = useCallback(async (vista: VistaAnatomica, indice: number) => {
    if (!cameraControlsRef.current) return
    setRotacionActiva(false)
    setAnimando(true)
    setVistaSeleccionada(indice)
    await cameraControlsRef.current.setLookAt(...vista.cameraPosition, ...vista.target, true)
    setAnimando(false)
  }, [])

  const handleZoneClick = useCallback((zone: ZonaAnatomica) => {
    const vista = VISTAS_ANATOMICAS[zone.vistaIndex]
    if (vista) irAVista(vista, zone.vistaIndex)
    setInternalSelectedZone(zone.id)
    onZoneSelect?.(zone)
  }, [irAVista, onZoneSelect])

  const handleHotspotSelect = useCallback((id: string) => {
    const zone = ZONAS_ANATOMICAS.find((z) => z.id === id)
    if (zone) handleZoneClick(zone)
  }, [handleZoneClick])

  const resetCamera = useCallback(async () => {
    if (!cameraControlsRef.current) return
    setAnimando(true)
    cameraControlsRef.current.minDistance = 1.5
    cameraControlsRef.current.maxDistance = 6
    await cameraControlsRef.current.setLookAt(
      ...VISTAS_ANATOMICAS[0].cameraPosition,
      ...VISTAS_ANATOMICAS[0].target,
      true,
    )
    setAnimando(false)
    setRotacionActiva(true)
    setVistaSeleccionada(null)
    setInternalSelectedZone(null)
    onZoneSelect?.(null)
  }, [onZoneSelect])

  const handleToggleRotation = useCallback(() => {
    if (animando) return
    setRotacionActiva((v) => {
      const next = !v
      if (next) setVistaSeleccionada(null)
      return next
    })
  }, [animando])

  useEffect(() => {
    const t = setTimeout(() => {
      cameraControlsRef.current?.setLookAt(
        ...VISTAS_ANATOMICAS[0].cameraPosition,
        ...VISTAS_ANATOMICAS[0].target,
        false,
      )
    }, 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (externalViewIndex !== null && externalViewIndex !== undefined) {
      const vista = VISTAS_ANATOMICAS[externalViewIndex]
      if (vista) irAVista(vista, externalViewIndex)
    }
  }, [externalViewIndex, irAVista])

  useEffect(() => {
    if (externalAutoRotate !== undefined) {
      setRotacionActiva(externalAutoRotate)
      if (externalAutoRotate) setVistaSeleccionada(null)
    }
  }, [externalAutoRotate])

  const manejarInteraccionUsuario = useCallback(() => {
    if (!animando) {
      setRotacionActiva(false)
      setVistaSeleccionada(null)
    }
  }, [animando])

  // ── SSR guard + viewport-pause (frameloop on demand) ───────────────
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [mounted])

  // ── UX híbrida del scroll/zoom ──────────────────────────────────────
  // Wheel sólo hace dolly cuando el cursor está dentro del 50% central del
  // contenedor (banda [0.25, 0.75] del ancho). En los tercios laterales —
  // donde viven los paneles UI — el wheel se desactiva y el scroll de la
  // página fluye natural. Enum camera-controls: NONE = 0, DOLLY = 8.
  useEffect(() => {
    if (!mounted) return
    const section = sectionRef.current
    if (!section) return

    const ZOOM_BAND_MIN = 0.25
    const ZOOM_BAND_MAX = 0.75
    let currentWheel = -1

    const setWheel = (value: number) => {
      if (currentWheel === value) return
      const c = cameraControlsRef.current as unknown as
        | { mouseButtons?: { wheel: number } }
        | null
      if (!c?.mouseButtons) return
      c.mouseButtons.wheel = value
      currentWheel = value
    }

    const handlePointerMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      if (rect.width <= 0) return
      const xRel = (e.clientX - rect.left) / rect.width
      const inBand = xRel >= ZOOM_BAND_MIN && xRel <= ZOOM_BAND_MAX
      setWheel(inBand ? 8 : 0)
    }

    const handlePointerLeave = () => setWheel(0)

    // Estado inicial: sin zoom hasta que el cursor entre en la banda
    const raf = requestAnimationFrame(() => setWheel(0))

    section.addEventListener('pointermove', handlePointerMove)
    section.addEventListener('pointerleave', handlePointerLeave)
    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener('pointermove', handlePointerMove)
      section.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [mounted])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen"
      style={{ background: 'linear-gradient(180deg, #041830 0%, #020d1a 40%, #041830 100%)' }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,82,163,0.25) 0%, transparent 70%)' }}
      />

      <VisorUIOverlay
        showPanel={showPanel}
        selectedZoneId={selectedZone}
        rotacionActiva={rotacionActiva}
        animando={animando}
        cameraState={cameraState}
        onZoneClick={handleZoneClick}
        onToggleRotation={handleToggleRotation}
        onReset={resetCamera}
      />

      {mounted && (
        <Canvas
          dpr={[1, 1.5]}
          frameloop={inView ? 'always' : 'never'}
          gl={{
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.4,
            outputColorSpace: THREE.SRGBColorSpace,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          onCreated={({ gl }) => { gl.setClearColor(0x000000, 0) }}
          camera={{ position: [0, 0.2, 2.4], fov: 45 }}
        >
          <Suspense fallback={<Cargador />}>
            <Environment preset="studio" environmentIntensity={0.4} />

            <LightingRig selectedZone={selectedZone} hotspots={HOTSPOTS} />

            <AmbientParticles count={80} />

            <ModelSkeleton
              hoveredZoneId={hoveredZoneId}
              selectedZoneId={selectedZone}
              onZoneHover={setHoveredZoneId}
              onZoneClick={handleZoneClick}
              debug={debug}
            />

            <AnatomicHotspots
              hoveredZone={hoveredZoneId}
              selectedZone={selectedZone}
              onHover={setHoveredZoneId}
              onSelect={handleHotspotSelect}
            />

            {debug && (
              <>
                {/* @ts-ignore */}
                <axesHelper args={[2]} />
                {/* @ts-ignore */}
                <gridHelper args={[4, 20, '#003344', '#001a22']} />
                {HOTSPOTS.map((h) => (
                  <Html key={h.id} position={h.position} style={{ pointerEvents: 'none' }}>
                    <div style={{ color: '#ffff00', fontSize: '9px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                      [{h.position.join(', ')}]
                    </div>
                  </Html>
                ))}
              </>
            )}
          </Suspense>

          <Rotador
            rotacionActiva={rotacionActiva}
            animando={animando}
            cameraControlsRef={cameraControlsRef}
          />

          <CameraControls
            ref={cameraControlsRef}
            makeDefault
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 1.75}
            minDistance={1.2}
            maxDistance={3.5}
            onStart={manejarInteraccionUsuario}
          />
        </Canvas>
      )}
    </section>
  )
}
