import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personalInfo } from '../../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

/**
 * ProfileRevealSection — Phase 6.5 Part 4
 * Scroll-driven cinematic portrait & profile reveal:
 * - Central visual anchor: Portrait image (IMG_3233.jpg)
 * - Information emerges around the portrait from 4 cardinal directions:
 *   - TOP: About Me & Identity
 *   - LEFT: Professional Experience (VibeSoft)
 *   - RIGHT: Academic Foundation (B.Tech CSE)
 *   - BOTTOM: Full Stack Developer & Technical Skills
 * - Adaptive layout:
 *   - Desktop & Tablet: Pinned 4-way spatial surround around the central portrait.
 *   - Mobile: Anchored portrait with sequential scroll-choreographed cards, 0 overflow.
 * - Reversible, scrubbed GSAP ScrollTrigger timeline.
 */
export default function ProfileRevealSection() {
  const sectionRef = useRef(null)
  const pinnedWrapperRef = useRef(null)
  const portraitRef = useRef(null)
  const topModuleRef = useRef(null)
  const leftModuleRef = useRef(null)
  const rightModuleRef = useRef(null)
  const bottomModuleRef = useRef(null)
  const mobileCardRef = useRef(null)

  const [mobileStep, setMobileStep] = useState(0)

  // Flattened verified skills for technical competencies
  const verifiedSkills = [
    'React',
    'Three.js / WebGL',
    'JavaScript (ESNext)',
    'GSAP',
    'Node.js',
    'RESTful APIs',
    'Shopify Liquid',
    'Flutter',
    'Android Studio',
    'Tailwind CSS',
    'Vite',
    'Git'
  ]

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

      if (!isMobile) {
        // Desktop / Tablet 4-Way Spatial Surround
        // 1. Portrait entrance (0.0 - 0.25)
        tl.fromTo(
          portraitRef.current,
          { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.25, ease: 'power2.out' },
          0
        )

        // 2. TOP Module: About Me emerges from top (0.20 - 0.45)
        tl.fromTo(
          topModuleRef.current,
          { opacity: 0, y: -70, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.25, ease: 'power2.out' },
          0.20
        )

        // 3. LEFT Module: Experience emerges from left (0.40 - 0.65)
        tl.fromTo(
          leftModuleRef.current,
          { opacity: 0, x: -90, filter: 'blur(6px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.25, ease: 'power2.out' },
          0.40
        )

        // 4. RIGHT Module: Education emerges from right (0.60 - 0.85)
        tl.fromTo(
          rightModuleRef.current,
          { opacity: 0, x: 90, filter: 'blur(6px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.25, ease: 'power2.out' },
          0.60
        )

        // 5. BOTTOM Module: Skills emerge from bottom (0.75 - 1.0)
        tl.fromTo(
          bottomModuleRef.current,
          { opacity: 0, y: 70, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.25, ease: 'power2.out' },
          0.75
        )
      } else {
        // Mobile Sequential Reveal
        tl.fromTo(
          portraitRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.2 },
          0
        )

        tl.fromTo(
          mobileCardRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.2 },
          0.15
        )

        // Step index synced to scroll progress for mobile card rotation
        tl.call(() => setMobileStep(0), null, 0.1)
        tl.call(() => setMobileStep(1), null, 0.35)
        tl.call(() => setMobileStep(2), null, 0.6)
        tl.call(() => setMobileStep(3), null, 0.85)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="profile-reveal"
      className="relative w-full h-[280vh] sm:h-[320vh] bg-[#030305] text-white select-none"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinnedWrapperRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-8 py-4 sm:py-6 z-10"
      >
        <div className="relative w-full max-w-7xl h-full flex items-center justify-center">

          {/* ======================================================== */}
          {/* CENTRAL ANCHOR: KUNAL SENGAR PORTRAIT                     */}
          {/* ======================================================== */}
          <div
            ref={portraitRef}
            className="relative z-20 flex flex-col items-center justify-center will-change-transform max-sm:-translate-y-20"
          >
            <div className="relative w-[180px] sm:w-[260px] md:w-[300px] lg:w-[340px] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.95)] bg-[#0a0b12]">
              <img
                src={personalInfo.images.aboutPortrait}
                alt="Kunal Sengar Portrait"
                className="w-full h-full object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-700 pointer-events-none"
              />
              {/* Subtle Vignette & Frame Glare */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 border border-white/10 rounded-2xl sm:rounded-3xl pointer-events-none" />
            </div>

            {/* Subtle Centered Identity Label */}
            <div className="mt-2.5 sm:mt-3 text-center">
              <span className="font-mono text-[9px] sm:text-xs text-titanium tracking-[0.25em] uppercase">
                KUNAL SENGAR
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* DESKTOP/TABLET: TOP MODULE (Emerges from Top)            */}
          {/* ======================================================== */}
          <div
            ref={topModuleRef}
            className="hidden md:block absolute top-4 sm:top-8 md:top-10 left-1/2 transform -translate-x-1/2 w-full max-w-xl text-center px-4 z-30 pointer-events-auto will-change-transform"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-[#080910]/85 backdrop-blur-md border border-white/[0.08] shadow-2xl space-y-2">
              <div className="flex items-center justify-center gap-2 font-mono text-[9px] sm:text-[10px] text-titanium/80 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span>// 01. ABOUT ME</span>
                <span>•</span>
                <span>INDIA / REMOTE</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                Building high-performance digital storefronts, full-stack systems, and immersive web experiences at the intersection of creative technology and software architecture.
              </p>
            </div>
          </div>

          {/* ======================================================== */}
          {/* DESKTOP/TABLET: LEFT MODULE (Emerges from Left)          */}
          {/* ======================================================== */}
          <div
            ref={leftModuleRef}
            className="hidden md:block absolute left-2 sm:left-4 md:left-8 lg:left-12 top-1/2 transform -translate-y-1/2 w-[260px] sm:w-[290px] md:w-[320px] z-30 pointer-events-auto will-change-transform"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-[#080910]/85 backdrop-blur-md border border-white/[0.08] shadow-2xl text-left space-y-2.5">
              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-titanium/80 tracking-widest uppercase border-b border-white/[0.06] pb-2">
                <span>// 02. EXPERIENCE</span>
                <span className="text-emerald-400 font-semibold">ACTIVE</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-display font-bold text-white">
                  Full Stack Developer
                </h3>
                <span className="text-xs font-mono text-titanium block">
                  VibeSoft
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 font-sans leading-relaxed">
                Engineering client websites, Shopify theme customizations, RESTful APIs, databases, and cross-platform mobile apps with Flutter & Android Studio.
              </p>
            </div>
          </div>

          {/* ======================================================== */}
          {/* DESKTOP/TABLET: RIGHT MODULE (Emerges from Right)        */}
          {/* ======================================================== */}
          <div
            ref={rightModuleRef}
            className="hidden md:block absolute right-2 sm:right-4 md:right-8 lg:right-12 top-1/2 transform -translate-y-1/2 w-[260px] sm:w-[290px] md:w-[320px] z-30 pointer-events-auto will-change-transform"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-[#080910]/85 backdrop-blur-md border border-white/[0.08] shadow-2xl text-left space-y-2.5">
              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-titanium/80 tracking-widest uppercase border-b border-white/[0.06] pb-2">
                <span>// 03. EDUCATION</span>
                <span className="text-sky-400 font-semibold">FINAL YEAR</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-display font-bold text-white">
                  B.Tech in Computer Science
                </h3>
                <span className="text-xs font-mono text-titanium block">
                  Final-Year Undergraduate Student
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 font-sans leading-relaxed">
                Data Structures, Algorithms, Software Engineering, scalable web systems, and graphics programming applied to modern production architectures.
              </p>
            </div>
          </div>

          {/* ======================================================== */}
          {/* DESKTOP/TABLET: BOTTOM MODULE (Emerges from Bottom)      */}
          {/* ======================================================== */}
          <div
            ref={bottomModuleRef}
            className="hidden md:block absolute bottom-4 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-2xl text-center px-4 z-30 pointer-events-auto will-change-transform"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-[#080910]/85 backdrop-blur-md border border-white/[0.08] shadow-2xl space-y-2.5">
              <div className="flex items-center justify-center gap-2 font-mono text-[9px] sm:text-[10px] text-titanium/80 tracking-widest uppercase">
                <span>// 04. TECHNICAL SKILLS</span>
                <span>•</span>
                <span>FULL STACK DEVELOPER</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                {verifiedSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] sm:text-[11px] font-mono text-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* MOBILE EXCLUSIVE: ADAPTIVE SEQUENTIAL CARD               */}
          {/* ======================================================== */}
          <div
            ref={mobileCardRef}
            className="block md:hidden absolute bottom-4 left-4 right-4 z-30 pointer-events-auto"
          >
            <div className="p-4 rounded-xl bg-[#080910]/95 backdrop-blur-md border border-white/[0.12] shadow-2xl transition-all duration-300 text-left">
              {mobileStep === 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 font-mono text-[9px] text-titanium uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    <span>// 01. ABOUT ME</span>
                  </div>
                  <p className="text-xs text-slate-200 font-sans leading-relaxed">
                    Building high-performance storefronts, full-stack systems, and immersive web experiences.
                  </p>
                  <span className="text-[10px] font-mono text-titanium block">
                    INDIA / REMOTE • OPEN TO HIGH-IMPACT ROLES
                  </span>
                </div>
              )}

              {mobileStep === 1 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[9px] text-titanium uppercase">
                    <span>// 02. EXPERIENCE</span>
                    <span className="text-emerald-400 font-semibold">ACTIVE</span>
                  </div>
                  <h4 className="text-sm font-display font-bold text-white">Full Stack Developer — VibeSoft</h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Client web systems, Shopify themes, RESTful APIs, and cross-platform apps with Flutter.
                  </p>
                </div>
              )}

              {mobileStep === 2 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[9px] text-titanium uppercase">
                    <span>// 03. EDUCATION</span>
                    <span className="text-sky-400 font-semibold">FINAL YEAR</span>
                  </div>
                  <h4 className="text-sm font-display font-bold text-white">B.Tech in Computer Science</h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Data structures, algorithms, scalable web systems, and creative graphics programming.
                  </p>
                </div>
              )}

              {mobileStep === 3 && (
                <div className="space-y-2">
                  <div className="font-mono text-[9px] text-titanium uppercase">
                    <span>// 04. TECHNICAL SKILLS</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {verifiedSkills.slice(0, 8).map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-[9px] font-mono text-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress Indicator */}
              <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[9px] font-mono text-titanium/60">
                <span>PROGRESS 0{mobileStep + 1} / 04</span>
                <span className="animate-pulse">SCROLL TO ADVANCE</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
