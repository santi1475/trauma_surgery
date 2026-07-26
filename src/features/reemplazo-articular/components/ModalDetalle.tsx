'use client'
// Detalle del producto — mismo esqueleto de 3 columnas que el hero del modal:
//   Col 1: identidad (nombre + copy) y bloque SISTEMA
//   Col 2: imagen de impacto
//   Col 3: CARACTERÍSTICAS PRINCIPALES (obligatorio en los 5 modales)
// Debajo, un footer con los bloques que varían por producto.

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import * as Iconos from 'lucide-react'
import { BADGE_CALIDAD, type Item, type ProductoData, type Sistema } from '../data/tipos'
import { TextoRico } from './TextoRico'

// ─── Piezas compartidas ───────────────────────────────────────────────

function Icono({ nombre, size = 18 }: { nombre?: string; size?: number }) {
  const Componente =
    (nombre && (Iconos as unknown as Record<string, Iconos.LucideIcon>)[nombre]) ||
    Iconos.Hexagon
  return <Componente size={size} color="#00d9ff" strokeWidth={1.5} aria-hidden="true" />
}

/** Icono dentro de hexágono — marca visual de todos los items. */
function IconoHex({ nombre, size = 44 }: { nombre?: string; size?: number }) {
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

/** Título de bloque — cian, centrado, con filetes a los lados (patrón de las referencias). */
function TituloBloque({ children, id }: { children: string; id?: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="h-px flex-1" style={{ background: 'rgba(0,217,255,0.25)' }} />
      <h3
        id={id}
        className="text-center text-xs font-bold uppercase tracking-[0.18em]"
        style={{ color: 'var(--ts-accent, #00d9ff)', fontFamily: 'var(--font-mono)' }}
      >
        {children}
      </h3>
      <span className="h-px flex-1" style={{ background: 'rgba(0,217,255,0.25)' }} />
    </div>
  )
}

const PANEL = {
  borderColor: 'rgba(0,217,255,0.15)',
  background: 'linear-gradient(180deg, rgba(10,30,48,0.55), rgba(2,11,24,0.8))',
}

const LISTA: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}
const ITEM: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}
const REDUCIDO: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
}

/** Lista de items icono + texto. Es la forma de las características principales. */
function ListaItems({ items, vars }: { items: Item[]; vars: Variants }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <motion.li
          key={i}
          variants={vars}
          className="flex items-start gap-3.5 rounded-xl border p-3.5"
          style={PANEL}
        >
          <IconoHex nombre={item.icono} size={40} />
          <div className="min-w-0 flex-1">
            {item.titulo && (
              <p className="mb-1 text-sm font-bold uppercase tracking-wide text-white">
                {item.titulo}
              </p>
            )}
            <p className="text-[13px] leading-[1.6] text-white/70">
              <TextoRico texto={item.texto} />
            </p>
          </div>
        </motion.li>
      ))}
    </ul>
  )
}

// ─── Bloque SISTEMA — 3 variantes de presentación ─────────────────────

