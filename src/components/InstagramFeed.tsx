'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp, scaleIn, reducedMotion } from '@/animations/variants'

// Posts reales con las imágenes proporcionadas
const INSTAGRAM_POSTS = [
  { id: 1, src: '/IMG_7229.PNG', tag: 'Nosotros', type: 'imagen' },
  { id: 2, src: '/IMG_2435 (1).PNG', tag: 'Cirugía de Mano', type: 'imagen' },
  { id: 3, src: '/NoTodasLaRodillas001.TraumaS (1).png', tag: 'Especialidades', type: 'imagen' },
  { id: 4, src: '/SolucionesAMedida01.TS.png', tag: 'Soluciones', type: 'imagen' },
  { id: 5, src: '/Certificaciones.TS.png', tag: 'Certificaciones', type: 'imagen' },
]

export default function InstagramFeed() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const prefersReduced = useReducedMotion()
  
  const container = prefersReduced ? reducedMotion : staggerContainer
  const item = prefersReduced ? reducedMotion : fadeInUp
  const cardAnim = prefersReduced ? reducedMotion : scaleIn

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedImage])

  return (
    <section
      id="aliados"
      className="py-24 lg:py-32"
      style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
      aria-labelledby="instagram-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Encabezado */}
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
                fontWeight: 700,
                color: 'var(--color-primary)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              Síguenos en Instagram
            </motion.h2>
          </div>

          <motion.a
            variants={item}
            href="https://www.instagram.com/traumasurgeryperu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 self-start sm:self-auto text-sm transition-all duration-200 hover:opacity-85 shrink-0"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
              fontWeight: 600,
              padding: '10px 22px',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            @traumasurgery.eirl
          </motion.a>
        </motion.div>

        {/* Grid de posts */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4"
        >
          {INSTAGRAM_POSTS.map((post) => (
            <motion.button
              key={post.id}
              variants={cardAnim}
              whileHover={prefersReduced ? {} : { scale: 1.02, y: -4 }}
              onClick={() => setSelectedImage(post.src)}
              className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm bg-white border border-gray-100"
              aria-label={`Ver imagen: ${post.tag}`}
            >
              {/* Imagen del post */}
              <img
                src={post.src}
                alt={post.tag}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay al hover */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: 'rgba(10,58,96,0.6)', backdropFilter: 'blur(2px)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>

              {/* Etiqueta del post */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-start pointer-events-none">
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                  style={{
                    backgroundColor: 'rgba(10,58,96,0.7)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  {post.tag}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Modal Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
              style={{ backgroundColor: 'rgba(10,58,96,0.92)', backdropFilter: 'blur(10px)' }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Vista ampliada"
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                />
                
                {/* Botón cerrar */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 md:-right-12 text-white hover:text-accent p-2 transition-colors"
                  aria-label="Cerrar vista"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
