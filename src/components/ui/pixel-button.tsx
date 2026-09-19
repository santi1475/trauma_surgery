'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import { PixelImage } from './pixel-image';

interface PixelButtonProps {
  children: ReactNode;
  onClick?: () => void;
  /** Si se pasa, el componente renderiza como <a> semántico en lugar de <button>. */
  href?: string;
  /** target del <a> (solo si href está presente). */
  target?: '_self' | '_blank' | '_parent' | '_top';
  /** Etiqueta accesible explícita (útil cuando children es decorativo). */
  ariaLabel?: string;
  className?: string;
  /** Imagen de fondo del botón. Obligatoria: no hay imagen genérica de reserva. */
  imageSrc: string;
  containerClassName?: string;
  loop?: boolean | number;
  pixelFadeInDuration?: number;
  colorRevealDelay?: number;
}

export function PixelButton({
  children,
  onClick,
  href,
  target,
  ariaLabel,
  className = '',
  imageSrc,
  containerClassName = '',
  loop = false,
  pixelFadeInDuration = 1000,
  colorRevealDelay = 1300,
}: PixelButtonProps) {
  const prefersReduced = useReducedMotion();
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (!loop || prefersReduced) return;

    const totalDuration = pixelFadeInDuration + colorRevealDelay + 500;
    const intervalTime = typeof loop === 'number' ? loop : totalDuration;

    const interval = setInterval(() => {
      setResetKey((prev) => prev + 1);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [loop, pixelFadeInDuration, colorRevealDelay, prefersReduced]);

  return (
    <div className={`relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${containerClassName}`}>
      {/* Fondo PixelImage */}
      <div className="absolute inset-0 z-0">
        <PixelImage
          key={resetKey}
          src={imageSrc}
          customGrid={{ rows: 4, cols: 6 }}
          grayscaleAnimation
          pixelFadeInDuration={pixelFadeInDuration}
          colorRevealDelay={colorRevealDelay}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Elemento interactivo: <a> si href, <button> en caso contrario */}
      {href ? (
        <a
          href={href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          onClick={onClick}
          aria-label={ariaLabel}
          className={`relative z-10 w-full h-full px-6 py-4 bg-ts-bg-deep/45 text-white font-semibold rounded-lg hover:bg-ts-bg-deep/65 transition-all text-center flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ts-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ts-bg-deep)] ${className}`}
        >
          {children}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          aria-label={ariaLabel}
          className={`relative z-10 w-full h-full px-6 py-4 bg-ts-bg-deep/45 text-white font-semibold rounded-lg hover:bg-ts-bg-deep/65 transition-all text-center flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ts-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ts-bg-deep)] ${className}`}
        >
          {children}
        </button>
      )}
    </div>
  );
}