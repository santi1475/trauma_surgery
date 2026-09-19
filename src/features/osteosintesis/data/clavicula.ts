// Sistema de Clavícula — transcrito de .docs/ref/Catálogos.Placas001.TraumaSurgery (2).pdf
// Tabla "Clavicle Plate" (pág. 2) e Instrumental (pág. 3).
//
// El PDF no tiene tablas vectoriales: el texto va posicionado sobre una imagen
// de fondo. La transcripción se hizo por coordenadas y verificación visual del
// render de la página. No editar los números de parte a mano.
//
// Regla de emparejamiento del catálogo, confirmada en las págs. 2, 10, 18 y 24:
// el sufijo es un número de secuencia ×10 y el código Right es el Left + 10
// (E1A.35090 → E1A.35100). La comprueba catalogo.check.ts.

import type { Instrumental, TablaPlacas } from './tipos'

// El original rotula tres lados bajo 'Item Code' (Left / Common / Right, cada
// uno con un chip de color) pero solo publica dos columnas de código: se
// replican los tres rótulos y 'Common' queda vacía en todo el sistema. Los
// chips no se trasladan — no aportan nada sobre el rótulo y sus colores no
// están en la paleta de DESIGN.md.
export const placasClavicula: TablaPlacas[] = [
  {
    titulo: 'Clavicle Plate',
    lados: ['Left', 'Common', 'Right'],
    columnaVariante: 'Height',
    grupos: [
      {
        descripcion: 'Φ2.8/3.5 Superior Lateral Clavicle Plate',
        ilustracion: 'grupo',
        hueco: { ref: '001', ratio: 5.9, alt: 'Placa lateral superior de clavícula' },
        bloques: [
          { hole: 4, length: 60, filas: [{ codigos: ['E1A.35090', 'E1A.35100'] }] },
          { hole: 5, length: 68, filas: [{ codigos: ['E1A.35010', 'E1A.35020'] }] },
          { hole: 8, length: 103, filas: [{ codigos: ['E1A.35030', 'E1A.35040'] }] },
        ],
      },
      {
        descripcion: 'Φ2.8/3.5 Superior Lateral Clavicle Plate, Wide',
        ilustracion: 'grupo',
        hueco: { ref: '002', ratio: 5.87, alt: 'Placa lateral superior de clavícula, ancha' },
        bloques: [
          { hole: 4, length: 68, filas: [{ codigos: ['E1A.35110', 'E1A.35120'] }] },
          { hole: 5, length: 76, filas: [{ codigos: ['E1A.35050', 'E1A.35060'] }] },
          { hole: 8, length: 110, filas: [{ codigos: ['E1A.35070', 'E1A.35080'] }] },
        ],
      },
      {
        // Único grupo que el original ilustra fila por fila, con la foto a
        // escala: el ancho del hueco crece con la longitud de la placa.
        descripcion: 'Φ3.5 Superior Midshaft Clavicle Plate',
        ilustracion: 'fila',
        bloques: [
          {
            hole: 5,
            length: 64,
            filas: [
              {
                codigos: ['E2A.35130', 'E2A.35140'],
                hueco: { ref: '003', ratio: 6.56, ancho: 82.7, alt: 'Placa diafisaria de clavícula, 5 orificios' },
              },
            ],
          },
          {
            hole: 6,
            length: 75,
            filas: [
              {
                codigos: ['E2A.35150', 'E2A.35160'],
                hueco: { ref: '004', ratio: 6.87, ancho: 97.6, alt: 'Placa diafisaria de clavícula, 6 orificios' },
              },
            ],
          },
          {
            hole: 7,
            length: 86,
            filas: [
              {
                codigos: ['E2A.35170', 'E2A.35180'],
                hueco: { ref: '005', ratio: 7.45, ancho: 111.8, alt: 'Placa diafisaria de clavícula, 7 orificios' },
              },
            ],
          },
          {
            hole: 7,
            length: 90,
            filas: [
              {
                codigos: ['E2A.35190', 'E2A.35200'],
                hueco: { ref: '006', ratio: 7.28, ancho: 183.5, alt: 'Placa diafisaria de clavícula, 7 orificios, 90 mm' },
              },
            ],
          },
          {
            hole: 8,
            length: 97,
            filas: [
              {
                codigos: ['E2A.35210', 'E2A.35220'],
                hueco: { ref: '007', ratio: 7.97, ancho: 125.2, alt: 'Placa diafisaria de clavícula, 8 orificios' },
              },
            ],
          },
          {
            hole: 9,
            length: 108,
            filas: [
              {
                codigos: ['E2A.35230', 'E2A.35240'],
                hueco: { ref: '008', ratio: 7.28, ancho: 183.5, alt: 'Placa diafisaria de clavícula, 9 orificios' },
              },
            ],
          },
          {
            hole: 10,
            length: 118,
            filas: [
              {
                codigos: ['E2A.35250', 'E2A.35260'],
                hueco: { ref: '009', ratio: 8.57, ancho: 155.1, alt: 'Placa diafisaria de clavícula, 10 orificios' },
              },
            ],
          },
        ],
      },
      {
        // En el PDF las tres descripciones de altura salen solapadas y casi
        // ilegibles. Se separan por variante: cada bloque Hole/Length lleva
        // las tres alturas, con el par Left/Right que le corresponde.
        descripcion: 'Φ3.5 Clavicle Hook Plate',
        ilustracion: 'grupo',
        hueco: { ref: '010', ratio: 1.79, alt: 'Placa gancho de clavícula' },
        bloques: [
          {
            hole: 2,
            length: 70,
            filas: [
              { variante: '12 mm', codigos: ['E1G.35010', 'E1G.35020'] },
              { variante: '15 mm', codigos: ['E1G.35030', 'E1G.35040'] },
              { variante: '18 mm', codigos: ['E1G.35050', 'E1G.35060'] },
            ],
          },
          {
            hole: 3,
            length: 80,
            filas: [
              { variante: '12 mm', codigos: ['E1G.35070', 'E1G.35080'] },
              { variante: '15 mm', codigos: ['E1G.35090', 'E1G.35100'] },
              { variante: '18 mm', codigos: ['E1G.35110', 'E1G.35120'] },
            ],
          },
          {
            hole: 4,
            length: 90,
            filas: [
              { variante: '12 mm', codigos: ['E1G.35130', 'E1G.35140'] },
              { variante: '15 mm', codigos: ['E1G.35150', 'E1G.35160'] },
              { variante: '18 mm', codigos: ['E1G.35170', 'E1G.35180'] },
            ],
          },
        ],
      },
    ],
  },
]

/** Pág. 3 — rejilla 2×2, en el orden impreso. */
export const instrumentalClavicula: Instrumental = {
  titulo: 'Instrumental',
  columnas: 2,
  bandejas: [
    { titulo: 'Container', code: 'Z1M.50010', hueco: { ref: '011', ratio: 1.35, alt: 'Contenedor del sistema' } },
    { titulo: 'Screw tray', code: 'Z1M.35010', hueco: { ref: '012', ratio: 1.79, alt: 'Bandeja de tornillos' } },
    { titulo: 'Plate tray', code: 'Z1M.01010', hueco: { ref: '013', ratio: 1.79, alt: 'Bandeja de placas' } },
    { titulo: 'Instrument tray', code: 'Z1M.03010', hueco: { ref: '014', ratio: 1.32, alt: 'Bandeja de instrumental' } },
  ],
}
