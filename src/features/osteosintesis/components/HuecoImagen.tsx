// Hueco reservado para una foto del catálogo que aún no tenemos.
//
// El catálogo original mete las fotos de producto DENTRO de la tabla, y la
// proporción de cada una es información de layout: una placa de 118 mm es
// visiblemente más larga que una de 60 mm. Por eso el hueco conserva el ratio
// medido en el bbox del PDF — cuando llegue el asset, entra sin mover nada.

import type { Hueco } from '../data/tipos'

/** Fuera de esta franja no cabe el rótulo largo: se deja solo el correlativo. */
const RATIO_ANCHO = 3.5
const RATIO_ALTO = 0.75
/** Solo las franjas muy estrechas (tornillos) giran el rótulo. */
const RATIO_VERTICAL = 0.35

/**
 * Ancho relativo del hueco dentro de su grupo, en %. Cuando el original dibuja
 * varias piezas a escala en la misma columna, el ancho es información: si todas
 * ocuparan el 100 % se perdería que unas son casi el doble de largas.
 */
export function anchoRelativo(anchos: number[], ancho?: number) {
  if (!ancho || !anchos.length) return undefined
  return `${Math.round((ancho / Math.max(...anchos)) * 100)}%`
}

export function HuecoImagen({
  hueco,
  className = '',
  style,
}: {
  hueco: Hueco
  className?: string
  /** Para fijar el ancho relativo cuando varias fotos comparten columna. */
  style?: React.CSSProperties
}) {
  const compacto = hueco.ratio > RATIO_ANCHO || hueco.ratio < RATIO_ALTO
  const vertical = hueco.ratio < RATIO_VERTICAL

  return (
    <div
      role="img"
      aria-label={`${hueco.alt}. Imagen ${hueco.ref} no disponible.`}
      className={`relative flex w-full items-center justify-center overflow-hidden rounded-md ${className}`}
      style={{
        aspectRatio: String(hueco.ratio),
        // Las placas más finas caen a 11 px de alto en móvil y el correlativo
        // deja de leerse. Una línea mono de 11px necesita 14: se cede esa
        // diferencia, imperceptible en una cinta de 160 px de ancho.
        minHeight: 14,
        border: '1px dashed rgb(var(--ts-accent-deep-rgb)/0.34)',
        background:
          'linear-gradient(135deg, rgb(var(--ts-primary-rgb)/0.22), rgb(var(--ts-bg-deep-rgb)/0.55))',
        ...style,
      }}
    >
      {/* Trama técnica: marca el hueco como reserva deliberada, no como fallo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgb(var(--ts-accent-deep-rgb)/0.16) 0 1px, transparent 1px 7px)',
        }}
      />
      <span
        aria-hidden="true"
        className="relative flex items-center gap-1.5 px-1 text-center leading-none"
        style={{
          fontFamily: 'var(--font-mono)',
          writingMode: vertical ? 'vertical-rl' : undefined,
          transform: vertical ? 'rotate(180deg)' : undefined,
        }}
      >
        <span className="text-[11px] tracking-[0.14em] text-ts-accent-deep">{hueco.ref}</span>
        {!compacto && (
          <span className="text-[11px] tracking-[0.1em] text-white/50">no disponible</span>
        )}
      </span>
    </div>
  )
}
