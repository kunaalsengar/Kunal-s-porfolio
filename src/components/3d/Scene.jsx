import React, { useRef } from 'react'
import { Environment } from '@react-three/drei'
import Monolith from './Monolith'
import DotUniverse from './DotUniverse'
import EngineeringArchitecture3D from './EngineeringArchitecture3D'
import ProfessionalExperience3D from './ProfessionalExperience3D'

/**
 * 3D Scene Architecture — Phase 6.5 New Cinematic Direction
 * - Immersive Dot Universe with 8,000 celestial points
 * - Scroll-driven camera pull-back zoom out
 * - Clean, deep void atmosphere with zero cheap neon or Netflix HUD clutter
 * - Architecture preserved with high-performance 60 FPS rendering
 */
export default function Scene({
  deviceTier = 'desktop',
  isMobile = false,
  isTablet = false,
  reducedMotion = false
}) {
  const monolithRef = useRef()

  return (
    <>
      {/* 1. Immersive 3D Dot Universe & Camera Zoom-Out Transition (Part 5, 6.6, 6.7) */}
      <DotUniverse reducedMotion={reducedMotion} />

      {/* 2. Phase 6.8: Behind the Build — 3D Digital Architecture Installation */}
      <EngineeringArchitecture3D reducedMotion={reducedMotion} />

      {/* 3. Phase 6.9: Professional Experience — 3D Career Journey */}
      <ProfessionalExperience3D reducedMotion={reducedMotion} />

      {/* 2. Deep Void Ambient & Key Lighting */}
      <ambientLight intensity={0.4} color="#0f172a" />

      <directionalLight
        position={[5, 8, 6]}
        intensity={1.8}
        color="#ffffff"
      />

      <directionalLight
        position={[-6, -2, -4]}
        intensity={0.8}
        color="#38bdf8"
      />

      <directionalLight
        position={[0, -5, 2]}
        intensity={0.5}
        color="#818cf8"
      />

      {/* 3. Subtle Environment Map for Specular Depth */}
      <Environment preset="city" environmentIntensity={0.3} />

      {/* 4. Monolith (Preserved in architecture, kept dormant) */}
      <Monolith
        ref={monolithRef}
        reducedMotion={reducedMotion}
        visible={false}
      />
    </>
  )
}
