'use client'
// Tabla de catálogo — 9 columnas, cabecera de 3 niveles con celdas combinadas.
// Réplica de la referencia: la etiqueta HEADLESS SHORT/LONG va DEBAJO de
// THREAD LENGTH / PART No., no encima.
//
// ponytail: scroll horizontal con primera columna sticky. Es lo único que
// funciona igual en móvil y escritorio sin duplicar el markup en tarjetas.

import { Fragment } from 'react'
import type { Celda, FilaTabla, Hueco } from '../data/tipos'
import { anchoRelativo, HuecoImagen } from './HuecoImagen'

import { BORDE, SCROLLER, SCROLLER_STYLE, TD_MONO } from './estilosTabla'

/**
 * Banda de agrupación por diámetro. El catálogo la imprime en verde, pero la
 * paleta de DESIGN.md está cerrada (navy + dos cianes + oro) y prohíbe verde
 * expresamente: se traslada la función — agrupar los dos diámetros — al azul
 * marino de marca con rótulo en cian bright.
 */
const BANDA_DIAMETRO = 'var(--ts-primary)'

function Valor({ celda }: { celda: Celda }) {
  if (!celda) {
    // El em-dash iba a white/25 → 2.15:1 sobre var(--ts-bg-deep), por debajo del mínimo
    // AA. Se deja la celda vacía (como el original) y el dato va a lector de
    // pantalla, en vez de subir el alpha y llenar la tabla de guiones.
    return (
      <>
        <td className="px-2 py-2 text-center">
          <span className="sr-only">No disponible</span>
        </td>
        <td className="px-2 py-2 text-center">
          <span className="sr-only">No disponible</span>
        </td>
      </>
    )
  }
  const [rosca, parte] = celda
  return (
    <>
      <td className="px-2 py-2 text-center text-white/78" style={TD_MONO}>
        {rosca}
      </td>
      <td className="whitespace-nowrap px-3 py-2 text-center text-white" style={TD_MONO}>
        {parte}
      </td>
    </>
  )
}

export function TablaCatalogo({
  filas,
  caption,
  huecos,
}: {
  filas: FilaTabla[]
  caption: string
  /**
   * Fotos de tornillo de la pág. 8. Van en una franja a la izquierda de la
   * tabla, que es donde las pone el original — antes se perdían y el bloque
   * quedaba como una tabla suelta sin producto a la vista.
   *
   * El inset con la cota 'L' del original no se traslada: la nota al pie de la
   * tabla ya explica qué es L, y el diagrama no añade nada.
   */
  huecos?: Hueco[]
}) {
  const th = 'px-2 py-2 text-center text-xs font-bold uppercase tracking-wider text-white/70'

  const tabla = (
    <div
      className={`min-w-0 flex-1 ${SCROLLER}`}
      style={SCROLLER_STYLE}
      // Scrollable: enfocable por teclado para poder recorrerlo sin ratón.
      tabIndex={0}
      role="region"
      aria-label={caption}
    >
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>

        <thead>
          {/* Nivel 1 — diámetros */}
          <tr>
            <th
              rowSpan={3}
              scope="col"
              className="sticky left-0 z-10 px-3 py-2 text-center text-xs font-bold uppercase tracking-wider text-white/80"
              style={{ background: '#061626', borderRight: `1px solid ${BORDE}` }}
            >
              Length
            </th>
            <th
              colSpan={4}
              scope="colgroup"
              className="px-2 py-2 text-center text-[13px] font-bold tracking-[0.12em] text-ts-accent"
              style={{ background: BANDA_DIAMETRO, fontFamily: 'var(--font-mono)' }}
            >
              Ø2.2
            </th>
            <th
              colSpan={4}
              scope="colgroup"
              className="px-2 py-2 text-center text-[13px] font-bold tracking-[0.12em] text-ts-accent"
              style={{
                background: BANDA_DIAMETRO,
                fontFamily: 'var(--font-mono)',
                borderLeft: `1px solid ${BORDE}`,
              }}
            >
              Ø3.0
            </th>
          </tr>

          {/* Nivel 2 — campos */}
          <tr style={{ borderTop: `1px solid ${BORDE}` }}>
            {['Ø2.2 short', 'Ø2.2 long', 'Ø3.0 short', 'Ø3.0 long'].map((grupo) => (
              <Fragment key={grupo}>
                <th scope="col" className={th}>
                  Thread<br />Length
                </th>
                <th scope="col" className={th}>
                  Part No.
                </th>
              </Fragment>
            ))}
          </tr>

          {/* Nivel 3 — variante (debajo, como en la referencia) */}
          <tr style={{ borderTop: `1px solid ${BORDE}` }}>
            {['Headless Short', 'Headless Long', 'Headless Short', 'Headless Long'].map(
              (etiqueta, i) => (
                <th
                  key={i}
                  colSpan={2}
                  scope="colgroup"
                  className="px-2 py-1.5 text-center text-xs uppercase tracking-wider"
                  style={{
                    color: 'var(--ts-accent)',
                    borderLeft: i > 0 ? `1px solid ${BORDE}` : undefined,
                  }}
                >
                  {etiqueta}
                </th>
              ),
            )}
          </tr>
        </thead>

        <tbody>
          {filas.map((f, i) => (
            <tr
              key={f.largo + i}
              style={{
                borderTop: `1px solid ${BORDE}`,
                background: i % 2 ? 'rgb(var(--ts-accent-rgb)/0.02)' : undefined,
              }}
            >
              <th
                scope="row"
                className="sticky left-0 z-10 px-3 py-2 text-center text-sm font-medium text-white"
                style={{
                  background: i % 2 ? '#05141f' : '#040f1c',
                  borderRight: `1px solid ${BORDE}`,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {f.largo}
              </th>
              <Valor celda={f.d22Short} />
              <Valor celda={f.d22Long} />
              <Valor celda={f.d30Short} />
              <Valor celda={f.d30Long} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  if (!huecos?.length) return tabla

  // La franja del original mide 139 pt de ancho pero los tornillos ocupan solo
  // 54, 41 y 18 pt: sin respetar ese ancho relativo los huecos saldrían igual
  // de anchos y desproporcionadamente altos.
  const anchos = huecos.flatMap((h) => (h.ancho ? [h.ancho] : []))

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:gap-7">
      <div className="flex shrink-0 flex-row items-center justify-center gap-6 sm:w-24 sm:flex-col sm:justify-around sm:gap-10">
        {huecos.map((h) => (
          <HuecoImagen
            key={h.ref}
            hueco={h}
            className="w-16 sm:w-full"
            style={{ maxWidth: anchoRelativo(anchos, h.ancho) }}
          />
        ))}
      </div>
      {tabla}
    </div>
  )
}
