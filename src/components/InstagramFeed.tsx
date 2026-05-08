'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp, reducedMotion } from '@/animations/variants'

const INSTAGRAM_POSTS = [
  { id: 1, src: '/ig/IMG_7229.PNG',                        tag: 'Nosotros',       featured: true  },
  { id: 2, src: '/ig/IMG_2435 (1).PNG',                    tag: 'Cirugía de Mano', featured: false },
  { id: 3, src: '/ig/NoTodasLaRodillas001.TraumaS (1).png', tag: 'Especialidades', featured: false },
  { id: 4, src: '/ig/SolucionesAMedida01.TS.png',          tag: 'Soluciones',     featured: false },
  { id: 5, src: '/ig/Certificaciones.TS.png',              tag: 'Certificaciones', featured: false },
]

export default function InstagramFeed() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const prefersReduced = useReducedMotion()

  const container = prefersReduced ? reducedMotion : staggerContainer
  const item = prefersReduced ? reducedMotion : fadeInUp

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedImage])

  const featured = INSTAGRAM_POSTS.find((p) => p.featured)!
  const rest = INSTAGRAM_POSTS.filter((p) => !p.featured)

  return (
    <section
      id="aliados"
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ background: '#030f1e' }}
      aria-labelledby="instagram-heading"
    >
      {/* Glow decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(0,82,163,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Línea decorativa superior */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,168,204,0.20), transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <motion.p
              variants={item}
              className="text-xs font-mono tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-accent)', fontWeight: 500, letterSpacing: '0.15em' }}
            >
              Comunidad médica
            </motion.p>
            <motion.h2
              id="instagram-heading"
              variants={item}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: '#ffffff',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Síguenos en{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Instagram
              </span>
            </motion.h2>
          </div>

          <motion.a
            variants={item}
            href="https://www.instagram.com/traumasurgeryperu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 self-start sm:self-auto text-sm shrink-0"
            style={{
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.10)',
              fontWeight: 600,
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.08em',
            }}
            whileHover={
              prefersReduced
                ? {}
                : {
                    background: 'rgba(240,148,51,0.08)',
                    borderColor: 'rgba(240,148,51,0.30)',
                    color: '#f09433',
                  }
            }
          >
            {/* Ícono Instagram */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            @traumasurgery.eirl
          </motion.a>
        </motion.div>

        {/* ── Grid dinámico: featured (2×2) + 4 cuadradas ──────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid gap-3"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 220px)',
          }}
        >
          {/* Post destacado — 2×2 */}
          <motion.button
            variants={item}
            whileHover={prefersReduced ? {} : { scale: 1.015, transition: { duration: 0.22 } }}
            onClick={() => setSelectedImage(featured.src)}
            className="relative rounded-2xl overflow-hidden group"
            style={{
              gridColumn: '1 / 3',
              gridRow: '1 / 3',
              background: 'rgba(4,24,48,0.5)',
              border: '1px solid rgba(0,217,255,0.12)',
            }}
            aria-label={`Ver imagen: ${featured.tag}`}
          >
            <img
              src={featured.src}
              alt={featured.tag}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              style={{ background: 'rgba(2,13,26,0.60)', backdropFilter: 'blur(4px)' }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
            {/* Tag */}
            <PostTag tag={featured.tag} />
          </motion.button>

          {/* 4 posts en cuadrícula */}
          {rest.map((post, i) => (
            <motion.button
              key={post.id}
              variants={item}
              custom={i}
              whileHover={prefersReduced ? {} : { scale: 1.02, y: -2, transition: { duration: 0.2 } }}
              onClick={() => setSelectedImage(post.src)}
              className="relative rounded-xl overflow-hidden group"
              style={{
                background: 'rgba(4,24,48,0.5)',
                border: '1px solid rgba(0,217,255,0.08)',
              }}
              aria-label={`Ver imagen: ${post.tag}`}
            >
              <img
                src={post.src}
                alt={post.tag}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                style={{ background: 'rgba(2,13,26,0.55)', backdropFilter: 'blur(3px)' }}
              />
              <PostTag tag={post.tag} />
            </motion.button>
          ))}
        </motion.div>

        {/* ── Pie de sección ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-center mt-10"
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.25)',
              textTransform: 'uppercase',
            }}
          >
            Contenido actualizado regularmente · Síguenos para más
          </span>
        </motion.div>
      </div>

      {/* ── Lightbox ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
            style={{ backgroundColor: 'rgba(2,8,20,0.96)', backdropFilter: 'blur(16px)' }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Borde decorativo */}
              <div
                style={{
                  position: 'absolute',
                  inset: -1,
                  borderRadius: 14,
                  border: '1px solid rgba(0,217,255,0.20)',
                  pointerEvents: 'none',
                }}
              />
              <img
                src={selectedImage}
                alt="Vista ampliada"
                className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 md:-right-12 p-2 transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#00d9ff')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
                aria-label="Cerrar vista"
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Línea decorativa inferior */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,168,204,0.20), transparent)' }}
      />
    </section>
  )
}

function PostTag({ tag }: { tag: string }) {
  return (
    <div className="absolute bottom-3 left-3 pointer-events-none">
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.85)',
          background: 'rgba(2,13,26,0.75)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0,217,255,0.22)',
          padding: '3px 9px',
          borderRadius: 4,
        }}
      >
        {tag}
      </span>
    </div>
  )
}
