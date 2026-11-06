import React, { useRef, useMemo, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

/**
 * Generates sample point coordinates from an offscreen 2D canvas
 * conforming to the physical shape of "KUNAL SENGAR".
 */
function generateTextPoints(count, isMobile = false) {
  if (typeof document === 'undefined') return []
  const canvas = document.createElement('canvas')
  canvas.width = 1000
  canvas.height = 240
  const ctx = canvas.getContext('2d')
  if (!ctx) return []

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Use bold Grotesque font matching our brand
  ctx.fillStyle = '#ffffff'
  ctx.font = '900 74px "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('KUNAL SENGAR', canvas.width / 2, canvas.height / 2)

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imgData.data

  const validPixels = []
  const step = 2
  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const idx = (y * canvas.width + x) * 4
      if (data[idx] > 120) {
        // Map 2D pixel to 3D world space coordinates
        const worldX = ((x - canvas.width / 2) / (canvas.width / 2)) * (isMobile ? 2.6 : 3.8)
        const worldY = -((y - canvas.height / 2) / (canvas.height / 2)) * (isMobile ? 0.65 : 0.9)
        validPixels.push({ x: worldX, y: worldY })
      }
    }
  }

  if (validPixels.length === 0) return []

  const points = []
  for (let i = 0; i < count; i++) {
    const p = validPixels[Math.floor(Math.random() * validPixels.length)]
    const jx = (Math.random() - 0.5) * 0.04
    const jy = (Math.random() - 0.5) * 0.04
    const jz = (Math.random() - 0.5) * 0.06

    // Radial explosive velocity + directional push toward the viewer
    const angle = Math.atan2(p.y, p.x) + (Math.random() - 0.5) * 0.8
    const speed = 1.8 + Math.random() * 4.2
    const vx = Math.cos(angle) * speed
    const vy = Math.sin(angle) * speed
    const vz = (Math.random() * 3.8) + 1.2 // forward acceleration towards viewer

    // Angular tumbling speed
    const rx = (Math.random() - 0.5) * 12
    const ry = (Math.random() - 0.5) * 12
    const rz = (Math.random() - 0.5) * 12

    // Shard scale - scaled for high visibility on retina & mobile screens
    const baseScale = isMobile ? 0.055 : 0.075
    const scale = baseScale * (0.75 + Math.random() * 0.5)

    // Color: 65% Netflix Crimson, 25% Pure Diamond White, 10% Quantum Cyan
    const randCol = Math.random()
    let color
    if (randCol < 0.65) {
      color = new THREE.Color('#e50914')
    } else if (randCol < 0.90) {
      color = new THREE.Color('#ffffff')
    } else {
      color = new THREE.Color('#00f0ff')
    }

    points.push({
      origX: p.x + jx,
      origY: p.y + jy,
      origZ: jz,
      vx,
      vy,
      vz,
      rx,
      ry,
      rz,
      scale,
      color
    })
  }
  return points
}

/**
 * CinematicIntro — Phase 6.5 Step 2
 * Full 5-Scene Netflix-Style Brand Sequence:
 * Scene 1: Darkness & Ambient Red Optical Glow
 * Scene 2: 3D Metallic Name Reveal & Red Specular Light Sweep
 * Scene 3: Hyper-Zoom towards camera (Out of Screen Effect)
 * Scene 4: GPU Instanced Particle Dissolution (8,000 / 5,000 / 3,000 shards)
 * Scene 5: Monolith Reveal & Camera Settle
 */
