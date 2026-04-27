import type { VistaAnatomica } from '@/interface/vistas';

export const VISTAS_ANATOMICAS: VistaAnatomica[] = [
  {
    label: 'Vista General',
    icon: '🦴',
    cameraPosition: [-0.8, 1.8, 3.8],
    target: [0, -0.3, 0],
  },
  {
    label: 'Cráneo',
    icon: '💀',
    cameraPosition: [-0.4, 0.8, 1],
    target: [0.2, 1.07, 0.13],
  },
  {
    label: 'Hombro',
    icon: '🦴',
    cameraPosition: [1.5, 1.3, 1],
    target: [0.9, 0.59, -0.06],
  },
  {
    label: 'Columna',
    icon: '🦴',
    cameraPosition: [1.8, 1.2, 0],
    target: [0, 1, 0],
  },
  {
    label: 'Pelvis',
    icon: '🦴',
    cameraPosition: [0, 0.8, 2],
    target: [0, 0.2, 0],
  },
  {
    label: 'Rodilla',
    icon: '🦴',
    cameraPosition: [0.5, -0.5, 1.5],
    target: [0.2, -0.8, 0],
  },
  {
    label: 'Pie',
    icon: '🦶',
    cameraPosition: [0, -1.2, 1],
    target: [0, -1.8, 0],
  }
];
