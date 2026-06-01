'use client'
import { useId } from 'react'
import ModalProducto from './ModalProducto'
import ModalContenido from './ModalContenido'
import { rodillaData } from '../data/rodilla'

interface Props {
  open: boolean
  onClose: () => void
}

export default function ModalRodilla({ open, onClose }: Props) {
  const titleId = useId()
  return (
    <ModalProducto open={open} onClose={onClose} titleId={titleId}>
      <ModalContenido data={rodillaData} titleId={titleId} scopeId="rodilla" />
    </ModalProducto>
  )
}
