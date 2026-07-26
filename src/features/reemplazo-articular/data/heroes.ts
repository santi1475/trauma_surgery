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
    titulo: ['PRÓTESIS', 'DE MANO'],
    descripcion:
      'Soluciones diseñadas para restaurar la movilidad, aliviar el dolor y mejorar la {calidad de vida} de los pacientes.',
    imagen: { src: '/IMG/MODEL/MANO.webp', alt: 'Prótesis de mano' },
    claim:
      'Diseñada para la artroplastia de la articulación trapeciometacarpiana (TM) con fijación {cementless} y tecnología modular.',
  },

  rodilla: {
    titulo: ['PRÓTESIS', 'DE RODILLA'],
    descripcion:
      'Soluciones diseñadas para restaurar la movilidad, aliviar el dolor y mejorar la {calidad de vida} de los pacientes.',
    imagen: { src: '/IMG/MODEL/RODILLA.webp', alt: 'Prótesis de rodilla' },
  },

  // Sin referencia visual del cliente todavía — hereda el patrón.
  placas: {
    eyebrow: 'OSTEOSÍNTESIS',
    titulo: ['PLACAS', 'Y TORNILLOS'],
    descripcion:
      'Soluciones de fijación interna para fracturas complejas, diseñadas para {estabilidad primaria} y consolidación ósea óptima.',
    imagen: { src: '/placeholders/placas-comerciales.webp', alt: 'Placas y tornillos' },
  },
}
