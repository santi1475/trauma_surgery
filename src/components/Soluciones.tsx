'use client'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp, reducedMotion } from '@/animations/variants'

const PRODUCTOS = [
  {
    id: 'mano',
    nombre: 'Sistema de Mano',
    descripcion:
      'Placas y tornillos de titanio de perfil ultra-bajo para fracturas y deformidades de mano, muñeca y radio distal. Compatibles con fluoroscopía intraoperatoria.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 8v20M18 12v16M30 12v16M12 20c0-2 1.5-3 3-3v11M36 20c0-2-1.5-3-3-3v11" />
        <path d="M12 31c0 6 4 9 12 9s12-3 12-9v-3H12v3z" />
      </svg>
    ),
  },
  {
    id: 'placas',
    nombre: 'Placas de Osteosíntesis',
    descripcion:
      'Sistemas de fijación interna para fracturas de extremidades superiores e inferiores. Aleaciones de titanio Ti-6Al-4V con recubrimiento biocompatible.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="14" y="10" width="20" height="28" rx="4" />
        <circle cx="24" cy="16" r="2" />
        <circle cx="24" cy="24" r="2" />
        <circle cx="24" cy="32" r="2" />
        <line x1="14" y1="20" x2="34" y2="20" />
        <line x1="14" y1="28" x2="34" y2="28" />
      </svg>
    ),
  },
  {
    id: 'protesis',
    nombre: 'Prótesis Articular',
    descripcion:
      'Reemplazos totales y parciales de cadera, rodilla y hombro. Superficies articulares de cerámica y polietileno de alto peso molecular.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="18" r="8" />
        <path d="M24 26v14" />
        <path d="M18 34h12" />
        <path d="M20 40h8" />
      </svg>
    ),
  },
  {
    id: 'columna',
    nombre: 'Sistema de Columna',
    descripcion:
      'Instrumentación vertebral completa: tornillos pediculares poliaxiales, barras de titanio y cages intersomáticos para cirugía de columna lumbar y cervical.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="18" y="6" width="12" height="8" rx="2" />
        <rect x="18" y="17" width="12" height="8" rx="2" />
        <rect x="18" y="28" width="12" height="8" rx="2" />
        <line x1="24" y1="14" x2="24" y2="17" />
        <line x1="24" y1="25" x2="24" y2="28" />
        <line x1="14" y1="10" x2="18" y2="10" />
        <line x1="30" y1="10" x2="34" y2="10" />
        <line x1="14" y1="38" x2="18" y2="38" />
        <line x1="30" y1="38" x2="34" y2="38" />
      </svg>
    ),
  },
]

export default function Soluciones() {
  const prefersReduced = useReducedMotion()
  const container = prefersReduced ? reducedMotion : staggerContainer
  const item = prefersReduced ? reducedMotion : fadeInUp

  return (
    <section
      id="soluciones"
      className="py-24 lg:py-32"
      style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
      aria-labelledby="soluciones-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Encabezado sección */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 lg:mb-20 max-w-2xl"
        >
          <motion.p
            variants={item}
            className="text-xs font-mono tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-accent)', fontWeight: 500, letterSpacing: '0.15em' }}
          >
            Portafolio de productos
          </motion.p>
          <motion.h2
            id="soluciones-heading"
            variants={item}
            style={{
              fontWeight: 700,
              color: 'var(--color-primary)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Soluciones destacadas
          </motion.h2>
          <motion.p
            variants={item}
            className="mt-4"
            style={{
              color: 'var(--color-text)',
              fontWeight: 400,
              fontSize: '1rem',
              lineHeight: 1.7,
              maxWidth: '42ch',
            }}
          >
            Sistemas de implantes y dispositivos certificados para cada especialidad
            quirúrgica en traumatología y ortopedia.
          </motion.p>
        </motion.div>

        {/* Grid de productos */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PRODUCTOS.map((producto) => (
            <motion.article
              key={producto.id}
              variants={item}
              whileHover={prefersReduced ? {} : { y: -6, transition: { duration: 0.25 } }}
              className="group flex flex-col p-7 rounded-2xl cursor-default transition-shadow duration-300"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(10,58,96,0.08)',
                boxShadow: '0 2px 12px rgba(10,58,96,0.04)',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 16px 40px rgba(0,168,204,0.12), 0 4px 16px rgba(10,58,96,0.06)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,168,204,0.25)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 2px 12px rgba(10,58,96,0.04)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(10,58,96,0.08)'
              }}
            >
              {/* Icono del producto */}
              <div
                className="w-12 h-12 mb-6 transition-colors duration-300"
                style={{ color: 'var(--color-primary)' }}
              >
                {producto.icon}
              </div>

              {/* Nombre */}
              <h3
                className="mb-3"
                style={{
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  fontSize: '1.05rem',
                  lineHeight: 1.25,
                }}
              >
                {producto.nombre}
              </h3>

              {/* Descripción */}
              <p
                className="flex-1 leading-relaxed"
                style={{
                  color: 'var(--color-text)',
                  fontWeight: 400,
                  fontSize: '0.875rem',
                  lineHeight: 1.65,
                }}
              >
                {producto.descripcion}
              </p>

              {/* Link de acción */}
              <div className="mt-6 flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                <span className="text-sm font-medium">Ver especificaciones</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <line x1="2" y1="7" x2="12" y2="7" />
                  <polyline points="8,3 12,7 8,11" />
                </svg>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
