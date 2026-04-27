import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { CameraControls, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { ModelSkeleton } from './ModelSkeleton';
import type { VistaAnatomica } from '@/interface/vistas';
import { VISTAS_ANATOMICAS } from '@/data/vistasAnatomicas';



function Cargador() {
  const { progress } = useProgress();
  return <Html center className="text-black font-bold">{progress.toFixed(0)} %</Html>;
}

// --- COMPONENTE DEL MODELO ---
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

// --- ROTADOR ---
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

// --- COMPONENTE PRINCIPAL ---
export default function Visor3D() {
  const cameraControlsRef = useRef<CameraControls>(null);
  const [rotacionActiva, setRotacionActiva] = useState(true);
  const [animando, setAnimando] = useState(false);
  const [vistaSeleccionada, setVistaSeleccionada] = useState<number | null>(null);

  const irAVista = useCallback(async (vista: VistaAnatomica, indiceVista: number) => {
    if (cameraControlsRef.current) {
      setRotacionActiva(false);
      setAnimando(true);
      setVistaSeleccionada(indiceVista);
      
      await cameraControlsRef.current.setLookAt(
        ...vista.cameraPosition,
        ...vista.target,
        true
      );
      
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

  const manejarInteraccionUsuario = useCallback(() => {
    if (!animando) {
      setRotacionActiva(false);
      setVistaSeleccionada(null);
    }
  }, [animando]);

  const toggleRotacion = () => {
    if (!animando) {
      setRotacionActiva(!rotacionActiva);
      if (!rotacionActiva) {
        setVistaSeleccionada(null);
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-white">
      {/* UI: BOTONES DE VISTA */}
      <div className="absolute top-10 right-10 z-10 flex flex-col gap-2 p-4 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Enfoque Anatómico</h3>
        {VISTAS_ANATOMICAS.map((vista, index) => (
          <button
            key={vista.label}
            onClick={() => irAVista(vista, index)}
            className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              vistaSeleccionada === index 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>{vista.icon}</span>
            {vista.label}
          </button>
        ))}
        
        <hr className="my-2 border-gray-100" />
        
        <button
          onClick={toggleRotacion}
          disabled={animando}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            animando 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : rotacionActiva 
                ? 'bg-blue-50 text-blue-600' 
                : 'bg-gray-100 text-gray-500'
          }`}
        >
          {animando ? '⏳ TRANSITANDO...' : rotacionActiva ? '🟢 ROTACIÓN ACTIVA' : '⚪ ROTACIÓN PAUSADA'}
        </button>
      </div>

      {/* CANVAS 3D */}
      <Canvas 
        shadows 
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
        camera={{ position: [-0.8, 1.8, 3.8], fov: 45 }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
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
    </div>
  );
}