'use client'
// Renderiza un TextoRico: los tramos entre llaves salen en cian.
// Ej: 'hasta {70 %} de mejora'

import { partirResaltado, type TextoRico as Texto } from '../data/tipos'

export function TextoRico({ texto }: { texto: Texto }) {
  return (
    <>
      {partirResaltado(texto).map((tramo, i) =>
        tramo.h ? (
          <span key={i} style={{ color: 'var(--ts-accent, #00d9ff)' }}>
            {tramo.t}
          </span>
        ) : (
          <span key={i}>{tramo.t}</span>
        ),
      )}
    </>
  )
}
