// Fichas de detalle de las prótesis. Contenido transcrito de las
// referencias del cliente en .docs/ref/.
//
// Estructura: 3 columnas (identidad+sistema · imagen · características)
// + footer variable. Ver .docs/MODALES-ESTRUCTURA.md
//
// REVISAR CON EL CLIENTE — puntos marcados con TODO: texto ilegible o
// con error aparente en la referencia. No se inventó contenido clínico.

import { heroes } from './heroes'
import type { ProductoData } from './tipos'

type Detalle = Omit<ProductoData, 'id' | 'hero'>

const detalles: Record<string, Detalle> = {
  // ─────────────────────────────────────────────────────────────────
  cadera: {
    identidad: {
      eyebrow: 'PRÓTESIS DE CADERA',
      nombreComercial: ['CAPTIV', 'FREELINERS®'],
      tagline: 'Copa acetabular para {artroplastia total de cadera}.',
      imagen: { src: '/IMG/MODEL/CADERA.webp', alt: 'Sistema CAPTIV FREELINERS' },
    },
    sistema: {
      variante: 'numerado',
      componentes: [
        {
          titulo: 'COPA ACETABULAR',
          bullets: [
            'Aleación de titanio.',
            'Acabado altamente rugoso para mejor fijación primaria.',
            'Orificios para tornillos transacetabulares.',
          ],
        },
        {
          titulo: 'INSERTO DE POLIETILENO PEXL-E',
          bullets: [
            'Polietileno altamente reticulado con vitamina E.',
            'Resistente al desgaste y al envejecimiento.',
          ],
        },
        {
          titulo: 'INSERTO CERÁMICO',
          bullets: [
            'Cerámica (Alúmina y Zirconia).',
            'Superficie lisa y excelente resistencia al desgaste.',
          ],
        },
        {
          titulo: 'TORNILLOS ACETABULARES',
          bullets: [
            'Tornillos de fijación transacetabulares.',
            'Disponibles en longitudes de 25 a 60 mm.',
          ],
        },
      ],
    },
    caracteristicas: [
      { icono: 'Atom', texto: 'Copa metálica de titanio con acabado altamente rugoso para {integración ósea}.' },
      { icono: 'Fingerprint', texto: 'Estabilidad primaria mejorada por rugosidad de superficie. Integración ósea secundaria hasta {70 %}.' },
      { icono: 'Hexagon', texto: 'Tres opciones de fricción: {polietileno PEXL-E} con vitamina E o {cerámica}.' },
      { icono: 'Lock', texto: 'Seguridad mejorada con inserto de polietileno fijo mediante {10 espirales antirrotación} y anillo de bloqueo.' },
      { icono: 'Circle', texto: 'Superficie interna lisa para facilitar {inserción y rotación}.' },
      { icono: 'Ruler', texto: 'Amplias opciones de tamaño: Cup: {44–66 mm} | Inserto: {28, 32 o 36 mm} | Tornillos: {25–60 mm}' },
      { icono: 'BadgeCheck', texto: 'Certificaciones de calidad {CE} y normativas europeas.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  hombro: {
    identidad: {
      eyebrow: 'PRÓTESIS DE HOMBRO',
      nombreComercial: ['UNIC®', 'REVERSE'],
      tagline: 'Sistema completo para {artroplastia inversa de hombro}.',
      descripcion:
        'Diseñado para restaurar la función del hombro en casos complejos y revisiones.',
      imagen: { src: '/IMG/MODEL/HOMBRO.webp', alt: 'Sistema UNIC REVERSE' },
    },
    sistema: {
      variante: 'thumbnails',
      componentes: [
        {
          titulo: 'COPA GLENOIDEA',
          texto: 'Con base de titanio y opciones de fijación con tornillos.',
        },
        {
          titulo: 'HÚMERO CON ESPIGA Y TORNILLOS',
          texto:
            'Diseño anatómico con espiga y tornillos de fijación para una estabilidad superior.',
        },
        {
          titulo: 'INSTRUMENTAL ESPECÍFICO',
          texto:
            'Instrumental quirúrgico dedicado para una colocación precisa y segura.',
        },
      ],
    },
    caracteristicas: [
      { icono: 'Blocks', texto: 'Modularidad que permite {adaptarse} a diferentes anatomías.' },
      { icono: 'Crosshair', texto: 'Diseñado para procedimientos de {revisión} y casos {complejos}.' },
      { icono: 'ShieldCheck', texto: 'Compatible con técnicas quirúrgicas {estándar} y {modernas}.' },
      { icono: 'Share2', texto: 'Materiales {biocompatibles} resistentes {al desgaste}.' },
      { icono: 'Activity', texto: 'Optimiza la {biomecánica} del hombro.' },
      { icono: 'BadgeCheck', texto: 'Certificaciones de calidad {CE} y cumplimiento de normativas internacionales.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  mano: {
    identidad: {
      eyebrow: 'PRÓTESIS DE MANO',
      nombreComercial: ['HORUS® TMC', 'TRAPECIOMETACARPIANA'],
      tagline:
        'Sistema completo para artroplastia trapeciometacarpiana (TM) con fijación {cementless} y tecnología modular.',
      descripcion:
        'Diseñado para restaurar la movilidad, aliviar el dolor y mejorar la calidad de vida de los pacientes.',
      imagen: { src: '/IMG/MODEL/MANO.webp', alt: 'Sistema HORUS TMC' },
    },
    sistema: {
      variante: 'thumbnails',
      componentes: [
        {
          titulo: 'COPA TRAPECIANA',
          texto: 'Copa trapeciana en polietileno altamente reticulado (PEXL-E).',
        },
        {
          titulo: 'CABEZA MODULAR',
          texto: 'Cabeza modular de Co-Cr con rango de movimiento de hasta 68°.',
        },
        {
          titulo: 'VÁSTAGO CEMENTLESS',
          texto:
            'Vástago cementless con recubrimiento poroso de titanio para una fijación biológica estable.',
        },
        {
          titulo: 'INSERTOS MODULARES',
          texto: 'Insertos en polietileno en diferentes opciones (cementless y cemented).',
        },
      ],
    },
    caracteristicas: [
      { icono: 'Blocks', texto: 'Diseñado para artroplastia trapeciometacarpiana (TM) con fijación {cementless} y tecnología modular.' },
      { icono: 'Crosshair', texto: 'Rango de movimiento {intra-protésico} de hasta 68°.' },
      { icono: 'Anchor', texto: 'Fijación cementless con recubrimiento poroso de titanio para estabilidad primaria y duradera.' },
      { icono: 'Share2', texto: 'Polietileno altamente reticulado (PEXL-E) con {vitamina E} para mayor resistencia al desgaste y al flujo en frío.' },
      { icono: 'HeartPulse', texto: 'Reducción del dolor y mejora significativa de la función y {movilidad} del pulgar.' },
      { icono: 'BadgeCheck', texto: 'Certificaciones de calidad {CE} y cumplimiento de normativas internacionales.' },
    ],
    // Mano no lleva footer: el cliente también descartó sus opciones de tamaño.
  },

  // ─────────────────────────────────────────────────────────────────
  rodilla: {
    identidad: {
      eyebrow: 'PRÓTESIS DE RODILLA',
      nombreComercial: ['Rolflex TONIC®', 'Inlay patellar button'],
      tagline: 'Sistema completo para {artroplastia total de rodilla}, compuesto por:',
      imagen: { src: '/IMG/MODEL/RODILLA.webp', alt: 'Sistema Rolflex TONIC' },
    },
    sistema: {
      variante: 'hotspots',
      imagen: { src: '/IMG/MODEL/RODILLA.webp', alt: 'Componentes del sistema de rodilla' },
      componentes: [
        { titulo: 'Cóndilos femorales y ultracongruentes (PS/UC)' },
        { titulo: 'Base tibial fija o rotatoria' },
        { titulo: 'Inserto tibial cementless o cementado' },
        { titulo: 'Patela (Inlay patellar button)' },
        { titulo: 'Instrumental quirúrgico específico para la colocación y ajuste' },
      ],
    },
    caracteristicas: [
      { icono: 'Share2', texto: 'Tallas disponibles según modelo y necesidad quirúrgica.' },
      { icono: 'Circle', texto: '{Patela (Inlay patellar button):} Ø23, Ø25, Ø28 mm' },
      { icono: 'Layers', texto: '{Tibial (Base tibial):} h.10–18 mm según tipo (fixed, rotating)' },
      { icono: 'Bone', texto: '{Cóndilos femorales (PS/UC):} múltiples tamaños disponibles' },
      { icono: 'ShieldCheck', texto: 'Compatible con técnicas quirúrgicas estándar y modernas.' },
      { icono: 'Atom', texto: 'Materiales biocompatibles y resistentes al desgaste.' },
      { icono: 'BadgeCheck', texto: 'Certificación {CE} y cumplimiento de normativa ISO 5832 y 13485.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // Sin referencia visual del cliente. Contenido migrado de placas.ts.
  placas: {
    identidad: {
      eyebrow: 'PLACAS Y TORNILLOS',
      nombreComercial: ['SISTEMA DE', 'OSTEOSÍNTESIS'],
      tagline: 'Sistemas de {fijación interna} para fracturas complejas.',
      imagen: { src: '/placeholders/placas-comerciales.webp', alt: 'Placas y tornillos' },
    },
    caracteristicas: [
      { icono: 'Anchor', texto: 'Fijación estable con {estabilidad primaria} para consolidación ósea óptima.' },
      { icono: 'Bone', texto: 'Diseño {anatómicamente preformado} según región.' },
      { icono: 'Layers', texto: 'Perfil bajo para reducir la irritación de tejidos blandos.' },
      { icono: 'BadgeCheck', texto: 'Material certificado con trazabilidad por lote.' },
    ],
  },
}

/** Ficha completa de una zona: hero + detalle. `undefined` si la zona no existe. */
export function getProducto(id: string): ProductoData | undefined {
  const detalle = detalles[id]
  const hero = heroes[id]
  if (!detalle || !hero) return undefined
  return { id, hero, ...detalle }
}
