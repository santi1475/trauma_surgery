import type { Variants } from 'framer-motion'

// Contenedor con stagger para listas de elementos
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

// Elemento que sube con fade — uso principal en Hero y secciones
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32, willChange: 'transform, opacity' },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Fade simple — para imágenes y elementos de soporte
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

// Escala desde el centro — para sellos y badges
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, willChange: 'transform, opacity' },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

// Sin movimiento — respeta prefers-reduced-motion
export const reducedMotion: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}
