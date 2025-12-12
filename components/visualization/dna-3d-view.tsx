"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Center, Text } from "@react-three/drei"
import * as THREE from "three"
import { useEditorStore } from "@/lib/store"

const BASE_COLORS: Record<string, string> = {
    'A': '#4ade80', // green-400
    'T': '#f87171', // red-400
    'G': '#60a5fa', // blue-400
    'C': '#facc15', // yellow-400
    'default': '#94a3b8' // slate-400
}

const HELIX_RADIUS = 2;
const RISE_PER_BP = 0.5;
const TWIST_PER_BP = 0.6; // Radians

function Nucleotide({ position, base, color, rotation }: { position: [number, number, number], base: string, color: string, rotation: [number, number, number] }) {
    return (
        <group position={position} rotation={rotation}>
            {/* Base Sphere */}
            <mesh position={[HELIX_RADIUS, 0, 0]}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Connection to Axis */}
            <mesh position={[HELIX_RADIUS / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.1, 0.1, HELIX_RADIUS, 8]} />
                <meshStandardMaterial color="#cbd5e1" />
            </mesh>

            {/* Label (Computationally expensive for many bases, maybe skip for now or LOD) */}
        </group>
    )
}

function DNAHelix({ sequence }: { sequence: string }) {
    const meshRef = React.useRef<THREE.Group>(null)

    // Auto-rotate
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
        }
    })

    const items = React.useMemo(() => {
        // Limit to first 200 bases for performance
        const cleanSeq = sequence.replace(/>.*\n?/, "").replace(/[^a-zA-Z]/g, "").toUpperCase().substring(0, 200);
        return cleanSeq.split('').map((base, i) => {
            const y = (i - cleanSeq.length / 2) * RISE_PER_BP;
            const angle = i * TWIST_PER_BP;

            return (
                <group key={i} position={[0, y, 0]} rotation={[0, angle, 0]}>
                    <Nucleotide
                        position={[0, 0, 0]}
                        base={base}
                        color={BASE_COLORS[base] || BASE_COLORS.default}
                        rotation={[0, 0, 0]}
                    />
                    <Nucleotide
                        position={[0, 0, 0]}
                        base={'complement'}
                        color={BASE_COLORS[getComplement(base)] || BASE_COLORS.default}
                        rotation={[0, Math.PI, 0]}
                    />
                </group>
            )
        });
    }, [sequence]);

    return (
        <group ref={meshRef}>
            {items}
        </group>
    )
}

function getComplement(base: string) {
    switch (base) {
        case 'A': return 'T';
        case 'T': return 'A';
        case 'G': return 'C';
        case 'C': return 'G';
        default: return 'N';
    }
}

export function DNA3DViewer() {
    const { project } = useEditorStore()

    // We need to handle this component dynamically importing or being client-only safe
    // R3F Canvas handles a lot of this, but Next.js SSR can be tricky with Three.js.
    // "use client" covers most, but sometimes canvas needs width/height explicit.

    return (
        <div className="w-full h-full bg-slate-900 relative">
            <Canvas camera={{ position: [10, 0, 20], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Center>
                    <DNAHelix sequence={project?.sequence || "ATGC"} />
                </Center>
                <OrbitControls autoRotate={false} />
            </Canvas>
            <div className="absolute top-2 left-2 p-2 bg-black/50 text-white text-xs rounded pointer-events-none">
                <p>Left Click: Rotate</p>
                <p>Right Click: Pan</p>
                <p>Scroll: Zoom</p>
                <p>Displaying first 200bp</p>
            </div>
        </div>
    )
}
