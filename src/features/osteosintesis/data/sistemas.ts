// Los 5 sistemas de osteosíntesis del catálogo.
// Textos tomados de .docs/ref/Catálogos.Placas001.TraumaSurgery (2).pdf
//
// Solo 'tornillos' trae tabla por ahora (pág. 8 del PDF, generada por script).
// Las tablas de los otros 4 están en el mismo PDF; se transcriben cuando
// el cliente confirme el alcance.

import { filasTornillos } from './tornillos'
import { PILARES_OSTEO, PILARES_PLACAS, type SistemaOsteo } from './tipos'

export const sistemas: SistemaOsteo[] = [
  {
    id: 'tornillos',
    titulo: ['SISTEMA DE', 'TORNILLO'],
    subtitulo: 'CANNULADO DE COMPRESIÓN',
    descripcion:
      'Diseñado para proporcionar {compresión precisa} y estable en procedimientos ortopédicos.',
    imagen: { src: '/IMG/MODEL/PIE.webp', alt: 'Tornillo cannulado de compresión' },
    pilares: PILARES_OSTEO,
    filas: filasTornillos,
    notaTabla:
      'Longitud de rosca en mm. {L} indica la longitud total del tornillo.',
  },
  {
    id: 'clavicula',
    titulo: ['SISTEMA DE', 'CLAVÍCULA'],
    subtitulo: 'PLACAS DE OSTEOSÍNTESIS',
    descripcion:
      'Sistema de osteosíntesis avanzado para {máxima estabilidad quirúrgica} en fracturas de clavícula.',
    imagen: { src: '/IMG/MODEL/HOMBRO.webp', alt: 'Sistema de clavícula' },
    pilares: PILARES_PLACAS,
  },
  {
    id: 'mano',
    titulo: ['SISTEMA DE', 'PLACA DE MANO'],
    subtitulo: '1.3 / 1.5 / 2.0 / 2.3',
    descripcion:
      'Placas para {falanges proximales y metacarpianos}, con bajo torque de inserción y alta retención.',
    imagen: { src: '/IMG/MODEL/MANO.webp', alt: 'Sistema de placa de mano' },
    pilares: PILARES_PLACAS,
  },
  {
    id: 'femur-distal',
    titulo: ['SISTEMA LCP', 'FÉMUR DISTAL'],
    subtitulo: '5.0',
    descripcion:
      'Sistema LCP de {ángulo variable} para fracturas de fémur distal, con tornillos canulados y corticales.',
    imagen: { src: '/IMG/MODEL/RODILLA.webp', alt: 'Sistema LCP fémur distal' },
    pilares: PILARES_PLACAS,
  },
  {
    id: 'tibia-proximal',
    titulo: ['SISTEMA DE', 'TIBIA PROXIMAL'],
    subtitulo: '3.5 / 5.0',
    descripcion:
      'Placas anatómicas para tibia proximal con {fijación angular estable} y tornillos canulados de bloqueo.',
    imagen: { src: '/IMG/MODEL/RODILLA.webp', alt: 'Sistema de tibia proximal' },
    pilares: PILARES_PLACAS,
  },
]

export function getSistema(id: string) {
  return sistemas.find((s) => s.id === id)
}
