import React, { useRef, useMemo, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * THE MONOLITH
 * Signature Architectural 3D Centerpiece
 * - Precision-machined Chrome & Brushed Titanium geometry
 * - Physically Based MeshPhysicalMaterial with visible front-face reflections
 * - Restrained, elegant inner quantum cyan slit
 * - Decoupled Architecture:
 *   - macroGroup (Outer): Controlled by camera & scroll choreography (position, macro rotation, scale)
 *   - microGroup (Inner): Controlled by useFrame for idle breathing, mouse parallax damping, and halo rotation
 *   - Zero property collision between animation systems
 */
const Monolith = forwardRef(function Monolith(
  { reducedMotion = false, macroPosition = [0, 0, 0], macroRotation = [0, 0, 0], macroScale = 1 },
  forwardedRef
) {
  // Outer macro group ref (can be forwarded from parent / CameraRig)
  const defaultMacroRef = useRef()
  const macroGroupRef = forwardedRef || defaultMacroRef

  // Inner micro group ref (strictly for micro-motion and physics)
  const microGroupRef = useRef()
  const coreRef = useRef()
  const ringRef = useRef()
  const slitRef = useRef()
  const leftWingRef = useRef()
  const rightWingRef = useRef()

  // Materials configured for high-end metallic physical realism
  const materials = useMemo(() => {
    // 1. Brushed Titanium / Chrome Material (Rich metallic body with soft specular highlights)
    const titaniumChrome = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#94a3b8'),
      metalness: 0.86,
      roughness: 0.22,
      clearcoat: 0.65,
      clearcoatRoughness: 0.12,
      reflectivity: 0.95,
      envMapIntensity: 1.4,
    })

    // 2. Brushed Dark Slate Titanium for Flank Wings
    const darkTitanium = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#475569'),
      metalness: 0.88,
      roughness: 0.30,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
      reflectivity: 0.85,
      envMapIntensity: 1.1,
    })

    // 3. Inner Quantum Cyan Slit (Clearly visible, restrained, pulsing)
    const quantumSlit = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#00f0ff'),
      emissive: new THREE.Color('#00e5ff'),
      emissiveIntensity: 1.6,
      roughness: 0.1,
      metalness: 0.2,
    })

    // 4. Accent Ring Metal (Halo)
    const ringMetal = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#cbd5e1'),
      metalness: 0.92,
      roughness: 0.18,
      clearcoat: 0.7,
      reflectivity: 1.0,
      envMapIntensity: 1.5,
    })

    return { titaniumChrome, darkTitanium, quantumSlit, ringMetal }
  }, [])

  // Procedural Custom Architectural Obelisk Geometry
  // A beveled, tapered octagonal column with precision facets
  const obeliskGeometry = useMemo(() => {
    const geom = new THREE.CylinderGeometry(0.55, 0.85, 3.2, 8, 1)
    // Rotate 22.5 deg (PI/8) so a flat architectural facet aligns forward
    geom.rotateY(Math.PI / 8)
    geom.computeVertexNormals()
    return geom
  }, [])

  // Floating Wing Plates Geometry (Precision-cut architectural slabs)
  const wingGeometry = useMemo(() => {
    const shape = new THREE.BoxGeometry(0.14, 2.6, 0.7)
    return shape
  }, [])

  // Thin Geometric Horizon Ring (Orbiting Halo)
  const ringGeometry = useMemo(() => {
    return new THREE.TorusGeometry(1.4, 0.02, 16, 64)
  }, [])

  // Micro-Animation Loop (Operates strictly on microGroup and child nodes)
  useFrame((state, delta) => {
    if (!microGroupRef.current) return
    const t = state.clock.getElapsedTime()

    // Gentle vertical breathing float (applied only to microGroup)
    microGroupRef.current.position.y = Math.sin(t * 0.75) * 0.08

    if (reducedMotion) {
      // Subtle idle spin for accessibility
      microGroupRef.current.rotation.y = t * 0.06
      return
    }

    // Pointer-responsive parallax damped smoothly onto microGroup rotation
    const targetTiltY = (state.pointer.x * 0.35) + (t * 0.08)
    const targetTiltX = (-state.pointer.y * 0.22) + 0.04
    const targetTiltZ = (state.pointer.x * 0.08)

    microGroupRef.current.rotation.y = THREE.MathUtils.damp(microGroupRef.current.rotation.y, targetTiltY, 3.5, delta)
    microGroupRef.current.rotation.x = THREE.MathUtils.damp(microGroupRef.current.rotation.x, targetTiltX, 3.5, delta)
    microGroupRef.current.rotation.z = THREE.MathUtils.damp(microGroupRef.current.rotation.z, targetTiltZ, 3.5, delta)

    // Counter-rotating celestial ring (Halo)
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.2
      ringRef.current.rotation.x = 1.2 + Math.sin(t * 0.4) * 0.08
    }

    // Floating wing respiration (subtle micromotion)
    if (leftWingRef.current && rightWingRef.current) {
      const wingOffset = Math.sin(t * 1.5) * 0.02
      leftWingRef.current.position.x = -0.92 - wingOffset
      rightWingRef.current.position.x = 0.92 + wingOffset
    }

    // Restrained, elegant quantum slit pulse
    if (slitRef.current) {
      slitRef.current.material.emissiveIntensity = 1.4 + Math.sin(t * 2.2) * 0.35
    }
  })

  return (
    // Outer Macro Group (Controlled by macro choreography / scroll controller)
    <group 
      ref={macroGroupRef} 
      position={macroPosition} 
      rotation={macroRotation}
      scale={macroScale}
    >
      {/* Inner Micro Group (Controlled strictly by useFrame physics & mouse parallax) */}
      <group ref={microGroupRef} position={[0, 0, 0]}>
        {/* 1. Central Brushed Titanium & Chrome Obelisk */}
        <mesh
          ref={coreRef}
          geometry={obeliskGeometry}
          material={materials.titaniumChrome}
          castShadow
          receiveShadow
        />

        {/* 2. Left Architectural Titanium Flank Plate */}
        <mesh
          ref={leftWingRef}
          position={[-0.92, 0, 0]}
          geometry={wingGeometry}
          material={materials.darkTitanium}
          castShadow
          receiveShadow
        />

        {/* 3. Right Architectural Titanium Flank Plate */}
        <mesh
          ref={rightWingRef}
          position={[0.92, 0, 0]}
          geometry={wingGeometry}
          material={materials.darkTitanium}
          castShadow
          receiveShadow
        />

        {/* 4. Recessed Quantum Cyan Slit (Clearly Visible & Restrained) */}
        <mesh
          ref={slitRef}
          position={[0, 0, 0.66]}
          material={materials.quantumSlit}
        >
          <boxGeometry args={[0.04, 2.3, 0.025]} />
        </mesh>

        {/* 5. Orbiting Precision Titanium Halo */}
        <mesh
          ref={ringRef}
          position={[0, 0, 0]}
          rotation={[1.2, 0, 0]}
          geometry={ringGeometry}
          material={materials.ringMetal}
        />
      </group>
    </group>
  )
})

export default Monolith
