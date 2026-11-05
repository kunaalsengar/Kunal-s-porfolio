import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Floating Dust & Atmospheric Particles
 * Lightweight, GPU-accelerated points that drift slowly in 3D space.
 */
export default function FloatingParticles({ count = 80 }) {
  const pointsRef = useRef()

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Scatter in a bounding volume around the monolith
      pos[i * 3 + 0] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8

      spd[i * 3 + 0] = (Math.random() - 0.5) * 0.003
      spd[i * 3 + 1] = 0.002 + Math.random() * 0.004
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.003
    }

    return [pos, spd]
  }, [count])

  useFrame(() => {
    if (!pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position
    const posArray = posAttr.array

    for (let i = 0; i < count; i++) {
      const idxY = i * 3 + 1
      posArray[idxY] += speeds[idxY]

      // Wrap around vertically if particles rise too high
      if (posArray[idxY] > 5) {
        posArray[idxY] = -5
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
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#a5f3fc"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

