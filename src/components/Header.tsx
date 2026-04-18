'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Aliados', href: '#aliados' },
  { label: 'Sobre nosotros', href: '#sobre-nosotros' },
]

const COUNTRIES = [
  { flag: '/peru.png', label: 'Perú' },
  { flag: '/bolivia.png', label: 'Bolivia' },
  { flag: '/colombia.png', label: 'Colombia' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      role="banner"
      style={{
        backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(10,58,96,0.1)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(10,58,96,0.08)' : 'none',
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="TraumaSurgery — Inicio"
          >
            <span
              className="text-2xl tracking-tight leading-none"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: 'var(--color-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Trauma
              <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>
                Surgery
              </span>
            </span>
          </a>

          {/* Navegación principal — desktop */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm transition-colors duration-200 hover:opacity-100"
                style={{
                  color: 'var(--color-text)',
                  fontWeight: 400,
                  opacity: 0.85,
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--color-primary)'
                  ;(e.currentTarget as HTMLElement).style.fontWeight = '500'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--color-text)'
                  ;(e.currentTarget as HTMLElement).style.fontWeight = '400'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Derecha: banderas + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Indicadores de presencia regional */}
            <div className="flex items-center gap-2" aria-label="Países de operación">
              {COUNTRIES.map((c) => (
                <img
                  key={c.label}
                  src={c.flag}
                  alt={c.label}
                  title={c.label}
                  className="w-5 h-5 rounded-full object-cover border border-gray-100 shadow-sm transition-transform hover:scale-110"
                />
              ))}
            </div>

            {/* CTA Contacto */}
            <a
              href="#contacto"
              className="text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                fontWeight: 700,
                padding: '8px 20px',
                borderRadius: '6px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Contacto
            </a>
          </div>

          {/* Botón hamburguesa — mobile */}
          <button
            className="lg:hidden p-2 rounded-md"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: 'var(--color-primary)' }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="18" y2="18" />
                  <line x1="18" y1="4" x2="4" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="19" y2="7" />
                  <line x1="3" y1="11" x2="19" y2="11" />
                  <line x1="3" y1="15" x2="19" y2="15" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Menú mobile */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden pb-4 border-t"
            style={{ borderColor: 'rgba(10,58,96,0.1)' }}
          >
            <nav className="flex flex-col gap-1 pt-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="py-2 px-2 rounded text-sm"
                  style={{ color: 'var(--color-text)', fontWeight: 400 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: 'rgba(10,58,96,0.1)' }}>
              <div className="flex gap-2">
                {COUNTRIES.map((c) => (
                  <img
                    key={c.label}
                    src={c.flag}
                    alt={c.label}
                    title={c.label}
                    className="w-5 h-5 rounded-full object-cover border border-gray-100 shadow-sm"
                  />
                ))}
              </div>
              <a
                href="#contacto"
                className="text-sm"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  padding: '8px 18px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                }}
                onClick={() => setMenuOpen(false)}
              >
                Contacto
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
