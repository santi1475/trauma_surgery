'use client'
// Hero del modal de producto — mismo esqueleto para las 4 prótesis.
// 3 columnas: (1) copy + CTA + pilares · (2) imagen de impacto · (3) certificaciones + países.
// Certificaciones y países se reutilizan del Hero de la landing.

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { icono } from '@/components/iconos'
import { CertificationCards } from '@/components/Hero/CertificationCards'
import { PaisesOperamos } from '@/components/PaisesOperamos'
import {
  CTA_EMAIL,
  EYEBROW_HERO,
  NOTA_CONTACTO,
  PILARES,
  type Hero,
  type IconoNombre,
} from '../data/tipos'
import { TextoRico } from './TextoRico'

const COL_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const PILARES_LISTA: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}

const PILAR_ITEM: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.88 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', duration: 0.5, bounce: 0.15 } },
}

const REDUCIDO: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
}

// ponytail: los iconos salen de lucide por nombre; si el nombre no existe cae a Hexagon.
// Alternativa (set de iconos a medida) solo si el cliente entrega los SVG.
function Icono({ nombre, size = 16 }: { nombre?: IconoNombre; size?: number }) {
  const Componente = icono(nombre)
  return <Componente size={size} color="var(--ts-accent)" strokeWidth={1.5} aria-hidden="true" />
}

/** Hexágono contenedor del pilar — outline cian con el icono centrado. */
function PilarHexagonal({ titulo, icono }: { titulo: string; icono?: IconoNombre }) {
  return (
    <div className="flex flex-col items-center gap-2.5 text-center">
      <div className="relative flex h-12 w-12 items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <polygon
            points="50,4 92,28 92,72 50,96 8,72 8,28"
            fill="rgb(var(--ts-accent-rgb)/0.06)"
            stroke="rgb(var(--ts-accent-rgb)/0.45)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
        <span className="relative">
          <Icono nombre={icono} size={18} />
        </span>
      </div>
      <span
        className="text-[11px] uppercase leading-[1.4] tracking-[0.1em] text-white/45"
        style={{ fontFamily: 'var(--font-mono)', maxWidth: 96 }}
      >
        {titulo}
      </span>
    </div>
  )
}

