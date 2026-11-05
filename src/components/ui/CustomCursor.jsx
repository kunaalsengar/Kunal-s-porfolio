import React, { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [cursorType, setCursorType] = useState('default') // default | pointer | magnetic | text
  const [cursorText, setCursorText] = useState('')
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Fast direct motion values for the inner dot
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Physics springs for the trailing outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 }
  const trailX = useSpring(mouseX, springConfig)
  const trailY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Detect touch / mobile devices or reduced motion
    const touchCheck = window.matchMedia('(pointer: coarse)').matches || 
                       window.matchMedia('(hover: none)').matches ||
                       'ontouchstart' in window
    const reducedMotionCheck = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (touchCheck || reducedMotionCheck) {
      setIsTouchDevice(true)
      return
    }

    document.body.classList.add('custom-cursor-active')

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Inspect hovered target for interactive states
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor], button, a, input, textarea, [role="button"]')
      if (!target) {
        setCursorType('default')
        setCursorText('')
        return
      }

      const customCursorAttr = target.getAttribute('data-cursor')
      const customTextAttr = target.getAttribute('data-cursor-text')

      if (customTextAttr) {
        setCursorType('text')
        setCursorText(customTextAttr)
      } else if (customCursorAttr === 'magnetic') {
        setCursorType('magnetic')
      } else {
        setCursorType('pointer')
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY, isVisible])

  if (isTouchDevice || !isVisible) return null

  // Ring styling according to state
  const ringVariants = {
    default: {
      width: 32,
      height: 32,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      scale: 1,
    },
    pointer: {
      width: 50,
      height: 50,
      borderColor: 'rgba(0, 240, 255, 0.8)',
      backgroundColor: 'rgba(0, 240, 255, 0.08)',
      scale: 1.15,
    },
    magnetic: {
      width: 58,
      height: 58,
      borderColor: 'rgba(0, 240, 255, 0.9)',
      backgroundColor: 'rgba(0, 240, 255, 0.12)',
      scale: 1.25,
    },
    text: {
      width: 80,
      height: 80,
      borderColor: 'rgba(0, 240, 255, 0.9)',
      backgroundColor: 'rgba(5, 5, 8, 0.85)',
      scale: 1.1,
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-solid flex items-center justify-center pointer-events-none backdrop-blur-[1px] transition-colors duration-200"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={ringVariants}
        animate={cursorType}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      >
        {cursorType === 'text' && cursorText && (
          <span className="text-[10px] font-mono tracking-widest text-accent-cyan font-bold uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent-cyan pointer-events-none shadow-[0_0_8px_#00f0ff]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorType === 'text' ? 0 : cursorType === 'pointer' || cursorType === 'magnetic' ? 0.75 : 1,
          opacity: cursorType === 'text' ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  )
}

