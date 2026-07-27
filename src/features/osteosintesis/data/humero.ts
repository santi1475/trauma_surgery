// Sistema de Húmero — transcrito de .docs/ref/Catálogos.Placas001.TraumaSurgery (2).pdf
// Tabla "Humerus Plate" e Instrumental, ambos en la pág. 6.
//
// El original no rotula la columna de códigos: solo 'Hole' y 'Length'. La
// descripción de la placa va al pie de la tabla, no en columna.

import type { Instrumental, TablaCodigos } from './tipos'

export const codigosHumero: TablaCodigos[] = [
  {
    titulo: 'Humerus Plate',
    columnas: ['code', 'hole', 'length'],
    pie: 'Φ3.5 Proximal Lateral Humerus Plate',
    grupos: [
      {
        hueco: { ref: '001', ratio: 0.55, alt: 'Placa lateral proximal de húmero' },
        filas: [
          { code: 'H3E.35070', hole: 2, length: 78 },
          { code: 'H3E.35000', hole: 3, length: 91 },
          { code: 'H3E.35010', hole: 4, length: 104 },
          { code: 'H3E.35020', hole: 6, length: 130 },
          { code: 'H3E.35030', hole: 8, length: 156 },
          { code: 'H3E.35040', hole: 10, length: 182 },
          { code: 'H3E.35050', hole: 12, length: 208 },
          { code: 'H3E.35060', hole: 14, length: 234 },
        ],
      },
    ],
  },
]

/** Pág. 6 — fila de 4, en el orden impreso. */
export const instrumentalHumero: Instrumental = {
  columnas: 4,
  bandejas: [
    { titulo: 'Container', code: 'Z1M.50010', hueco: { ref: '002', ratio: 1.35, alt: 'Contenedor del sistema' } },
    { titulo: 'Plate tray', code: 'Z1M.01010', hueco: { ref: '003', ratio: 1.8, alt: 'Bandeja de placas' } },
    { titulo: 'Screw tray', code: 'Z1M.35010', hueco: { ref: '004', ratio: 1.79, alt: 'Bandeja de tornillos' } },
    { titulo: 'Instrument tray', code: 'Z1M.03010', hueco: { ref: '005', ratio: 1.32, alt: 'Bandeja de instrumental' } },
  ],
}
