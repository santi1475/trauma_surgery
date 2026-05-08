'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp, reducedMotion } from '@/animations/variants'

const DATOS_CONTACTO = [
  {
    id: 'telefono',
    label: 'Teléfono',
    valor: '998 436 284',
    href: 'tel:+51998436284',
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 12.9v2.1a1.4 1.4 0 01-1.5 1.4 13.86 13.86 0 01-6.04-2.15 13.65 13.65 0 01-4.2-4.2 13.86 13.86 0 01-2.15-6.07A1.4 1.4 0 013.99 2.5H6.1c.7 0 1.3.5 1.4 1.19.09.6.26 1.19.49 1.75.18.46.07.98-.29 1.3L6.77 7.67a11.2 11.2 0 004.2 4.2l.93-.93c.32-.36.84-.47 1.3-.29.56.23 1.15.4 1.75.49.7.11 1.22.71 1.55 1.76z" />
      </svg>
    ),
  },
  {
    id: 'whatsapp-1',
    label: 'WhatsApp',
    valor: '953 327 198',
    href: 'https://wa.me/51953327198',
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 1.5A7.5 7.5 0 001.5 9c0 1.32.35 2.56.96 3.64L1.5 16.5l3.97-1.04A7.5 7.5 0 109 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 7.25c.14.7.56 1.36 1.2 1.94.64.57 1.36.92 2.05.98.1.01.2.01.3.01.6 0 .97-.4.97-.4l.48-1.08s-1.2-.56-1.3-.3c-.1.14-.3.6-.3.6s-.4-.14-.88-.56-.66-.82-.66-.82.46-.2.6-.3c.26-.1-.3-1.3-.3-1.3l-1.08.48s-.41.37-.4.97c0 .1 0 .2.01.3z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'whatsapp-2',
    label: 'WhatsApp',
    valor: '932 527 371',
    href: 'https://wa.me/51932527371',
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 1.5A7.5 7.5 0 001.5 9c0 1.32.35 2.56.96 3.64L1.5 16.5l3.97-1.04A7.5 7.5 0 109 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 7.25c.14.7.56 1.36 1.2 1.94.64.57 1.36.92 2.05.98.1.01.2.01.3.01.6 0 .97-.4.97-.4l.48-1.08s-1.2-.56-1.3-.3c-.1.14-.3.6-.3.6s-.4-.14-.88-.56-.66-.82-.66-.82.46-.2.6-.3c.26-.1-.3-1.3-.3-1.3l-1.08.48s-.41.37-.4.97c0 .1 0 .2.01.3z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    valor: 'traumasurgery.eirl@gmail.com',
    href: 'mailto:traumasurgery.eirl@gmail.com',
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="14" height="10" rx="2" />
        <polyline points="2,4.5 9,10 16,4.5" />
      </svg>
    ),
  },
]

