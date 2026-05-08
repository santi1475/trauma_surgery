'use client'

interface SlideImageProps {
  src: string
  label: string
}

const HERO_BG = '#020b18'

export function SlideImage({ src, label }: SlideImageProps) {
  return (
    <div
      className="relative w-full h-full"
      style={{
        background: HERO_BG,
        // Feather all edges so PNG-baked bg of slide SVGs blends seamlessly
        WebkitMaskImage:
          'radial-gradient(ellipse 80% 90% at 60% 50%, black 55%, transparent 100%)',
        maskImage:
          'radial-gradient(ellipse 80% 90% at 60% 50%, black 55%, transparent 100%)',
      }}
    >
      <img
        src={src}
        alt={label}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />
      {/* Left fade — eliminates hard edge with text column */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            `linear-gradient(to right, ${HERO_BG} 0%, ${HERO_BG} 14%, rgba(2,11,24,0.5) 38%, transparent 65%)`,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: `linear-gradient(to top, ${HERO_BG} 0%, transparent 100%)`,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      {/* Top fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '20%',
          background: `linear-gradient(to bottom, ${HERO_BG} 0%, transparent 100%)`,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      {/* Right fade — softer, blends if image runs to edge */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '12%',
          background: `linear-gradient(to left, ${HERO_BG} 0%, transparent 100%)`,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
