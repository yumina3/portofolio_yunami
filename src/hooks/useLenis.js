import { createContext, useContext } from 'react'

// Menyediakan instance Lenis ke seluruh app (DESAIN.md 8.2).
export const LenisContext = createContext(null)

export function useLenis() {
  return useContext(LenisContext)
}
