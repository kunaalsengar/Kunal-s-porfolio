import React, { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * CameraRig
 * Single authoritative camera & scene macro choreographer.
 * - Establishes initial calibrated baseline for desktop and mobile
 * - Positions Monolith on the right flank for Hero desktop framing
 * - Guarantees zero conflicting camera controllers
 * - Prepares baseline for section-by-section scroll choreography
 */
export default function CameraRig({ isMobile = false, reducedMotion = false, monolithRef }) {
  const { camera } = useThree()
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    // Initial Camera Baseline Setup
    if (isMobile) {
      camera.position.set(0, 0, 6.4)
      camera.fov = 46
    } else {
      camera.position.set(0, 0, 5.2)
      camera.fov = 42
    }
    camera.updateProjectionMatrix()
    camera.lookAt(targetLookAt.current)

    // Initial Monolith Macro Positioning
    if (monolithRef?.current) {
      if (isMobile) {
        monolithRef.current.position.set(0, 0.45, -0.4)
        monolithRef.current.scale.set(0.85, 0.85, 0.85)
        monolithRef.current.rotation.set(0, 0, 0)
      } else {
        monolithRef.current.position.set(1.75, 0, 0)
        monolithRef.current.scale.set(1, 1, 1)
        monolithRef.current.rotation.set(0, 0, 0)
      }
    }
  }, [camera, isMobile, monolithRef])

  useFrame(() => {
    camera.lookAt(targetLookAt.current)
  })

  return null
}

