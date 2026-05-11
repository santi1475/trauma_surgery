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
  /**
   * Ruta estática a la imagen de la prótesis correspondiente a la zona.
   * Solo MANO y HOMBRO están disponibles actualmente; el resto se mostrará
   * con fallback "Imagen no disponible" hasta que se agreguen los archivos.
   */
  imagenProtesis?: string
}

export const ZONAS_ANATOMICAS: ZonaAnatomica[] = [
  {
    id: 'mano',
    label: 'Mano',
    icon: '🖐️',
    // Coords aproximadas — recalibrar con debug={true} y click en consola
    position: [-0.30, 0.20, 0.05],
    hitboxRadius: 0.10,
    categoria: 'Miembro Superior',
    descripcion:
      'Sistemas de osteosíntesis para fracturas de mano y muñeca. Placas y tornillos de bajo perfil específicos para metacarpianos, falanges y radio distal.',
    productos: [
      'Placa Radio Distal Volar',
      'Mini Placas de Mano 1.5 / 2.0 mm',
      'Tornillos Canulados Escafoides',
    ],
    href: '#soluciones',
    color: '#00d9ff',
    vistaIndex: 1,
    meshNames: ['Mano', 'Hand', 'mano', 'hand', 'Wrist', 'wrist', 'Radio', 'Carpo'],
    imagenProtesis: '/IMG/MODEL/MANO.png',
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
    imagenProtesis: '/IMG/MODEL/HOMBRO.png',
  },
  {
    id: 'cadera',
    label: 'Cadera',
    icon: '🦴',
    position: [0.109, 0.134, 0.013],
    hitboxRadius: 0.15,
    categoria: 'Reemplazo Articular',
    descripcion:
      'Sistemas de artroplastia total de cadera y placas de reconstrucción acetabular para fracturas pélvicas complejas y reemplazos protésicos.',
    productos: [
      'Prótesis Total de Cadera',
      'Placa Reconstrucción Pélvica',
      'Tornillo Iliosacro 7.3 mm',
    ],
    href: '#soluciones',
    color: '#00a8cc',
    vistaIndex: 3,
    meshNames: ['Pelvis', 'Hip', 'pelvis', 'Cadera', 'cadera', 'Iliaco', 'Sacrum', 'ilium'],
    // imagenProtesis: '/IMG/MODEL/CADERA.png', // ⚠ falta archivo
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
    vistaIndex: 4,
    meshNames: ['Rodilla', 'Knee', 'Tibia', 'Femur', 'knee', 'tibia', 'femur'],
    // imagenProtesis: '/IMG/MODEL/RODILLA.png', // ⚠ falta archivo
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
    vistaIndex: 5,
    meshNames: ['Pie', 'Foot', 'Calcaneo', 'Tobillo', 'foot', 'calcaneus', 'ankle'],
    // imagenProtesis: '/IMG/MODEL/PIE.png', // ⚠ falta archivo
  },
]
