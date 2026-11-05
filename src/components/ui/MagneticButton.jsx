import React, { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function MagneticButton({
  children,
  onClick,
  className = "",
  strength = 0.35,
  variant = "primary", // primary | outline | ghost
  type = "button",
  href,
  ...props
}) {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const shouldReduceMotion = useReducedMotion()

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !buttonRef.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * strength, y: middleY * strength })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 select-none overflow-hidden"

  const variantStyles = {
    primary: "bg-white text-void font-semibold hover:bg-accent-cyan hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]",
    outline: "glass-panel text-chrome hover:glass-panel-glow hover:text-white hover:border-accent-cyan/50",
    ghost: "bg-transparent text-titanium hover:text-accent-cyan"
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      ref={buttonRef}
      href={href}
      type={href ? undefined : type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.1 }}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      data-cursor="magnetic"
      {...props}
    >
      {/* Subtle shine gloss highlight */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full duration-700 pointer-events-none transition-transform" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </Component>
  )
}

