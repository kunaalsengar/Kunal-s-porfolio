import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState('INITIALIZING ENVIRONMENT')
  const [isLoaded, setIsLoaded] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      setProgress(100)
      setIsLoaded(true)
      onComplete?.()
      return
    }

    const messages = [
      { at: 15, text: 'LOADING GEOMETRY ENGINE' },
      { at: 45, text: 'COMPILING SHADER PIPELINE' },
      { at: 75, text: 'CALIBRATING LIGHT VECTORS' },
      { at: 92, text: 'SYSTEM OPERATIONAL' },
    ]

    let current = 0
    let rafId
    let lastTime = performance.now()

    // Smooth, dynamic progression (approx 1.2s total, avoiding artificial sluggish delays)
    const updateProgress = (now) => {
      const delta = now - lastTime
      lastTime = now

      // Dynamic acceleration curve
      const step = Math.max(1, Math.floor(delta * 0.12))
      current = Math.min(100, current + step)
      setProgress(current)

      const activeMsg = messages.filter(m => current >= m.at).pop()
      if (activeMsg) {
        setStatusMessage(activeMsg.text)
      }

      if (current < 100) {
        rafId = requestAnimationFrame(updateProgress)
      } else {
        setTimeout(() => {
          setIsLoaded(true)
          setTimeout(() => {
            onComplete?.()
          }, 600)
        }, 150)
      }
    }

    rafId = requestAnimationFrame(updateProgress)

    // Fallback safety timer: never get stuck if RAF is throttled in inactive tab
    const safetyTimer = setTimeout(() => {
      setProgress(100)
      setIsLoaded(true)
      onComplete?.()
    }, 2800)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(safetyTimer)
    }
  }, [shouldReduceMotion, onComplete])

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-14 bg-void text-chrome select-none overflow-hidden"
        >
          {/* Top telemetry header */}
          <div className="flex items-center justify-between text-xs font-mono text-titanium border-b border-surface-border pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
              <span className="text-white font-medium">SYS.CORE // KUNAL SENGAR</span>
            </div>
            <span className="hidden sm:inline font-mono text-[11px] tracking-widest text-accent-cyan">
              KERNEL VER 3.8.4
            </span>
          </div>

          {/* Center Brand Identity & Emblem */}
          <div className="flex flex-col items-center justify-center text-center space-y-6 my-auto">
            {/* Minimalist 3D Rotating Wireframe Hologram */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
              <div className="absolute inset-0 border border-accent-cyan/30 rounded-xl animate-[spin_8s_linear_infinite]" />
              <div className="absolute inset-2 border border-accent-purple/40 rounded-xl animate-[spin_6s_linear_infinite_reverse]" />
              <div className="w-3 h-3 bg-accent-cyan rounded-full shadow-[0_0_15px_#00f0ff]" />
            </div>

            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-fluid-h2 font-display font-bold text-white tracking-tight"
              >
                Kunal Sengar
              </motion.h1>
              <p className="text-xs sm:text-sm font-mono text-accent-cyan uppercase tracking-widest">
                Creative Developer & AI Engineer
              </p>
            </div>
          </div>

          {/* Bottom Diagnostics & Progress Counter */}
          <div className="space-y-4">
            <div className="flex items-end justify-between font-mono">
              <div className="space-y-1">
                <span className="text-[10px] text-titanium uppercase tracking-wider block">Diagnostics</span>
                <span className="text-xs text-chrome flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                  {statusMessage}
                </span>
              </div>
              
              {/* Massive Percentage Display */}
              <div className="text-fluid-h1 font-display font-bold text-white tracking-tighter">
                {String(progress).padStart(2, '0')}<span className="text-accent-cyan text-fluid-h3 font-mono">%</span>
              </div>
            </div>

            {/* Glowing Progress Track */}
            <div className="w-full h-[2px] bg-surface-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-purple via-accent-cyan to-white shadow-[0_0_12px_#00f0ff]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

