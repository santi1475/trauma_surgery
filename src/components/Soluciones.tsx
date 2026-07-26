'use client'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp, reducedMotion } from '@/animations/variants'
import { PixelButton } from '@/components/ui/pixel-button'

export default function Soluciones() {
  const prefersReduced = useReducedMotion()
  const container = prefersReduced ? reducedMotion : staggerContainer
  const item = prefersReduced ? reducedMotion : fadeInUp

  return (
    <section
      id="soluciones"
      className="py-24 lg:py-32"
      style={{ background: 'var(--bg-deep, #020d1a)' }}
      aria-labelledby="soluciones-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Columna Izquierda: Texto */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-5 flex flex-col justify-center"
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
                color: '#ffffff',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              Soluciones destacadas
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-6 text-lg"
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              Sistemas de implantes y dispositivos certificados para cada especialidad
              quirúrgica en traumatología y ortopedia. Diseñados para ofrecer la máxima precisión
              y estabilidad en cada procedimiento.
            </motion.p>
          </motion.div>

          {/* Columna Derecha: Bloques/Columnas de Botones Grandes */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
          >
            {/* Navega a la página de línea de producto: Sistemas de Reemplazo Articular */}
            <PixelButton
              imageSrc="/IMG/HERO/Slide4.webp"
              containerClassName="h-64 sm:h-80 w-full"
              className="text-xl md:text-2xl font-bold"
              href="/productos/reemplazo-articular"
              ariaLabel="Ver línea de producto: Sistemas de Reemplazo Articular"
              loop
            >
              Sistemas de Reemplazo Articular
            </PixelButton>
            {/* Navega a la página de línea de producto: Sistemas de Osteosíntesis */}
            <PixelButton
              imageSrc="/IMG/HERO/Slide3.webp"
              containerClassName="h-64 sm:h-80 w-full sm:mt-12"
              className="text-xl md:text-2xl font-bold"
              href="/productos/osteosintesis"
              ariaLabel="Ver línea de producto: Sistemas de Osteosíntesis"
              loop
            >
              Sistemas de Osteosíntesis
            </PixelButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}