export default function Contacto() {
  const prefersReduced = useReducedMotion()
  const container = prefersReduced ? reducedMotion : staggerContainer
  const item = prefersReduced ? reducedMotion : fadeInUp

  return (
    <section
      id="contacto"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #020d1a 0%, #010b16 100%)',
        borderTop: '1px solid rgba(0,217,255,0.07)',
      }}
      aria-labelledby="contacto-heading"
    >
      {/* Glow top-center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '50%',
          background: 'radial-gradient(ellipse at top center, rgba(0,82,163,0.14) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 lg:pt-32 pb-0">

        {/* ── Header centrado ─────────────────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-16"
        >
          <motion.span
            variants={item}
            className="inline-block text-xs font-mono tracking-widest uppercase px-4 py-1.5 rounded mb-5"
            style={{
              background: 'rgba(0,168,204,0.10)',
              border: '1px solid rgba(0,168,204,0.28)',
              color: 'var(--color-accent)',
              letterSpacing: '0.15em',
            }}
          >
            Contacto directo
          </motion.span>
          <motion.h2
            id="contacto-heading"
            variants={item}
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              color: '#ffffff',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.8rem)',
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
              margin: '0 0 14px',
            }}
          >
            Hablemos sobre tu{' '}
            <span style={{ color: '#00d9ff' }}>próximo caso</span>
          </motion.h2>
          <motion.p
            variants={item}
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: 14,
              lineHeight: 1.7,
              maxWidth: '52ch',
              margin: '0 auto',
            }}
          >
            Nuestro equipo técnico está disponible para asesorarte en selección de implantes,
            disponibilidad de instrumental y logística quirúrgica en Perú, Bolivia y Colombia.
          </motion.p>
        </motion.div>

        {/* ── Layout: info izquierda + mapa derecha ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start pb-24 lg:pb-32">

          {/* ── Columna izquierda: datos de contacto ─── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {/* Grid 2×2 de datos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {DATOS_CONTACTO.map((dato) => (
                <motion.a
                  key={dato.id}
                  variants={item}
                  href={dato.href}
                  target={dato.id.startsWith('whatsapp') ? '_blank' : undefined}
                  rel={dato.id.startsWith('whatsapp') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 group rounded-xl p-4"
                  style={{
                    textDecoration: 'none',
                    background: 'rgba(4,18,36,0.65)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(10px)',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,217,255,0.25)'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,217,255,0.05)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(4,18,36,0.65)'
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#00d9ff',
                      background: 'rgba(0,217,255,0.08)',
                      border: '1px solid rgba(0,217,255,0.18)',
                      flexShrink: 0,
                      transition: 'background 0.2s',
                    }}
                  >
                    {dato.icon}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 9,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.4)',
                        marginBottom: 2,
                      }}
                    >
                      {dato.label}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: '#ffffff',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        fontVariantNumeric: 'tabular-nums',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        transition: 'color 0.2s',
                      }}
                      className="group-hover:text-[#00d9ff]"
                    >
                      {dato.valor}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Dirección */}
            <motion.div
              variants={item}
              className="flex items-start gap-4 p-5 rounded-xl"
              style={{
                background: 'rgba(4,18,36,0.65)',
                border: '1px solid rgba(0,217,255,0.10)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00d9ff',
                  background: 'rgba(0,217,255,0.08)',
                  border: '1px solid rgba(0,217,255,0.18)',
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 1.5C6.51 1.5 4.5 3.51 4.5 6c0 3.75 4.5 10.5 4.5 10.5s4.5-6.75 4.5-10.5c0-2.49-2.01-4.5-4.5-4.5z" />
                  <circle cx="9" cy="6" r="1.5" />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: 4,
                  }}
                >
                  Sede principal — Lima, Perú
                </p>
                <address
                  className="not-italic"
                  style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.92rem', lineHeight: 1.55 }}
                >
                  Av. Pablo Carriquiry N° 460
                  <br />
                  San Isidro · Lima · Perú
                </address>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    color: 'rgba(0,217,255,0.5)',
                    letterSpacing: '0.08em',
                    marginTop: 6,
                  }}
                >
                  Perú · Bolivia · Colombia · Paraguay
                </p>
              </div>
            </motion.div>

            {/* Horario / disponibilidad */}
            <motion.div
              variants={item}
              className="mt-4 flex items-center gap-3 px-5 py-3 rounded-xl"
              style={{
                background: 'rgba(0,217,255,0.05)',
                border: '1px solid rgba(0,217,255,0.12)',
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#00d9ff',
                  boxShadow: '0 0 8px #00d9ff',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.10em',
                  color: 'rgba(0,217,255,0.8)',
                  textTransform: 'uppercase',
                }}
              >
                Soporte técnico 24 / 7 disponible
              </span>
            </motion.div>
          </motion.div>

          {/* ── Columna derecha: mapa ─── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Contenedor del mapa */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                border: '1px solid rgba(0,217,255,0.18)',
                boxShadow: '0 8px 48px rgba(0,0,0,0.50), 0 0 0 1px rgba(255,255,255,0.02)',
                height: 420,
              }}
            >
              {/* Scanline overlay decorativo sobre el mapa */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(2,13,26,0.35) 0%, transparent 40%, transparent 60%, rgba(2,13,26,0.20) 100%)',
                }}
              />
              {/* Esquinas decorativas */}
              {[
                { top: 10, left: 10 },
                { top: 10, right: 10 },
                { bottom: 10, left: 10 },
                { bottom: 10, right: 10 },
              ].map((pos, i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className="absolute z-20 pointer-events-none"
                  style={{
                    width: 14,
                    height: 14,
                    borderTop: i < 2 ? '2px solid rgba(0,217,255,0.55)' : 'none',
                    borderBottom: i >= 2 ? '2px solid rgba(0,217,255,0.55)' : 'none',
                    borderLeft: i % 2 === 0 ? '2px solid rgba(0,217,255,0.55)' : 'none',
                    borderRight: i % 2 === 1 ? '2px solid rgba(0,217,255,0.55)' : 'none',
                    ...pos,
                  }}
                />
              ))}

              {/* Mapa de Google Maps — Av. Pablo Carriquiry 460, San Isidro, Lima */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.759186040764!2d-77.03369802469972!3d-12.097697088125185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8c3c18c7ba3%3A0x2d5f1c69c5b76a82!2sAv.%20Pablo%20Carriquiry%20460%2C%20San%20Isidro%2015036%2C%20Per%C3%BA!5e0!3m2!1ses!2spe!4v1713456789012!5m2!1ses!2spe"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(20%) contrast(1.05)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación TraumaSurgery EIRL — Av. Pablo Carriquiry 460, San Isidro, Lima, Perú"
              />
            </div>

            {/* Card flotante sobre mapa — info dirección */}
            <div
              className="absolute bottom-5 left-5 right-5 flex items-center gap-4 p-4 rounded-xl"
              style={{
                background: 'rgba(2,10,22,0.88)',
                backdropFilter: 'blur(18px) saturate(180%)',
                border: '1px solid rgba(0,217,255,0.18)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: '#00d9ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="#020d1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 1.5C6.51 1.5 4.5 3.51 4.5 6c0 3.75 4.5 10.5 4.5 10.5s4.5-6.75 4.5-10.5c0-2.49-2.01-4.5-4.5-4.5z" />
                  <circle cx="9" cy="6" r="1.5" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.84rem', marginBottom: 1 }}>
                  TraumaSurgery EIRL
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
                  Av. Pablo Carriquiry 460 · San Isidro · Lima
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Av.+Pablo+Carriquiry+460+San+Isidro+Lima+Peru"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: '#00d9ff',
                  textDecoration: 'none',
                  flexShrink: 0,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
              >
                Cómo llegar →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
