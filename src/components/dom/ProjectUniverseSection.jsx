import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Lock, ExternalLink, Mountain, Sparkles } from 'lucide-react'
import { verifiedProjects } from '../../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

/**
 * ProjectUniverseSection — Phase 6.7 Cinematic Project Universe Reveal
 * Pinned multi-stage scroll experience:
 * - Stage 1 (0.00 - 0.18): Dot-to-project particle transformation
 * - Stage 2 (0.18 - 0.38): Dual-world mid-flight appreciation (GamingPCWorld & TruPahadi)
 * - Stage 3 (0.38 - 0.62): Hero focus & verified information for GamingPCWorld
 * - Stage 4 (0.62 - 0.78): Orbital transition swing from GamingPCWorld to TruPahadi
 * - Stage 5 (0.78 - 1.00): Hero focus & verified information for TruPahadi (Himalayan Amber atmosphere)
 * - 100% responsive desktop, tablet, and mobile with zero horizontal overflow
 */
export default function ProjectUniverseSection() {
  const sectionRef = useRef(null)
  const pinnedWrapperRef = useRef(null)

  const stage1Ref = useRef(null)
  const stage2Ref = useRef(null)
  const stage3Ref = useRef(null)
  const stage4Ref = useRef(null)
  const stage5Ref = useRef(null)

  const [activeStage, setActiveStage] = useState(1)

  const gamingPCProject = verifiedProjects[0] // GamingPCWorld
  const trupahadiProject = verifiedProjects[1] // TruPahadi

  useEffect(() => {
    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: pinnedWrapperRef.current,
          anticipatePin: 1
        }
      })

      // STAGE 1: The Dot Universe & Coalescing Swarm (0.00 -> 0.15)
      tl.fromTo(
        stage1Ref.current,
        { opacity: 0, scale: 0.95, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.08, ease: 'power2.out', pointerEvents: 'auto' },
        0
      )
      tl.to(
        stage1Ref.current,
        { opacity: 0, scale: 1.05, filter: 'blur(8px)', duration: 0.05, ease: 'power2.in', pointerEvents: 'none' },
        0.13
      )

      // STAGE 2: Dual World Mid-Flight Perspective (0.15 -> 0.32)
      tl.fromTo(
        stage2Ref.current,
        { opacity: 0, y: 30, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.08, ease: 'power2.out', pointerEvents: 'auto' },
        0.15
      )
      tl.to(
        stage2Ref.current,
        { opacity: 0, y: -25, filter: 'blur(8px)', duration: 0.06, ease: 'power2.in', pointerEvents: 'none' },
        0.30
      )

      // STAGE 3: Hero Approach & Project Information for GamingPCWorld (0.32 -> 0.58)
      tl.fromTo(
        stage3Ref.current,
        { opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 40 : 0, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', duration: 0.08, ease: 'power2.out', pointerEvents: 'auto' },
        0.34
      )
      tl.to(
        stage3Ref.current,
        { opacity: 0, x: isMobile ? 0 : -50, filter: 'blur(8px)', duration: 0.06, ease: 'power2.in', pointerEvents: 'none' },
        0.56
      )

      // STAGE 4: Orbital Transition Vector towards TruPahadi (0.58 -> 0.74)
      tl.fromTo(
        stage4Ref.current,
        { opacity: 0, y: 30, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.07, ease: 'power2.out', pointerEvents: 'auto' },
        0.59
      )
      tl.to(
        stage4Ref.current,
        { opacity: 0, y: -25, filter: 'blur(8px)', duration: 0.06, ease: 'power2.in', pointerEvents: 'none' },
        0.72
      )

      // STAGE 5: Hero Focus & Verified Information for TruPahadi (0.74 -> 1.00)
      tl.fromTo(
        stage5Ref.current,
        { opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 40 : 0, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', duration: 0.10, ease: 'power2.out', pointerEvents: 'auto' },
        0.75
      )

      // Track active stage index for state queries
      tl.call(() => setActiveStage(1), null, 0.05)
      tl.call(() => setActiveStage(2), null, 0.22)
      tl.call(() => setActiveStage(3), null, 0.45)
      tl.call(() => setActiveStage(4), null, 0.65)
      tl.call(() => setActiveStage(5), null, 0.88)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="project-universe"
      className="relative w-full h-[580vh] sm:h-[660vh] bg-transparent text-white select-none pointer-events-none"
    >
      {/* Anchor for backwards compatibility */}
      <div id="dot-universe" className="absolute top-0 pointer-events-none" />

      {/* Pinned Viewport Container */}
      <div
        ref={pinnedWrapperRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-8 py-6 z-20 pointer-events-none"
      >
        <div className="relative w-full max-w-7xl h-full flex items-center justify-center">

          {/* ======================================================== */}
          {/* STAGE 1: THE PROJECT UNIVERSE INITIAL OVERVIEW (0-18%)   */}
          {/* ======================================================== */}
          <div
            ref={stage1Ref}
            className="absolute max-w-2xl text-center space-y-4 px-4 will-change-transform pointer-events-none"
          >
            <div className="flex items-center justify-center gap-2 font-mono text-[9px] sm:text-[10px] text-titanium/80 tracking-[0.3em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
              <span>// 05. SPATIAL ARCHITECTURE</span>
              <span className="text-titanium/40">•</span>
              <span>COSMIC COALESCENCE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-light uppercase tracking-[0.2em] sm:tracking-[0.28em] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400/70">
              THE PROJECT UNIVERSE
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-lg mx-auto leading-relaxed">
              Particles coalesce across deep space, materializing miniature architectural website environments from pure starlight.
            </p>
          </div>

          {/* ======================================================== */}
          {/* STAGE 2: DUAL-WORLD MID-FLIGHT APPRECIATION (18-38%)     */}
          {/* ======================================================== */}
          <div
            ref={stage2Ref}
            className="absolute top-8 sm:top-12 left-1/2 transform -translate-x-1/2 w-full max-w-xl text-center px-4 will-change-transform pointer-events-none"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-[#080910]/75 backdrop-blur-md border border-white/[0.08] shadow-2xl space-y-2">
              <div className="flex items-center justify-center gap-2 font-mono text-[9px] sm:text-[10px] text-titanium/80 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>GAMINGPCWORLD</span>
                <span className="text-titanium/40">•</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>TRUPAHADI</span>
              </div>
              <h4 className="text-lg sm:text-2xl font-display font-light tracking-wide text-white uppercase">
                Two Architectural Worlds In Space
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-300 font-sans leading-relaxed">
                Both live storefront environments floating in perspective. The camera is now transitioning towards GamingPCWorld.
              </p>
            </div>
          </div>

          {/* ======================================================== */}
          {/* STAGE 3: HERO FOCUS & INFORMATION: GAMINGPCWORLD (38-62%)*/}
          {/* ======================================================== */}
          <div
            ref={stage3Ref}
            className="absolute right-4 sm:right-8 lg:right-12 bottom-6 sm:bottom-auto sm:top-1/2 sm:transform sm:-translate-y-1/2 w-full max-w-[340px] sm:max-w-md lg:max-w-lg z-30 pointer-events-auto will-change-transform"
          >
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#07080f]/90 backdrop-blur-xl border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.95)] space-y-4 text-left">

              {/* Category & Status Line */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>CUSTOM STOREFRONT // 01</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono text-titanium bg-white/[0.04] border border-white/[0.08]">
                  SHOPIFY
                </span>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
                  {gamingPCProject.name}
                </h3>
                <span className="text-xs font-mono text-titanium/90 block">
                  High-Performance Custom Gaming PC Platform
                </span>
              </div>

              {/* Verified Description */}
              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                {gamingPCProject.summary}
              </p>

              {/* Verified Contribution */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <span className="font-mono text-[9px] text-titanium uppercase tracking-widest block font-semibold">
                  VERIFIED CONTRIBUTION:
                </span>
                <p className="text-[11px] sm:text-xs text-slate-300 font-sans leading-relaxed">
                  {gamingPCProject.contribution}
                </p>
              </div>

              {/* Verified Technologies */}
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-titanium uppercase tracking-widest block">
                  DEPLOYED TECHNOLOGIES:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {gamingPCProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-[10px] sm:text-xs font-mono text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visit Live Website Link Action */}
              <div className="pt-2">
                <a
                  href={gamingPCProject.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3 sm:py-3.5 px-6 rounded-xl bg-white hover:bg-slate-100 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-2xl hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <span>VISIT LIVE WEBSITE</span>
                  <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* STAGE 4: TRANSITION VECTOR TOWARDS TRUPAHADI (62-78%)    */}
          {/* ======================================================== */}
          <div
            ref={stage4Ref}
            className="absolute top-8 sm:top-12 left-1/2 transform -translate-x-1/2 w-full max-w-xl text-center px-4 will-change-transform pointer-events-none"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-[#080910]/80 backdrop-blur-md border border-amber-500/20 shadow-2xl space-y-2">
              <div className="flex items-center justify-center gap-2 font-mono text-[9px] sm:text-[10px] text-amber-400 tracking-widest uppercase">
                <Mountain className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>// 06. ORBITAL TRANSITION VECTOR</span>
                <span>•</span>
                <span>HIMALAYAN HORIZON</span>
              </div>
              <h4 className="text-lg sm:text-2xl font-display font-light tracking-wide text-white uppercase">
                Approaching TruPahadi Architecture
              </h4>
              <p className="text-[11px] sm:text-xs text-amber-200/80 font-sans leading-relaxed">
                Swinging across deep 3D space toward the authentic Himalayan regional lifestyle storefront.
              </p>
            </div>
          </div>

          {/* ======================================================== */}
          {/* STAGE 5: HERO FOCUS & INFORMATION: TRUPAHADI (78-100%)   */}
          {/* ======================================================== */}
          <div
            ref={stage5Ref}
            className="absolute right-4 sm:right-8 lg:right-12 bottom-6 sm:bottom-auto sm:top-1/2 sm:transform sm:-translate-y-1/2 w-full max-w-[340px] sm:max-w-md lg:max-w-lg z-30 pointer-events-auto will-change-transform"
          >
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#070709]/96 sm:bg-[#050608]/98 backdrop-blur-2xl border border-amber-500/35 shadow-[0_30px_70px_rgba(0,0,0,0.98),0_0_50px_rgba(245,158,11,0.08)] space-y-4 text-left before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-amber-400/60 before:to-transparent">

              {/* Category & Status Line */}
              <div className="flex items-center justify-between border-b border-white/[0.12] pb-3">
                <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
                  <span>REGIONAL STOREFRONT // 02</span>
                </div>
                <span className="px-2.5 py-1 rounded text-[9px] font-mono text-amber-200 font-semibold bg-amber-950/60 border border-amber-500/40">
                  HIMALAYAN BRAND
                </span>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight drop-shadow-sm">
                  {trupahadiProject.name}
                </h3>
                <span className="text-xs font-mono text-amber-300/90 font-medium block">
                  Authentic Himalayan Regional Lifestyle Storefront
                </span>
              </div>

              {/* Verified Description */}
              <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
                {trupahadiProject.summary}
              </p>

              {/* Verified Contribution */}
              <div className="p-3.5 rounded-xl bg-[#0f0e0d]/90 border border-amber-500/30 space-y-1 shadow-inner">
                <span className="font-mono text-[9px] text-amber-400 uppercase tracking-widest block font-bold">
                  VERIFIED CONTRIBUTION:
                </span>
                <p className="text-[11px] sm:text-xs text-slate-200 font-sans leading-relaxed">
                  {trupahadiProject.contribution}
                </p>
              </div>

              {/* Verified Technologies */}
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-titanium uppercase tracking-widest block font-medium">
                  DEPLOYED TECHNOLOGIES:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {trupahadiProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/[0.08] hover:bg-white/[0.12] border border-amber-500/25 text-[10px] sm:text-xs font-mono text-slate-100 font-medium transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visit Live Website Link Action */}
              <div className="pt-2">
                <a
                  href={trupahadiProject.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 sm:py-4 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_12px_30px_rgba(245,158,11,0.35)] hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <span>VISIT LIVE STOREFRONT</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
