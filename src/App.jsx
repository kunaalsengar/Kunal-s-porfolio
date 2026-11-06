import React, { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personalInfo } from './data/portfolioData'
import IntroOverlay from './components/ui/IntroOverlay'
import CustomCursor from './components/ui/CustomCursor'
import CanvasContainer from './components/3d/CanvasContainer'
import NetflixHUD from './components/dom/NetflixHUD'
import NetflixHeroBillboard from './components/dom/NetflixHeroBillboard'
import DossierModal from './components/dom/DossierModal'
import TransmissionModal from './components/dom/TransmissionModal'
import ProjectCatalogModal from './components/dom/ProjectCatalogModal'
import ArsenalModal from './components/dom/ArsenalModal'
import { useSound } from './hooks/useSound'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import {
  Volume2,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react'

// Preserve legacy components in repo without breaking imports
// (Will be replaced by modular horizontal browsing rows in Step 4)
import Navbar from './components/dom/Navbar'
import Footer from './components/dom/Footer'
import About from './components/dom/About'
import Skills from './components/dom/Skills'
import Projects from './components/dom/Projects'
import Journey from './components/dom/Journey'
import Contact from './components/dom/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  // Phase 6.5 Step 2: Cinematic Intro State Machine & Session Storage
  const [introActive, setIntroActive] = useState(() => {
    if (typeof window === 'undefined') return false
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return false
    return sessionStorage.getItem('kunal_intro_viewed') !== 'true'
  })
  const [introScene, setIntroScene] = useState(1)
  const [introFinished, setIntroFinished] = useState(() => {
    if (typeof window === 'undefined') return true
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return true
    return sessionStorage.getItem('kunal_intro_viewed') === 'true'
  })

  // Phase 6.5 Step 3: Streaming Interface Modals & Active Category
  const [isDossierOpen, setIsDossierOpen] = useState(false)
  const [isTransmissionOpen, setIsTransmissionOpen] = useState(false)
  const [isProjectsOpen, setIsProjectsOpen] = useState(false)
  const [isArsenalOpen, setIsArsenalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('featured')
  const [showDevPanel, setShowDevPanel] = useState(false)

  // Skip Intro Callback
  const handleSkipIntro = useCallback(() => {
    sessionStorage.setItem('kunal_intro_viewed', 'true')
    setIntroActive(false)
    setIntroFinished(true)
    setIntroScene(5)
  }, [])

  // Natural Intro Complete Callback
  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('kunal_intro_viewed', 'true')
    setIntroActive(false)
    setIntroFinished(true)
    setIntroScene(5)
  }, [])

  // Replay Intro Callback (Works without refreshing page)
  const handleReplayIntro = useCallback(() => {
    sessionStorage.removeItem('kunal_intro_viewed')
    setIntroFinished(false)
    setIntroScene(1)
    setIntroActive(true)
    // Close any open modals
    setIsDossierOpen(false)
    setIsTransmissionOpen(false)
    setIsProjectsOpen(false)
    setIsArsenalOpen(false)
  }, [])

  // Expose replay API globally for testing / HUD
  useEffect(() => {
    window.__replayIntro = handleReplayIntro
  }, [handleReplayIntro])

  // Audio Engine Hook (Ambient Drone + Click Feedback)
  const { isPlaying, toggleSound } = useSound()

  // Smooth scroll controller
  const { scrollTo } = useSmoothScroll()

  // Background glow refs
  const mainRef = useRef(null)
  const glow1Ref = useRef(null)
  const glow2Ref = useRef(null)
  const gridRef = useRef(null)

  const isDev = import.meta.env.DEV

  // Handle Category Selection from Streaming HUD
  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId)
    switch (categoryId) {
      case 'featured':
        scrollTo('#billboard')
        break
      case 'storefronts':
        setIsProjectsOpen(true)
        break
      case 'arsenal':
        setIsArsenalOpen(true)
        break
      case 'journey':
      case 'about':
        setIsDossierOpen(true)
        break
      case 'contact':
        setIsTransmissionOpen(true)
        break
      default:
        break
    }
  }

  // Ambient Parallax on Background Orbs
  useEffect(() => {
    if (!introFinished) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      if (glow1Ref.current) {
        gsap.to(glow1Ref.current, {
          yPercent: -30,
          scale: 1.1,
          ease: 'none',
          scrollTrigger: {
            trigger: mainRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          }
        })
      }

      if (glow2Ref.current) {
        gsap.to(glow2Ref.current, {
          yPercent: 30,
          scale: 0.9,
          ease: 'none',
          scrollTrigger: {
            trigger: mainRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2,
          }
        })
      }
    }, mainRef)

    return () => ctx.revert()
  }, [introFinished])

  return (
    <div
      ref={mainRef}
      className="relative min-h-screen bg-[#050508] text-chrome selection:bg-red-600/30 selection:text-white font-sans antialiased overflow-x-hidden"
    >
      {/* 1. Cinematic Netflix-Style Intro DOM Overlay */}
      <IntroOverlay
        active={introActive}
        scene={introScene}
        onSkip={handleSkipIntro}
      />

      {/* 2. Magnetic Smooth Cursor */}
      <CustomCursor />

      {/* 3. Persistent Full-Viewport 3D Canvas Layer */}
      <CanvasContainer
        introActive={introActive}
        introScene={introScene}
        onIntroSceneChange={setIntroScene}
        onIntroComplete={handleIntroComplete}
      />

      {/* 4. Netflix Streaming HUD (Replaces traditional Navbar) */}
      {introFinished && (
        <NetflixHUD
          activeCategory={activeCategory}
          onCategorySelect={handleCategorySelect}
          isPlaying={isPlaying}
          onToggleSound={toggleSound}
          onReplayIntro={handleReplayIntro}
          onOpenContact={() => setIsTransmissionOpen(true)}
        />
      )}

      {/* 5. Background Atmospheric Ambient Glows & Subtle Texture */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        <div
          ref={glow1Ref}
          className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[160px] will-change-transform"
        />
        <div
          ref={glow2Ref}
          className="absolute top-[40%] right-[-10%] w-[550px] h-[550px] bg-accent-cyan/5 rounded-full blur-[160px] will-change-transform"
        />
        <div
          ref={gridRef}
          className="absolute inset-0 opacity-[0.025] will-change-transform"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* 6. Main Streaming Homepage Experience */}
      <main className={`relative z-10 transition-opacity duration-700 ${
        introFinished ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>

        {/* CINEMATIC BILLBOARD HERO (Phase 6.5 Step 3) */}
        <NetflixHeroBillboard
          onExploreProjects={() => setIsProjectsOpen(true)}
          onOpenDossier={() => setIsDossierOpen(true)}
          onOpenContact={() => setIsTransmissionOpen(true)}
        />

      </main>

      {/* 7. Interactive Modal Surfaces (100% functional, zero dead buttons) */}
      <DossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      <TransmissionModal
        isOpen={isTransmissionOpen}
        onClose={() => setIsTransmissionOpen(false)}
      />

      <ProjectCatalogModal
        isOpen={isProjectsOpen}
        onClose={() => setIsProjectsOpen(false)}
      />

      <ArsenalModal
        isOpen={isArsenalOpen}
        onClose={() => setIsArsenalOpen(false)}
      />

      {/* Development-Only Diagnostics HUD */}
      {isDev && (
        <div className="fixed bottom-4 right-4 z-40">
          {!showDevPanel ? (
            <button
              onClick={() => setShowDevPanel(true)}
              className="glass-panel px-3 py-1.5 rounded-full border border-red-500/30 text-[10px] font-mono text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>STREAMING HUD</span>
              <ChevronUp className="w-3 h-3" />
            </button>
          ) : (
            <div className="glass-panel p-4 rounded-xl border border-red-500/30 text-xs font-mono max-w-xs space-y-3 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-surface-border pb-2">
                <span className="text-red-400 font-bold">STREAMING HUD // DEV</span>
                <button
                  onClick={() => setShowDevPanel(false)}
                  className="text-titanium hover:text-white p-1"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-1.5 text-[11px] text-titanium">
                <p>• Mode: <span className="text-red-400">Netflix-Inspired Billboard</span></p>
                <p>• Monolith: <span className="text-white">Framed Stage Right (WebGL)</span></p>
                <p>• Audio Engine: <span className={isPlaying ? "text-accent-cyan" : "text-titanium"}>{isPlaying ? "Active (Playing)" : "Muted"}</span></p>
                <div className="pt-2 border-t border-surface-border">
                  <button
                    onClick={handleReplayIntro}
                    className="w-full py-1.5 px-2 rounded bg-surface hover:bg-surface-light border border-surface-border hover:border-red-500/50 text-[10px] font-mono text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3 text-red-500" />
                    <span>Replay Cinematic Intro</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
