import React, { useEffect } from 'react'
import { verifiedProjects } from '../../data/portfolioData'
import { 
  X, 
  ExternalLink, 
  ShoppingBag, 
  ShieldCheck, 
  Code, 
  ArrowUpRight,
  Layers,
  Sparkles,
  Terminal
} from 'lucide-react'

/**
 * ProjectCatalogModal — Phase 6.5 Step 3
 * Verified Commercial Storefronts & Client Projects Surface
 * Triggered by ▶ EXPLORE PROJECTS or STOREFRONTS category pill
 * Ensures zero dead buttons while horizontal browsing rows are being constructed for Step 4.
 */
export default function ProjectCatalogModal({ isOpen, onClose }) {
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
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-surface-border shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-6 sm:p-10 space-y-8 z-10">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-red-500 tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>// VERIFIED PRODUCTION CATALOG</span>
          </div>

          <button
            onClick={onClose}
            data-cursor="pointer"
            className="p-2 rounded-lg bg-surface hover:bg-surface-light border border-surface-border text-titanium hover:text-white transition-colors"
            aria-label="Close project catalog"
          >
            <X className="w-4 h-4 text-chrome" />
          </button>
        </div>

        {/* Title & Context */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-xs text-titanium uppercase tracking-wider">
              STREAMING VERIFIED COMMERCIAL ARCHITECTURES
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Client Storefronts & Engineering Releases
          </h2>
          <p className="text-xs sm:text-sm text-titanium max-w-2xl leading-relaxed">
            Live commercial platforms engineered with bespoke Shopify Liquid templating, custom checkout enhancements, dynamic JavaScript, and responsive design systems.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {verifiedProjects.map((project) => (
            <div
              key={project.id}
              className="group glass-panel rounded-xl p-5 sm:p-6 border border-surface-border hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between space-y-5 bg-[#0b0c10]/80 shadow-xl"
            >
              {/* Card Meta */}
              <div className="flex items-center justify-between border-b border-surface-border pb-3">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: project.accentColor }} 
                  />
                  <span className="font-mono text-xs text-white font-bold">
                    {project.name}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-titanium">
                  {project.platform} // {project.category}
                </span>
              </div>

              {/* Architectural Preview Simulation Frame */}
              <div className="relative rounded-lg overflow-hidden bg-void border border-surface-border p-4 space-y-3 group-hover:border-red-500/30 transition-colors">
                <div className="flex items-center justify-between text-[10px] font-mono text-titanium border-b border-surface-border/40 pb-2">
                  <span className="text-chrome flex items-center gap-1.5">
                    <ShoppingBag className="w-3 h-3 text-red-500" />
                    <span>{project.website.replace('https://', '').replace('/', '')}</span>
                  </span>
                  <span className="text-accent-cyan flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>PRODUCTION VERIFIED</span>
                  </span>
                </div>

                <div className="py-4 px-2 space-y-2">
                  <span className="font-mono text-[11px] text-red-400 font-bold block">
                    {project.badge}
                  </span>
                  <p className="text-xs text-titanium leading-relaxed font-sans">
                    {project.summary}
                  </p>
                </div>
              </div>

              {/* Technologies Pill Row */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-titanium uppercase tracking-wider block">
                  Technologies Deployed:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-2.5 py-1 rounded bg-surface/80 border border-surface-border text-[10px] font-mono text-chrome"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct External Link Button */}
              <div className="pt-2 border-t border-surface-border">
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-surface hover:bg-white text-chrome hover:text-black font-mono text-xs font-semibold tracking-wider transition-all duration-300 border border-surface-border hover:border-transparent group/btn"
                >
                  <span>LAUNCH LIVE STOREFRONT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-titanium">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Interactive horizontal browsing rows are deploying in Step 4.</span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-red-400 transition-colors self-end sm:self-auto underline text-xs"
          >
            Return to Billboard
          </button>
        </div>

      </div>
    </div>
  )
}

