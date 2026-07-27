'use client'
// Tabla de placas — arquetipo del catálogo para clavícula (pág. 2) y para las
// placas de tibia proximal 3.5 (pág. 10).
//
//   Shape │ Description │ [Height] │  Item Code   │    Spec
//         │             │          │ Left … Right │ Hole │ Length
//
// Dos cosas del original que hay que respetar y que son fáciles de perder:
//
//  1. La columna Shape cambia de comportamiento según el grupo. En unos la
//     foto está FUSIONADA sobre todas las filas del grupo; en el midshaft de
//     clavícula hay UNA FOTO POR FILA, a escala creciente con la longitud.
//     De ahí `ilustracion: 'grupo' | 'fila'`.
//  2. Hole y Length van fusionados sobre las filas de su bloque (la placa
//     gancho tiene 3 alturas por cada par Hole/Length).

import { Fragment } from 'react'
import type { TablaPlacas as Datos } from '../data/tipos'
import { anchoRelativo, HuecoImagen } from './HuecoImagen'
import { BORDE, BORDE_GRUPO, CABECERA, SCROLLER, SCROLLER_STYLE, TD_MONO, TH } from './estilosTabla'

export function TablaPlacas({ datos }: { datos: Datos }) {
  const usaVariante = datos.grupos.some((g) =>
    g.bloques.some((b) => b.filas.some((f) => f.variante)),
  )
  const colsCodigo = datos.lados.length
  /** Lados que el original rotula pero deja sin ninguna referencia. */
  const ladosVacios = datos.lados.filter((_, li) =>
    datos.grupos.every((g) => g.bloques.every((b) => b.filas.every((f) => !f.codigos[li]))),
  )

  return (
    <figure className="m-0">
      <figcaption
        className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-white/78"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {datos.titulo}
      </figcaption>

      <div
        className={SCROLLER}
        style={SCROLLER_STYLE}
        tabIndex={0}
        role="region"
        aria-label={`Tabla de referencias — ${datos.titulo}`}
      >
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr>
              <th rowSpan={2} scope="col" className={`${TH} min-w-[190px]`} style={{ background: CABECERA }}>
                Shape
              </th>
              <th rowSpan={2} scope="col" className={`${TH} min-w-[190px] text-left`} style={{ background: CABECERA }}>
                Description
              </th>
              {usaVariante && (
                <th rowSpan={2} scope="col" className={TH} style={{ background: CABECERA }}>
                  {datos.columnaVariante ?? 'Variant'}
                </th>
              )}
              <th
                colSpan={colsCodigo}
                scope="colgroup"
                className={TH}
                style={{ background: CABECERA, borderLeft: `1px solid ${BORDE}` }}
              >
                Item Code
              </th>
              <th
                colSpan={2}
                scope="colgroup"
                className={TH}
                style={{ background: CABECERA, borderLeft: `1px solid ${BORDE}` }}
              >
                Spec
              </th>
            </tr>
            <tr>
              {datos.lados.map((lado, i) => (
                <th
                  key={lado}
                  scope="col"
                  className={TH}
                  style={{
                    background: CABECERA,
                    borderTop: `1px solid ${BORDE}`,
                    borderLeft: i === 0 ? `1px solid ${BORDE}` : undefined,
                  }}
                >
                  {lado}
                </th>
              ))}
              {['Hole', 'Length'].map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  className={TH}
                  style={{
                    background: CABECERA,
                    borderTop: `1px solid ${BORDE}`,
                    borderLeft: i === 0 ? `1px solid ${BORDE}` : undefined,
                  }}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>

          {/* Un tbody por grupo: separa semánticamente y permite la regla ancha. */}
          {datos.grupos.map((grupo, gi) => {
            const filasDelGrupo = grupo.bloques.reduce((n, b) => n + b.filas.length, 0)
            const anchos = grupo.bloques.flatMap((b) =>
              b.filas.flatMap((f) => (f.hueco?.ancho ? [f.hueco.ancho] : [])),
            )
            let indiceEnGrupo = -1

            return (
              <tbody key={grupo.descripcion} style={{ borderTop: gi ? `1px solid ${BORDE_GRUPO}` : undefined }}>
                {grupo.bloques.map((bloque, bi) =>
                  bloque.filas.map((fila, fi) => {
                    indiceEnGrupo += 1
                    const primeraDelGrupo = indiceEnGrupo === 0
                    const primeraDelBloque = fi === 0

                    return (
                      <tr
                        key={fila.codigos.join('-')}
                        style={{
                          borderTop:
                            primeraDelBloque && !(primeraDelGrupo && !gi)
                              ? `1px solid ${BORDE}`
                              : undefined,
                        }}
                      >
                        {/* Shape — fusionada por grupo, o una por fila */}
                        {grupo.ilustracion === 'grupo'
                          ? primeraDelGrupo && (
                              <td rowSpan={filasDelGrupo} className="px-4 py-3 align-middle">
                                {grupo.hueco && <HuecoImagen hueco={grupo.hueco} />}
                              </td>
                            )
                          : (
                              <td className="px-4 py-3 align-middle">
                                {fila.hueco && (
                                  <HuecoImagen
                                    hueco={fila.hueco}
                                    style={{ width: anchoRelativo(anchos, fila.hueco.ancho) }}
                                  />
                                )}
                              </td>
                            )}

                        {/* Description — fusionada por grupo */}
                        {primeraDelGrupo && (
                          <td
                            rowSpan={filasDelGrupo}
                            className="px-4 py-3 align-middle text-sm leading-[1.5] text-white/78"
                          >
                            {grupo.descripcion}
                          </td>
                        )}

                        {usaVariante && (
                          <td className="px-3 py-2.5 text-center text-sm text-white/60" style={TD_MONO}>
                            {fila.variante ?? ''}
                          </td>
                        )}

                        {datos.lados.map((lado, li) => (
                          <td
                            key={lado}
                            className="whitespace-nowrap px-3 py-2.5 text-center text-sm text-white"
                            style={{
                              ...TD_MONO,
                              borderLeft: li === 0 ? `1px solid ${BORDE}` : undefined,
                            }}
                          >
                            {/* Los lados que el original nunca rellena quedan
                                en blanco: 22 em-dashes seguidos son ruido. */}
                            {fila.codigos[li] ?? ''}
                          </td>
                        ))}

                        {/* Spec — fusionado por bloque */}
                        {primeraDelBloque && (
                          <Fragment>
                            <td
                              rowSpan={bloque.filas.length}
                              className="px-3 py-2.5 text-center align-middle text-sm text-white/78"
                              style={{ ...TD_MONO, borderLeft: `1px solid ${BORDE}` }}
                            >
                              {bloque.hole}
                            </td>
                            <td
                              rowSpan={bloque.filas.length}
                              className="px-3 py-2.5 text-center align-middle text-sm text-white/78"
                              style={TD_MONO}
                            >
                              {bloque.length}
                            </td>
                          </Fragment>
                        )}
                      </tr>
                    )
                  }),
                )}
              </tbody>
            )
          })}
        </table>
      </div>

      <p className="mt-2.5 text-[11px] leading-[1.6] tracking-[0.06em] text-white/50" style={{ fontFamily: 'var(--font-mono)' }}>
        Hole = orificios · Length = longitud en mm
        {ladosVacios.length > 0 && (
          <>
            {' · '}
            {ladosVacios.join(' y ')} {ladosVacios.length > 1 ? 'son columnas' : 'es una columna'} que
            el catálogo rotula sin publicar referencias
          </>
        )}
      </p>
    </figure>
  )
}
