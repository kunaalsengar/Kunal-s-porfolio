import React, { useEffect } from 'react'

/**
 * IntroOverlay — Phase 6.5 Step 2
 * DOM Layer for the Cinematic Intro Sequence:
 * - Fullscreen cinematic backdrop (#050508) fading seamlessly into the portfolio in Scene 5
 * - Skip Intro button with hover elevation & keyboard [ESC] shortcut
 * - Zero residual DOM blocking after completion
 */
export default function IntroOverlay({ 
  active = true, 
  scene = 1, 
  onSkip 
}) {
  useEffect(() => {
    if (!active) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onSkip?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [active, onSkip])

  if (!active) return null

  // Scene 5 begins the reveal: smoothly fade out the black curtain
  const isRevealing = scene >= 5

  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-700 ease-out ${
        isRevealing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background cinematic vignette backdrop: darkens Scene 1, clears for 3D action in Scenes 2-4 */}
      <div 
        className={`absolute inset-0 bg-[#050508] transition-opacity duration-1000 ease-out pointer-events-none ${
          scene > 1 ? 'opacity-0' : 'opacity-100'
        }`} 
      />

      {/* Subtle peripheral lens vignette preserving center 3D visibility */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(5,5,8,0.65) 100%)'
        }}
      />

      {/* Top subtle HUD indicator */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2.5 pointer-events-none select-none">
        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
        <span className="font-mono text-[10px] sm:text-xs text-white/50 tracking-widest uppercase">
          CINEMATIC BRAND SEQUENCE // 0{scene}
        </span>
      </div>

      {/* Bottom Right Skip Intro Control */}
      {!isRevealing && (
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 pointer-events-auto">
          <button
            onClick={onSkip}
            data-cursor="pointer"
            className="group px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-surface/80 hover:bg-surface-light border border-surface-border hover:border-red-500/50 text-xs font-mono text-titanium hover:text-white transition-all duration-300 shadow-2xl flex items-center gap-2.5 hover:scale-105 active:scale-95 backdrop-blur-md"
            aria-label="Skip cinematic intro"
          >
            <span className="tracking-widest uppercase font-semibold">SKIP INTRO</span>
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-surface-border/50 text-titanium group-hover:text-red-400 group-hover:bg-red-950/40 border border-surface-border/40 transition-colors">
              ESC
            </span>
            <span className="text-red-500 text-xs group-hover:translate-x-0.5 transition-transform">
              ❯
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

