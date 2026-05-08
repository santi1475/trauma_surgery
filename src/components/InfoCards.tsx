'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp, scaleIn, reducedMotion } from '@/animations/variants'
// Lucide icons — temporales. Reemplazar por SVGs personalizados:
// 1. Importa tu SVG como componente React (o usa <img>)
// 2. Sustituye el campo `icon` de cada DIFERENCIAL
// 3. Elimina la importación de lucide-react cuando todos estén reemplazados
import { Gem, ScanLine, Wind, BadgeCheck, Cpu } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface Diferencial {
  id: string
  /** Temporalmente: ícono de lucide-react. Reemplazar por SVG personalizado */
  icon: ReactNode
  title: string
  description: string
  accentColor: string
}

const DIFERENCIALES: Diferencial[] = [
  {
    id: 'titanio',
    icon: <Gem size={20} strokeWidth={1.5} />,
    title: 'Aleación de titanio',
    description: 'Titanio médico Grado 4. Biocompatible, ligero y de alta resistencia mecánica para implantes de larga duración.',
    accentColor: '#00d9ff',
  },
  {
    id: 'anatomico',
    icon: <ScanLine size={20} strokeWidth={1.5} />,
    title: 'Diseño anatómico',
    description: 'Geometría por lateralidad, adaptada a la morfología ósea de la población latinoamericana y verificada con cirujanos.',
    accentColor: '#00bfff',
  },
  {
    id: 'esterilizable',
    icon: <Wind size={20} strokeWidth={1.5} />,
    title: 'Esterilizable',
    description: 'Compatible con autoclave y óxido de etileno. Instrumental reutilizable con ciclos de esterilización validados.',
    accentColor: '#4dd0ff',
  },
  {
    id: 'calidad',
    icon: <BadgeCheck size={20} strokeWidth={1.5} />,
    title: 'Calidad certificada',
    description: 'ISO 13485 · CE Mark · DIGEMID · INVIMA. Trazabilidad completa desde la fabricación hasta la implantación.',
    accentColor: '#D4AF37',
  },
  {
    id: 'innovacion',
    icon: <Cpu size={20} strokeWidth={1.5} />,
    title: 'Innovación continua',
    description: 'I+D constante en colaboración con cirujanos especializados en traumatología, ortopedia y reemplazos articulares.',
    accentColor: '#00a8cc',
  },
]

const CERTIFICACIONES = [
  { label: 'ISO 13485', descripcion: 'Gestión de calidad dispositivos médicos' },
  { label: 'CE Mark', descripcion: 'Certificación mercado europeo' },
  { label: 'DIGEMID', descripcion: 'Registro sanitario Perú' },
  { label: 'INVIMA', descripcion: 'Aprobación sanitaria Colombia' },
]

const VENTAJAS = [
  'Adaptación a la anatomía de cada paciente',
  'Coordinación directa con el equipo quirúrgico',
  'Soporte técnico intraoperatorio disponible',
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
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ background: '#020d1a' }}
      aria-label="Diferenciales, ventajas y certificaciones"
    >
      {/* Fondo: grid técnico sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(0,168,204,0.025) 59px, rgba(0,168,204,0.025) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(0,168,204,0.025) 59px, rgba(0,168,204,0.025) 60px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header de sección ─────────────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <motion.span
              variants={item}
              className="inline-block text-xs font-mono tracking-widest uppercase px-4 py-1.5 rounded mb-4"
              style={{
                background: 'rgba(0,168,204,0.10)',
                border: '1px solid rgba(0,168,204,0.30)',
                color: 'var(--color-accent)',
                letterSpacing: '0.15em',
              }}
            >
              Diferenciales
            </motion.span>
            <motion.h2
              variants={item}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: '#ffffff',
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Por qué{' '}
              <span style={{ color: '#00d9ff' }}>TraumaSurgery</span>
            </motion.h2>
          </div>
          <motion.p
            variants={item}
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 13,
              maxWidth: 340,
              lineHeight: 1.65,
              textAlign: 'right',
            }}
            className="hidden sm:block"
          >
            Estándares de fabricación que garantizan seguridad, precisión y durabilidad en cada implante.
          </motion.p>
        </motion.div>

        {/* ── Grid de 5 diferenciales ───────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16"
        >
          {DIFERENCIALES.map((dif, i) => (
            <motion.div
              key={dif.id}
              variants={item}
              whileHover={
                prefersReduced ? {} : {
                  y: -4,
                  borderColor: `${dif.accentColor}40`,
                  transition: { duration: 0.22 },
                }
              }
              className="flex flex-col p-5 rounded-2xl"
              style={{
                background: 'rgba(4,18,36,0.70)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(8px)',
                transition: 'border-color 0.22s, box-shadow 0.22s',
                cursor: 'default',
              }}
            >
              {/* Ícono en contenedor circular */}
              {/* Para reemplazar: cambia el <div> por tu SVG personalizado */}
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: `${dif.accentColor}12`,
                  border: `1px solid ${dif.accentColor}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: dif.accentColor,
                  marginBottom: 14,
                  flexShrink: 0,
                }}
              >
                {dif.icon}
              </div>

              {/* Título */}
              <p
                style={{
                  fontWeight: 600,
                  color: '#ffffff',
                  fontSize: 13,
                  letterSpacing: '0.01em',
                  marginBottom: 6,
                  lineHeight: 1.3,
                }}
              >
                {dif.title}
              </p>

              {/* Descripción */}
              <p
                style={{
                  color: 'rgba(255,255,255,0.42)',
                  fontSize: 11,
                  lineHeight: 1.65,
                  flex: 1,
                }}
              >
                {dif.description}
              </p>

              {/* Indicador de color en la base */}
              <div
                style={{
                  height: 2,
                  borderRadius: 1,
                  background: `linear-gradient(90deg, ${dif.accentColor}60, transparent)`,
                  marginTop: 14,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Línea decorativa inferior */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,168,204,0.22), transparent)' }}
      />
    </section>
  )
}
