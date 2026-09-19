// Verificación de la transcripción del catálogo contra el PDF de origen.
// Ejecutar:  npm run check:catalogo
//
// No es una suite: es el mínimo que falla si alguien rompe la transcripción.
// Cubre lo que no es evidente al leer los datos — los códigos generados por
// fórmula, el recuento de filas y el orden anómalo de la tabla de tibia.

import assert from 'node:assert/strict'

import { placasClavicula, instrumentalClavicula } from './clavicula.ts'
import { codigosHumero } from './humero.ts'
import { codigosTibia35, placasTibia35 } from './tibiaProximal35.ts'
import { filasTornillos } from './tornillos.ts'

// ─── Clavícula (pág. 2) ───────────────────────────────────────────────

const clavicula = placasClavicula[0]
assert.equal(clavicula.grupos.length, 4, 'clavícula: 4 grupos de placas')

const filasClavicula = clavicula.grupos.flatMap((g) => g.bloques.flatMap((b) => b.filas))
assert.equal(filasClavicula.length, 3 + 3 + 7 + 9, 'clavícula: 22 filas en total')
assert.ok(
  filasClavicula.every((f) => f.codigos.length === 2),
  'clavícula: dos códigos por fila (Left y Right); Common va vacía',
)

/**
 * Regla de emparejamiento del catálogo, verificada en las págs. 2, 10, 18 y 24:
 * el sufijo es un número de secuencia ×10, y el código Right es el Left + 10
 * (E1A.35090 → E1A.35100). Sirve como red contra erratas de un dígito.
 */
function paresConsecutivos(filas: Array<{ codigos: string[] }>, etiqueta: string) {
  for (const { codigos } of filas) {
    const [left, right] = codigos
    assert.equal(left.slice(0, -5), right.slice(0, -5), `${etiqueta}: prefijos distintos en ${left}/${right}`)
    assert.equal(
      Number(right.slice(-5)),
      Number(left.slice(-5)) + 10,
      `${etiqueta}: Right debe ser Left + 10, no ${left}/${right}`,
    )
  }
}

paresConsecutivos(filasClavicula, 'clavícula')

// Solo el grupo midshaft ilustra fila por fila; los otros tres fusionan la foto.
const porFila = clavicula.grupos.filter((g) => g.ilustracion === 'fila')
assert.equal(porFila.length, 1, 'clavícula: solo el midshaft ilustra fila a fila')
assert.ok(
  porFila[0].bloques.every((b) => b.filas.every((f) => f.hueco)),
  'clavícula midshaft: cada fila necesita su propio hueco',
)
assert.ok(
  clavicula.grupos.filter((g) => g.ilustracion === 'grupo').every((g) => g.hueco),
  'clavícula: los grupos fusionados necesitan un hueco de grupo',
)

// La placa gancho: 3 bloques Hole/Length × 3 alturas.
const gancho = clavicula.grupos[3]
assert.equal(gancho.bloques.length, 3)
assert.ok(
  gancho.bloques.every((b) => b.filas.length === 3),
  'placa gancho: 3 alturas (12/15/18 mm) por bloque',
)
assert.deepEqual(gancho.bloques[0].filas[0].codigos, ['E1G.35010', 'E1G.35020'])
assert.deepEqual(gancho.bloques[2].filas[2].codigos, ['E1G.35170', 'E1G.35180'])

assert.equal(instrumentalClavicula.columnas, 2, 'clavícula: instrumental en rejilla 2×2')
assert.equal(instrumentalClavicula.bandejas.length, 4)

// ─── Húmero (pág. 6) ──────────────────────────────────────────────────

const humero = codigosHumero[0]
assert.equal(humero.grupos[0].filas.length, 8, 'húmero: 8 referencias')
assert.deepEqual(humero.grupos[0].filas[0], { code: 'H3E.35070', hole: 2, length: 78 })
assert.deepEqual(humero.grupos[0].filas[7], { code: 'H3E.35060', hole: 14, length: 234 })

// ─── Tornillo cannulado de comprensión (pág. 8) ───────────────────────

assert.equal(filasTornillos.length, 37, 'tornillos: 37 filas, de 6 a 50 mm')
// Filas que el original deja vacías a propósito.
for (const largo of ['6mm', '7mm', '8mm', '9mm', '35mm', '42mm', '44mm', '46mm', '48mm']) {
  const f = filasTornillos.find((x) => x.largo === largo)
  assert.ok(f, `falta la fila ${largo}`)
  assert.ok(
    !f.d22Short && !f.d22Long && !f.d30Short && !f.d30Long,
    `${largo} debe seguir vacía, como en el PDF`,
  )
}

// ─── Tibia proximal 3.5 (págs. 10–11) ─────────────────────────────────

const [lateral, medial] = placasTibia35[0].grupos
// Orden anómalo del original: la placa de 4 orificios va primera aunque su
// código (35110) sea posterior al de la siguiente fila (35010).
assert.deepEqual(lateral.bloques[0].filas[0].codigos, ['G3E.35110', 'G3E.35120'])
assert.equal(lateral.bloques[0].hole, 4)
assert.deepEqual(lateral.bloques[1].filas[0].codigos, ['G3E.35010', 'G3E.35020'])
assert.equal(lateral.bloques.length, 7, 'tibia lateral: 7 medidas')
assert.equal(medial.bloques.length, 7, 'tibia medial: 7 medidas')
paresConsecutivos(
  placasTibia35[0].grupos.flatMap((g) => g.bloques.flatMap((b) => b.filas)),
  'tibia 3.5',
)

const [tornillos35, canulado37] = codigosTibia35
assert.equal(tornillos35.grupos.length, 3, 'tibia 3.5: cónico, bloqueo y cortical')
for (const g of tornillos35.grupos) {
  assert.equal(g.filas.length, 27, `${g.titulo}: 27 longitudes`)
}
// Códigos generados por fórmula: extremos y un salto de paso contra el PDF.
assert.equal(tornillos35.grupos[0].filas[0].code, 'S1D.35100')
assert.equal(tornillos35.grupos[0].filas[20].code, 'S1D.35500') // 50 mm
assert.equal(tornillos35.grupos[0].filas[21].code, 'S1D.35550') // 55 mm, cambia el paso
assert.equal(tornillos35.grupos[1].filas[26].code, 'S1B.35800')
assert.equal(tornillos35.grupos[2].filas[26].code, 'S1F.35800')

assert.equal(canulado37.grupos[0].filas.length, 13, '3.7 canulado: 13 longitudes')
assert.equal(canulado37.grupos[0].filas[0].code, 'S1H.37300')
assert.equal(canulado37.grupos[0].filas[12].code, 'S1H.37900')

// Los rangos de 'System' tienen que caber en la tabla que los usa.
for (const t of codigosTibia35) {
  const filas = Math.max(...t.grupos.map((g) => g.filas.length))
  for (const r of t.system ?? []) {
    assert.ok(r.desde >= 0 && r.hasta < filas, `rango System fuera de tabla: ${r.label ?? '(sin rótulo)'}`)
    assert.ok(r.desde <= r.hasta, `rango System invertido: ${r.label ?? '(sin rótulo)'}`)
  }
}

console.log('catálogo OK — clavícula, húmero, tornillos y tibia proximal 3.5')
