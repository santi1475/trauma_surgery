// Contrato de datos de las fichas de reemplazo articular.
// Una sola forma para cadera, hombro, mano, rodilla y las que vengan.
// Análisis de origen: .docs/MODALES-ESTRUCTURA.md

// ─── Primitivas ───────────────────────────────────────────────────────

/**
 * Texto con resaltado en cian marcado con llaves.
 * Ej: 'Integración ósea secundaria hasta {70 %}'
 * ponytail: marcador en el string en vez de árbol de nodos — el contenido
 * llega como texto plano del cliente y así se pega sin transformarlo.
 */
export type TextoRico = string

export interface Imagen {
  src: string
  /** Vacío si es puramente decorativa. */
  alt: string
}

/** Nombre de icono de lucide-react. Si no existe, cae al hexágono por defecto. */
export type IconoNombre = string

/** Unidad base: la mayoría de bloques son listas de esto. */
export interface Item {
  titulo?: string
  texto: TextoRico
  icono?: IconoNombre
  imagen?: Imagen
}

// ─── Bloques ──────────────────────────────────────────────────────────

export interface Hero {
  /** Título en 2 líneas: la segunda va en cian. Ej: ['PRÓTESIS', 'DE CADERA'] */
  titulo: [string, string]
  /** Sobrescribe EYEBROW_HERO. Solo para líneas que no son prótesis (placas). */
  eyebrow?: string
  descripcion: TextoRico
  imagen: Imagen
  /** Callouts sobre la imagen (hombro, mano). Posición en % del contenedor. */
  callouts?: Array<{
    label: string
    texto?: string
    top: string
    left: string
    lado: 'izquierda' | 'derecha'
  }>
  /** Banner lateral de refuerzo (hombro, mano). */
  claim?: TextoRico
}

export interface Identidad {
  /** Ej: 'PRÓTESIS DE CADERA' */
  eyebrow: string
  /** 2 líneas: primera blanca, segunda cian. Ej: ['CAPTIV', 'FREELINERS®'] */
  nombreComercial: [string, string]
  tagline: TextoRico
  descripcion?: TextoRico
  imagen: Imagen
}

export interface ComponenteSistema {
  titulo: string
  texto?: TextoRico
  /** Bullets del desglose (variante 'numerado'). */
  bullets?: TextoRico[]
  imagen?: Imagen
  icono?: IconoNombre
}

export interface Sistema {
  /** thumbnails: miniatura + título + desc · numerado: 01–04 con bullets
   *  hotspots: lista ligada a números marcados sobre la imagen */
  variante: 'thumbnails' | 'numerado' | 'hotspots'
  componentes: ComponenteSistema[]
  /** Solo variante 'hotspots': imagen con los números superpuestos. */
  imagen?: Imagen
}

// ─── Ficha completa ───────────────────────────────────────────────────

/**
 * Orden de render fijo (secuencia canónica). Los bloques opcionales
 * ausentes simplemente no se pintan — el renderer no ramifica por producto.
 */
export interface ProductoData {
  /** Slug de la zona: 'cadera' | 'hombro' | … Usado para IDs y rutas. */
  id: string

  hero: Hero              // 1
  identidad: Identidad    // 2
  sistema?: Sistema       // 3
  caracteristicas: Item[] // 4
  // El footer es un badge fijo (BADGE_CALIDAD), no sale de la data.
  //
  // Bloques descartados por el cliente en los 5 productos: "Ingeniería del
  // sistema", "Funciones principales", "Información relevante", "Opciones de
  // tamaño" y la barra de normativas al pie. Existen en .docs/ref/ por si
  // se recuperan.
}

/** Orden canónico de los bloques. El renderer itera sobre esto. */
export const SECUENCIA = ['identidad', 'sistema', 'caracteristicas'] as const

// ─── Constantes compartidas ───────────────────────────────────────────
// Idénticas en las 4 referencias: no se repiten en la data de cada producto.

export const EYEBROW_HERO = 'PRÓTESIS AVANZADAS'

export const CTA_EMAIL = {
  label: 'ENVIAR EMAIL',
  href: 'mailto:traumasurgery.eirl@gmail.com',
} as const

export const NOTA_CONTACTO = 'Contacta con {nosotros} si necesitas más información.'

export const PILARES: Array<{ titulo: string; icono: IconoNombre }> = [
  { titulo: 'TECNOLOGÍA DE VANGUARDIA', icono: 'Cpu' },
  { titulo: 'MATERIALES DE ALTA CALIDAD', icono: 'ShieldCheck' },
  { titulo: 'PRECISIÓN QUIRÚRGICA', icono: 'Crosshair' },
  { titulo: 'MEJORA EN LA CALIDAD DE VIDA', icono: 'UserRound' },
]

/**
 * Badge del footer del detalle. Igual en los 5 modales.
 * PROVISIONAL — el cliente entregará el copy definitivo.
 */
export const BADGE_CALIDAD = {
  texto:
    'Cada implante responde a los mismos {estándares de calidad}: materiales de grado médico, trazabilidad por lote y conformidad con la normativa internacional.',
  icono: 'BadgeCheck' as IconoNombre,
}

export const CERTIFICACIONES = [
  { sigla: 'ISO 13485', texto: 'Gestión de calidad para dispositivos médicos.' },
  { sigla: 'ISO 9001', texto: 'Sistemas de gestión de calidad certificados.' },
  { sigla: 'CE', texto: 'Cumplimiento de la normativa Europea.' },
] as const

export const PAISES = [
  { bandera: '/flags/peru.svg', nombre: 'Perú' },
  { bandera: '/flags/bolivia.svg', nombre: 'Bolivia' },
  { bandera: '/flags/colombia.svg', nombre: 'Colombia' },
  { bandera: '/flags/paraguay.svg', nombre: 'Paraguay' },
] as const

// ─── Resaltado ────────────────────────────────────────────────────────

/**
 * Parte un TextoRico en tramos planos y resaltados.
 * 'Hasta {70 %} de mejora' → [{t:'Hasta ',h:false},{t:'70 %',h:true},{t:' de mejora',h:false}]
 */
export function partirResaltado(texto: TextoRico): Array<{ t: string; h: boolean }> {
  const tramos: Array<{ t: string; h: boolean }> = []
  const re = /\{([^{}]*)\}/g
  let ultimo = 0
  let m: RegExpExecArray | null

  while ((m = re.exec(texto)) !== null) {
    if (m.index > ultimo) tramos.push({ t: texto.slice(ultimo, m.index), h: false })
    if (m[1]) tramos.push({ t: m[1], h: true })
    ultimo = m.index + m[0].length
  }
  if (ultimo < texto.length) tramos.push({ t: texto.slice(ultimo), h: false })

  return tramos
}
