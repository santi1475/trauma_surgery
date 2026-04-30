import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CameraControls, Html, useProgress } from '@react-three/drei'
import { ModelSkeleton } from './ModelSkeleton'
import type { VistaAnatomica } from '@/interface/vistas'
import { VISTAS_ANATOMICAS } from '@/data/vistasAnatomicas'
import { ZONAS_ANATOMICAS, type ZonaAnatomica } from '@/data/zonasAnatomicas'

interface Visor3DProps {
  showPanel?: boolean
  externalViewIndex?: number | null
  externalAutoRotate?: boolean
  onZoneSelect?: (zone: ZonaAnatomica | null) => void
  selectedZoneId?: string | null
}

// Barra de progreso de carga futurista
function Cargador() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 80,
          height: 2,
          background: 'rgba(0,217,255,0.15)',
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #00a8cc, #00d9ff)',
            transition: 'width 0.3s ease',
            boxShadow: '0 0 10px #00d9ff',
          }} />
        </div>
        <span style={{
          fontFamily: 'monospace',
          fontSize: 10,
          letterSpacing: '0.15em',
          color: '#00d9ff',
        }}>
          CARGANDO {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  )
}

interface EscenaProps {
  hoveredZoneId: string | null
  selectedZoneId: string | null
  onZoneHover: (id: string | null) => void
  onZoneClick: (zone: ZonaAnatomica) => void
}

function EscenaInteractiva({ hoveredZoneId, selectedZoneId, onZoneHover, onZoneClick }: EscenaProps) {
  return (
    <group>
      <ModelSkeleton
        hoveredZoneId={hoveredZoneId}
        selectedZoneId={selectedZoneId}
        onZoneHover={onZoneHover}
        onZoneClick={onZoneClick}
      />
    </group>
  )
}

interface RotadorProps {
  rotacionActiva: boolean
  animando: boolean
  cameraControlsRef: React.RefObject<CameraControls | null>
}

function Rotador({ rotacionActiva, animando, cameraControlsRef }: RotadorProps) {
  useFrame((_, delta) => {
    if (rotacionActiva && !animando && cameraControlsRef.current) {
      cameraControlsRef.current.rotate(delta * 0.15, 0, false)
    }
  })
  return null
}

// Botón de zona anatómica — estilo futurista
function ZoneButton({
  zone,
  active,
  onClick,
}: {
  zone: ZonaAnatomica
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        borderRadius: 6,
        border: active
          ? `1px solid ${zone.color}55`
          : '1px solid rgba(255,255,255,0.05)',
        background: active ? `${zone.color}12` : 'rgba(255,255,255,0.02)',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        transition: 'all 0.18s',
      }}
      onMouseEnter={(e) => {
        if (active) return
        ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,217,255,0.06)'
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,217,255,0.20)'
      }}
      onMouseLeave={(e) => {
        if (active) return
        ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)'
      }}
    >
      {/* Indicador de estado */}
      <div style={{
        width: 5,
        height: 5,
        borderRadius: '50%',
        flexShrink: 0,
        background: active ? zone.color : 'rgba(255,255,255,0.18)',
        boxShadow: active ? `0 0 7px ${zone.color}` : 'none',
        transition: 'all 0.18s',
      }} />
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: active ? zone.color : 'rgba(255,255,255,0.45)',
        transition: 'color 0.18s',
        flex: 1,
      }}>
        {zone.label}
      </span>
      {active && (
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 8,
          color: zone.color,
          opacity: 0.8,
        }}>
          ▶
        </span>
      )}
    </button>
  )
}

