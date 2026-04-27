'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp, reducedMotion } from '@/animations/variants'

const DATOS_CONTACTO = [
  {
    tipo: 'telefono',
    label: 'Teléfono',
    valor: '998 436 284',
    href: 'tel:+51998436284',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 12.9v2.1a1.4 1.4 0 01-1.5 1.4 13.86 13.86 0 01-6.04-2.15 13.65 13.65 0 01-4.2-4.2 13.86 13.86 0 01-2.15-6.07A1.4 1.4 0 013.99 2.5H6.1c.7 0 1.3.5 1.4 1.19.09.6.26 1.19.49 1.75.18.46.07.98-.29 1.3L6.77 7.67a11.2 11.2 0 004.2 4.2l.93-.93c.32-.36.84-.47 1.3-.29.56.23 1.15.4 1.75.49.7.11 1.22.71 1.55 1.76z"/>
      </svg>
    ),
  },
  {
    tipo: 'whatsapp',
    label: 'WhatsApp',
    valor: '953 327 198',
    href: 'https://wa.me/51953327198',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M9 1.5A7.5 7.5 0 001.5 9c0 1.32.35 2.56.96 3.64L1.5 16.5l3.97-1.04A7.5 7.5 0 109 1.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M6.5 7.25c.14.7.56 1.36 1.2 1.94.64.57 1.36.92 2.05.98.1.01.2.01.3.01.6 0 .97-.4.97-.4l.48-1.08s-1.2-.56-1.3-.3c-.1.14-.3.6-.3.6s-.4-.14-.88-.56-.66-.82-.66-.82.46-.2.6-.3c.26-.1-.3-1.3-.3-1.3l-1.08.48s-.41.37-.4.97c0 .1 0 .2.01.3z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    tipo: 'whatsapp2',
    label: 'WhatsApp',
    valor: '932 527 371',
    href: 'https://wa.me/51932527371',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M9 1.5A7.5 7.5 0 001.5 9c0 1.32.35 2.56.96 3.64L1.5 16.5l3.97-1.04A7.5 7.5 0 109 1.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M6.5 7.25c.14.7.56 1.36 1.2 1.94.64.57 1.36.92 2.05.98.1.01.2.01.3.01.6 0 .97-.4.97-.4l.48-1.08s-1.2-.56-1.3-.3c-.1.14-.3.6-.3.6s-.4-.14-.88-.56-.66-.82-.66-.82.46-.2.6-.3c.26-.1-.3-1.3-.3-1.3l-1.08.48s-.41.37-.4.97c0 .1 0 .2.01.3z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    tipo: 'email',
    label: 'Email',
    valor: 'traumasurgery.eirl@gmail.com',
    href: 'mailto:traumasurgery.eirl@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
      className="py-24 lg:py-32"
      style={{ background: 'linear-gradient(180deg, var(--bg-deep, #020d1a) 0%, #000c18 100%)', borderTop: '1px solid rgba(0,217,255,0.08)' }}
      aria-labelledby="contacto-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Columna izquierda — información */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              variants={item}
              className="text-xs font-mono tracking-widest uppercase mb-6"
              style={{ color: 'var(--color-accent)', fontWeight: 500, letterSpacing: '0.15em' }}
            >
              Contacto directo
            </motion.p>

            <motion.h2
              id="contacto-heading"
              variants={item}
              className="mb-5"
              style={{
                fontWeight: 700,
                color: '#ffffff',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              Hablemos sobre tu próximo caso
            </motion.h2>

            <motion.p
              variants={item}
              className="mb-10"
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontWeight: 400,
                fontSize: '0.95rem',
                lineHeight: 1.7,
                maxWidth: '42ch',
              }}
            >
              Nuestro equipo técnico está disponible para asesorarte en la selección
              del implante adecuado, disponibilidad de instrumental y logística quirúrgica.
            </motion.p>

            {/* Datos de contacto */}
            <motion.div variants={container} className="flex flex-col gap-4 mb-10">
              {DATOS_CONTACTO.map((dato) => (
                <motion.a
                  key={dato.tipo}
                  variants={item}
                  href={dato.href}
                  target={dato.tipo === 'email' ? undefined : '_blank'}
                  rel={dato.tipo !== 'email' ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 group"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:bg-opacity-100"
                    style={{
                      backgroundColor: 'rgba(0,217,255,0.05)',
                      color: '#00d9ff',
                      border: '1px solid rgba(0,217,255,0.2)',
                    }}
                  >
                    {dato.icon}
                  </div>
                  <div>
                    <p
                      className="text-xs mb-0.5"
                      style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}
                    >
                      {dato.label}
                    </p>
                    <p
                      className="font-mono transition-colors duration-200 group-hover:opacity-80"
                      style={{
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {dato.valor}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Dirección */}
            <motion.div
              variants={item}
              className="flex items-start gap-4 pt-8"
              style={{ borderTop: '1px solid rgba(0,217,255,0.1)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: 'rgba(0,217,255,0.05)', color: '#00d9ff', border: '1px solid rgba(0,217,255,0.2)' }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 1.5C6.51 1.5 4.5 3.51 4.5 6c0 3.75 4.5 10.5 4.5 10.5s4.5-6.75 4.5-10.5c0-2.49-2.01-4.5-4.5-4.5z"/>
                  <circle cx="9" cy="6" r="1.5"/>
                </svg>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
                  Sede principal
                </p>
                <address
                  className="not-italic"
                  style={{
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                  }}
                >
                  Av. Pablo Carriquiry N° 460
                  <br />
                  San Isidro, Lima, Perú
                </address>
              </div>
            </motion.div>
          </motion.div>

          {/* Columna derecha — mapa embed / visual */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative"
          >
            {/* Mapa iframe de Google Maps */}
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                border: '1px solid rgba(0,217,255,0.2)',
                boxShadow: '0 8px 32px rgba(0,217,255,0.05)',
                height: '400px',
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.759186040764!2d-77.03369802469972!3d-12.097697088125185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8c3c18c7ba3%3A0x2d5f1c69c5b76a82!2sAv.%20Pablo%20Carriquiry%20460%2C%20San%20Isidro%2015036%2C%20Per%C3%BA!5e0!3m2!1ses!2spe!4v1713456789012!5m2!1ses!2spe"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación TraumaSurgery — Av. Pablo Carriquiry 460, San Isidro, Lima"
              />
            </div>

            {/* Card flotante sobre el mapa */}
            <div
              className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl flex items-center gap-4"
              style={{
                backgroundColor: 'rgba(4,24,48,0.85)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                border: '1px solid rgba(0,217,255,0.2)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--color-accent, #00d9ff)' }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#020d1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 1.5C6.51 1.5 4.5 3.51 4.5 6c0 3.75 4.5 10.5 4.5 10.5s4.5-6.75 4.5-10.5c0-2.49-2.01-4.5-4.5-4.5z"/>
                  <circle cx="9" cy="6" r="1.5"/>
                </svg>
              </div>
              <div>
                <p style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.85rem' }}>
                  TraumaSurgery EIRL
                </p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem' }}>
                  San Isidro, Lima · Perú
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
