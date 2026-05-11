import React, { memo } from 'react'
import type { ZonaAnatomica } from '@/data/zonasAnatomicas'

interface Props {
  zone: ZonaAnatomica
  active: boolean
  onClick: () => void
}

function ZoneButtonBase({ zone, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={`Enfocar ${zone.label}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        borderRadius: 6,
        border: active
          ? `1px solid ${zone.color}55`
          : '1px solid rgba(255,255,255,0.05)',
        background: active ? `${zone.color}12` : 'rgba(255,255,255,0.02)',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        transition: 'all 0.18s',
      }}
      onMouseEnter={(e) => {
        if (active) return
        ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,217,255,0.06)'
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,217,255,0.20)'
      }}
      onMouseLeave={(e) => {
        if (active) return
        ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)'
      }}
    >
      <div style={{
        width: 5,
        height: 5,
        borderRadius: '50%',
        flexShrink: 0,
        background: active ? zone.color : 'rgba(255,255,255,0.18)',
        boxShadow: active ? `0 0 7px ${zone.color}` : 'none',
        transition: 'all 0.18s',
      }} />
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: active ? zone.color : 'rgba(255,255,255,0.45)',
        transition: 'color 0.18s',
        flex: 1,
      }}>
        {zone.label}
      </span>
      {active && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: zone.color, opacity: 0.8 }}>
          ▶
        </span>
      )}
    </button>
  )
}

export const ZoneButton = memo(ZoneButtonBase)
