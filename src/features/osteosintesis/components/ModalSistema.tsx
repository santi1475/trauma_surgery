'use client'
// Modal de un sistema de osteosíntesis.
// Col 1 (estrecha): título + imagen de impacto + pilares verticales.
// Col 2 (ancha):    tabla de catálogo.
// Abajo:            banda de atributos, a ancho completo.

import { useState, useId } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import * as Iconos from 'lucide-react'
import VisorPDF from '@/components/VisorPDF'
import ModalProducto from '@/features/reemplazo-articular/components/ModalProducto'
import { TextoRico } from '@/features/reemplazo-articular/components/TextoRico'
import { BloqueInstrumental } from './BloqueInstrumental'
import { BORDE, RADIO, SUPERFICIE } from './estilosTabla'
import { TablaCatalogo } from './TablaCatalogo'
import { TablaCodigos } from './TablaCodigos'
import { TablaPlacas } from './TablaPlacas'
import { getSistema } from '../data/sistemas'
import { ATRIBUTOS, EYEBROW, type IconoNombre, type SistemaOsteo } from '../data/tipos'

/** Un sistema tiene catálogo si trae cualquiera de los tres arquetipos. */
export function tieneCatalogo(s: SistemaOsteo) {
  return Boolean(s.filas || s.placas?.length || s.codigos?.length)
}

function Icono({ nombre, size = 18 }: { nombre?: IconoNombre; size?: number }) {
  const C =
    (nombre && (Iconos as unknown as Record<string, Iconos.LucideIcon>)[nombre]) ||
    Iconos.Hexagon
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
  const [vista, setVista] = useState<'tabla' | 'pdf'>('tabla')
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
            <p
              className="text-xs uppercase tracking-[0.22em] text-white/45"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {EYEBROW}
            </p>

            <h2
              id={titleId}
              className="mt-3 font-black leading-[1.05] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="block text-xl text-cyan-400 md:text-2xl">
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
              className="relative mt-7 flex aspect-[3/4] items-center justify-center overflow-hidden rounded-2xl border"
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
              {/* ponytail: placeholder hasta que lleguen los renders del cliente. */}
              <img
                src={datos.imagen.src}
                alt={datos.imagen.alt}
                loading="lazy"
                decoding="async"
                className="relative h-full w-full object-contain p-6"
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

          {/* ── Col 2 — tabla de catálogo / visor PDF ── */}
          <motion.div
            variants={vars}
            initial="hidden"
            animate="visible"
            className="min-w-0 lg:col-span-8"
          >
            {/* Switch de modo si el sistema tiene PDF asociado */}
            {datos.pdf && (
              <div
                className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-2"
                style={{
                  borderColor: 'rgba(0, 217, 255, 0.18)',
                  background: 'linear-gradient(180deg, rgba(10,30,48,0.5), rgba(2,11,24,0.75))',
                }}
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setVista('tabla')}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                      vista === 'tabla'
                        ? 'bg-[#00d9ff] text-[#020b18] shadow-[0_0_16px_rgba(0,217,255,0.35)]'
                        : 'text-white/60 hover:text-white'
                    }`}
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    <Iconos.TableProperties size={14} aria-hidden="true" />
                    <span>Ficha de Referencias</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVista('pdf')}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                      vista === 'pdf'
                        ? 'bg-[#00d9ff] text-[#020b18] shadow-[0_0_16px_rgba(0,217,255,0.35)]'
                        : 'text-white/60 hover:text-white'
                    }`}
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    <Iconos.FileText size={14} aria-hidden="true" />
                    <span>Catálogo Oficial PDF</span>
                    <span
                      className="rounded px-1.5 py-0.5 text-[10px] font-mono font-normal uppercase"
                      style={{
                        background: vista === 'pdf' ? '#0A3A60' : 'rgba(0,217,255,0.12)',
                        color: vista === 'pdf' ? '#ffffff' : '#00d9ff',
                      }}
                    >
                      {datos.pdf.paginas ? `${datos.pdf.paginas}p` : 'PDF'}
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-3 pr-2">
                  <a
                    href={datos.pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#00d9ff] transition hover:underline"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    <span>Abrir en ventana completa</span>
                    <Iconos.ExternalLink size={12} aria-hidden="true" />
                  </a>
                </div>
              </div>
            )}

            {vista === 'pdf' && datos.pdf ? (
              <VisorPDF documento={datos.pdf} altura="700px" />
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
              // Red de seguridad: hoy los 4 sistemas publicados traen tabla, así
              // que esta rama no se pinta. Se conserva porque los otros 5 están
              // comentados en sistemas.ts y volverán por ahí.
              <div
                className="flex min-h-[320px] items-center justify-center border p-8 text-center"
                style={{
                  borderColor: BORDE,
                  background: SUPERFICIE,
                  borderRadius: RADIO,
                }}
              >
                <p className="max-w-sm text-sm leading-relaxed text-white/45">
                  Catálogo de referencias en preparación. Escríbenos para recibir la
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
