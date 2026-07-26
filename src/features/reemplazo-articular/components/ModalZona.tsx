'use client'
// ModalZona — modal de detalle de cualquier zona anatómica.
// Sustituye a los 5 wrappers idénticos (ModalCadera, ModalRodilla, …):
// la única diferencia entre ellos era el import de data.

import { useId } from 'react'
import ModalProducto from './ModalProducto'
import { ModalHero } from './ModalHero'
import { ModalDetalle } from './ModalDetalle'
import { getProducto } from '../data/detalles'

interface Props {
  /** Slug de la zona: 'cadera' | 'rodilla' | 'hombro' | 'mano' | 'placas' */
  zona: string
  open: boolean
  onClose: () => void
}

export default function ModalZona({ zona, open, onClose }: Props) {
  const titleId = useId()
  const producto = getProducto(zona)

  if (!producto) return null

  return (
    <ModalProducto open={open} onClose={onClose} titleId={titleId}>
      <ModalHero data={producto.hero} titleId={titleId} />
      <ModalDetalle data={producto} scopeId={zona} />
    </ModalProducto>
  )
}
