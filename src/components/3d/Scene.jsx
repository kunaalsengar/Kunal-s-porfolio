import React, { useRef } from 'react'
import { Environment } from '@react-three/drei'
import Monolith from './Monolith'
import FloatingParticles from './FloatingParticles'
import CameraRig from './CameraRig'
import CinematicIntro from './CinematicIntro'
import CinematicHeroBackground from './CinematicHeroBackground'

/**
 * 3D Stage & Lighting Setup — Phase 6.5 Step 3.1
 * - Continuous full-screen animated crimson waves & light streaks
 * - Delicate floating embers & atmospheric particles
 * - Monolith preserved in architecture but removed from visible Hero composition (visible={false})
 * - Authoritative CameraRig & CinematicIntro preserved
 */
export default function Scene({
  deviceTier = 'desktop',
  isMobile = false,
  isTablet = false,
  reducedMotion = false,
  introActive = false,
  introScene = 1,
  onIntroSceneChange,
  onIntroComplete
}) {
  const monolithMacroRef = useRef()

  return (
    <>
      {/* 0. Cinematic 3D Intro Sequence (Scenes 1 to 5) */}
      <CinematicIntro
        active={introActive}
        deviceTier={deviceTier}
        reducedMotion={reducedMotion}
        onSceneChange={onIntroSceneChange}
        onComplete={onIntroComplete}
      />

      {/* 1. Continuous Full-Screen Cinematic Animated Background Waves */}
      <CinematicHeroBackground
        reducedMotion={reducedMotion}
        introActive={introActive}
        introScene={introScene}
      />

      {/* 2. Delicate Atmospheric Embers & Floating Particles */}
      <FloatingParticles
        count={isMobile ? 35 : isTablet ? 50 : 75}
        reducedMotion={reducedMotion}
      />

      {/* 3. Authoritative Camera & Scene Choreographer */}
      <CameraRig
        deviceTier={deviceTier}
        isMobile={isMobile}
        isTablet={isTablet}
        reducedMotion={reducedMotion}
        monolithRef={monolithMacroRef}
        introActive={introActive && introScene < 5}
      />

      {/* 4. Deep Void Ambient Floor Light */}
      <ambientLight intensity={0.45} color="#1e293b" />

      {/* 5. Primary Key Light */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={2.8}
        color="#ffffff"
      />

      {/* 6. Frontal Studio Specular Fill */}
      <directionalLight
        position={[-1, 2, 6]}
        intensity={1.5}
        color="#d1d5db"
      />

      {/* 7. Crimson Rim Light Accent */}
      <directionalLight
        position={[-6, 2, -4]}
        intensity={3.6}
        color="#e50914"
      />

      {/* 8. Subtle Fill Light */}
      <directionalLight
        position={[4, -4, -2]}
        intensity={1.2}
        color="#8b5cf6"
      />

      {/* 9. Top Cool White Spot for Edge Highlight */}
      <spotLight
        position={[0, 9, 3]}
        angle={0.45}
        penumbra={1}
        intensity={1.8}
        color="#f8fafc"
      />

      {/* 10. Realistic Physical Reflections via Drei Environment */}
      <Environment preset="city" environmentIntensity={0.8} />

      {/* 11. Monolith (Preserved for future sections, hidden in Hero per Step 3.1) */}
      <Monolith
        ref={monolithMacroRef}
        reducedMotion={reducedMotion}
        visible={false}
        macroPosition={
          isMobile
            ? [0, 0.45, -0.4]
            : isTablet
            ? [0.95, 0.1, -0.1]
            : [1.75, 0, 0]
        }
        macroScale={isMobile ? 0.85 : isTablet ? 0.9 : 1}
      />
    </>
  )
}
