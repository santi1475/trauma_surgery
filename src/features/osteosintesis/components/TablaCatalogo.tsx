'use client'
// Tabla de catálogo — 9 columnas, cabecera de 3 niveles con celdas combinadas.
// Réplica de la referencia: la etiqueta HEADLESS SHORT/LONG va DEBAJO de
// THREAD LENGTH / PART No., no encima.
//
// ponytail: scroll horizontal con primera columna sticky. Es lo único que
// funciona igual en móvil y escritorio sin duplicar el markup en tarjetas.

import { Fragment } from 'react'
import type { Celda, FilaTabla } from '../data/tipos'

const BORDE = 'rgba(0,217,255,0.16)'
const VERDE = '#2f7d5a' // Acento de agrupación por diámetro (viene de la referencia)

function Valor({ celda }: { celda: Celda }) {
  if (!celda) {
    return (
      <>
        <td className="px-2 py-2 text-center text-white/25" aria-label="No disponible">
          —
        </td>
        <td className="px-2 py-2 text-center text-white/25" aria-label="No disponible">
          —
        </td>
      </>
    )
  }
  const [rosca, parte] = celda
  return (
    <>
      <td className="px-2 py-2 text-center text-white/70">{rosca}</td>
      <td
        className="whitespace-nowrap px-3 py-2 text-center text-white/85"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {parte}
      </td>
    </>
  )
}

export function TablaCatalogo({
  filas,
  caption,
}: {
  filas: FilaTabla[]
  caption: string
}) {
  const th = 'px-2 py-2 text-center text-xs font-bold uppercase tracking-wider text-white/70'

  return (
    <div
      className="overflow-x-auto rounded-xl border"
      style={{ borderColor: BORDE, background: 'rgba(2,11,24,0.6)' }}
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
            <th colSpan={4} scope="colgroup" className="px-2 py-1.5 text-center text-sm font-bold text-white"
                style={{ background: VERDE }}>
              Ø2.2
            </th>
            <th colSpan={4} scope="colgroup" className="px-2 py-1.5 text-center text-sm font-bold text-white"
                style={{ background: VERDE, borderLeft: '2px solid rgba(2,11,24,0.6)' }}>
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
                    color: 'var(--ts-accent, #00d9ff)',
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
                background: i % 2 ? 'rgba(0,217,255,0.02)' : undefined,
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
}
