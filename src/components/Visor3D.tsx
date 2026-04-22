import React, { Suspense } from 'react'; // 1. Importa Suspense de React
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useProgress } from '@react-three/drei';
import { ModelSkeleton } from './ModelSkeleton';

function Cargador() {
  const { progress } = useProgress()
  return <Html center className="text-white font-bold">{progress.toFixed(0)} %</Html>
}

export default function Visor3D() {
  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#FFFFFF' }}>
      <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
        
        <ambientLight intensity={5} />
        <directionalLight position={[5, 10, 15]} intensity={2} />

        {/* Tu esqueleto interactivo tipado */}
        <Suspense fallback={<Cargador />}>
          <ModelSkeleton />
        </Suspense>

        {/* Declaramos los booleanos de forma explícita para satisfacer a TypeScript */}
        <OrbitControls 
          enableDamping={true} 
          dampingFactor={0.05} 
          makeDefault={true}
        />
      </Canvas>
    </div>
  );
}