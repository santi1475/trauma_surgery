'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ModalCadera from './ModalCadera'
import ModalRodilla from './ModalRodilla'
import ModalHombro from './ModalHombro'
import ModalMano from './ModalMano'
import ModalPlacas from './ModalPlacas'

gsap.registerPlugin(ScrollTrigger)

// ─── Tipos ──────────────────────────────────────────────────────────────

type RegionId = 'cadera' | 'rodilla' | 'hombro' | 'mano' | 'placas'

interface Producto {
  id: RegionId
  titulo: string
  subtitulo: string
  Icono: () => React.JSX.Element
}

// ─── Iconos anatómicos (SVG inline, sin assets externos) ────────────────

const stroke = '#00d9ff'
const iconBase = {
  width: 80,
  height: 80,
  viewBox: '0 0 80 80',
  fill: 'none',
  stroke,
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const IconCadera = () => (
  <svg {...iconBase} aria-hidden="true">
    <circle cx="40" cy="22" r="11" />
    <path d="M40 33v10" />
    <path d="M40 43c-10 4-16 12-18 24" />
    <path d="M40 43c10 4 16 12 18 24" />
    <circle cx="22" cy="67" r="3.5" />
    <circle cx="58" cy="67" r="3.5" />
  </svg>
)

const IconRodilla = () => (
  <svg {...iconBase} aria-hidden="true">
    <path d="M30 10v22" />
    <path d="M50 10v22" />
    <circle cx="40" cy="40" r="10" />
    <path d="M30 48v22" />
    <path d="M50 48v22" />
    <path d="M35 40h10" />
  </svg>
)

const IconHombro = () => (
  <svg {...iconBase} aria-hidden="true">
    <circle cx="40" cy="28" r="9" />
    <path d="M31 30c-8 2-15 8-19 18" />
    <path d="M49 30c8 2 15 8 19 18" />
    <path d="M40 37v18" />
    <path d="M32 55c2 6 6 10 8 12 2-2 6-6 8-12" />
  </svg>
)

const IconMano = () => (
  <svg {...iconBase} aria-hidden="true">
    <path d="M28 70V40c0-3 4-3 4 0v18" />
    <path d="M36 58V20c0-3 4-3 4 0v34" />
    <path d="M44 58V14c0-3 4-3 4 0v40" />
    <path d="M52 58V22c0-3 4-3 4 0v34" />
    <path d="M24 50c0-6 4-10 4-10v20c0 8 6 12 14 12s14-4 14-12V30" />
  </svg>
)

const IconPlacas = () => (
  <svg {...iconBase} aria-hidden="true">
    <rect x="14" y="34" width="52" height="12" rx="6" />
    <circle cx="22" cy="40" r="2" />
    <circle cx="34" cy="40" r="2" />
    <circle cx="46" cy="40" r="2" />
    <circle cx="58" cy="40" r="2" />
    <path d="M40 14v12" />
    <path d="M40 54v12" />
    <path d="M36 18l4-4 4 4" />
    <path d="M36 62l4 4 4-4" />
  </svg>
)

// ─── Datos ──────────────────────────────────────────────────────────────

const productos: Producto[] = [
  {
    id: 'cadera',
    titulo: 'Cadera',
    subtitulo: 'Sistemas de reemplazo total y parcial con vástagos de fijación cementada y no cementada.',
    Icono: IconCadera,
  },
  {
    id: 'rodilla',
    titulo: 'Rodilla',
    subtitulo: 'Prótesis primarias y de revisión con componentes femorales, tibiales y patelares.',
    Icono: IconRodilla,
  },
  {
    id: 'hombro',
    titulo: 'Hombro',
    subtitulo: 'Prótesis anatómicas e invertidas para reconstrucción articular gleno-humeral.',
    Icono: IconHombro,
  },
  {
    id: 'mano',
    titulo: 'Mano',
    subtitulo: 'Implantes para muñeca y articulaciones digitales en reconstrucción de precisión.',
    Icono: IconMano,
  },
  {
    id: 'placas',
    titulo: 'Placas y Tornillos',
    subtitulo: 'Sistemas de osteosíntesis para fijación interna en fracturas complejas.',
    Icono: IconPlacas,
  },
]

const beneficios = [
  { texto: 'Alta precisión' },
  { texto: 'Diseño para cada región anatómica' },
  { texto: 'Calidad y confiabilidad' },
  { texto: 'Innovación en cada procedimiento' },
]

// ─── ProductCard ────────────────────────────────────────────────────────

interface ProductCardProps {
  producto: Producto
  onSelect: (id: RegionId) => void
  reducedMotion: boolean
}

function ProductCard({ producto, onSelect, reducedMotion }: ProductCardProps) {
  const { id, titulo, subtitulo, Icono } = producto
  const lineRef = useRef<HTMLSpanElement | null>(null)

  // Hover de la línea cian inferior (anim 3):
  //  enter → width 0% → 100% en 400ms
  //  leave → opacity 1 → 0 en 200ms
  const handleEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = 'rgba(0,217,255,0.35)'
    e.currentTarget.style.boxShadow = '0 0 30px rgba(0,217,255,0.18)'
    if (reducedMotion || !lineRef.current) return
    gsap.killTweensOf(lineRef.current)
    gsap.fromTo(
      lineRef.current,
      { width: '0%', opacity: 1 },
      { width: '100%', duration: 0.4, ease: 'power2.out' }
    )
  }
  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = 'rgba(0,217,255,0.12)'
    e.currentTarget.style.boxShadow = 'none'
    if (reducedMotion || !lineRef.current) return
    gsap.killTweensOf(lineRef.current)
    gsap.to(lineRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power1.out',
      onComplete: () => {
        if (lineRef.current) lineRef.current.style.width = '0%'
      },
    })
  }

  return (
    <button
      type="button"
      data-id={id}
      data-card
      onClick={() => onSelect(id)}
      className="catalog-card group relative flex h-[360px] min-w-[220px] flex-col justify-between overflow-hidden rounded-2xl border p-6 text-left transition-[border-color,box-shadow] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 snap-start"
      style={{
        background:
          'linear-gradient(180deg, rgba(10,30,48,0.85) 0%, rgba(4,14,31,0.95) 100%)',
        borderColor: 'rgba(0,217,255,0.12)',
        ['--tw-ring-color' as any]: 'rgba(0,217,255,0.6)',
        ['--tw-ring-offset-color' as any]: '#020b18',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-label={`Ver detalles de ${titulo}`}
    >
      {/* Glow decorativo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(closest-side, rgba(0,217,255,0.20), transparent 70%)',
        }}
      />

      {/* Área superior — icono anatómico */}
      <div className="relative flex h-[180px] items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(0,217,255,0.08), transparent 75%)',
          }}
        />
        <Icono />
      </div>

      {/* Área inferior — textos */}
      <div className="relative">
        <h3
          className="text-base font-bold uppercase tracking-[0.14em] text-white"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          {titulo}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60">{subtitulo}</p>
      </div>

      {/* Línea cian inferior — animada en hover */}
      <span
        ref={lineRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[2px]"
        style={{ width: '0%', background: '#00d9ff', opacity: 1 }}
      />
    </button>
  )
}

