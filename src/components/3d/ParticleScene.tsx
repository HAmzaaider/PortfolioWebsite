import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// ─── Floating Torus Knot ──────────────────────────────────────
// The main 3D object in the center of the hero
const FloatingShape = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  // Animate rotation every frame
  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.3
    meshRef.current.rotation.y += delta * 0.5
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* TorusKnot looks complex and impressive — great for a dev portfolio */}
      <torusKnotGeometry args={[1, 0.3, 200, 32]} />
      <meshStandardMaterial
        color="#00CFAD"
        wireframe={true}         // wireframe gives a techy, code-like look
        emissive="#00CFAD"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

// ─── Particle Field ───────────────────────────────────────────
// Thousands of small dots floating in 3D space around the shape
const Particles = ({ count = 3000 }) => {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate random positions once using useMemo (not every render)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3) // x, y, z for each particle
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20 // x — spread wide
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20 // y — spread tall
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20 // z — spread deep
    }
    return arr
  }, [count])

  // Slowly rotate the entire particle field
  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.04
    pointsRef.current.rotation.x += delta * 0.02
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
        size={0.03}
        color="#2ECFB0"
        transparent
        opacity={0.7}
        sizeAttenuation={true} // particles further away appear smaller
      />
    </points>
  )
}

// ─── Scene Wrapper ────────────────────────────────────────────
// The Canvas is the full-screen 3D viewport
const ParticleScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }} // alpha: true = transparent bg
      >
        {/* Ambient light illuminates everything softly */}
        <ambientLight intensity={0.5} />

        {/* Point light gives directional highlights on the shape */}
        <pointLight position={[10, 10, 10]} intensity={1} color="#00CFAD" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F5C842" />

        <FloatingShape />
        <Particles />

        {/* OrbitControls lets the user drag to rotate the scene */}
        <OrbitControls
          enableZoom={false}    // don't allow zoom — keeps layout intact
          enablePan={false}     // don't allow panning
          autoRotate={true}     // slowly auto-rotate even without interaction
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

export default ParticleScene