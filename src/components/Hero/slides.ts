import type { SlideCopy } from './SlideText'

export type SlideId = 'movimiento' | 'precision' | 'calidad'

export interface Slide {
  id: SlideId
  copy: SlideCopy
  imageSrc: string
  imageLabel: string
  imageTag: string
}

export const SLIDES: Slide[] = [
  {
    id: 'movimiento',
    copy: {
      badge: 'Innovación que transforma vidas',
      headline: [
        [{ text: 'Comprometidos con tu' }],
        [{ text: 'mejor versión', cyan: true }],
      ],
      sub: 'Tecnología avanzada en implantes de osteosíntesis para asegurar movimiento, funcionalidad y confianza.',
      accent: 'Tecnología ISO · CE certificada',
    },
    imageSrc: '/IMG/HERO/Slide1.svg',
    imageLabel: 'Personas activas — recuperación de movimiento con implantes de osteosíntesis',
    imageTag: '01 — MOVIMIENTO',
  },
  {
    id: 'precision',
    copy: {
      badge: 'Innovación médica',
      headline: [
        [{ text: 'Precisión que' }],
        [{ text: 'marca la', cyan: true }],
        [{ text: 'diferencia', cyan: true }],
      ],
      sub: 'Implantes de osteosíntesis de alto rendimiento, diseñados para una recuperación segura y eficiente.',
    },
    imageSrc: '/IMG/HERO/Slide2.svg',
    imageLabel: 'Mano con sistema de osteosíntesis — placas y tornillos quirúrgicos',
    imageTag: '02 — PRECISIÓN',
  },
  {
    id: 'calidad',
    copy: {
      badge: 'Respaldo internacional',
      headline: [
        [{ text: 'Calidad que' }],
        [{ text: 'nos', cyan: true }],
        [{ text: 'representa', cyan: true }],
      ],
      sub: 'Certificaciones y estándares que garantizan seguridad, precisión y eficiencia en cada proceso.',
    },
    imageSrc: '/IMG/HERO/Slide3.svg',
    imageLabel: 'Implante de hombro con acabado dorado — calidad certificada',
    imageTag: '03 — CALIDAD',
  },
]
