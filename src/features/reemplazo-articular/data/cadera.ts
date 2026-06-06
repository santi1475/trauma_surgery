// Datos de la línea de Prótesis de Cadera — sistema CAPTIV FREELINERS®.
// Tipados para consumo desde ModalCadera y futuras vistas de detalle.

export interface Caracteristica {
  titulo: string
  descripcion: string
}

export interface PiezaIngenieria {
  numero: string
  titulo: string
  /** Color de acento del placeholder visual cuadrado (tint sutil). */
  tint?: string
}

export interface Beneficio {
  titulo: string
  /** Glyph corto mostrado dentro del hexágono (1–2 caracteres). */
  glyph: string
}

export interface Certificacion {
  label: string
}

export interface Pais {
  bandera: string
  nombre: string
}

export interface CaderaData {
  eyebrow: string
  titulo: string
  subtitulo: string
  descripcion: string
  cta: { label: string; href: string }
  beneficios: Beneficio[]
  certificaciones: Certificacion[]
  paises: Pais[]
  sistema: {
    nombreCorto: string
    nombreComercial: string
    descripcion: string
  }
  caracteristicas: Caracteristica[]
  ingenieria: PiezaIngenieria[]
}

export const caderaData: CaderaData = {
  eyebrow: 'PRÓTESIS AVANZADAS',
  titulo: 'PRÓTESIS DE CADERA',
  subtitulo: 'Sistemas de reemplazo articular',
  descripcion:
    'Soluciones diseñadas para restaurar la movilidad, aliviar el dolor y mejorar la calidad de vida.',
  cta: { label: 'ENVIAR EMAIL', href: 'mailto:traumasurgery.eirl@gmail.com' },
  beneficios: [
    { titulo: 'Biocompatible', glyph: '◇' },
    { titulo: 'Larga duración', glyph: '∞' },
    { titulo: 'Precisión quirúrgica', glyph: '✚' },
    { titulo: 'Recuperación rápida', glyph: '↗' },
  ],
  certificaciones: [
    { label: 'ISO 13485' },
    { label: 'ISO 9001' },
    { label: 'CE' },
  ],
  paises: [
    { bandera: '/flags/peru.svg', nombre: 'Perú' },
    { bandera: '/flags/bolivia.svg', nombre: 'Bolivia' },
    { bandera: '/flags/colombia.svg', nombre: 'Colombia' },
    { bandera: '/flags/paraguay.svg', nombre: 'Paraguay' },
  ],
  sistema: {
    nombreCorto: 'PRÓTESIS DE CADERA',
    nombreComercial: 'CAPTIV FREELINERS®',
    descripcion:
      'Copa acetabular modular con sistema de liners intercambiables. Diseño anatómico que permite seleccionar el par tribológico óptimo durante el acto quirúrgico, optimizando estabilidad primaria y reduciendo el riesgo de luxación.',
  },
  caracteristicas: [
    {
      titulo: 'Recubrimiento poroso de titanio',
      descripcion: 'Osteointegración acelerada y fijación biológica primaria.',
    },
    {
      titulo: 'Liners modulares intercambiables',
      descripcion: 'Polietileno PEXL-E, cerámica o metal según necesidad clínica.',
    },
    {
      titulo: 'Geometría hemisférica optimizada',
      descripcion: 'Distribución uniforme de cargas y reducción del desgaste.',
    },
    {
      titulo: 'Sistema de fijación con tornillos',
      descripcion: 'Estabilidad adicional en defectos óseos acetabulares.',
    },
    {
      titulo: 'Trazabilidad completa',
      descripcion: 'Identificación por lote y número de serie en cada componente.',
    },
  ],
  ingenieria: [
    { numero: '01', titulo: 'COPA ACETABULAR', tint: 'rgba(0,217,255,0.16)' },
    { numero: '02', titulo: 'INSERTO POLIETILENO PEXL-E', tint: 'rgba(0,217,255,0.12)' },
    { numero: '03', titulo: 'INSERTO CERÁMICO', tint: 'rgba(212,175,55,0.14)' },
    { numero: '04', titulo: 'TORNILLOS ACETABULARES', tint: 'rgba(0,217,255,0.10)' },
  ],
}
