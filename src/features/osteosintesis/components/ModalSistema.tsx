'use client'
// Modal de un sistema de osteosíntesis.
// Col 1 (estrecha): título + imagen de impacto + pilares verticales.
// Col 2 (ancha):    catálogo oficial en PDF.
// Abajo:            banda de atributos, a ancho completo.
//
// El PDF del fabricante manda: si el sistema trae `pdf`, se muestra ese
// documento y nada más. Las tablas transcritas (TablaPlacas / TablaCodigos /
// TablaCatalogo / BloqueInstrumental) siguen en el repositorio y se pintan
// como respaldo cuando un sistema todavía no tiene su PDF asignado.

import { useId } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { icono } from '@/components/iconos'
import VisorPDF from '@/components/VisorPDF'
import ModalProducto from '@/features/reemplazo-articular/components/ModalProducto'
import { TextoRico } from '@/features/reemplazo-articular/components/TextoRico'
import { BloqueInstrumental } from './BloqueInstrumental'
import { BORDE, RADIO, SUPERFICIE } from './estilosTabla'
import { TablaCatalogo } from './TablaCatalogo'
import { TablaCodigos } from './TablaCodigos'
import { TablaPlacas } from './TablaPlacas'
import { getSistema } from '../data/sistemas'
import { ATRIBUTOS, type IconoNombre, type SistemaOsteo } from '../data/tipos'

/** Un sistema tiene catálogo si trae cualquiera de los tres arquetipos. */
function tieneCatalogo(s: SistemaOsteo) {
  return Boolean(s.filas || s.placas?.length || s.codigos?.length)
}

function Icono({ nombre, size = 18 }: { nombre?: IconoNombre; size?: number }) {
  const C = icono(nombre)
  return <C size={size} color="#00d9ff" strokeWidth={1.5} aria-hidden="true" />
}

/** Hexágono con icono — misma marca visual que en reemplazo articular. */
function Hex({ nombre, size = 44 }: { nombre?: IconoNombre; size?: number }) {
  return (
    <span
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <polygon
          points="50,4 92,28 92,72 50,96 8,72 8,28"
          fill="rgba(0,217,255,0.06)"
          stroke="rgba(0,217,255,0.4)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
      <span className="relative">
        <Icono nombre={nombre} size={Math.round(size * 0.4)} />
      </span>
    </span>
  )
}

const COL: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}
const REDUCIDO: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
}

interface Props {
  sistema: string
  open: boolean
  onClose: () => void
}

