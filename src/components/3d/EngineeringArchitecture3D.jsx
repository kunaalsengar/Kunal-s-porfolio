import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * EngineeringArchitecture3D — Phase 6.8 Refined
 * Bespoke Animated 3D Visual Objects for Kunal Sengar's Digital Architecture:
 * 1. Frontend: Assembling modular UI panels, responsive grid cards, and component hierarchy
 * 2. Backend: Central processing core, dual server rings, and animated API packet flows
 * 3. Database: Tiered database cylinders, schema entities, and animated CRUD data blocks
 * 4. Commerce: 3D storefront pavilion, floating product tiles, and gliding shopping cart
 * 5. Mobile: Sculpted titanium smartphone with animated screen UI and Flutter thread rings
 * 6. Unified Architecture: Central Master Core with 5 volumetric conduits converging in panoramic flight
 */
export default function EngineeringArchitecture3D({ reducedMotion = false, onActiveStageChange }) {
  const { camera } = useThree()
  const masterGroupRef = useRef()

  // References for category animations
  const frontendRef = useRef()
  const backendRef = useRef()
  const databaseRef = useRef()
  const commerceRef = useRef()
  const mobileRef = useRef()
  const unifiedRef = useRef()

  // Dynamic camera targets for the 7 stages of engineering exploration
  const targetCam = useRef({
    x: 0,
    y: 0,
    z: -26,
    lookX: 0,
    lookY: 0,
    lookZ: -42
  })

  const currentLookAt = useRef(new THREE.Vector3(0, 0, -42))
  const isEngActive = useRef(false)
  const isYieldedToProfessional = useRef(false)

  // Stage camera waypoints matrix (Desktop coordinates)
  const stageWaypoints = useMemo(() => [
    // Stage 1: Transition into Engineering Realm (p: 0.00 - 0.14)
    { pos: [0.0, 1.5, -26], look: [0, 0, -42] },
    // Stage 2: Frontend Layer (p: 0.14 - 0.30) — Focus on UI Assembly
    { pos: [-1.4, 1.2, -33], look: [-3.5, 1.2, -38] },
    // Stage 3: Backend & API Layer (p: 0.30 - 0.46) — Focus on API Processing Engine
    { pos: [1.2, -0.6, -42], look: [3.2, -0.8, -48] },
    // Stage 4: Database Matrix Layer (p: 0.46 - 0.62) — Focus on Data Storage & CRUD
    { pos: [-1.0, -0.8, -52], look: [-2.8, -1.0, -58] },
    // Stage 5: Commerce & CMS Layer (p: 0.62 - 0.76) — Focus on Storefront & Cart
    { pos: [1.2, 0.8, -60], look: [3.0, 1.0, -66] },
    // Stage 6: Mobile Development Layer (p: 0.76 - 0.88) — Focus on Smartphone & Flutter
    { pos: [-0.8, -0.2, -69], look: [-2.6, -0.4, -74] },
    // Stage 7: Unified Panoramic Architecture (p: 0.88 - 1.00) — Panoramic Overview
    { pos: [0.0, 5.5, -45], look: [0.0, 0.5, -56] }
  ], [])

  // Synchronize ScrollTrigger on #engineering-universe
  useEffect(() => {
    if (reducedMotion) return

    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      const triggerEl = document.getElementById('engineering-universe')
      if (!triggerEl) return

      const engST = ScrollTrigger.create({
        trigger: triggerEl,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onEnter: () => {
          isEngActive.current = true
        },
        onLeaveBack: () => {
          isEngActive.current = false
        },
        onUpdate: (self) => {
          isEngActive.current = true
          const p = Math.max(0, Math.min(1, self.progress)) // 0.0 to 1.0

          let s = 1
          let fromWP = stageWaypoints[0]
          let toWP = stageWaypoints[0]
          let localP = 0

          // Stage 1: Transition (0.00 -> 0.14)
          if (p < 0.14) {
            s = 1
            localP = p / 0.14
            fromWP = { pos: [4.2, -0.5, -1.8], look: [5.8, -0.6, -7.5] } // Seamless exit from TruPahadi
            toWP = stageWaypoints[0]
          }
          // Stage 2: Frontend (0.14 -> 0.30)
          else if (p < 0.30) {
            s = 2
            localP = (p - 0.14) / 0.16
            fromWP = stageWaypoints[0]
            toWP = stageWaypoints[1]
          }
          // Stage 3: Backend (0.30 -> 0.46)
          else if (p < 0.46) {
            s = 3
            localP = (p - 0.30) / 0.16
            fromWP = stageWaypoints[1]
            toWP = stageWaypoints[2]
          }
          // Stage 4: Database (0.46 -> 0.62)
          else if (p < 0.62) {
            s = 4
            localP = (p - 0.46) / 0.16
            fromWP = stageWaypoints[2]
            toWP = stageWaypoints[3]
          }
          // Stage 5: Commerce (0.62 -> 0.76)
          else if (p < 0.76) {
            s = 5
            localP = (p - 0.62) / 0.14
            fromWP = stageWaypoints[3]
            toWP = stageWaypoints[4]
          }
          // Stage 6: Mobile (0.76 -> 0.88)
          else if (p < 0.88) {
            s = 6
            localP = (p - 0.76) / 0.12
            fromWP = stageWaypoints[4]
            toWP = stageWaypoints[5]
          }
          // Stage 7: Unified Architecture (0.88 -> 1.00)
          else {
            s = 7
            localP = (p - 0.88) / 0.12
            fromWP = stageWaypoints[5]
            toWP = stageWaypoints[6]
          }

          onActiveStageChange?.(s)

          // Smoothly interpolate position and lookAt coordinates
          const clampedP = Math.max(0, Math.min(1, localP))
          const posXOffset = isMobile ? (toWP.pos[0] * 0.35) : toWP.pos[0]
          const fromXOffset = isMobile ? (fromWP.pos[0] * 0.35) : fromWP.pos[0]

          targetCam.current.x = THREE.MathUtils.lerp(fromXOffset, posXOffset, clampedP)
          targetCam.current.y = THREE.MathUtils.lerp(fromWP.pos[1], toWP.pos[1], clampedP)
          targetCam.current.z = THREE.MathUtils.lerp(fromWP.pos[2], toWP.pos[2], clampedP)

          targetCam.current.lookX = THREE.MathUtils.lerp(fromWP.look[0], toWP.look[0], clampedP)
          targetCam.current.lookY = THREE.MathUtils.lerp(fromWP.look[1], toWP.look[1], clampedP)
          targetCam.current.lookZ = THREE.MathUtils.lerp(fromWP.look[2], toWP.look[2], clampedP)
        }
      })

      // Check if page mounted while already at or past engineering-universe start
      if (engST.progress > 0 || triggerEl.getBoundingClientRect().top <= 0) {
        isEngActive.current = true
      }

      // Listen to #professional-experience to yield camera control seamlessly
      const profTrigger = document.getElementById('professional-experience')
      if (profTrigger) {
        const profST = ScrollTrigger.create({
          trigger: profTrigger,
          start: 'top top',
          onEnter: () => {
            isYieldedToProfessional.current = true
          },
          onLeaveBack: () => {
            isYieldedToProfessional.current = false
          }
        })

        if (profST.progress > 0 || profTrigger.getBoundingClientRect().top <= 0) {
          isYieldedToProfessional.current = true
        }
      }
    })

    return () => ctx.revert()
  }, [reducedMotion, stageWaypoints, onActiveStageChange])

  // Frame Loop — Camera Smooth Tracking & Category Animations
  useFrame((state, delta) => {
    // 0. Graceful Transition: Sink engineering models out of frame when entering Professional Experience
    if (masterGroupRef.current) {
      const targetY = isYieldedToProfessional.current ? -55 : 0
      masterGroupRef.current.position.y = THREE.MathUtils.damp(masterGroupRef.current.position.y, targetY, 3.5, delta)
      masterGroupRef.current.visible = masterGroupRef.current.position.y > -50
    }

    // 1. Camera Flythrough
    if (!reducedMotion && isEngActive.current && !isYieldedToProfessional.current) {
      const t = targetCam.current
      camera.position.x = THREE.MathUtils.damp(camera.position.x, t.x, 3.2, delta)
      camera.position.y = THREE.MathUtils.damp(camera.position.y, t.y, 3.2, delta)
      camera.position.z = THREE.MathUtils.damp(camera.position.z, t.z, 3.2, delta)

      currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, t.lookX, 3.2, delta)
      currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, t.lookY, 3.2, delta)
      currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, t.lookZ, 3.2, delta)

      camera.lookAt(currentLookAt.current)
    }

    if (reducedMotion) return
    const time = state.clock.getElapsedTime()

    // 2. STAGE 1 ANIMATION: Frontend Component Assembly Motion
    if (frontendRef.current) {
      const g = frontendRef.current
      g.rotation.y = 0.22 + Math.sin(time * 0.8) * 0.04
      g.rotation.x = 0.04 + Math.cos(time * 0.9) * 0.03
      // Staggered component block float
      if (g.userData.modules) {
        g.userData.modules.forEach((mod, i) => {
          if (mod) {
            mod.position.y = mod.userData.baseY + Math.sin(time * 1.8 + i * 0.9) * 0.04
            mod.position.z = mod.userData.baseZ + Math.cos(time * 1.5 + i * 0.7) * 0.03
          }
        })
      }
    }

    // 3. STAGE 2 ANIMATION: Backend Core, Rotating Rings & Traveling API Packets
    if (backendRef.current) {
      const b = backendRef.current
      if (b.userData.ring1) b.userData.ring1.rotation.z += delta * 0.6
      if (b.userData.ring2) b.userData.ring2.rotation.x += delta * 0.45
      if (b.userData.core) {
        b.userData.core.rotation.y += delta * 0.5
        b.userData.core.rotation.z += delta * 0.3
      }
      // Traveling API Packets
      if (b.userData.packets) {
        b.userData.packets.forEach((pkt, i) => {
          if (pkt) {
            const travelProgress = (Math.sin(time * 2.8 + i * 1.5) + 1) / 2
            const start = pkt.userData.startPos
            pkt.position.x = THREE.MathUtils.lerp(start[0], 0, travelProgress)
            pkt.position.y = THREE.MathUtils.lerp(start[1], 0, travelProgress)
            pkt.position.z = THREE.MathUtils.lerp(start[2], 0, travelProgress)
          }
        })
      }
    }

    // 4. STAGE 3 ANIMATION: Database Tier Pulse & Dynamic CRUD Blocks
    if (databaseRef.current) {
      const db = databaseRef.current
      db.rotation.y = 0.15 + Math.sin(time * 0.7) * 0.05
      if (db.userData.crudBlocks) {
        db.userData.crudBlocks.forEach((cube, i) => {
          if (cube) {
            if (i === 0) {
              // Write/Insert block descending into top tier
              cube.position.y = 0.9 + Math.sin(time * 2.2) * 0.35
            } else if (i === 1) {
              // Read/Query block emerging from middle tier
              cube.position.x = 1.2 + Math.sin(time * 2.5) * 0.45
            } else if (i === 2) {
              // Orbiting indexing block around base tier
              const angle = time * 2.0
              cube.position.x = Math.cos(angle) * 1.4
              cube.position.z = Math.sin(angle) * 1.4
            }
          }
        })
      }
    }

    // 5. STAGE 4 ANIMATION: Storefront Gliding Shopping Cart & Floating Products
    if (commerceRef.current) {
      const c = commerceRef.current
      c.rotation.y = -0.2 + Math.sin(time * 0.6) * 0.04
      // Gliding shopping cart
      if (c.userData.cart) {
        c.userData.cart.position.x = Math.sin(time * 1.4) * 0.75
      }
      // Floating product cards
      if (c.userData.products) {
        c.userData.products.forEach((p, i) => {
          if (p) {
            p.position.y = p.userData.baseY + Math.sin(time * 1.8 + i * 1.2) * 0.05
            p.rotation.z = Math.sin(time * 1.2 + i) * 0.04
          }
        })
      }
    }

    // 6. STAGE 5 ANIMATION: Mobile Phone Precession & Animated Screen UI Cards
    if (mobileRef.current) {
      const m = mobileRef.current
      m.rotation.y = 0.18 + Math.sin(time * 0.9) * 0.12
      m.rotation.x = 0.04 + Math.cos(time * 0.8) * 0.05
      // Orbiting Flutter thread rings
      if (m.userData.threadRing1) m.userData.threadRing1.rotation.z += delta * 0.8
      if (m.userData.threadRing2) m.userData.threadRing2.rotation.y += delta * 0.6
      // Sliding screen feed cards
      if (m.userData.screenCards) {
        m.userData.screenCards.forEach((card, i) => {
          if (card) {
            card.position.y = card.userData.baseY + Math.sin(time * 1.7 + i * 1.6) * 0.12
          }
        })
      }
    }

    // 7. STAGE 6 ANIMATION: Unified Master Core Gyroscope & Converging Cyber Conduits
    if (unifiedRef.current) {
      const u = unifiedRef.current
      if (u.userData.core) {
        u.userData.core.rotation.y += delta * 0.4
        u.userData.core.rotation.x += delta * 0.25
      }
      if (u.userData.gyroRing) {
        u.userData.gyroRing.rotation.z += delta * 0.5
      }
    }
  })

  // Helper refs registration callbacks
  const registerModule = (el, baseY, baseZ) => {
    if (el && frontendRef.current) {
      if (!frontendRef.current.userData.modules) frontendRef.current.userData.modules = []
      el.userData.baseY = baseY
      el.userData.baseZ = baseZ
      if (!frontendRef.current.userData.modules.includes(el)) frontendRef.current.userData.modules.push(el)
    }
  }

  const registerPacket = (el, startPos) => {
    if (el && backendRef.current) {
      if (!backendRef.current.userData.packets) backendRef.current.userData.packets = []
      el.userData.startPos = startPos
      if (!backendRef.current.userData.packets.includes(el)) backendRef.current.userData.packets.push(el)
    }
  }

  const registerCrudBlock = (el) => {
    if (el && databaseRef.current) {
      if (!databaseRef.current.userData.crudBlocks) databaseRef.current.userData.crudBlocks = []
      if (!databaseRef.current.userData.crudBlocks.includes(el)) databaseRef.current.userData.crudBlocks.push(el)
    }
  }

  const registerProduct = (el, baseY) => {
    if (el && commerceRef.current) {
      if (!commerceRef.current.userData.products) commerceRef.current.userData.products = []
      el.userData.baseY = baseY
      if (!commerceRef.current.userData.products.includes(el)) commerceRef.current.userData.products.push(el)
    }
  }

  const registerScreenCard = (el, baseY) => {
    if (el && mobileRef.current) {
      if (!mobileRef.current.userData.screenCards) mobileRef.current.userData.screenCards = []
      el.userData.baseY = baseY
      if (!mobileRef.current.userData.screenCards.includes(el)) mobileRef.current.userData.screenCards.push(el)
    }
  }

  return (
    <group ref={masterGroupRef}>

      {/* Precision Atmospheric Lighting for Digital Architecture */}
      <ambientLight intensity={0.65} color="#0f172a" />
      <directionalLight position={[0, 14, -35]} intensity={2.6} color="#ffffff" />
      <directionalLight position={[-12, -4, -50]} intensity={1.8} color="#38bdf8" />
      <directionalLight position={[12, -4, -60]} intensity={1.8} color="#10b981" />

      {/* ======================================================== */}
      {/* 1. COMPONENT ARCHITECTURE & UI SYSTEM (Cyan #38bdf8)     */}
      {/* Position: [-3.5, 1.2, -38]                               */}
      {/* ======================================================== */}
      <group
        ref={frontendRef}
        position={[-3.5, 1.2, -38]}
        rotation={[0.04, 0.22, -0.02]}
      >
        {/* Main Viewport Smoked Glass Canvas */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4.2, 2.7, 0.08]} />
          <meshPhysicalMaterial
            color="#070a14"
            roughness={0.15}
            metalness={0.2}
            transmission={0.65}
            thickness={0.8}
            transparent
            opacity={0.92}
          />
        </mesh>
        {/* Luminous Outer Glass Edges */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(4.22, 2.72, 0.1)]} />
          <lineBasicMaterial color="#38bdf8" transparent opacity={0.8} />
        </lineSegments>

        {/* Top Navigation Bar Component Module */}
        <group ref={(el) => registerModule(el, 1.05, 0.14)} position={[0, 1.05, 0.14]}>
          <mesh>
            <boxGeometry args={[3.8, 0.36, 0.06]} />
            <meshStandardMaterial color="#0c1d33" roughness={0.2} metalness={0.85} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(3.82, 0.38, 0.08)]} />
            <lineBasicMaterial color="#38bdf8" transparent opacity={0.6} />
          </lineSegments>
          {/* Search bar slot & profile avatar pill */}
          <mesh position={[-0.8, 0, 0.04]}>
            <boxGeometry args={[1.4, 0.18, 0.02]} />
            <meshBasicMaterial color="#1e3a5f" />
          </mesh>
          <mesh position={[1.5, 0, 0.04]}>
            <cylinderGeometry args={[0.1, 0.1, 0.04, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>

        {/* Sidebar Navigation Component Module */}
        <group ref={(el) => registerModule(el, -0.22, 0.14)} position={[-1.4, -0.22, 0.14]}>
          <mesh>
            <boxGeometry args={[0.85, 1.7, 0.06]} />
            <meshStandardMaterial color="#0b1728" roughness={0.25} metalness={0.8} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.87, 1.72, 0.08)]} />
            <lineBasicMaterial color="#38bdf8" transparent opacity={0.5} />
          </lineSegments>
          {/* 3 Nav item bars */}
          {[-0.5, 0.0, 0.5].map((y, idx) => (
            <mesh key={idx} position={[0, y, 0.04]}>
              <boxGeometry args={[0.65, 0.18, 0.02]} />
              <meshBasicMaterial color={idx === 1 ? '#38bdf8' : '#1e293b'} />
            </mesh>
          ))}
        </group>

        {/* Hero Banner Component Block */}
        <group ref={(el) => registerModule(el, 0.32, 0.15)} position={[0.5, 0.32, 0.15]}>
          <mesh>
            <boxGeometry args={[2.55, 0.8, 0.06]} />
            <meshStandardMaterial color="#0c1d33" roughness={0.2} metalness={0.85} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(2.57, 0.82, 0.08)]} />
            <lineBasicMaterial color="#38bdf8" transparent opacity={0.65} />
          </lineSegments>
          {/* Hero text bar & badge */}
          <mesh position={[-0.4, 0.12, 0.04]}>
            <boxGeometry args={[1.4, 0.16, 0.02]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[-0.55, -0.14, 0.04]}>
            <boxGeometry args={[1.1, 0.12, 0.02]} />
            <meshBasicMaterial color="#94a3b8" />
          </mesh>
        </group>

        {/* Responsive Grid Card Module A */}
        <group ref={(el) => registerModule(el, -0.58, 0.14)} position={[-0.15, -0.58, 0.14]}>
          <mesh>
            <boxGeometry args={[1.2, 0.72, 0.06]} />
            <meshStandardMaterial color="#081424" roughness={0.2} metalness={0.85} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.22, 0.74, 0.08)]} />
            <lineBasicMaterial color="#38bdf8" transparent opacity={0.6} />
          </lineSegments>
          <mesh position={[0, 0.12, 0.04]}>
            <boxGeometry args={[0.85, 0.18, 0.02]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>
          <mesh position={[0, -0.15, 0.04]}>
            <boxGeometry args={[0.85, 0.12, 0.02]} />
            <meshBasicMaterial color="#64748b" />
          </mesh>
        </group>

        {/* Responsive Grid Card Module B */}
        <group ref={(el) => registerModule(el, -0.58, 0.14)} position={[1.15, -0.58, 0.14]}>
          <mesh>
            <boxGeometry args={[1.2, 0.72, 0.06]} />
            <meshStandardMaterial color="#081424" roughness={0.2} metalness={0.85} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.22, 0.74, 0.08)]} />
            <lineBasicMaterial color="#38bdf8" transparent opacity={0.6} />
          </lineSegments>
          <mesh position={[0, 0.12, 0.04]}>
            <boxGeometry args={[0.85, 0.18, 0.02]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>
          <mesh position={[0, -0.15, 0.04]}>
            <boxGeometry args={[0.85, 0.12, 0.02]} />
            <meshBasicMaterial color="#64748b" />
          </mesh>
        </group>

        {/* Kinetic Reactive CTA Button Pill */}
        <mesh position={[1.35, 0.28, 0.22]}>
          <boxGeometry args={[0.65, 0.24, 0.08]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Illuminated Component Hierarchy Lines */}
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={4}
              array={new Float32Array([
                -1.4, 0.6, 0.1,  -0.7, 0.6, 0.1,
                -0.7, 0.32, 0.1, -0.4, 0.32, 0.1
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#38bdf8" transparent opacity={0.7} />
        </line>

        {/* Reactive Cyan Core Point Light */}
        <pointLight color="#38bdf8" intensity={2.5} distance={10} decay={2} position={[0, 0, 0.9]} />
      </group>

      {/* ======================================================== */}
      {/* 2. BACKEND & API ENGINE (Emerald #10b981)                */}
      {/* Position: [3.2, -0.8, -48]                               */}
      {/* ======================================================== */}
      <group
        ref={backendRef}
        position={[3.2, -0.8, -48]}
        rotation={[-0.05, -0.25, 0.02]}
      >
        {/* Dual Rotating Concentric Titanium Server Rings */}
        <mesh
          ref={(el) => { if (backendRef.current) backendRef.current.userData.ring1 = el }}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[2.0, 0.07, 16, 64]} />
          <meshStandardMaterial color="#10b981" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh
          ref={(el) => { if (backendRef.current) backendRef.current.userData.ring2 = el }}
          rotation={[Math.PI / 3, Math.PI / 4, 0]}
        >
          <torusGeometry args={[1.5, 0.05, 16, 48]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.95} />
        </mesh>

        {/* Central Asynchronous Processing Core */}
        <group ref={(el) => { if (backendRef.current) backendRef.current.userData.core = el }}>
          <mesh>
            <octahedronGeometry args={[0.85, 0]} />
            <meshPhysicalMaterial
              color="#064e3b"
              roughness={0.15}
              metalness={0.3}
              transmission={0.7}
              thickness={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.OctahedronGeometry(0.87, 0)]} />
            <lineBasicMaterial color="#10b981" transparent opacity={0.85} />
          </lineSegments>
          {/* Inner pulsating core */}
          <mesh>
            <octahedronGeometry args={[0.45, 0]} />
            <meshBasicMaterial color="#34d399" wireframe />
          </mesh>
        </group>

        {/* 4 Orbiting Service Nodes (Auth, Gateway, Router, Controller) */}
        {[
          { pos: [-1.6, 0.8, 0.5], label: 'Auth' },
          { pos: [1.6, 0.8, -0.5], label: 'Gateway' },
          { pos: [-1.4, -0.9, -0.6], label: 'Router' },
          { pos: [1.5, -0.9, 0.6], label: 'Controller' }
        ].map((node, idx) => (
          <group key={idx} position={node.pos}>
            <mesh>
              <boxGeometry args={[0.55, 0.55, 0.55]} />
              <meshStandardMaterial color="#062e24" roughness={0.25} metalness={0.85} />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(0.57, 0.57, 0.57)]} />
              <lineBasicMaterial color="#10b981" transparent opacity={0.7} />
            </lineSegments>
            {/* Service Node Status LED */}
            <mesh position={[0, 0, 0.3]}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
            {/* Conduit Line to Central Core */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([0, 0, 0, -node.pos[0], -node.pos[1], -node.pos[2]])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#10b981" transparent opacity={0.4} />
            </line>
            {/* Animated API Packet Traveling On Conduit */}
            <mesh ref={(el) => registerPacket(el, node.pos)}>
              <octahedronGeometry args={[0.12, 0]} />
              <meshBasicMaterial color="#6ee7b7" />
            </mesh>
          </group>
        ))}

        {/* Dynamic API Pulse Point Light */}
        <pointLight color="#10b981" intensity={2.8} distance={12} decay={2} position={[0, 0, 0.8]} />
      </group>

      {/* ======================================================== */}
      {/* 3. DATABASE ARCHITECTURE (Amber #f59e0b)                 */}
      {/* Position: [-2.8, -1.0, -58]                              */}
      {/* ======================================================== */}
      <group
        ref={databaseRef}
        position={[-2.8, -1.0, -58]}
        rotation={[0.08, 0.15, -0.04]}
      >
        {/* Tiered Cylindrical Relational Storage Disks */}
        {[-0.48, 0.0, 0.48].map((y, i) => (
          <group key={i} position={[0, y, 0]}>
            <mesh>
              <cylinderGeometry args={[1.05, 1.05, 0.32, 32]} />
              <meshStandardMaterial color="#1c140a" roughness={0.25} metalness={0.9} />
            </mesh>
            {/* Glowing amber layer separator ring */}
            <lineSegments>
              <edgesGeometry args={[new THREE.CylinderGeometry(1.07, 1.07, 0.33, 32)]} />
              <lineBasicMaterial color="#f59e0b" transparent opacity={0.8} />
            </lineSegments>
            {/* Storage LED indicators on the perimeter */}
            {[-0.5, 0, 0.5].map((angleOff, j) => (
              <mesh
                key={j}
                position={[
                  Math.sin(angleOff) * 1.06,
                  0,
                  Math.cos(angleOff) * 1.06
                ]}
              >
                <sphereGeometry args={[0.045, 8, 8]} />
                <meshBasicMaterial color="#fbbf24" />
              </mesh>
            ))}
          </group>
        ))}

        {/* Floating Relational Schema Entities (Mongoose Schemas / Tables) */}
        <group position={[-1.7, 0.5, 0.4]}>
          <mesh>
            <boxGeometry args={[0.75, 0.55, 0.55]} />
            <meshStandardMaterial color="#291b07" roughness={0.25} metalness={0.85} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.77, 0.57, 0.57)]} />
            <lineBasicMaterial color="#f59e0b" transparent opacity={0.7} />
          </lineSegments>
          {/* Relational Conduit to Database */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, 1.7, -0.5, -0.4])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#f59e0b" transparent opacity={0.45} />
          </line>
        </group>

        <group position={[1.7, -0.3, -0.4]}>
          <mesh>
            <boxGeometry args={[0.75, 0.55, 0.55]} />
            <meshStandardMaterial color="#291b07" roughness={0.25} metalness={0.85} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.77, 0.57, 0.57)]} />
            <lineBasicMaterial color="#f59e0b" transparent opacity={0.7} />
          </lineSegments>
          {/* Relational Conduit to Database */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, -1.7, 0.3, 0.4])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#f59e0b" transparent opacity={0.45} />
          </line>
        </group>

        {/* Animated CRUD Data Blocks */}
        {/* Block 0: Write operation descending into top disk */}
        <mesh ref={registerCrudBlock} position={[0, 1.1, 0]}>
          <boxGeometry args={[0.24, 0.24, 0.24]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
        {/* Block 1: Read operation querying out to entity */}
        <mesh ref={registerCrudBlock} position={[1.2, 0, 0]}>
          <boxGeometry args={[0.22, 0.22, 0.22]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
        {/* Block 2: Indexing block orbiting base disk */}
        <mesh ref={registerCrudBlock} position={[1.4, -0.48, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>

        {/* Warm Amber Core Point Light */}
        <pointLight color="#f59e0b" intensity={2.8} distance={12} decay={2} position={[0, 0.2, 0.8]} />
      </group>

      {/* ======================================================== */}
      {/* 4. STOREFRONTS & CMS ECOSYSTEM (Purple #a855f7)          */}
      {/* Position: [3.0, 1.0, -66]                                */}
      {/* ======================================================== */}
      <group
        ref={commerceRef}
        position={[3.0, 1.0, -66]}
        rotation={[-0.06, -0.2, 0.03]}
      >
        {/* Architectural Storefront Pavilion Architecture */}
        {/* Left & Right Fluted Titanium Pillars */}
        {[-1.25, 1.25].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.32, 3.2, 0.32]} />
            <meshStandardMaterial color="#1e1136" roughness={0.25} metalness={0.9} />
          </mesh>
        ))}

        {/* Overhead Liquid Templating Canopy Arch */}
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[2.8, 0.38, 0.7]} />
          <meshStandardMaterial color="#581c87" roughness={0.25} metalness={0.8} />
        </mesh>
        <lineSegments position={[0, 1.6, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(2.82, 0.4, 0.72)]} />
          <lineBasicMaterial color="#c084fc" transparent opacity={0.8} />
        </lineSegments>

        {/* Lower Storefront Deck */}
        <mesh position={[0, -1.5, 0]}>
          <boxGeometry args={[2.8, 0.16, 1.1]} />
          <meshStandardMaterial color="#190e2c" roughness={0.3} metalness={0.85} />
        </mesh>

        {/* Floating Product Tiles (Showcasing E-Commerce Grid) */}
        {[-0.6, 0.6].map((x, i) => (
          <group
            key={i}
            ref={(el) => registerProduct(el, 0.35)}
            position={[x, 0.35, 0.15]}
          >
            <mesh>
              <boxGeometry args={[0.65, 0.85, 0.06]} />
              <meshStandardMaterial color="#2e1065" roughness={0.2} metalness={0.8} />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(0.67, 0.87, 0.08)]} />
              <lineBasicMaterial color="#c084fc" transparent opacity={0.65} />
            </lineSegments>
            {/* Product image placeholder & price badge */}
            <mesh position={[0, 0.14, 0.04]}>
              <boxGeometry args={[0.48, 0.38, 0.02]} />
              <meshBasicMaterial color="#7e22ce" />
            </mesh>
            <mesh position={[0, -0.22, 0.04]}>
              <boxGeometry args={[0.42, 0.12, 0.02]} />
              <meshBasicMaterial color="#a855f7" />
            </mesh>
          </group>
        ))}

        {/* Animated Gliding 3D Shopping Cart Mesh */}
        <group
          ref={(el) => { if (commerceRef.current) commerceRef.current.userData.cart = el }}
          position={[0, -1.2, 0.2]}
        >
          {/* Wireframe basket */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.5, 0.36, 0.36)]} />
            <lineBasicMaterial color="#e9d5ff" transparent opacity={0.9} />
          </lineSegments>
          {/* Cart handle */}
          <mesh position={[-0.26, 0.18, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
            <meshBasicMaterial color="#c084fc" />
          </mesh>
          {/* 4 Wheels */}
          {[[-0.18, -0.2, 0.16], [0.18, -0.2, 0.16], [-0.18, -0.2, -0.16], [0.18, -0.2, -0.16]].map((wp, widx) => (
            <mesh key={widx} position={wp}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshBasicMaterial color="#a855f7" />
            </mesh>
          ))}
        </group>

        {/* Connected Shopify & WooCommerce CMS Nodes */}
        <group position={[-1.7, 0.8, -0.4]}>
          <mesh>
            <dodecahedronGeometry args={[0.38, 0]} />
            <meshStandardMaterial color="#4c1d95" roughness={0.2} metalness={0.8} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.DodecahedronGeometry(0.4, 0)]} />
            <lineBasicMaterial color="#c084fc" transparent opacity={0.8} />
          </lineSegments>
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, 1.7, 0.8, 0.4])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#c084fc" transparent opacity={0.4} />
          </line>
        </group>

        {/* Royal Purple Point Light */}
        <pointLight color="#a855f7" intensity={2.6} distance={11} decay={2} position={[0, 0, 0.8]} />
      </group>

      {/* ======================================================== */}
      {/* 5. CROSS-PLATFORM MOBILE (Teal #06b6d4)                  */}
      {/* Position: [-2.6, -0.4, -74]                              */}
      {/* ======================================================== */}
      <group
        ref={mobileRef}
        position={[-2.6, -0.4, -74]}
        rotation={[0.02, 0.18, -0.02]}
      >
        {/* Floating Sculpted Titanium Smartphone Chassis */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.75, 3.5, 0.14]} />
          <meshStandardMaterial color="#082f49" roughness={0.18} metalness={0.92} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.77, 3.52, 0.16)]} />
          <lineBasicMaterial color="#06b6d4" transparent opacity={0.8} />
        </lineSegments>

        {/* High-Gloss Front Smoked Glass Screen */}
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[1.56, 3.25]} />
          <meshPhysicalMaterial
            color="#041b2d"
            roughness={0.1}
            metalness={0.15}
            transmission={0.4}
            thickness={0.2}
            transparent
            opacity={0.95}
          />
        </mesh>

        {/* Mobile Camera Cutout Pill (Dynamic Island) */}
        <mesh position={[0, 1.45, 0.09]}>
          <capsuleGeometry args={[0.05, 0.22, 8, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Screen Interface Elements: App Header & Feed Cards */}
        <mesh position={[0, 1.15, 0.09]}>
          <boxGeometry args={[1.35, 0.24, 0.02]} />
          <meshBasicMaterial color="#0e7490" />
        </mesh>

        {/* Animated Sliding Feed Card 1 */}
        <group ref={(el) => registerScreenCard(el, 0.45)} position={[0, 0.45, 0.09]}>
          <mesh>
            <boxGeometry args={[1.3, 0.85, 0.02]} />
            <meshStandardMaterial color="#164e63" roughness={0.25} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.32, 0.87, 0.03)]} />
            <lineBasicMaterial color="#06b6d4" transparent opacity={0.6} />
          </lineSegments>
          <mesh position={[-0.3, 0.15, 0.02]}>
            <boxGeometry args={[0.55, 0.35, 0.01]} />
            <meshBasicMaterial color="#0891b2" />
          </mesh>
          <mesh position={[0.2, 0.15, 0.02]}>
            <boxGeometry args={[0.35, 0.15, 0.01]} />
            <meshBasicMaterial color="#a5f3fc" />
          </mesh>
        </group>

        {/* Animated Sliding Feed Card 2 */}
        <group ref={(el) => registerScreenCard(el, -0.6)} position={[0, -0.6, 0.09]}>
          <mesh>
            <boxGeometry args={[1.3, 0.85, 0.02]} />
            <meshStandardMaterial color="#164e63" roughness={0.25} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.32, 0.87, 0.03)]} />
            <lineBasicMaterial color="#06b6d4" transparent opacity={0.6} />
          </lineSegments>
          <mesh position={[-0.3, 0.15, 0.02]}>
            <boxGeometry args={[0.55, 0.35, 0.01]} />
            <meshBasicMaterial color="#0891b2" />
          </mesh>
          <mesh position={[0.2, 0.15, 0.02]}>
            <boxGeometry args={[0.35, 0.15, 0.01]} />
            <meshBasicMaterial color="#a5f3fc" />
          </mesh>
        </group>

        {/* Floating Action Button (FAB) */}
        <mesh position={[0.45, -1.25, 0.11]}>
          <cylinderGeometry args={[0.16, 0.16, 0.04, 24]} rotation={[Math.PI / 2, 0, 0]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>

        {/* Orbiting Flutter / Dart Native Thread Rings */}
        <mesh
          ref={(el) => { if (mobileRef.current) mobileRef.current.userData.threadRing1 = el }}
          rotation={[Math.PI / 4, 0, 0]}
        >
          <torusGeometry args={[1.5, 0.03, 16, 48]} />
          <meshStandardMaterial color="#06b6d4" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh
          ref={(el) => { if (mobileRef.current) mobileRef.current.userData.threadRing2 = el }}
          rotation={[-Math.PI / 4, Math.PI / 3, 0]}
        >
          <torusGeometry args={[1.8, 0.025, 16, 48]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Teal Specular Point Light */}
        <pointLight color="#06b6d4" intensity={2.5} distance={10} decay={2} position={[0, 0, 0.8]} />
      </group>

      {/* ======================================================== */}
      {/* 6. UNIFIED ENGINEERING ARCHITECTURE MASTER CORE          */}
      {/* Position: [0.0, 0.5, -56]                                */}
      {/* ======================================================== */}
      <group
        ref={unifiedRef}
        position={[0.0, 0.5, -56]}
      >
        {/* Central Master Architectural Core (Nested Icosahedron) */}
        <group ref={(el) => { if (unifiedRef.current) unifiedRef.current.userData.core = el }}>
          <mesh>
            <icosahedronGeometry args={[1.4, 0]} />
            <meshPhysicalMaterial
              color="#0f172a"
              roughness={0.15}
              metalness={0.9}
              transmission={0.4}
              thickness={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.IcosahedronGeometry(1.42, 0)]} />
            <lineBasicMaterial color="#ffffff" transparent opacity={0.85} />
          </lineSegments>
          {/* Inner luminous core */}
          <mesh>
            <octahedronGeometry args={[0.7, 0]} />
            <meshBasicMaterial color="#38bdf8" wireframe />
          </mesh>
        </group>

        {/* Gyroscopic Titanium Orbit Ring */}
        <mesh
          ref={(el) => { if (unifiedRef.current) unifiedRef.current.userData.gyroRing = el }}
          rotation={[Math.PI / 3, Math.PI / 6, 0]}
        >
          <torusGeometry args={[2.2, 0.05, 16, 64]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Converging Volumetric Conduits to All 5 Architectural Systems */}
        {[
          { dest: [-3.5, 1.2, -38], color: '#38bdf8' }, // Frontend
          { dest: [3.2, -0.8, -48], color: '#10b981' },  // Backend
          { dest: [-2.8, -1.0, -58], color: '#f59e0b' }, // Database
          { dest: [3.0, 1.0, -66], color: '#a855f7' },   // Commerce
          { dest: [-2.6, -0.4, -74], color: '#06b6d4' }  // Mobile
        ].map((line, idx) => (
          <line key={idx}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, line.dest[0], line.dest[1] - 0.5, line.dest[2] - (-56)])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={line.color} transparent opacity={0.65} />
          </line>
        ))}

        {/* Master Panoramic Radiant Light */}
        <pointLight color="#ffffff" intensity={3.0} distance={20} decay={2} position={[0, 0, 0]} />
      </group>

    </group>
  )
}
