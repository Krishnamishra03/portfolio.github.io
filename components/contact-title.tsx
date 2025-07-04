"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Text3D, Environment, PresentationControls } from "@react-three/drei"

export default function ContactTitle() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <Suspense fallback={null}>
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 6, Math.PI / 6]}
        >
          <Text3D
            font="/fonts/Inter_Bold.json"
            size={0.8}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            position={[-3.2, 0, 0]}
          >
            Contact Me
            <meshStandardMaterial color="#d946ef" metalness={0.8} roughness={0.2} />
          </Text3D>
        </PresentationControls>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
