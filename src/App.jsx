import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personalInfo, stats } from './data/portfolioData'
import Preloader from './components/ui/Preloader'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/dom/Navbar'
import MagneticButton from './components/ui/MagneticButton'
import CanvasContainer from './components/3d/CanvasContainer'
import About from './components/dom/About'
import Skills from './components/dom/Skills'
import Projects from './components/dom/Projects'
import Journey from './components/dom/Journey'
import Contact from './components/dom/Contact'
import Footer from './components/dom/Footer'
import { useSound } from './hooks/useSound'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { 
  ArrowUpRight, 
  Volume2, 
  Mail,
  ChevronDown, 
  ChevronUp, 
  Box 
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(false)
  const [showDevPanel, setShowDevPanel] = useState(false)

  // Audio Engine Hook (Procedural Web Audio Ambient Drone)
  const { isPlaying, toggleSound, playClickFeedback } = useSound()

  // Lenis + GSAP ScrollTrigger Integration Hook
  const { scrollTo, scrollProgress, isScrolled } = useSmoothScroll()

  // Container refs for GSAP context and animations
  const mainRef = useRef(null)
  const heroBadgeRef = useRef(null)
  const heroTitleRef = useRef(null)
  const heroSubtitleRef = useRef(null)
  const heroTaglineRef = useRef(null)
  const heroCtaRef = useRef(null)
  const heroStatsRef = useRef(null)
  const monolithContainerRef = useRef(null)
  const glow1Ref = useRef(null)
  const glow2Ref = useRef(null)
  const gridRef = useRef(null)

  const isDev = import.meta.env.DEV

  // Master GSAP Animation Pipeline
  useEffect(() => {
    if (!preloaderFinished) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.to(
          [
            heroBadgeRef.current,
            heroTitleRef.current,
            heroSubtitleRef.current,
            heroTaglineRef.current,
            heroCtaRef.current,
            heroStatsRef.current,
            monolithContainerRef.current
          ],
          { opacity: 1, duration: 0.3, stagger: 0.05 }
        )
        return
      }

      // 1. Hero Entrance Master Timeline
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      heroTl
        .fromTo(
          heroBadgeRef.current,
          { opacity: 0, y: -20, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, delay: 0.1 }
        )
        .fromTo(
          heroTitleRef.current,
          { opacity: 0, y: 40, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1 },
          '-=0.5'
        )
        .fromTo(
          monolithContainerRef.current,
          { opacity: 0, scale: 0.9, filter: 'blur(8px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' },
          '-=0.9'
        )
        .fromTo(
          heroSubtitleRef.current,
          { opacity: 0, y: 25, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
          '-=0.8'
        )
        .fromTo(
          heroTaglineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          heroCtaRef.current?.children || [],
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1 },
          '-=0.5'
        )
        .fromTo(
          heroStatsRef.current?.children || [],
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
          '-=0.4'
        )

      // 2. Parallax on Ambient Glow Orbs & Grid
      if (glow1Ref.current) {
        gsap.to(glow1Ref.current, {
          yPercent: -50,
          scale: 1.2,
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
          yPercent: 40,
          scale: 0.85,
          ease: 'none',
          scrollTrigger: {
            trigger: mainRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2,
          }
        })
      }

      if (gridRef.current) {
        gsap.to(gridRef.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: mainRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          }
        })
      }

      // Parallax on Hero Framing Container on initial scroll
      if (monolithContainerRef.current) {
        gsap.to(monolithContainerRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        })
      }

      // 3. Staggered Section Entrances
      const animatedSections = ['#about', '#skills', '#projects', '#journey', '#contact']
      animatedSections.forEach((selector) => {
        const el = document.querySelector(selector)
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 82%',
                toggleActions: 'play none none none',
              }
            }
          )
        }
      })
    }, mainRef)

    return () => ctx.revert()
  }, [preloaderFinished])

  return (
    <div 
      ref={mainRef}
      className="relative min-h-screen bg-void text-chrome selection:bg-accent-cyan/20 selection:text-accent-cyan font-sans"
    >
      {/* 1. Cinematic Preloader */}
      <Preloader onComplete={() => setPreloaderFinished(true)} />

      {/* 2. Magnetic Smooth Cursor */}
      <CustomCursor />

      {/* 3. Persistent Full-Viewport 3D Canvas Layer (Phase 6.1 Architecture) */}
      <CanvasContainer />

      {/* 4. Dynamic HUD Navigation Bar */}
      <Navbar 
        isScrolled={isScrolled}
        scrollProgress={scrollProgress}
        isPlaying={isPlaying}
        onToggleSound={toggleSound}
        onNavigate={scrollTo}
      />

      {/* 5. Background Decorative Ambient Fields & Parallax Grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        <div 
          ref={glow1Ref}
          className="absolute top-[-10%] left-[20%] w-[650px] h-[650px] bg-accent-cyan/5 rounded-full blur-[160px] will-change-transform" 
        />
        <div 
          ref={glow2Ref}
          className="absolute top-[45%] right-[-10%] w-[550px] h-[550px] bg-accent-purple/5 rounded-full blur-[160px] will-change-transform" 
        />
        <div 
          ref={gridRef}
          className="absolute inset-0 opacity-[0.035] will-change-transform"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* 6. Main Content Area (relative z-10 for full interactivity) */}
      <main className="relative z-10 pt-24 sm:pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto space-y-28 sm:space-y-40">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[85vh] flex flex-col justify-center relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-7 space-y-8 z-10">
              
              {/* Availability Status Badge */}
              <div 
                ref={heroBadgeRef}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-light border border-surface-border font-mono text-xs text-titanium w-fit will-change-transform"
              >
                <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                <span className="text-chrome font-medium">{personalInfo.availability}</span>
                <span className="text-titanium hidden sm:inline">// {personalInfo.location}</span>
              </div>

              {/* Fluid Editorial Headline */}
              <div className="space-y-4">
                <h1 
                  ref={heroTitleRef}
                  className="text-fluid-hero font-display font-extrabold text-white tracking-tight uppercase will-change-transform"
                >
                  {personalInfo.name}
                </h1>
                <p 
                  ref={heroSubtitleRef}
                  className="text-fluid-h2 font-display font-semibold text-accent-cyan will-change-transform"
                >
                  {personalInfo.role}
                </p>
                <p 
                  ref={heroTaglineRef}
                  className="text-fluid-body text-titanium max-w-xl pt-2 leading-relaxed will-change-transform"
                >
                  {personalInfo.tagline}
                </p>
              </div>

              {/* Interactive Magnetic Call To Actions */}
              <div 
                ref={heroCtaRef}
                className="flex flex-wrap items-center gap-4 pt-4 will-change-transform"
              >
                <MagneticButton 
                  variant="primary"
                  onClick={() => {
                    playClickFeedback()
                    scrollTo('#projects')
                  }}
                >
                  <span>Selected Projects</span>
                  <ArrowUpRight className="w-4 h-4" />
                </MagneticButton>

                <MagneticButton 
                  variant="outline"
                  onClick={() => {
                    playClickFeedback()
                    scrollTo('#contact')
                  }}
                >
                  <span>Initiate Contact</span>
                  <Mail className="w-4 h-4" />
                </MagneticButton>

                <MagneticButton 
                  variant="ghost"
                  onClick={() => {
                    playClickFeedback()
                    toggleSound()
                  }}
                >
                  <span>{isPlaying ? 'Mute Audio' : 'Ambient Audio'}</span>
                  <Volume2 className="w-4 h-4" />
                </MagneticButton>
              </div>
            </div>

            {/* Right Column: Hero Framing Stage (Monolith renders in persistent canvas behind this stage) */}
            <div 
              ref={monolithContainerRef}
              className="lg:col-span-5 h-[380px] sm:h-[460px] lg:h-[540px] relative flex items-center justify-center will-change-transform select-none pointer-events-none"
            >
              {/* Radial Specular Glow Behind Monolith */}
              <div className="absolute inset-8 bg-accent-cyan/10 rounded-full blur-[90px] pointer-events-none" />

              {/* Subtle 3D Specification Chip */}
              <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-surface/80 border border-surface-border text-[9px] font-mono text-titanium backdrop-blur-md pointer-events-none flex items-center gap-1.5 shadow-lg">
                <Box className="w-3 h-3 text-accent-cyan" />
                <span>MONOLITH // SPEC: TITANIUM</span>
              </div>
            </div>

          </div>

          {/* Quick Metrics Strip */}
          <div 
            ref={heroStatsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 mt-12 border-t border-surface-border will-change-transform"
          >
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <span className="text-fluid-h2 font-display font-bold text-white block">
                  {stat.value}
                </span>
                <span className="font-mono text-xs text-titanium uppercase tracking-wider block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 1: ABOUT */}
        <About />

        {/* SECTION 2: SKILLS */}
        <Skills />

        {/* SECTION 3: SELECTED PROJECTS */}
        <Projects />

        {/* SECTION 4: JOURNEY / EXPERIENCE */}
        <Journey />

        {/* SECTION 5: CONTACT */}
        <Contact />

      </main>

      {/* 7. Terminal Footer */}
      <Footer onScrollTop={scrollTo} />

      {/* Development-Only Diagnostics Drawer (Never in Production) */}
      {isDev && (
        <div className="fixed bottom-4 right-4 z-40">
          {!showDevPanel ? (
            <button
              onClick={() => setShowDevPanel(true)}
              className="glass-panel px-3 py-1.5 rounded-full border border-accent-cyan/30 text-[10px] font-mono text-accent-cyan hover:bg-accent-cyan/10 transition-colors flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              <span>DEV HUD</span>
              <ChevronUp className="w-3 h-3" />
            </button>
          ) : (
            <div className="glass-panel p-4 rounded-xl border border-accent-cyan/30 text-xs font-mono max-w-xs space-y-3 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-surface-border pb-2">
                <span className="text-accent-cyan font-bold">DEV ENVIRONMENT HUD</span>
                <button 
                  onClick={() => setShowDevPanel(false)}
                  className="text-titanium hover:text-white p-1"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-1.5 text-[11px] text-titanium">
                <p>• 3D Stage: <span className="text-accent-cyan">Phase 6.1 Persistent Canvas</span></p>
                <p>• Architecture: <span className="text-white">Decoupled Macro / Micro Groups</span></p>
                <p>• Controller: <span className="text-accent-cyan">Authoritative CameraRig</span></p>
                <p>• Scroll Progress: <span className="text-white">{Math.round(scrollProgress * 100)}%</span></p>
                <p>• Audio: <span className={isPlaying ? "text-accent-cyan" : "text-titanium"}>{isPlaying ? "Active (Playing)" : "Muted"}</span></p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
