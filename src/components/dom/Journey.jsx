import React from 'react'
import { journeyTimeline } from '../../data/portfolioData'
import { Briefcase, GraduationCap, CheckCircle2, ChevronRight } from 'lucide-react'

export default function Journey() {
  return (
    <section id="journey" className="relative space-y-12 scroll-mt-28">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-cyan tracking-widest uppercase">
          <Briefcase className="w-3.5 h-3.5" />
          <span>// 04. EXPERIENCE & ACADEMIC PATH</span>
        </div>
        <h2 className="text-fluid-h2 font-display font-bold text-white tracking-tight">
          Current Roles & Engineering Trajectory
        </h2>
        <p className="text-sm text-titanium max-w-xl">
          Active production experience in commercial software development alongside foundational computer science education.
        </p>
      </div>

      {/* Timeline Nodes */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-6 before:w-[1px] before:bg-surface-border">
        {journeyTimeline.map((item, index) => (
          <div
            key={index}
            className="relative pl-8 sm:pl-14 space-y-4"
          >
            {/* Timeline Node Icon Indicator */}
            <div className="absolute left-3 sm:left-6 -translate-x-1/2 top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-surface border-2 border-accent-cyan flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.4)]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
            </div>

            {/* Card Content */}
            <div className="glass-panel p-4 sm:p-7 md:p-8 rounded-2xl border border-surface-border hover:border-surface-hover hover:glass-panel-glow transition-all duration-300 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-border pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-accent-cyan uppercase">
                    {index === 0 ? (
                      <Briefcase className="w-3.5 h-3.5" />
                    ) : (
                      <GraduationCap className="w-3.5 h-3.5 text-accent-purple" />
                    )}
                    <span>{item.type}</span>
                  </div>
                  <h3 className="text-fluid-h3 font-display font-bold text-white">
                    {item.role}
                  </h3>
                  <p className="text-sm text-chrome font-medium">
                    {item.organization}
                  </p>
                </div>

                <div className="px-3 py-1 rounded-full bg-surface-light border border-surface-border text-xs font-mono text-titanium w-fit">
                  {item.status}
                </div>
              </div>

              {/* Responsibilities List */}
              <div className="space-y-2.5 pt-1">
                <span className="font-mono text-[11px] text-titanium uppercase tracking-wider block">
                  Core Responsibilities & Scope:
                </span>
                <ul className="space-y-2">
                  {item.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-titanium leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Highlight */}
              <div className="pt-3 border-t border-surface-border/50 flex items-center justify-between text-xs font-mono text-titanium">
                <span className="text-accent-cyan">{item.highlight}</span>
                <span className="text-[11px]">VERIFIED CREDENTIAL</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

