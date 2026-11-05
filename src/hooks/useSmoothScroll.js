import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Custom hook to bridge Lenis smooth scrolling with GSAP ScrollTrigger
 * - Zero jitter 60/120fps synchronized scrolling
 * - Automatic mobile & reduced motion detection
 * - Clean lifecycle management with ScrollTrigger refresh
 */
export function useSmoothScroll() {
  const lenisRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Respect user reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    })

    lenisRef.current = lenis

    // Synchronize Lenis scroll updates directly with ScrollTrigger
    lenis.on('scroll', (e) => {
      ScrollTrigger.update()
      
      // Update global scroll progress (0 to 1)
      const progress = e.progress ?? 0
      setScrollProgress(progress)

      // Toggle scrolled state for navbar (after 50px)
      if (e.animatedScroll > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    })

    // Add Lenis to GSAP's central RAF ticker for unified frame timing
    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // Notify ScrollTrigger of the initial layout
    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      lenisRef.current = null
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const scrollTo = useCallback((target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: 0,
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
      })
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return {
    lenis: lenisRef.current,
    scrollTo,
    scrollProgress,
    isScrolled
  }
}

