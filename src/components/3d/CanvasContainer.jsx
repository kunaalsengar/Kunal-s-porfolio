import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import WebGLFallback from './WebGLFallback'

function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

/**
 * Persistent Full-Viewport 3D Canvas Layer
 * - Fixed background architecture (z-0, pointer-events-none)
 * - Three-tier responsive adaptation: mobile (<768px), tablet (768-1023px), desktop (>=1024px)
 * - Hardware-accelerated WebGL with DPR clamping [1, 1.5]
 * - Tracks client mouse events anywhere on the page via eventSource
 * - Graceful WebGLFallback for unsupported systems
 */
export default function CanvasContainer({
  className = "",
  introActive = false,
  introScene = 1,
  onIntroSceneChange,
  onIntroComplete
}) {
  const [hasWebGL, setHasWebGL] = useState(true)
  const [deviceTier, setDeviceTier] = useState('desktop') // 'mobile' | 'tablet' | 'desktop'
  const [reducedMotion, setReducedMotion] = useState(false)
  const [rootElement, setRootElement] = useState(null)

  useEffect(() => {
    // 1. Check WebGL support
    if (!isWebGLAvailable()) {
      setHasWebGL(false)
      return
    }

    // 2. Multi-tier device breakpoint evaluation
    const evaluateDeviceTier = () => {
      const w = window.innerWidth
      if (w < 768) {
        setDeviceTier('mobile')
      } else if (w < 1024) {
        setDeviceTier('tablet')
      } else {
        setDeviceTier('desktop')
      }
    }
    evaluateDeviceTier()

    // 3. Accessibility reduced motion check
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionQuery.matches)

    // 4. Attach event source for global mouse tracking
    setRootElement(document.getElementById('root'))

    const handleResize = () => evaluateDeviceTier()
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!hasWebGL) {
    return (
      <div className={`fixed inset-0 z-0 pointer-events-none ${className}`}>
        <WebGLFallback />
      </div>
    )
  }

  const cameraConfig = {
    mobile: { position: [0, 0, 6.4], fov: 46 },
    tablet: { position: [0, 0, 5.8], fov: 44 },
    desktop: { position: [0, 0, 5.2], fov: 42 }
  }[deviceTier] || { position: [0, 0, 5.2], fov: 42 }

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden ${className}`}>
      <Canvas
        eventSource={rootElement || undefined}
        eventPrefix="client"
        camera={{
          position: cameraConfig.position,
          fov: cameraConfig.fov,
          near: 0.1,
          far: 300
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <Scene
            deviceTier={deviceTier}
            isMobile={deviceTier === 'mobile'}
            isTablet={deviceTier === 'tablet'}
            reducedMotion={reducedMotion}
            introActive={introActive}
            introScene={introScene}
            onIntroSceneChange={onIntroSceneChange}
            onIntroComplete={onIntroComplete}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
