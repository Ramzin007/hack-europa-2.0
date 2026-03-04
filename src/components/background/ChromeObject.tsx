import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface ChromeObjectProps {
    position: [number, number, number];
    scale: number;
    speed: number;
    distort: number;
    color?: string;
}

export function ChromeObject({ position, scale, speed, distort, color = "#ffffff" }: ChromeObjectProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();

        // Slow hypnotic rotation
        meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
        meshRef.current.rotation.y = Math.cos(time * 0.3) * 0.2;
    });

    return (
        <Float
            speed={speed}
            rotationIntensity={1}
            floatIntensity={2}
            position={position}
        >
            <mesh ref={meshRef} scale={scale}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color={color}
                    roughness={0}
                    metalness={1}
                    distort={distort}
                    speed={speed * 2}
                    reflectivity={1}
                    clearcoat={1}
                    clearcoatRoughness={0}
                />
            </mesh>
        </Float>
    );
}