export default function CinematicIntro({
  active = true,
  deviceTier = 'desktop',
  reducedMotion = false,
  onSceneChange,
  onComplete
}) {
  const { camera } = useThree()

  // References
  const textGroupRef = useRef()
  const sweepLightRef = useRef()
  const backGlowRef = useRef()
  const streakMeshRef = useRef()
  const instancedMeshRef = useRef()
  const tlRef = useRef()

  const isMobile = deviceTier === 'mobile'
  const isTablet = deviceTier === 'tablet'

  // Dynamic particle count based on hardware capability
  const particleCount = useMemo(() => {
    if (isMobile) return 3000
    if (isTablet) return 5000
    return 8000
  }, [isMobile, isTablet])

  // Sampled particle positions and physics vectors
  const particleData = useMemo(() => {
    return generateTextPoints(particleCount, isMobile)
  }, [particleCount, isMobile])

  // Reusable dummy for matrix updates
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // High-Resolution Metallic PBR Typography Texture (Zero network dependency, instant 1st-frame render)
  const textTexture = useMemo(() => {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Brushed titanium physical linear gradient
    const grad = ctx.createLinearGradient(0, 120, 0, 380)
    grad.addColorStop(0, '#ffffff')
    grad.addColorStop(0.2, '#f1f5f9')
    grad.addColorStop(0.5, '#cbd5e1')
    grad.addColorStop(0.8, '#94a3b8')
    grad.addColorStop(1, '#475569')

    ctx.fillStyle = grad
    ctx.font = '900 162px "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('KUNAL SENGAR', canvas.width / 2, canvas.height / 2)

    // Crisp polished mirror edge bevel stroke
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)'
    ctx.lineWidth = 4
    ctx.strokeText('KUNAL SENGAR', canvas.width / 2, canvas.height / 2)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  // Shard geometry and material
  const shardGeometry = useMemo(() => new THREE.OctahedronGeometry(1, 0), [])
  const shardMaterial = useMemo(() => new THREE.MeshBasicMaterial(), [])

  // Clean initial color assignment for instanced mesh
  useEffect(() => {
    if (!instancedMeshRef.current || particleData.length === 0) return
    const mesh = instancedMeshRef.current
    for (let i = 0; i < particleData.length; i++) {
      mesh.setColorAt(i, particleData[i].color)
      dummy.position.set(particleData[i].origX, particleData[i].origY, particleData[i].origZ)
      dummy.scale.set(0, 0, 0)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceColor.needsUpdate = true
    mesh.instanceMatrix.needsUpdate = true
  }, [particleData, dummy])

  // Internal animated state values driven by GSAP
  const stateRef = useRef({
    scene: 1,
    sweepX: -6.5,
    sweepIntensity: 0,
    backGlowIntensity: 0,
    textZ: 0,
    textScale: 1,
    textOpacity: 0,
    streakScaleX: 0,
    streakOpacity: 0,
    dissolveProgress: 0,
    textVisible: true,
    particlesVisible: false,
    camZ: isMobile ? 6.4 : 5.8,
  })

  // Master GSAP Timeline Orchestrating the 5 Scenes (Total: 4.8 seconds)
  useEffect(() => {
    if (!active) return

    if (reducedMotion) {
      onSceneChange?.(5)
      onComplete?.()
      return
    }

    const s = stateRef.current
    const initialCamZ = isMobile ? 6.4 : 5.8
    const targetCamZ = isMobile ? 6.4 : isTablet ? 5.8 : 5.2

    // Set initial values
    s.scene = 1
    s.sweepX = -6.5
    s.sweepIntensity = 0
    s.backGlowIntensity = 0
    s.textZ = 0
    s.textScale = 1
    s.textOpacity = 0
    s.streakScaleX = 0
    s.streakOpacity = 0
    s.dissolveProgress = 0
    s.textVisible = true
    s.particlesVisible = false
    s.camZ = initialCamZ

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        onSceneChange?.(5)
        onComplete?.()
      }
    })
    tlRef.current = tl

    // Scene 1: Darkness & Ambient Crimson Atmosphere (0.0s – 0.8s)
    tl.to(s, {
      backGlowIntensity: 3.2,
      sweepIntensity: 1.5,
      streakOpacity: 0.65,
      streakScaleX: 4.5,
      duration: 0.8,
      ease: 'power2.out',
      onStart: () => onSceneChange?.(1)
    })

    // Scene 2: 3D Metallic Name Reveal & Red Specular Light Sweep (0.8s – 2.0s)
    tl.to(s, {
      textOpacity: 1,
      sweepX: 6.5,
      sweepIntensity: 8.5,
      streakScaleX: isMobile ? 7 : 14,
      duration: 1.2,
      ease: 'power2.inOut',
      onStart: () => {
        s.scene = 2
        onSceneChange?.(2)
      }
    })

    // Scene 3: Hyper-Zoom Towards Camera / Out of Screen (2.0s – 3.1s)
    tl.to(s, {
      textZ: 4.4,
      textScale: isMobile ? 1.8 : 2.4,
      camZ: initialCamZ - 0.7,
      streakOpacity: 0.9,
      duration: 1.1,
      ease: 'power3.in',
      onStart: () => {
        s.scene = 3
        onSceneChange?.(3)
      }
    })

    // Scene 4: Particle Dissolution (3.1s – 4.2s)
    tl.to(s, {
      dissolveProgress: 1,
      sweepIntensity: 2,
      streakOpacity: 0,
      duration: 1.1,
      ease: 'power2.out',
      onStart: () => {
        s.scene = 4
        s.textVisible = false
        s.particlesVisible = true
        onSceneChange?.(4)
      }
    })

    // Scene 5: Monolith Reveal & Camera Settle (4.2s – 4.8s)
    tl.to(s, {
      camZ: targetCamZ,
      backGlowIntensity: 0.8,
      duration: 0.6,
      ease: 'power2.out',
      onStart: () => {
        s.scene = 5
        s.particlesVisible = false
        onSceneChange?.(5)
      }
    })

    return () => {
      tl.kill()
    }
  }, [active, isMobile, isTablet, reducedMotion, onSceneChange, onComplete])

  // R3F Render & Physics Loop (Runs at locked 60+ FPS without React state overhead)
  useFrame((_, delta) => {
    if (!active || reducedMotion) return

    const s = stateRef.current

    // 1. Camera positioning during intro
    camera.position.z = s.camZ
    camera.position.x = 0
    camera.position.y = 0
    camera.lookAt(0, 0, 0)

    // 2. Red Specular Sweep Light
    if (sweepLightRef.current) {
      sweepLightRef.current.position.x = s.sweepX
      sweepLightRef.current.intensity = s.sweepIntensity
    }

    // 3. Ambient Back Crimson Glow
    if (backGlowRef.current) {
      backGlowRef.current.intensity = s.backGlowIntensity
    }

    // 4. Anamorphic Red Laser Streak Plane
    if (streakMeshRef.current) {
      streakMeshRef.current.scale.x = s.streakScaleX
      streakMeshRef.current.material.opacity = s.streakOpacity
    }

    // 5. Solid 3D Metallic Typography Group
    if (textGroupRef.current) {
      textGroupRef.current.visible = s.textVisible
      textGroupRef.current.position.z = s.textZ
      textGroupRef.current.scale.setScalar(s.textScale)
    }

    // 6. Instanced Particle Dissolution System (Scene 4)
    if (instancedMeshRef.current && s.particlesVisible) {
      const mesh = instancedMeshRef.current
      mesh.visible = true
      const progress = s.dissolveProgress
      const count = particleData.length

      for (let i = 0; i < count; i++) {
        const p = particleData[i]
        
        // Dynamic curl noise offset
        const curlX = Math.sin(progress * 6 + i * 0.1) * 0.22
        const curlY = Math.cos(progress * 6 + i * 0.1) * 0.22

        // Start from zoomed text position (z: 3.8) and explode outward
        const currX = (p.origX * 1.6) + (p.vx * progress * 1.3) + curlX
        const currY = (p.origY * 1.6) + (p.vy * progress * 1.3) + curlY
        const currZ = 3.6 + (p.vz * progress * 1.8)

        const currRotX = p.rx * progress * 2
        const currRotY = p.ry * progress * 2
        const currRotZ = p.rz * progress * 2

        // Shrink particle scale towards completion
        const currScale = p.scale * Math.max(0, 1 - Math.pow(progress, 1.8) * 0.95)

        dummy.position.set(currX, currY, currZ)
        dummy.rotation.set(currRotX, currRotY, currRotZ)
        dummy.scale.set(currScale, currScale, currScale)
        dummy.updateMatrix()

        mesh.setMatrixAt(i, dummy.matrix)
      }
      mesh.instanceMatrix.needsUpdate = true
    } else if (instancedMeshRef.current && !s.particlesVisible) {
      instancedMeshRef.current.visible = false
    }
  })

  // Cleanup geometries and materials on unmount
  useEffect(() => {
    return () => {
      shardGeometry.dispose()
      shardMaterial.dispose()
      textTexture?.dispose()
    }
  }, [shardGeometry, shardMaterial, textTexture])

  if (!active || reducedMotion) return null

  const fontSize = isMobile ? 0.38 : isTablet ? 0.52 : 0.68
  const letterSpacing = isMobile ? 0.14 : 0.18

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Deep Volumetric Crimson Back Glow */}
      <pointLight
        ref={backGlowRef}
        color="#e50914"
        distance={14}
        position={[0, 0, -1]}
      />

      {/* 2. Sweeping Netflix-Red Specular Key Light */}
      <pointLight
        ref={sweepLightRef}
        color="#ff1a26"
        distance={10}
        position={[-6.5, 0.3, 1.8]}
      />

      {/* 3. Subtle Cyan Counter-Rim Light */}
      <directionalLight
        color="#00f0ff"
        intensity={1.2}
        position={[4, -2, 2]}
      />

      {/* 4. Top Cool White Edge Catch Light */}
      <directionalLight
        color="#ffffff"
        intensity={2.0}
        position={[0, 4, 3]}
      />

      {/* 5. Anamorphic Horizontal Red Laser Streak Plane */}
      <mesh ref={streakMeshRef} position={[0, 0, -0.15]}>
        <planeGeometry args={[1, 0.035]} />
        <meshBasicMaterial
          color="#e50914"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 6. Centered Physical Metallic 3D Typography "KUNAL SENGAR" */}
      <group ref={textGroupRef} position={[0, 0, 0]}>
        {textTexture && (
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[isMobile ? 3.4 : 5.4, isMobile ? 0.85 : 1.35]} />
            <meshStandardMaterial
              map={textTexture}
              transparent
              alphaTest={0.05}
              roughness={0.16}
              metalness={0.94}
            />
          </mesh>
        )}
      </group>

      {/* 7. GPU Instanced Particle Dissolution System (Scene 4) */}
      <instancedMesh
        ref={instancedMeshRef}
        args={[shardGeometry, shardMaterial, particleCount]}
        visible={false}
      />
    </group>
  )
}

