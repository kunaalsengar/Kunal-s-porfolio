import React from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function SoundToggle({ isPlaying, onToggle }) {
  return (
    <button
      onClick={onToggle}
      type="button"
      aria-label={isPlaying ? "Mute ambient audio" : "Enable cinematic ambient audio"}
      className="group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full glass-panel hover:glass-panel-glow transition-all duration-300 text-xs font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-accent-cyan"
    >
      <div className="relative flex items-center justify-center w-4 h-4 text-accent-cyan">
        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 animate-pulse" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-titanium group-hover:text-chrome" />
        )}
      </div>

      <span className="hidden sm:inline text-[11px] text-titanium group-hover:text-chrome transition-colors">
        AUDIO {isPlaying ? <span className="text-accent-cyan font-bold">[ON]</span> : '[OFF]'}
      </span>

      {/* Mini Equalizer Bar Animation when Active */}
      <div className="flex items-end gap-[2px] h-3">
        <span 
          className={`w-[2px] bg-accent-cyan rounded-full transition-all duration-300 ${
            isPlaying ? 'h-3 animate-[pulse_0.6s_ease-in-out_infinite]' : 'h-1 bg-surface-border'
          }`} 
        />
        <span 
          className={`w-[2px] bg-accent-cyan rounded-full transition-all duration-300 ${
            isPlaying ? 'h-2 animate-[pulse_0.9s_ease-in-out_infinite_0.2s]' : 'h-1 bg-surface-border'
          }`} 
        />
        <span 
          className={`w-[2px] bg-accent-cyan rounded-full transition-all duration-300 ${
            isPlaying ? 'h-3.5 animate-[pulse_0.7s_ease-in-out_infinite_0.4s]' : 'h-1 bg-surface-border'
          }`} 
        />
      </div>
    </button>
  )
}

