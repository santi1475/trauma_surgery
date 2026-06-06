'use client'
// ModalContenido — renderiza las 3 zonas (Top Hero / Middle / Bottom Ingeniería)
// a partir de un objeto CaderaData. Se inyecta dentro del shell ModalProducto.

import type { CaderaData } from '../data/cadera'

// ─── Hexágono SVG inline reutilizable ─────────────────────────────────
export function Hexagono({
  glyph,
  size = 56,
  filled = false,
}: {
  glyph?: string
  size?: number
  filled?: boolean
}) {
  const points = '50,4 92,28 92,72 50,96 8,72 8,28'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      className="shrink-0"
    >
      <polygon
        points={points}
        fill={filled ? 'rgba(0,217,255,0.10)' : 'transparent'}
        stroke="#00d9ff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {glyph && (
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fontSize="32"
          fontFamily="Orbitron, sans-serif"
          fontWeight={700}
          fill="#00d9ff"
        >
          {glyph}
        </text>
      )}
    </svg>
  )
}

interface ModalContenidoProps {
  data: CaderaData
  titleId: string
  /** Sufijo único para los IDs internos (sistema/ingeniería) — evita colisiones cuando varios modales viven montados a la vez. */
  scopeId: string
}

export default function ModalContenido({ data, titleId, scopeId }: ModalContenidoProps) {
  const {
    eyebrow,
    titulo,
    descripcion,
    cta,
    beneficios,
    certificaciones,
    paises,
    sistema,
    caracteristicas,
    ingenieria,
  } = data

  const sistemaHeadingId = `sistema-${scopeId}`
  const ingenieriaHeadingId = `ingenieria-${scopeId}`

  return (
    <>
      {/* ════════ ZONA TOP — Hero ════════ */}
      <section
        className="border-b px-6 pb-10 pt-12 sm:px-10 sm:pt-14 lg:px-14"
        style={{ borderColor: 'rgba(0,217,255,0.14)' }}
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Cols 1–4 */}
          <div className="lg:col-span-4">
            <p
              className="text-xs uppercase tracking-[0.22em]"
              style={{
                color: 'var(--ts-accent, #00d9ff)',
                fontFamily: 'DM Mono, monospace',
              }}
            >
              {eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-4 font-heading text-3xl font-bold leading-[1.1] text-white sm:text-4xl"
            >
              {titulo}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
              {descripcion}
            </p>

            <a
              href={cta.href}
              className="mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-wider transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background: 'var(--ts-accent, #00d9ff)',
                color: '#02121f',
                ['--tw-ring-color' as any]: 'rgba(0,217,255,0.6)',
                ['--tw-ring-offset-color' as any]: '#020b18',
              }}
            >
              {cta.label}
              <span aria-hidden="true">→</span>
            </a>

            <ul
              className="mt-8 grid grid-cols-2 gap-4"
              aria-label="Beneficios principales"
            >
              {beneficios.map((b) => (
                <li
                  key={b.titulo}
                  className="flex items-center gap-3 rounded-lg border p-3"
                  style={{
                    borderColor: 'rgba(0,217,255,0.14)',
                    background: 'rgba(10,30,48,0.5)',
                  }}
                >
                  <Hexagono glyph={b.glyph} size={40} filled />
                  <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                    {b.titulo}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cols 5–9 */}
          <div className="lg:col-span-5">
            <div
              className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl border"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(0,217,255,0.12), transparent 70%), linear-gradient(180deg, rgba(10,30,48,0.8), rgba(2,11,24,0.95))',
                borderColor: 'rgba(0,217,255,0.20)',
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,217,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.5) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <svg
                width="160"
                height="200"
                viewBox="0 0 160 200"
                fill="none"
                stroke="#00d9ff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="relative opacity-80"
              >
                <circle cx="80" cy="42" r="26" />
                <path d="M80 68v22" />
                <path d="M80 90c-18 8-28 26-30 50" />
                <path d="M80 90c18 8 28 26 30 50" />
                <circle cx="50" cy="146" r="6" />
                <circle cx="110" cy="146" r="6" />
                <path d="M48 152l-10 30" />
                <path d="M112 152l10 30" />
              </svg>
            </div>
          </div>

          {/* Cols 10–12 */}
          <div className="lg:col-span-3">
            <p
              className="text-[0.65rem] uppercase tracking-[0.24em] text-white/50"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              Certificaciones
            </p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Certificaciones">
              {certificaciones.map((c) => (
                <li
                  key={c.label}
                  className="rounded border px-3 py-1.5 text-xs font-bold tracking-wider text-white/85"
                  style={{
                    borderColor: 'rgba(0,217,255,0.30)',
                    background: 'rgba(0,217,255,0.05)',
                    fontFamily: 'DM Mono, monospace',
                  }}
                >
                  {c.label}
                </li>
              ))}
            </ul>

            <p
              className="mt-8 text-[0.65rem] uppercase tracking-[0.24em] text-white/50"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              Operamos en
            </p>
            <ul className="mt-3 space-y-2" aria-label="Países donde operamos">
              {paises.map((p) => {
                const isImagePath =
                  p.bandera.startsWith('/') ||
                  p.bandera.startsWith('public/') ||
                  p.bandera.endsWith('.svg') ||
                  p.bandera.endsWith('.png')

                return (
                  <li
                    key={p.nombre}
                    className="flex items-center gap-3 text-sm text-white/80"
                  >
                    {isImagePath ? (
                      <span className="flex h-3.5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-[2px] border border-white/10 bg-white/5">
                        <img
                          src={p.bandera.replace(/^public\//, '/')}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </span>
                    ) : (
                      <span aria-hidden="true" className="text-lg leading-none">
                        {p.bandera}
                      </span>
                    )}
                    <span>{p.nombre}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ════════ ZONA MIDDLE — Detalle del sistema ════════ */}
      <section
        className="border-b px-6 py-12 sm:px-10 sm:py-14 lg:px-14"
        style={{ borderColor: 'rgba(0,217,255,0.14)' }}
        aria-labelledby={sistemaHeadingId}
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p
              className="text-xs uppercase tracking-[0.22em] text-white/55"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              {sistema.nombreCorto}
            </p>
            <h3
              id={sistemaHeadingId}
              className="mt-3 font-heading text-2xl font-bold uppercase leading-tight text-white sm:text-3xl"
              style={{ color: 'var(--ts-accent, #00d9ff)' }}
            >
              {sistema.nombreComercial}
            </h3>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">
              {sistema.descripcion}
            </p>

            <div
              className="mt-8 flex aspect-[5/4] items-center justify-center overflow-hidden rounded-xl border"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,30,48,0.7), rgba(2,11,24,0.9))',
                borderColor: 'rgba(0,217,255,0.18)',
              }}
            >
              <svg
                width="220"
                height="160"
                viewBox="0 0 220 160"
                fill="none"
                stroke="#00d9ff"
                strokeWidth="1.4"
                aria-hidden="true"
                className="opacity-75"
              >
                <g transform="translate(20,40)">
                  <path d="M0 40 a40 40 0 0 1 80 0" />
                  <path d="M8 40 a32 32 0 0 1 64 0" strokeOpacity="0.8" />
                </g>
                <g transform="translate(110,40)">
                  <path d="M0 40 a40 40 0 0 1 80 0" strokeOpacity="0.6" />
                  <path d="M14 40 a26 26 0 0 1 52 0" strokeOpacity="0.5" />
                </g>
                <line x1="100" y1="80" x2="110" y2="80" strokeDasharray="3 3" />
                <circle cx="55" cy="120" r="4" />
                <circle cx="155" cy="120" r="4" />
              </svg>
            </div>
          </div>

          <div>
            <ul className="space-y-0">
              {caracteristicas.map((c, i) => (
                <li
                  key={c.titulo}
                  className={`flex gap-4 py-5 ${
                    i < caracteristicas.length - 1 ? 'border-b' : ''
                  }`}
                  style={{ borderColor: 'rgba(0,217,255,0.10)' }}
                >
                  <Hexagono size={36} filled />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                      {c.titulo}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                      {c.descripcion}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ════════ ZONA BOTTOM — Ingeniería ════════ */}
      <section
        className="px-6 py-12 sm:px-10 sm:py-14 lg:px-14"
        aria-labelledby={ingenieriaHeadingId}
      >
        <p
          className="text-xs uppercase tracking-[0.22em]"
          style={{
            color: 'var(--ts-accent, #00d9ff)',
            fontFamily: 'DM Mono, monospace',
          }}
        >
          Ingeniería del sistema
        </p>
        <h3
          id={ingenieriaHeadingId}
          className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl"
        >
          Componentes
        </h3>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ingenieria.map((pieza) => (
            <article
              key={pieza.numero}
              className="rounded-2xl border p-5 transition hover:-translate-y-0.5"
              style={{
                borderColor: 'rgba(0,217,255,0.18)',
                background:
                  'linear-gradient(180deg, rgba(10,30,48,0.6), rgba(2,11,24,0.85))',
              }}
            >
              <div
                className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg border"
                style={{
                  borderColor: 'rgba(0,217,255,0.14)',
                  background: pieza.tint ?? 'rgba(0,217,255,0.08)',
                }}
              >
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="#00d9ff"
                  strokeWidth="1.6"
                  aria-hidden="true"
                  className="opacity-80"
                >
                  <circle cx="50" cy="50" r="30" />
                  <circle cx="50" cy="50" r="18" strokeOpacity="0.6" />
                  <circle cx="50" cy="50" r="6" fill="#00d9ff" stroke="none" />
                </svg>
              </div>

              <p
                className="mt-4 text-[0.65rem] uppercase tracking-[0.22em] text-white/50"
                style={{ fontFamily: 'DM Mono, monospace' }}
              >
                {pieza.numero}
              </p>
              <h4
                className="mt-1 text-sm font-bold uppercase leading-snug text-white"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {pieza.titulo}
              </h4>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
