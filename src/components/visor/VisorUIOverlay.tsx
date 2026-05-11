import React, { memo, useMemo } from 'react'
import { AnatomicPanel } from './AnatomicPanel'
import { LeftPanel } from './LeftPanel'
import { BackButton } from './BackButton'
import { ZONAS_ANATOMICAS, type ZonaAnatomica } from '@/data/zonasAnatomicas'

interface Props {
  showPanel: boolean
  selectedZoneId: string | null
  rotacionActiva: boolean
  animando: boolean
  cameraState: 'free' | 'focusing' | 'focused' | 'returning'
  onZoneClick: (zone: ZonaAnatomica) => void
  onToggleRotation: () => void
  onReset: () => void
}

function VisorUIOverlayBase({
  showPanel,
  selectedZoneId,
  rotacionActiva,
  animando,
  cameraState,
  onZoneClick,
  onToggleRotation,
  onReset,
}: Props) {
  const activeZone = useMemo(
    () => ZONAS_ANATOMICAS.find((z) => z.id === selectedZoneId) ?? null,
    [selectedZoneId],
  )

  // Estado del LeftPanel — null = intro, zona = producto destacado.
  // En "returning" forzamos null para que el intro reaparezca al volver.
  const leftPanelZone = cameraState === 'returning' ? null : activeZone

  const backButtonVisible =
    cameraState === 'focused' || cameraState === 'focusing'

  return (
    <>
      <LeftPanel zone={leftPanelZone} />

      {showPanel && (
        <AnatomicPanel
          selectedZone={selectedZoneId}
          rotacionActiva={rotacionActiva}
          animando={animando}
          onZoneClick={onZoneClick}
          onToggleRotation={onToggleRotation}
        />
      )}

      <BackButton
        visible={backButtonVisible}
        disabled={animando}
        onClick={onReset}
      />
    </>
  )
}

export const VisorUIOverlay = memo(VisorUIOverlayBase)
