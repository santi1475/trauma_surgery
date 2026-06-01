// Datos de la línea de Prótesis de Rodilla — sistema ROLFLEX TONIC®.
import type { CaderaData } from './cadera'

export const rodillaData: CaderaData = {
  eyebrow: 'PRÓTESIS AVANZADAS',
  titulo: 'PRÓTESIS DE RODILLA',
  subtitulo: 'Sistemas de reemplazo articular',
  descripcion:
    'Prótesis primarias y de revisión diseñadas para restaurar la función biomecánica de la rodilla.',
  cta: { label: 'ENVIAR EMAIL', href: 'mailto:traumasurgery.eirl@gmail.com' },
  beneficios: [
    { titulo: 'Estabilidad primaria', glyph: '◈' },
    { titulo: 'Cinemática natural', glyph: '↺' },
    { titulo: 'Longa vida útil', glyph: '∞' },
    { titulo: 'Rango de movimiento', glyph: '↗' },
  ],
  certificaciones: [{ label: 'ISO 13485' }, { label: 'ISO 9001' }, { label: 'CE' }],
  paises: [
    { bandera: '🇵🇪', nombre: 'Perú' },
    { bandera: '🇧🇴', nombre: 'Bolivia' },
    { bandera: '🇨🇴', nombre: 'Colombia' },
    { bandera: '🇵🇾', nombre: 'Paraguay' },
  ],
  sistema: {
    nombreCorto: 'PRÓTESIS DE RODILLA',
    nombreComercial: 'ROLFLEX TONIC®',
    descripcion:
      'Sistema modular de artroplastia total de rodilla con componentes femorales, tibiales y patelares optimizados para la cinemática natural.',
  },
  caracteristicas: [
    {
      titulo: 'Condilos femorales anatómicos',
      descripcion: 'Curvatura optimizada para movimiento fisiológico.',
    },
    {
      titulo: 'Base tibial con quilla',
      descripcion: 'Estabilidad primaria en corte tibial proximal.',
    },
    {
      titulo: 'Inserto tibial de polietileno',
      descripcion: 'Alta resistencia al desgaste y baja fricción.',
    },
    {
      titulo: 'Componente patelar',
      descripcion: 'Opción de resurfacing para reducir dolor anterior.',
    },
    {
      titulo: 'Instrumental específico',
      descripcion: 'Guías de corte para reproducibilidad quirúrgica.',
    },
  ],
  ingenieria: [
    { numero: '01', titulo: 'CONDILOS FEMORALES', tint: 'rgba(0,217,255,0.16)' },
    { numero: '02', titulo: 'BASE TIBIAL', tint: 'rgba(0,217,255,0.12)' },
    { numero: '03', titulo: 'INSERTO TIBIAL', tint: 'rgba(212,175,55,0.14)' },
    { numero: '04', titulo: 'COMPONENTE PATELAR', tint: 'rgba(0,217,255,0.10)' },
  ],
}
