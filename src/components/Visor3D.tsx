import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { CameraControls, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { ModelSkeleton } from './ModelSkeleton';
import type { VistaAnatomica } from '@/interface/vistas';
import { VISTAS_ANATOMICAS } from '@/data/vistasAnatomicas';

interface Visor3DProps {
  showPanel?: boolean
  externalViewIndex?: number | null
  externalAutoRotate?: boolean
}

function Cargador() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
        {progress.toFixed(0)}%
      </span>
    </Html>
  );
}

function EscenaInteractiva() {
  const groupRef = useRef<THREE.Group>(null);
  return (
    <group
      ref={groupRef}
      onPointerDown={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        console.log("=== NUEVAS COORDENADAS CAPTURADAS ===");
        console.log(`cameraPosition: [${e.camera.position.x.toFixed(2)}, ${e.camera.position.y.toFixed(2)}, ${e.camera.position.z.toFixed(2)}],`);
        console.log(`target: [${e.point.x.toFixed(2)}, ${e.point.y.toFixed(2)}, ${e.point.z.toFixed(2)}],`);
      }}
    >
      <ModelSkeleton />
    </group>
  );
}

interface RotadorProps {
  rotacionActiva: boolean;
  animando: boolean;
  cameraControlsRef: React.RefObject<CameraControls | null>;
}

function Rotador({ rotacionActiva, animando, cameraControlsRef }: RotadorProps) {
  useFrame((_, delta) => {
    if (rotacionActiva && !animando && cameraControlsRef.current) {
      cameraControlsRef.current.rotate(delta * 0.15, 0, false);
    }
  });
  return null;
}

export default function Visor3D({ showPanel = true, externalViewIndex = null, externalAutoRotate }: Visor3DProps) {
  const cameraControlsRef = useRef<CameraControls>(null);
  const [rotacionActiva, setRotacionActiva] = useState(true);
  const [animando, setAnimando] = useState(false);
  const [vistaSeleccionada, setVistaSeleccionada] = useState<number | null>(null);

  const irAVista = useCallback(async (vista: VistaAnatomica, indiceVista: number) => {
    if (cameraControlsRef.current) {
      setRotacionActiva(false);
      setAnimando(true);
      setVistaSeleccionada(indiceVista);
      await cameraControlsRef.current.setLookAt(...vista.cameraPosition, ...vista.target, true);
      setAnimando(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cameraControlsRef.current) {
        cameraControlsRef.current.setLookAt(
          ...VISTAS_ANATOMICAS[0].cameraPosition,
          ...VISTAS_ANATOMICAS[0].target,
          false
        );
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Control externo de vista
  useEffect(() => {
    if (externalViewIndex !== null && externalViewIndex !== undefined) {
      const vista = VISTAS_ANATOMICAS[externalViewIndex];
      if (vista) irAVista(vista, externalViewIndex);
    }
  }, [externalViewIndex, irAVista]);

  // Control externo de rotación
  useEffect(() => {
    if (externalAutoRotate !== undefined) {
      setRotacionActiva(externalAutoRotate);
      if (externalAutoRotate) setVistaSeleccionada(null);
    }
  }, [externalAutoRotate]);

  const manejarInteraccionUsuario = useCallback(() => {
    if (!animando) {
      setRotacionActiva(false);
      setVistaSeleccionada(null);
    }
  }, [animando]);

  const toggleRotacion = () => {
    if (!animando) {
      setRotacionActiva(!rotacionActiva);
      if (!rotacionActiva) setVistaSeleccionada(null);
    }
  };

  return (
    <section className="relative w-full h-screen" style={{ background: 'linear-gradient(180deg, #041830 0%, #020d1a 40%, #041830 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,82,163,0.25) 0%, transparent 70%)' }} />
      {/* Panel anatómico — ocultable */}
      {showPanel && (
        <div
          className="absolute top-10 right-10 z-10 flex flex-col gap-2 p-4 rounded-xl"
          style={{
            background: 'rgba(2,13,26,0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0,168,204,0.2)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}
        >
          <h3
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: 'rgba(0,168,204,0.7)', fontWeight: 600 }}
          >
            Enfoque Anatómico
          </h3>
          {VISTAS_ANATOMICAS.map((vista, index) => (
            <button
              key={vista.label}
              onClick={() => irAVista(vista, index)}
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
              style={{
                background: vistaSeleccionada === index
                  ? 'rgba(0,168,204,0.15)'
                  : 'transparent',
                color: vistaSeleccionada === index
                  ? 'var(--color-accent)'
                  : 'rgba(255,255,255,0.6)',
                border: vistaSeleccionada === index
                  ? '1px solid rgba(0,168,204,0.4)'
                  : '1px solid transparent',
              }}
            >
              <span>{vista.icon}</span>
              {vista.label}
            </button>
          ))}

          <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />

          <button
            onClick={toggleRotacion}
            disabled={animando}
            className="px-4 py-2 text-xs font-bold rounded-lg transition-all"
            style={{
              background: animando
                ? 'rgba(255,255,255,0.05)'
                : rotacionActiva
                  ? 'rgba(0,168,204,0.1)'
                  : 'rgba(255,255,255,0.05)',
              color: animando
                ? 'rgba(255,255,255,0.3)'
                : rotacionActiva
                  ? 'var(--color-accent)'
                  : 'rgba(255,255,255,0.4)',
              cursor: animando ? 'not-allowed' : 'pointer',
            }}
          >
            {animando ? '⏳ TRANSITANDO...' : rotacionActiva ? '● ROTACIÓN ACTIVA' : '○ ROTACIÓN PAUSADA'}
          </button>
        </div>
      )}

      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        camera={{ position: [-0.8, 1.8, 3.8], fov: 45 }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={<Cargador />}>
          <EscenaInteractiva />
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
  );
}
