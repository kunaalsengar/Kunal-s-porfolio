import React from 'react'
import { personalInfo } from '../../data/portfolioData'
import SoundToggle from '../ui/SoundToggle'

export default function Navbar({ 
  isScrolled, 
  scrollProgress, 
  isPlaying, 
  onToggleSound, 
  onNavigate 
}) {
  const navLinks = [
    { label: '// ABOUT', href: '#about' },
    { label: '// SKILLS', href: '#skills' },
    { label: '// PROJECTS', href: '#projects' },
    { label: '// JOURNEY', href: '#journey' },
    { label: '// CONTACT', href: '#contact' },
  ]

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    onNavigate?.(href)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'py-3 bg-obsidian/85 backdrop-blur-xl border-b border-surface-border shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]' 
          : 'py-5 sm:py-7 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand identity badge */}
        <a 
          href="#hero" 
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="group flex items-center gap-3 select-none"
          data-cursor="pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-surface border border-surface-border group-hover:border-accent-cyan/50 flex items-center justify-center font-display font-bold text-white text-xs tracking-wider transition-colors">
            KS
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs text-white group-hover:text-accent-cyan font-semibold tracking-wider transition-colors">
              {personalInfo.name}
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] text-titanium tracking-widest uppercase">
              CREATIVE DEVELOPER & AI ENGINEER
            </span>
          </div>
        </a>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              data-cursor="pointer"
              className="font-mono text-xs text-titanium hover:text-accent-cyan tracking-widest transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Cluster: Status + Sound Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-surface/60 border border-surface-border text-[10px] font-mono text-titanium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYS.ONLINE</span>
          </div>

          <SoundToggle isPlaying={isPlaying} onToggle={onToggleSound} />
        </div>
      </div>

      {/* Real-time Global Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-transparent overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-accent-purple via-accent-cyan to-white transition-all duration-100 ease-out shadow-[0_0_8px_#00f0ff]"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>
    </header>
  )
}