function BloqueSistema({ sistema, vars }: { sistema: Sistema; vars: Variants }) {
  if (sistema.variante === 'numerado') {
    return (
      <ul className="grid grid-cols-2 gap-3">
        {sistema.componentes.map((c, i) => (
          <motion.li
            key={c.titulo}
            variants={vars}
            className="rounded-xl border p-3.5"
            style={PANEL}
          >
            <p
              className="text-lg font-bold leading-none"
              style={{ color: 'var(--ts-accent, #00d9ff)', fontFamily: 'var(--font-heading)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </p>
            <p className="mt-2 text-xs font-bold uppercase leading-snug tracking-wide text-white">
              {c.titulo}
            </p>
            {c.bullets && (
              <ul className="mt-2 space-y-1">
                {c.bullets.map((b) => (
                  <li key={b} className="flex gap-1.5 text-xs leading-snug text-white/60">
                    <span style={{ color: 'var(--ts-accent, #00d9ff)' }}>·</span>
                    <span><TextoRico texto={b} /></span>
                  </li>
                ))}
              </ul>
            )}
          </motion.li>
        ))}
      </ul>
    )
  }

  if (sistema.variante === 'hotspots') {
    return (
      <ol className="flex flex-col gap-2.5">
        {sistema.componentes.map((c, i) => (
          <motion.li key={c.titulo} variants={vars} className="flex items-start gap-3">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold"
              style={{
                borderColor: 'rgba(0,217,255,0.5)',
                color: 'var(--ts-accent, #00d9ff)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {i + 1}
            </span>
            <span className="text-[13px] leading-[1.6] text-white/75">
              <TextoRico texto={c.titulo} />
            </span>
          </motion.li>
        ))}
      </ol>
    )
  }

  // thumbnails
  return (
    <ul className="flex flex-col gap-3">
      {sistema.componentes.map((c) => (
        <motion.li
          key={c.titulo}
          variants={vars}
          className="flex items-start gap-3.5 rounded-xl border p-3.5"
          style={PANEL}
        >
          {c.imagen ? (
            <img
              src={c.imagen.src}
              alt={c.imagen.alt}
              loading="lazy"
              className="h-12 w-12 shrink-0 rounded-lg object-contain"
              style={{ background: 'rgba(0,217,255,0.06)' }}
            />
          ) : (
            <IconoHex nombre={c.icono} size={44} />
          )}
          <div className="min-w-0 flex-1">
            <p
              className="text-xs font-bold uppercase leading-snug tracking-wide"
              style={{ color: 'var(--ts-accent, #00d9ff)' }}
            >
              {c.titulo}
            </p>
            {c.texto && (
              <p className="mt-1 text-xs leading-[1.6] text-white/60">
                <TextoRico texto={c.texto} />
              </p>
            )}
          </div>
        </motion.li>
      ))}
    </ul>
  )
}

// ─── Componente principal ─────────────────────────────────────────────

export function ModalDetalle({ data, scopeId }: { data: ProductoData; scopeId: string }) {
  const prefersReduced = useReducedMotion()
  const listaVars = prefersReduced ? { hidden: {}, visible: {} } : LISTA
  const itemVars = prefersReduced ? REDUCIDO : ITEM

  const { identidad, sistema, caracteristicas } = data
  const identidadId = `identidad-${scopeId}`

  // Animación compartida por todas las listas del bloque.
  const lista = {
    variants: listaVars,
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    viewport: { once: true, amount: 0.15 },
  }

  return (
    <>
      {/* ════════ DETALLE — 3 columnas ════════ */}
      <section
        className="border-b px-6 py-12 sm:px-10 sm:py-14 lg:px-14"
        style={{ borderColor: 'rgba(0,217,255,0.14)' }}
        aria-labelledby={identidadId}
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ── Col 1 — identidad + sistema ── */}
          <div className="lg:col-span-3">
            <p
              className="text-xs uppercase tracking-[0.22em] text-white/55"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {identidad.eyebrow}
            </p>

            <h2
              id={identidadId}
              className="mt-3 font-black leading-[1.05] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="block break-words text-2xl text-white md:text-3xl">
                {identidad.nombreComercial[0]}
              </span>
              {/* Segunda línea: baja un paso si es larga (TRAPECIOMETACARPIANA,
                  Inlay patellar button) — como en las referencias. */}
              <span
                className={`mt-1 block break-words text-cyan-400 ${
                  identidad.nombreComercial[1].length > 14
                    ? 'text-lg md:text-xl'
                    : 'text-2xl md:text-3xl'
                }`}
              >
                {identidad.nombreComercial[1]}
              </span>
            </h2>

            <p className="mt-4 text-sm font-medium leading-[1.6] text-white/85">
              <TextoRico texto={identidad.tagline} />
            </p>

            {identidad.descripcion && (
              <p className="mt-3 text-[13px] leading-[1.7] text-white/60">
                <TextoRico texto={identidad.descripcion} />
              </p>
            )}

            {sistema && (
              <motion.div {...lista} className="mt-8">
                <TituloBloque>Sistema</TituloBloque>
                <BloqueSistema sistema={sistema} vars={itemVars} />
              </motion.div>
            )}
          </div>

          {/* ── Col 2 — imagen de impacto ── */}
          <div className="lg:col-span-5">
            <div
              className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-2xl border lg:sticky lg:top-6 lg:min-h-[560px]"
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
                  backgroundSize: '44px 44px',
                }}
              />
              {/* ponytail: placeholder hasta que lleguen los renders finales. */}
              <img
                src={identidad.imagen.src}
                alt={identidad.imagen.alt}
                loading="lazy"
                decoding="async"
                className="relative h-full w-full object-contain p-8"
              />
            </div>
          </div>

          {/* ── Col 3 — características principales (siempre) ── */}
          <motion.div {...lista} className="lg:col-span-4">
            <TituloBloque>Características principales</TituloBloque>
            <ListaItems items={caracteristicas} vars={itemVars} />
          </motion.div>
        </div>
      </section>

      {/* ════════ FOOTER — badge de calidad, igual en los 5 modales ════════ */}
      {/* ponytail: copy provisional en BADGE_CALIDAD, el cliente lo cambiará. */}
      <section className="px-6 py-10 sm:px-10 lg:px-14" aria-label="Calidad">
        <div
          className="mx-auto flex max-w-3xl items-center gap-4 rounded-full border px-6 py-4"
          style={PANEL}
        >
          <IconoHex nombre={BADGE_CALIDAD.icono} size={40} />
          <p className="text-[13px] leading-[1.6] text-white/70">
            <TextoRico texto={BADGE_CALIDAD.texto} />
          </p>
        </div>
      </section>
    </>
  )
}
