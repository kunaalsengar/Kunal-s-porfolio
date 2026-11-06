import React, { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * CameraRig — Phase 6 Step 5: Three-Tier Responsive Optimization
 * - Seamless choreography across Desktop (>=1024px), Tablet (768-1023px), and Mobile (<768px)
 * - Calibrated coordinates for 320px, 360px, 375px, 390px, 414px, 430px, 768px, 1024px, 1280px, 1440px
 * - Zero clipping on tall/narrow tablet portrait viewports
 * - Native delta-damped smoothing with THREE.MathUtils.damp
 * - Full GSAP lifecycle cleanup via gsap.context()
 */
export default function CameraRig({
  deviceTier = 'desktop',
  isMobile = false,
  isTablet = false,
  reducedMotion = false,
  monolithRef,
  introActive = false
}) {
  const { camera } = useThree()

  // Current interpolated state refs (read in useFrame)
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))

  // Target coordinates interpolated by ScrollTrigger
  const targets = useRef({
    camX: 0,
    camY: 0,
    camZ: 5.2,
    lookX: 0,
    lookY: 0,
    lookZ: 0,
    monoX: 1.75,
    monoY: 0,
    monoZ: 0,
    monoRotX: 0,
    monoRotY: 0,
    monoRotZ: 0,
    monoScale: 1.0,
  })

  // Three-Tier Calibrated Coordinate Matrix
  const getCoordinatesForTier = (tier) => {
    if (tier === 'mobile') {
      return {
        hero: {
          cam: [0, 0, 6.4],
          look: [0, 0, 0],
          monoPos: [0, 0.45, -0.4],
          monoRot: [0, 0, 0],
          monoScale: 0.85,
        },
        about: {
          cam: [0, 0.1, 6.2],
          look: [0, 0, 0],
          monoPos: [0, 0.25, -0.6],
          monoRot: [0.05, 0.7, -0.04],
          monoScale: 0.78,
        },
        skills: {
          cam: [0, 0.4, 6.2],
          look: [0, -0.05, 0],
          monoPos: [0, 0.15, -0.5],
          monoRot: [-0.1, 1.45, 0.08],
          monoScale: 0.75,
        },
        projects: {
          cam: [0, 0.2, 6.2],
          look: [0, 0, 0],
          monoPos: [0, 0.2, -0.6],
          monoRot: [0.1, 2.3, -0.1],
          monoScale: 0.75,
        },
        journey: {
          cam: [0, 0.1, 6.2],
          look: [0, 0, 0],
          monoPos: [0, 0.2, -0.6],
          monoRot: [0, 3.14, 0],
          monoScale: 0.75,
        },
        contact: {
          cam: [0, 0.1, 6.0],
          look: [0, 0, 0],
          monoPos: [0, 0.35, -0.5],
          monoRot: [0.05, 3.8, 0],
          monoScale: 0.75,
        }
      }
    }

    if (tier === 'tablet') {
      return {
        hero: {
          cam: [0, 0, 5.8],
          look: [0, 0, 0],
          monoPos: [0.95, 0.1, -0.1],
          monoRot: [0, 0, 0],
          monoScale: 0.9,
        },
        about: {
          cam: [-0.2, 0.1, 5.2],
          look: [-0.1, 0, 0],
          monoPos: [-0.95, 0.05, -0.2],
          monoRot: [0.05, 0.7, -0.04],
          monoScale: 0.88,
        },
        skills: {
          cam: [0, 0.6, 5.6],
          look: [0, -0.05, 0],
          monoPos: [0, 0, 0.1],
          monoRot: [-0.1, 1.45, 0.08],
          monoScale: 0.85,
        },
        projects: {
          cam: [0.3, -0.2, 5.4],
          look: [0.1, 0, 0],
          monoPos: [0.95, -0.15, -0.2],
          monoRot: [0.1, 2.3, -0.1],
          monoScale: 0.88,
        },
        journey: {
          cam: [-0.3, 0, 5.4],
          look: [-0.1, 0, 0],
          monoPos: [-0.95, 0.05, -0.2],
          monoRot: [0, 3.14, 0],
          monoScale: 0.88,
        },
        contact: {
          cam: [0, -0.15, 5.0],
          look: [0, 0, 0],
          monoPos: [0, 0.15, 0],
          monoRot: [0.05, 3.8, 0],
          monoScale: 0.9,
        }
      }
    }

    // Default Desktop Tier (>= 1024px)
    return {
      hero: {
        cam: [0, 0, 5.2],
        look: [0, 0, 0],
        monoPos: [1.75, 0, 0],
        monoRot: [0, 0, 0],
        monoScale: 1.0,
      },
      about: {
        cam: [-0.35, 0.15, 4.6],
        look: [-0.15, 0, 0],
        monoPos: [-1.55, 0.05, -0.1],
        monoRot: [0.05, 0.7, -0.04],
        monoScale: 0.95,
      },
      skills: {
        cam: [0, 0.85, 5.2],
        look: [0, -0.05, 0],
        monoPos: [0, -0.15, 0.2],
        monoRot: [-0.1, 1.45, 0.08],
        monoScale: 0.92,
      },
      projects: {
        cam: [0.6, -0.3, 4.8],
        look: [0.2, 0, 0],
        monoPos: [1.8, -0.2, -0.2],
        monoRot: [0.1, 2.3, -0.1],
        monoScale: 0.95,
      },
      journey: {
        cam: [-0.5, 0, 5.0],
        look: [-0.2, 0, 0],
        monoPos: [-1.7, 0, 0],
        monoRot: [0, 3.14, 0],
        monoScale: 0.95,
      },
      contact: {
        cam: [0, -0.2, 4.3],
        look: [0, 0, 0],
        monoPos: [0, 0.1, 0],
        monoRot: [0.05, 3.8, 0],
        monoScale: 1.0,
      }
    }
  }

  const coordinates = useRef(getCoordinatesForTier(deviceTier))

  // Dynamically update coordinates when viewport width shifts
  useEffect(() => {
    coordinates.current = getCoordinatesForTier(deviceTier)
  }, [deviceTier])

  // Setup GSAP ScrollTrigger timelines for all section transitions
  useEffect(() => {
    // If reduced motion is requested, snap to initial state and bypass scroll scrub
    if (reducedMotion) {
      const hero = coordinates.current.hero
      camera.position.set(...hero.cam)
      camera.lookAt(...hero.look)
      if (monolithRef?.current) {
        monolithRef.current.position.set(...hero.monoPos)
        monolithRef.current.rotation.set(...hero.monoRot)
        monolithRef.current.scale.setScalar(hero.monoScale)
      }
      return
    }

    const t = targets.current
    const coords = coordinates.current

    // Helper to interpolate between two coordinate states based on progress [0..1]
    const applyInterpolation = (fromState, toState, progress) => {
      const p = Math.max(0, Math.min(1, progress))
      t.camX = THREE.MathUtils.lerp(fromState.cam[0], toState.cam[0], p)
      t.camY = THREE.MathUtils.lerp(fromState.cam[1], toState.cam[1], p)
      t.camZ = THREE.MathUtils.lerp(fromState.cam[2], toState.cam[2], p)

      t.lookX = THREE.MathUtils.lerp(fromState.look[0], toState.look[0], p)
      t.lookY = THREE.MathUtils.lerp(fromState.look[1], toState.look[1], p)
      t.lookZ = THREE.MathUtils.lerp(fromState.look[2], toState.look[2], p)

      t.monoX = THREE.MathUtils.lerp(fromState.monoPos[0], toState.monoPos[0], p)
      t.monoY = THREE.MathUtils.lerp(fromState.monoPos[1], toState.monoPos[1], p)
      t.monoZ = THREE.MathUtils.lerp(fromState.monoPos[2], toState.monoPos[2], p)

      t.monoRotX = THREE.MathUtils.lerp(fromState.monoRot[0], toState.monoRot[0], p)
      t.monoRotY = THREE.MathUtils.lerp(fromState.monoRot[1], toState.monoRot[1], p)
      t.monoRotZ = THREE.MathUtils.lerp(fromState.monoRot[2], toState.monoRot[2], p)

      t.monoScale = THREE.MathUtils.lerp(fromState.monoScale, toState.monoScale, p)
    }

    // Set initial targets to Hero baseline
    applyInterpolation(coords.hero, coords.hero, 1)

    const ctx = gsap.context(() => {
      // 1. Hero → About Transition
      const aboutEl = document.querySelector('#about')
      if (aboutEl) {
        ScrollTrigger.create({
          trigger: '#about',
          start: 'top bottom',
          end: 'top 20%',
          scrub: 1.2,
          onUpdate: (self) => {
            applyInterpolation(coords.hero, coords.about, self.progress)
          }
        })
      }

      // 2. About → Skills Transition
      const skillsEl = document.querySelector('#skills')
      if (skillsEl) {
        ScrollTrigger.create({
          trigger: '#skills',
          start: 'top bottom',
          end: 'top 25%',
          scrub: 1.2,
          onUpdate: (self) => {
            applyInterpolation(coords.about, coords.skills, self.progress)
          }
        })
      }

      // 3. Skills → Projects Transition (The Storefront Horizon)
      const projectsEl = document.querySelector('#projects')
      if (projectsEl) {
        ScrollTrigger.create({
          trigger: '#projects',
          start: 'top bottom',
          end: 'top 25%',
          scrub: 1.2,
          onUpdate: (self) => {
            applyInterpolation(coords.skills, coords.projects, self.progress)
          }
        })
      }

      // 4. Projects → Journey Transition (The Timeline Horizon)
      const journeyEl = document.querySelector('#journey')
      if (journeyEl) {
        ScrollTrigger.create({
          trigger: '#journey',
          start: 'top bottom',
          end: 'top 25%',
          scrub: 1.2,
          onUpdate: (self) => {
            applyInterpolation(coords.projects, coords.journey, self.progress)
          }
        })
      }

      // 5. Journey → Contact Transition (The Singularity Outro)
      const contactEl = document.querySelector('#contact')
      if (contactEl) {
        ScrollTrigger.create({
          trigger: '#contact',
          start: 'top bottom',
          end: 'top 30%',
          scrub: 1.2,
          onUpdate: (self) => {
            applyInterpolation(coords.journey, coords.contact, self.progress)
          }
        })
      }
    })

    return () => ctx.revert()
  }, [camera, deviceTier, reducedMotion, monolithRef])

  // Frame Interpolation Loop (Smooth delta-time damped lerp)
  useFrame((state, delta) => {
    if (reducedMotion || introActive) return

    const t = targets.current
    const dampingSpeed = 3.2

    // 1. Smooth Camera Position Damping
    camera.position.x = THREE.MathUtils.damp(camera.position.x, t.camX, dampingSpeed, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, t.camY, dampingSpeed, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, t.camZ, dampingSpeed, delta)

    // 2. Smooth LookAt Target Damping
    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, t.lookX, dampingSpeed, delta)
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, t.lookY, dampingSpeed, delta)
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, t.lookZ, dampingSpeed, delta)
    camera.lookAt(currentLookAt.current)

    // 3. Smooth Monolith Macro Transform Damping (Outer macro group only)
    if (monolithRef?.current) {
      const mono = monolithRef.current
      mono.position.x = THREE.MathUtils.damp(mono.position.x, t.monoX, dampingSpeed, delta)
      mono.position.y = THREE.MathUtils.damp(mono.position.y, t.monoY, dampingSpeed, delta)
      mono.position.z = THREE.MathUtils.damp(mono.position.z, t.monoZ, dampingSpeed, delta)

      mono.rotation.x = THREE.MathUtils.damp(mono.rotation.x, t.monoRotX, dampingSpeed, delta)
      mono.rotation.y = THREE.MathUtils.damp(mono.rotation.y, t.monoRotY, dampingSpeed, delta)
      mono.rotation.z = THREE.MathUtils.damp(mono.rotation.z, t.monoRotZ, dampingSpeed, delta)

      const currentScale = mono.scale.x
      const newScale = THREE.MathUtils.damp(currentScale, t.monoScale, dampingSpeed, delta)
      mono.scale.setScalar(newScale)
    }
  })

  return null
}
