import React, { useRef } from 'react'
import { Environment } from '@react-three/drei'
import Monolith from './Monolith'
import FloatingParticles from './FloatingParticles'
import CameraRig from './CameraRig'

/**
 * 3D Stage & Lighting Setup
 * Cinematic studio lighting tailored specifically for physical metallic shaders.
 */
export default function Scene({ isMobile = false, reducedMotion = false }) {
  const monolithMacroRef = useRef()

  return (
    <>
      {/* 1. Authoritative Camera & Scene Choreographer */}
      <CameraRig
        isMobile={isMobile}
        reducedMotion={reducedMotion}
        monolithRef={monolithMacroRef}
      />

      {/* 2. Deep Void Ambient Floor Light */}
      <ambientLight intensity={0.45} color="#1e293b" />

      {/* 3. Primary Key Light (Crisp Specular White from Top Right) */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={2.8}
        color="#ffffff"
      />

      {/* 4. Frontal Studio Specular Fill (Reveals brushed titanium facets) */}
      <directionalLight
        position={[-1, 2, 6]}
        intensity={1.5}
        color="#d1d5db"
      />

      {/* 5. High-Impact Cyber Cyan Rim Light (Grazes silhouettes) */}
      <directionalLight
        position={[-6, 2, -4]}
        intensity={3.6}
        color="#00f0ff"
      />

      {/* 6. Subtle Purple Fill Light from Behind Below-Right */}
      <directionalLight
        position={[4, -4, -2]}
        intensity={1.2}
        color="#8b5cf6"
      />

      {/* 7. Top Cool White Spot for Edge Highlight */}
      <spotLight
        position={[0, 9, 3]}
        angle={0.45}
        penumbra={1}
        intensity={1.8}
        color="#f8fafc"
      />

      {/* 8. Realistic Physical Reflections via Drei Environment */}
      <Environment preset="city" environmentIntensity={0.8} />

      {/* 9. Atmospheric Dust Field */}
      <FloatingParticles count={isMobile ? 35 : 75} />

      {/* 10. The Central Architectural Metallic Monolith (Macro Ref Linked) */}
      <Monolith
        ref={monolithMacroRef}
        reducedMotion={reducedMotion}
        macroPosition={isMobile ? [0, 0.45, -0.4] : [1.75, 0, 0]}
        macroScale={isMobile ? 0.85 : 1}
      />
    </>
  )
}