export function ModalHero({ data, titleId }: { data: Hero; titleId: string }) {
  const prefersReduced = useReducedMotion()
  const colVars = prefersReduced ? REDUCIDO : COL_VARIANTS
  const listaVars = prefersReduced ? { hidden: {}, visible: {} } : PILARES_LISTA
  const itemVars = prefersReduced ? REDUCIDO : PILAR_ITEM

  return (
    <section
      className="relative overflow-hidden border-b px-6 pb-12 pt-12 sm:px-10 sm:pt-14 lg:px-14"
      style={{ borderColor: 'rgb(var(--ts-accent-rgb)/0.14)', background: 'var(--ts-bg-deep)' }}
      aria-label="Resumen del producto"
    >
      {/* Atmósfera — glow radial + grid técnico */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 55% 25%, rgb(var(--ts-accent-rgb)/0.10), transparent 65%)',
        }}
      />

      <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        {/* ── Columna 1 — copy, CTA y pilares ── */}
        <motion.div
          variants={colVars}
          initial="hidden"
          animate="visible"
          className="lg:col-span-4"
        >
          <p
            className="text-[11px] font-normal uppercase tracking-[0.18em]"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {data.eyebrow ?? EYEBROW_HERO}
          </p>

          {/* Título — mismo patrón que el Hero de la landing:
              línea 1 blanca, línea 2 en cian. */}
          <h2
            id={titleId}
            className="mb-6 mt-4 font-black leading-[0.9] tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="block whitespace-nowrap text-2xl text-white md:text-3xl">
              {data.titulo[0]}
            </span>
            <span className="mt-2 block whitespace-nowrap text-3xl text-ts-accent md:text-4xl lg:text-5xl">
              {data.titulo[1]}
            </span>
          </h2>

          <p
            className="max-w-md text-sm leading-[1.7]"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            <TextoRico texto={data.descripcion} />
          </p>

          {/* Nota de contacto */}
          <p className="mt-5 flex items-start gap-2.5 text-sm leading-[1.6] text-white/55">
            <span className="mt-0.5 shrink-0">
              <Icono nombre="MessageCircle" size={16} />
            </span>
            <span>
              <TextoRico texto={NOTA_CONTACTO} />
            </span>
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <motion.a
              href={CTA_EMAIL.href}
              className="inline-flex min-h-[44px] w-fit items-center gap-2.5 rounded-full bg-ts-accent px-6 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-ts-bg-deep no-underline transition-shadow hover:shadow-[0_0_20px_rgb(var(--ts-accent-rgb)/0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ts-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ts-bg-deep"
              whileTap={prefersReduced ? {} : { scale: 0.97 }}
            >
              <span>{CTA_EMAIL.label}</span>
                <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
            </motion.a>

            {data.pdf && (
              <motion.a
                href={data.pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ts-accent/35 bg-ts-bg-card/60 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 no-underline transition hover:border-ts-accent hover:bg-ts-accent/12 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ts-accent/60"
                style={{ fontFamily: 'var(--font-mono)' }}
                whileTap={prefersReduced ? {} : { scale: 0.97 }}
              >
                <Icono nombre="FileText" size={14} />
                <span>{data.pdf.label ?? 'Catálogo PDF'}</span>
                <ExternalLink size={12} strokeWidth={2} aria-hidden="true" className="opacity-70" />
              </motion.a>
            )}
          </div>

          {/* 4 pilares hexagonales */}
          <motion.ul
            variants={listaVars}
            initial="hidden"
            animate="visible"
            className="mt-10 grid grid-cols-4 gap-3"
            aria-label="Atributos del producto"
          >
            {PILARES.map((pilar) => (
              <motion.li key={pilar.titulo} variants={itemVars}>
                <PilarHexagonal titulo={pilar.titulo} icono={pilar.icono} />
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ── Columna 2 — imagen de impacto ── */}
        <motion.div
          variants={colVars}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5"
        >
          <div
            className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border"
            style={{
              background:
                'radial-gradient(closest-side, rgb(var(--ts-accent-rgb)/0.12), transparent 70%), linear-gradient(180deg, rgba(10,30,48,0.8), rgb(var(--ts-bg-deep-rgb)/0.95))',
              borderColor: 'rgb(var(--ts-accent-rgb)/0.20)',
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  'linear-gradient(rgb(var(--ts-accent-rgb)/0.5) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--ts-accent-rgb)/0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            {/* ponytail: placeholder hasta que el cliente entregue el render final. */}
            <img
              src={data.imagen.src}
              alt={data.imagen.alt}
              loading="lazy"
              decoding="async"
              className="relative h-full w-full object-contain p-6"
            />
          </div>

          {/* Claim opcional bajo la imagen (hombro, mano) */}
          {data.claim && (
            <div
              className="mt-4 flex items-start gap-3 rounded-xl border p-4"
              style={{
                borderColor: 'rgb(var(--ts-accent-rgb)/0.15)',
                background: 'rgba(4,14,31,0.7)',
              }}
            >
              <span className="mt-0.5 shrink-0">
                <Icono nombre="ShieldCheck" size={18} />
              </span>
              <p className="text-sm leading-snug text-white/78">
                <TextoRico texto={data.claim} />
              </p>
            </div>
          )}
        </motion.div>

        {/* ── Columna 3 — certificaciones + países (reutilizados del Hero) ── */}
        <motion.div
          variants={colVars}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-7 lg:col-span-3"
        >
          <CertificationCards />
          <PaisesOperamos />
        </motion.div>
      </div>
    </section>
  )
}
