import React, { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectMonolith3D from './ProjectMonolith3D'

gsap.registerPlugin(ScrollTrigger)

/**
 * Creates a soft radial glow point texture programmatically.
 */
function createStarTexture() {
  if (typeof document === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.2, 'rgba(240, 245, 255, 0.85)')
  gradient.addColorStop(0.5, 'rgba(200, 220, 255, 0.35)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * DotUniverse — Phase 6.7 Cinematic Project Universe
 * Continuous 3D cosmos driving:
 * 1. 8,000-particle celestial starfield
 * 2. Particle coalescence into two floating architectural website environments:
 *    - GamingPCWorld (Cyber Cyan, Left)
 *    - TruPahadi (Himalayan Amber, Right / Deep Perspective)
 * 3. Smooth continuous camera choreography with stable hero hold windows:
 *    - Stage 1: Initial zoom-out into dot cosmos
 *    - Stage 2: Dual-project mid-flight appreciation
 *    - Stage 3: Hero focus on GamingPCWorld (approach + steady hold)
 *    - Stage 4: Smooth transition swing from GamingPCWorld to TruPahadi
 *    - Stage 5: Hero focus on TruPahadi with warm Himalayan amber atmosphere (approach + steady hold)
 * 4. 100% reversible, delta-damped 60 FPS motion
 */
export default function DotUniverse({ reducedMotion = false }) {
  const pointsRef = useRef()
  const himalayanLightRef = useRef()
  const { camera } = useThree()
  const texture = useMemo(() => createStarTexture(), [])

  // Dynamic state targets interpolated by ScrollTrigger
  const targetCam = useRef({
    x: 0,
    y: 0,
    z: 5.0,
    lookX: 0,
    lookY: 0,
    lookZ: 0
  })

  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const universeOpacity = useRef(0.25)
  const himalayanLightIntensity = useRef(0.0)
  const isEngineeringActive = useRef(false)
  const [morphProgress, setMorphProgress] = useState(0)
  const [activeHero, setActiveHero] = useState('none') // 'none' | 'gamingpcworld' | 'trupahadi'

  // Generate 8,000 spatial points with varying depth, scale, and celestial tones
  const { positions, colors, scales } = useMemo(() => {
    const count = 8000
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const sca = new Float32Array(count)

    const colorPalette = [
      new THREE.Color('#ffffff'), // Pure white star
      new THREE.Color('#f8fafc'), // Cool white
      new THREE.Color('#e2e8f0'), // Titanium silver
      new THREE.Color('#cbd5e1'), // Slate starlight
      new THREE.Color('#bae6fd'), // Faint celestial cyan
      new THREE.Color('#fed7aa'), // Warm Himalayan amber stardust
      new THREE.Color('#fef08a'), // Faint warm ember
    ]

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * 125
      pos[i3 + 1] = (Math.random() - 0.5) * 95
      pos[i3 + 2] = -Math.random() * 170 + 15

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      col[i3] = c.r
      col[i3 + 1] = c.g
      col[i3 + 2] = c.b

      sca[i] = Math.random() * 2.2 + 0.8
    }

    return {
      positions: pos,
      colors: col,
      scales: sca
    }
  }, [])

  // Synchronize ScrollTrigger for cinematic camera choreography across all stages
  useEffect(() => {
    if (reducedMotion) {
      camera.position.set(4.2, -0.5, -1.8)
      camera.lookAt(5.8, -0.6, -7.5)
      setMorphProgress(1)
      setActiveHero('trupahadi')
      return
    }

    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      // Baseline initial state
      targetCam.current = {
        x: 0,
        y: 0,
        z: 5.0,
        lookX: 0,
        lookY: 0,
        lookZ: 0
      }

      const targetElement = document.getElementById('project-universe') || document.getElementById('dot-universe')

      // Listen to #engineering-universe to yield camera control
      const engTrigger = document.getElementById('engineering-universe')
      if (engTrigger) {
        const engST = ScrollTrigger.create({
          trigger: engTrigger,
          start: 'top top',
          onEnter: () => {
            isEngineeringActive.current = true
            himalayanLightIntensity.current = 0.0
          },
          onLeaveBack: () => {
            isEngineeringActive.current = false
            himalayanLightIntensity.current = 2.0
          }
        })

        // Check if page mounted while already at or past engineering-universe start
        if (engST.progress > 0 || engTrigger.getBoundingClientRect().top <= 0) {
          isEngineeringActive.current = true
          himalayanLightIntensity.current = 0.0
        }
      }

      if (targetElement) {
        ScrollTrigger.create({
          trigger: targetElement,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress // 0.0 to 1.0

            // STAGE 1: Dot Cosmos Zoom-Out (0.00 -> 0.15)
            if (p < 0.15) {
              const localP = p / 0.15
              targetCam.current.x = 0
              targetCam.current.y = THREE.MathUtils.lerp(0.0, 2.0, localP)
              targetCam.current.z = THREE.MathUtils.lerp(5.0, 28.0, localP)
              targetCam.current.lookX = 0
              targetCam.current.lookY = 0
              targetCam.current.lookZ = 0

              universeOpacity.current = THREE.MathUtils.lerp(0.25, 0.9, localP)
              himalayanLightIntensity.current = 0.0
              setMorphProgress(THREE.MathUtils.lerp(0.0, 0.25, localP))
              setActiveHero('none')
            }
            // STAGE 2: Particle Coalescence & Dual-Project Mid-Flight Perspective (0.15 -> 0.32)
            else if (p < 0.32) {
              const localP = (p - 0.15) / 0.17
              targetCam.current.x = 0
              targetCam.current.y = THREE.MathUtils.lerp(2.0, 1.2, localP)
              targetCam.current.z = THREE.MathUtils.lerp(28.0, 18.0, localP)
              targetCam.current.lookX = 0
              targetCam.current.lookY = 0
              targetCam.current.lookZ = 0

              universeOpacity.current = 0.95
              himalayanLightIntensity.current = 0.1
              setMorphProgress(THREE.MathUtils.lerp(0.25, 1.0, localP))
              setActiveHero('none')
            }
            // STAGE 3: Hero Focus on Project 1 — GamingPCWorld (0.32 -> 0.58)
            else if (p < 0.58) {
              // Approach between 0.32 and 0.44, then hold rock steady between 0.44 and 0.58
              const approachProgress = Math.min(1.0, (p - 0.32) / 0.12)
              const destX = isMobile ? 0 : -1.4
              const destY = isMobile ? 0.5 : 0.1
              const destZ = isMobile ? 7.8 : 5.8
              const destLookX = isMobile ? 0 : -2.4

              targetCam.current.x = THREE.MathUtils.lerp(0, destX, approachProgress)
              targetCam.current.y = THREE.MathUtils.lerp(1.2, destY, approachProgress)
              targetCam.current.z = THREE.MathUtils.lerp(18.0, destZ, approachProgress)
              targetCam.current.lookX = THREE.MathUtils.lerp(0, destLookX, approachProgress)
              targetCam.current.lookY = THREE.MathUtils.lerp(0, destY, approachProgress)
              targetCam.current.lookZ = 0

              universeOpacity.current = THREE.MathUtils.lerp(0.95, 0.65, approachProgress)
              himalayanLightIntensity.current = 0.15
              setMorphProgress(1.0)
              setActiveHero('gamingpcworld')
            }
            // STAGE 4: Smooth Transition Swing from GamingPCWorld to TruPahadi (0.58 -> 0.74)
            else if (p < 0.74) {
              const localP = (p - 0.58) / 0.16
              // Start from GamingPCWorld focus
              const startX = isMobile ? 0 : -1.4
              const startY = isMobile ? 0.5 : 0.1
              const startZ = isMobile ? 7.8 : 5.8
              const startLookX = isMobile ? 0 : -2.4

              // End at TruPahadi focus
              const endX = isMobile ? 5.8 : 4.2
              const endY = isMobile ? -0.2 : -0.5
              const endZ = isMobile ? 0.2 : -1.8
              const endLookX = 5.8
              const endLookY = -0.6
              const endLookZ = -7.5

              // Smooth curved interpolation through 3D space
              targetCam.current.x = THREE.MathUtils.lerp(startX, endX, localP)
              targetCam.current.y = THREE.MathUtils.lerp(startY, endY, localP)
              targetCam.current.z = THREE.MathUtils.lerp(startZ, endZ, localP)
              targetCam.current.lookX = THREE.MathUtils.lerp(startLookX, endLookX, localP)
              targetCam.current.lookY = THREE.MathUtils.lerp(0, endLookY, localP)
              targetCam.current.lookZ = THREE.MathUtils.lerp(0, endLookZ, localP)

              universeOpacity.current = 0.75
              // Gradually illuminate warm Himalayan amber light
              himalayanLightIntensity.current = THREE.MathUtils.lerp(0.15, 1.8, localP)
              setActiveHero('none')
            }
            // STAGE 5: Hero Focus on Project 2 — TruPahadi (0.74 -> 1.00)
            else {
              // Approach between 0.74 and 0.84, then hold rock steady between 0.84 and 1.00
              const approachProgress = Math.min(1.0, (p - 0.74) / 0.10)
              const destX = isMobile ? 5.8 : 4.2
              const destY = isMobile ? -0.2 : -0.5
              const destZ = isMobile ? 0.2 : -1.8
              const destLookX = 5.8
              const destLookY = -0.6
              const destLookZ = -7.5

              targetCam.current.x = destX
              targetCam.current.y = destY
              targetCam.current.z = destZ
              targetCam.current.lookX = destLookX
              targetCam.current.lookY = destLookY
              targetCam.current.lookZ = destLookZ

              universeOpacity.current = 0.65
              himalayanLightIntensity.current = 2.0
              setMorphProgress(1.0)
              setActiveHero('trupahadi')
            }
          }
        })
      }
    })

    return () => ctx.revert()
  }, [camera, reducedMotion])

  // Continuous frame loop with delta-smoothed camera motion
  useFrame((state, delta) => {
    if (pointsRef.current) {
      if (!reducedMotion) {
        pointsRef.current.rotation.y += delta * 0.012
        pointsRef.current.rotation.x += delta * 0.003
      }

      if (pointsRef.current.material) {
        pointsRef.current.material.opacity = THREE.MathUtils.damp(
          pointsRef.current.material.opacity,
          universeOpacity.current,
          4.0,
          delta
        )
      }
    }

    // Smooth Himalayan ambient amber light intensity
    if (himalayanLightRef.current) {
      himalayanLightRef.current.intensity = THREE.MathUtils.damp(
        himalayanLightRef.current.intensity,
        himalayanLightIntensity.current,
        3.5,
        delta
      )
    }

    // Delta-time damped smooth camera flythrough
    if (!reducedMotion && !isEngineeringActive.current) {
      const t = targetCam.current
      camera.position.x = THREE.MathUtils.damp(camera.position.x, t.x, 3.2, delta)
      camera.position.y = THREE.MathUtils.damp(camera.position.y, t.y, 3.2, delta)
      camera.position.z = THREE.MathUtils.damp(camera.position.z, t.z, 3.2, delta)

      currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, t.lookX, 3.2, delta)
      currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, t.lookY, 3.2, delta)
      currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, t.lookZ, 3.2, delta)

      camera.lookAt(currentLookAt.current)
    }
  })

  return (
    <>
      {/* 1. Deep 8,000-Point Celestial Particle Cosmos */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={1.6}
          vertexColors
          map={texture}
          transparent
          opacity={0.3}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* 2. Warm Himalayan Mountain Lighting (Sweeps in during Stages 4 & 5) */}
      <pointLight
        ref={himalayanLightRef}
        position={[6.5, 0.5, -5.5]}
        color="#ff9f1c"
        intensity={0.0}
        distance={25}
        decay={2}
      />

      {/* 3. PROJECT 1: GamingPCWorld (Cyber Cyan, Left / Foreground Hero in Stage 3) */}
      <ProjectMonolith3D
        texturePath="/images/projects/gamingpcworld_hero.png"
        accentColor="#00f0ff"
        width={5.6}
        height={3.5}
        position={[-2.6, 0.1, 0]}
        rotation={[0.02, 0.08, -0.01]}
        morphProgress={morphProgress}
        isHero={activeHero === 'gamingpcworld'}
        reducedMotion={reducedMotion}
      />

      {/* 4. PROJECT 2: TruPahadi (Himalayan Amber, Right / Hero Focus in Stage 5) */}
      <ProjectMonolith3D
        texturePath="/images/projects/trupahadi_hero.png"
        accentColor="#ff9f1c"
        width={5.6}
        height={3.5}
        position={[5.8, -0.6, -7.5]}
        rotation={[-0.04, -0.22, 0.02]}
        morphProgress={morphProgress}
        isHero={activeHero === 'trupahadi'}
        reducedMotion={reducedMotion}
      />
    </>
  )
}
