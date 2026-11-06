import React, { useState, useEffect } from 'react'
import { personalInfo } from '../../data/portfolioData'
import { 
  X, 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Terminal,
  ShieldCheck
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

/**
 * TransmissionModal — Phase 6.5 Step 3
 * Direct Contact Transmission Surface (Triggered by ✉ DIRECT TRANSMISSION or TRANSMIT):
 * - Cinematic portrait frame (b2affbd4-f396-4bee-8ec8-6cecfae347ff.jpg)
 * - One-click copy for primary & secondary verified emails
 * - Validated mailto draft generator to Kunaalsengar27@gmail.com
 * - Verified social media links
 */
export default function TransmissionModal({ isOpen, onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2500)
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (validationError) setValidationError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setValidationError('Please complete all required fields.')
      return
    }

    const emailSubject = encodeURIComponent(formData.subject || `Streaming Transmission from ${formData.name}`)
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )

    window.location.href = `mailto:${personalInfo.primaryEmail}?subject=${emailSubject}&body=${emailBody}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none animate-in fade-in duration-300">
      {/* Dark backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#050508]/85 backdrop-blur-xl transition-opacity cursor-pointer" 
      />

      {/* Modal Dialog Surface */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-surface-border shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-6 sm:p-10 space-y-6 z-10">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-red-500 tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>// DIRECT TRANSMISSION CONSOLE</span>
          </div>

          <button
            onClick={onClose}
            data-cursor="pointer"
            className="p-2 rounded-lg bg-surface hover:bg-surface-light border border-surface-border text-titanium hover:text-white transition-colors"
            aria-label="Close transmission modal"
          >
            <X className="w-4 h-4 text-chrome" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cinematic Portrait + Email Copy Pills + Socials */}
          <div className="md:col-span-5 space-y-5">
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-void border border-surface-border shadow-2xl group max-w-xs mx-auto md:max-w-none">
              <img
                src={personalInfo.images.cinematicPortrait}
                alt="Kunal Sengar — Cinematic Portrait"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white/90">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>KUNAL SENGAR</span>
                </span>
                <span className="text-red-500">LIVE LINE</span>
              </div>
            </div>

            {/* Direct Email Cards */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-titanium uppercase tracking-wider block">
                Direct Inquiries:
              </span>

              {/* Primary Email */}
              <div className="p-3 rounded-xl bg-surface/70 border border-surface-border flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[9px] font-mono text-titanium block">PRIMARY INQUIRIES</span>
                  <a 
                    href={`mailto:${personalInfo.primaryEmail}`}
                    className="text-xs font-mono text-white hover:text-red-400 truncate block transition-colors"
                  >
                    {personalInfo.primaryEmail}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyEmail(personalInfo.primaryEmail)}
                  className="p-1.5 rounded-lg bg-surface hover:bg-surface-light border border-surface-border text-titanium hover:text-white transition-colors shrink-0"
                  aria-label="Copy primary email"
                >
                  {copiedEmail === personalInfo.primaryEmail ? (
                    <Check className="w-3.5 h-3.5 text-red-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Secondary Email */}
              <div className="p-3 rounded-xl bg-surface/70 border border-surface-border flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[9px] font-mono text-titanium block">SECONDARY INQUIRIES</span>
                  <a 
                    href={`mailto:${personalInfo.secondaryEmail}`}
                    className="text-xs font-mono text-white hover:text-accent-cyan truncate block transition-colors"
                  >
                    {personalInfo.secondaryEmail}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyEmail(personalInfo.secondaryEmail)}
                  className="p-1.5 rounded-lg bg-surface hover:bg-surface-light border border-surface-border text-titanium hover:text-white transition-colors shrink-0"
                  aria-label="Copy secondary email"
                >
                  {copiedEmail === personalInfo.secondaryEmail ? (
                    <Check className="w-3.5 h-3.5 text-accent-cyan" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="space-y-2 pt-1">
              <span className="font-mono text-[10px] text-titanium uppercase tracking-wider block">
                Network Ecosystem:
              </span>
              <div className="flex flex-wrap gap-2">
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-light border border-surface-border text-xs font-mono text-white flex items-center gap-1.5 transition-colors"
                >
                  <LinkedInIcon className="text-accent-cyan" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-light border border-surface-border text-xs font-mono text-white flex items-center gap-1.5 transition-colors"
                >
                  <GitHubIcon className="text-white" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-light border border-surface-border text-xs font-mono text-white flex items-center gap-1.5 transition-colors"
                >
                  <InstagramIcon className="text-red-500" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-filled Mailto Dispatch Form */}
          <div className="md:col-span-7 bg-surface/30 p-5 sm:p-7 rounded-xl border border-surface-border space-y-4">
            <div>
              <h4 className="font-display font-bold text-white text-lg">
                Dispatch Pre-Formatted Transmission
              </h4>
              <p className="text-xs text-titanium">
                Launches a verified email draft directly targeted to {personalInfo.primaryEmail}.
              </p>
            </div>

            {validationError && (
              <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/40 text-xs font-mono text-red-300">
                {validationError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="tx-name" className="font-mono text-[10px] text-titanium uppercase block">
                    Your Name *
                  </label>
                  <input
                    id="tx-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-surface-border focus:border-red-500 text-xs font-mono text-white placeholder-titanium/50 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="tx-email" className="font-mono text-[10px] text-titanium uppercase block">
                    Your Email *
                  </label>
                  <input
                    id="tx-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-surface-border focus:border-red-500 text-xs font-mono text-white placeholder-titanium/50 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="tx-subject" className="font-mono text-[10px] text-titanium uppercase block">
                  Subject Scope
                </label>
                <input
                  id="tx-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Shopify Storefront Project"
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-surface-border focus:border-red-500 text-xs font-mono text-white placeholder-titanium/50 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="tx-message" className="font-mono text-[10px] text-titanium uppercase block">
                  Transmission Message *
                </label>
                <textarea
                  id="tx-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Outline your project scope, requirements, or collaboration goals..."
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-surface-border focus:border-red-500 text-xs font-mono text-white placeholder-titanium/50 focus:outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(229,9,20,0.35)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>OPEN PRE-FILLED MAIL CLIENT</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  )
}

