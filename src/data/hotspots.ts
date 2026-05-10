export interface HotspotData {
  id: string
  label: string
  sublabel?: string
  icon: string

  /** Posición 3D en el modelo (mundo Three.js). */
  position: [number, number, number]

  /** [x, y] px — centro del círculo ícono respecto al hotspot 3D proyectado. */
  labelOffset: [number, number]

  /** Lado donde nace el texto desde el círculo. */
  side: 'left' | 'right'

  // ── Línea conectora (todos opcionales) ─────────────────────────────────

  /**
   * Forma del trazo entre hotspot y círculo:
   *  - 'elbow'    : horizontal → diagonal hasta borde del círculo (default)
   *  - 'straight' : recta directa desde el hotspot al borde del círculo
   *  - 'l-shape'  : horizontal → vertical (escuadra 90°)
   */
  lineShape?: 'elbow' | 'straight' | 'l-shape'

  /** Posición del codo a lo largo del eje X (0..1). Default 0.5. Solo aplica a 'elbow' / 'l-shape'. */
  elbowAt?: number

  /** Grosor base de la línea (px). Default 0.7 (1.2 en hover/selected). */
  lineWidth?: number

  /** Línea discontinua cuando no está activa. Default true. */
  dashed?: boolean

  // ── Texto ──────────────────────────────────────────────────────────────

  /** Gap entre borde del círculo y texto (px). Default 10. */
  textGap?: number

  /** Desplazamiento vertical del bloque de texto vs centro del círculo (px). Default -22. */
  textVerticalOffset?: number

  /** Ancho máximo del texto en px. Si se define, permite wrap (deja de ser nowrap). */
  textMaxWidth?: number

  // ── Círculo ────────────────────────────────────────────────────────────

  /** Radio del círculo ícono (px). Default 29. */
  circleRadius?: number

  /** Tamaño del ícono interno (px). Default 22. */
  iconSize?: number
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
