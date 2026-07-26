'use client'
// Rejilla de los 5 sistemas de osteosíntesis. Cada tarjeta abre su modal.
// Mismo patrón de montaje diferido que CatalogoGrid de reemplazo articular:
// un modal solo se monta tras su primera apertura.

import { useRef, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import ModalSistema from './ModalSistema'
import { sistemas } from '../data/sistemas'

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

export default function SistemasGrid() {
  const [abierto, setAbierto] = useState<string | null>(null)
  const vistos = useRef(new Set<string>())
  const prefersReduced = useReducedMotion()

  const listaVars = prefersReduced ? { hidden: {}, visible: {} } : LISTA
  const itemVars = prefersReduced ? REDUCIDO : ITEM

  if (abierto) vistos.current.add(abierto)

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
          Consulta las referencias y especificaciones de cada sistema.
        </p>

        <motion.ul
          variants={listaVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {sistemas.map((s) => (
            <motion.li key={s.id} variants={itemVars}>
              <button
                type="button"
                onClick={() => setAbierto(s.id)}
                aria-label={`Ver detalles de ${s.titulo.join(' ')}`}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border text-left transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  borderColor: 'rgba(0,217,255,0.18)',
                  background:
                    'linear-gradient(180deg, rgba(10,30,48,0.6), rgba(2,11,24,0.85))',
                  ['--tw-ring-color' as string]: 'rgba(0,217,255,0.6)',
                  ['--tw-ring-offset-color' as string]: '#020b18',
                }}
              >
                <div
                  className="relative flex aspect-[4/3] items-center justify-center overflow-hidden"
                  style={{
                    background:
                      'radial-gradient(closest-side, rgba(0,217,255,0.12), transparent 70%)',
                  }}
                >
                  <img
                    src={s.imagen.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3
                    className="font-heading text-lg font-bold leading-tight text-white"
                  >
                    {s.titulo[1]}
                  </h3>
                  {s.subtitulo && (
                    <p
                      className="mt-1 text-xs uppercase tracking-[0.14em] text-white/45"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {s.subtitulo}
                    </p>
                  )}
                  <span
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--ts-accent, #00d9ff)' }}
                  >
                    {s.filas ? 'Ver referencias' : 'Ver sistema'}
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Modales — montados solo tras la primera apertura. */}
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
    </section>
  )
}
