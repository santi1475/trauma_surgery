'use client'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Particle {
    id: number;
    size: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
    moveX: number;
    moveY: number;
}

export function FloatingParticles({ count = 25 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([])
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const tempParticles: Particle[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 11,        // 3–7px, igual que antes
      x: Math.random() * 200,
      y: Math.random() * 200,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      moveX: (Math.random() - 0.5) * 40,
      moveY: (Math.random() - 0.5) * 60,
    }))
    setParticles(tempParticles)
  }, [count])

  if (particles.length === 0) return null

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: 'rgba(0, 127, 160, 0.5)',   // ← más opaco
            boxShadow: '0 0 6px rgba(0, 127, 160, 0.4)', // ← más visible
          }}
          initial={{ opacity: 0 }}
          animate={prefersReduced ? {} : {
            y: [0, p.moveY, 0],
            x: [0, p.moveX, 0],
            opacity: [0.3, 0.7, 0.3],  // ← más opaco
          }}
          transition={{
            duration: p.duration * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
