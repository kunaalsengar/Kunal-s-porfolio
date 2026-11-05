import React from 'react'
import { personalInfo } from '../../data/portfolioData'
import { Terminal, ShieldCheck, Code, Sparkles, CheckCircle2 } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="relative space-y-12 scroll-mt-28">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-cyan tracking-widest uppercase">
          <Terminal className="w-3.5 h-3.5" />
          <span>// 01. PROFILE & PHILOSOPHY</span>
        </div>
        <h2 className="text-fluid-h2 font-display font-bold text-white tracking-tight">
          Engineering at the Intersection of Systems & Interaction
        </h2>
      </div>

      {/* Main Grid: Portrait + Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Main About Portrait (IMG_3233.jpg) */}
        <div className="lg:col-span-5 relative group">
          {/* Subtle Ambient Halo */}
          <div className="absolute inset-0 bg-accent-cyan/10 rounded-2xl blur-2xl group-hover:bg-accent-cyan/20 transition-all duration-500 pointer-events-none" />

          {/* Photo Frame Container */}
          <div 
            data-cursor="text"
            data-cursor-text="KUNAL"
            className="relative glass-panel rounded-2xl p-2.5 sm:p-3 border border-surface-border overflow-hidden group-hover:border-accent-cyan/40 transition-all duration-500"
          >
            {/* Tech HUD Corner Accents */}
            <div className="absolute top-2 left-2 text-[10px] font-mono text-accent-cyan z-20 pointer-events-none select-none">
              + 01_PORTRAIT
            </div>
            <div className="absolute top-2 right-2 text-[10px] font-mono text-titanium z-20 pointer-events-none select-none">
              SYS.LIVE
            </div>
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-titanium z-20 pointer-events-none select-none">
              // KUNAL_SENGAR
            </div>

            {/* Image */}
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-surface">
              <img
                src={personalInfo.images.aboutPortrait}
                alt="Kunal Sengar — Creative Developer & AI Engineer"
                className="w-full h-full object-cover object-top grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              {/* Subtle metallic overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Verification Pill Under Image */}
            <div className="mt-3 px-3 py-2 rounded-lg bg-surface/80 border border-surface-border flex items-center justify-between text-xs font-mono text-titanium">
              <span className="flex items-center gap-1.5 text-chrome">
                <ShieldCheck className="w-3.5 h-3.5 text-accent-cyan" />
                <span>VERIFIED IDENTITY</span>
              </span>
              <span className="text-accent-cyan text-[11px]">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio Narrative & Verified Facts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4 text-titanium leading-relaxed text-fluid-body">
            <p>
              I am a <span className="text-white font-medium">Full Stack Developer</span> currently engineering at <span className="text-accent-cyan font-medium">VibeSoft</span> and a final-year Computer Science & Engineering undergraduate student.
            </p>
            <p>
              My work spans the full development cycle: from architecting robust client websites and high-converting custom Shopify storefronts with Liquid, CSS, and JavaScript, to engineering backend APIs, databases, and mobile applications with Flutter and Android Studio.
            </p>
            <p>
              Driven by a passion for creative web technology, I build digital experiences where fluid interaction physics, real-time 3D graphics with Three.js, and clean software architecture unite into engaging products.
            </p>
          </div>

          {/* Core Verified Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-surface-border">
            <div className="p-4 rounded-xl bg-surface/40 border border-surface-border space-y-1.5 hover:border-surface-hover transition-colors">
              <div className="flex items-center gap-2 text-accent-cyan text-xs font-mono font-semibold">
                <Code className="w-3.5 h-3.5" />
                <span>Full-Stack & E-Commerce</span>
              </div>
              <p className="text-xs text-titanium leading-relaxed">
                Shopify theme customizations, Liquid templating, WordPress, REST APIs, and database integrations.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface/40 border border-surface-border space-y-1.5 hover:border-surface-hover transition-colors">
              <div className="flex items-center gap-2 text-accent-purple text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Creative Web & Mobile</span>
              </div>
              <p className="text-xs text-titanium leading-relaxed">
                Interactive WebGL, Three.js, GSAP ScrollTrigger, and cross-platform mobile apps with Flutter & Dart.
              </p>
            </div>
          </div>

          {/* Current Focus Status */}
          <div className="p-4 rounded-xl glass-panel border border-accent-cyan/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-chrome font-medium">CURRENT FOCUS:</span>
              <span className="text-titanium">Full Stack at VibeSoft & Final-Year B.Tech CSE</span>
            </div>
            <span className="text-accent-cyan font-bold">{personalInfo.location}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

