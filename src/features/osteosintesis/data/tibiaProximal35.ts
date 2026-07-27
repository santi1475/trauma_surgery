// Sistema de Tibia Proximal 3.5 — transcrito de
// .docs/ref/Catálogos.Placas001.TraumaSurgery (2).pdf, págs. 10 y 11.
//
// Cuatro bloques en el original:
//   1. Placas (pág. 10, arriba)      → arquetipo de placas
//   2. Tornillos 3.5 ×3 (pág. 10)    → 3 columnas en paralelo + columna System
//   3. Tornillo canulado 3.7 (p. 11) → 1 columna + System
//   4. Instrumental (pág. 11)        → fila de 4

import type { Instrumental, TablaCodigos, TablaPlacas } from './tipos'

// ─── 1. Placas ────────────────────────────────────────────────────────
// Ojo con el orden: en el grupo lateral la fila G3E.35110/35120 va PRIMERA
// (hole 4), fuera del orden numérico del código. Es así en el original.

export const placasTibia35: TablaPlacas[] = [
  {
    titulo: 'Tibial Plate',
    lados: ['Left', 'Right'],
    grupos: [
      {
        descripcion: 'Φ3.5 Proximal Lateral Tibial Plate',
        ilustracion: 'grupo',
        hueco: { ref: '001', ratio: 3.17, alt: 'Placa lateral proximal de tibia' },
        bloques: [
          { hole: 4, length: 79, filas: [{ codigos: ['G3E.35110', 'G3E.35120'] }] },
          { hole: 6, length: 103, filas: [{ codigos: ['G3E.35010', 'G3E.35020'] }] },
          { hole: 8, length: 127, filas: [{ codigos: ['G3E.35030', 'G3E.35040'] }] },
          { hole: 10, length: 151, filas: [{ codigos: ['G3E.35050', 'G3E.35060'] }] },
          { hole: 12, length: 175, filas: [{ codigos: ['G3E.35070', 'G3E.35080'] }] },
          { hole: 14, length: 199, filas: [{ codigos: ['G3E.35090', 'G3E.35100'] }] },
          { hole: 16, length: 223, filas: [{ codigos: ['G3E.35130', 'G3E.35140'] }] },
        ],
      },
      {
        descripcion: 'Φ3.5 Proximal Medial Tibial Plate',
        ilustracion: 'grupo',
        hueco: { ref: '002', ratio: 6.07, alt: 'Placa medial proximal de tibia' },
        bloques: [
          { hole: 4, length: 97, filas: [{ codigos: ['G3F.35010', 'G3F.35020'] }] },
          { hole: 6, length: 117, filas: [{ codigos: ['G3F.35030', 'G3F.35040'] }] },
          { hole: 9, length: 147, filas: [{ codigos: ['G3F.35050', 'G3F.35060'] }] },
          { hole: 11, length: 183, filas: [{ codigos: ['G3F.35070', 'G3F.35080'] }] },
          { hole: 14, length: 212, filas: [{ codigos: ['G3F.35090', 'G3F.35100'] }] },
          { hole: 17, length: 243, filas: [{ codigos: ['G3F.35110', 'G3F.35120'] }] },
          { hole: 20, length: 273, filas: [{ codigos: ['G3F.35130', 'G3F.35140'] }] },
        ],
      },
    ],
  },
]

// ─── 2. Tornillos 3.5 ─────────────────────────────────────────────────
// Las tres familias comparten exactamente la misma escalera de longitudes:
// 10–50 mm de 2 en 2 y luego 55–80 de 5 en 5. 27 filas.

const LONGITUDES_35 = [
  10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 55, 60, 65,
  70, 75, 80,
]

/** El sufijo del código es la longitud en décimas de mm, a 3 dígitos. */
function escalera35(prefijo: string) {
  return LONGITUDES_35.map((length) => ({
    code: `${prefijo}.35${String(length * 10).padStart(3, '0')}`,
    length,
  }))
}

/**
 * Columna 'System' de la pág. 10. En el original son tres corchetes de flechas
 * verticales cuyos rótulos se solapan y quedan casi ilegibles; los rangos se
 * reconstruyeron midiendo la altura de cada flecha contra el paso de fila.
 *
 * ponytail: rangos fijos en vez de calcularlos. Si el cliente confirma otros
 * límites, se cambian estos tres números y ya.
 */
const SYSTEM_35 = [
  { label: 'Clavicle', desde: 0, hasta: 9 }, // 10–28 mm
  { label: 'Fibular', desde: 0, hasta: 24 }, // 10–70 mm
  {
    label: 'Proximal Olecranon / Proximal Humerus / Distal Humerus / Tibia / Small Fragment',
    desde: 0,
    hasta: 26, // 10–80 mm
  },
]

export const codigosTibia35: TablaCodigos[] = [
  {
    columnas: ['code', 'length'],
    system: SYSTEM_35,
    grupos: [
      {
        titulo: '3.5 Conical Screw',
        hueco: { ref: '003', ratio: 0.15, alt: 'Tornillo cónico 3.5' },
        filas: escalera35('S1D'),
      },
      {
        titulo: '3.5 Locking Screw',
        hueco: { ref: '004', ratio: 0.14, alt: 'Tornillo de bloqueo 3.5' },
        filas: escalera35('S1B'),
      },
      {
        titulo: '3.5 Cortical Screw',
        hueco: { ref: '005', ratio: 0.18, alt: 'Tornillo cortical 3.5' },
        filas: escalera35('S1F'),
      },
    ],
  },
  // ─── 3. Tornillo canulado 3.7 (pág. 11) ─────────────────────────────
  // El corchete de 'System' está dibujado pero sin rotular en el original.
  {
    titulo: '3.7 Cannulated Locking Screw',
    columnas: ['code', 'length'],
    system: [{ desde: 0, hasta: 12 }],
    grupos: [
      {
        hueco: { ref: '006', ratio: 0.14, alt: 'Tornillo canulado de bloqueo 3.7' },
        filas: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90].map((length) => ({
          code: `S1H.37${String(length * 10).padStart(3, '0')}`,
          length,
        })),
      },
    ],
  },
]

// ─── 4. Instrumental ──────────────────────────────────────────────────

/** Pág. 11 — fila de 4, en el orden impreso. */
export const instrumentalTibia35: Instrumental = {
  columnas: 4,
  bandejas: [
    { titulo: 'Container', code: 'Z1M.50010', hueco: { ref: '007', ratio: 1.35, alt: 'Contenedor del sistema' } },
    // El original dibuja dos bandejas de placas apiladas: el ratio es el del
    // conjunto (99.7 × 55.6 pt), no el de una sola.
    { titulo: 'Plate tray', code: 'Z1M.01010', hueco: { ref: '008', ratio: 1.79, alt: 'Bandejas de placas' } },
    { titulo: 'Screw tray', code: 'Z1M.35010', hueco: { ref: '009', ratio: 1.79, alt: 'Bandeja de tornillos' } },
    { titulo: 'Instrument tray', code: 'Z1M.03010', hueco: { ref: '010', ratio: 1.33, alt: 'Bandeja de instrumental' } },
  ],
}
