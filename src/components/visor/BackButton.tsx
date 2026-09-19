import React, { memo } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
  visible: boolean
  disabled?: boolean
  onClick: () => void
}

function BackButtonBase({ visible, disabled, onClick }: Props) {
  return (
    <div
      className={cn(
        'absolute top-6 left-6 z-20 transition-all duration-300 ease-out',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none',
      )}
    >
      <Button
        size="lg"
        variant="default"
        onClick={onClick}
        disabled={disabled}
        aria-label="Volver a la vista general del modelo"
        className={cn(
          'h-10 px-4 rounded-md',
          'bg-ts-primary text-white hover:bg-ts-primary/90',
          'border border-ts-accent/40 hover:border-ts-accent',
          'shadow-[0_0_20px_rgb(var(--ts-accent-rgb)/0.25)] hover:shadow-[0_0_28px_rgb(var(--ts-accent-rgb)/0.5)]',
          'focus-visible:ring-2 focus-visible:ring-ts-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ts-bg-deep',
          'font-semibold tracking-[0.12em] uppercase text-xs',
        )}
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Volver
      </Button>
    </div>
  )
}

export const BackButton = memo(BackButtonBase)
