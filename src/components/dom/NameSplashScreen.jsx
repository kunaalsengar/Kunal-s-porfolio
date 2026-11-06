import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * NameSplashScreen — Phase 6.5 Part 3
 * Minimal, premium editorial opening visual:
 * - Displays ONLY the name "KUNAL SENGAR" as the opening visual
 * - Premium editorial typography with wide tracking
 * - Smooth cinematic entrance animation
 * - Deep, clean, minimal void
 * - Naturally transitions into the Portrait section on scroll
 */
export default function NameSplashScreen({ onScrollDown }) {
  const containerRef = useRef(null)
  const nameRef = useRef(null)
  const scrollCueRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Cinematic Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        nameRef.current,
        {
          opacity: 0,
          y: 35,
          letterSpacing: '0.12em',
          filter: 'blur(12px)'
        },
        {
          opacity: 1,
          y: 0,
          letterSpacing: window.innerWidth < 640 ? '0.22em' : '0.32em',
          filter: 'blur(0px)',
          duration: 2.2
        }
      )

      tl.fromTo(
        scrollCueRef.current,
        { opacity: 0, y: 15 },
        { opacity: 0.5, y: 0, duration: 1.2 },
        '-=0.6'
      )

      // 2. Natural Cinematic Scroll-Driven Exit Transition into Portrait Section
      gsap.to(nameRef.current, {
        opacity: 0,
        y: -90,
        scale: 0.94,
        filter: 'blur(8px)',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom 40%',
          scrub: 1.2
        }
      })

      gsap.to(scrollCueRef.current, {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '30% top',
          scrub: 1
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="splash"
      className="relative w-full h-screen min-h-screen flex flex-col items-center justify-center select-none bg-[#030305] text-white overflow-hidden z-20"
    >
      {/* Editorial Name Visual Centerpiece */}
      <div className="relative px-6 text-center will-change-transform">
        <h1
          ref={nameRef}
          className="font-display font-light text-3xl sm:text-5xl md:text-7xl lg:text-8xl uppercase tracking-[0.22em] sm:tracking-[0.32em] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400/80 leading-none"
        >
          KUNAL SENGAR
        </h1>
      </div>

      {/* Minimal Delicate Scroll Prompt */}
      <div
        ref={scrollCueRef}
        onClick={onScrollDown}
        className="absolute bottom-10 sm:bottom-12 flex flex-col items-center gap-3 cursor-pointer group transition-opacity duration-300"
      >
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-titanium/80 group-hover:text-white transition-colors">
          SCROLL TO ENTER
        </span>
        <div className="relative w-[1px] h-9 bg-white/15 overflow-hidden">
          <div className="w-full h-1/2 bg-white/70 animate-pulse transform -translate-y-full group-hover:translate-y-full transition-transform duration-1000" />
        </div>
      </div>
    </section>
  )
}
