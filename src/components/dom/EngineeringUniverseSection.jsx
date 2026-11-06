import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * EngineeringUniverseSection — Phase 6.8 Behind the Build Refined
 * Pinned 7-stage digital architecture scroll journey:
 * - Stage 1: Transition into Digital Engineering Realm
 * - Stage 2: Frontend Engineering (React, JS, HTML5, CSS3, Tailwind, Bootstrap, Responsive)
 * - Stage 3: Backend & API Gateway (Node, Express, REST, JWT, Integrations)
 * - Stage 4: Database Engineering (MongoDB, Mongoose, MySQL, CRUD, Schemas, Indexing)
 * - Stage 5: CMS & E-Commerce (Shopify, Liquid, WordPress, WooCommerce, Elementor)
 * - Stage 6: Mobile Development (Flutter, Dart, Android Studio)
 * - Stage 7: Unified Full-Stack Architecture (Panoramic convergence of all 5 systems)
 */
export default function EngineeringUniverseSection() {
  const sectionRef = useRef(null)
  const pinnedWrapperRef = useRef(null)

  const stage1Ref = useRef(null)
  const stage2Ref = useRef(null)
  const stage3Ref = useRef(null)
  const stage4Ref = useRef(null)
  const stage5Ref = useRef(null)
  const stage6Ref = useRef(null)
  const stage7Ref = useRef(null)

  const [activeStage, setActiveStage] = useState(1)

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

      // STAGE 1: Transition into Engineering (0.00 -> 0.14)
      tl.fromTo(
        stage1Ref.current,
        { opacity: 0, scale: 0.95, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.08, ease: 'power2.out', pointerEvents: 'auto' },
        0
      )
      tl.to(
        stage1Ref.current,
        { opacity: 0, scale: 1.05, filter: 'blur(8px)', duration: 0.05, ease: 'power2.in', pointerEvents: 'none' },
        0.12
      )

      // STAGE 2: Frontend Engineering (0.14 -> 0.30)
      tl.fromTo(
        stage2Ref.current,
        { opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 30 : 0, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', duration: 0.07, ease: 'power2.out', pointerEvents: 'auto' },
        0.15
      )
      tl.to(
        stage2Ref.current,
        { opacity: 0, x: isMobile ? 0 : -40, filter: 'blur(8px)', duration: 0.05, ease: 'power2.in', pointerEvents: 'none' },
        0.28
      )

      // STAGE 3: Backend & APIs (0.30 -> 0.46)
      tl.fromTo(
        stage3Ref.current,
        { opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 30 : 0, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', duration: 0.07, ease: 'power2.out', pointerEvents: 'auto' },
        0.31
      )
      tl.to(
        stage3Ref.current,
        { opacity: 0, x: isMobile ? 0 : 40, filter: 'blur(8px)', duration: 0.05, ease: 'power2.in', pointerEvents: 'none' },
        0.44
      )

      // STAGE 4: Database Engineering (0.46 -> 0.62)
      tl.fromTo(
        stage4Ref.current,
        { opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 30 : 0, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', duration: 0.07, ease: 'power2.out', pointerEvents: 'auto' },
        0.47
      )
      tl.to(
        stage4Ref.current,
        { opacity: 0, x: isMobile ? 0 : -40, filter: 'blur(8px)', duration: 0.05, ease: 'power2.in', pointerEvents: 'none' },
        0.60
      )

      // STAGE 5: CMS & Commerce (0.62 -> 0.76)
      tl.fromTo(
        stage5Ref.current,
        { opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 30 : 0, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', duration: 0.06, ease: 'power2.out', pointerEvents: 'auto' },
        0.63
      )
      tl.to(
        stage5Ref.current,
        { opacity: 0, x: isMobile ? 0 : 40, filter: 'blur(8px)', duration: 0.05, ease: 'power2.in', pointerEvents: 'none' },
        0.74
      )

      // STAGE 6: Mobile Development (0.76 -> 0.88)
      tl.fromTo(
        stage6Ref.current,
        { opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 30 : 0, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', duration: 0.06, ease: 'power2.out', pointerEvents: 'auto' },
        0.77
      )
      tl.to(
        stage6Ref.current,
        { opacity: 0, x: isMobile ? 0 : -40, filter: 'blur(8px)', duration: 0.05, ease: 'power2.in', pointerEvents: 'none' },
        0.86
      )

      // STAGE 7: Unified Panoramic Architecture (0.88 -> 1.00)
      tl.fromTo(
        stage7Ref.current,
        { opacity: 0, scale: 0.94, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.08, ease: 'power2.out', pointerEvents: 'auto' },
        0.89
      )

      // Sync activeStage state
      tl.call(() => setActiveStage(1), null, 0.06)
      tl.call(() => setActiveStage(2), null, 0.22)
      tl.call(() => setActiveStage(3), null, 0.38)
      tl.call(() => setActiveStage(4), null, 0.54)
      tl.call(() => setActiveStage(5), null, 0.68)
      tl.call(() => setActiveStage(6), null, 0.80)
      tl.call(() => setActiveStage(7), null, 0.94)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="engineering-universe"
      className="relative w-full h-[720vh] sm:h-[820vh] bg-transparent text-white select-none pointer-events-none"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinnedWrapperRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-8 py-6 z-20 pointer-events-none"
      >
        <div className="relative w-full max-w-7xl h-full flex items-center justify-center">

          {/* ======================================================== */}
          {/* STAGE 1: TRANSITION INTO ENGINEERING REALM (0 - 14%)     */}
          {/* ======================================================== */}
          <div
            ref={stage1Ref}
            className="absolute max-w-2xl text-center space-y-4 px-4 will-change-transform pointer-events-none"
          >
            <div className="flex items-center justify-center gap-2 font-mono text-[9px] sm:text-[10px] text-cyan-400 tracking-[0.3em] uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
              <span>// BEHIND THE BUILD</span>
              <span className="text-titanium/40">•</span>
              <span>ENGINEERING WORLD</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-light uppercase tracking-[0.2em] sm:tracking-[0.28em] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400/70">
              DIGITAL ARCHITECTURE
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-lg mx-auto leading-relaxed">
              Entering the precision-engineered structural layers that power modern high-performance web systems and full-stack software.
            </p>
          </div>

          {/* ======================================================== */}
          {/* STAGE 2: FRONTEND ENGINEERING (14 - 30%)                 */}
          {/* ======================================================== */}
          <div
            ref={stage2Ref}
            className="absolute right-4 sm:right-8 lg:right-12 bottom-6 sm:bottom-auto sm:top-1/2 sm:transform sm:-translate-y-1/2 w-full max-w-[340px] sm:max-w-md lg:max-w-lg z-30 pointer-events-auto will-change-transform"
          >
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#060812]/95 sm:bg-[#04060d]/98 backdrop-blur-2xl border border-sky-500/35 shadow-[0_30px_70px_rgba(0,0,0,0.98),0_0_50px_rgba(56,189,248,0.08)] space-y-4 text-left before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-sky-400/60 before:to-transparent">
              <div className="flex items-center justify-between border-b border-white/[0.12] pb-3">
                <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-sky-400 font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
                  <span>// 01. FRONTEND ENGINEERING</span>
                </div>
                <span className="px-2.5 py-1 rounded text-[9px] font-mono text-sky-200 font-semibold bg-sky-950/60 border border-sky-500/40">
                  REACTIVE UI
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Component Architecture & UI Systems
                </h3>
                <span className="text-xs font-mono text-sky-300/80 block">
                  Declarative State Engines & Modern Web Specifications
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                Engineering fluid, accessible interfaces with modular component hierarchies, asynchronous performance, and pixel-precise responsive layouts.
              </p>

              <div className="space-y-2 pt-1">
                <span className="font-mono text-[9px] text-titanium uppercase tracking-widest block font-semibold">
                  VERIFIED FRONTEND TECHNOLOGIES:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    'React.js',
                    'HTML5',
                    'CSS3',
                    'JavaScript (ES6+)',
                    'Tailwind CSS',
                    'Bootstrap',
                    'Responsive Web Design'
                  ].map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/[0.08] hover:bg-white/[0.12] border border-sky-500/25 text-[10px] sm:text-xs font-mono text-slate-100 font-medium transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* STAGE 3: BACKEND & API ARCHITECTURE (30 - 46%)           */}
          {/* ======================================================== */}
          <div
            ref={stage3Ref}
            className="absolute left-4 sm:left-8 lg:left-12 bottom-6 sm:bottom-auto sm:top-1/2 sm:transform sm:-translate-y-1/2 w-full max-w-[340px] sm:max-w-md lg:max-w-lg z-30 pointer-events-auto will-change-transform"
          >
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#05110d]/95 sm:bg-[#030d0a]/98 backdrop-blur-2xl border border-emerald-500/35 shadow-[0_30px_70px_rgba(0,0,0,0.98),0_0_50px_rgba(16,185,129,0.08)] space-y-4 text-left before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-emerald-400/60 before:to-transparent">
              <div className="flex items-center justify-between border-b border-white/[0.12] pb-3">
                <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
                  <span>// 02. BACKEND & API GATEWAY</span>
                </div>
                <span className="px-2.5 py-1 rounded text-[9px] font-mono text-emerald-200 font-semibold bg-emerald-950/60 border border-emerald-500/40">
                  EVENT RUNTIME
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Event-Driven Server Systems & APIs
                </h3>
                <span className="text-xs font-mono text-emerald-300/80 block">
                  Stateless Endpoints & Authentication Security
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                Asynchronous request handling, middleware pipelines, tokenized session contracts, and robust third-party API orchestration.
              </p>

              <div className="space-y-2 pt-1">
                <span className="font-mono text-[9px] text-titanium uppercase tracking-widest block font-semibold">
                  VERIFIED BACKEND TECHNOLOGIES:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    'Node.js',
                    'Express.js',
                    'REST API Design',
                    'JWT Authentication',
                    'API Integrations'
                  ].map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/[0.08] hover:bg-white/[0.12] border border-emerald-500/25 text-[10px] sm:text-xs font-mono text-slate-100 font-medium transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* STAGE 4: DATABASE ENGINEERING (46 - 62%)                 */}
          {/* ======================================================== */}
          <div
            ref={stage4Ref}
            className="absolute right-4 sm:right-8 lg:right-12 bottom-6 sm:bottom-auto sm:top-1/2 sm:transform sm:-translate-y-1/2 w-full max-w-[340px] sm:max-w-md lg:max-w-lg z-30 pointer-events-auto will-change-transform"
          >
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#100c05]/95 sm:bg-[#0b0803]/98 backdrop-blur-2xl border border-amber-500/35 shadow-[0_30px_70px_rgba(0,0,0,0.98),0_0_50px_rgba(245,158,11,0.08)] space-y-4 text-left before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-amber-400/60 before:to-transparent">
              <div className="flex items-center justify-between border-b border-white/[0.12] pb-3">
                <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
                  <span>// 03. DATA ARCHITECTURE & STORAGE</span>
                </div>
                <span className="px-2.5 py-1 rounded text-[9px] font-mono text-amber-200 font-semibold bg-amber-950/60 border border-amber-500/40">
                  DATA STORAGE
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Relational & Document Databases
                </h3>
                <span className="text-xs font-mono text-amber-300/80 block">
                  Atomic Persistence & Schema Validation
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                Designing normalized schemas, complex indexing strategies, data integrity constraints, and scalable read/write pipelines.
              </p>

              <div className="space-y-2 pt-1">
                <span className="font-mono text-[9px] text-titanium uppercase tracking-widest block font-semibold">
                  VERIFIED DATABASE TECHNOLOGIES:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    'MongoDB',
                    'Mongoose',
                    'MySQL',
                    'CRUD Operations',
                    'Schema Design',
                    'Indexing'
                  ].map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/[0.08] hover:bg-white/[0.12] border border-amber-500/25 text-[10px] sm:text-xs font-mono text-slate-100 font-medium transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* STAGE 5: CMS & E-COMMERCE PLATFORMS (62 - 76%)           */}
          {/* ======================================================== */}
          <div
            ref={stage5Ref}
            className="absolute left-4 sm:left-8 lg:left-12 bottom-6 sm:bottom-auto sm:top-1/2 sm:transform sm:-translate-y-1/2 w-full max-w-[340px] sm:max-w-md lg:max-w-lg z-30 pointer-events-auto will-change-transform"
          >
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#100718]/95 sm:bg-[#0c0514]/98 backdrop-blur-2xl border border-purple-500/35 shadow-[0_30px_70px_rgba(0,0,0,0.98),0_0_50px_rgba(168,85,247,0.08)] space-y-4 text-left before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-purple-400/60 before:to-transparent">
              <div className="flex items-center justify-between border-b border-white/[0.12] pb-3">
                <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#a855f7]" />
                  <span>// 04. STOREFRONTS & CMS ENGINES</span>
                </div>
                <span className="px-2.5 py-1 rounded text-[9px] font-mono text-purple-200 font-semibold bg-purple-950/60 border border-purple-500/40">
                  COMMERCE
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  E-Commerce & Digital Storefronts
                </h3>
                <span className="text-xs font-mono text-purple-300/80 block">
                  Shopify Liquid Architecture & CMS Solutions
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                Engineering commercial Shopify themes with Liquid, dynamic cart integrations, and customized WordPress/WooCommerce platforms for client storefronts.
              </p>

              <div className="space-y-2 pt-1">
                <span className="font-mono text-[9px] text-titanium uppercase tracking-widest block font-semibold">
                  VERIFIED COMMERCE & CMS:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    'Shopify',
                    'Shopify Theme Customization',
                    'Liquid',
                    'WordPress',
                    'Elementor',
                    'WooCommerce'
                  ].map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/[0.08] hover:bg-white/[0.12] border border-purple-500/25 text-[10px] sm:text-xs font-mono text-slate-100 font-medium transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* STAGE 6: MOBILE DEVELOPMENT (76 - 88%)                   */}
          {/* ======================================================== */}
          <div
            ref={stage6Ref}
            className="absolute right-4 sm:right-8 lg:right-12 bottom-6 sm:bottom-auto sm:top-1/2 sm:transform sm:-translate-y-1/2 w-full max-w-[340px] sm:max-w-md lg:max-w-lg z-30 pointer-events-auto will-change-transform"
          >
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#041117]/95 sm:bg-[#030d12]/98 backdrop-blur-2xl border border-teal-500/35 shadow-[0_30px_70px_rgba(0,0,0,0.98),0_0_50px_rgba(6,182,212,0.08)] space-y-4 text-left before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-teal-400/60 before:to-transparent">
              <div className="flex items-center justify-between border-b border-white/[0.12] pb-3">
                <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-teal-400 font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_#06b6d4]" />
                  <span>// 05. CROSS-PLATFORM MOBILE</span>
                </div>
                <span className="px-2.5 py-1 rounded text-[9px] font-mono text-teal-200 font-semibold bg-teal-950/60 border border-teal-500/40">
                  NATIVE HYBRID
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Cross-Platform Mobile Applications
                </h3>
                <span className="text-xs font-mono text-teal-300/80 block">
                  Flutter Reactive Runtime & Android Toolchains
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                Building responsive mobile client applications using reactive widget trees, strongly-typed business logic, and Android toolchains.
              </p>

              <div className="space-y-2 pt-1">
                <span className="font-mono text-[9px] text-titanium uppercase tracking-widest block font-semibold">
                  VERIFIED MOBILE TECHNOLOGIES:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['Flutter', 'Dart', 'Android Studio'].map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/[0.08] hover:bg-white/[0.12] border border-teal-500/25 text-[10px] sm:text-xs font-mono text-slate-100 font-medium transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* STAGE 7: UNIFIED ARCHITECTURE CONVERGENCE (88 - 100%)    */}
          {/* ======================================================== */}
          <div
            ref={stage7Ref}
            className="absolute max-w-2xl text-center space-y-4 px-4 z-30 pointer-events-auto will-change-transform"
          >
            <div className="flex items-center justify-center gap-2 font-mono text-[9px] sm:text-[10px] text-cyan-400 tracking-[0.3em] uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
              <span>// 06. UNIFIED ARCHITECTURE</span>
              <span className="text-titanium/40">•</span>
              <span>SYNCHRONIZED SYSTEMS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400/80">
              FULL-STACK ECOSYSTEM
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-200 font-sans max-w-xl mx-auto leading-relaxed">
              Every interface, API endpoint, data model, and commerce flow operates as a single synchronized organism. Engineered with precision, built for performance.
            </p>

            {/* Architecture Pillars Matrix Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/40 text-sky-200">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>FRONTEND</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>BACKEND & APIS</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>DATA STORAGE</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-200">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>COMMERCE & CMS</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/60 border border-teal-500/40 text-teal-200">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span>MOBILE</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
