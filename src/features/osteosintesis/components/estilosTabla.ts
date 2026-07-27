// Tokens compartidos por las tablas de catálogo.
// Salen de DESIGN.md. La regla Border-Is-Depth manda: donde otro sistema
// pondría una sombra, este pone 1px de cian bright con alpha. No se inventa
// un borde en cian deep — border-hud-soft/strong son los dos únicos valores.

/** border-hud-soft de DESIGN.md (#00d9ff2e). */
export const BORDE = 'rgba(0,217,255,0.18)'
/** border-hud-strong (#00d9ff4d) — separador entre grupos, la regla ancha del PDF. */
export const BORDE_GRUPO = 'rgba(0,217,255,0.30)'
export const SUPERFICIE = 'rgba(2,11,24,0.6)'
export const CABECERA = '#061626'
/** Radio máximo del sistema para contenedores anchos. */
export const RADIO = '10px'

/** Cabecera de columna: etiqueta mono en mayúsculas, 11px, alpha ≥ 50 %. */
export const TH =
  'px-3 py-2 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-white/60'

/** Celda de dato numérico o código: mono tabular. */
export const TD_MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontVariantNumeric: 'tabular-nums',
}

/**
 * Envoltorio con scroll horizontal. Es enfocable por teclado para poder
 * recorrer la tabla sin ratón, así que necesita foco visible propio: mismo
 * anillo cian al 30 % que los campos de formulario en DESIGN.md.
 */
export const SCROLLER =
  'overflow-x-auto border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
export const SCROLLER_STYLE: React.CSSProperties = {
  borderColor: BORDE,
  background: SUPERFICIE,
  borderRadius: RADIO,
  ['--tw-ring-color' as string]: 'rgba(0,217,255,0.30)',
  ['--tw-ring-offset-color' as string]: '#020b18',
}
