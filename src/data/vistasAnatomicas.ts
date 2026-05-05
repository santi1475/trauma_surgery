import type { VistaAnatomica } from '@/interface/vistas';

// Posiciones actualizadas para modelo3.glb normalizado (1.8u) + rotación PI/2 en Y
export const VISTAS_ANATOMICAS: VistaAnatomica[] = [
  {
    label: 'Vista General',
    icon: '🦴',
    cameraPosition: [0, 0.2, 2.4],
    target: [0, 0.2, 0],
  },
  {
    label: 'Cráneo',
    icon: '💀',
    cameraPosition: [0, 0.85, 1.0],
    target: [-0.007, 0.783, 0],
  },
  {
    label: 'Hombro',
    icon: '🦴',
    cameraPosition: [-0.15, 0.65, 0.95],
    target: [-0.202, 0.585, 0],
  },
  {
    label: 'Columna',
    icon: '🦴',
    cameraPosition: [0.5, 0.42, 0.75],
    target: [-0.010, 0.393, 0],
  },
  {
    label: 'Pelvis',
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
