import React, { useState } from 'react'
import { personalInfo } from '../../data/portfolioData'
import MagneticButton from '../ui/MagneticButton'
import {
  Mail,
  Send,
  Copy,
  Check,
  Terminal,
  ShieldCheck,
  Sparkles
} from 'lucide-react'

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  )
}

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [validationError, setValidationError] = useState('')

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2500)
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (validationError) setValidationError('')
  }

  // Prepares real mailto draft to Kunaalsengar27@gmail.com without faking backend submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setValidationError('Please complete all required fields.')
      return
    }

    const emailSubject = encodeURIComponent(formData.subject || `Portfolio Inquiry from ${formData.name}`)
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )

    // Open real pre-filled mail draft
    window.location.href = `mailto:${personalInfo.primaryEmail}?subject=${emailSubject}&body=${emailBody}`
  }

  return (
    <section id="contact" className="relative space-y-12 scroll-mt-28">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-cyan tracking-widest uppercase">
          <Terminal className="w-3.5 h-3.5" />
          <span>// 05. TRANSMISSION & INITIATION</span>
        </div>
        <h2 className="text-fluid-h2 font-display font-bold text-white tracking-tight">
          Initiate Direct Collaboration
        </h2>
        <p className="text-sm text-titanium max-w-xl">
          Open to full-stack engineering, high-performance Shopify storefronts, mobile applications, and creative 3D web collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Cinematic Portrait + Direct Email Channels + Social Links */}
        <div className="lg:col-span-5 space-y-6 w-full">
          {/* Cinematic Portrait Frame (b2affbd4-f396-4bee-8ec8-6cecfae347ff.jpg) */}
          <div className="relative glass-panel rounded-2xl p-2.5 sm:p-3 border border-surface-border overflow-hidden group max-w-sm sm:max-w-md mx-auto lg:max-w-none w-full">
            {/* Ambient Spot Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent-cyan/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-void border border-surface-border">
              <img
                src={personalInfo.images.cinematicPortrait}
                alt="Kunal Sengar — Cinematic Portrait"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent pointer-events-none" />

              {/* HUD Coordinates on Photo */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white/90">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                  <span>KUNAL SENGAR</span>
                </span>
                <span className="text-accent-cyan">CINEMATIC FRAME</span>
              </div>
            </div>
          </div>

          {/* Direct Verified Email Copy Cards */}
          <div className="space-y-3">
            <span className="font-mono text-[11px] text-titanium uppercase tracking-wider block">
              Direct Verified Communications:
            </span>

            {/* Primary Email */}
            <div className="p-3.5 rounded-xl glass-panel border border-surface-border flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <Mail className="w-4 h-4 text-accent-cyan shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-titanium block">PRIMARY INQUIRIES</span>
                  <a
                    href={`mailto:${personalInfo.primaryEmail}`}
                    className="text-xs sm:text-sm font-mono text-white hover:text-accent-cyan truncate block transition-colors"
                  >
                    {personalInfo.primaryEmail}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopyEmail(personalInfo.primaryEmail)}
                aria-label="Copy primary email"
                className="p-2 rounded-lg bg-surface hover:bg-surface-light border border-surface-border text-titanium hover:text-white transition-colors shrink-0"
              >
                {copiedEmail === personalInfo.primaryEmail ? (
                  <Check className="w-3.5 h-3.5 text-accent-cyan" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Secondary Email */}
            <div className="p-3.5 rounded-xl glass-panel border border-surface-border flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <Mail className="w-4 h-4 text-accent-amber shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-titanium block">SECONDARY / DIRECT</span>
                  <a
                    href={`mailto:${personalInfo.secondaryEmail}`}
                    className="text-xs sm:text-sm font-mono text-white hover:text-accent-amber truncate block transition-colors"
                  >
                    {personalInfo.secondaryEmail}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopyEmail(personalInfo.secondaryEmail)}
                aria-label="Copy secondary email"
                className="p-2 rounded-lg bg-surface hover:bg-surface-light border border-surface-border text-titanium hover:text-white transition-colors shrink-0"
              >
                {copiedEmail === personalInfo.secondaryEmail ? (
                  <Check className="w-3.5 h-3.5 text-accent-amber" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Social Ecosystem Links */}
          <div className="pt-2 space-y-2">
            <span className="font-mono text-[11px] text-titanium uppercase tracking-wider block">
              Network Channels:
            </span>
            <div className="flex flex-wrap gap-2.5">
              <MagneticButton
                variant="outline"
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="!px-4 !py-2 !text-[11px]"
              >
                <LinkedInIcon className="text-accent-cyan" />
                <span>LinkedIn</span>
              </MagneticButton>

              <MagneticButton
                variant="outline"
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                className="!px-4 !py-2 !text-[11px]"
              >
                <GitHubIcon className="text-white" />
                <span>GitHub</span>
              </MagneticButton>

              <MagneticButton
                variant="outline"
                href={personalInfo.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="!px-4 !py-2 !text-[11px]"
              >
                <InstagramIcon className="text-accent-purple" />
                <span>Instagram</span>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Right Column: Pre-filled Mailto Transmission Form */}
        <div className="lg:col-span-7 glass-panel p-4 sm:p-8 md:p-10 rounded-2xl border border-surface-border space-y-6">
          <div className="border-b border-surface-border pb-4 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-white">
                Dispatch Direct Transmission
              </h3>
              <span className="text-[10px] font-mono text-accent-cyan px-2.5 py-0.5 rounded bg-surface border border-surface-border">
                MAILTO://CLIENT
              </span>
            </div>
            <p className="text-xs text-titanium">
              Submitting launches a pre-formatted email draft directed to {personalInfo.primaryEmail}.
            </p>
          </div>

          {validationError && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-xs font-mono text-red-300">
              {validationError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="font-mono text-[11px] text-titanium uppercase tracking-wider block">
                  Your Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Connor"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-surface/70 border border-surface-border text-white text-sm placeholder:text-titanium/50 focus:outline-none focus:border-accent-cyan transition-colors font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="font-mono text-[11px] text-titanium uppercase tracking-wider block">
                  Your Email *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. sarah@cyberdyne.io"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-surface/70 border border-surface-border text-white text-sm placeholder:text-titanium/50 focus:outline-none focus:border-accent-cyan transition-colors font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="subject" className="font-mono text-[11px] text-titanium uppercase tracking-wider block">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project Inquiry / Full Stack / Shopify Collaboration"
                className="w-full px-4 py-2.5 rounded-xl bg-surface/70 border border-surface-border text-white text-sm placeholder:text-titanium/50 focus:outline-none focus:border-accent-cyan transition-colors font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="font-mono text-[11px] text-titanium uppercase tracking-wider block">
                Transmission Details *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your project requirements, architecture scope, or timeline..."
                required
                className="w-full px-4 py-2.5 rounded-xl bg-surface/70 border border-surface-border text-white text-sm placeholder:text-titanium/50 focus:outline-none focus:border-accent-cyan transition-colors font-sans resize-none"
              />
            </div>

            <div className="pt-2">
              <MagneticButton
                type="submit"
                variant="primary"
                className="w-full sm:w-auto"
              >
                <span>Generate Transmission Draft</span>
                <Send className="w-4 h-4" />
              </MagneticButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
