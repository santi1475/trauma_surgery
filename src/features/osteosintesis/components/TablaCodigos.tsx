'use client'
// Lista de referencias — arquetipo del catálogo para húmero (pág. 6) y para
// los tornillos de tibia proximal 3.5 (págs. 10 y 11).
//
//   [foto] Item Code │ Hole │ Length                     (húmero, 1 grupo)
//   [foto] Item Code │ Length  ×3 grupos  │ System       (tornillos 3.5)
//
// La foto NO es decoración fuera de la tabla: en el original va dentro, en una
// franja estrecha a la izquierda de su columna de códigos y centrada
// verticalmente sobre todas las filas. Aquí es una celda con rowSpan.
//
// La columna 'System' del original son corchetes de flechas verticales con el
// rótulo girado en el hueco central. Se reproduce igual; ver la nota sobre los
// rangos en data/tibiaProximal35.ts.

import { Fragment } from 'react'
import type { ColumnaCodigo, RangoSystem, TablaCodigos as Datos } from '../data/tipos'
import { HuecoImagen } from './HuecoImagen'
import { BORDE, CABECERA, SCROLLER, SCROLLER_STYLE, TD_MONO, TH } from './estilosTabla'

/** El original deja sin rotular la columna de códigos en húmero; se rotula. */
const ROTULO: Record<ColumnaCodigo, string> = {
  code: 'Item Code',
  hole: 'Hole',
  length: 'Length',
}

