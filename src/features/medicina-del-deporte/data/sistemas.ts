// Sistemas de Medicina del Deporte (Artroscopia y reconstrucción ligamentaria)
// Catálogos oficiales del fabricante en PDF publicados en public/docs/<id>.pdf

import {
  PILARES_ARTRO,
  type Categoria,
  type SistemaOsteo,
} from '@/features/osteosintesis/data/tipos'

export const sistemasMedicinaDeporte: SistemaOsteo[] = [
  // ─── 1. Ligamento cruzado y sindesmosis ─────────────────────────────
  {
    id: 'fijacion-lca',
    categoria: 'ligamentos',
    titulo: ['SISTEMA DE FIJACIÓN DEL', 'LIGAMENTO CRUZADO ANTERIOR (LCA)'],
    subtitulo: 'TORNILLOS DE INTERFERENCIA',
    descripcion:
      'Tornillos de interferencia {biocompuestos y PEEK} con rosca atraumática para fijación femoral y tibial en reconstrucción de LCA.',
    imagen: { src: '/IMG/CATALOGO/fijacion-lca.webp', alt: 'Tornillo de interferencia para LCA' },
    pilares: PILARES_ARTRO,
    fuente: 'Catálogo Sistema de Fijación LCA',
    pdf: {
      url: '/docs/fijacion-lca.pdf',
      titulo: 'Catálogo Oficial — Sistema Fijación LCA',
      peso: '1.2 MB',
      paginas: 4,
    },
  },
  {
    id: 'boton-lca',
    categoria: 'ligamentos',
    titulo: ['BOTÓN LCA', 'LIGAMENTO CRUZADO ANTERIOR'],
    subtitulo: 'SISTEMA DE FIJACIÓN CORTICAL',
    descripcion:
      'Botones corticales de {titanio grado médico} con bucle continuo en UHMWPE para suspensión femoral.',
    imagen: { src: '/IMG/CATALOGO/boton-lca.webp', alt: 'Botón cortical para LCA con lazo continuo' },
    pilares: PILARES_ARTRO,
    fuente: 'Catálogo Botón LCA',
    pdf: {
      url: '/docs/boton-lca.pdf',
      titulo: 'Catálogo Oficial — Botón LCA',
      peso: '0.8 MB',
      paginas: 4,
    },
  },
  {
    id: 'boton-para-lca',
    categoria: 'ligamentos',
    titulo: ['BOTÓN PARA LCA', 'LIGAMENTO CRUZADO ANTERIOR'],
    subtitulo: 'LAZO AJUSTABLE',
    descripcion:
      'Botón cortical de {lazo ajustable} para pretensado milimétrico del injerto en reconstrucción ligamentaria.',
    imagen: { src: '/IMG/CATALOGO/boton-para-lca.webp', alt: 'Botón para LCA de lazo ajustable' },
    pilares: PILARES_ARTRO,
    fuente: 'Catálogo Botón para LCA',
    pdf: {
      url: '/docs/boton-para-lca.pdf',
      titulo: 'Catálogo Oficial — Botón para LCA (Ajustable)',
      peso: '1.4 MB',
      paginas: 4,
    },
  },
  {
    id: 'fijacion-sindesmosis',
    categoria: 'ligamentos',
    titulo: ['SISTEMA DE FIJACIÓN', 'SINDESMOSIS'],
    subtitulo: 'FIJACIÓN DINÁMICA DE TOBILLO',
    descripcion:
      'Sistema de {suspensión con doble botón} y sutura de alta resistencia para estabilización fisiológica de la sindesmosis tibioperonea.',
    imagen: { src: '/IMG/CATALOGO/fijacion-sindesmosis.webp', alt: 'Sistema de fijación de sindesmosis sobre tobillo' },
    pilares: PILARES_ARTRO,
    fuente: 'Catálogo Fijación Sindesmosis',
    pdf: {
      url: '/docs/fijacion-sindesmosis.pdf',
      titulo: 'Catálogo Oficial — Fijación de Sindesmosis',
      peso: '0.9 MB',
      paginas: 4,
    },
  },

  // ─── 2. Anclajes de sutura ──────────────────────────────────────────
  {
    id: 'anclaje-inestabilidad',
    categoria: 'anclajes',
    titulo: ['SISTEMA DE ANCLAJE', 'INESTABILIDAD'],
    subtitulo: 'BANKART / SLAP',
    descripcion:
      'Anclajes premontados de {PEEK y biocompuestos} para reparación labral y tratamiento de inestabilidad glenohumeral.',
    imagen: { src: '/IMG/CATALOGO/anclaje-inestabilidad.webp', alt: 'Anclajes para inestabilidad con insertador' },
    pilares: PILARES_ARTRO,
    fuente: 'Catálogo Sistema de Anclaje Inestabilidad',
    pdf: {
      url: '/docs/anclaje-inestabilidad.pdf',
      titulo: 'Catálogo Oficial — Anclaje Inestabilidad',
      peso: '1.1 MB',
      paginas: 4,
    },
  },
  {
    id: 'anclaje-medial',
    categoria: 'anclajes',
    titulo: ['SISTEMA DE ANCLAJE', 'MEDIAL'],
    subtitulo: 'DOBLE HILERA ROTATOR CUFF',
    descripcion:
      'Anclajes roscados para {hilera medial} en reparación de manguito rotador con sutura de alta resistencia precargada.',
    imagen: { src: '/IMG/CATALOGO/anclaje-medial.webp', alt: 'Anclaje medial con rosca completa' },
    pilares: PILARES_ARTRO,
    fuente: 'Catálogo Sistema de Anclaje Medial',
    pdf: {
      url: '/docs/anclaje-medial.pdf',
      titulo: 'Catálogo Oficial — Sistema de Anclaje Medial',
      peso: '2.8 MB',
      paginas: 4,
    },
  },
  {
    id: 'anclaje-lateral',
    categoria: 'anclajes',
    titulo: ['SISTEMA DE ANCLAJE', 'LATERAL'],
    subtitulo: 'BIOCOMPOSITE / PEEK KNOTLESS',
    descripcion:
      'Anclajes sin nudo (knotless) para {hilera lateral}, diseñados para fijación a compresión en técnicas SpeedBridge / SutureBridge.',
    imagen: { src: '/IMG/CATALOGO/anclaje-lateral.webp', alt: 'Anclajes laterales con sutura precargada' },
    pilares: PILARES_ARTRO,
    fuente: 'Catálogo Sistema de Anclaje Lateral',
    pdf: {
      url: '/docs/anclaje-lateral.pdf',
      titulo: 'Catálogo Oficial — Sistema de Anclaje Lateral',
      peso: '0.9 MB',
      paginas: 4,
    },
  },

  // ─── 3. Pequeñas articulaciones ─────────────────────────────────────
  {
    id: 'anclaje-de-sutura',
    categoria: 'pequenas-articulaciones',
    titulo: ['PEQUEÑAS ARTICULACIONES', 'ANCLAJE DE SUTURA'],
    subtitulo: 'MANO, MUÑECA Y PIE',
    descripcion:
      'Micro-anclajes de sutura para {reparación ligamentaria en dedos, mano y pie}, con insertador precargado.',
    imagen: { src: '/IMG/CATALOGO/anclaje-de-sutura.webp', alt: 'Anclaje de sutura con insertador sobre mano' },
    pilares: PILARES_ARTRO,
    fuente: 'Catálogo Anclaje de Sutura',
    pdf: {
      url: '/docs/anclaje-de-sutura.pdf',
      titulo: 'Catálogo Oficial — Anclaje de Sutura',
      peso: '0.9 MB',
      paginas: 2,
    },
  },
  {
    id: 'bioharpoon',
    categoria: 'pequenas-articulaciones',
    titulo: ['PEQUEÑAS ARTICULACIONES', 'BIOHARPOON'],
    subtitulo: 'ANCLAJE DE PIE Y TOBILLO',
    descripcion:
      'Anclaje Bioharpoon para {estabilización de tendones y ligamentos} en pie y tobillo, con sutura precargada.',
    imagen: { src: '/IMG/CATALOGO/bioharpoon.webp', alt: 'Anclajes Bioharpoon sobre pie radiografiado' },
    pilares: PILARES_ARTRO,
    fuente: 'Catálogo Anclaje Bioharpoon',
    pdf: {
      url: '/docs/bioharpoon.pdf',
      titulo: 'Catálogo Oficial — Anclaje Bioharpoon',
      peso: '1.3 MB',
      paginas: 4,
    },
  },

  // ─── 4. Menisco y paso de sutura ────────────────────────────────────
  {
    id: 'bunny-fix',
    categoria: 'menisco',
    titulo: ['SISTEMA DE REPARACIÓN', 'BUNNY FIX'],
    subtitulo: 'REPARACIÓN MENISCAL ALL-INSIDE',
    descripcion:
      'Dispositivo todo-dentro (all-inside) para {reparación meniscal} con implantes PEEK de bajo perfil e hilo UHMWPE.',
    imagen: { src: '/IMG/CATALOGO/bunny-fix.webp', alt: 'Aplicador Bunny Fix para reparación de menisco' },
    pilares: PILARES_ARTRO,
    fuente: 'Catálogo Sistema Bunny Fix',
    pdf: {
      url: '/docs/bunny-fix.pdf',
      titulo: 'Catálogo Oficial — Sistema Bunny Fix',
      peso: '2.8 MB',
      paginas: 2,
    },
  },
  {
    id: 'aguja-doble-brazo',
    categoria: 'menisco',
    titulo: ['REPARACIÓN DE MENISCO', 'AGUJA DE DOBLE BRAZO'],
    subtitulo: 'INSIDE-OUT / OUTSIDE-IN',
    descripcion:
      'Aguja flexible de doble brazo con sutura Force Fiber {UHMWPE USP 2-0} para técnicas meniscales anatómicas.',
    imagen: { src: '/IMG/CATALOGO/aguja-doble-brazo.webp', alt: 'Aguja de doble brazo con sutura UHMWPE' },
    pilares: PILARES_ARTRO,
    fuente: 'Catálogo Aguja de Doble Brazo',
    pdf: {
      url: '/docs/aguja-doble-brazo.pdf',
      titulo: 'Catálogo Oficial — Aguja de Doble Brazo',
      peso: '0.5 MB',
      paginas: 2,
    },
  },
  {
    id: 'aguja-cobra',
    categoria: 'menisco',
    titulo: ['PASADORES DE SUTURA', 'AGUJA COBRA'],
    subtitulo: 'INSTRUMENTAL ARTROSCÓPICO',
    descripcion:
      'Pasadores de sutura Cobra {simple y múltiple} diseñados para transporte seguro de hilos a través de portales artroscópicos.',
    imagen: { src: '/IMG/CATALOGO/aguja-cobra.webp', alt: 'Pasadores de sutura Cobra' },
    pilares: PILARES_ARTRO,
    fuente: 'Catálogo Aguja Cobra',
    pdf: {
      url: '/docs/aguja-cobra.pdf',
      titulo: 'Catálogo Oficial — Aguja Cobra',
      peso: '0.5 MB',
      paginas: 2,
    },
  },
]

export const GRUPOS_MEDICINA_DEPORTE: Array<{ id: Categoria; titulo: string; texto: string }> = [
  {
    id: 'ligamentos',
    titulo: 'Ligamento cruzado y sindesmosis',
    texto: 'Tornillos de interferencia y botones corticales de lazo fijo o ajustable.',
  },
  {
    id: 'anclajes',
    titulo: 'Anclajes de sutura',
    texto: 'Anclajes biocompuestos, PEEK, metálicos y todo-sutura para manguito rotador e inestabilidad.',
  },
  {
    id: 'pequenas-articulaciones',
    titulo: 'Pequeñas articulaciones',
    texto: 'Micro-anclajes para reparaciones tendinosas y ligamentarias en mano, muñeca, pie y tobillo.',
  },
  {
    id: 'menisco',
    titulo: 'Menisco y paso de sutura',
    texto: 'Sistemas all-inside de reparación meniscal, agujas de doble brazo y pasadores de sutura.',
  },
]

export function getSistemaMedicinaDeporte(id: string) {
  return sistemasMedicinaDeporte.find((s) => s.id === id)
}
