'use client'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const NAV_LINKS = [
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Productos',  href: '#productos' },
  { label: 'Recursos',   href: '#recursos' },
  { label: 'Instagram',    href: '#aliados' },
  { label: 'Contacto',   href: '#contacto' },
]

const COUNTRIES = [
  { flag: '🇵🇪', name: 'Perú',     code: 'PE' },
  { flag: '🇧🇴', name: 'Bolivia',  code: 'BO' },
  { flag: '🇨🇴', name: 'Colombia', code: 'CO' },
  { flag: '🇺🇾', name: 'Paraguay',  code: 'PY' },
]

const TOP_H = 36

// Umbrales — separados para estilos vs. ocultamiento.
const STYLE_THRESHOLD = 60   // px hasta los que cambia padding/background
const HIDE_THRESHOLD = 80    // px bajo los cuales el header se queda visible

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuOpenRef = useRef(menuOpen)

  // Espejo del estado para leerlo dentro del callback de ScrollTrigger sin deps.
  useEffect(() => {
    menuOpenRef.current = menuOpen
  }, [menuOpen])

  // ── GSAP ScrollTrigger ──────────────────────────────────────────────
  // Anima yPercent del header según dirección del scroll. La animación
  // corre vía GSAP sobre el DOM directamente — cero re-renders de React.
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const el = headerRef.current
    if (!el) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.set(el, { yPercent: 0, force3D: true })
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.55, ease: 'power2.out' })

      let lastDir = -1          // 1 = down, -1 = up
      let lastScrolled = false

      const showHide = (hide: boolean) => {
        gsap.to(el, {
          yPercent: hide ? -100 : 0,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll()

          // Estilos: padding/background — flip por umbral, no por frame.
          const isScrolled = y > STYLE_THRESHOLD
          if (isScrolled !== lastScrolled) {
            lastScrolled = isScrolled
            setScrolled(isScrolled)
          }

          // Cerca del tope o menú móvil abierto → forzar visible.
          if (y < HIDE_THRESHOLD || menuOpenRef.current) {
            if (lastDir !== -1) {
              lastDir = -1
              showHide(false)
            }
            return
          }

          const dir = self.direction
          if (dir === lastDir) return
          lastDir = dir
          showHide(dir === 1)
        },
      })
    }, headerRef)

    return () => ctx.revert()
  }, [])

  // Al abrir el menú móvil, restaurar inmediatamente la posición.
  useLayoutEffect(() => {
    if (!menuOpen || !headerRef.current) return
    gsap.to(headerRef.current, {
      yPercent: 0,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [menuOpen])

  return (
    <>

      {/* ── Main Header ── */}
      <header
        ref={headerRef}
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between will-change-transform"
        style={{
          padding: scrolled ? '12px 60px' : '18px 60px',
          background: scrolled ? 'rgba(1,7,15,0.92)' : '#01070f',
          backdropFilter: scrolled ? 'blur(28px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(180%)' : 'none',
          borderBottom: '1px solid rgba(0,217,255,0.18)',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.45)' : '0 1px 0 rgba(0,217,255,0.05)',
          transition: 'padding 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          style={{ textDecoration: 'none' }}
          aria-label="TraumaSurgery — Inicio"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src="/ig/IMG_7229.PNG" alt="Logo TraumaSurgery" className="h-10 w-auto" />
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
        <nav
          className="hidden lg:flex items-center gap-7"
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={`${link.label}-${link.href}`}
              href={link.href}
              className="relative group"
              style={{
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                fontWeight: 400,
                letterSpacing: '0.08em',
                fontSize: 12,
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = '#ffffff')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)')
              }
            >
              {link.label}
              {/* Subrayado animado cian */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: -3,
                  left: 0,
                  width: 0,
                  height: 1,
                  background: 'linear-gradient(90deg, #00d9ff, #0088aa)',
                  transition: 'width 0.3s ease',
                }}
                className="group-hover:w-full"
              />
            </a>
          ))}
        </nav>

        {/* Derecha: CTA */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href="#contacto"
            className="text-sm transition-all duration-200 active:scale-95"
            style={{
              background: 'transparent',
              border: '1px solid rgba(0,217,255,0.6)',
              color: '#00d9ff',
              fontWeight: 500,
              padding: '8px 22px',
              borderRadius: 6,
              textDecoration: 'none',
              letterSpacing: '0.06em',
              fontSize: 12,
              textTransform: 'uppercase',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#00d9ff'
              ;(e.currentTarget as HTMLElement).style.color = '#020d1a'
              ;(e.currentTarget as HTMLElement).style.boxShadow =
                '0 0 24px rgba(0,217,255,0.35)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLElement).style.color = '#00d9ff'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            Contacto
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
            width="22"
            height="22"
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

        {/* Menú mobile desplegable */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 pb-4 border-t"
            style={{
              backgroundColor: 'rgba(2,13,26,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderColor: 'rgba(0,217,255,0.12)',
            }}
          >
            <nav className="flex flex-col gap-1 pt-3 px-6" aria-label="Menú móvil">
              {NAV_LINKS.map((link) => (
                <a
                  key={`mobile-${link.label}`}
                  href={link.href}
                  className="py-2.5 px-2 rounded"
                  style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontWeight: 400,
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    textDecoration: 'none',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            {/* Banderas mobile */}
            <div
              className="flex items-center gap-2 mt-3 px-8"
              style={{ flexWrap: 'wrap' }}
            >
              {COUNTRIES.map((c) => (
                <div
                  key={`m-${c.code}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '1px solid rgba(0,217,255,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                    }}
                  >
                    {c.flag}
                  </div>
                  <span
                    style={{
                      fontSize: 9,
                      color: 'rgba(255,255,255,0.3)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="flex items-center justify-between mt-4 pt-3 border-t px-6"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <a
                href="#contacto"
                style={{
                  background: '#00d9ff',
                  color: '#020d1a',
                  fontWeight: 700,
                  padding: '8px 18px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
                onClick={() => setMenuOpen(false)}
              >
                Solicitar demo
              </a>
            </div>
          </motion.div>
        )}
      </header>
    </>
  )
}
