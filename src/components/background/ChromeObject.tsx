import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export type ChromeObjectType = 'torus' | 'star' | 'coil' | 'sphere' | 'curve';

interface ChromeObjectProps {
    type: ChromeObjectType;
    position: [number, number, number];
    scale: number;
    speed: number;
    color?: string;
    rotationSpeed?: number;
}

export function ChromeObject({ type, position, scale, speed, color = "#ffffff", rotationSpeed = 0.5 }: ChromeObjectProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Hardened performance: Memoize geometries
    const geometry = useMemo(() => {
        switch (type) {
            case 'torus':
                return new THREE.TorusGeometry(1, 0.3, 16, 64);
            case 'star':
                return new THREE.OctahedronGeometry(1, 0); // Low-poly star feel
            case 'coil':
                return new THREE.TorusKnotGeometry(0.8, 0.2, 100, 16);
            case 'sphere':
                return new THREE.IcosahedronGeometry(1, 1); // Geo-sphere
            case 'curve':
                return new THREE.TorusGeometry(1, 0.1, 8, 48, Math.PI); // Half arc
            default:
                return new THREE.SphereGeometry(1, 32, 32);
        }
    }, [type]);

    // Hardened performance: Memoize material
    const material = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 1,
        roughness: 0.05,
        clearcoat: 1,
        clearcoatRoughness: 0,
        envMapIntensity: 1.5,
        reflectivity: 1,
        wireframe: type === 'sphere',
    }), [color, type]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();

        // Hardened: Direct rotation without state updates
        meshRef.current.rotation.x += 0.005 * rotationSpeed;
        meshRef.current.rotation.y += 0.01 * rotationSpeed;

        // Add a subtle hypnotic wobble
        meshRef.current.position.y = Math.sin(time * speed) * 0.1;
    });

    return (
        <Float
            speed={speed}
            rotationIntensity={0.5}
            floatIntensity={0.5}
            position={position}
        >
            <mesh
                ref={meshRef}
                scale={scale}
                geometry={geometry}
                material={material}
            />
        </Float>
    );
}
