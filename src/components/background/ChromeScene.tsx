import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { ChromeObject } from './ChromeObject';
import type { ChromeObjectType } from './ChromeObject';
import { useRef, memo, useState, useEffect } from 'react';
import * as THREE from 'three';

interface ObjectConfig {
    type: ChromeObjectType;
    position: [number, number, number];
    scale: number;
    speed: number;
    color: string;
    rotationSpeed: number;
}

const OBJECTS: ObjectConfig[] = [
    { type: 'torus', position: [-4, 3, -4], scale: 1.5, speed: 0.5, color: '#ffffff', rotationSpeed: 0.8 },
    { type: 'star', position: [5, 4, -6], scale: 1.2, speed: 0.7, color: '#ff00ff', rotationSpeed: 1.2 },
    { type: 'coil', position: [-6, -2, -8], scale: 1.8, speed: 0.4, color: '#b533ff', rotationSpeed: 0.5 },
    { type: 'sphere', position: [4, -4, -3], scale: 1.4, speed: 0.6, color: '#00e5ff', rotationSpeed: 1.5 },
    { type: 'curve', position: [0, -6, -2], scale: 2.5, speed: 0.3, color: '#70ffcc', rotationSpeed: 0.4 },
];

function SceneContent({ objectCount }: { objectCount: number }) {
    const groupRef = useRef<THREE.Group>(null);

    // Hardened performance: Radial Dispersal Animation
    // Objects push OUTWARD from the center as scroll increases
    useFrame(() => {
        if (!groupRef.current) return;
        const scrollY = window.scrollY;
        const scrollFactor = scrollY * 0.01;

        groupRef.current.children.forEach((child, i) => {
            const config = OBJECTS[i];
            if (!config) return;

            // Get direction vector from origin (0,0,0)
            const dirX = config.position[0];
            const dirY = config.position[1];

            // Push outward based on original position vector
            child.position.x = config.position[0] + (dirX * scrollFactor * 0.5);
            child.position.y = config.position[1] + (dirY * scrollFactor * 0.5);

            // Still keep a slight receding Z for depth
            child.position.z = config.position[2] - (scrollFactor * 2);
        });
    });

    return (
        <group ref={groupRef}>
            {OBJECTS.slice(0, objectCount).map((obj, i) => (
                <ChromeObject key={i} {...obj} />
            ))}
        </group>
    );
}

export const ChromeScene = memo(function ChromeScene() {
    const [objectCount, setObjectCount] = useState(5);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) setObjectCount(3);
            else if (width < 1024) setObjectCount(4);
            else setObjectCount(5);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
                dpr={[1, 1.5]} // Performance Hardening: Cap DPR
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                    depth: true
                }}
                camera={{ position: [0, 0, 15], fov: 40 }}
            >
                <color attach="background" args={['#000000']} />

                {/* Lighting: strictly matching poster/Y2K mood */}
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />

                {/* Neon Rim Lights behind objects */}
                <spotLight position={[-20, 10, -10]} angle={0.5} penumbra={1} intensity={2} color="#ff00ff" />
                <spotLight position={[20, -10, -10]} angle={0.5} penumbra={1} intensity={2} color="#00e5ff" />
                <spotLight position={[0, -20, 5]} angle={0.5} penumbra={1} intensity={1} color="#b533ff" />

                <Environment preset="night" />

                <SceneContent objectCount={objectCount} />
            </Canvas>
        </div>
    );
});
