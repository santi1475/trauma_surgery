'use client'
// Bloque "OPERAMOS EN" + banderas. Compartido entre el Hero de la landing
// y el hero de los modales de producto.

const PAISES = [
  { src: '/flags/peru.svg',     alt: 'Perú' },
  { src: '/flags/bolivia.svg',  alt: 'Bolivia' },
  { src: '/flags/colombia.svg', alt: 'Colombia' },
  { src: '/flags/paraguay.svg', alt: 'Paraguay' },
]

export function PaisesOperamos({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <span className="text-[11px] tracking-[0.2em] uppercase text-white/80">
        Operamos en
      </span>
      <div className="flex gap-2.5">
        {PAISES.map((pais) => (
          <div
            key={pais.src}
            className="w-5 h-5 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-white/5"
          >
            <img loading="lazy" decoding="async"
              src={pais.src}
              alt={pais.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
