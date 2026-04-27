'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Productos',  href: '#productos' },
  { label: 'Recursos',   href: '#recursos' },
  { label: 'Contacto',   href: '#contacto' },
]


export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      role="banner"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300"
      style={{
        padding: scrolled ? '14px 60px' : '20px 60px',
        backgroundColor: scrolled ? 'rgba(2,13,26,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(0,217,255,0.18)'
          : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      {/* Logo */}
      <a
        href="/"
        className="flex items-center gap-2.5 shrink-0"
        style={{ textDecoration: 'none' }}
        aria-label="TraumaSurgery — Inicio"
      >
        {/* Icono hexagonal */}
        <div className='w-10 h-10 rounded-full'>
          <img src="/public/IMG_7229.PNG" alt="Logo" className="h-10 w-auto" />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: '0.12em',
            color: '#ffffff',
          }}
        >
          TRAUMA<span style={{ color: '#00d9ff' }}>SURGERY</span>
        </span>
      </a>

      {/* Nav desktop */}
      <nav className="hidden lg:flex items-center gap-10" aria-label="Navegación principal">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm relative group"
            style={{
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
              fontWeight: 400,
              letterSpacing: '0.05em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = '#ffffff')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)')
            }
          >
            {link.label}
            {/* Subrayado animado */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: -4, left: 0,
                width: 0, height: 1,
                background: '#00d9ff',
                transition: 'width 0.3s',
              }}
              className="group-hover:w-full"
            />
          </a>
        ))}
      </nav>

      {/* Derecha: banderas + CTA */}
      <div className="hidden lg:flex items-center gap-5">

        <a
          href="#contacto"
          className="text-sm transition-all duration-250 active:scale-95"
          style={{
            background: 'transparent',
            border: '1px solid #00d9ff',
            color: '#00d9ff',
            fontWeight: 500,
            padding: '9px 22px',
            borderRadius: 6,
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = '#00d9ff'
            ;(e.currentTarget as HTMLElement).style.color = '#020d1a'
            ;(e.currentTarget as HTMLElement).style.boxShadow =
              '0 0 20px rgba(0,217,255,0.4)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLElement).style.color = '#00d9ff'
            ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
          }}
        >
          Solicitar demo
        </a>
      </div>

      {/* Hamburguesa mobile */}
      <button
        className="lg:hidden p-2 rounded-md"
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ color: '#00d9ff' }}
      >
        <svg
          width="22" height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {menuOpen ? (
            <>
              <line x1="4" y1="4" x2="18" y2="18" />
              <line x1="18" y1="4" x2="4" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="7"  x2="19" y2="7" />
              <line x1="3" y1="11" x2="19" y2="11" />
              <line x1="3" y1="15" x2="19" y2="15" />
            </>
          )}
        </svg>
      </button>

      {/* Menú mobile */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden absolute top-full left-0 right-0 pb-4 border-t"
          style={{
            backgroundColor: 'rgba(2,13,26,0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderColor: 'rgba(0,217,255,0.15)',
          }}
        >
          <nav className="flex flex-col gap-1 pt-3 px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-2.5 px-2 rounded text-sm"
                style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div
            className="flex items-center justify-between mt-4 pt-3 border-t px-6"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <a
              href="#contacto"
              className="text-sm"
              style={{
                background: '#00d9ff',
                color: '#020d1a',
                fontWeight: 700,
                padding: '8px 18px',
                borderRadius: 6,
                textDecoration: 'none',
              }}
              onClick={() => setMenuOpen(false)}
            >
              Solicitar demo
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
