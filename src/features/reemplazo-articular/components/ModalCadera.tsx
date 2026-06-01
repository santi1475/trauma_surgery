'use client'
// ModalCadera — vista de detalle del sistema de Prótesis de Cadera.

import { useId } from 'react'
import ModalProducto from './ModalProducto'
import ModalContenido from './ModalContenido'
import { caderaData } from '../data/cadera'

interface Props {
  open: boolean
  onClose: () => void
}

export default function ModalCadera({ open, onClose }: Props) {
  const titleId = useId()
  return (
    <ModalProducto open={open} onClose={onClose} titleId={titleId}>
      <ModalContenido data={caderaData} titleId={titleId} scopeId="cadera" />
    </ModalProducto>
  )
}
