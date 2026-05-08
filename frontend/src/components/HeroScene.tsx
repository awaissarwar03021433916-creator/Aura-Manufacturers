"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei/core/RoundedBox";
import { Float } from "@react-three/drei/core/Float";
import { Environment } from "@react-three/drei/core/Environment";
import type { Group } from "three";

type BagPalette = {
  body: string;
  flap: string;
  handle: string;
  clasp: string;
  stitch: string;
};

const PALETTES: BagPalette[] = [
  // 1) Camel cognac (warm tan)
  { body: "#B8763E", flap: "#7A4A24", handle: "#5C3A1C", clasp: "#F2D27A", stitch: "#F2D27A" },
  // 2) Crimson rouge
  { body: "#B23A48", flap: "#7A1F2B", handle: "#4A1118", clasp: "#E8C46A", stitch: "#E8C46A" },
  // 3) Emerald teal
  { body: "#2F6F5E", flap: "#1B4A3E", handle: "#0F2E26", clasp: "#D9BE7E", stitch: "#D9BE7E" },
];

const ROTATIONS_PER_BAG = 1; // one full rotation before swapping
const ROT_SPEED = 0.6; // radians per second
const FULL_TURN = Math.PI * 2;

function LeatherBag() {
  const group = useRef<Group>(null);
  const accumulatedRef = useRef(0);
  const [bagIndex, setBagIndex] = useState(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * ROT_SPEED;
    accumulatedRef.current += delta * ROT_SPEED;
    if (accumulatedRef.current >= FULL_TURN * ROTATIONS_PER_BAG) {
      accumulatedRef.current = 0;
      setBagIndex((i) => (i + 1) % PALETTES.length);
    }
  });

  const p = PALETTES[bagIndex];

  return (
    <group ref={group} position={[0, -0.15, 0]}>
      {/* Body */}
      <RoundedBox
        args={[1.6, 1.15, 0.55]}
        radius={0.16}
        smoothness={6}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={p.body} roughness={0.42} metalness={0.18} />
      </RoundedBox>

      {/* Front flap accent */}
      <mesh position={[0, 0.05, 0.281]}>
        <planeGeometry args={[1.55, 0.55]} />
        <meshStandardMaterial color={p.flap} roughness={0.55} metalness={0.1} />
      </mesh>

      {/* Gold clasp */}
      <mesh position={[0, 0.05, 0.295]}>
        <boxGeometry args={[0.22, 0.1, 0.04]} />
        <meshStandardMaterial color={p.clasp} roughness={0.25} metalness={0.85} />
      </mesh>

      {/* Handle */}
      <mesh position={[0, 0.85, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.04, 16, 64, Math.PI]} />
        <meshStandardMaterial color={p.handle} roughness={0.5} metalness={0.15} />
      </mesh>

      {/* Stitching highlight */}
      <mesh position={[0, -0.55, 0.281]}>
        <planeGeometry args={[1.5, 0.02]} />
        <meshStandardMaterial color={p.stitch} emissive={p.stitch} emissiveIntensity={0.15} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 3.6], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 3]} intensity={1.15} castShadow />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#C9A961" />

      <Suspense fallback={null}>
        <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.55}>
          <LeatherBag />
        </Float>
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
