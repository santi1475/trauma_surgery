// Datos de la línea de Placas y Tornillos — Sistema de Osteosíntesis.
import type { CaderaData } from './cadera'

export const placasData: CaderaData = {
  eyebrow: 'OSTEOSÍNTESIS',
  titulo: 'PLACAS Y TORNILLOS',
  subtitulo: 'Sistemas de fijación interna',
  descripcion:
    'Soluciones de fijación interna para fracturas complejas, diseñadas para estabilidad primaria y consolidación ósea óptima.',
  cta: { label: 'ENVIAR EMAIL', href: 'mailto:traumasurgery.eirl@gmail.com' },
  beneficios: [
    { titulo: 'Fijación estable', glyph: '◇' },
    { titulo: 'Anatómicamente preformado', glyph: '✚' },
    { titulo: 'Bajo perfil', glyph: '▭' },
    { titulo: 'Material certificado', glyph: '✓' },
  ],
  certificaciones: [{ label: 'ISO 13485' }, { label: 'ISO 9001' }, { label: 'CE' }],
  paises: [
    { bandera: '🇵🇪', nombre: 'Perú' },
    { bandera: '🇧🇴', nombre: 'Bolivia' },
    { bandera: '🇨🇴', nombre: 'Colombia' },
    { bandera: '🇵🇾', nombre: 'Paraguay' },
  ],
  sistema: {
    nombreCorto: 'PLACAS Y TORNILLOS',
    nombreComercial: 'SISTEMA DE OSTEOSÍNTESIS',
    descripcion:
      'Sistemas de fijación interna para fracturas complejas. Placas anatómicas, tornillos de cortical y esponjosa, y clavos intramedulares.',
  },
  caracteristicas: [
    {
      titulo: 'Placas anatómicas preformadas',
      descripcion: 'Adaptación regional sin pre-bending intraoperatorio.',
    },
    {
      titulo: 'Tornillos bloqueados',
      descripcion: 'Estabilidad angular en hueso osteoporótico.',
    },
    {
      titulo: 'Tornillos de cortical y esponjosa',
      descripcion: 'Fijación según calidad y región del hueso.',
    },
    {
      titulo: 'Material de titanio Ti6Al4V',
      descripcion: 'Biocompatibilidad y alta resistencia mecánica.',
    },
    {
      titulo: 'Instrumental dedicado',
      descripcion: 'Brocas, guías y destornilladores para cada sistema.',
    },
  ],
  ingenieria: [
    { numero: '01', titulo: 'PLACA ANATÓMICA', tint: 'rgba(0,217,255,0.16)' },
    { numero: '02', titulo: 'TORNILLOS CORTICALES', tint: 'rgba(0,217,255,0.12)' },
    { numero: '03', titulo: 'TORNILLOS DE ESPONJOSA', tint: 'rgba(212,175,55,0.14)' },
    { numero: '04', titulo: 'INSTRUMENTACIÓN', tint: 'rgba(0,217,255,0.10)' },
  ],
}
