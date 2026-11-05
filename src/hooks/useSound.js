import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Procedural Web Audio Ambient Sound Engine
 * - Zero external assets or network dependency
 * - 100% compliant with browser autoplay policies
 * - Muted by default; initiates ONLY upon explicit user interaction
 */
export function useSound() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const audioCtxRef = useRef(null)
  const masterGainRef = useRef(null)
  const oscillatorsRef = useRef([])

  useEffect(() => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) {
      setIsSupported(false)
    }

    return () => {
      // Cleanup audio context on unmount
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return audioCtxRef.current

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      const ctx = new AudioContextClass()
      audioCtxRef.current = ctx

      // Master Gain for smooth crossfades
      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0, ctx.currentTime)
      masterGain.connect(ctx.destination)
      masterGainRef.current = masterGain

      // Resonant Low-Pass Filter for warm, dark atmosphere
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(320, ctx.currentTime)
      filter.Q.setValueAtTime(4.0, ctx.currentTime)
      filter.connect(masterGain)

      // Slow Breathing LFO to modulate filter cutoff
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.type = 'sine'
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime) // 1 cycle every 12.5s
      lfoGain.gain.setValueAtTime(140, ctx.currentTime)
      lfo.connect(lfoGain)
      lfoGain.connect(filter.frequency)
      lfo.start()

      // Fundamental Drone Note: D2 (73.42 Hz) & A2 (110.00 Hz)
      const freqs = [73.42, 110.0, 146.83]
      const oscs = freqs.map((f, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = i === 1 ? 'triangle' : 'sine'
        // Micro-detune for lush cinematic chorus
        const detuneAmount = (i - 1) * 7
        osc.frequency.setValueAtTime(f, ctx.currentTime)
        osc.detune.setValueAtTime(detuneAmount, ctx.currentTime)
        
        gain.gain.setValueAtTime(0.08 / (i + 1), ctx.currentTime)
        osc.connect(gain)
        gain.connect(filter)
        osc.start()
        return osc
      })

      oscillatorsRef.current = oscs
      return ctx
    } catch (e) {
      console.warn('AudioContext initialization deferred:', e)
      return null
    }
  }, [])

  const toggleSound = useCallback(async () => {
    const ctx = initAudio()
    if (!ctx || !masterGainRef.current) return

    if (ctx.state === 'suspended') {
      await ctx.resume()
    }

    const now = ctx.currentTime
    const masterGain = masterGainRef.current

    if (isPlaying) {
      // Smooth fade out over 0.8s
      masterGain.gain.cancelScheduledValues(now)
      masterGain.gain.setValueAtTime(masterGain.gain.value, now)
      masterGain.gain.linearRampToValueAtTime(0, now + 0.8)
      setIsPlaying(false)
    } else {
      // Smooth fade in over 1.2s to subtle ambient level (0.15 volume)
      masterGain.gain.cancelScheduledValues(now)
      masterGain.gain.setValueAtTime(0, now)
      masterGain.gain.linearRampToValueAtTime(0.15, now + 1.2)
      setIsPlaying(true)
    }
  }, [isPlaying, initAudio])

  // Optional subtle tactile micro-click for interactive elements
  const playClickFeedback = useCallback(() => {
    if (!isPlaying || !audioCtxRef.current) return
    try {
      const ctx = audioCtxRef.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1400, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04)
      gain.gain.setValueAtTime(0.03, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.04)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.05)
    } catch (err) {
      // Ignore audio feedback errors
    }
  }, [isPlaying])

  return {
    isPlaying,
    isSupported,
    toggleSound,
    playClickFeedback
  }
}

