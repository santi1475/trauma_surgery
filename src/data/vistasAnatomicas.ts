import type { VistaAnatomica } from '@/interface/vistas';

// Posiciones para modelo3.glb normalizado (1.8u) + rotación PI/2 en Y.
// Solo zonas habilitadas: MANO, HOMBRO, CADERA, RODILLA, PIE.
export const VISTAS_ANATOMICAS: VistaAnatomica[] = [
  {
    label: 'Vista General',
    icon: '🦴',
    cameraPosition: [0, 0.2, 2.4],
    target: [0, 0.2, 0],
  },
  {
    // ⚠ Estimado — recalibrar con debug={true}
    label: 'Mano',
    icon: '🖐️',
    cameraPosition: [-0.45, 0.30, 0.85],
    target: [-0.30, 0.20, 0],
  },
  {
    label: 'Hombro',
    icon: '🦴',
    cameraPosition: [-0.15, 0.65, 0.95],
    target: [-0.202, 0.585, 0],
  },
  {
    label: 'Cadera',
    icon: '🦴',
    cameraPosition: [0.1, 0.15, 1.05],
    target: [0.109, 0.134, 0],
  },
  {
    label: 'Rodilla',
    icon: '🦴',
    cameraPosition: [0.1, -0.35, 0.95],
    target: [0.100, -0.356, 0],
  },
  {
    label: 'Pie',
    icon: '🦶',
    cameraPosition: [0, -0.70, 0.85],
    target: [0.080, -0.72, 0],
  },
];
