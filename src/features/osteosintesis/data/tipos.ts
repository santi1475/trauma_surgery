// Contrato de los modales de Sistemas de Osteosíntesis.
// A diferencia de reemplazo articular, aquí el contenido central es una
// tabla de catálogo (números de parte), no una lista de características.

import type { Imagen, IconoNombre, TextoRico } from '@/features/reemplazo-articular/data/tipos'

export type { Imagen, IconoNombre, TextoRico }

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

export interface SistemaOsteo {
  /** Slug: 'tornillos' | 'clavicula' | … */
  id: string
  /** Título en 2 líneas: la segunda va en cian. */
  titulo: [string, string]
  /** Bajada del título, ej. 'CANNULADO DE COMPRESIÓN'. */
  subtitulo?: string
  descripcion: TextoRico
  imagen: Imagen
  /** Pilares verticales de la columna 1. */
  pilares: Array<{ titulo: string; icono: IconoNombre }>
  /** Tabla de catálogo. Ausente mientras no se transcriba desde el PDF. */
  filas?: FilaTabla[]
  /** Nota bajo la tabla (fuente, unidades…). */
  notaTabla?: TextoRico
}

// ─── Constantes compartidas ───────────────────────────────────────────

export const EYEBROW = 'PLACAS DE OSTEOSÍNTESIS'

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
