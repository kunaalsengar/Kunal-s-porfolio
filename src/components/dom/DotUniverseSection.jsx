import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * DotUniverseSection — Phase 6.5 Part 5
 * DOM Layer for the Dot Universe Transition:
 * - Pinned, spacious scroll environment driving the 3D camera zoom-out
 * - Creates a feeling of depth, cosmic scale, and immersion
 * - Minimal editorial typography with generous whitespace
 * - Clean transition holding ground before future project showcases
 */
export default function DotUniverseSection() {
  const sectionRef = useRef(null)
  const pinnedContentRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const statusRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned editorial reveal synchronized with 3D camera zoom out
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: pinnedContentRef.current,
          anticipatePin: 1
        }
      })

      // Title & editorial emergence
      tl.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.94, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.35, ease: 'power2.out' },
        0.1
      )

      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 30, filter: 'blur(6px)' },
        { opacity: 0.85, y: 0, filter: 'blur(0px)', duration: 0.35, ease: 'power2.out' },
        0.25
      )

      tl.fromTo(
        statusRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        0.45
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="dot-universe"
      className="relative w-full h-[180vh] sm:h-[240vh] select-none text-white overflow-hidden"
    >
      {/* Pinned Cinematic Typography Centerpiece */}
      <div
        ref={pinnedContentRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center px-6 sm:px-12 z-20"
      >
        <div className="max-w-3xl text-center space-y-6">

          {/* Spatial Architecture Tag */}
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] sm:text-xs text-titanium/80 tracking-[0.3em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
            <span>// 05. SPATIAL ARCHITECTURE</span>
            <span className="text-titanium/40">•</span>
            <span>DEEP COSMOS</span>
          </div>

          {/* Grand Editorial Title */}
          <h2
            ref={titleRef}
            className="text-4xl sm:text-6xl md:text-7xl font-display font-light uppercase tracking-[0.2em] sm:tracking-[0.28em] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400/70"
          >
            THE DOT UNIVERSE
          </h2>

          {/* Minimalist Editorial Narrative */}
          <p
            ref={textRef}
            className="text-xs sm:text-sm md:text-base text-slate-300 font-sans max-w-xl mx-auto leading-relaxed"
          >
            Entering a boundless multidimensional space where high-performance storefronts, creative algorithms, and interactive 3D architectures converge.
          </p>

          {/* Discrete Status Indicator */}
          <div
            ref={statusRef}
            className="pt-4 flex items-center justify-center"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-ping inline-block" />
              <span className="font-mono text-[9px] sm:text-[10px] text-titanium tracking-widest uppercase">
                PRODUCTION STOREFRONTS & WORKS // ARRIVING IN NEXT ORBIT
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