export default function Visor3D({
  showPanel = true,
  externalViewIndex = null,
  externalAutoRotate,
  onZoneSelect,
  selectedZoneId: externalSelectedZoneId = null,
}: Visor3DProps) {
  const cameraControlsRef = useRef<CameraControls>(null)
  const [rotacionActiva, setRotacionActiva] = useState(true)
  const [animando, setAnimando] = useState(false)
  const [vistaSeleccionada, setVistaSeleccionada] = useState<number | null>(null)
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null)

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
    onZoneSelect?.(zone)
  }, [irAVista, onZoneSelect])

  useEffect(() => {
    const t = setTimeout(() => {
      cameraControlsRef.current?.setLookAt(
        ...VISTAS_ANATOMICAS[0].cameraPosition,
        ...VISTAS_ANATOMICAS[0].target,
        false
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

  return (
    <section
      className="relative w-full h-screen"
      style={{ background: 'linear-gradient(180deg, #041830 0%, #020d1a 40%, #041830 100%)' }}
    >
      {/* Resplandor central */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,82,163,0.25) 0%, transparent 70%)' }}
      />

      {/* ── Panel anatómico futurista ── derecha ──────────────────────────── */}
      {showPanel && (
        <div
          className="absolute top-24 right-8 z-10 hidden lg:flex flex-col"
          style={{
            background: 'rgba(2,6,18,0.82)',
            backdropFilter: 'blur(22px) saturate(180%)',
            WebkitBackdropFilter: 'blur(22px) saturate(180%)',
            border: '1px solid rgba(0,217,255,0.10)',
            borderRadius: 10,
            boxShadow: '0 0 48px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.02)',
            padding: '14px 12px',
            minWidth: 186,
            gap: 0,
          }}
        >
          {/* Cabecera panel */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            paddingBottom: 10,
            marginBottom: 8,
            borderBottom: '1px solid rgba(0,217,255,0.08)',
          }}>
            <div style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#00d9ff',
              boxShadow: '0 0 7px #00d9ff',
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.16em',
              color: 'rgba(0,217,255,0.65)',
              textTransform: 'uppercase',
            }}>
              Enfoque Anatómico
            </span>
          </div>

          {/* Línea decorativa — simula scanline */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(0,217,255,0.3), transparent)',
            borderRadius: '10px 10px 0 0',
          }} />

          {/* Botones de zona */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {ZONAS_ANATOMICAS.map((zone) => (
              <ZoneButton
                key={zone.id}
                zone={zone}
                active={externalSelectedZoneId === zone.id}
                onClick={() => handleZoneClick(zone)}
              />
            ))}
          </div>

          {/* Separador */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '10px 0 8px' }} />

          {/* Toggle rotación */}
          <button
            onClick={() => {
              if (!animando) {
                setRotacionActiva((v) => !v)
                if (!rotacionActiva) setVistaSeleccionada(null)
              }
            }}
            disabled={animando}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              padding: '6px 10px',
              borderRadius: 6,
              border: rotacionActiva
                ? '1px solid rgba(0,217,255,0.22)'
                : '1px solid rgba(255,255,255,0.06)',
              background: rotacionActiva ? 'rgba(0,217,255,0.07)' : 'transparent',
              color: animando
                ? 'rgba(255,255,255,0.18)'
                : rotacionActiva
                  ? '#00d9ff'
                  : 'rgba(255,255,255,0.30)',
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              cursor: animando ? 'not-allowed' : 'pointer',
              width: '100%',
              transition: 'all 0.2s',
            }}
          >
            <span style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              flexShrink: 0,
              background: !animando && rotacionActiva ? '#00d9ff' : 'rgba(255,255,255,0.15)',
              boxShadow: !animando && rotacionActiva ? '0 0 6px #00d9ff' : 'none',
              display: 'inline-block',
            }} />
            {animando ? 'Transitando...' : rotacionActiva ? 'Rotación activa' : 'Rotación pausada'}
          </button>
        </div>
      )}

      {/* ── Canvas Three.js ─────────────────────────────────────────────────── */}
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => { gl.setClearColor(0x000000, 0) }}
        camera={{ position: [-0.8, 1.8, 3.8], fov: 45 }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={<Cargador />}>
          <EscenaInteractiva
            hoveredZoneId={hoveredZoneId}
            selectedZoneId={externalSelectedZoneId}
            onZoneHover={setHoveredZoneId}
            onZoneClick={handleZoneClick}
          />
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
          onStart={manejarInteraccionUsuario}
        />
      </Canvas>
    </section>
  )
}
