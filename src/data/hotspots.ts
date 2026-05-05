export interface HotspotData {
  id: string
  label: string
  sublabel?: string
  icon: string
  position: [number, number, number]
  labelOffset: [number, number]  // [x, y] px — centro del círculo ícono
  side: 'left' | 'right'
}

// Posiciones calibradas con debug + rotación PI/2 en Y aplicada matemáticamente
export const HOTSPOTS: HotspotData[] = [
  {
    id: 'craneo',
    label: 'CRÁNEO',
    sublabel: 'Y MAXILOFACIAL',
    icon: '💀',
    position: [-0.007, 0.783, -0.100],
    labelOffset: [130, -55],
    side: 'right',
  },
  {
    id: 'columna',
    label: 'COLUMNA',
    sublabel: 'VERTEBRAL',
    icon: '🦴',
    position: [-0.010, 0.393, 0.095],
    labelOffset: [-130, 0],
    side: 'left',
  },
  {
    id: 'hombro',
    label: 'EXTREMIDADES',
    sublabel: 'SUPERIORES',
    icon: '🦾',
    position: [-0.202, 0.585, 0.055],
    labelOffset: [-130, -25],
    side: 'left',
  },
  {
    id: 'pelvis',
    label: 'PELVIS',
    sublabel: 'Y ACETÁBULO',
    icon: '🦴',
    position: [0.109, 0.134, 0.013],
    labelOffset: [130, 15],
    side: 'right',
  },
  {
    id: 'rodilla',
    label: 'EXTREMIDADES',
    sublabel: 'INFERIORES',
    icon: '🦿',
    position: [0.100, -0.356, -0.041],
    labelOffset: [130, 5],
    side: 'right',
  },
]
