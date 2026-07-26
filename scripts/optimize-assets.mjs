// Optimiza los assets de /public: extrae el raster embebido de los SVG de
// Illustrator, reencoda todo a WebP y regenera el favicon.
// Uso: node scripts/optimize-assets.mjs
import { readFile, writeFile, readdir, stat } from 'node:fs/promises'
import { join, dirname, basename, extname } from 'node:path'
import sharp from 'sharp'

const PUB = 'public'
const kb = (n) => (n / 1024).toFixed(0) + ' KB'

// SVG de Illustrator = un <image> base64 dentro. Devuelve el buffer raster.
async function rasterFromSvg(file) {
  const svg = await readFile(file, 'utf8')
  const m = svg.match(/data:image\/(png|jpe?g);base64,([A-Za-z0-9+/=\s]+)/)
  if (!m) throw new Error(`sin raster embebido: ${file}`)
  return Buffer.from(m[2].replace(/\s/g, ''), 'base64')
}

async function toWebp(input, out, maxSide, quality = 78) {
  const before = Buffer.isBuffer(input) ? input.length : (await stat(input)).size
  const img = sharp(input).rotate()
  const { width, height } = await img.metadata()
  const pipeline = Math.max(width, height) > maxSide
    ? img.resize({ width: width >= height ? maxSide : null, height: height > width ? maxSide : null })
    : img
  await pipeline.webp({ quality, effort: 6 }).toFile(out)
  const after = (await stat(out)).size
  console.log(`${basename(out).padEnd(34)} ${kb(before).padStart(9)} → ${kb(after).padStart(8)}  (${width}x${height})`)
}

const tareas = [
  // Hero: SVG de 5 MB con PNG embebido → WebP
  ['public/IMG/HERO/Slide1.svg', 'public/IMG/HERO/Slide1.webp', 1600],
  ['public/IMG/HERO/Slide2.svg', 'public/IMG/HERO/Slide2.webp', 1600],
  ['public/IMG/HERO/Slide3.svg', 'public/IMG/HERO/Slide3.webp', 1600],
  ['public/IMG/HERO/Slide4.svg', 'public/IMG/HERO/Slide4.webp', 1600],
  // Fichas de producto
  ['public/IMG/MODEL/CADERA.png', 'public/IMG/MODEL/CADERA.webp', 1400],
  ['public/IMG/MODEL/HOMBRO.png', 'public/IMG/MODEL/HOMBRO.webp', 1400],
  ['public/IMG/MODEL/MANO.png', 'public/IMG/MODEL/MANO.webp', 1400],
  ['public/IMG/MODEL/PIE.png', 'public/IMG/MODEL/PIE.webp', 1400],
  ['public/IMG/MODEL/RODILLA.png', 'public/IMG/MODEL/RODILLA.webp', 1400],
  // Galería Instagram
  ['public/ig/IMG_7229.PNG', 'public/ig/logo.webp', 512, 88],
  ['public/ig/IMG_2435 (1).PNG', 'public/ig/post-quirofano.webp', 1080],
  ['public/ig/NoTodasLaRodillas001.TraumaS (1).png', 'public/ig/post-rodillas.webp', 1080],
  ['public/ig/SolucionesAMedida01.TS.png', 'public/ig/post-soluciones.webp', 1080],
  ['public/ig/Certificaciones.TS.png', 'public/ig/post-certificaciones.webp', 1080],
  // Banner diagonal + placas
  ['public/placeholders/actividad-correr.png', 'public/placeholders/actividad-correr.webp', 1000],
  ['public/placeholders/actividad-ciclismo.png', 'public/placeholders/actividad-ciclismo.webp', 1000],
  ['public/placeholders/actividad-yoga.png', 'public/placeholders/actividad-yoga.webp', 1000],
  ['public/placeholders/actividad-escalar.png', 'public/placeholders/actividad-escalar.webp', 1000],
  ['public/placeholders/placas-comerciales.png', 'public/placeholders/placas-comerciales.webp', 1200],
]

for (const [src, out, maxSide, q] of tareas) {
  try {
    const input = extname(src).toLowerCase() === '.svg' ? await rasterFromSvg(src) : src
    await toWebp(input, out, maxSide, q)
    // Los slides del hero se sirven en AVIF (≈1/3 del WebP) con el WebP de
    // fallback vía <picture>; es el elemento LCP de la home.
    if (out.includes('/HERO/')) {
      const avif = out.replace('.webp', '.avif')
      const info = await sharp(input).resize({ width: 1400, withoutEnlargement: true })
        .avif({ quality: 52, effort: 6 }).toFile(avif)
      console.log(`${basename(avif).padEnd(34)} ${''.padStart(9)}   ${kb(info.size).padStart(8)}`)
    }
  } catch (e) {
    console.warn(`SKIP ${src}: ${e.message}`)
  }
}

// Favicon PNG de 32px a partir del logo (el .ico original pesaba 265 KB).
await sharp('public/ig/IMG_7229.PNG').resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 }).toFile('public/favicon.png')
console.log('favicon.png'.padEnd(34), kb((await stat('public/favicon.png')).size).padStart(20))
