import { type ComponentPropsWithoutRef, type FC } from 'react'

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<'span'> {
  shimmerWidth?: number
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 120,
  style,
  ...props
}) => {
  return (
    <span
      className={className}
      style={{
        '--shiny-width': `${shimmerWidth}px`,
        backgroundImage: `linear-gradient(
          to right,
          transparent,
          rgba(0,168,204,0.85) 50%,
          transparent
        )`,
        backgroundSize: `${shimmerWidth}px 100%`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '-100% 0',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        animation: 'shiny-text 2s cubic-bezier(.6,.6,0,1) infinite',
        ...style,
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </span>
  )
}
