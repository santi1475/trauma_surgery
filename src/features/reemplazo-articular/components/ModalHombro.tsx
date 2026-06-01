'use client'
import { useId } from 'react'
import ModalProducto from './ModalProducto'
import ModalContenido from './ModalContenido'
import { hombroData } from '../data/hombro'

interface Props {
  open: boolean
  onClose: () => void
}

export default function ModalHombro({ open, onClose }: Props) {
  const titleId = useId()
  return (
    <ModalProducto open={open} onClose={onClose} titleId={titleId}>
      <ModalContenido data={hombroData} titleId={titleId} scopeId="hombro" />
    </ModalProducto>
  )
}
