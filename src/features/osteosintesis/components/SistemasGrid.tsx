'use client'
// Rejilla de sistemas agrupada por familia. Por defecto pinta osteosíntesis;
// la página de medicina del deporte le pasa sus propios `sistemas` y `grupos`.
// Con 24 sistemas una rejilla plana obligaba a recorrer nueve filas para
// encontrar un anclaje: el índice superior salta al grupo y cada grupo lleva
// su propia rejilla. Cada tarjeta abre su modal.
// Mismo patrón de montaje diferido que CatalogoGrid de reemplazo articular:
// un modal solo se monta tras su primera apertura.

import { lazy, Suspense, useRef, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'
// El modal (visor PDF, tablas de respaldo y sus datos) se descarga en la
// primera apertura, no al hidratar la rejilla.
const ModalSistema = lazy(() => import('./ModalSistema'))
import { GRUPOS, sistemas as SISTEMAS_OSTEO } from '../data/sistemas'
import type { Categoria, SistemaOsteo } from '../data/tipos'

const LISTA: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const ITEM: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}
const REDUCIDO: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
}

const MONO = { fontFamily: 'var(--font-mono)' } as const

interface Props {
  sistemas?: SistemaOsteo[]
  grupos?: Array<{ id: Categoria; titulo: string; texto: string }>
}

export default function SistemasGrid({ sistemas = SISTEMAS_OSTEO, grupos: GRUPOS_IN = GRUPOS }: Props) {
  const [abierto, setAbierto] = useState<string | null>(null)
  const vistos = useRef(new Set<string>())
  const prefersReduced = useReducedMotion()

  const listaVars = prefersReduced ? { hidden: {}, visible: {} } : LISTA
  const itemVars = prefersReduced ? REDUCIDO : ITEM

  if (abierto) vistos.current.add(abierto)

  const grupos = GRUPOS_IN.map((g) => ({
    ...g,
    sistemas: sistemas.filter((s) => s.categoria === g.id),
  })).filter((g) => g.sistemas.length > 0)

  return (
    <section
      id="catalogo"
      className="relative px-6 pb-28 lg:px-8"
      style={{ background: 'var(--bg-deep, #020b18)' }}
      aria-labelledby="catalogo-title"
    >
      <div className="mx-auto max-w-7xl">
        <p
          className="text-xs font-medium uppercase tracking-[0.22em]"
          style={{ color: 'var(--ts-accent, #00d9ff)' }}
        >
          Catálogo
        </p>
        <h2
          id="catalogo-title"
          className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl"
        >
          Sistemas disponibles
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
          Cada sistema abre el catálogo oficial del fabricante, con sus referencias
          y especificaciones tal como se publican.
        </p>

        {/* Índice de grupos: salta a la familia sin recorrer toda la página. */}
        <nav aria-label="Grupos del catálogo" className="mt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {grupos.map((g) => (
              <li key={g.id}>
                <a
                  href={`#grupo-${g.id}`}
                  className="inline-flex items-baseline gap-2 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60 transition hover:text-white focus:outline-none focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4"
                  style={MONO}
                >
                  {g.titulo}
                  <span className="tabular-nums" style={{ color: 'var(--ts-accent, #00d9ff)' }}>
                    {g.sistemas.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {grupos.map((g, i) => (
          <section
            key={g.id}
            id={`grupo-${g.id}`}
            aria-labelledby={`grupo-${g.id}-title`}
            className={`scroll-mt-28 ${i === 0 ? 'mt-14' : 'mt-20'}`}
          >
            <header
              className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-end sm:justify-between"
              style={{ borderColor: 'rgba(0,217,255,0.18)' }}
            >
              <div>
                <h3 id={`grupo-${g.id}-title`} className="font-heading text-xl font-bold text-white">
                  {g.titulo}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60">{g.texto}</p>
              </div>
              <p
                className="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-white/50 tabular-nums"
                style={MONO}
              >
                {g.sistemas.length} {g.sistemas.length === 1 ? 'sistema' : 'sistemas'}
              </p>
            </header>

            <motion.ul
              variants={listaVars}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {g.sistemas.map((s) => (
                <motion.li key={s.id} variants={itemVars}>
                  <button
                    type="button"
                    onClick={() => setAbierto(s.id)}
                    // El subtítulo entra en el nombre accesible: sin él, tibia
                    // proximal 3.5 y 5.0 son dos botones indistinguibles.
                    aria-label={`Ver detalles de ${[...s.titulo, s.subtitulo].filter(Boolean).join(' ')}`}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border text-left transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{
                      borderColor: 'rgba(0,217,255,0.18)',
                      background:
                        'linear-gradient(180deg, rgba(10,30,48,0.6), rgba(2,11,24,0.85))',
                      ['--tw-ring-color' as string]: 'rgba(0,217,255,0.6)',
                      ['--tw-ring-offset-color' as string]: '#020b18',
                    }}
                  >
                    {/* Portada compuesta por el cliente (título, pilares y
                        producto ya van en la imagen): el título visible sería
                        un duplicado, así que queda solo para lectores de
                        pantalla. */}
                    <div className="overflow-hidden">
                      <img
                        src={`/IMG/PORTADA/${s.id}.webp`}
                        alt=""
                        width={1024}
                        height={768}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <h4 className="sr-only">
                      {[...s.titulo, s.subtitulo].filter(Boolean).join(' ')}
                    </h4>

                    <div
                      className="flex items-center justify-between gap-3 border-t px-4 py-3"
                      style={{ borderColor: 'rgba(0,217,255,0.18)', ...MONO }}
                    >
                      <span
                        className="inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.16em]"
                        style={{ color: 'var(--ts-accent, #00d9ff)' }}
                      >
                        {s.pdf ? 'Ver catálogo oficial' : 'Ver sistema'}
                        <ArrowRight
                          size={13}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </span>

                      {s.pdf && (
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] uppercase tracking-[0.14em] text-white/50 tabular-nums">
                          <FileText size={12} className="text-[#00d9ff]" aria-hidden="true" />
                          PDF · {s.pdf.paginas} pág
                        </span>
                      )}
                    </div>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </section>
        ))}
      </div>

      {/* Modales — montados solo tras la primera apertura. */}
      <Suspense fallback={null}>
        {sistemas.map((s) =>
          vistos.current.has(s.id) ? (
            <ModalSistema
              key={s.id}
              sistema={s.id}
              open={abierto === s.id}
              onClose={() => setAbierto(null)}
            />
          ) : null,
        )}
      </Suspense>
    </section>
  )
}