export default function ModalSistema({ sistema, open, onClose }: Props) {
  const titleId = useId()
  const prefersReduced = useReducedMotion()
  const vars = prefersReduced ? REDUCIDO : COL
  const datos = getSistema(sistema)

  if (!datos) return null

  return (
    <ModalProducto open={open} onClose={onClose} titleId={titleId}>
      <section
        className="px-6 pb-10 pt-12 sm:px-10 lg:px-14"
        style={{ background: 'var(--bg-deep, #020b18)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-96"
          style={{
            background:
              'radial-gradient(60% 60% at 30% 0%, rgba(0,217,255,0.10), transparent 70%)',
          }}
        />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
          {/* ── Col 1 — identidad + imagen + pilares ── */}
          <motion.div
            variants={vars}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4"
          >
            {/* Sin etiqueta sobre el título: repetía palabra por palabra el
                subtítulo que ya va debajo, y el título se sostiene solo. */}
            <h2
              id={titleId}
              className="font-black leading-[1.05] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="block text-xl text-[#00d9ff] md:text-2xl">
                {datos.titulo[0]}
              </span>
              <span className="mt-1 block break-words text-3xl text-white md:text-4xl">
                {datos.titulo[1]}
              </span>
            </h2>

            {datos.subtitulo && (
              <p
                className="mt-2 text-sm uppercase tracking-[0.14em] text-white/55"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {datos.subtitulo}
              </p>
            )}

            <div
              className="mt-4 h-px w-16"
              style={{ background: 'var(--ts-accent, #00d9ff)' }}
              aria-hidden="true"
            />

            <p className="mt-4 max-w-sm text-[13px] leading-[1.7] text-white/60">
              <TextoRico texto={datos.descripcion} />
            </p>

            {/* Imagen de impacto — columna estrecha, formato vertical */}
            <div
              // En móvil las dos columnas se apilan: en formato vertical la imagen
              // empujaba el catálogo casi una pantalla hacia abajo.
              className="relative mt-7 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border lg:aspect-[3/4]"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(0,217,255,0.14), transparent 72%), linear-gradient(180deg, rgba(10,30,48,0.8), rgba(2,11,24,0.95))',
                borderColor: 'rgba(0,217,255,0.20)',
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,217,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.5) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <img
                src={datos.imagen.src}
                alt={datos.imagen.alt}
                loading="lazy"
                decoding="async"
                className="relative h-full w-full object-cover"
              />
            </div>

            {/* Pilares — verticales, como en la referencia */}
            <ul className="mt-7 flex flex-col gap-4" aria-label="Atributos del sistema">
              {datos.pilares.map((p) => (
                <li key={p.titulo} className="flex items-center gap-3">
                  <Hex nombre={p.icono} size={38} />
                  <span
                    className="text-[11px] uppercase leading-[1.4] tracking-[0.12em] text-white/50"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {p.titulo}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 2 — catálogo oficial en PDF (tabla solo como respaldo) ── */}
          <motion.div
            variants={vars}
            initial="hidden"
            animate="visible"
            className="min-w-0 lg:col-span-8"
          >
            {datos.pdf ? (
              <VisorPDF documento={datos.pdf} altura="min(78vh, 820px)" />
            ) : tieneCatalogo(datos) ? (
              // Bloques en el mismo orden en que salen en el catálogo:
              // placas → tornillería → matriz → instrumental.
              <div className="flex flex-col gap-12">
                {datos.placas?.map((t) => <TablaPlacas key={t.titulo} datos={t} />)}

                {datos.codigos?.map((t, i) => (
                  <TablaCodigos key={t.titulo ?? i} datos={t} />
                ))}

                {datos.filas && (
                  <div>
                    <TablaCatalogo
                      filas={datos.filas}
                      caption={`Catálogo de referencias — ${datos.titulo.join(' ')}`}
                      huecos={datos.huecosTornillos}
                    />
                    {datos.notaTabla && (
                      <p className="mt-3 text-xs text-white/50">
                        <TextoRico texto={datos.notaTabla} />
                      </p>
                    )}
                  </div>
                )}

                {datos.instrumental && <BloqueInstrumental datos={datos.instrumental} />}

                {datos.fuente && (
                  <p
                    className="text-[11px] tracking-[0.08em] text-white/50"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Fuente: {datos.fuente}
                  </p>
                )}
              </div>
            ) : (
              // Red de seguridad: un sistema sin PDF y sin tabla. Hoy no se
              // pinta, pero los 5 sistemas comentados en sistemas.ts volverán
              // por aquí mientras no tengan documento asignado.
              <div
                className="flex min-h-[320px] items-center justify-center border p-8 text-center"
                style={{
                  borderColor: BORDE,
                  background: SUPERFICIE,
                  borderRadius: RADIO,
                }}
              >
                <p className="max-w-sm text-sm leading-relaxed text-white/45">
                  Catálogo de referencias en preparación. Escríbanos para recibir la
                  ficha técnica completa de este sistema.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Banda de atributos — igual en los 5 ── */}
      <section
        className="border-t px-6 py-8 sm:px-10 lg:px-14"
        style={{ borderColor: 'rgba(0,217,255,0.14)' }}
        aria-label="Garantías del sistema"
      >
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {ATRIBUTOS.map((a) => (
            <li key={a.titulo} className="flex items-start gap-3">
              <Hex nombre={a.icono} size={36} />
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase leading-snug tracking-wide text-white">
                  {a.titulo}
                </p>
                <p className="mt-0.5 text-xs text-white/50">{a.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </ModalProducto>
  )
}
