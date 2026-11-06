import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Creates a circular starlight glow point texture for the morphing particles.
 */
function createPointTexture() {
  if (typeof document === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.3, 'rgba(240, 245, 255, 0.8)')
  gradient.addColorStop(0.7, 'rgba(180, 220, 255, 0.25)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 32, 32)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * ProjectMonolith3D — Phase 6.6
 * Floating 3D miniature architectural website environment:
 * - Real high-resolution website hero screenshot texture
 * - Sleek titanium/obsidian chassis with authentic aspect ratio
 * - Particle swarm that coalesces from dispersed points into the website perimeter
 * - Brand accent halo lighting (Cyan for GamingPCWorld, Amber for TruPahadi)
 * - Gentle delta-time floating hover
 */
export default function ProjectMonolith3D({
  texturePath,
  accentColor = '#00f0ff',
  width = 5.6,
  height = 3.5,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  morphProgress = 1.0,
  isHero = false,
  reducedMotion = false
}) {
  const groupRef = useRef()
  const meshRef = useRef()
  const swarmRef = useRef()
  const pointTexture = useMemo(() => createPointTexture(), [])

  // Asynchronously load the genuine website hero texture
  const websiteTexture = useMemo(() => {
    if (typeof window === 'undefined') return null
    const loader = new THREE.TextureLoader()
    const tex = loader.load(texturePath, (loadedTex) => {
      loadedTex.colorSpace = THREE.SRGBColorSpace
      loadedTex.generateMipmaps = true
      loadedTex.minFilter = THREE.LinearMipmapLinearFilter
      loadedTex.magFilter = THREE.LinearFilter
    })
    return tex
  }, [texturePath])

  // Morphing particle perimeter swarm (400 particles)
  const particleCount = 380
  const { initialPositions, targetPositions, currentPositions, particleColors } = useMemo(() => {
    const init = new Float32Array(particleCount * 3)
    const targ = new Float32Array(particleCount * 3)
    const curr = new Float32Array(particleCount * 3)
    const cols = new Float32Array(particleCount * 3)

    const accentRGB = new THREE.Color(accentColor)
    const whiteRGB = new THREE.Color('#ffffff')

    const halfW = width / 2
    const halfH = height / 2

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      // Dispersed cloud position (starting state)
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = Math.cbrt(Math.random()) * 5.0 + 2.0

      init[i3] = r * Math.sin(phi) * Math.cos(theta)
      init[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      init[i3 + 2] = r * Math.cos(phi)

      // Target position: distributed on the rectangular perimeter & corners of the website slab
      const perimeterSide = i % 4
      const t = (i / particleCount) * 4 - perimeterSide

      if (perimeterSide === 0) {
        // Top edge
        targ[i3] = -halfW + t * width
        targ[i3 + 1] = halfH
        targ[i3 + 2] = 0.05
      } else if (perimeterSide === 1) {
        // Right edge
        targ[i3] = halfW
        targ[i3 + 1] = halfH - t * height
        targ[i3 + 2] = 0.05
      } else if (perimeterSide === 2) {
        // Bottom edge
        targ[i3] = halfW - t * width
        targ[i3 + 1] = -halfH
        targ[i3 + 2] = 0.05
      } else {
        // Left edge
        targ[i3] = -halfW
        targ[i3 + 1] = -halfH + t * height
        targ[i3 + 2] = 0.05
      }

      // Initial current pos
      curr[i3] = init[i3]
      curr[i3 + 1] = init[i3 + 1]
      curr[i3 + 2] = init[i3 + 2]

      // Color variation between pure white and accent tone
      const c = Math.random() > 0.4 ? accentRGB : whiteRGB
      cols[i3] = c.r
      cols[i3 + 1] = c.g
      cols[i3 + 2] = c.b
    }

    return {
      initialPositions: init,
      targetPositions: targ,
      currentPositions: curr,
      particleColors: cols
    }
  }, [width, height, accentColor])

  // Continuous animation frame loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    // 1. Gentle physical floating motion
    if (groupRef.current && !reducedMotion) {
      const hoverOffset = isHero ? Math.sin(time * 1.4) * 0.08 : Math.sin(time * 0.9 + 1.2) * 0.05
      groupRef.current.position.y = position[1] + hoverOffset
    }

    // 2. Animate morphing particles toward target rectangle
    if (swarmRef.current) {
      const posAttr = swarmRef.current.geometry.attributes.position
      const p = Math.max(0, Math.min(1, morphProgress))

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const ix = initialPositions[i3]
        const iy = initialPositions[i3 + 1]
        const iz = initialPositions[i3 + 2]

        const tx = targetPositions[i3]
        const ty = targetPositions[i3 + 1]
        const tz = targetPositions[i3 + 2]

        // Add subtle starlight jitter when fully assembled
        const jitter = (1 - p) * 0.2 + (p > 0.85 ? Math.sin(time * 3 + i) * 0.02 : 0)

        posAttr.array[i3] = THREE.MathUtils.lerp(ix, tx, p) + jitter
        posAttr.array[i3 + 1] = THREE.MathUtils.lerp(iy, ty, p) + jitter
        posAttr.array[i3 + 2] = THREE.MathUtils.lerp(iz, tz, p)
      }
      posAttr.needsUpdate = true
    }

    // 3. Fade in website mesh as particles coalesce (p > 0.3)
    if (meshRef.current && meshRef.current.material) {
      const meshAlpha = Math.max(0, Math.min(1, (morphProgress - 0.25) / 0.75))
      meshRef.current.material.opacity = meshAlpha
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>

      {/* 1. Coalescing Particle Perimeter Swarm */}
      <points ref={swarmRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={currentPositions.length / 3}
            array={currentPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleColors.length / 3}
            array={particleColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={1.3}
          vertexColors
          map={pointTexture}
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* 2. Main 3D Architectural Website Plane */}
      <mesh ref={meshRef}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={websiteTexture || undefined}
          color={websiteTexture ? '#ffffff' : '#05070f'}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. Smoked Titanium Chassis Backplate */}
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[width + 0.08, height + 0.08, 0.1]} />
        <meshStandardMaterial
          color="#07080f"
          roughness={0.25}
          metalness={0.85}
          transparent
          opacity={Math.max(0, Math.min(1, (morphProgress - 0.2) / 0.8))}
        />
      </mesh>

      {/* 4. Subtle Top Chrome Browser Bar Trim */}
      <mesh position={[0, height / 2 + 0.08, 0]}>
        <boxGeometry args={[width + 0.08, 0.16, 0.1]} />
        <meshStandardMaterial
          color="#0f111a"
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={Math.max(0, Math.min(1, (morphProgress - 0.3) / 0.7))}
        />
      </mesh>

      {/* 5. Minimal Traffic Dots */}
      <group position={[-width / 2 + 0.25, height / 2 + 0.08, 0.06]}>
        <mesh position={[0, 0, 0]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={morphProgress > 0.5 ? 0.9 : 0} />
        </mesh>
        <mesh position={[0.12, 0, 0]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={morphProgress > 0.5 ? 0.9 : 0} />
        </mesh>
        <mesh position={[0.24, 0, 0]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color="#10b981" transparent opacity={morphProgress > 0.5 ? 0.9 : 0} />
        </mesh>
      </group>

      {/* 6. Soft Specular Rim Light Halo */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[width + 0.6, height + 0.6]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={morphProgress > 0.5 ? 0.12 : 0}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

    </group>
  )
}
