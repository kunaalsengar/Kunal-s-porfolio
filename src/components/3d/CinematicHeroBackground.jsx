import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * CinematicHeroBackground — Phase 6.5 Step 3.1
 * Continuous GPU-accelerated animated background for the Hero viewport:
 * - Flowing crimson and deep-red light waves with smooth domain warping
 * - Atmospheric gradients blending seamlessly into void near-black (#050508)
 * - Soft horizontal light streaks and depth layers
 * - Mouse parallax drift with smooth damping
 * - Respects prefers-reduced-motion (calm static state)
 * - Runs in an infinite continuous loop at 60 FPS with zero clipping
 */
export default function CinematicHeroBackground({ 
  reducedMotion = false,
  introActive = false,
  introScene = 1 
}) {
  const meshRef = useRef()
  const { viewport, size } = useThree()

  // Track mouse coordinates normalized [-1, 1]
  const mouse = useRef(new THREE.Vector2(0, 0))
  const targetMouse = useRef(new THREE.Vector2(0, 0))

  // Shader uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uTransition: { value: introActive && introScene < 5 ? 0.0 : 1.0 },
    uReducedMotion: { value: reducedMotion ? 1.0 : 0.0 }
  }), [])

  // Vertex shader: Full-quad screen mapping with UV pass-through
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  // Fragment shader: Multi-layered organic crimson waves, light streaks & atmospheric vignette
  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uTransition;
    uniform float uReducedMotion;

    varying vec2 vUv;

    // Fast, smooth fractal Brownian motion with rotation
    float fbm(vec2 p, float t) {
      float v = 0.0;
      float a = 0.52;
      mat2 rot = mat2(0.877, 0.479, -0.479, 0.877); // ~28.6 degrees
      for (int i = 0; i < 3; ++i) {
        v += a * (sin(p.x + t) * cos(p.y - t));
        p = rot * p * 1.85;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv;
      vec2 p = (uv - 0.5) * 2.0;
      p.x *= (uResolution.x / uResolution.y);

      // Subtle mouse drift parallax
      p += uMouse * 0.06;

      // Slow, organic time progression (static if reduced motion)
      float t = uReducedMotion > 0.5 ? 2.4 : uTime * 0.16;

      // Domain-warped wave coordinates
      vec2 q = vec2(
        fbm(p + vec2(0.0, 0.0), t * 0.75),
        fbm(p + vec2(4.8, 1.6), t * 0.55)
      );

      vec2 r = vec2(
        fbm(p + 3.8 * q + vec2(1.5, 8.4), t * 0.65),
        fbm(p + 3.8 * q + vec2(7.9, 2.3), t * 0.45)
      );

      float f = fbm(p + 2.8 * r, t);

      // Soft moving horizontal light streaks with gentle vertical breathing
      float streak1 = exp(-pow((p.y - sin(p.x * 0.65 + t * 0.38) * 0.32 + 0.08) * 3.4, 2.0));
      float streak2 = exp(-pow((p.y + cos(p.x * 0.45 - t * 0.28) * 0.38 - 0.22) * 4.2, 2.0));
      float streaks = streak1 * 0.65 + streak2 * 0.35;

      // Color Palette Definition:
      // Void near-black (#050508)
      vec3 voidBlack = vec3(0.02, 0.02, 0.031);
      // Deep burgundy / wine (#3f050b)
      vec3 deepWine = vec3(0.25, 0.016, 0.035);
      // Signature Netflix Crimson (#E50914)
      vec3 richCrimson = vec3(0.898, 0.035, 0.078);
      // Soft vermilion highlight (#ff3329)
      vec3 vermilion = vec3(1.0, 0.20, 0.16);
      // Soft titanium specular edge glow
      vec3 specularWhite = vec3(0.96, 0.90, 0.92);

      // Primary wave layer blend
      float waveIntensity = smoothstep(-0.35, 0.75, f);
      vec3 color = voidBlack;
      color = mix(color, deepWine, waveIntensity * 0.88);
      color = mix(color, richCrimson, pow(waveIntensity, 2.2) * 0.82);

      // Light streak additive blend
      color = mix(color, vermilion, streaks * 0.52);
      color += specularWhite * pow(streaks, 5.0) * 0.32;

      // Controlled central contrast vignette:
      // Darkens the center region slightly so centered white text has 100% crystal-clear contrast
      float centerDist = length(p * vec2(0.85, 1.15));
      float textVignette = smoothstep(0.15, 1.45, centerDist);
      color = mix(voidBlack * 0.85, color, mix(0.48, 1.0, textVignette));

      // Atmospheric outer boundary vignette
      float outerVignette = smoothstep(2.4, 0.9, centerDist);
      color *= outerVignette;

      // Smooth entrance transition blending
      color *= uTransition;

      gl_FragColor = vec4(color, 1.0);
    }
  `

  // Update uniforms and mouse parallax on every frame
  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Update resolution on viewport resize
    uniforms.uResolution.value.set(size.width, size.height)

    // Smoothly increment time (continuous infinite loop)
    if (!reducedMotion) {
      uniforms.uTime.value += delta
    }

    // Smoothly blend transition when intro is finished
    const targetTransition = (introActive && introScene < 5) ? 0.0 : 1.0
    uniforms.uTransition.value = THREE.MathUtils.lerp(
      uniforms.uTransition.value,
      targetTransition,
      delta * 2.5
    )

    // Smoothly damp mouse coordinates
    targetMouse.current.set(state.pointer.x, state.pointer.y)
    mouse.current.lerp(targetMouse.current, delta * 3.0)
    uniforms.uMouse.value.copy(mouse.current)
  })

  // Frustum coverage: calculate dimension at z = -2.5 to comfortably fill 100% of viewport
  const planeWidth = Math.max(viewport.width * 2.8, 20)
  const planeHeight = Math.max(viewport.height * 2.8, 16)

  return (
    <mesh 
      ref={meshRef} 
      position={[0, 0, -2.5]} 
      renderOrder={-10}
    >
      <planeGeometry args={[planeWidth, planeHeight, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

