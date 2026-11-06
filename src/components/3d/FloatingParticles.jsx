import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * FloatingParticles — Phase 6.5 Step 3.1
 * Delicate Atmospheric Embers & Light Particles:
 * - Natural crimson and warm silver dust motes drifting through atmospheric light
 * - Multi-depth volumetric scatter (z: -3 to +2)
 * - Gentle sinusoidal organic drift
 * - Respects prefers-reduced-motion
 */
export default function FloatingParticles({
  count = 60,
  reducedMotion = false
}) {
  const pointsRef = useRef()

  const [positions, speeds, colors, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const phs = new Float32Array(count)

    // Palette: Netflix Crimson, Soft Coral Red, Warm Titanium White
    const palette = [
      new THREE.Color('#e50914'), // Crimson
      new THREE.Color('#ff4d5a'), // Coral Red
      new THREE.Color('#991b1b'), // Deep Red
      new THREE.Color('#f8fafc'), // Titanium White
      new THREE.Color('#cbd5e1')  // Silver
    ]

    for (let i = 0; i < count; i++) {
      // Scatter in a generous volume around the camera frustum
      pos[i * 3 + 0] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 0.5

      spd[i * 3 + 0] = (Math.random() - 0.5) * 0.002
      spd[i * 3 + 1] = 0.0015 + Math.random() * 0.0035 // Gentle upward drift
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.0015

      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3 + 0] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b

      phs[i] = Math.random() * Math.PI * 2
    }

    return [pos, spd, col, phs]
  }, [count])

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return
    const posAttr = pointsRef.current.geometry.attributes.position
    const posArray = posAttr.array
    const time = state.clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const idxX = i * 3 + 0
      const idxY = i * 3 + 1

      // Gentle vertical rise
      posArray[idxY] += speeds[idxY] * (delta * 60)

      // Subtle horizontal sway
      posArray[idxX] += Math.sin(time * 0.5 + phases[i]) * 0.0015

      // Wrap around vertically to maintain seamless infinite volume
      if (posArray[idxY] > 5.5) {
        posArray[idxY] = -5.5
        posArray[idxX] = (Math.random() - 0.5) * 14
      }
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
