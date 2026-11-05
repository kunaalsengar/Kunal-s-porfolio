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
 * - Hardware-accelerated WebGL with DPR clamping
 * - Tracks client mouse events anywhere on the page via eventSource
 * - Graceful WebGLFallback for unsupported systems
 */
export default function CanvasContainer({ className = "" }) {
  const [hasWebGL, setHasWebGL] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [rootElement, setRootElement] = useState(null)

  useEffect(() => {
    // 1. Check WebGL support
    if (!isWebGLAvailable()) {
      setHasWebGL(false)
      return
    }

    // 2. Responsive mobile check
    const mobileCheck = () => {
      setIsMobile(window.innerWidth < 768)
    }
    mobileCheck()

    // 3. Accessibility reduced motion check
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionQuery.matches)

    // 4. Attach event source for global mouse tracking
    setRootElement(document.getElementById('root'))

    const handleResize = () => mobileCheck()
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

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden ${className}`}>
      <Canvas
        eventSource={rootElement || undefined}
        eventPrefix="client"
        camera={{
          position: [0, 0, isMobile ? 6.4 : 5.2],
          fov: isMobile ? 46 : 42,
          near: 0.1,
          far: 20
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
          <Scene isMobile={isMobile} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  )
}
