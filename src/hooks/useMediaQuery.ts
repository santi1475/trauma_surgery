import { useEffect, useState } from 'react'

/**
 * Suscribe a un media query. SSR-safe: arranca en `false` y se hidrata tras
 * mount. Útil para decisiones de render entre experiencias mobile/desktop.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia(query)
    const update = () => setMatches(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [query])

  return matches
}
