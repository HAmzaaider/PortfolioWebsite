import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

// ─── Animated distorted sphere ────────────────────────────────
// MeshDistortMaterial from Drei continuously morphs the surface
// giving a fluid, organic, almost liquid look
const DistortedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.15
    meshRef.current.rotation.z += delta * 0.08
  })

  return (
    // Float from Drei adds a gentle bobbing animation automatically
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#D97706"
          distort={0.35}      // how much the surface morphs
          speed={2}           // speed of the morph animation
          roughness={0.1}
          metalness={0.3}
          wireframe={false}
        />
      </mesh>
    </Float>
  )
}

// ─── Orbiting wireframe ring ──────────────────────────────────
const OrbitRing = () => {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.4
    ref.current.rotation.y += delta * 0.2
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.8, 0.012, 16, 120]} />
      <meshBasicMaterial color="#1B3A6B" transparent opacity={0.25} />
    </mesh>
  )
}

// ─── Small floating dots in 3D space ─────────────────────────
const FloatingDots = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.06
  })

  // Fixed dot positions arranged around the hero mesh
  const positions: [number, number, number][] = [
    [3.5, 1.5, 0], [-3, 2, 1], [2, -2.5, 1.5],
    [-2.5, -1.5, -1], [1, 3.2, -1], [-1, -3, 2],
    [3, -1, -2], [-3.5, 0.5, -1.5], [0.5, 2.8, 2],
    [2.6, 2.2, -1.9], [-2.8, 2.6, -0.6], [1.9, -3.1, -1.4],
    [-1.4, 3.5, 1.1], [3.3, 0.9, 2.1], [-3.2, -2.2, 0.8],
    [0.2, -3.4, -2.3], [2.4, -0.6, 2.7], [-2.1, 0.3, -2.8],
    [1.1, 1.9, 3.1], [-0.8, -2.4, 2.9], [3.8, -1.7, 0.5],
    [-3.7, 1.1, 1.7], [0.9, 3.6, -0.7], [-0.2, -3.8, 0.4],
  ]

  const navyPalette = ['#12306B', '#1A3A6B', '#4A7FC1']

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.055 + (i % 4) * 0.01, 10, 10]} />
          <meshBasicMaterial
            color={navyPalette[i % navyPalette.length]}
            transparent
            opacity={0.82}
          />
        </mesh>
      ))}
    </group>
  )
}

// ─── Scene wrapper ────────────────────────────────────────────
const FloatingGeometry = () => (
  <div className="absolute inset-0 w-full h-full">
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Warm ambient light matching cream background */}
      <ambientLight intensity={0.8} color="#FEF3C7" />

      {/* Key light — mustard warm */}
      <pointLight position={[5, 5, 5]}   intensity={2}   color="#F59E0B" />

      {/* Fill light — navy blue cool */}
      <pointLight position={[-5, -3, -5]} intensity={1.5} color="#2563EB" />

      <DistortedSphere />
      <OrbitRing />
      <FloatingDots />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.8}
      />
    </Canvas>
  </div>
)

export default FloatingGeometry