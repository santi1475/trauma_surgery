// Contrato de los modales de Sistemas de Osteosíntesis.
// A diferencia de reemplazo articular, aquí el contenido central es una
// tabla de catálogo (números de parte), no una lista de características.

import type { Imagen, IconoNombre, TextoRico, DocumentoPDF } from '@/features/reemplazo-articular/data/tipos'

export type { Imagen, IconoNombre, TextoRico, DocumentoPDF }

/** Celda de la tabla: [longitud de rosca, número de parte]. null = no aplica. */
export type Celda = [number, string] | null

export interface FilaTabla {
  /** Longitud del tornillo, ej. '22mm'. */
  largo: string
  d22Short: Celda
  d22Long: Celda
  d30Short: Celda
  d30Long: Celda
}

// ─── Huecos de ilustración ────────────────────────────────────────────
// El catálogo coloca fotos de producto dentro de la propia tabla. Aquí se
// reservan con su proporción real (medida en el bbox del PDF) para que el
// layout no cambie cuando lleguen los assets definitivos.

export interface Hueco {
  /** Correlativo del hueco dentro del sistema, ej. '001'. */
  ref: string
  /** ancho / alto tomado del bbox del PDF. */
  ratio: number
  /**
   * Ancho en puntos del bbox del PDF. Solo hace falta cuando varias fotos
   * comparten columna a escala 1:1 y su ancho relativo es información: el
   * midshaft de clavícula dibuja siete placas y la de 118 mm se ve casi el
   * doble de larga que la de 64 mm. Sin esto todas saldrían igual de anchas.
   */
  ancho?: number
  /** Qué ilustra, para el alt del asset futuro. */
  alt: string
}

// ─── Arquetipo A — tabla de placas con columna Shape ──────────────────
// Clavícula (pág. 2) y placas de tibia proximal 3.5 (pág. 10).

/** Fila de códigos. 1 código = sin lado · 2 = Left / Right. */
export interface FilaPlaca {
  /** Subvariante dentro del bloque, ej. 'Height 12 mm'. */
  variante?: string
  codigos: string[]
  /** Solo cuando el original ilustra fila por fila. */
  hueco?: Hueco
}

/** Hole y Length fusionados sobre una o varias filas. */
export interface BloquePlaca {
  hole: number
  length: number
  filas: FilaPlaca[]
}

export interface GrupoPlacas {
  descripcion: string
  /** 'grupo' = una foto fusionada sobre todo el grupo · 'fila' = una por fila. */
  ilustracion: 'grupo' | 'fila'
  /** Solo si ilustracion === 'grupo'. */
  hueco?: Hueco
  bloques: BloquePlaca[]
}

export interface TablaPlacas {
  titulo: string
  /**
   * Rótulos de las columnas de código bajo 'Item Code'. Clavícula imprime tres
   * (Left / Common / Right) aunque solo publique dos códigos por fila: la
   * columna sobrante queda vacía, igual que en el original.
   */
  lados: string[]
  /** Rótulo de la columna de variante, cuando el grupo la usa. */
  columnaVariante?: string
  grupos: GrupoPlacas[]
}

// ─── Arquetipo B — lista de referencias ───────────────────────────────
// Húmero (pág. 6) y los tornillos de tibia proximal 3.5 (págs. 10–11).

export type ColumnaCodigo = 'code' | 'hole' | 'length'

export interface FilaCodigo {
  code: string
  hole?: number
  length: number
}

export interface GrupoCodigos {
  /** Cabecera del grupo, ej. '3.5 Conical Screw'. Ausente en húmero. */
  titulo?: string
  /** Foto vertical a la izquierda de la columna de códigos. */
  hueco?: Hueco
  filas: FilaCodigo[]
}

/** Corchete vertical de la columna 'System': rango de filas + rótulo. */
export interface RangoSystem {
  /** Ausente cuando el original dibuja el corchete sin rotularlo (pág. 11). */
  label?: string
  /** Índices de fila, inclusivos, base 0. */
  desde: number
  hasta: number
}

export interface TablaCodigos {
  titulo?: string
  columnas: ColumnaCodigo[]
  grupos: GrupoCodigos[]
  /** Columna 'System' compartida por todos los grupos. */
  system?: RangoSystem[]
  /** Descripción al pie, como en húmero. */
  pie?: string
}

// ─── Instrumental ─────────────────────────────────────────────────────

