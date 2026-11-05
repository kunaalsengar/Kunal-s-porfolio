import React, { useState, useEffect } from 'react'
import { personalInfo } from '../../data/portfolioData'
import { ArrowUp, Terminal, Shield, Sparkles } from 'lucide-react'

export default function Footer({ onScrollTop }) {
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Display local IST time or system time
      const time = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
      setTimeString(time)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="relative z-10 border-t border-surface-border py-12 px-4 sm:px-8 bg-void/90 text-titanium text-xs font-mono">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Tier: Brand + Status + Back to Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-surface-border pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-display text-base font-bold">
              <span>{personalInfo.name}</span>
              <span className="text-accent-cyan">//</span>
              <span className="text-xs font-mono text-accent-cyan font-normal">{personalInfo.role}</span>
            </div>
            <p className="text-[11px] text-titanium">
              Full Stack Developer @ VibeSoft & Final-Year B.Tech CSE
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Indian Standard Time */}
            <div className="px-3 py-1.5 rounded-lg bg-surface border border-surface-border flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              <span>IST {timeString || '23:30:00'} (UTC+5:30)</span>
            </div>

            {/* Back to top anchor */}
            <button
              onClick={() => onScrollTop?.('#hero')}
              data-cursor="pointer"
              aria-label="Back to top"
              className="p-2.5 rounded-lg bg-surface hover:bg-surface-light border border-surface-border hover:border-accent-cyan/40 text-chrome hover:text-white transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4 text-accent-cyan" />
            </button>
          </div>
        </div>

        {/* Bottom Tier: Architecture details + Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-3">
            <span className="text-chrome">© 2026 {personalInfo.name}</span>
            <span className="text-surface-border">|</span>
            <span>VERIFIED PORTFOLIO SPECIFICATION</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-titanium">
            <span>REACT 19</span>
            <span>•</span>
            <span>THREE.JS R3F</span>
            <span>•</span>
            <span>GSAP 3.15</span>
            <span>•</span>
            <span>LENIS</span>
            <span>•</span>
            <span>TAILWIND CSS</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

