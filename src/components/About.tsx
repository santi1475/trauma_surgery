'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/animations/variants'

export default function About() {
  const prefersReduced = useReducedMotion()
  const containerVariants = prefersReduced ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : staggerContainer
  const itemVariants = prefersReduced ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : fadeInUp

  // Componente reutilizable para las cards con Glassmorphism
  const GlassCard = ({ title, children, isWide = false }: { title: string, children: React.ReactNode, isWide?: boolean }) => (
    <motion.div
      variants={itemVariants}
      className={`p-8 rounded-2xl ${isWide ? 'lg:col-span-3' : 'col-span-1'} relative overflow-hidden`}
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(10, 58, 96, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Resplandor decorativo de fondo en cada card */}
      <div 
        className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 pointer-events-none" 
        style={{ background: 'var(--color-accent)', filter: 'blur(30px)' }}
      />
      <h3
        className="mb-5 uppercase tracking-wide"
        style={{
          color: 'var(--color-primary)',
          fontWeight: 700,
          fontSize: '1.2rem',
          letterSpacing: '0.05em',
        }}
      >
        {title}
      </h3>
      <div 
        className="space-y-4"
        style={{ color: 'var(--color-text)', fontSize: '1rem', lineHeight: 1.6 }}
      >
        {children}
      </div>
    </motion.div>
  )

  return (
    <section 
      id="sobre-nosotros" 
      className="py-24 lg:py-32 relative overflow-hidden" 
      style={{ backgroundColor: 'rgba(247, 249, 252, 1)' }} // Fondo sutilmente gris/azulado para realzar el contraste del cristal
    >
      {/* Elementos decorativos del fondo principal para potenciar el efecto glass */}
      <div 
        className="absolute top-0 right-0 w-[800px] h-[800px] opacity-30 pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,168,204,0.12) 0%, transparent 60%)',
          transform: 'translate(20%, -20%)'
        }}
        aria-hidden="true"
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col gap-16"
        >
          {/* Cabecera de la sección */}
          <div className="max-w-3xl">
            <motion.p
              variants={itemVariants}
              className="text-xs font-mono tracking-widest uppercase mb-4"
              style={{
                color: 'var(--color-accent)',
                fontWeight: 600,
                letterSpacing: '0.15em',
              }}
            >
              SOBRE NOSOTROS
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="leading-tight mb-8"
              style={{
                fontWeight: 800,
                color: 'var(--color-primary)',
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                letterSpacing: '-0.02em',
              }}
            >
              ACERCA DE TRAUMASURGERY
            </motion.h2>
            <motion.div 
              variants={itemVariants}
              className="space-y-4"
              style={{
                color: 'var(--color-text)',
                fontSize: '1.1rem',
                lineHeight: 1.75,
              }}
            >
              <p>
                <strong style={{ color: 'var(--color-primary)' }}>TraumaSurgery</strong> es una empresa enfocada en el desarrollo y distribución de soluciones para la osteosíntesis y reemplazos articulares, incorporando nuevas tecnologías aplicadas a la cirugía en traumatología y ortopedia.
              </p>
              <p>
                Nuestra labor se centra en acercar innovación médica al Perú, mediante sistemas diseñados para optimizar la precisión, estabilidad y eficiencia en cada procedimiento quirúrgico.
              </p>
              <p>
                Impulsados por la innovación y la mejora continua, establecemos alianzas estratégicas a nivel nacional e internacional, garantizando el acceso a tecnología médica que cumple con los más altos estándares de calidad y seguridad.
              </p>
            </motion.div>
          </div>

          {/* Grid de Cards Glassmorphism */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Card Wide - Compromiso Estratégico */}
            <GlassCard title="COMPROMISO ESTRATÉGICO" isWide={true}>
              <p>
                En TraumaSurgery, consideramos que nuestra visión, misión y valores son pilares fundamentales para el crecimiento sostenible de la organización y la efectividad de nuestra planificación estratégica.
              </p>
              <p>
                Estos principios guían cada una de nuestras decisiones y aseguran la alineación de todo nuestro equipo hacia un objetivo común: contribuir al desarrollo de la práctica médica mediante soluciones confiables y de alto nivel.
              </p>
            </GlassCard>

            {/* Card Normal - Misión */}
            <GlassCard title="MISIÓN">
              <p>
                Diseñar, desarrollar y distribuir dispositivos médicos de alta calidad que respondan a las necesidades de pacientes y profesionales de la salud.
              </p>
              <p>
                Nos enfocamos en la investigación y la innovación continua para ofrecer soluciones efectivas, seguras y accesibles, que mejoren los resultados clínicos y la experiencia del paciente.
              </p>
              <p>
                Trabajamos en estrecha colaboración con especialistas, priorizando la ética, la sostenibilidad y la excelencia en cada una de nuestras operaciones.
              </p>
            </GlassCard>

            {/* Card Normal - Visión */}
            <GlassCard title="VISIÓN">
              <p>
                Ser líderes en la innovación de dispositivos médicos, contribuyendo a transformar la atención sanitaria a nivel local, regional e internacional.
              </p>
              <p>
                Aspiramos a un futuro donde el acceso a tecnologías avanzadas permita mejorar la calidad de vida de las personas, respaldado por la confianza de los profesionales de la salud.
              </p>
              <p>
                Buscamos posicionarnos como un aliado estratégico para cirujanos y especialistas, impulsando el desarrollo de nuevas soluciones y estableciendo estándares de excelencia y seguridad en el sector.
              </p>
            </GlassCard>

            {/* Card Destacada - Valores (Diseño alternativo premium) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 p-8 rounded-2xl flex flex-col justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, var(--color-primary), #0a2d4d)',
                color: '#ffffff',
                boxShadow: '0 12px 32px rgba(10, 58, 96, 0.25)',
              }}
            >
              <h3 
                className="mb-8 uppercase tracking-wide" 
                style={{ 
                  fontWeight: 700, 
                  fontSize: '1.2rem',
                  letterSpacing: '0.05em' 
                }}
              >
                Nuestros Valores
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {['Ética', 'Pasión', 'Cooperación', 'Innovación', 'Transparencia', 'Compromiso'].map((val) => (
                  <span 
                    key={val} 
                    className="px-4 py-2 rounded-full text-sm transition-transform hover:scale-105"
                    style={{ 
                      background: 'rgba(255,255,255,0.1)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      fontWeight: 500 
                    }}
                  >
                    {val}
                  </span>
                ))}
              </div>
              
              {/* Detalle visual sutil de fondo */}
              <div 
                className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none"
                style={{ transform: 'rotate(-15deg)' }}
              >
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z"/>
                </svg>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
