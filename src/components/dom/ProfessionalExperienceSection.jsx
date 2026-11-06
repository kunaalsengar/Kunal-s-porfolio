import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, Code2, Layers, Cpu, Database, Smartphone, ShoppingBag } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * ProfessionalExperienceSection — Phase 6.9 Realistic Cinematic Redesign
 * "From Ideas to Functional Digital Experiences"
 *
 * Continuous 5-Chapter Cinematic Storytelling:
 * - Chapter 01: The Beginning (0.00 -> 0.18)
 * - Chapter 02: The Professional Chapter — VibeSoft (0.18 -> 0.36)
 * - Chapter 03: From Ideas to Products — 5 Deliverables (0.36 -> 0.62)
 * - Chapter 04: The Craft Behind the Work — Technical Ecosystem (0.62 -> 0.82)
 * - Chapter 05: The Journey Continues — Beyond the Build (0.82 -> 1.00)
 */
export default function ProfessionalExperienceSection() {
  const sectionRef = useRef(null)
  const pinnedWrapperRef = useRef(null)

  const chapter1Ref = useRef(null)
  const chapter2Ref = useRef(null)
  const chapter3Ref = useRef(null)
  const chapter4Ref = useRef(null)
  const chapter5Ref = useRef(null)

  const [activeChapter, setActiveChapter] = useState(1)

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

      // =====================================================================
      // CHAPTER 01: THE BEGINNING (0.00 -> 0.18)
      // "Every digital experience begins with an idea."
      // =====================================================================
      tl.fromTo(
        chapter1Ref.current,
        { opacity: 0, scale: 0.95, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.05, ease: 'power2.out', pointerEvents: 'auto' },
        0
      )
      tl.to(
        chapter1Ref.current,
        { opacity: 0, scale: 1.05, filter: 'blur(8px)', duration: 0.04, ease: 'power2.in', pointerEvents: 'none' },
        0.14
      )

      // =====================================================================
      // CHAPTER 02: THE PROFESSIONAL CHAPTER — VIBESOFT (0.18 -> 0.37)
      // "Turning ideas into functional digital experiences."
      // =====================================================================
      tl.fromTo(
        chapter2Ref.current,
        { opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 30 : 0, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', duration: 0.05, ease: 'power2.out', pointerEvents: 'auto' },
        0.18
      )
      tl.to(
        chapter2Ref.current,
        { opacity: 0, x: isMobile ? 0 : 40, filter: 'blur(8px)', duration: 0.04, ease: 'power2.in', pointerEvents: 'none' },
        0.33
      )

      // =====================================================================
      // CHAPTER 03: FROM IDEAS TO PRODUCTS (0.37 -> 0.62)
      // Communicating what I actually work on across 5 disciplines
      // =====================================================================
      tl.fromTo(
        chapter3Ref.current,
        { opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 30 : 0, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', duration: 0.05, ease: 'power2.out', pointerEvents: 'auto' },
        0.37
      )
      tl.to(
        chapter3Ref.current,
        { opacity: 0, x: isMobile ? 0 : -40, filter: 'blur(8px)', duration: 0.04, ease: 'power2.in', pointerEvents: 'none' },
        0.58
      )

      // =====================================================================
      // CHAPTER 04: THE CRAFT BEHIND THE WORK (0.62 -> 0.83)
      // Interconnected technical ecosystem
      // =====================================================================
      tl.fromTo(
        chapter4Ref.current,
        { opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 30 : 0, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', duration: 0.05, ease: 'power2.out', pointerEvents: 'auto' },
        0.62
      )
      tl.to(
        chapter4Ref.current,
        { opacity: 0, x: isMobile ? 0 : 40, filter: 'blur(8px)', duration: 0.04, ease: 'power2.in', pointerEvents: 'none' },
        0.79
      )

      // =====================================================================
      // CHAPTER 05: THE JOURNEY CONTINUES — BEYOND THE BUILD (0.83 -> 1.00)
      // "Every experience creates the foundation for what comes next."
      // =====================================================================
      tl.fromTo(
        chapter5Ref.current,
        { opacity: 0, scale: 0.94, filter: 'blur(8px)', pointerEvents: 'none' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.05, ease: 'power2.out', pointerEvents: 'auto' },
        0.83
      )
      // Normalize timeline duration to exactly 1.00
      tl.to({}, { duration: 0.001 }, 1.0)

      // Synchronize active chapter index
      tl.call(() => setActiveChapter(1), null, 0.08)
      tl.call(() => setActiveChapter(2), null, 0.25)
      tl.call(() => setActiveChapter(3), null, 0.48)
      tl.call(() => setActiveChapter(4), null, 0.70)
      tl.call(() => setActiveChapter(5), null, 0.91)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="professional-experience"
      className="relative w-full h-[700vh] sm:h-[800vh] bg-transparent text-white select-none pointer-events-none"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinnedWrapperRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-8 py-6 z-20 pointer-events-none"
      >
        <div className="relative w-full max-w-7xl h-full flex items-center justify-center">

          {/* ===================================================================== */}
          {/* CHAPTER 01: THE BEGINNING (0.00 - 0.18)                               */}
          {/* ===================================================================== */}
          <div
            ref={chapter1Ref}
            className="absolute left-4 sm:left-8 lg:left-12 bottom-6 sm:bottom-auto sm:top-1/2 sm:transform sm:-translate-y-1/2 w-full max-w-[340px] sm:max-w-md lg:max-w-lg z-30 pointer-events-auto will-change-transform"
          >
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#080a12]/95 sm:bg-[#06080e]/98 backdrop-blur-2xl border border-white/[0.14] shadow-[0_30px_70px_rgba(0,0,0,0.98)] space-y-4 text-left before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent">
              <div className="flex items-center justify-between border-b border-white/[0.10] pb-3">
                <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-slate-300 font-semibold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200 shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
                  <span>// CHAPTER 01 • THE BEGINNING</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[9px] font-mono text-slate-300 font-medium bg-white/[0.06] border border-white/10 uppercase tracking-wider">
                  FOUNDATION
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="inline-block px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 text-slate-200 font-mono text-[10px] sm:text-xs tracking-wider uppercase">
                  Full Stack Developer
                </div>
                <h2 className="text-2xl sm:text-4xl font-display font-light uppercase tracking-[0.16em] sm:tracking-[0.22em] text-white">
                  PROFESSIONAL EXPERIENCE
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-200 font-serif italic tracking-wide">
                "Every digital experience begins with an idea."
              </p>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Transitioning from foundational engineering systems into commercial software development, architectural execution, and scalable digital platforms.
              </p>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* CHAPTER 02: THE PROFESSIONAL CHAPTER — VIBESOFT (0.18 - 0.36)         */}
          {/* ===================================================================== */}
          <div
            ref={chapter2Ref}
            className="absolute left-4 sm:left-8 lg:left-12 bottom-6 sm:bottom-auto sm:top-1/2 sm:transform sm:-translate-y-1/2 w-full max-w-[340px] sm:max-w-md lg:max-w-lg z-30 pointer-events-auto will-change-transform"
          >
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#080a12]/95 sm:bg-[#06080e]/98 backdrop-blur-2xl border border-white/[0.14] shadow-[0_30px_70px_rgba(0,0,0,0.98)] space-y-4 text-left before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent">
              <div className="flex items-center justify-between border-b border-white/[0.10] pb-3">
                <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-slate-300 font-semibold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200 shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
                  <span>// CHAPTER 02 • THE PROFESSIONAL CHAPTER</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[9px] font-mono text-slate-300 font-medium bg-white/[0.06] border border-white/10 uppercase tracking-wider">
                  ACTIVE ENGAGEMENT
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
                  VibeSoft
                </h3>
                <span className="text-xs sm:text-sm font-mono text-slate-300 font-medium block">
                  Full Stack Developer
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-serif italic tracking-wide">
                "Turning ideas into functional digital experiences."
              </p>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Contributing to full-stack production software, architecting responsive frontend interfaces, engineering server-side integrations, and optimizing high-performance client storefronts.
              </p>

              <div className="space-y-2 pt-1 border-t border-white/[0.08]">
                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block font-semibold">
                  CORE FOCUS AREAS:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    'Full-Stack Web Development',
                    'Production Architecture',
                    'Custom Storefronts',
                    'API & Systems Integration'
                  ].map((area, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.10] text-[10px] sm:text-xs font-mono text-slate-200 font-medium transition-colors"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* CHAPTER 03: FROM IDEAS TO PRODUCTS (0.36 - 0.62)                      */}
          {/* ===================================================================== */}
          <div
            ref={chapter3Ref}
            className="absolute right-4 sm:right-8 lg:right-12 bottom-6 sm:bottom-auto sm:top-1/2 sm:transform sm:-translate-y-1/2 w-full max-w-[340px] sm:max-w-md lg:max-w-lg z-30 pointer-events-auto will-change-transform"
          >
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#090b14]/95 sm:bg-[#070910]/98 backdrop-blur-2xl border border-white/[0.14] shadow-[0_30px_70px_rgba(0,0,0,0.98)] space-y-3.5 text-left before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent">
              <div className="flex items-center justify-between border-b border-white/[0.10] pb-2.5">
                <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-slate-300 font-semibold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200 shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
                  <span>// CHAPTER 03 • FROM IDEAS TO PRODUCTS</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[9px] font-mono text-slate-300 font-medium bg-white/[0.06] border border-white/10 uppercase tracking-wider">
                  5 DISCIPLINES
                </span>
              </div>

              <div className="space-y-0.5">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  What I Work On
                </h3>
                <p className="text-xs text-slate-300 font-serif italic">
                  "Translating complex requirements into cohesive, production-grade products."
                </p>
              </div>

              {/* 5 Real-World Disciplines */}
              <div className="space-y-1.5 pt-1 text-xs sm:text-sm text-slate-200 font-sans">
                {[
                  {
                    num: '01',
                    title: 'Client Websites & Web Applications',
                    desc: 'Designing and engineering responsive, accessible, high-performance web systems.'
                  },
                  {
                    num: '02',
                    title: 'Frontend & Backend Development',
                    desc: 'Building complete solutions spanning reactive user interfaces and server runtimes.'
                  },
                  {
                    num: '03',
                    title: 'Shopify & WordPress Development',
                    desc: 'Custom Liquid themes, WooCommerce, and conversion-optimized digital commerce.'
                  },
                  {
                    num: '04',
                    title: 'APIs, Databases & Integrations',
                    desc: 'Robust RESTful services, secure JWT authentication, and persistent schemas.'
                  },
                  {
                    num: '05',
                    title: 'Mobile Application Development',
                    desc: 'Cross-platform mobile apps engineered with Flutter and Dart.'
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 sm:p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-white/20 transition-all flex items-start gap-2.5"
                  >
                    <span className="font-mono text-[10px] text-slate-300 font-bold mt-0.5 px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10">
                      {item.num}
                    </span>
                    <div className="space-y-0.5">
                      <span className="font-mono text-xs font-semibold text-white block">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-slate-300 block leading-relaxed">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* CHAPTER 04: THE CRAFT BEHIND THE WORK (0.62 - 0.82)                   */}
          {/* ===================================================================== */}
          <div
            ref={chapter4Ref}
            className="absolute left-4 sm:left-8 lg:left-12 bottom-6 sm:bottom-auto sm:top-1/2 sm:transform sm:-translate-y-1/2 w-full max-w-[340px] sm:max-w-md lg:max-w-lg z-30 pointer-events-auto will-change-transform"
          >
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#080912]/95 sm:bg-[#06070e]/98 backdrop-blur-2xl border border-white/[0.14] shadow-[0_30px_70px_rgba(0,0,0,0.98)] space-y-4 text-left before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent">
              <div className="flex items-center justify-between border-b border-white/[0.10] pb-2.5">
                <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-slate-300 font-semibold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200 shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
                  <span>// CHAPTER 04 • THE CRAFT BEHIND THE WORK</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[9px] font-mono text-slate-300 font-medium bg-white/[0.06] border border-white/10 uppercase tracking-wider">
                  VERIFIED STACK
                </span>
              </div>

              <div className="space-y-0.5">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Technical Ecosystem
                </h3>
                <p className="text-xs text-slate-300 font-serif italic">
                  "Engineering precision driven by battle-tested tools and resilient architecture."
                </p>
              </div>

              {/* Categorized Ecosystem Racks */}
              <div className="space-y-2.5 pt-1">
                {[
                  {
                    category: 'FRONTEND',
                    techs: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Bootstrap']
                  },
                  {
                    category: 'BACKEND',
                    techs: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication']
                  },
                  {
                    category: 'DATABASE',
                    techs: ['MongoDB', 'Mongoose', 'MySQL']
                  },
                  {
                    category: 'CMS & E-COMMERCE',
                    techs: ['WordPress', 'Elementor', 'WooCommerce', 'Shopify', 'Liquid']
                  },
                  {
                    category: 'MOBILE',
                    techs: ['Flutter', 'Dart', 'Android Studio']
                  }
                ].map((group, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 py-1 border-b border-white/[0.06] last:border-0">
                    <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider min-w-[115px]">
                      {group.category}:
                    </span>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {group.techs.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.10] text-[10px] font-mono text-slate-200 tracking-wide"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* CHAPTER 05: THE JOURNEY CONTINUES — BEYOND THE BUILD (0.83 - 1.00)     */}
          {/* ===================================================================== */}
          <div
            ref={chapter5Ref}
            className="absolute bottom-6 sm:bottom-10 md:bottom-12 max-w-xl w-full px-4 z-30 pointer-events-auto will-change-transform"
          >
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#080a12]/95 sm:bg-[#06080e]/98 backdrop-blur-2xl border border-white/[0.16] shadow-[0_30px_70px_rgba(0,0,0,0.98)] space-y-4 text-center before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent">
              <div className="flex items-center justify-center gap-2 font-mono text-[9px] sm:text-[10px] text-slate-300 tracking-[0.28em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <span>// CHAPTER 05 • THE JOURNEY CONTINUES</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white">
                BEYOND THE BUILD
              </h2>

              <p className="text-sm sm:text-base text-slate-200 font-serif italic tracking-wide max-w-lg mx-auto">
                "Every experience creates the foundation for what comes next."
              </p>

              <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-lg mx-auto leading-relaxed">
                Professional execution is continuously anchored by deep academic curiosity and computer science fundamentals. Practical industry engineering fuels rigorous theoretical understanding.
              </p>

              <div className="pt-2 flex flex-col items-center justify-center">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.10] border border-white/20 text-slate-200 font-mono text-[11px] sm:text-xs tracking-wider uppercase transition-colors">
                  <span>NEXT CHAPTER // ACADEMIC FOUNDATIONS & EDUCATION</span>
                  <ArrowDown className="w-3.5 h-3.5 text-slate-300 animate-bounce" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