export interface Bandeja {
  titulo: string
  code: string
  hueco: Hueco
}

export interface Instrumental {
  titulo?: string
  /** 2 = rejilla 2×2 (clavícula, pág. 3) · 4 = fila (húmero y tibia). */
  columnas: 2 | 4
  bandejas: Bandeja[]
}

// ─── Ficha del sistema ────────────────────────────────────────────────

export type Categoria =
  | 'placas'
  | 'tornillos'
  | 'ligamentos'
  | 'anclajes'
  | 'pequenas-articulaciones'
  | 'menisco'

export interface SistemaOsteo {
  /** Slug: 'tornillos' | 'clavicula' | … */
  id: string
  /** Grupo de la rejilla; ver GRUPOS en sistemas.ts. */
  categoria: Categoria
  /** Título en 2 líneas: la segunda va en cian. */
  titulo: [string, string]
  /** Bajada del título, ej. 'CANNULADO DE COMPRESIÓN'. */
  subtitulo?: string
  descripcion: TextoRico
  imagen: Imagen
  /** Pilares verticales de la columna 1. */
  pilares: Array<{ titulo: string; icono: IconoNombre }>
  /** Página del PDF de origen, para trazabilidad. */
  fuente?: string
  /** Arquetipo C — matriz de tornillos cannulados (pág. 8). */
  filas?: FilaTabla[]
  /** Huecos de la banda de fotos que acompaña a la matriz de tornillos. */
  huecosTornillos?: Hueco[]
  /** Arquetipo A — una o varias tablas de placas. */
  placas?: TablaPlacas[]
  /** Arquetipo B — una o varias listas de referencias. */
  codigos?: TablaCodigos[]
  instrumental?: Instrumental
  /** Nota bajo la tabla (fuente, unidades…). */
  notaTabla?: TextoRico
  /** Documento PDF oficial asociado para consulta técnica o descarga. */
  pdf?: DocumentoPDF
}

// ─── Constantes compartidas ───────────────────────────────────────────

/** Banda inferior — igual en los 5 modales (viene de la referencia del cliente). */
export const ATRIBUTOS: Array<{ titulo: string; texto: string; icono: IconoNombre }> = [
  { titulo: 'MATERIALES DE ALTA CALIDAD', texto: 'Titanio grado médico', icono: 'Atom' },
  { titulo: 'PRECISIÓN QUIRÚRGICA', texto: 'Diseños anatómicos', icono: 'Crosshair' },
  { titulo: 'BIOCOMPATIBLES', texto: 'Resistentes y seguros', icono: 'ShieldCheck' },
  { titulo: 'COMPATIBILIDAD', texto: 'Instrumental universal', icono: 'Share2' },
  { titulo: 'CERTIFICACIÓN CE', texto: 'ISO 5832 e ISO 13485', icono: 'BadgeCheck' },
]

/** Pilares por defecto — los de la referencia del sistema de tornillos. */
export const PILARES_OSTEO: Array<{ titulo: string; icono: IconoNombre }> = [
  { titulo: 'COMPRESIÓN CONTROLADA', icono: 'Triangle' },
  { titulo: 'DISEÑO ANATÓMICO', icono: 'Ruler' },
  { titulo: 'ALTA RESISTENCIA', icono: 'ShieldCheck' },
  { titulo: 'FIJACIÓN SEGURA', icono: 'Crosshair' },
]

/** Pilares de los sistemas de placas (rótulos del catálogo PDF). */
export const PILARES_PLACAS: Array<{ titulo: string; icono: IconoNombre }> = [
  { titulo: 'ÁNGULO VARIABLE', icono: 'Compass' },
  { titulo: 'DISEÑO ANATÓMICO', icono: 'Ruler' },
  { titulo: 'ALTA RESISTENCIA', icono: 'ShieldCheck' },
]

/**
 * Pilares de artroscopia y anclajes (catálogos de 2026-09-10). Sus portadas
 * imprimen los mismos tres rótulos que las placas, pero «ángulo variable» no
 * describe una aguja de sutura ni un botón cortical: se sustituye.
 */
export const PILARES_ARTRO: Array<{ titulo: string; icono: IconoNombre }> = [
  { titulo: 'FIJACIÓN SEGURA', icono: 'Crosshair' },
  { titulo: 'DISEÑO ANATÓMICO', icono: 'Ruler' },
  { titulo: 'ALTA RESISTENCIA', icono: 'ShieldCheck' },
]
