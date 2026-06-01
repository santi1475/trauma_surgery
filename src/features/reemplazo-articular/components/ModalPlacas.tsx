'use client'
import { useId } from 'react'
import ModalProducto from './ModalProducto'
import ModalContenido from './ModalContenido'
import { placasData } from '../data/placas'

interface Props {
  open: boolean
  onClose: () => void
}

export default function ModalPlacas({ open, onClose }: Props) {
  const titleId = useId()
  return (
    <ModalProducto open={open} onClose={onClose} titleId={titleId}>
      <ModalContenido data={placasData} titleId={titleId} scopeId="placas" />
    </ModalProducto>
  )
}
