// Los sistemas de osteosíntesis del catálogo.
//
// Cada sistema apunta a su propio catálogo oficial en PDF, publicado en
// `public/docs/<id>.pdf`. El PDF del fabricante es la vista principal del
// modal: manda el documento, no una transcripción nuestra.
//
// Las tablas transcritas (clavícula, húmero, tornillo de compresión y tibia
// proximal 3.5) siguen en el repositorio y en los campos `placas`, `codigos`
// e `instrumental`. No se pintan mientras el sistema tenga PDF; quedan como
// respaldo y como fuente de datos si más adelante hace falta buscar por
// código, algo que estos PDF no permiten (su texto está vectorizado).

import { instrumentalClavicula, placasClavicula } from './clavicula'
import { codigosHumero, instrumentalHumero } from './humero'
import { codigosTibia35, instrumentalTibia35, placasTibia35 } from './tibiaProximal35'
import { filasTornillos } from './tornillos'
import { PILARES_OSTEO, PILARES_PLACAS, type Hueco, type SistemaOsteo } from './tipos'

/**
 * Fotos de tornillo de la pág. 8, a la izquierda de la matriz. Los anchos son
 * los del bbox: las tres piezas están a escala entre sí, y esa diferencia de
 * tamaño es justo lo que ilustra la escalera de longitudes de la tabla.
 */
const HUECOS_TORNILLOS: Hueco[] = [
  { ref: '001', ratio: 0.29, ancho: 53.9, alt: 'Tornillos cannulados sin cabeza, corto y largo' },
  { ref: '002', ratio: 0.3, ancho: 41.3, alt: 'Tornillos cannulados sin cabeza, medida media' },
  { ref: '003', ratio: 0.28, ancho: 17.9, alt: 'Tornillo cannulado sin cabeza, medida corta' },
]

