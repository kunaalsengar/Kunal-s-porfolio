import React, { useEffect } from 'react'
import { skillCategories } from '../../data/portfolioData'
import { 
  X, 
  Cpu, 
  Terminal, 
  Layers, 
  Code, 
  Sparkles,
  ShoppingBag,
  Smartphone
} from 'lucide-react'

/**
 * ArsenalModal — Phase 6.5 Step 3
 * Technical Arsenal Quick-View Surface
 * Triggered by ARSENAL category pill in HUD
 */
export default function ArsenalModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none animate-in fade-in duration-300">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#050508]/85 backdrop-blur-xl transition-opacity cursor-pointer" 
      />

      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-surface-border shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-6 sm:p-10 space-y-8 z-10">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-red-500 tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>// TECHNICAL ARSENAL SPECIFICATION</span>
          </div>

          <button
            onClick={onClose}
            data-cursor="pointer"
            className="p-2 rounded-lg bg-surface hover:bg-surface-light border border-surface-border text-titanium hover:text-white transition-colors"
            aria-label="Close arsenal modal"
          >
            <X className="w-4 h-4 text-chrome" />
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Production Toolchains & Core Competencies
          </h2>
          <p className="text-xs sm:text-sm text-titanium max-w-2xl leading-relaxed">
            Technologies, frameworks, and engineering disciplines actively deployed across client storefronts, full-stack systems, and real-time 3D web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {skillCategories.map((cat, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-xl bg-surface/40 border border-surface-border space-y-3 hover:border-red-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white font-bold tracking-wide">
                  {cat.category}
                </span>
                <span className="text-[10px] font-mono text-red-500">0{idx + 1}</span>
              </div>
              <p className="text-xs text-titanium">
                {cat.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="px-2.5 py-1 rounded bg-[#050508]/60 border border-surface-border text-[11px] font-mono text-chrome"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-surface-border flex items-center justify-between text-xs font-mono text-titanium">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
            <span>Horizontal interactive rows will render this in Step 4.</span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-red-400 underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

