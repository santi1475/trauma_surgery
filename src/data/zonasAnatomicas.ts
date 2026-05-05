export interface ZonaAnatomica {
  id: string
  label: string
  icon: string
  /** Centro aproximado de la zona en espacio 3D del modelo */
  position: [number, number, number]
  /** Radio de la esfera hitbox invisible */
  hitboxRadius: number
  categoria: string
  descripcion: string
  productos: string[]
  href: string
  color: string
  /** Índice en VISTAS_ANATOMICAS al que navega al seleccionar */
  vistaIndex: number
  /**
   * Nombres exactos de los meshes en el GLB exportado desde Blender.
   * Se usan para aplicar hover/emissive por mesh cuando el modelo esté separado.
   * Ver instrucciones en ModelSkeleton.tsx para separar el modelo.
   */
  meshNames?: string[]
}

export const ZONAS_ANATOMICAS: ZonaAnatomica[] = [
  {
    id: 'craneo',
    label: 'Cráneo',
    icon: '💀',
    position: [-0.007, 0.783, -0.100],
    hitboxRadius: 0.11,
    categoria: 'Neurocirugía Craneal',
    descripcion:
      'Placas y tornillos de titanio para reconstrucción craneal y fijación de fragmentos óseos en trauma craneofacial de alta complejidad.',
    productos: [
      'Placas Craneales de Titanio',
      'Tornillos Corticales 1.5 / 2.0 mm',
      'Mallas de Titanio Craneal',
    ],
    href: '#soluciones',
    color: '#00d9ff',
    vistaIndex: 1,
    meshNames: ['Craneo', 'Skull', 'Head', 'skull', 'craneo', 'cranium'],
  },
  {
    id: 'hombro',
    label: 'Hombro',
    icon: '🦴',
    position: [-0.202, 0.585, 0.055],
    hitboxRadius: 0.10,
    categoria: 'Miembro Superior',
    descripcion:
      'Sistemas de placas para fijación de húmero proximal y clavícula. Cabezas humerales anatómicas para reemplazo articular total.',
    productos: [
      'Placa Húmero Proximal LCP',
      'Tornillos Canulados 6.5 mm',
      'Placa Clavícula Anatómica',
    ],
    href: '#soluciones',
    color: '#00c8f0',
    vistaIndex: 2,
    meshNames: ['Hombro', 'Shoulder', 'Humero', 'Clavicle', 'shoulder', 'humerus'],
  },
  {
    id: 'columna',
    label: 'Columna',
    icon: '🦴',
    position: [-0.010, 0.393, 0.095],
    hitboxRadius: 0.13,
    categoria: 'Columna Vertebral',
    descripcion:
      'Implantes para estabilización vertebral, corrección de deformidades espinales y artrodesis lumbar y cervical de mínimo acceso.',
    productos: [
      'Tornillos Pediculares Titanio',
      'Barras de Titanio 5.5 mm',
      'Cajas Intersomáticas TLIF / PLIF',
    ],
    href: '#soluciones',
    color: '#4dd0ff',
    vistaIndex: 3,
    meshNames: ['Columna', 'Spine', 'Vertebra', 'vertebra', 'spine', 'vertebrae'],
  },
  {
    id: 'pelvis',
    label: 'Pelvis',
    icon: '🦴',
    position: [0.109, 0.134, 0.013],
    hitboxRadius: 0.15,
    categoria: 'Trauma Pélvico',
    descripcion:
      'Placas de reconstrucción acetabular y tornillos iliosacros para fracturas pélvicas complejas de alta energía y trauma severo.',
    productos: [
      'Placa Reconstrucción Pélvica',
      'Tornillo Iliosacro 7.3 mm',
      'Placa Acetabular 3.5 mm',
    ],
    href: '#soluciones',
    color: '#00a8cc',
    vistaIndex: 4,
    meshNames: ['Pelvis', 'Hip', 'pelvis', 'Iliaco', 'Sacrum', 'ilium'],
  },
  {
    id: 'rodilla',
    label: 'Rodilla',
    icon: '🦴',
    position: [0.100, -0.356, -0.041],
    hitboxRadius: 0.13,
    categoria: 'Reemplazo Articular',
    descripcion:
      'Sistemas de artroplastia total y parcial de rodilla de alta durabilidad con polietileno de alto entrecruzamiento.',
    productos: [
      'Prótesis Total de Rodilla',
      'Placa Tibial Proximal LCP',
      'Tornillo Femoral Distal 6.5 mm',
    ],
    href: '#soluciones',
    color: '#0099cc',
    vistaIndex: 5,
    meshNames: ['Rodilla', 'Knee', 'Tibia', 'Femur', 'knee', 'tibia', 'femur'],
  },
  {
    id: 'pie',
    label: 'Pie y Tobillo',
    icon: '🦶',
    position: [0.080, -0.72, -0.020],
    hitboxRadius: 0.10,
    categoria: 'Pie y Tobillo',
    descripcion:
      'Placas anatómicas de bajo perfil para fracturas de calcáneo, astrágalo y metatarsianos. Diseño específico por lateralidad.',
    productos: [
      'Placa Calcáneo Anatómica',
      'Tornillos Calcáneo 4.5 mm',
      'Placa Maleolar Fibular',
    ],
    href: '#soluciones',
    color: '#0077aa',
    vistaIndex: 6,
    meshNames: ['Pie', 'Foot', 'Calcaneo', 'Tobillo', 'foot', 'calcaneus', 'ankle'],
  },
]
