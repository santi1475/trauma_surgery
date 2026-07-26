// Check de partirResaltado. Correr: node --experimental-strip-types src/features/reemplazo-articular/data/tipos.test.ts
import assert from 'node:assert/strict'
import { partirResaltado } from './tipos.ts'

assert.deepEqual(partirResaltado('sin marcas'), [{ t: 'sin marcas', h: false }])

assert.deepEqual(partirResaltado('hasta {70 %} de mejora'), [
  { t: 'hasta ', h: false },
  { t: '70 %', h: true },
  { t: ' de mejora', h: false },
])

// Marca al inicio y al final, sin texto plano alrededor.
assert.deepEqual(partirResaltado('{PEXL-E}'), [{ t: 'PEXL-E', h: true }])

// Varias marcas seguidas.
assert.deepEqual(partirResaltado('{a} y {b}'), [
  { t: 'a', h: true },
  { t: ' y ', h: false },
  { t: 'b', h: true },
])

// Llaves vacías no generan tramo.
assert.deepEqual(partirResaltado('a{}b'), [
  { t: 'a', h: false },
  { t: 'b', h: false },
])

assert.deepEqual(partirResaltado(''), [])

console.log('ok')
