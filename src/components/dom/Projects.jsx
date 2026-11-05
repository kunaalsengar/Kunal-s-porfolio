import React from 'react'
import { verifiedProjects } from '../../data/portfolioData'
import MagneticButton from '../ui/MagneticButton'
import { ExternalLink, ShoppingBag, Code, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react'

export default function Projects() {
  return (
    <section id="projects" className="relative space-y-12 scroll-mt-28">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-cyan tracking-widest uppercase">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>// 03. SELECTED CLIENT STOREFRONTS</span>
          </div>
          <h2 className="text-fluid-h2 font-display font-bold text-white tracking-tight">
            Commercial E-Commerce Architectures
          </h2>
          <p className="text-sm text-titanium max-w-xl">
            Custom Shopify theme developments engineered with bespoke Liquid templates, responsive CSS, and dynamic JavaScript.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-titanium">
          <ShieldCheck className="w-4 h-4 text-accent-cyan" />
          <span>VERIFIED CLIENT WORK</span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {verifiedProjects.map((project) => (
          <div
            key={project.id}
            data-cursor="text"
            data-cursor-text="VISIT"
            className="group glass-panel rounded-2xl p-6 sm:p-8 border border-surface-border hover:border-accent-cyan/40 hover:glass-panel-glow transition-all duration-500 flex flex-col justify-between space-y-6"
          >
            {/* Top Meta Bar */}
            <div className="flex items-center justify-between border-b border-surface-border pb-4">
              <div className="flex items-center gap-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: project.accentColor }} 
                />
                <span className="font-mono text-xs text-chrome font-semibold">
                  {project.platform}
                </span>
                <span className="text-titanium text-xs font-mono">// {project.category}</span>
              </div>
              <span className="font-mono text-xs text-titanium">
                {project.id}
              </span>
            </div>

            {/* Architectural Preview Frame (Distinguished from Real Screenshots) */}
            <div className="relative rounded-xl overflow-hidden bg-obsidian border border-surface-border p-4 space-y-3 group-hover:border-surface-hover transition-colors">
              {/* Browser HUD bar */}
              <div className="flex items-center justify-between border-b border-surface-border/60 pb-2.5 text-[11px] font-mono text-titanium">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-surface-border" />
                  <span className="w-2 h-2 rounded-full bg-surface-border" />
                  <span className="w-2 h-2 rounded-full bg-surface-border" />
                </div>
                <span className="truncate max-w-[200px] sm:max-w-[260px] text-chrome">
                  {project.website.replace('https://', '')}
                </span>
                <span className="text-[10px] text-emerald-400">SSL_SECURE</span>
              </div>

              {/* Mockup Canvas Graphic */}
              <div className="h-44 sm:h-52 relative rounded-lg bg-surface/50 border border-surface-border/40 flex flex-col items-center justify-center p-6 text-center space-y-3 overflow-hidden">
                {/* Background Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                  }}
                />

                {/* Subtle Brand Accent Glow */}
                <div 
                  className="absolute w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: project.accentColor }}
                />

                <div className="relative z-10 space-y-1">
                  <h4 className="font-display text-2xl font-bold text-white tracking-tight">
                    {project.name}
                  </h4>
                  <p className="font-mono text-[11px] text-titanium">
                    {project.summary}
                  </p>
                </div>

                {/* Specification Chip */}
                <div className="relative z-10 px-3 py-1 rounded-full bg-surface-light border border-surface-border text-[10px] font-mono text-accent-cyan tracking-wider">
                  {project.badge}
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">
                  {project.name}
                </h3>
                <div className="p-3 rounded-lg bg-surface/40 border border-surface-border text-xs text-titanium leading-relaxed">
                  <span className="font-mono text-[11px] text-accent-cyan font-semibold block mb-0.5">
                    VERIFIED CONTRIBUTION:
                  </span>
                  {project.contribution}
                </div>
              </div>

              {/* Technologies Applied */}
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-titanium uppercase tracking-wider block">
                  Technologies Applied
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-surface border border-surface-border font-mono text-xs text-chrome"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Link Button */}
            <div className="pt-2 border-t border-surface-border">
              <MagneticButton
                variant="outline"
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className="w-full justify-between"
              >
                <span>Launch Live Storefront</span>
                <ExternalLink className="w-4 h-4 text-accent-cyan" />
              </MagneticButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

