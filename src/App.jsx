import React, { useRef } from 'react'
import CanvasContainer from './components/3d/CanvasContainer'
import CustomCursor from './components/ui/CustomCursor'
import NameSplashScreen from './components/dom/NameSplashScreen'
import ProfileRevealSection from './components/dom/ProfileRevealSection'
import ProjectUniverseSection from './components/dom/ProjectUniverseSection'
import EngineeringUniverseSection from './components/dom/EngineeringUniverseSection'
import ProfessionalExperienceSection from './components/dom/ProfessionalExperienceSection'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useSound } from './hooks/useSound'
import { Volume2, VolumeX } from 'lucide-react'

// Preserve legacy components in repo without breaking build
import Navbar from './components/dom/Navbar'
import Footer from './components/dom/Footer'
import About from './components/dom/About'
import Skills from './components/dom/Skills'
import Projects from './components/dom/Projects'
import Journey from './components/dom/Journey'
import Contact from './components/dom/Contact'

/**
 * App — Phase 6.5 New Cinematic Direction
 * Directed digital film experience for Kunal Sengar:
 * 1. Name Splash Screen (Part 3) — Clean editorial opening visual
 * 2. Portrait & Profile Reveal (Part 4) — Anchored portrait with 4-way emerging information
 * 3. Dot Universe Transition (Part 5) — 8,000-point 3D cosmos with camera zoom-out
 */
export default function App() {
  const mainRef = useRef(null)
  const { scrollTo } = useSmoothScroll()
  const { isPlaying, toggleSound } = useSound()

  return (
    <div
      ref={mainRef}
      className="relative min-h-screen bg-[#030305] text-slate-100 selection:bg-white/20 selection:text-white font-sans antialiased overflow-x-hidden"
    >
      {/* 1. Subtle Custom Cursor */}
      <CustomCursor />

      {/* 2. Persistent Shared WebGL Canvas Layer (Houses DotUniverse) */}
      <CanvasContainer />

      {/* 3. Main Directed Film Experience */}
      <main className="relative z-10 w-full overflow-hidden">

        {/* PART 3: NAME SPLASH SCREEN */}
        <NameSplashScreen onScrollDown={() => scrollTo('#profile-reveal')} />

        {/* PART 4: PORTRAIT & SURROUNDING PROFILE REVEAL */}
        <ProfileRevealSection />

        {/* PHASE 6.6 & 6.7: CINEMATIC PROJECT UNIVERSE REVEAL */}
        <ProjectUniverseSection />

        {/* PHASE 6.8: BEHIND THE BUILD — CINEMATIC DIGITAL ARCHITECTURE */}
        <EngineeringUniverseSection />

        {/* PHASE 6.9: PROFESSIONAL EXPERIENCE — CINEMATIC CAREER JOURNEY */}
        <ProfessionalExperienceSection />

      </main>

      {/* 4. Minimal Sound Ambience Control (Discrete bottom-left audio toggle) */}
      <div className="fixed bottom-6 left-6 z-40 pointer-events-auto">
        <button
          onClick={toggleSound}
          data-cursor="pointer"
          className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-titanium hover:text-white transition-all duration-300 backdrop-blur-md shadow-lg flex items-center justify-center"
          aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
        >
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-titanium" />
          )}
        </button>
      </div>

    </div>
  )
}
