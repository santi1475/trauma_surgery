'use client'
import { useId } from 'react'
import ModalProducto from './ModalProducto'
import ModalContenido from './ModalContenido'
import { manoData } from '../data/mano'

interface Props {
  open: boolean
  onClose: () => void
}

export default function ModalMano({ open, onClose }: Props) {
  const titleId = useId()
  return (
    <ModalProducto open={open} onClose={onClose} titleId={titleId}>
      <ModalContenido data={manoData} titleId={titleId} scopeId="mano" />
    </ModalProducto>
  )
}