// ─── CatalogoGrid (sección principal) ──────────────────────────────────

export default function CatalogoGrid() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [prefersReduced, setPrefersReduced] = useState(false)
  // Región seleccionada — null = sin modal abierto.
  const [selected, setSelected] = useState<RegionId | null>(null)
  // Caché idempotente: una vez abierto, el modal permanece montado (open={false})
  // para evitar remount + reset de scroll/estado en aperturas sucesivas.
  const openedCache = useRef<Set<RegionId>>(new Set())

  // Detección de reduced motion sin depender de framer-motion
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mql.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  // GSAP — todas las animaciones scoped al section, limpias vía gsap.context().
  useEffect(() => {
    if (prefersReduced) return
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Anim — cards stagger reveal
      const cards = section.querySelectorAll<HTMLElement>('[data-card]')
      if (cards.length) {
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        })
      }

      // Anim 2 — Header del catálogo (stagger izq/der)
      gsap.from(['.catalog-header-left', '.catalog-header-right'], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.catalog-section', start: 'top 75%', once: true },
      })

      // Anim 4 — Marca de agua (parallax suave, scrub)
      gsap.to('.watermark-text', {
        y: -60,
        ease: 'none',
        scrollTrigger: { trigger: '.catalog-header', scrub: 1 },
      })

      // Anim 5 — Footer banner (entrada con bounce)
      gsap.from('.trust-banner', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.trust-banner', start: 'top 90%', once: true },
      })
    }, section)

    return () => ctx.revert()
  }, [prefersReduced])

  const handleSelect = (id: RegionId) => {
    openedCache.current.add(id)
    setSelected(id)
  }

  return (
    <section
      ref={sectionRef}
      className="catalog-section relative"
      style={{ background: 'var(--bg-deep, #020b18)' }}
      aria-labelledby="catalogo-heading"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        {/* ─── PARTE A — Header asimétrico ─── */}
        <div className="catalog-header grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Izquierda */}
          <div className="catalog-header-left lg:col-span-6">
            <p
              className="text-xs uppercase tracking-[0.22em]"
              style={{
                color: 'var(--ts-accent, #00d9ff)',
                fontFamily: 'DM Mono, monospace',
                fontWeight: 500,
              }}
            >
              Soluciones
            </p>
            <h2
              id="catalogo-heading"
              className="mt-5 font-heading text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-[2.75rem]"
            >
              Tecnología que transforma cada movimiento
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Portafolio integral de implantes y sistemas para reconstrucción y osteosíntesis.
            </p>
          </div>

          {/* Derecha — watermark + texto bordeado */}
          <div className="catalog-header-right relative lg:col-span-6 lg:pl-8">
            <span
              aria-hidden="true"
              className="watermark-text pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-heading font-bold uppercase tracking-tighter text-white"
              style={{
                fontSize: '10rem',
                opacity: 0.04,
                lineHeight: 1,
              }}
            >
              HOMBRO
            </span>
            <p
              className="relative border-l-2 pl-6 text-base leading-relaxed text-white/75 sm:text-lg"
              style={{ borderColor: '#00d9ff' }}
            >
              Soluciones avanzadas para cada región anatómica
            </p>
          </div>
        </div>

        {/* ─── PARTE B — Grid de tarjetas ─── */}
        <div className="mt-16 lg:mt-20">
          <ul
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0"
            role="list"
            style={{ scrollbarWidth: 'thin' }}
          >
            {productos.map((p) => (
              <li key={p.id} className="contents">
                <ProductCard producto={p} onSelect={handleSelect} reducedMotion={prefersReduced} />
              </li>
            ))}
          </ul>
        </div>

        {/* ─── PARTE C — TrustBanner ─── */}
        <div className="mt-16 flex justify-center lg:mt-20">
          <div
            className="trust-banner flex flex-wrap items-center justify-center gap-x-0 gap-y-2 rounded-full border px-6 py-3 backdrop-blur-sm sm:px-8 sm:py-4"
            style={{
              borderColor: 'rgba(0,217,255,0.20)',
              background: 'rgba(10,30,48,0.7)',
            }}
            role="list"
            aria-label="Pilares de la propuesta de valor"
          >
            {beneficios.map((b, i) => (
              <div
                key={b.texto}
                role="listitem"
                className={`flex items-center gap-2 px-4 text-sm text-white/70 sm:text-sm ${i < beneficios.length - 1 ? 'sm:border-r' : ''
                  }`}
                style={{
                  fontFamily: 'DM Sans, sans-serif',  // si quieres mantener DM Sans
                  borderColor: 'rgba(0, 176, 207, 0.18)',
                }}
              >
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#00d9ff]">
                  {b.texto}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modales de detalle — montados una sola vez tras la primera apertura. */}
      {(['cadera', 'rodilla', 'hombro', 'mano', 'placas'] as RegionId[]).map((id) => {
        if (!openedCache.current.has(id) && selected !== id) return null
        const isOpen = selected === id
        const close = () => setSelected(null)
        switch (id) {
          case 'cadera':
            return <ModalCadera key={id} open={isOpen} onClose={close} />
          case 'rodilla':
            return <ModalRodilla key={id} open={isOpen} onClose={close} />
          case 'hombro':
            return <ModalHombro key={id} open={isOpen} onClose={close} />
          case 'mano':
            return <ModalMano key={id} open={isOpen} onClose={close} />
          case 'placas':
            return <ModalPlacas key={id} open={isOpen} onClose={close} />
        }
      })}
    </section>
  )
}
