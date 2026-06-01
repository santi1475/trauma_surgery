// Datos de la línea de Prótesis de Mano — sistema HORUS® TMC.
import type { CaderaData } from './cadera'

export const manoData: CaderaData = {
  eyebrow: 'PRÓTESIS AVANZADAS',
  titulo: 'PRÓTESIS DE MANO',
  subtitulo: 'Sistemas de reemplazo articular',
  descripcion:
    'Implantes para reconstrucción articular de la mano y la muñeca, diseñados para restaurar la pinza y la función fina.',
  cta: { label: 'ENVIAR EMAIL', href: 'mailto:traumasurgery.eirl@gmail.com' },
  beneficios: [
    { titulo: 'Reconstrucción TMC', glyph: '◇' },
    { titulo: 'Fijación cementless', glyph: '⊙' },
    { titulo: 'Diseño anatómico', glyph: '✚' },
    { titulo: 'Función de la pinza', glyph: '↗' },
  ],
  certificaciones: [{ label: 'ISO 13485' }, { label: 'ISO 9001' }, { label: 'CE' }],
  paises: [
    { bandera: '🇵🇪', nombre: 'Perú' },
    { bandera: '🇧🇴', nombre: 'Bolivia' },
    { bandera: '🇨🇴', nombre: 'Colombia' },
    { bandera: '🇵🇾', nombre: 'Paraguay' },
  ],
  sistema: {
    nombreCorto: 'PRÓTESIS DE MANO',
    nombreComercial: 'HORUS® TMC TRAPECIOMETACARPIANA',
    descripcion:
      'Sistema de fijación cementless para reconstrucción de la articulación trapeciometacarpiana. Diseño anatómico para restaurar la pinza y la función de la mano.',
  },
  caracteristicas: [
    {
      titulo: 'Cúpula con recubrimiento poroso',
      descripcion: 'Osteointegración acelerada en el trapecio.',
    },
    {
      titulo: 'Cabeza esférica de cromo-cobalto',
      descripcion: 'Articulación de baja fricción y alta resistencia.',
    },
    {
      titulo: 'Cuello modular',
      descripcion: 'Ajuste fino de offset y longitud intraoperatoria.',
    },
    {
      titulo: 'Vástago anatómico',
      descripcion: 'Diseño optimizado para el canal del metacarpiano.',
    },
    {
      titulo: 'Instrumental específico',
      descripcion: 'Fresas y guías para reproducibilidad quirúrgica.',
    },
  ],
  ingenieria: [
    { numero: '01', titulo: 'CÚPULA', tint: 'rgba(0,217,255,0.16)' },
    { numero: '02', titulo: 'CABEZA', tint: 'rgba(0,217,255,0.12)' },
    { numero: '03', titulo: 'CUELLO', tint: 'rgba(212,175,55,0.14)' },
    { numero: '04', titulo: 'VÁSTAGO', tint: 'rgba(0,217,255,0.10)' },
  ],
}
