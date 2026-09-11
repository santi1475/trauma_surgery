// Iconos de lucide que los datos referencian por nombre (`icono: 'Ruler'`).
//
// Antes los tres modales hacían `import * as Iconos from 'lucide-react'` para
// resolver el nombre en tiempo de ejecución: eso mete la librería entera
// (~585 KB minificados, un chunk por página) para usar veinte iconos. Con un
// mapa explícito el bundler solo empaqueta los que aparecen aquí.
//
// Para añadir un icono nuevo a los datos: importarlo y sumarlo al mapa.
import {
  Activity,
  Anchor,
  ArrowRight,
  Atom,
  BadgeCheck,
  Blocks,
  Bone,
  Circle,
  Compass,
  Cpu,
  Crosshair,
  ExternalLink,
  FileText,
  Fingerprint,
  HeartPulse,
  Hexagon,
  Layers,
  Lock,
  MessageCircle,
  Ruler,
  Share2,
  ShieldCheck,
  Triangle,
  UserRound,
  type LucideIcon,
} from 'lucide-react'

export const ICONOS: Record<string, LucideIcon> = {
  Activity,
  Anchor,
  ArrowRight,
  Atom,
  BadgeCheck,
  Blocks,
  Bone,
  Circle,
  Compass,
  Cpu,
  Crosshair,
  ExternalLink,
  FileText,
  Fingerprint,
  HeartPulse,
  Hexagon,
  Layers,
  Lock,
  MessageCircle,
  Ruler,
  Share2,
  ShieldCheck,
  Triangle,
  UserRound,
}

/** Resuelve un nombre de icono; si no está en el mapa, cae en Hexagon. */
export function icono(nombre?: string): LucideIcon {
  return (nombre && ICONOS[nombre]) || Hexagon
}
