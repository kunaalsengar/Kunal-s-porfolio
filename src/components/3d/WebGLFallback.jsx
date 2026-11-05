import React from 'react'

/**
 * WebGL Fallback Component
 * Gracefully renders a cinematic CSS/SVG architectural hologram if WebGL is unsupported or disabled.
 */
export default function WebGLFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 select-none pointer-events-none">
      <div className="relative w-64 h-80 sm:w-80 sm:h-96 flex items-center justify-center">
        {/* Outer ambient glow */}
        <div className="absolute inset-0 bg-accent-cyan/10 rounded-full blur-3xl animate-pulse-slow" />
        
        {/* Concentric rotating geometric silhouettes */}
        <div className="absolute inset-4 border border-surface-border rounded-2xl rotate-12 animate-[spin_24s_linear_infinite]" />
        <div className="absolute inset-8 border border-accent-cyan/30 rounded-2xl -rotate-6 animate-[spin_18s_linear_infinite_reverse]" />
        <div className="absolute inset-14 border border-surface-border rounded-xl rotate-45 animate-[spin_14s_linear_infinite]" />
        
        {/* Center Obelisk Silhouette */}
        <div className="relative w-24 h-48 bg-gradient-to-b from-chrome/80 via-surface to-obsidian border border-accent-cyan/40 rounded-lg shadow-[0_0_40px_rgba(0,240,255,0.2)] flex flex-col items-center justify-center overflow-hidden">
          {/* Subtle interior light slit */}
          <div className="w-[1.5px] h-36 bg-gradient-to-b from-transparent via-accent-cyan to-transparent animate-pulse" />
          <div className="absolute top-3 font-mono text-[9px] text-accent-cyan tracking-widest uppercase">
            ARCH.FALLBACK
          </div>
        </div>

        {/* Status chip */}
        <div className="absolute -bottom-6 font-mono text-[10px] text-titanium tracking-widest uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
          <span>CANVAS 2D / CSS FALLBACK ACTIVE</span>
        </div>
      </div>
    </div>
  )
}

