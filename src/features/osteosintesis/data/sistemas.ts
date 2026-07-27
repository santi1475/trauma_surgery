// Los sistemas de osteosíntesis del catálogo.
// Textos y tablas tomados de .docs/ref/Catálogos.Placas001.TraumaSurgery (2).pdf
//
// El PDF tiene 9 sistemas, no 5: clavícula, húmero, tornillo cannulado de
// comprensión, tibia proximal 3.5, placa de mano, tibia proximal 5.0, LCP
// fémur distal 5.0, tornillos canulados y LCP radio distal Galaxy.
//
// Publicados: los 4 primeros (págs. 1–11), todos con su tabla transcrita.
// Los otros 5 están COMENTADOS al final del array: se abrían sin referencias y
// quedan fuera de la rejilla hasta revisarlos con el cliente.
//
// Ojo: tibia proximal 3.5 y 5.0 son sistemas SEPARADOS en el catálogo, con
// tornillería distinta. Antes iban fusionados en una sola ficha '3.5 / 5.0'.

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
    imagen: { src: '/IMG/MODEL/HOMBRO.webp', alt: 'Sistema de clavícula' },
    pilares: PILARES_PLACAS,
    fuente: 'Catálogo de productos, págs. 2–3',
    placas: placasClavicula,
    instrumental: instrumentalClavicula,
  },
  {
    id: 'humero',
    titulo: ['SISTEMA DE', 'HÚMERO'],
    subtitulo: 'PLACAS DE OSTEOSÍNTESIS',
    descripcion:
      'Soluciones anatómicas para {fijación estable y segura} en fracturas del húmero.',
    imagen: { src: '/IMG/MODEL/HOMBRO.webp', alt: 'Sistema de húmero' },
    pilares: PILARES_PLACAS,
    fuente: 'Catálogo de productos, pág. 6',
    codigos: codigosHumero,
    instrumental: instrumentalHumero,
  },
  {
    id: 'tornillos',
    titulo: ['SISTEMA DE', 'TORNILLO'],
    subtitulo: 'CANNULADO DE COMPRENSIÓN',
    descripcion:
      'Diseñado para proporcionar {compresión precisa} y estable en procedimientos ortopédicos.',
    imagen: { src: '/IMG/MODEL/PIE.webp', alt: 'Tornillo cannulado de compresión' },
    pilares: PILARES_OSTEO,
    fuente: 'Catálogo de productos, pág. 8',
    filas: filasTornillos,
    huecosTornillos: HUECOS_TORNILLOS,
    notaTabla:
      'Longitud de rosca en mm. {L} indica la longitud total del tornillo.',
  },
  {
    id: 'tibia-proximal-35',
    titulo: ['SISTEMA DE', 'TIBIA PROXIMAL'],
    subtitulo: '3.5',
    descripcion:
      'Placas anatómicas para tibia proximal con {fijación angular estable} y tornillos canulados de bloqueo.',
    imagen: { src: '/IMG/MODEL/RODILLA.webp', alt: 'Sistema de tibia proximal 3.5' },
    pilares: PILARES_PLACAS,
    fuente: 'Catálogo de productos, págs. 10–11',
    placas: placasTibia35,
    codigos: codigosTibia35,
    instrumental: instrumentalTibia35,
  },

  // ─── COMENTADOS — pendientes de revisar con el cliente ───────────────
  //
  // Estos sistemas existen en el catálogo pero su tabla aún no se ha
  // transcrito, así que el modal se abría sin referencias. Se retiran de la
  // rejilla hasta decidir con el cliente qué se publica y con qué datos.
  //
  // Para reactivar uno: descomentarlo y añadirle su tabla (placas / codigos /
  // instrumental), igual que los cuatro de arriba. Las páginas del PDF de cada
  // uno están en `fuente`.
  //
  // {
  //   id: 'mano',
  //   titulo: ['SISTEMA DE', 'PLACA DE MANO'],
  //   subtitulo: '1.3 / 1.5 / 2.0 / 2.3',
  //   descripcion:
  //     'Placas para {falanges proximales y metacarpianos}, con bajo torque de inserción y alta retención.',
  //   imagen: { src: '/IMG/MODEL/MANO.webp', alt: 'Sistema de placa de mano' },
  //   pilares: PILARES_PLACAS,
  //   fuente: 'Catálogo de productos, págs. 14–16',
  // },
  // {
  //   id: 'tibia-proximal-50',
  //   titulo: ['SISTEMA DE', 'TIBIA PROXIMAL'],
  //   subtitulo: '5.0',
  //   descripcion:
  //     'Placas de tibia proximal de {fragmento grande} con tornillos canulados de bloqueo de 5.0.',
  //   imagen: { src: '/IMG/MODEL/RODILLA.webp', alt: 'Sistema de tibia proximal 5.0' },
  //   pilares: PILARES_PLACAS,
  //   fuente: 'Catálogo de productos, págs. 18–19',
  // },
  // {
  //   id: 'femur-distal',
  //   titulo: ['SISTEMA LCP', 'FÉMUR DISTAL'],
  //   subtitulo: '5.0',
  //   descripcion:
  //     'Sistema LCP de {ángulo variable} para fracturas de fémur distal, con tornillos canulados y corticales.',
  //   imagen: { src: '/IMG/MODEL/RODILLA.webp', alt: 'Sistema LCP fémur distal' },
  //   pilares: PILARES_PLACAS,
  //   fuente: 'Catálogo de productos, págs. 22–24',
  // },
]

export function getSistema(id: string) {
  return sistemas.find((s) => s.id === id)
}
