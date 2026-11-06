import React, { useState, useEffect } from 'react'
import SoundToggle from '../ui/SoundToggle'
import { 
  RotateCcw, 
  Send, 
  Menu, 
  X, 
  Sparkles,
  ShoppingBag,
  Cpu,
  Briefcase,
  User,
  Mail
} from 'lucide-react'

/**
 * NetflixHUD — Phase 6.5 Step 3
 * Minimal Floating Streaming Control Interface:
 * - Desktop: Sleek glassmorphic bar with KS mark, streaming categories, SoundToggle, Replay Intro & Transmit CTA
 * - Mobile: Compact HUD with category pill, Replay trigger, SoundToggle and full-screen streaming drawer
 * - Zero collision with 3D Monolith or Hero typography
 */
export default function NetflixHUD({
  activeCategory = 'featured',
  onCategorySelect,
  isPlaying = false,
  onToggleSound,
  onReplayIntro,
  onOpenContact
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position to subtly deepen the glassmorphic background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  const categories = [
    { id: 'featured', label: 'FEATURED', icon: Sparkles },
    { id: 'storefronts', label: 'STOREFRONTS', icon: ShoppingBag },
    { id: 'arsenal', label: 'ARSENAL', icon: Cpu },
    { id: 'journey', label: 'JOURNEY', icon: Briefcase },
    { id: 'about', label: 'ABOUT', icon: User },
    { id: 'contact', label: 'CONTACT', icon: Mail },
  ]

  const handleNavClick = (id) => {
    onCategorySelect?.(id)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'py-3 bg-[#050508]/85 backdrop-blur-xl border-b border-surface-border/60 shadow-[0_12px_32px_rgba(0,0,0,0.85)]' 
            : 'py-5 sm:py-6 bg-gradient-to-b from-[#050508]/90 via-[#050508]/40 to-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Left Cluster: Brand Mark & Streaming Status */}
          <div className="flex items-center gap-3 select-none">
            <button
              onClick={() => handleNavClick('featured')}
              data-cursor="pointer"
              className="group flex items-center gap-2.5 focus:outline-none"
              aria-label="Kunal Sengar portfolio homepage"
            >
              <div className="w-8 h-8 rounded-lg bg-surface border border-surface-border group-hover:border-red-500/60 flex items-center justify-center font-display font-black text-white text-xs tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(229,9,20,0.15)] group-hover:shadow-[0_0_20px_rgba(229,9,20,0.4)]">
                <span className="text-white group-hover:text-red-500 transition-colors">KS</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-mono text-xs text-white group-hover:text-red-400 font-bold tracking-wider transition-colors">
                  KUNAL SENGAR
                </span>
                <span className="hidden sm:inline-block font-mono text-[9px] text-titanium tracking-widest uppercase">
                  STREAMING PLATFORM
                </span>
              </div>
            </button>

            {/* Live Status Chip */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface/60 border border-surface-border text-[9px] font-mono text-titanium ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-chrome">LIVE TRANSMISSION</span>
            </div>
          </div>

          {/* Center Cluster: Desktop Streaming Categories Navigation */}
          <nav 
            className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface/50 border border-surface-border/60 backdrop-blur-md shadow-inner"
            aria-label="Portfolio categories"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => handleNavClick(cat.id)}
                  data-cursor="pointer"
                  className={`relative px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 ${
                    isActive 
                      ? 'text-white font-semibold' 
                      : 'text-titanium hover:text-white hover:bg-surface/50'
                  }`}
                >
                  <span>{cat.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-red-600 rounded-full shadow-[0_0_8px_#e50914] animate-pulse" />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Right Action Cluster: Replay Intro + Sound + Contact CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Replay Intro Button */}
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                data-cursor="pointer"
                title="Replay 3D Cinematic Intro"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-surface/60 hover:bg-surface border border-surface-border hover:border-red-500/50 text-[10px] font-mono text-titanium hover:text-white transition-all duration-200 shadow-md group"
                aria-label="Replay cinematic intro sequence"
              >
                <RotateCcw className="w-3 h-3 text-red-500 group-hover:-rotate-90 transition-transform duration-500" />
                <span className="hidden md:inline uppercase">INTRO</span>
              </button>
            )}

            {/* Ambient Sound Toggle HUD */}
            <SoundToggle isPlaying={isPlaying} onToggle={onToggleSound} />

            {/* Direct Transmission CTA */}
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                data-cursor="pointer"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white font-mono text-[11px] font-semibold tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(229,9,20,0.35)] hover:shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:scale-105 active:scale-95"
                aria-label="Initiate direct transmission"
              >
                <Send className="w-3 h-3" />
                <span>TRANSMIT</span>
              </button>
            )}

            {/* Mobile Navigation Drawer Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-cursor="pointer"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="lg:hidden p-2 rounded-lg bg-surface/80 hover:bg-surface border border-surface-border text-titanium hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-red-500" />
              ) : (
                <Menu className="w-4 h-4 text-chrome" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Mobile Streaming Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-[#050508]/95 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-surface-border pb-4">
              <span className="font-mono text-xs text-red-500 tracking-widest uppercase">
                // EXPLORE STREAMING CATEGORIES
              </span>
              <span className="font-mono text-[10px] text-titanium">
                SYS.ONLINE
              </span>
            </div>

            {/* Category Navigation Links */}
            <div className="space-y-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleNavClick(cat.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 text-left ${
                      isActive 
                        ? 'bg-red-600/15 border-red-500/50 text-white font-bold' 
                        : 'bg-surface/40 border-surface-border/60 text-titanium hover:text-white hover:bg-surface-light'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-red-500' : 'text-titanium'}`} />
                      <span className="font-mono text-sm tracking-wider">{cat.label}</span>
                    </div>
                    {isActive && (
                      <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest">
                        ACTIVE
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Drawer Bottom Actions */}
          <div className="space-y-3 pt-6 border-t border-surface-border">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false)
                onOpenContact?.()
              }}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(229,9,20,0.4)]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>DISPATCH DIRECT TRANSMISSION</span>
            </button>

            <p className="text-center font-mono text-[10px] text-titanium">
              KUNAL SENGAR // FULL STACK DEVELOPER AT VIBESOFT
            </p>
          </div>

        </div>
      )}
    </>
  )
}