function Corchete({ label }: { label?: string }) {
  return (
    <div className="absolute inset-y-3 left-1/2 flex w-full -translate-x-1/2 flex-col items-center">
      <Punta direccion="arriba" />
      <span className="w-px flex-1" style={{ background: 'rgba(0,168,204,0.42)' }} />
      {label && (
        // Sin cota de altura: si se limita, el texto vertical se parte en
        // varias columnas y se desborda de la celda.
        <span
          className="my-2 min-h-0 flex-none overflow-hidden text-[11px] leading-none tracking-[0.1em] text-white/60"
          style={{
            fontFamily: 'var(--font-mono)',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          {label}
        </span>
      )}
      <span className="w-px flex-1" style={{ background: 'rgba(0,168,204,0.42)' }} />
      <Punta direccion="abajo" />
    </div>
  )
}

function Punta({ direccion }: { direccion: 'arriba' | 'abajo' }) {
  return (
    <svg width="9" height="6" viewBox="0 0 9 6" aria-hidden="true" className="shrink-0">
      <path
        d={direccion === 'arriba' ? 'M4.5 0 9 6H0z' : 'M4.5 6 0 0h9z'}
        fill="rgba(0,168,204,0.6)"
      />
    </svg>
  )
}

/** Celdas de la columna System en la fila `i`, respetando los rowSpan. */
function celdasSystem(system: RangoSystem[] | undefined, i: number) {
  if (!system) return null
  return system.map((r, ri) => {
    if (i === r.desde) {
      return (
        <td
          key={ri}
          rowSpan={r.hasta - r.desde + 1}
          className="relative overflow-hidden px-2 align-middle"
          style={{ width: 40, borderLeft: ri === 0 ? `1px solid ${BORDE}` : undefined }}
        >
          <Corchete label={r.label} />
        </td>
      )
    }
    // Dentro del rango: la celda ya está cubierta por el rowSpan de arriba.
    if (i > r.desde && i <= r.hasta) return null
    return <td key={ri} style={{ borderLeft: ri === 0 ? `1px solid ${BORDE}` : undefined }} />
  })
}

export function TablaCodigos({ datos }: { datos: Datos }) {
  const anchoGrupo = datos.columnas.length + 1 // +1 por la franja de foto
  const conTitulos = datos.grupos.some((g) => g.titulo)
  const totalFilas = Math.max(...datos.grupos.map((g) => g.filas.length))
  const etiqueta = datos.titulo ?? datos.grupos.map((g) => g.titulo).join(', ')

  // Una sola familia de códigos no debe estirarse a todo el ancho del modal:
  // en el catálogo ocupa media página, no la página entera.
  const ancho = datos.grupos.length === 1 ? 'max-w-2xl' : ''

  return (
    <figure className={`m-0 ${ancho}`}>
      {datos.titulo && (
        <figcaption
          className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-white/78"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {datos.titulo}
        </figcaption>
      )}

      <div
        className={SCROLLER}
        style={SCROLLER_STYLE}
        tabIndex={0}
        role="region"
        aria-label={`Tabla de referencias — ${etiqueta}`}
      >
        <table className="w-full border-collapse text-sm" style={{ minWidth: 240 * datos.grupos.length }}>
          <thead>
            {conTitulos && (
              <tr>
                {datos.grupos.map((g, gi) => (
                  <th
                    key={g.titulo ?? gi}
                    colSpan={anchoGrupo}
                    scope="colgroup"
                    className="px-3 py-2 text-left text-[13px] font-bold uppercase tracking-[0.1em] text-[#00d9ff]"
                    style={{
                      background: CABECERA,
                      borderLeft: gi ? `1px solid ${BORDE}` : undefined,
                    }}
                  >
                    {g.titulo}
                  </th>
                ))}
                {datos.system && (
                  <th
                    colSpan={datos.system.length}
                    rowSpan={2}
                    scope="col"
                    className={TH}
                    style={{ background: CABECERA, borderLeft: `1px solid ${BORDE}` }}
                  >
                    System
                  </th>
                )}
              </tr>
            )}
            <tr>
              {datos.grupos.map((g, gi) => (
                <Fragment key={g.titulo ?? gi}>
                  <th
                    aria-hidden="true"
                    className="w-12"
                    style={{
                      background: CABECERA,
                      borderTop: conTitulos ? `1px solid ${BORDE}` : undefined,
                      borderLeft: gi ? `1px solid ${BORDE}` : undefined,
                    }}
                  />
                  {datos.columnas.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className={TH}
                      style={{
                        background: CABECERA,
                        borderTop: conTitulos ? `1px solid ${BORDE}` : undefined,
                      }}
                    >
                      {ROTULO[c]}
                    </th>
                  ))}
                </Fragment>
              ))}
              {datos.system && !conTitulos && (
                <th
                  colSpan={datos.system.length}
                  scope="col"
                  className={TH}
                  style={{ background: CABECERA, borderLeft: `1px solid ${BORDE}` }}
                >
                  System
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: totalFilas }, (_, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${BORDE}` }}>
                {datos.grupos.map((g, gi) => {
                  const fila = g.filas[i]
                  return (
                    <Fragment key={g.titulo ?? gi}>
                      {/* Franja de foto: una sola celda fusionada por grupo. */}
                      {i === 0 && (
                        <td
                          rowSpan={totalFilas}
                          className="px-2 py-3 align-middle"
                          style={{ borderLeft: gi ? `1px solid ${BORDE}` : undefined }}
                        >
                          {g.hueco && <HuecoImagen hueco={g.hueco} />}
                        </td>
                      )}
                      {datos.columnas.map((c) => (
                        <td
                          key={c}
                          className={`whitespace-nowrap px-3 py-2 text-center text-sm ${
                            c === 'code' ? 'text-white' : 'text-white/78'
                          }`}
                          style={TD_MONO}
                        >
                          {fila ? (fila[c] ?? '') : ''}
                        </td>
                      ))}
                    </Fragment>
                  )
                })}
                {celdasSystem(datos.system, i)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {datos.pie && (
        <p className="mt-3 text-right text-sm text-white/78">{datos.pie}</p>
      )}
      <p className="mt-2.5 text-[11px] tracking-[0.06em] text-white/50" style={{ fontFamily: 'var(--font-mono)' }}>
        Length = longitud en mm
      </p>
    </figure>
  )
}
