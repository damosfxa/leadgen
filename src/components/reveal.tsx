"use client"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
}

export function Reveal({ children, delay = 0, className = "", direction = "up" }: RevealProps) {
  const yOffset = direction === "up" ? 30 : direction === "down" ? -30 : 0
  const xOffset = direction === "left" ? 30 : direction === "right" ? -30 : 0

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        initial={{ opacity: 0, y: yOffset, x: xOffset }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
