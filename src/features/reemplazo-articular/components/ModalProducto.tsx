'use client'
// ModalProducto — shell reutilizable para modales de detalle de producto.
// Responsabilidades: overlay + panel animados, focus trap, cierre con ESC,
// scroll lock del body y restauración del foco previo. El contenido se inyecta
// vía children — el shell no conoce el dominio.

import { useCallback, useEffect, useId, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

interface ModalProductoProps {
  open: boolean
  onClose: () => void
  /** Texto que actúa como título accesible — referenciado por aria-labelledby. */
  titleId?: string
  children: ReactNode
}

// Selector de elementos enfocables — usado por el focus trap.
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function ModalProducto({
  open,
  onClose,
  titleId,
  children,
}: ModalProductoProps) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const fallbackId = useId()
  const labelledBy = titleId ?? fallbackId
  const prefersReduced = useReducedMotion()

  // Cierre con ESC + focus trap sobre Tab/Shift+Tab.
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (!focusables.length) {
        e.preventDefault()
        return
      }
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    },
    [onClose]
  )

  // Lifecycle de apertura: guardar foco previo, bloquear scroll, enfocar botón de cierre.
  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Enfocar el botón de cierre — primer elemento accesible del modal.
    const raf = requestAnimationFrame(() => {
      closeBtnRef.current?.focus()
    })

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
      // Restaurar foco al disparador previo.
      previouslyFocused.current?.focus?.()
    }
  }, [open, handleKeyDown])

  const dur = prefersReduced ? 0 : 0.2
  const panelDur = prefersReduced ? 0 : 0.25

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-overlay"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dur, ease: 'easeOut' }}
          // Cierre por click en overlay (no en el panel).
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            className="relative mx-auto my-8 w-[min(96rem,calc(100%-2rem))] rounded-2xl border shadow-2xl"
            style={{
              background: 'var(--bg-deep, #020b18)',
              borderColor: 'rgba(0,217,255,0.20)',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: panelDur, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Botón de cierre — primer elemento enfocable del modal */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar modal"
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border text-white/80 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background: 'rgba(0,217,255,0.08)',
                borderColor: 'rgba(0,217,255,0.30)',
                ['--tw-ring-color' as any]: 'rgba(0,217,255,0.6)',
                ['--tw-ring-offset-color' as any]: '#020b18',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