export const sistemas: SistemaOsteo[] = [
  {
    id: 'clavicula',
    titulo: ['SISTEMA DE', 'CLAVÍCULA'],
    subtitulo: 'PLACAS DE OSTEOSÍNTESIS',
    descripcion:
      'Sistema de osteosíntesis avanzado para {máxima estabilidad quirúrgica} en fracturas de clavícula.',
    imagen: { src: '/IMG/CATALOGO/clavicula.webp', alt: 'Placa de clavícula fijada con tornillos' },
    pilares: PILARES_PLACAS,
    fuente: 'Catálogo Sistema de Clavícula',
    placas: placasClavicula,
    instrumental: instrumentalClavicula,
    pdf: {
      url: '/docs/clavicula.pdf',
      titulo: 'Catálogo Oficial — Sistema de Clavícula',
      peso: '8.8 MB',
      paginas: 4,
    },
  },
  {
    id: 'humero',
    titulo: ['SISTEMA DE', 'HÚMERO'],
    subtitulo: 'PLACAS DE OSTEOSÍNTESIS',
    descripcion:
      'Soluciones anatómicas para {fijación estable y segura} en fracturas del húmero.',
    imagen: { src: '/IMG/CATALOGO/humero.webp', alt: 'Placa de húmero proximal con tornillos de bloqueo' },
    pilares: PILARES_PLACAS,
    fuente: 'Catálogo Sistema de Húmero',
    codigos: codigosHumero,
    instrumental: instrumentalHumero,
    pdf: {
      url: '/docs/humero.pdf',
      titulo: 'Catálogo Oficial — Sistema de Húmero',
      peso: '9.4 MB',
      paginas: 4,
    },
  },
  {
    id: 'muneca',
    titulo: ['SISTEMA DE', 'MUÑECA'],
    subtitulo: 'ÁNGULO VARIABLE',
    descripcion:
      'Placas de radio distal de {ángulo variable}, en versión estrecha y estándar, izquierda y derecha.',
    imagen: { src: '/IMG/CATALOGO/muneca.webp', alt: 'Placa de muñeca de ángulo variable' },
    pilares: PILARES_PLACAS,
    fuente: 'Catálogo Sistema de Muñeca',
    pdf: {
      url: '/docs/muneca.pdf',
      titulo: 'Catálogo Oficial — Sistema de Muñeca',
      peso: '13.6 MB',
      paginas: 6,
    },
  },
  {
    id: 'radio-distal-galaxy',
    titulo: ['SISTEMA LCP', 'RADIO DISTAL GALAXY'],
    subtitulo: 'NARROW / STANDARD PLATE',
    descripcion:
      'Placas LCP de radio distal en anchos de 22 y 25 mm, con {geometría diferenciada} para lado izquierdo y derecho.',
    imagen: { src: '/IMG/CATALOGO/radio-distal-galaxy.webp', alt: 'Placa LCP de radio distal Galaxy' },
    pilares: PILARES_PLACAS,
    fuente: 'Catálogo Sistema LCP Radio Distal Galaxy',
    pdf: {
      url: '/docs/radio-distal-galaxy.pdf',
      titulo: 'Catálogo Oficial — LCP Radio Distal Galaxy',
      peso: '12.3 MB',
      paginas: 4,
    },
  },
  {
    id: 'placa-de-mano',
    titulo: ['SISTEMA DE', 'PLACA DE MANO'],
    subtitulo: '1.3 / 1.5 / 2.0 / 2.3',
    descripcion:
      'Placas para {falanges y metacarpianos} en cuatro diámetros, con bajo perfil y alta retención.',
    imagen: { src: '/IMG/CATALOGO/placa-de-mano.webp', alt: 'Placas de mano sobre metacarpianos' },
    pilares: PILARES_PLACAS,
    fuente: 'Catálogo Sistema de Placa de Mano',
    pdf: {
      url: '/docs/placa-de-mano.pdf',
      titulo: 'Catálogo Oficial — Sistema de Placa de Mano',
      peso: '9.9 MB',
      paginas: 4,
    },
  },
  {
    id: 'tibia-proximal-35',
    titulo: ['SISTEMA DE', 'TIBIA PROXIMAL'],
    subtitulo: '3.5',
    descripcion:
      'Placas anatómicas para tibia proximal con {fijación angular estable} y tornillos canulados de bloqueo.',
    imagen: { src: '/IMG/CATALOGO/tibia-proximal-35.webp', alt: 'Placa de tibia proximal 3.5' },
    pilares: PILARES_PLACAS,
    fuente: 'Catálogo Sistema de Tibia Proximal 3.5',
    placas: placasTibia35,
    codigos: codigosTibia35,
    instrumental: instrumentalTibia35,
    pdf: {
      url: '/docs/tibia-proximal-35.pdf',
      titulo: 'Catálogo Oficial — Tibia Proximal 3.5',
      peso: '9.6 MB',
      paginas: 4,
    },
  },
  {
    id: 'tibia-proximal-50',
    titulo: ['SISTEMA DE', 'TIBIA PROXIMAL'],
    subtitulo: '5.0',
    descripcion:
      'Placas de tibia proximal de {fragmento grande} con tornillos canulados de bloqueo de 5.0.',
    imagen: { src: '/IMG/CATALOGO/tibia-proximal-50.webp', alt: 'Placa de tibia proximal 5.0' },
    pilares: PILARES_PLACAS,
    fuente: 'Catálogo Sistema de Tibia Proximal 5.0',
    pdf: {
      url: '/docs/tibia-proximal-50.pdf',
      titulo: 'Catálogo Oficial — Tibia Proximal 5.0',
      peso: '9.0 MB',
      paginas: 4,
    },
  },
  {
    id: 'femur-distal-50',
    titulo: ['SISTEMA LCP', 'FÉMUR DISTAL'],
    subtitulo: '5.0',
    descripcion:
      'Sistema LCP de {ángulo variable} para fracturas de fémur distal, con tornillos canulados y corticales.',
    imagen: { src: '/IMG/CATALOGO/femur-distal-50.webp', alt: 'Placa LCP de fémur distal 5.0' },
    pilares: PILARES_PLACAS,
    fuente: 'Catálogo Sistema LCP Fémur Distal 5.0',
    pdf: {
      url: '/docs/femur-distal-50.pdf',
      titulo: 'Catálogo Oficial — LCP Fémur Distal 5.0',
      peso: '8.9 MB',
      paginas: 4,
    },
  },
  {
    id: 'osteotomia-lcp-50',
    titulo: ['SISTEMA DE', 'OSTEOTOMÍA LCP 5.0'],
    subtitulo: 'FÉMUR DISTAL / TIBIA PROXIMAL / TIBIA DISTAL',
    descripcion:
      'Placas HTO para {osteotomías correctoras} de fémur distal, tibia proximal y tibia distal.',
    imagen: { src: '/IMG/CATALOGO/osteotomia-lcp-50.webp', alt: 'Placa HTO de osteotomía LCP 5.0' },
    pilares: PILARES_PLACAS,
    fuente: 'Catálogo Sistema de Osteotomía LCP 5.0',
    pdf: {
      url: '/docs/osteotomia-lcp-50.pdf',
      titulo: 'Catálogo Oficial — Osteotomía LCP 5.0',
      peso: '13.5 MB',
      paginas: 6,
    },
  },
  {
    id: 'lcp-pie-28',
    titulo: ['SISTEMA LCP', 'DE PIE 2.8'],
    subtitulo: 'ANTEPIÉ / MEDIOPIÉ',
    descripcion:
      'Placas preformadas de 1.3 t y 1.6 t para antepié y mediopié, en versiones {recta, en T, en rejilla y en ala}.',
    imagen: { src: '/IMG/CATALOGO/lcp-pie-28.webp', alt: 'Placas LCP de pie 2.8' },
    pilares: PILARES_PLACAS,
    fuente: 'Catálogo Sistema LCP de Pie 2.8',
    pdf: {
      url: '/docs/lcp-pie-28.pdf',
      titulo: 'Catálogo Oficial — LCP de Pie 2.8',
      peso: '15.4 MB',
      paginas: 6,
    },
  },
  {
    id: 'tornillos',
    titulo: ['SISTEMA DE', 'TORNILLO'],
    subtitulo: 'CANULADO DE COMPRESIÓN',
    descripcion:
      'Diseñado para proporcionar {compresión precisa} y estable en procedimientos ortopédicos.',
    imagen: {
      src: '/IMG/CATALOGO/tornillo-canulado-compresion.webp',
      alt: 'Tornillos canulados de compresión sin cabeza',
    },
    pilares: PILARES_OSTEO,
    fuente: 'Catálogo Sistema de Tornillo Canulado de Compresión',
    filas: filasTornillos,
    huecosTornillos: HUECOS_TORNILLOS,
    notaTabla:
      'Longitud de rosca en mm. {L} indica la longitud total del tornillo.',
    pdf: {
      url: '/docs/tornillo-canulado-compresion.pdf',
      titulo: 'Catálogo Oficial — Tornillo Canulado de Compresión',
      peso: '5.0 MB',
      paginas: 2,
    },
  },
  {
    id: 'tornillos-canulados',
    titulo: ['SISTEMA DE', 'TORNILLOS CANULADOS'],
    subtitulo: 'Ø2.4 / Ø3.0 / Ø3.7',
    descripcion:
      'Tornillos canulados de punta estriada y {baja resistencia a la inserción}, con instrumental completo en bandeja.',
    imagen: { src: '/IMG/CATALOGO/tornillos-canulados.webp', alt: 'Tornillos canulados sobre estructura ósea' },
    pilares: PILARES_OSTEO,
    fuente: 'Catálogo Sistema de Tornillos Canulados',
    pdf: {
      url: '/docs/tornillos-canulados.pdf',
      titulo: 'Catálogo Oficial — Tornillos Canulados',
      peso: '11.5 MB',
      paginas: 3,
    },
  },
]

export function getSistema(id: string) {
  return sistemas.find((s) => s.id === id)
}
