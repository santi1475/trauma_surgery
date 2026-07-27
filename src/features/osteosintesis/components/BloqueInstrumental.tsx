'use client'
// Bandejas e instrumental. El catálogo lo maqueta de dos formas distintas y
// las dos se respetan: rejilla 2×2 en clavícula (pág. 3) y fila de 4 en húmero
// (pág. 6) y tibia proximal 3.5 (pág. 11).

import type { Instrumental } from '../data/tipos'
import { BORDE, RADIO, SUPERFICIE } from './estilosTabla'
import { HuecoImagen } from './HuecoImagen'

export function BloqueInstrumental({ datos }: { datos: Instrumental }) {
  const rejilla =
    datos.columnas === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-2 lg:grid-cols-4'

  return (
    <section aria-label={datos.titulo ?? 'Instrumental'}>
      <h3
        className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-white/78"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {datos.titulo ?? 'Instrumental'}
      </h3>

      <ul className={`grid gap-4 ${rejilla}`}>
        {datos.bandejas.map((b) => (
          <li
            key={b.code}
            className="flex flex-col gap-3 border p-4"
            style={{ borderColor: BORDE, background: SUPERFICIE, borderRadius: RADIO }}
          >
            <p
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/60"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {b.titulo}
            </p>
            <HuecoImagen hueco={b.hueco} />
            {/* mt-auto: las bandejas tienen proporciones distintas y sin esto
                los códigos quedarían a cuatro alturas diferentes. */}
            <p
              className="mt-auto text-sm text-white"
              style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}
            >
              {b.code}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
