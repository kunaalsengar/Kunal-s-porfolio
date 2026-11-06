import React from 'react'
import { personalInfo } from '../../data/portfolioData'
import { 
  Play, 
  Info, 
  Send, 
  ChevronDown
} from 'lucide-react'

/**
 * NetflixHeroBillboard — Phase 6.5 Step 3.1
 * Immersive Cinematic Hero Redesign:
 * - 100% Centre-aligned content (both horizontally and vertically)
 * - Large, bold, premium typography: KUNAL SENGAR
 * - Professional Title: Creative Developer & AI Engineer (directly beneath name)
 * - Minimal, refined credentials: FULL STACK DEVELOPER AT VIBESOFT • FINAL-YEAR B.TECH CSE
 * - Concise, centred introduction
 * - Centred action buttons: EXPLORE PROJECTS, VERIFIED DOSSIER, DIRECT TRANSMISSION
 * - Standing 3D Monolith completely removed from Hero composition
 */
export default function NetflixHeroBillboard({
  onExploreProjects,
  onOpenDossier,
  onOpenContact
}) {
  return (
    <section 
      id="billboard"
      className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 relative select-none pt-20 pb-16 overflow-hidden"
    >
      {/* Central Content Stack (Max-w-4xl, perfectly centered) */}
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 z-10 flex flex-col items-center">
        
        {/* 1. Refined Minimal Credentials */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono tracking-wider">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/60 border border-surface-border text-chrome shadow-lg backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-semibold uppercase text-white/90">FULL STACK DEVELOPER AT VIBESOFT</span>
          </div>

          <span className="text-titanium/40 hidden sm:inline">•</span>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface/60 border border-surface-border text-titanium shadow-lg backdrop-blur-md">
            <span className="uppercase text-chrome/90">FINAL-YEAR B.TECH CSE</span>
          </div>
        </div>

        {/* 2. Main Name & Professional Title Hierarchy */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-white tracking-tight uppercase leading-[0.92] drop-shadow-[0_15px_45px_rgba(229,9,20,0.35)]">
            {personalInfo.name}
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-red-400 drop-shadow-sm">
            {personalInfo.role}
          </p>
        </div>

        {/* 3. Concise Centred Introduction */}
        <p className="text-sm sm:text-base md:text-lg text-titanium/90 max-w-2xl mx-auto leading-relaxed font-sans font-normal px-2">
          {personalInfo.tagline}
        </p>

        {/* 4. Centred Hero Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 pt-2 sm:pt-4">
          
          {/* Action 1: EXPLORE PROJECTS */}
          <button
            onClick={onExploreProjects}
            data-cursor="pointer"
            className="group relative flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-white hover:bg-white/95 text-black font-display font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.25)] hover:shadow-[0_15px_40px_rgba(229,9,20,0.45)] hover:scale-105 active:scale-95"
            aria-label="Explore verified client storefronts and projects"
          >
            <Play className="w-4 h-4 fill-black text-black group-hover:scale-110 transition-transform" />
            <span>EXPLORE PROJECTS</span>
          </button>

          {/* Action 2: VERIFIED DOSSIER */}
          <button
            onClick={onOpenDossier}
            data-cursor="pointer"
            className="group flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3.5 rounded-xl bg-surface/70 hover:bg-surface-light border border-surface-border hover:border-white/40 text-white font-mono text-xs sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-xl backdrop-blur-md hover:scale-105 active:scale-95"
            aria-label="View verified credentials and academic dossier"
          >
            <Info className="w-4 h-4 text-red-500 group-hover:rotate-12 transition-transform" />
            <span>VERIFIED DOSSIER</span>
          </button>

          {/* Action 3: DIRECT TRANSMISSION */}
          <button
            onClick={onOpenContact}
            data-cursor="pointer"
            className="group flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-surface/50 hover:bg-red-600/15 border border-surface-border hover:border-red-500/60 text-titanium hover:text-white font-mono text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md"
            aria-label="Initiate direct contact transmission"
          >
            <Send className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-0.5 transition-transform" />
            <span>DIRECT TRANSMISSION</span>
          </button>

        </div>

      </div>

      {/* Downward Scroll Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[10px] font-mono text-titanium/60 pointer-events-none select-none">
        <span className="tracking-widest uppercase text-[9px]">EXPLORE STREAMING CATALOG</span>
        <ChevronDown className="w-3.5 h-3.5 text-red-500 animate-bounce" />
      </div>
    </section>
  )
}
