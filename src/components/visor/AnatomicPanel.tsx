import React, { memo } from 'react'
import { ZoneButton } from './ZoneButton'
import { ZONAS_ANATOMICAS, type ZonaAnatomica } from '@/data/zonasAnatomicas'

interface Props {
  selectedZone: string | null
  rotacionActiva: boolean
  animando: boolean
  onZoneClick: (zone: ZonaAnatomica) => void
  onToggleRotation: () => void
}

function AnatomicPanelBase({
  selectedZone,
  rotacionActiva,
  animando,
  onZoneClick,
  onToggleRotation,
}: Props) {
  return (
    <div
      className="absolute top-24 right-8 z-10 hidden lg:flex flex-col"
      style={{
        background: 'rgba(2,6,18,0.82)',
        backdropFilter: 'blur(22px) saturate(180%)',
        WebkitBackdropFilter: 'blur(22px) saturate(180%)',
        border: '1px solid rgba(0,217,255,0.10)',
        borderRadius: 10,
        boxShadow: '0 0 48px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.02)',
        padding: '14px 12px',
        minWidth: 186,
        gap: 0,
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        paddingBottom: 10,
        marginBottom: 8,
        borderBottom: '1px solid rgba(0,217,255,0.08)',
      }}>
        <div style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#00d9ff',
          boxShadow: '0 0 7px #00d9ff',
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.16em',
          color: 'rgba(0,217,255,0.65)',
          textTransform: 'uppercase',
        }}>
          Enfoque Anatómico
        </span>
      </div>

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,217,255,0.3), transparent)',
        borderRadius: '10px 10px 0 0',
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {ZONAS_ANATOMICAS.map((zone) => (
          <ZoneButton
            key={zone.id}
            zone={zone}
            active={selectedZone === zone.id}
            onClick={() => onZoneClick(zone)}
          />
        ))}
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '10px 0 8px' }} />

      <button
        onClick={onToggleRotation}
        disabled={animando}
        aria-label={rotacionActiva ? 'Pausar rotación automática' : 'Activar rotación automática'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
          padding: '6px 10px',
          borderRadius: 6,
          border: rotacionActiva
            ? '1px solid rgba(0,217,255,0.22)'
            : '1px solid rgba(255,255,255,0.06)',
          background: rotacionActiva ? 'rgba(0,217,255,0.07)' : 'transparent',
          color: animando
            ? 'rgba(255,255,255,0.18)'
            : rotacionActiva
              ? '#00d9ff'
              : 'rgba(255,255,255,0.30)',
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          cursor: animando ? 'not-allowed' : 'pointer',
          width: '100%',
          transition: 'all 0.2s',
        }}
      >
        <span style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          flexShrink: 0,
          background: !animando && rotacionActiva ? '#00d9ff' : 'rgba(255,255,255,0.15)',
          boxShadow: !animando && rotacionActiva ? '0 0 6px #00d9ff' : 'none',
          display: 'inline-block',
        }} />
        {animando ? 'Transitando...' : rotacionActiva ? 'Rotación activa' : 'Rotación pausada'}
      </button>
    </div>
  )
}

export const AnatomicPanel = memo(AnatomicPanelBase)
