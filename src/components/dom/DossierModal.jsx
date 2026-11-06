import React, { useEffect } from 'react'
import { personalInfo, journeyTimeline } from '../../data/portfolioData'
import { 
  X, 
  ShieldCheck, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Sparkles,
  ChevronRight,
  Terminal
} from 'lucide-react'

/**
 * DossierModal — Phase 6.5 Step 3
 * Verified Developer Dossier Surface (Triggered by ⓘ VERIFIED DOSSIER):
 * - Displays Kunal's verified employment at VibeSoft and B.Tech CSE SRM education
 * - Features verified About portrait (IMG_3233.jpg) and core technical pillars
 * - Keyboard ESC listener & backdrop click to close
 */
export default function DossierModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none animate-in fade-in duration-300">
      {/* Dark backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#050508]/85 backdrop-blur-xl transition-opacity cursor-pointer" 
      />

      {/* Modal Dialog Surface */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-surface-border shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-6 sm:p-10 space-y-8 z-10">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-red-500 tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>// VERIFIED DEVELOPER DOSSIER</span>
          </div>

          <button
            onClick={onClose}
            data-cursor="pointer"
            className="p-2 rounded-lg bg-surface hover:bg-surface-light border border-surface-border text-titanium hover:text-white transition-colors"
            aria-label="Close dossier modal"
          >
            <X className="w-4 h-4 text-chrome" />
          </button>
        </div>

        {/* Top Split: Portrait + Identity Bio */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Portrait Container (IMG_3233.jpg) */}
          <div className="md:col-span-5 relative group max-w-xs mx-auto md:max-w-none w-full">
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-void border border-surface-border shadow-2xl">
              <img
                src={personalInfo.images.aboutPortrait}
                alt="Kunal Sengar — Verified Identity"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white/90">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-cyan" />
                  <span>VERIFIED ID</span>
                </span>
                <span className="text-red-500 font-bold">ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Narrative & Credentials */}
          <div className="md:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="font-mono text-xs text-red-500 font-bold">KUNAL SENGAR</span>
              <h3 className="font-display text-2xl font-bold text-white">
                Creative Developer & AI Engineer
              </h3>
              <p className="text-xs font-mono text-titanium">
                Location: {personalInfo.location} // Status: {personalInfo.availability}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-titanium leading-relaxed">
              Full Stack Developer currently engineering at <span className="text-white font-medium">VibeSoft</span> and final-year Computer Science & Engineering undergraduate student.
            </p>

            <p className="text-xs sm:text-sm text-titanium leading-relaxed">
              Engineering high-performance client websites, bespoke Shopify storefronts with Liquid, CSS, and JavaScript, backend REST APIs, databases, and cross-platform mobile apps with Android Studio, Flutter, and Dart.
            </p>

            {/* Core Badges */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-surface/60 border border-surface-border flex items-center gap-2 text-chrome">
                <Briefcase className="w-3.5 h-3.5 text-accent-cyan" />
                <span>VibeSoft Full Stack Developer</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface/60 border border-surface-border flex items-center gap-2 text-chrome">
                <GraduationCap className="w-3.5 h-3.5 text-accent-purple" />
                <span>Final-Year B.Tech CSE</span>
              </div>
            </div>
          </div>

        </div>

        {/* Experience & Academic Timeline Nodes */}
        <div className="space-y-4 pt-4 border-t border-surface-border">
          <span className="font-mono text-xs text-titanium uppercase tracking-wider block">
            Verified Roles & Responsibilities:
          </span>

          <div className="space-y-4">
            {journeyTimeline.map((item, index) => (
              <div 
                key={index}
                className="p-4 sm:p-5 rounded-xl bg-surface/40 border border-surface-border space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-surface-border/50 pb-2.5">
                  <div>
                    <h4 className="font-display font-bold text-white text-base">
                      {item.role}
                    </h4>
                    <p className="text-xs font-mono text-accent-cyan">
                      {item.organization}
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface text-[10px] font-mono text-titanium w-fit border border-surface-border">
                    {item.status}
                  </span>
                </div>

                <ul className="space-y-1.5 pt-1">
                  {item.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2 text-xs text-titanium">
                      <ChevronRight className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Close Action */}
        <div className="pt-4 border-t border-surface-border flex items-center justify-between text-xs font-mono text-titanium">
          <span>KUNAL SENGAR // DOSSIER ACTIVE</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface hover:bg-surface-light border border-surface-border text-white transition-colors"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  )
}

