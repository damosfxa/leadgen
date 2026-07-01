"use client"
import { ReactLenis } from "@studio-freight/react-lenis"
import { cancelFrame, frame } from "framer-motion"
import { useEffect, useRef } from "react"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function update(data: any) {
      const time = data?.timestamp ?? data
      lenisRef.current?.lenis?.raf(time)
    }

    // Unify Framer Motion and Lenis rAF
    frame.update(update, true)
    return () => cancelFrame(update)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LenisComponent = ReactLenis as any;
  
  return (
    <LenisComponent
      ref={lenisRef}
      root
      options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}
      autoRaf={false}
    >
      {children}
    </LenisComponent>
  )
}
