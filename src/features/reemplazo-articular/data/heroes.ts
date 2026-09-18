// Heroes de los modales de producto. Textos tomados de las referencias
// del cliente (.docs/ref/). Las imágenes son placeholders hasta que
// entreguen los renders finales.
//
// Eyebrow, CTA, pilares, certificaciones y países NO van aquí:
// son idénticos en las 4 y viven en tipos.ts.

import type { Hero } from './tipos'

export const heroes: Record<string, Hero> = {
  cadera: {
    titulo: ['PRÓTESIS', 'DE CADERA'],
    descripcion:
      'Soluciones diseñadas para restaurar la movilidad, aliviar el dolor y mejorar la {calidad de vida} de los pacientes.',
    imagen: { src: '/IMG/MODEL/CADERA.webp', alt: 'Prótesis de cadera' },
    // Sin `pdf` a propósito: antes enlazaba el catálogo de placas (clavícula) y el
    // cliente lo señaló (2026-09-17). Se añade cuando entregue el catálogo de cadera.
  },

  hombro: {
    titulo: ['PRÓTESIS', 'DE HOMBRO'],
    descripcion:
      'Sistema completo para {artroplastia inversa de hombro}, diseñado para restaurar la función del hombro en pacientes con lesiones del manguito rotador, artropatías y casos complejos de revisión.',
    imagen: { src: '/IMG/MODEL/HOMBRO.webp', alt: 'Prótesis de hombro' },
    claim:
      'Calidad, precisión y tecnología al servicio de mejores resultados clínicos.',
  },

  mano: {
    titulo: ['PRÓTESIS', 'DE MANO'], // «DE MANO Y DEDOS» no cabe en la columna del hero
    descripcion:
      'Soluciones para artroplastia trapeciometacarpiana {Horus® TMC} e implantes para articulaciones interfalángicas y metacarpofalángicas {Digitalis®}.',
    imagen: { src: '/IMG/MODEL/MANO.webp', alt: 'Prótesis de mano y Digitalis' },
    claim:
      'Diseñada para artroplastia trapeciometacarpiana (TM) y pequeñas articulaciones interfalángicas con fijación {cementless} y tecnología modular.',
    pdf: {
      url: '/docs/digitalis.pdf',
      titulo: 'Catálogo Oficial — Prótesis Digitalis MCP / PIP',
      peso: '0.6 MB',
      label: 'Catálogo Digitalis PDF',
    },
  },

  rodilla: {
    titulo: ['PRÓTESIS', 'DE RODILLA'],
    descripcion:
      'Soluciones diseñadas para restaurar la movilidad, aliviar el dolor y mejorar la {calidad de vida} de los pacientes.',
    imagen: { src: '/IMG/MODEL/RODILLA.webp', alt: 'Prótesis de rodilla' },
  },
}
