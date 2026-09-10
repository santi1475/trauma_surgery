// Glifos anatómicos de las cinco zonas del visor.
//
// Sustituyen a los emoji (🖐️ 🦾 🦴 🦿 🦶) que hacían de iconos: un emoji lo
// dibuja el sistema operativo, cambia de estilo en cada plataforma y aquí
// llegaba teñido con un filtro `sepia + hue-rotate` para disimular su color.
// Estos van en `currentColor` y con el mismo grosor de trazo que lucide, que
// es la familia de iconos del resto del sitio.
//
// Se indexan por el `id` de la zona: los ids de hotspots.ts y de
// zonasAnatomicas.ts son los mismos, así que no hace falta un campo `icon`
// duplicado en los datos.

export type ZonaIcono = 'mano' | 'hombro' | 'cadera' | 'rodilla' | 'pie'

const TRAZOS: Record<ZonaIcono, React.ReactNode> = {
  // Mano y muñeca — palma con cuatro dedos y pulgar.
  mano: (
    <>
      <path d="M8.5 12.5V7a1.5 1.5 0 0 1 3 0v5" />
      <path d="M11.5 12V5a1.5 1.5 0 0 1 3 0v7" />
      <path d="M14.5 12.5V7.5a1.5 1.5 0 0 1 3 0V14" />
      <path d="M8.5 12.5v-1a1.5 1.5 0 0 0-3 0v4c0 3.3 2.4 6 6 6h2.5c2.6 0 4.5-2.1 4.5-4.7V14" />
    </>
  ),
  // Hombro — cabeza humeral encajada en la glenoides.
  hombro: (
    <>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M15.2 4.2a5.2 5.2 0 0 1 0 7.6" />
      <path d="M8.6 11.4 7.4 20" />
      <path d="M5.6 20h4" />
    </>
  ),
  // Cadera — cabeza femoral, acetábulo, cuello y diáfisis.
  cadera: (
    <>
      <circle cx="8.6" cy="8.4" r="3" />
      <path d="M13.4 4.8a4.8 4.8 0 0 1 0 7.2" />
      <path d="m10.8 10.6 2.6 3.2" />
      <path d="m13.4 13.8-1.2 6.6" />
    </>
  ),
  // Rodilla — diáfisis femoral, cóndilos y tibia.
  rodilla: (
    <>
      <path d="M11 3v5.6" />
      <circle cx="9" cy="11.6" r="2.4" />
      <circle cx="14" cy="11.6" r="2.4" />
      <path d="M11.6 14.2V21" />
    </>
  ),
  // Pie y tobillo — perfil lateral con la tibia.
  pie: (
    <>
      <path d="M8.4 3v8.4" />
      <path d="M8.4 11.4c-2.6 0-4.1 1.7-4.1 3.8S6.1 19.4 9.5 19.4H18a1.9 1.9 0 0 0 0-3.8c-3.5 0-4.5-4.2-9.6-4.2Z" />
    </>
  ),
}

interface Props {
  zona: ZonaIcono
  /** Lado del icono en px. */
  size?: number
  className?: string
}

export function IconoZona({ zona, size = 20, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {TRAZOS[zona]}
    </svg>
  )
}
