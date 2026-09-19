// Guardián de tokens. Falla si el código vuelve a saltarse el sistema de diseño.
//
// Reglas (todas con evidencia de la auditoría del 2026-09-19):
//   1. Ningún hex/rgba de la paleta escrito a mano: se usa var(--ts-*) o la clase Tailwind.
//   2. Toda var(--x) que se lea tiene que estar declarada (caso --font-display: no existía
//      y el fallback lo tapaba durante meses).
//   3. Ningún fontSize: 'clamp(...)' suelto: la rampa vive en --text-*.
//
// Escape puntual: una línea con `token-ok:` y el motivo no se evalúa. Solo para los
// sitios donde var() no puede funcionar (Three.js, canvas 2D, <meta>, datos con sufijo hex).
//
// Uso: node scripts/check-tokens.mjs [--self-test | --hook] [archivo...]
//   --hook  lee el JSON PostToolUse de Claude Code por stdin y revisa solo el archivo
//           editado; sale con código 2 para que el fallo vuelva al modelo.

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = fileURLToPath(new URL('..', import.meta.url))
const SRC = join(RAIZ, 'src')
const GLOBAL_CSS = join(SRC, 'styles', 'global.css')

// Carpetas donde el literal es obligatorio (materiales Three.js, datos que se concatenan).
const EXENTAS = [join('src', 'components', '3d'), join('src', 'data')]

const PALETA = [
  /#00d9ff\b/i, /#00a8cc\b/i, /#0a3a60\b/i, /#d4af37\b/i,
  /#020b18\b/i, /#020d1a\b/i, /#030c1a\b/i, /#040e1f\b/i, /#0a1e30\b/i,
  /rgba?\(\s*0,\s*217,\s*255/, /rgba?\(\s*0,\s*168,\s*204/,
  /rgba?\(\s*10,\s*58,\s*96/, /rgba?\(\s*2,\s*11,\s*24/,
]

function* archivos(dir) {
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre)
    if (statSync(ruta).isDirectory()) yield* archivos(ruta)
    else if (/\.(tsx|ts|astro|css)$/.test(nombre)) yield ruta
  }
}

function declaradas(fuentes) {
  const set = new Set()
  for (const texto of fuentes) {
    for (const m of texto.matchAll(/(?:^|[\s{;'"\[])(--[\w-]+)\s*['"]?\s*:/gm)) set.add(m[1])
  }
  return set
}

export function revisar(ruta, texto, decl) {
  const fallos = []
  const rel = relative(RAIZ, ruta)
  const exenta = EXENTAS.some((e) => rel.startsWith(e + sep))
  const esGlobal = ruta === GLOBAL_CSS
  texto.split('\n').forEach((linea, i) => {
    if (linea.includes('token-ok:')) return
    const n = i + 1
    if (!exenta && !esGlobal && PALETA.some((re) => re.test(linea)))
      fallos.push(`${rel}:${n}: color de paleta a mano → var(--ts-*) o clase *-ts-*`)
    for (const m of linea.matchAll(/var\((--[\w-]+)/g)) {
      const v = m[1]
      if (!v.startsWith('--tw-') && !decl.has(v))
        fallos.push(`${rel}:${n}: var(${v}) no está declarada en global.css`)
    }
    if (/fontSize:\s*['"`]clamp\(/.test(linea))
      fallos.push(`${rel}:${n}: fontSize con clamp() suelto → var(--text-display|--text-watermark|…)`)
  })
  return fallos
}

function selfTest() {
  const decl = new Set(['--ts-accent', '--text-display'])
  const ok = (t) => revisar(join(SRC, 'x.tsx'), t, decl)
  const assert = (c, msg) => { if (!c) { console.error('self-test FALLA:', msg); process.exit(1) } }
  assert(ok("color: '#00d9ff'").length === 1, 'detecta hex de paleta')
  assert(ok('rgba(0,217,255,0.2)').length === 1, 'detecta rgba de paleta')
  assert(ok('#00d9ff2e').length === 0, 'ignora hex con sufijo (comentario de DESIGN.md)')
  assert(ok("color: '#00d9ff' // token-ok: canvas").length === 0, 'respeta token-ok')
  assert(ok('var(--font-display)').length === 1, 'detecta var no declarada')
  assert(ok('var(--ts-accent) var(--tw-ring-color)').length === 0, 'acepta declaradas y --tw-*')
  assert(ok("fontSize: 'clamp(1rem, 2vw, 3rem)'").length === 1, 'detecta clamp suelto')
  assert(ok("fontSize: 'var(--text-display)'").length === 0, 'acepta token de rampa')
  assert(revisar(join(SRC, 'components', '3d', 'x.tsx'), "color='#00d9ff'", decl).length === 0, 'exime 3d/')
  console.log('self-test OK')
}

function correr(objetivo, todos, codigoFallo) {
  const decl = declaradas(todos.map((a) => readFileSync(a, 'utf8')))
  const fallos = objetivo.flatMap((a) => revisar(a, readFileSync(a, 'utf8'), decl))
  if (fallos.length) {
    console.error(fallos.join('\n'))
    console.error(`\n${fallos.length} fallo(s). Convención en CLAUDE.md § Tokens.`)
    process.exit(codigoFallo)
  }
  console.log(`check-tokens: ${objetivo.length} archivo(s), 0 fallos`)
}

if (process.argv.includes('--self-test')) {
  selfTest()
} else if (process.argv.includes('--hook')) {
  const entrada = JSON.parse(readFileSync(0, 'utf8').trim() || '{}')
  const ruta = entrada.tool_input?.file_path ?? entrada.tool_response?.filePath
  const todos = [...archivos(SRC)]
  const editado = ruta && todos.find((a) => a.toLowerCase() === ruta.replace(/\//g, sep).toLowerCase())
  if (editado) correr([editado], todos, 2)
} else {
  const todos = [...archivos(SRC)]
  const pedidos = process.argv.slice(2).map((p) => join(RAIZ, p))
  correr(pedidos.length ? todos.filter((a) => pedidos.includes(a)) : todos, todos, 1)
}
