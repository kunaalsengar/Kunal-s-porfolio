import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ProfessionalExperience3D — Phase 6.9 Realistic Cinematic Redesign
 * "From Ideas to Functional Digital Experiences"
 *
 * 5 Chapters with Independent Spatial Staging & Scroll-Driven Smooth Transitions:
 * - Chapter 01: The Beginning (Architectural Blueprint Monolith & Studio Base)
 * - Chapter 02: The Professional Chapter (VibeSoft Developer Workstation & Code Interface)
 * - Chapter 03: From Ideas to Products (Assembled Digital Product Studio: Browser, Mobile, APIs, DB, Storefront)
 * - Chapter 04: The Craft Behind the Work (5 Interconnected Architectural Tech Ecosystem Pedestals)
 * - Chapter 05: The Journey Continues (Grand Architectural Horizon Gateway Framing Deep Horizon)
 */
export default function ProfessionalExperience3D({ reducedMotion = false, onActiveChapterChange }) {
  const { camera } = useThree()
  const masterGroupRef = useRef()

  // 5 Dedicated Chapter Groups
  const ch1GroupRef = useRef()
  const ch2GroupRef = useRef()
  const ch3GroupRef = useRef()
  const ch4GroupRef = useRef()
  const ch5GroupRef = useRef()

  // Dynamic micro-animation refs
  const blueprintMeshRef = useRef()
  const workstationScreenRef = useRef()
  const clientBrowserRef = useRef()
  const mobileDeviceRef = useRef()
  const databasePlattersRef = useRef()
  const techArcRef = useRef()

  // Current scroll progress (clamped 0 to 1)
  const scrollP = useRef(0)
  const isProfActive = useRef(false)

  // Camera targets for continuous cinematic flythrough
  const targetCam = useRef({
    x: 0,
    y: 5.5,
    z: -45,
    lookX: 0,
    lookY: 0.5,
    lookZ: -56
  })

  const currentLookAt = useRef(new THREE.Vector3(0, 0.5, -56))

  // 5 Chapter Camera Waypoints (Smooth, natural glide path with negative space framing)
  // Continuous handoff starting exactly from Phase 6.8 exit coordinates [0.0, 5.5, -45] looking [0.0, 0.5, -56]
  const chapterWaypoints = useMemo(() => [
    // Chapter 01: The Beginning (p ~ 0.08) — Frame blueprint monolith slightly to right
    { pos: [-0.6, 3.2, -52], look: [0.6, 1.2, -62] },
    // Chapter 02: VibeSoft Workspace (p ~ 0.25) — Frame workstation on right, space on left for text
    { pos: [-1.4, 2.0, -66], look: [1.2, 1.1, -76] },
    // Chapter 03: From Ideas to Products (p ~ 0.48) — Wide studio perspective framing assembled systems
    { pos: [0.8, 2.2, -80], look: [-0.6, 1.0, -89] },
    // Chapter 04: The Craft Behind the Work (p ~ 0.70) — Frame tech ecosystem rack on right, text on left
    { pos: [-1.2, 2.4, -98], look: [0.8, 1.3, -108] },
    // Chapter 05: The Journey Continues (p ~ 0.92) — Looking through grand architectural horizon gateway
    { pos: [0.0, 2.4, -120], look: [0.0, 3.2, -136] }
  ], [])

  // Synchronize with ScrollTrigger on #professional-experience
  useEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      const triggerEl = document.getElementById('professional-experience')
      if (!triggerEl) return

      const profST = ScrollTrigger.create({
        trigger: triggerEl,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onEnter: () => {
          isProfActive.current = true
        },
        onLeaveBack: () => {
          isProfActive.current = false
        },
        onUpdate: (self) => {
          isProfActive.current = true
          const p = Math.max(0, Math.min(1, self.progress)) // Clamped 0.0 to 1.0
          scrollP.current = p

          let chapter = 1
          let fromWP = { pos: [0.0, 5.5, -45], look: [0.0, 0.5, -56] } // Exact exit state of Phase 6.8
          let toWP = chapterWaypoints[0]
          let localP = 0

          // Chapter 01: The Beginning (0.00 -> 0.18)
          if (p < 0.18) {
            chapter = 1
            localP = p / 0.18
            fromWP = { pos: [0.0, 5.5, -45], look: [0.0, 0.5, -56] }
            toWP = chapterWaypoints[0]
          }
          // Chapter 02: VibeSoft Workspace (0.18 -> 0.37)
          else if (p < 0.37) {
            chapter = 2
            localP = (p - 0.18) / 0.19
            fromWP = chapterWaypoints[0]
            toWP = chapterWaypoints[1]
          }
          // Chapter 03: From Ideas to Products (0.37 -> 0.62)
          else if (p < 0.62) {
            chapter = 3
            localP = (p - 0.37) / 0.25
            fromWP = chapterWaypoints[1]
            toWP = chapterWaypoints[2]
          }
          // Chapter 04: The Craft Behind the Work (0.62 -> 0.83)
          else if (p < 0.83) {
            chapter = 4
            localP = (p - 0.62) / 0.21
            fromWP = chapterWaypoints[2]
            toWP = chapterWaypoints[3]
          }
          // Chapter 05: The Journey Continues (0.83 -> 1.00)
          else {
            chapter = 5
            localP = (p - 0.83) / 0.17
            fromWP = chapterWaypoints[3]
            toWP = chapterWaypoints[4]
          }

          onActiveChapterChange?.(chapter)

          // Smooth interpolation
          const clampedP = Math.max(0, Math.min(1, localP))
          targetCam.current.x = THREE.MathUtils.lerp(fromWP.pos[0], toWP.pos[0], clampedP)
          targetCam.current.y = THREE.MathUtils.lerp(fromWP.pos[1], toWP.pos[1], clampedP)
          targetCam.current.z = THREE.MathUtils.lerp(fromWP.pos[2], toWP.pos[2], clampedP)

          targetCam.current.lookX = THREE.MathUtils.lerp(fromWP.look[0], toWP.look[0], clampedP)
          targetCam.current.lookY = THREE.MathUtils.lerp(fromWP.look[1], toWP.look[1], clampedP)
          targetCam.current.lookZ = THREE.MathUtils.lerp(fromWP.look[2], toWP.look[2], clampedP)
        }
      })

      // Mount check
      if (profST.progress > 0 || triggerEl.getBoundingClientRect().top <= 0) {
        isProfActive.current = true
        scrollP.current = profST.progress
      }
    })

    return () => ctx.revert()
  }, [reducedMotion, chapterWaypoints, onActiveChapterChange])

  // Continuous frame loop
  useFrame((state, delta) => {
    // 1. Camera Flythrough Tracking
    if (!reducedMotion && isProfActive.current) {
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
    const p = scrollP.current

    // 2. Smooth Chapter Staging & Transition Heights
    // Prevents visual overlap by gracefully sinking or rising objects into view:
    // Chapter 01 (active 0.00 -> 0.20)
    if (ch1GroupRef.current) {
      const targetY = p > 0.20 ? -30 : 0
      ch1GroupRef.current.position.y = THREE.MathUtils.damp(ch1GroupRef.current.position.y, targetY, 3.5, delta)
      ch1GroupRef.current.visible = ch1GroupRef.current.position.y > -25
    }

    // Chapter 02 (active 0.14 -> 0.40)
    if (ch2GroupRef.current) {
      const targetY = (p < 0.12 || p > 0.40) ? -35 : 0
      ch2GroupRef.current.position.y = THREE.MathUtils.damp(ch2GroupRef.current.position.y, targetY, 3.5, delta)
      ch2GroupRef.current.visible = ch2GroupRef.current.position.y > -30
    }

    // Chapter 03 (active 0.32 -> 0.66)
    if (ch3GroupRef.current) {
      const targetY = (p < 0.30 || p > 0.66) ? -40 : 0
      ch3GroupRef.current.position.y = THREE.MathUtils.damp(ch3GroupRef.current.position.y, targetY, 3.5, delta)
      ch3GroupRef.current.visible = ch3GroupRef.current.position.y > -35
    }

    // Chapter 04 (active 0.58 -> 0.86)
    if (ch4GroupRef.current) {
      const targetY = (p < 0.56 || p > 0.86) ? -45 : 0
      ch4GroupRef.current.position.y = THREE.MathUtils.damp(ch4GroupRef.current.position.y, targetY, 3.5, delta)
      ch4GroupRef.current.visible = ch4GroupRef.current.position.y > -40
    }

    // Chapter 05 (active 0.78 -> 1.00)
    if (ch5GroupRef.current) {
      const targetY = p < 0.76 ? -50 : 0
      ch5GroupRef.current.position.y = THREE.MathUtils.damp(ch5GroupRef.current.position.y, targetY, 3.5, delta)
      ch5GroupRef.current.visible = ch5GroupRef.current.position.y > -45
    }

    // 3. Realistic Micro-Animations
    if (blueprintMeshRef.current) {
      blueprintMeshRef.current.rotation.y = -0.15 + Math.sin(time * 0.6) * 0.03
      blueprintMeshRef.current.position.y = 1.4 + Math.sin(time * 0.8) * 0.04
    }
    if (workstationScreenRef.current) {
      workstationScreenRef.current.position.y = 1.3 + Math.sin(time * 0.7) * 0.03
    }
    if (clientBrowserRef.current) {
      clientBrowserRef.current.position.y = 1.3 + Math.sin(time * 0.75 + 1) * 0.03
    }
    if (mobileDeviceRef.current) {
      mobileDeviceRef.current.position.y = 1.1 + Math.sin(time * 0.9 + 2) * 0.04
      mobileDeviceRef.current.rotation.y = -0.2 + Math.cos(time * 0.6) * 0.03
    }
    if (databasePlattersRef.current) {
      databasePlattersRef.current.rotation.y += delta * 0.25
    }
    if (techArcRef.current) {
      techArcRef.current.position.y = 0.0 + Math.sin(time * 0.5) * 0.02
    }
  })

  return (
    <group ref={masterGroupRef}>

      {/* ===================================================================== */}
      {/* SOPHISTICATED ARCHITECTURAL LIGHTING                                  */}
      {/* Deep Space Studio Key, Fill, and Rim Illumination                     */}
      {/* ===================================================================== */}
      <ambientLight intensity={0.5} color="#0c101d" />
      <directionalLight position={[10, 16, -60]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-12, 6, -85]} intensity={1.4} color="#94a3b8" />
      <directionalLight position={[8, 8, -110]} intensity={1.6} color="#cbd5e1" />
      <directionalLight position={[0, 10, -135]} intensity={2.2} color="#f8fafc" />

      {/* Subtle Flanking Titanium Columns creating physical corridor depth */}
      {[-62, -78, -94, -110, -126].map((z, idx) => (
        <group key={`col-${idx}`}>
          {[-5.0, 5.0].map((x, cidx) => (
            <group key={cidx} position={[x, 2.0, z]}>
              <mesh>
                <boxGeometry args={[0.4, 7.5, 0.6]} />
                <meshStandardMaterial color="#06080e" roughness={0.3} metalness={0.92} />
              </mesh>
              <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(0.41, 7.52, 0.61)]} />
                <lineBasicMaterial color="#334155" transparent opacity={0.35} />
              </lineSegments>
            </group>
          ))}
        </group>
      ))}

      {/* ===================================================================== */}
      {/* CHAPTER 01: THE BEGINNING (z ~ -62)                                   */}
      {/* Realistic Conceptual Blueprint Canvas & Architectural Studio Pedestal */}
      {/* ===================================================================== */}
      <group ref={ch1GroupRef} position={[1.4, 0, -62]}>

        {/* Architectural Pedestal Plinth */}
        <mesh position={[0, -0.6, 0]}>
          <boxGeometry args={[4.2, 0.28, 2.0]} />
          <meshStandardMaterial color="#080a12" roughness={0.25} metalness={0.92} />
        </mesh>
        <lineSegments position={[0, -0.6, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(4.22, 0.29, 2.02)]} />
          <lineBasicMaterial color="#64748b" transparent opacity={0.4} />
        </lineSegments>

        {/* Floating Blueprint Monolith */}
        <group ref={blueprintMeshRef} position={[0, 1.4, 0]}>
          {/* Main Smoked Glass Blueprint Plate */}
          <mesh>
            <boxGeometry args={[3.4, 2.1, 0.06]} />
            <meshPhysicalMaterial
              color="#080c18"
              roughness={0.12}
              metalness={0.2}
              transmission={0.7}
              thickness={0.8}
              transparent
              opacity={0.92}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(3.42, 2.12, 0.08)]} />
            <lineBasicMaterial color="#cbd5e1" transparent opacity={0.75} />
          </lineSegments>

          {/* Architectural Blueprint Grid & Crosshairs */}
          <group position={[0, 0, 0.04]}>
            {[-0.5, 0.0, 0.5].map((y, i) => (
              <mesh key={`h-${i}`} position={[0, y, 0]}>
                <boxGeometry args={[2.8, 0.015, 0.005]} />
                <meshBasicMaterial color="#94a3b8" transparent opacity={0.4} />
              </mesh>
            ))}
            {[-1.0, -0.3, 0.3, 1.0].map((x, i) => (
              <mesh key={`v-${i}`} position={[x, 0, 0]}>
                <boxGeometry args={[0.015, 1.6, 0.005]} />
                <meshBasicMaterial color="#94a3b8" transparent opacity={0.4} />
              </mesh>
            ))}
            {/* Corner Alignment Marks */}
            {[[-1.4, 0.85], [1.4, 0.85], [-1.4, -0.85], [1.4, -0.85]].map(([cx, cy], i) => (
              <group key={`c-${i}`} position={[cx, cy, 0]}>
                <mesh>
                  <boxGeometry args={[0.16, 0.02, 0.01]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
                <mesh>
                  <boxGeometry args={[0.02, 0.16, 0.01]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>
            ))}
            {/* Central Concept Idea Wireframe Sphere */}
            <mesh position={[0, 0, 0.08]}>
              <sphereGeometry args={[0.38, 16, 16]} />
              <meshStandardMaterial color="#0c1322" wireframe roughness={0.2} metalness={0.8} />
            </mesh>
          </group>

          <pointLight color="#f8fafc" intensity={1.8} distance={6} decay={2} position={[0, 0, 0.8]} />
        </group>

      </group>

      {/* ===================================================================== */}
      {/* CHAPTER 02: THE PROFESSIONAL CHAPTER — VIBESOFT (z ~ -76)             */}
      {/* Realistic High-End Workstation with Live Code & Storefront Interface  */}
      {/* ===================================================================== */}
      <group ref={ch2GroupRef} position={[2.0, 0, -76]}>

        {/* Architectural Desk Studio Base */}
        <mesh position={[0, -0.7, 0]}>
          <boxGeometry args={[4.4, 0.25, 2.0]} />
          <meshStandardMaterial color="#080a12" roughness={0.2} metalness={0.92} />
        </mesh>
        <lineSegments position={[0, -0.7, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(4.42, 0.26, 2.02)]} />
          <lineBasicMaterial color="#475569" transparent opacity={0.4} />
        </lineSegments>

        {/* Display Monitor Stand */}
        <mesh position={[0, -0.15, -0.3]}>
          <boxGeometry args={[0.35, 0.9, 0.12]} />
          <meshStandardMaterial color="#1e293b" roughness={0.25} metalness={0.85} />
        </mesh>

        {/* Realistic Floating Display Monitor */}
        <group ref={workstationScreenRef} position={[0, 1.3, 0]}>
          {/* Main Curved Glass Screen Panel */}
          <mesh>
            <boxGeometry args={[4.0, 2.3, 0.08]} />
            <meshPhysicalMaterial
              color="#04060b"
              roughness={0.15}
              metalness={0.3}
              transmission={0.65}
              thickness={0.9}
              transparent
              opacity={0.95}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(4.02, 2.32, 0.1)]} />
            <lineBasicMaterial color="#94a3b8" transparent opacity={0.8} />
          </lineSegments>

          {/* Authentic Live Code & Terminal Interface Elements */}
          <group position={[0, 0, 0.05]}>
            {/* Top Window Bar with Controls */}
            <mesh position={[0, 0.95, 0]}>
              <boxGeometry args={[3.7, 0.2, 0.01]} />
              <meshStandardMaterial color="#0b111e" roughness={0.3} metalness={0.8} />
            </mesh>
            {[-1.65, -1.52, -1.39].map((dotX, i) => (
              <mesh key={i} position={[dotX, 0.95, 0.015]}>
                <circleGeometry args={[0.035, 16]} />
                <meshBasicMaterial color={i === 0 ? '#ef4444' : i === 1 ? '#eab308' : '#22c55e'} />
              </mesh>
            ))}

            {/* Left Code Editor Pane */}
            <group position={[-0.9, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.8, 1.5, 0.01]} />
                <meshStandardMaterial color="#070a12" roughness={0.3} />
              </mesh>
              {/* Syntax Highlighted Code Lines */}
              {[-0.5, -0.3, -0.1, 0.1, 0.3, 0.5].map((lineY, idx) => (
                <mesh key={idx} position={[-0.7 + (idx % 3) * 0.12, lineY, 0.015]}>
                  <boxGeometry args={[0.9 - (idx % 3) * 0.15, 0.05, 0.005]} />
                  <meshBasicMaterial
                    color={idx === 1 ? '#38bdf8' : idx === 3 ? '#a78bfa' : idx === 4 ? '#34d399' : '#e2e8f0'}
                  />
                </mesh>
              ))}
            </group>

            {/* Right Live Storefront Preview Pane */}
            <group position={[1.0, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.7, 1.5, 0.01]} />
                <meshStandardMaterial color="#090d18" roughness={0.25} />
              </mesh>
              <mesh position={[0, 0.4, 0.015]}>
                <boxGeometry args={[1.4, 0.45, 0.01]} />
                <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.7} />
              </mesh>
              {[-0.4, 0.4].map((cardX, i) => (
                <mesh key={i} position={[cardX, -0.25, 0.015]}>
                  <boxGeometry args={[0.6, 0.6, 0.01]} />
                  <meshStandardMaterial color="#131d31" roughness={0.2} metalness={0.7} />
                </mesh>
              ))}
            </group>
          </group>

          <pointLight color="#ffffff" intensity={2.0} distance={7} decay={2} position={[0, 0.4, 1.0]} />
        </group>

      </group>

      {/* ===================================================================== */}
      {/* CHAPTER 03: FROM IDEAS TO PRODUCTS — ASSEMBLED PRODUCT STUDIO (z ~-89) */}
      {/* 5 Real-World Disciplines: Browser, Mobile, APIs, DB, Storefront        */}
      {/* ===================================================================== */}
      <group ref={ch3GroupRef} position={[-0.8, 0, -89]}>

        {/* 1. Client Website 3D Viewport (Left) */}
        <group ref={clientBrowserRef} position={[-2.2, 1.3, 0]}>
          <mesh>
            <boxGeometry args={[2.8, 1.9, 0.06]} />
            <meshPhysicalMaterial
              color="#070b14"
              roughness={0.15}
              metalness={0.3}
              transmission={0.65}
              thickness={0.7}
              transparent
              opacity={0.92}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(2.82, 1.92, 0.08)]} />
            <lineBasicMaterial color="#38bdf8" transparent opacity={0.7} />
          </lineSegments>
          {/* Browser Address Bar */}
          <mesh position={[0, 0.75, 0.04]}>
            <boxGeometry args={[2.4, 0.16, 0.015]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Content Columns */}
          {[-0.7, 0, 0.7].map((colX, i) => (
            <mesh key={i} position={[colX, -0.15, 0.04]}>
              <boxGeometry args={[0.6, 1.1, 0.02]} />
              <meshStandardMaterial color="#0d1526" roughness={0.2} metalness={0.85} />
            </mesh>
          ))}
          <pointLight color="#38bdf8" intensity={1.5} distance={5} decay={2} position={[0, 0, 0.6]} />
        </group>

        {/* 2. Mobile Application Smartphone (Center-Left) */}
        <group ref={mobileDeviceRef} position={[0.2, 1.1, 0.8]}>
          <mesh>
            <boxGeometry args={[1.3, 2.6, 0.08]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.95} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.32, 2.62, 0.09)]} />
            <lineBasicMaterial color="#38bdf8" transparent opacity={0.8} />
          </lineSegments>
          {/* OLED Screen */}
          <mesh position={[0, 0, 0.045]}>
            <boxGeometry args={[1.2, 2.45, 0.01]} />
            <meshPhysicalMaterial
              color="#04060c"
              roughness={0.1}
              metalness={0.2}
              transmission={0.85}
              transparent
              opacity={0.95}
            />
          </mesh>
          {/* App UI Cards */}
          {[-0.1, -0.5, 0.3].map((y, i) => (
            <mesh key={i} position={[0, y, 0.055]}>
              <boxGeometry args={[0.95, 0.28, 0.005]} />
              <meshStandardMaterial color="#0e2238" roughness={0.2} metalness={0.8} />
            </mesh>
          ))}
          <pointLight color="#38bdf8" intensity={1.6} distance={5} decay={2} position={[0, 0, 0.6]} />
        </group>

        {/* 3. APIs, Database & Storefront Node Mesh (Right) */}
        <group position={[2.2, 1.2, -0.4]}>
          {/* Database Cylindrical Platters */}
          <group ref={databasePlattersRef}>
            {[0.3, 0.0, -0.3].map((y, i) => (
              <group key={i} position={[0, y, 0]}>
                <mesh>
                  <cylinderGeometry args={[0.7, 0.7, 0.18, 24]} />
                  <meshStandardMaterial color="#0c1d2e" roughness={0.2} metalness={0.9} />
                </mesh>
                <lineSegments>
                  <edgesGeometry args={[new THREE.CylinderGeometry(0.71, 0.71, 0.19, 24)]} />
                  <lineBasicMaterial color="#10b981" transparent opacity={0.6} />
                </lineSegments>
              </group>
            ))}
          </group>
          {/* Security & Authentication Torus Ring */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1.0, 0.025, 16, 48]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.75} />
          </mesh>
          <pointLight color="#10b981" intensity={1.6} distance={6} decay={2} position={[0, 0, 0.8]} />
        </group>

      </group>

      {/* ===================================================================== */}
      {/* CHAPTER 04: THE CRAFT BEHIND THE WORK — INTERCONNECTED TECH RACKS     */}
      {/* 5 Architectural Tech Domain Pedestals in Depth (z ~ -108)             */}
      {/* ===================================================================== */}
      <group ref={ch4GroupRef} position={[1.8, 0, -108]}>

        {/* 5 Interconnected Pedestals */}
        <group ref={techArcRef}>
          {[
            { x: -2.6, label: 'FRONTEND', color: '#38bdf8', y: 0.0 },
            { x: -1.3, label: 'BACKEND', color: '#10b981', y: 0.15 },
            { x: 0.0, label: 'DATABASE', color: '#38bdf8', y: 0.3 },
            { x: 1.3, label: 'COMMERCE', color: '#c084fc', y: 0.15 },
            { x: 2.6, label: 'MOBILE', color: '#38bdf8', y: 0.0 }
          ].map((item, idx) => (
            <group key={idx} position={[item.x, item.y, 0]}>
              {/* Monolith Pillar */}
              <mesh position={[0, 0.7, 0]}>
                <boxGeometry args={[0.95, 2.8, 0.25]} />
                <meshStandardMaterial color="#080c16" roughness={0.25} metalness={0.92} />
              </mesh>
              <lineSegments position={[0, 0.7, 0]}>
                <edgesGeometry args={[new THREE.BoxGeometry(0.96, 2.82, 0.26)]} />
                <lineBasicMaterial color={item.color} transparent opacity={0.65} />
              </lineSegments>

              {/* Beveled Glass Identity Plate */}
              <mesh position={[0, 1.7, 0.15]}>
                <boxGeometry args={[0.8, 0.35, 0.04]} />
                <meshPhysicalMaterial
                  color="#060912"
                  roughness={0.15}
                  metalness={0.2}
                  transmission={0.7}
                  transparent
                  opacity={0.92}
                />
              </mesh>
              <lineSegments position={[0, 1.7, 0.15]}>
                <edgesGeometry args={[new THREE.BoxGeometry(0.81, 0.36, 0.05)]} />
                <lineBasicMaterial color={item.color} transparent opacity={0.8} />
              </lineSegments>

              {/* Horizontal Slot Lines */}
              {[-0.1, 0.2, 0.5, 0.8].map((slotY, sidx) => (
                <mesh key={sidx} position={[0, slotY, 0.13]}>
                  <boxGeometry args={[0.7, 0.08, 0.02]} />
                  <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
                </mesh>
              ))}

              <pointLight color={item.color} intensity={1.3} distance={4} decay={2} position={[0, 1.2, 0.5]} />
            </group>
          ))}

          {/* Physical Signal Bus Line Linking All Pedestals */}
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[5.6, 0.03, 0.03]} />
            <meshBasicMaterial color="#94a3b8" transparent opacity={0.6} />
          </mesh>
        </group>

      </group>

      {/* ===================================================================== */}
      {/* CHAPTER 05: THE JOURNEY CONTINUES — GRAND HORIZON GATEWAY (z ~ -136)  */}
      {/* Architectural Gateway Framing the Next Horizon toward Education       */}
      {/* ===================================================================== */}
      <group ref={ch5GroupRef} position={[0, 0, -136]}>

        {/* Grand Flanking Portal Columns */}
        {[-3.6, 3.6].map((x, i) => (
          <group key={i} position={[x, 2.2, 0]}>
            <mesh>
              <boxGeometry args={[0.7, 7.5, 1.0]} />
              <meshStandardMaterial color="#070910" roughness={0.25} metalness={0.94} />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(0.71, 7.52, 1.01)]} />
              <lineBasicMaterial color="#ffffff" transparent opacity={0.7} />
            </lineSegments>
          </group>
        ))}

        {/* Monolithic Overhead Lintelle / Archway Beam */}
        <mesh position={[0, 5.6, 0]}>
          <boxGeometry args={[7.8, 0.7, 1.0]} />
          <meshStandardMaterial color="#070910" roughness={0.25} metalness={0.94} />
        </mesh>
        <lineSegments position={[0, 5.6, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(7.82, 0.72, 1.02)]} />
          <lineBasicMaterial color="#ffffff" transparent opacity={0.7} />
        </lineSegments>

        {/* Stepped Horizon Foundation Stairs */}
        {[0, -0.5, -1.0].map((y, idx) => (
          <group key={idx} position={[0, -1.2 + y, -idx * 1.8]}>
            <mesh>
              <boxGeometry args={[6.8 + idx * 0.8, 0.25, 2.0]} />
              <meshStandardMaterial color="#090b14" roughness={0.2} metalness={0.9} />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(6.82 + idx * 0.8, 0.26, 2.02)]} />
              <lineBasicMaterial color="#64748b" transparent opacity={0.4} />
            </lineSegments>
          </group>
        ))}

        {/* Deep Horizon Portal Halo Ring */}
        <mesh position={[0, 2.2, -6]}>
          <ringGeometry args={[3.2, 3.25, 64]} />
          <meshBasicMaterial color="#cbd5e1" transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>

        <pointLight color="#f8fafc" intensity={2.5} distance={22} decay={2} position={[0, 2.4, -3]} />
      </group>

    </group>
  )
}
