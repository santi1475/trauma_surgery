// Datos de la línea de Prótesis de Hombro — Sistema Anatómico Invertido.
import type { CaderaData } from './cadera'

export const hombroData: CaderaData = {
  eyebrow: 'PRÓTESIS AVANZADAS',
  titulo: 'PRÓTESIS DE HOMBRO',
  subtitulo: 'Sistemas de reemplazo articular',
  descripcion:
    'Soluciones para artroplastia total e invertida de hombro, restaurando la movilidad y reduciendo el dolor articular.',
  cta: { label: 'ENVIAR EMAIL', href: 'mailto:traumasurgery.eirl@gmail.com' },
  beneficios: [
    { titulo: 'Configuración invertida', glyph: '⇄' },
    { titulo: 'Estabilidad gleno-humeral', glyph: '◇' },
    { titulo: 'Reconstrucción precisa', glyph: '✚' },
    { titulo: 'Rango funcional', glyph: '↗' },
  ],
  certificaciones: [{ label: 'ISO 13485' }, { label: 'ISO 9001' }, { label: 'CE' }],
  paises: [
    { bandera: '🇵🇪', nombre: 'Perú' },
    { bandera: '🇧🇴', nombre: 'Bolivia' },
    { bandera: '🇨🇴', nombre: 'Colombia' },
    { bandera: '🇵🇾', nombre: 'Paraguay' },
  ],
  sistema: {
    nombreCorto: 'PRÓTESIS DE HOMBRO',
    nombreComercial: 'SISTEMA ANATÓMICO INVERTIDO',
    descripcion:
      'Sistema completo para artroplastia total e invertida de hombro. Incluye copa glenoidea, vástago humeral con tornillos e instrumental específico.',
  },
  caracteristicas: [
    {
      titulo: 'Copa glenoidea con metaback',
      descripcion: 'Fijación con tornillos para estabilidad primaria robusta.',
    },
    {
      titulo: 'Glenoesfera modular',
      descripcion: 'Diámetros configurables según anatomía del paciente.',
    },
    {
      titulo: 'Vástago humeral cementless',
      descripcion: 'Recubrimiento poroso para osteointegración biológica.',
    },
    {
      titulo: 'Inserto humeral de polietileno',
      descripcion: 'Articulación de baja fricción con la glenoesfera.',
    },
    {
      titulo: 'Instrumental dedicado',
      descripcion: 'Guías de fresado y posicionamiento reproducibles.',
    },
  ],
  ingenieria: [
    { numero: '01', titulo: 'COPA GLENOIDEA', tint: 'rgba(0,217,255,0.16)' },
    { numero: '02', titulo: 'HÚMERO CON ESPIGA', tint: 'rgba(0,217,255,0.12)' },
    { numero: '03', titulo: 'TORNILLOS', tint: 'rgba(212,175,55,0.14)' },
    { numero: '04', titulo: 'INSTRUMENTAL', tint: 'rgba(0,217,255,0.10)' },
  ],
}
