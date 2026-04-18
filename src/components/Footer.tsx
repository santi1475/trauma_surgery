'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="contacto"
      style={{ backgroundColor: 'var(--color-primary)' }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div>
            <a
              href="/"
              className="inline-block mb-2"
              aria-label="TraumaSurgery — Inicio"
              style={{ textDecoration: 'none' }}
            >
              <span
                style={{
                  fontWeight: 800,
                  color: '#FFFFFF',
                  fontSize: '1.15rem',
                  letterSpacing: '-0.02em',
                }}
              >
                Trauma
                <span style={{ color: 'var(--color-accent)' }}>Surgery</span>
              </span>
            </a>
            <p
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.78rem',
                fontWeight: 400,
              }}
            >
              Dispositivos médicos de alta precisión · Perú · Bolivia · Colombia
            </p>
          </div>

          {/* Links rápidos */}
          <nav aria-label="Pie de página">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { label: 'Soluciones', href: '#soluciones' },
                { label: 'Certificaciones', href: '#recursos' },
                { label: 'Instagram', href: '#aliados' },
                { label: 'Contacto', href: '#contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs transition-opacity duration-200 hover:opacity-100"
                    style={{
                      color: 'rgba(255,255,255,0.55)',
                      textDecoration: 'none',
                      fontWeight: 400,
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p
            className="text-xs"
            style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}
          >
            © {year} TraumaSurgery EIRL. Todos los derechos reservados.
          </p>
          <a
            href="mailto:traumasurgery.eirl@gmail.com"
            className="font-mono text-xs transition-opacity duration-200 hover:opacity-80"
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            traumasurgery.eirl@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}
