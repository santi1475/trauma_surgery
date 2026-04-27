'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp, scaleIn, reducedMotion } from '@/animations/variants'

const CERTIFICACIONES = [
  { label: 'ISO 13485', descripcion: 'Gestión de Calidad dispositivos médicos' },
  { label: 'CE Mark', descripcion: 'Certificación del mercado europeo' },
  { label: 'DIGEMID', descripcion: 'Registro sanitario Perú' },
  { label: 'INVIMA', descripcion: 'Aprobación sanitaria Colombia' },
]

const VENTAJAS = [
  'Adaptación a anatomía del paciente',
  'Coordinación con equipos de cirugía',
  'Soporte técnico intraoperatorio',
  'Disponibilidad inmediata de instrumental',
]

export default function InfoCards() {
  const prefersReduced = useReducedMotion()
  const container = prefersReduced ? reducedMotion : staggerContainer
  const item = prefersReduced ? reducedMotion : fadeInUp
  const badge = prefersReduced ? reducedMotion : scaleIn

  return (
    <section
      id="recursos"
      className="py-24 lg:py-32"
      style={{ background: 'var(--bg-deep, #020d1a)' }}
      aria-label="Ventajas y certificaciones"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Card 1: Soluciones personalizadas — fondo navy */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-3xl p-10 lg:p-12 flex flex-col"
            style={{ backgroundColor: 'rgba(4,24,48,0.85)', border: '1px solid rgba(0,217,255,0.2)' }}
          >
            <motion.span
              variants={item}
              className="text-xs font-mono tracking-widest uppercase mb-6 block"
              style={{ color: 'var(--color-accent)', fontWeight: 500, letterSpacing: '0.15em' }}
            >
              Servicio especializado
            </motion.span>

            <motion.h2
              variants={item}
              className="mb-5"
              style={{
                fontWeight: 700,
                color: '#FFFFFF',
                fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              Soluciones personalizadas para casos complejos
            </motion.h2>

            <motion.p
              variants={item}
              className="mb-8"
              style={{
                color: 'rgba(255,255,255,0.72)',
                fontWeight: 400,
                fontSize: '0.95rem',
                lineHeight: 1.7,
              }}
            >
              Trabajamos junto al equipo quirúrgico para diseñar la solución más
              adecuada para cada caso. Precisión, estabilidad y biocompatibilidad en
              cada intervención.
            </motion.p>

            <motion.ul variants={container} className="flex flex-col gap-3 flex-1">
              {VENTAJAS.map((v, i) => (
                <motion.li
                  key={i}
                  variants={item}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                    aria-hidden="true"
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <polyline
                        points="1.5,4 3,5.5 6.5,2"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    style={{
                      color: 'rgba(255,255,255,0.85)',
                      fontWeight: 400,
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {v}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.a
              variants={item}
              href="#contacto"
              className="mt-10 inline-flex items-center gap-2 self-start text-sm transition-opacity duration-200 hover:opacity-80"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: '#FFFFFF',
                fontWeight: 700,
                padding: '11px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Consultar caso
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="2" y1="6.5" x2="11" y2="6.5" />
                <polyline points="7.5,3 11,6.5 7.5,10" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Card 2: Estándares y certificaciones — fondo blanco con borde */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-3xl p-10 lg:p-12 flex flex-col"
            style={{
              backgroundColor: 'rgba(4,24,48,0.85)',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <motion.span
              variants={item}
              className="text-xs font-mono tracking-widest uppercase mb-6 block"
              style={{ color: 'var(--color-gold)', fontWeight: 500, letterSpacing: '0.15em' }}
            >
              Calidad garantizada
            </motion.span>

            <motion.h2
              variants={item}
              className="mb-5"
              style={{
                fontWeight: 700,
                color: '#ffffff',
                fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              Estándares y certificaciones internacionales
            </motion.h2>

            <motion.p
              variants={item}
              className="mb-10"
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontWeight: 400,
                fontSize: '0.95rem',
                lineHeight: 1.7,
              }}
            >
              Todos nuestros dispositivos cumplen los más exigentes estándares de
              calidad y seguridad. Trazabilidad completa de cada componente desde
              fabricación hasta implantación.
            </motion.p>

            {/* Badges de certificación */}
            <motion.div variants={container} className="grid grid-cols-2 gap-4 flex-1">
              {CERTIFICACIONES.map((cert) => (
                <motion.div
                  key={cert.label}
                  variants={badge}
                  className="flex flex-col p-5 rounded-2xl"
                  style={{
                    backgroundColor: 'rgba(2,13,26,0.5)',
                    border: '1px solid rgba(212,175,55,0.15)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  <span
                    className="font-mono text-sm mb-1"
                    style={{ fontWeight: 700, color: 'var(--color-gold)', fontSize: '0.95rem' }}
                  >
                    {cert.label}
                  </span>
                  <span
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 400,
                      fontSize: '0.78rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {cert.descripcion}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Sello decorativo */}
            <motion.div
              variants={item}
              className="mt-8 flex items-center gap-3 pt-6"
              style={{ borderTop: '1px solid rgba(212,175,55,0.2)' }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M8 1L9.8 5.5L14.5 5.5L10.9 8.3L12.2 13L8 10.2L3.8 13L5.1 8.3L1.5 5.5L6.2 5.5Z"
                    fill="#D4AF37"
                  />
                </svg>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                <strong style={{ color: '#ffffff', fontWeight: 600 }}>Excelencia verificada</strong>{' '}
                — trazabilidad completa de implante a paciente.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
