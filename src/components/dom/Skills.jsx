import React from 'react'
import { skillCategories } from '../../data/portfolioData'
import { Cpu, Layers, ShoppingBag, Smartphone, Terminal, Sparkles } from 'lucide-react'

export default function Skills() {
  const categoryIcons = {
    "Frontend & Creative Web": <Layers className="w-4 h-4 text-accent-cyan" />,
    "E-Commerce & CMS Platforms": <ShoppingBag className="w-4 h-4 text-accent-amber" />,
    "Backend & Systems": <Cpu className="w-4 h-4 text-accent-purple" />,
    "Mobile Application Development": <Smartphone className="w-4 h-4 text-emerald-400" />,
    "AI, Workflow & Tooling": <Terminal className="w-4 h-4 text-white" />
  }

  return (
    <section id="skills" className="relative space-y-12 scroll-mt-28">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-cyan tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>// 02. TECHNICAL ARSENAL</span>
        </div>
        <h2 className="text-fluid-h2 font-display font-bold text-white tracking-tight">
          Verified Core Capabilities & Systems
        </h2>
        <p className="text-sm text-titanium max-w-xl">
          Technologies and tools actively employed across production client websites, e-commerce stores, and cross-platform mobile applications.
        </p>
      </div>

      {/* Categorized Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((group, index) => (
          <div
            key={group.category}
            className={`glass-panel p-4 sm:p-6 rounded-2xl border border-surface-border hover:border-surface-hover hover:glass-panel-glow transition-all duration-300 flex flex-col justify-between space-y-5 ${
              index === 0 ? "md:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                {categoryIcons[group.category] || <Cpu className="w-4 h-4 text-accent-cyan" />}
                <h3 className="font-display font-semibold text-white text-base">
                  {group.category}
                </h3>
              </div>
              <p className="text-xs text-titanium leading-relaxed">
                {group.description}
              </p>
            </div>

            {/* Skill Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-surface-border">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  data-cursor="pointer"
                  className="px-3 py-1.5 rounded-lg bg-surface/70 border border-surface-border text-xs font-mono text-chrome hover:text-white hover:border-accent-cyan/50 hover:bg-surface-light transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

