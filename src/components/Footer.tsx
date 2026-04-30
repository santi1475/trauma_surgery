'use client'
import { motion, useReducedMotion } from 'framer-motion'

const NAV_COLS = [
  {
    heading: 'Soluciones',
    links: [
      { label: 'Osteosíntesis',    href: '#soluciones' },
      { label: 'Reemplazos articulares', href: '#soluciones' },
      { label: 'Cirugía de mano',  href: '#soluciones' },
      { label: 'Columna vertebral', href: '#soluciones' },
      { label: 'Trauma pélvico',   href: '#soluciones' },
    ],
  },
  {
    heading: 'Empresa',
    links: [
      { label: 'Sobre nosotros',   href: '#sobre-nosotros' },
      { label: 'Recursos',         href: '#recursos' },
      { label: 'Aliados',          href: '#aliados' },
      { label: 'Contacto',         href: '#contacto' },
      { label: 'Instagram',        href: 'https://www.instagram.com/traumasurgeryperu', external: true },
    ],
  },
]

const PAISES = [
  { flag: '🇵🇪', name: 'Perú' },
  { flag: '🇧🇴', name: 'Bolivia' },
  { flag: '🇨🇴', name: 'Colombia' },
  { flag: '🇺🇾', name: 'Uruguay' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const prefersReduced = useReducedMotion()

  return (
    <footer
      id="footer"
      role="contentinfo"
      style={{
        background: 'linear-gradient(180deg, #010b16 0%, #010810 100%)',
        borderTop: '1px solid rgba(0,217,255,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow superior izquierdo */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '40%',
          height: '60%',
          background:
            'radial-gradient(ellipse at top left, rgba(0,82,163,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Línea cian superior */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(0,217,255,0.30) 40%, rgba(0,217,255,0.30) 60%, transparent)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Cuerpo del footer ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-16 lg:py-20">

          {/* Columna 1 — Logo + descripción */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="/"
              aria-label="TraumaSurgery — Inicio"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}
            >
              <div style={{ width: 34, height: 34, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src="/IMG_7229.PNG" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: '0.10em',
                  color: '#ffffff',
                }}
              >
                TRAUMA<span style={{ color: '#00d9ff' }}>SURGERY</span>
              </span>
            </a>
            <p
              style={{
                color: 'rgba(255,255,255,0.38)',
                fontSize: 12,
                lineHeight: 1.75,
                maxWidth: 230,
                marginBottom: 18,
              }}
            >
              Dispositivos médicos de alta precisión para osteosíntesis y reemplazos articulares.
              Más de una década acompañando a cirujanos en la región.
            </p>
            {/* Badge certificaciones */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['ISO 13485', 'CE Mark'].map((cert) => (
                <span
                  key={cert}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 8,
                    letterSpacing: '0.10em',
                    color: '#D4AF37',
                    background: 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.20)',
                    padding: '3px 8px',
                    borderRadius: 4,
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Columnas 2 y 3 — Navegación */}
          {NAV_COLS.map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(0,217,255,0.55)',
                  marginBottom: 16,
                  fontWeight: 600,
                }}
              >
                {col.heading}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={'external' in link && link.external ? '_blank' : undefined}
                      rel={'external' in link && link.external ? 'noopener noreferrer' : undefined}
                      style={{
                        color: 'rgba(255,255,255,0.42)',
                        fontSize: 12,
                        textDecoration: 'none',
                        letterSpacing: '0.02em',
                        transition: 'color 0.18s',
                        display: 'inline-block',
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#ffffff')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.42)')}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Columna 4 — Contacto + países */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(0,217,255,0.55)',
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              Contacto
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {[
                { label: 'Teléfono', value: '998 436 284', href: 'tel:+51998436284' },
                { label: 'WhatsApp', value: '953 327 198', href: 'https://wa.me/51953327198' },
                { label: 'WhatsApp', value: '932 527 371', href: 'https://wa.me/51932527371' },
                { label: 'Email', value: 'traumasurgery.eirl@gmail.com', href: 'mailto:traumasurgery.eirl@gmail.com' },
              ].map((c, i) => (
                <div key={i}>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 8,
                      color: 'rgba(255,255,255,0.25)',
                      letterSpacing: '0.10em',
                      textTransform: 'uppercase',
                      marginBottom: 1,
                    }}
                  >
                    {c.label}
                  </p>
                  <a
                    href={c.href}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.55)',
                      textDecoration: 'none',
                      fontVariantNumeric: 'tabular-nums',
                      transition: 'color 0.18s',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#00d9ff')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)')}
                  >
                    {c.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Presencia internacional */}
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 8,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.22)',
                marginBottom: 8,
              }}
            >
              Presencia
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PAISES.map((p) => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      flexShrink: 0,
                    }}
                  >
                    {p.flag}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.06em' }}>
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Barra inferior ─────────────────────────────────────────────── */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, margin: 0 }}>
            © {year} TraumaSurgery EIRL. Todos los derechos reservados.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a
              href="mailto:traumasurgery.eirl@gmail.com"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'rgba(255,255,255,0.30)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#00d9ff')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.30)')}
            >
              traumasurgery.eirl@gmail.com
            </a>
            <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.10)', display: 'inline-block' }} />
            <a
              href="https://www.instagram.com/traumasurgeryperu"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'rgba(255,255,255,0.30)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#f09433')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.30)')}
              aria-label="Instagram TraumaSurgery"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
